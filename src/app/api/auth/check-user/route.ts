import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbConn";
import User from "../../../../modal/User";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { identifier } = await req.json();

    if (!identifier) {
      return NextResponse.json(
        { message: "Identifier is required" },
        { status: 400 }
      );
    }

    // Find user by email or username (without exposing sensitive info)
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier.toLowerCase() },
      ],
    }).select("email verified");

    return NextResponse.json({
      exists: !!user,
      user: user ? { email: user.email, verified: user.verified } : null,
    });
  } catch (error) {
    console.error("User check error:", error);
    return NextResponse.json(
      { message: "Error checking user", error: String(error) },
      { status: 500 }
    );
  }
}
