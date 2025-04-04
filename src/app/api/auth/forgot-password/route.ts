import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConn';
import User from '../../../../modal/User';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendPasswordResetEmail } from '../../../../utils/email';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email } = body;

    console.log('Password reset requested for:', email);

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

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log('Generated reset token:', resetToken);

    // Hash the token before storing it
    const salt = 10;
    const hashedToken = await bcrypt.hash(resetToken, salt);

    // Store the token with the user (create or update token document)
    user.resetToken = hashedToken;
    user.resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send the reset email with the unhashed token and user ID
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/reset-password?token=${resetToken}&userId=${user._id}`;
    
    await sendPasswordResetEmail(email, user.name || 'User', resetLink);

    return NextResponse.json(
      { 
        message: 'If your email is registered, you will receive a password reset link.',
        // Include debug info in development
        ...(process.env.NODE_ENV !== 'production' && { 
          debug: {
            userId: user._id,
            resetToken,
            resetLink
          }
        })
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