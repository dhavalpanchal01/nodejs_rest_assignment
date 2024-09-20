import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/user.model";


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });
  
      if (existingUser) {
        return done(null, existingUser);
      }
  
      const newUser = new User({
        googleId: profile.id,
        email: profile.emails?.[0].value,
        name: profile.displayName,
      });
  
      await newUser.save();
      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }
  )
);
  
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });