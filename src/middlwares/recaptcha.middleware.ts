import { Request, Response, NextFunction } from "express";
import axios from "axios";

const verifyRecaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.body.recaptchaToken; // The token sent from frontend

  console.log("token==>", token);

  if (!token) {
    return res.status(400).json({ message: "reCAPTCHA token is required" });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify`;

    const response = await axios.post(verificationURL, null, {
      params: {
        secret: secretKey,
        response: token,
      },
    });

    console.log(response.data);
    const { success, score } = response.data;

    if (!success) {
      return res.status(400).json({ message: "Failed reCAPTCHA verification" });
    }

    // For reCAPTCHA v2, you typically do not check the score
    // Just ensure `success` is true

    // If verification passed, proceed to next middleware or controller
    next();
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return res
      .status(500)
      .json({ message: "Server error during reCAPTCHA verification" });
  }
};

export default verifyRecaptcha;
