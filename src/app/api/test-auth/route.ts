import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    // Get all headers
    const headersList = await headers();
    const allHeaders = Object.fromEntries(headersList.entries());
    console.log("Headers received:", allHeaders);
    
    // Check for Authorization header
    const authHeader = headersList.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        error: "Missing or invalid Authorization header",
        headers: {
          ...allHeaders,
          authorization: authHeader ? "Present but redacted" : "Missing"
        }
      }, { status: 401 });
    }
    
    // Extract token
    const token = authHeader.substring(7);
    console.log("Token received:", token.substring(0, 10) + "...");
    
    // Try to decode
    let decoded;
    try {
      decoded = jwt.decode(token);
    } catch (e) {
      return NextResponse.json({ 
        error: "Failed to decode token",
        token: token.substring(0, 10) + "...",
        errorMessage: e instanceof Error ? e.message : String(e)
      }, { status: 400 });
    }
    
    // Verify using ACCESS_TOKEN_SECRET
    try {
      const verified = jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET || "fallback-secret"
      );
      
      return NextResponse.json({
        message: "Authentication successful",
        user: {
          id: typeof verified === 'object' && 'userId' in verified 
            ? verified.userId 
            : "Unknown"
        },
        token: {
          decoded,
          length: token.length,
          format: "JWT"
        }
      });
    } catch (e) {
      return NextResponse.json({
        error: "Token verification failed",
        details: e instanceof Error ? e.message : String(e),
        token: {
          decoded,
          length: token.length,
          format: "JWT"
        },
        environment: {
          hasAccessTokenSecret: !!process.env.ACCESS_TOKEN_SECRET,
          secretPreview: process.env.ACCESS_TOKEN_SECRET 
            ? process.env.ACCESS_TOKEN_SECRET.substring(0, 5) + "..." 
            : "Not available"
        }
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// Test from your browser console to check if fetch is sending headers correctly:
// Run this in your browser's developer console

async function testHeaderSending() {
  const storageItem = localStorage.getItem('auth-storage');
  const token = storageItem ? JSON.parse(storageItem)?.state?.token : null;
  
  if (!token) {
    console.error("No token in storage");
    return;
  }
  
  console.log("Token from storage:", token.substring(0, 15) + "...");
  
  const response = await fetch('/api/test-auth', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Test-Header': 'TestValue'
    }
  });
  
  console.log("Status:", response.status);
  const data = await response.json();
  console.log("Response:", data);
}

testHeaderSending();