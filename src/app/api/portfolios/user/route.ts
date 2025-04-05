/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConn';
import Portfolio from '@/modal/Portfolio';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Get all portfolios for the current user
export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Connect to database
    await connectDB();
    
    // Find all portfolios for this user
    const portfolios = await Portfolio.find({ user: userId })
      .sort({ updatedAt: -1 });
    
    return NextResponse.json({ portfolios }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving portfolios:', error);
    return NextResponse.json(
      { 
        message: 'Error retrieving portfolios',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}