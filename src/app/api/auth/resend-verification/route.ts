import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConn';
import User from '../../../../modal/User';
import crypto from 'crypto';
import { sendVerificationEmail } from '../../../../utils/mailer';

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
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // If already verified, no need to resend code
    if (user.isVerified) {
      return NextResponse.json(
        { message: 'Email already verified' },
        { status: 200 }
      );
    }

    // Generate a new verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    
    // Set expiration to 24 hours from now
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24);

    // Update user with new verification code
    user.verificationCode = verificationCode;
    user.verificationExpires = verificationExpires;
    await user.save();

    // Send the verification email
    const emailResult = await sendVerificationEmail(email, verificationCode, user.name);
    
    if (!emailResult.success) {
      console.error('Failed to send verification email');
      return NextResponse.json(
        { message: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Verification code resent successfully',
        // Include the code in development/testing environments
        ...(process.env.NODE_ENV !== 'production' && { verificationCode })
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}