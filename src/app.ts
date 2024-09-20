import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session"; // If you're using sessions
import "./config/passportGoogle";

const app: Application = express();

app.use(cors());
app.use(express.json());

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_ID!,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
import userRoutes from "./routes/user.routes";
app.use("/api/users", userRoutes);

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  return res.send("Server is up!");
});

export default app;
