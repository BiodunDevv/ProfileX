/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/dbConn';
import User from '../../../modal/User';
import VerificationEmail from '../../components/Auth/VerificationEmail';

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // Get email and code from request body
    const { code, email } = await req.json();
    
    console.log(`Verification request received for email: ${email}, code: ${code}`);

    if (!code || !email) {
      return NextResponse.json(
        { error: "Code and email are required" },
        { status: 400 }
      );
    }

    await connectDB();
    
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`User not found for email: ${email}`);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if code matches and is not expired
    if (user.verificationCode !== code) {
      console.log(`Invalid verification code for email: ${email}. Expected: ${user.verificationCode}, Got: ${code}`);
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    const now = new Date();
    if (user.verificationExpiry && now > user.verificationExpiry) {
      console.log(`Verification code expired for email: ${email}`);
      return NextResponse.json(
        { error: "Verification code has expired" },
        { status: 400 }
      );
    }

    // Mark user as verified
    user.verified = true;
    user.verificationCode = undefined;
    user.verificationExpiry = undefined;
    await user.save();

    console.log(`Email verified successfully for: ${email}`);
    
    return NextResponse.json({
      message: "Email verified successfully",
      verified: true
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 }
    );
  }
}
