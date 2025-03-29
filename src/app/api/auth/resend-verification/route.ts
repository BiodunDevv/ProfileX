import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "../../../../lib/dbConn";
import User from "../../../../modal/User";
import { sendVerificationEmail } from "../../../../utils/mailer";

export const dynamic = "force-dynamic";

// Generate a random 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function POST(req: NextRequest) {
  try {
    // Get email from request body or cookie
    const data = await req.json();
    const email = data.email;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    
    // Set expiration time (15 minutes from now)
    const verificationExpiry = new Date();
    verificationExpiry.setMinutes(verificationExpiry.getMinutes() + 15);

    // Save verification code and expiry to user
    user.verificationCode = verificationCode;
    user.verificationExpiry = verificationExpiry;
    await user.save();

    // Send verification email using Nodemailer
    try {
      await sendVerificationEmail(
        email,
        verificationCode,
        user.name || 'User'
      );
      
      return NextResponse.json({
        message: "Verification code resent successfully"
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: "Failed to resend verification code" },
      { status: 500 }
    );
  }
}