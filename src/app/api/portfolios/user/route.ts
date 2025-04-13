/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConn";
import Portfolio from "@/modal/Portfolio";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

async function getAuthenticatedUserId(
  request: Request
): Promise<string | null> {
  try {
    let authHeader = request.headers.get("authorization");

    if (!authHeader) {
      const headersList = await headers();
      authHeader = headersList.get("authorization");
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Invalid authorization header format");
      return null;
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      console.error("ACCESS_TOKEN_SECRET environment variable is not set");
      return null;
    }

    const decoded = jwt.verify(token, secret) as any;
    return decoded.userId || null;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

// GET endpoint to retrieve all portfolios for a user
export async function GET(request: Request) {
  try {
    // Check authentication
    const userId = await getAuthenticatedUserId(request);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Find all portfolios for this user
    const portfolios = await Portfolio.find({ user: userId }).sort({
      updatedAt: -1,
    });

    console.log(`Found ${portfolios.length} portfolios for user ${userId}`);

    return NextResponse.json({ portfolios }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving portfolios:", error);
    return NextResponse.json(
      {
        message: "Error retrieving portfolios",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
