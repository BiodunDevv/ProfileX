/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Get the cookie store
    const cookieStore = await cookies();
    
    cookieStore.delete('token');
    cookieStore.delete('refreshToken');
    cookieStore.delete('user');
    
    
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Logout failed', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests if you want to support logout via navigation
export async function GET(request: Request) {
  return POST(request);
}