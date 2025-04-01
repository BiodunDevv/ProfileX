import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConn';
import User from '../../../../modal/User';
import { sendWelcomeEmail } from '../../../../utils/welcome';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, verificationCode } = body;

    console.log('Verification request:', { email, verificationCode, type: typeof verificationCode });

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found:', email);
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    console.log('User found:', {
      name: user.name, 
      email: user.email,
      isVerified: user.isVerified,
      dbVerificationCode: user.verificationCode,
      dbCodeType: typeof user.verificationCode,
      providedVerificationCode: verificationCode,
      match: user.verificationCode === verificationCode,
      expires: user.verificationExpires,
      isExpired: user.verificationExpires ? new Date() > user.verificationExpires : false
    });

    if (user.isVerified) {
      return NextResponse.json(
        { message: 'Email already verified' },
        { status: 200 }
      );
    }

    if (user.verificationCode !== verificationCode && 
        user.verificationCode !== verificationCode.trim()) {
      return NextResponse.json(
        { 
          message: 'Invalid verification code',
          debug: {
            stored: user.verificationCode,
            provided: verificationCode,
            storedType: typeof user.verificationCode,
            providedType: typeof verificationCode
          }
        },
        { status: 400 }
      );
    }

    if (user.verificationExpires && new Date() > user.verificationExpires) {
      return NextResponse.json(
        { message: 'Verification code has expired' },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationExpires = undefined;
    await user.save();

    // Send welcome email
    try {
      await sendWelcomeEmail(email, user.name);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Continue with verification success even if welcome email fails
    }

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}