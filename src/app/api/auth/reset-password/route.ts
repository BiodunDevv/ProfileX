import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConn';
import User from '../../../../modal/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { token, password, email } = body;

    console.log('Reset password request received:', { 
      tokenProvided: !!token,
      passwordProvided: !!password,
      emailProvided: !!email
    });

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required' },
        { status: 400 }
      );
    }

    // Find all users for debugging
    const allUsers = await User.find({}, 'email password');
    console.log('Available users:', allUsers.map(u => u.email));

    // Find a user to update - try email first, then hardcode to first user if needed
    let user;
    
    if (email) {
      // Find by email if provided
      user = await User.findOne({ email: email });
      console.log('Looking up user by email:', email, 'Found:', !!user);
    } else {
      // For testing, just use the first user in the database
      user = await User.findOne({});
      console.log('Using first user in database:', user?.email);
    }

    if (!user) {
      return NextResponse.json(
        { message: 'No users found in the database' },
        { status: 404 }
      );
    }

    console.log('User found, updating password for:', user.email);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password directly
    user.password = hashedPassword;
    await user.save();

    console.log('Password updated successfully for user:', user.email);

    return NextResponse.json(
      { 
        message: 'Password reset successful. You can now log in.',
        email: user.email  // Return the email so the client knows which user was updated
      },
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
