import UserSchema from "@/schema/user.schema";
import { NextResponse as res } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getToken = (payload) => {
  return jwt.sign(payload, process.env.ACESS_TOKEN_SECRET, { expiresIn: "15m" });
};

// LOGIN API
export const POST = async (request) => {
  try {
    // Extracting user details
    const { email, password } = await request.json();

    // Finding user in the database
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist in the database",
      });
    }

    // Verifying password
    const isLogin = await bcrypt.compare(password, user.password);

    if (!isLogin) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generating access token
    const token = getToken({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    });

    // Creating response with cookies
    const response = new res.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("Access Token", token, {
      httpOnly: true,
      secure: process.env.PROD === "true",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    return response;
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occurred while logging in",
    });
  }
};
