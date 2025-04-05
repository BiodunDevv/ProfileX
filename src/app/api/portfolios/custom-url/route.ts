import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConn';
import Portfolio from '@/modal/Portfolio';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import mongoose from 'mongoose';

// Generate or update custom URL for a portfolio
export async function POST(request: Request) {
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
    
    // Get the requested URL and portfolio ID from body
    const { customUrl, portfolioId } = await request.json();
    
    if (!customUrl) {
      return NextResponse.json(
        { message: 'Custom URL is required' },
        { status: 400 }
      );
    }
    
    if (!portfolioId || !mongoose.Types.ObjectId.isValid(portfolioId)) {
      return NextResponse.json(
        { message: 'Valid portfolio ID is required' },
        { status: 400 }
      );
    }
    
    // Validate URL format
    const urlRegex = /^[a-z0-9-]+$/;
    if (!urlRegex.test(customUrl)) {
      return NextResponse.json(
        { message: 'Custom URL can only contain lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }
    
    // Find the specific portfolio
    const portfolio = await Portfolio.findOne({ 
      _id: portfolioId,
      user: userId // Ensure the portfolio belongs to the user
    });
    
    if (!portfolio) {
      return NextResponse.json(
        { message: 'Portfolio not found or unauthorized access.' },
        { status: 404 }
      );
    }
    
    // Check if the custom URL is already taken
    const existingPortfolio = await Portfolio.findOne({ 
      customUrl,
      _id: { $ne: portfolio._id } // Exclude the current portfolio
    });
    
    if (existingPortfolio) {
      return NextResponse.json(
        { message: 'This custom URL is already taken. Please choose another one.' },
        { status: 409 } // Conflict
      );
    }
    
    // Update portfolio with custom URL
    portfolio.customUrl = customUrl;
    portfolio.isPublic = true;
    await portfolio.save();
    
    // Generate full URL for the portfolio
    const fullUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://profilex.vercel.app'}/p/${customUrl}`;
    
    return NextResponse.json(
      { 
        message: 'Custom URL generated successfully',
        customUrl,
        fullUrl,
        portfolio
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error generating custom URL:', error);
    return NextResponse.json(
      { 
        message: 'Error generating custom URL',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Check if a custom URL is available
export async function GET(request: Request) {
  try {
    // Get the URL from query parameters
    const { searchParams } = new URL(request.url);
    const customUrl = searchParams.get('url');
    
    if (!customUrl) {
      return NextResponse.json(
        { message: 'Custom URL parameter is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Check if URL exists
    const existingPortfolio = await Portfolio.findOne({ customUrl });
    
    return NextResponse.json(
      { 
        available: !existingPortfolio,
        customUrl
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking custom URL availability:', error);
    return NextResponse.json(
      { 
        message: 'Error checking URL availability',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}