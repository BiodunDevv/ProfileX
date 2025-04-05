/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConn";
import Portfolio from "@/modal/Portfolio";
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

// Helper function to verify token
async function verifyAuthToken(token: string | null): Promise<{ userId: string } | null> {
  if (!token) return null;
  
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-fallback-secret');
    return decoded as { userId: string };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// Helper function to get authenticated user ID
async function getAuthenticatedUserId(req: Request): Promise<string | null> {
  try {
    // Get headers
    const headersList = await headers();
    
    // Try to get the token from the Authorization header
    const authHeader = headersList.get('authorization');
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;
    
    // Verify the token
    const decoded = await verifyAuthToken(token);
    return decoded?.userId || null;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

// POST endpoint to create a new portfolio
export async function POST(request: Request) {
  try {
    // Check authentication using your custom auth system
    const userId = await getAuthenticatedUserId(request);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if portfolio already exists
    const existingPortfolio = await Portfolio.findOne({ user: userId });

    if (existingPortfolio) {
      return NextResponse.json(
        {
          message: "Portfolio already exists. Use PATCH to update.",
          portfolioId: existingPortfolio._id,
        },
        { status: 409 } // Conflict
      );
    }

    // Get request body
    const body = await request.json();

    console.log("Creating new portfolio:", JSON.stringify(body, null, 2));

    // Create new portfolio
    const portfolio = new Portfolio({
      user: userId,
      ...body,
    });

    await portfolio.save();

    return NextResponse.json(
      { message: "Portfolio created successfully", portfolio },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return NextResponse.json(
      {
        message: "Error creating portfolio",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve the user's portfolio
export async function GET(request: Request) {
  try {
    // Check authentication using your custom auth system
    const userId = await getAuthenticatedUserId(request);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Find the portfolio
    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return NextResponse.json(
        { message: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    console.error("Error retrieving portfolio:", error);
    return NextResponse.json(
      {
        message: "Error retrieving portfolio",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PATCH endpoint to update an existing portfolio
export async function PATCH(request: Request) {
  try {
    // Check authentication using your custom auth system
    const userId = await getAuthenticatedUserId(request);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Get request body
    const body = await request.json();

    console.log("Updating portfolio data:", JSON.stringify(body, null, 2));

    // Find existing portfolio
    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return NextResponse.json(
        { message: "Portfolio not found. Use POST to create a new one." },
        { status: 404 }
      );
    }

    // Update portfolio
    Object.keys(body).forEach((key) => {
      portfolio[key] = body[key];
    });

    portfolio.updatedAt = new Date();
    await portfolio.save();

    return NextResponse.json(
      { message: "Portfolio updated successfully", portfolio },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return NextResponse.json(
      {
        message: "Error updating portfolio",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove a portfolio
export async function DELETE(request: Request) {
  try {
    // Check authentication using your custom auth system
    const userId = await getAuthenticatedUserId(request);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Find and delete the portfolio
    const result = await Portfolio.findOneAndDelete({ user: userId });

    if (!result) {
      return NextResponse.json(
        { message: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Portfolio deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    return NextResponse.json(
      {
        message: "Error deleting portfolio",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
