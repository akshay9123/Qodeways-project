import connectDB from "@/lib/db"; // Import database connection
import UserSchema from "@/schema/user.schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signIn } from "@/app/auth";

export const config = {
  runtime: "nodejs", // Ensures Node.js runtime instead of Edge
};


// LOGIN API
export const POST = async (request) => {
  const { email, password } = await request.json();
  if(!email || !password) throw new Error("Please provide all the details")
  try {
    
    await signIn("credentials",{
      email,
      password
    })
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while logging in",
    }, { status: 500 });
  }
};