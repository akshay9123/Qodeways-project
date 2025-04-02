import connectDB from "@/lib/db";
import UserSchema from "@/schema/user.schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// SIGNUP API
export const POST = async (request) => {
  try {
    // Ensure database is connected
    await connectDB();

    // Extract user credentials
    const { firstName, lastName, email, phone, password, otherDetails } = await request.json();

    // Validate input fields
    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json({ success: false, message: "Kindly insert all the input fields" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email already exists" }, { status: 409 });
    }

    

    // Create new user in the database
    const user = await UserSchema.create({
      firstName,
      lastName,     
      email,
      phone,
      password, 
      otherDetails,
    });

    // Return success response
    return NextResponse.json({ success: true, message: "User registered successfully", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
