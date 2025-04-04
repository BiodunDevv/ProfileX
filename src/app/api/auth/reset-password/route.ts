import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConn';
import User from '../../../../modal/User';
import bcrypt from 'bcryptjs';
import { sendPasswordResetConfirmationEmail } from '../../../../utils/email';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { token, userId, password } = body;

    console.log('Reset password request received:', { 
      tokenProvided: !!token,
      userIdProvided: !!userId,
      passwordProvided: !!password
    });

    if (!token || !userId || !password) {
      return NextResponse.json(
        { message: 'Token, userId, and password are required' },
        { status: 400 }
      );
    }

    // Find the user with the reset token
    const user = await User.findById(userId);
    
    if (!user) {
      console.log('User not found with ID:', userId);
      return NextResponse.json(
        { message: 'Invalid or expired password reset token' },
        { status: 400 }
      );
    }

    // Check if user has a reset token and it hasn't expired
    if (!user.resetToken || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      console.log('Reset token expired or not found for user:', userId);
      return NextResponse.json(
        { message: 'Invalid or expired password reset token' },
        { status: 400 }
      );
    }

    // Verify the token matches the stored hashed token
    const isValid = await bcrypt.compare(token, user.resetToken);
    
    if (!isValid) {
      console.log('Invalid reset token for user:', userId);
      return NextResponse.json(
        { message: 'Invalid or expired password reset token' },
        { status: 400 }
      );
    }

    console.log('Token verified successfully for user:', user.email);

    // Hash the new password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password and remove the reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    console.log('Password updated successfully for user:', user.email);

    // Send confirmation email
    await sendPasswordResetConfirmationEmail(user.email, user.name || 'User');

    return NextResponse.json(
      { message: 'Password reset successful. You can now log in with your new password.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
