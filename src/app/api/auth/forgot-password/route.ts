import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConn';
import User from '../../../../modal/User';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../../../../utils/email';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Find the user
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`Password reset requested for non-existent email: ${email}`);
      return NextResponse.json(
        { message: 'If your email is registered, you will receive a password reset link.' },
        { status: 200 }
      );
    }

    // Generate a reset token (random string) and set expiration
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date();
    resetTokenExpires.setHours(resetTokenExpires.getHours() + 24); 

    console.log(`Generated reset token for ${email}:`, resetToken);

    // Hash the token for storage
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    console.log(`Hashed token for storage:`, hashedToken);

    // Instead of findOneAndUpdate, try updating directly
    user.resetToken = hashedToken;
    user.resetTokenExpires = resetTokenExpires;

    // Save with explicit error handling
    try {
      await user.save();
      
      // Verify the token was saved by fetching the user again
      const updatedUser = await User.findById(user._id);
      console.log('After save - User token status:', {
        id: updatedUser._id,
        email: updatedUser.email,
        hasToken: !!updatedUser.resetToken,
        resetToken: updatedUser.resetToken,
        tokenExpires: updatedUser.resetTokenExpires
      });
    } catch (saveError) {
      console.error('Failed to save reset token:', saveError);
      return NextResponse.json(
        { message: 'Failed to process reset request' },
        { status: 500 }
      );
    }

    // Send the reset email with the unhashed token
    const emailResult = await sendPasswordResetEmail(email, user.name || 'User', resetToken);
    
    if (!emailResult.success) {
      console.error('Failed to send password reset email:', emailResult.error);
      return NextResponse.json(
        { message: 'Failed to send password reset email' },
        { status: 500 }
      );
    }

    // For development: include token info in response
    const debugInfo = process.env.NODE_ENV !== 'production' 
      ? {
          resetToken,
          hashedToken,
          resetUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/reset-password?token=${resetToken}`
        }
      : {};

    return NextResponse.json(
      { 
        message: 'If your email is registered, you will receive a password reset link.',
        ...(process.env.NODE_ENV !== 'production' && { debug: debugInfo })
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}