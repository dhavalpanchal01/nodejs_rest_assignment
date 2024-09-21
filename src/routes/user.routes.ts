import express from 'express'
import { googleAuth, googleAuthCallback, loginUser, registerUser } from '../controllers/user.controller';

const router = express.Router();


router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/auth/google', googleAuth); // Initiate Google Login
router.get('/auth/google/callback', googleAuthCallback); // Google Callback



export default router;