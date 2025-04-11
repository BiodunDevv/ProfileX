/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConn";
import Portfolio from "@/modal/Portfolio";
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';
import { z } from "zod";

// Define JWT payload type for better type safety
type JwtPayload = {
  userId: string;
  iat?: number;
  exp?: number;
};

// Helper for consistent error responses
function errorResponse(message: string, status = 500, error?: unknown) {
  console.error(`Error (${status}): ${message}`, error);
  return NextResponse.json(
    {
      message,
      error: error instanceof Error ? error.message : error ?? "Unknown error",
    },
    { status }
  );
}

async function getAuthenticatedUserId(request: Request): Promise<string | null> {
  try {
    // Try to get the auth header directly from the request first
    let authHeader = request.headers.get('authorization');
    
    // If not found in request headers, try Next.js headers API
    if (!authHeader) {
      const headersList = await headers();
      authHeader = headersList.get('authorization');
    }
    
    console.log("Auth header found:", authHeader ? "Yes" : "No");
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("Invalid authorization header format:", authHeader);
      return null;
    }
    
    const token = authHeader.split(' ')[1];
    console.log("Token extracted (first 15 chars):", token.substring(0, 15) + "...");
    
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      console.error("ACCESS_TOKEN_SECRET environment variable is not set");
      return null;
    }
    
    try {
      const decoded = jwt.verify(token, secret) as any;
      console.log("JWT verification successful:", decoded);
      
      // Check for userId field which we know exists in your token
      const userId = decoded.userId;
      
      if (!userId) {
        console.error("Token payload doesn't contain userId field:", decoded);
        return null;
      }
      
      console.log("User authenticated with ID:", userId);
      return userId;
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError);
      return null;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

// Define portfolio schema for validation
const PortfolioSchema = z.object({
  templateType: z.string(),
  brandName: z.string(),
  title: z.string(),
  description: z.string().optional(),
  heroImage: z.string().optional(),
  companies: z.array(z.string()).optional(),
  sectionAbout: z.string().optional(),
  sectionSubtitle: z.string().optional(),
  aboutMeDescription: z.string().optional(),
  skills: z.array(z.object({
    name: z.string(),
    level: z.number(),
    color: z.string()
  })).optional(),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    years: z.string().optional(),
    description: z.string().optional()
  })).optional(),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()).optional(),
    imageUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    featured: z.boolean().optional()
  })).optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    icon: z.string().optional(),
    url: z.string()
  })).optional(),
  isPublic: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  customUrl: z.string().optional(),
});

// Define which fields can be updated in a PATCH request
const ALLOWED_UPDATE_FIELDS = [
  'templateType', 'brandName', 'title', 'description', 'heroImage', 
  'companies', 'sectionAbout', 'sectionSubtitle', 'aboutMeDescription',
  'skills', 'education', 'projects', 'socialLinks', 'isPublic', 'tags', 'customUrl'
];

// POST endpoint to create a new portfolio
export async function POST(request: Request) {
  try {
    // Get authenticated user ID
    const userId = await getAuthenticatedUserId(request);
    
  

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
        { status: 409 }
      );
    }

    // Get request body and validate
    const body = await request.json();
    
    try {
      // Validate body against schema
      PortfolioSchema.parse(body);
    } catch (validationError) {
      return errorResponse("Invalid portfolio data", 400, validationError);
    }

    // Create new portfolio with userId
    const portfolio = new Portfolio({
      ...body,
      user: userId
    });

    await portfolio.save();

    return NextResponse.json(
      { 
        message: "Portfolio created successfully", 
        portfolio 
      },
      { status: 201 }
    );

  } catch (error) {
    // JWT specific error handling
    if (error instanceof jwt.JsonWebTokenError) {
      return errorResponse("Invalid authentication token", 401);
    }
    
    return errorResponse("Error creating portfolio", 500, error);
  }
}

// GET endpoint to retrieve the user's portfolio
export async function GET(request: Request) {
  try {
    // Check authentication
    const userId = await getAuthenticatedUserId(request);

    if (!userId) {
      return errorResponse("Unauthorized. Please log in.", 401);
    }

    // Connect to database
    await connectDB();

    // Find the portfolio
    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return errorResponse("Portfolio not found", 404);
    }

    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    return errorResponse("Error retrieving portfolio", 500, error);
  }
}

// PATCH endpoint to update an existing portfolio
export async function PATCH(request: Request) {
  try {
    // Check authentication
    const userId = await getAuthenticatedUserId(request);

    if (!userId) {
      return errorResponse("Unauthorized. Please log in.", 401);
    }

    // Connect to database
    await connectDB();

    // Get request body
    const body = await request.json();
    
    try {
      // Validate body against schema (partial validation for PATCH)
      PortfolioSchema.partial().parse(body);
    } catch (validationError) {
      return errorResponse("Invalid portfolio data", 400, validationError);
    }

    // Find existing portfolio
    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return errorResponse("Portfolio not found. Use POST to create a new one.", 404);
    }

    // Update only allowed fields
    ALLOWED_UPDATE_FIELDS.forEach(field => {
      if (body[field] !== undefined) {
        portfolio[field] = body[field];
      }
    });

    portfolio.updatedAt = new Date();
    await portfolio.save();

    return NextResponse.json(
      { message: "Portfolio updated successfully", portfolio },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse("Error updating portfolio", 500, error);
  }
}

// DELETE endpoint to remove a portfolio
export async function DELETE(request: Request) {
  try {
    // Check authentication
    const userId = await getAuthenticatedUserId(request);

    if (!userId) {
      return errorResponse("Unauthorized. Please log in.", 401);
    }

    // Connect to database
    await connectDB();

    // Find and delete the portfolio
    const result = await Portfolio.findOneAndDelete({ user: userId });

    if (!result) {
      return errorResponse("Portfolio not found", 404);
    }

    return NextResponse.json(
      { message: "Portfolio deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse("Error deleting portfolio", 500, error);
  }
}
