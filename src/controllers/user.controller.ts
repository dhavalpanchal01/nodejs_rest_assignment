import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import User, { IUser } from "../models/user.model";

// Helper function for creating tokens
const createToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

// Register User
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const user = await User.create({ email, firstName, lastName, password });
    return res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Login User
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isPasswordCorrect = await existingUser.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(existingUser._id.toString());
    return res
      .status(200)
      .json({ message: "Login successful!", accessToken: token });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google Auth Callback
export const googleAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("callback hit");
  passport.authenticate(
    "google",
    { session: false },
    (err, user: IUser | false, info) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ message: "Authentication failed", error: err || info });
      }
      const token = createToken(user._id.toString());
      return res
        .status(200)
        .json({ message: "Login successful!", accessToken: token });
    }
  )(req, res, next);
};
