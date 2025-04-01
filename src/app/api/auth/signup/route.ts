import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/dbConn'; 
import User from '../../../../modal/User';
import crypto from 'crypto';
import { sendVerificationEmail } from '../../../../utils/mailer';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with verification data
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationCode,
      verificationExpires
    });
    await newUser.save();

    const emailResult = await sendVerificationEmail(email, verificationCode, name);
    
    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.messageId);
    }

    return NextResponse.json(
      { 
        message: 'User created successfully',
        verificationCode 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}