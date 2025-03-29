import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/dbConn';
import User from '../../../modal/User';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '../../../utils/mailer';

export const dynamic = "force-dynamic";

// Generate a random 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification code
    const verificationCode = generateVerificationCode();
    
    // Set expiration time (15 minutes from now)
    const verificationExpiry = new Date();
    verificationExpiry.setMinutes(verificationExpiry.getMinutes() + 15);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationCode,
      verificationExpiry,
      verified: false
    });

    // Log for debugging
    console.log(`Created user: ${user._id} with verification code: ${verificationCode}`);

    // Send verification email
    try {
      await sendVerificationEmail(
        email,
        verificationCode,
        name
      );
      console.log(`Verification email sent to ${email}`);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue with signup process even if email fails
    }

    return NextResponse.json({
      message: "User registered successfully",
      userId: user._id
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error details:', error);
    
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: "Failed to register user", details: String(error) },
      { status: 500 }
    );
  }
}