import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import jwt from 'jsonwebtoken';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !email || !password) {
    return res.status(400).json({ message: "All the fields are required!" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

		const user = await User.create({email, firstName, lastName, password});

		return res.status(201).json({ message: 'User registered successfully' })
  } catch (error: any) {
		return res.status(500).json({ message: 'Server error', error });
	}
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
	const { email, password } = req.body;
	
	if(!email || !password) {
		return res.status(400).json({ message: 'All fields are required'});
	}

	try {
		const existingUser = await User.findOne({email});
		if(!existingUser) {
			return res.status(400).json({message: 'User not found!'});
		}

		const isPasswordCorrect = await existingUser.comparePassword(password);

    if(isPasswordCorrect) {
      const token = jwt.sign({userId: existingUser._id, userEmail: existingUser.email}, process.env.JWT_SECRET as string)
      return res.status(200).json({token: token})
    }

	} catch (error) {
		
	}
};
