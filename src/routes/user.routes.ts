import express from "express";
import {
  googleAuth,
  googleAuthCallback,
  loginUser,
  registerUser,
} from "../controllers/user.controller";
import verifyRecaptcha from "../middlwares/recaptcha.middleware";

const router = express.Router();

router.post("/signup", verifyRecaptcha, registerUser);
router.post("/login", verifyRecaptcha, loginUser);
router.get("/auth/google", googleAuth); // Initiate Google Login
router.get("/auth/google/callback", googleAuthCallback); // Google Callback

export default router;
