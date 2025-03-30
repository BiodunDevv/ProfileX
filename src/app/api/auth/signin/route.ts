import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "../../../../lib/dbConn";
import User from '../../../../modal/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    console.log("Sign-in API endpoint called");
    await connectDB();
    
    const { identifier, password } = await req.json();
    console.log("Received credentials:", { identifier, passwordProvided: !!password });
    
    if (!identifier || !password) {
      return NextResponse.json(
        { message: 'Email/username and password are required' },
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier.toLowerCase() }
      ]
    });
    
    console.log("User found:", !!user);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );
    
    // Return user (excluding password) and token
    const userToReturn = {
      _id: user._id,
      id: user._id.toString(), // Add id for compatibility
      name: user.name,
      email: user.email,
      verified: user.verified,
      createdAt: user.createdAt
    };
    
    console.log("Login successful, returning user:", { 
      id: userToReturn._id, 
      email: userToReturn.email 
    });
    
    return NextResponse.json({
      message: 'Sign in successful',
      user: userToReturn,
      token
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { message: 'Failed to sign in', error: String(error) },
      { status: 500 }
    );
  }
}

