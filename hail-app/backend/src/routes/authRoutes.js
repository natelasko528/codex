import express from 'express';
import { register, login, getUserProfile } from '../controllers/authController.js';
import {authenticateToken} from '../middleware/authMiddleware.js'; // We'll create this next

const router = express.Router();

// POST /api/auth/register - User registration
router.post('/register', register);

// POST /api/auth/login - User login
router.post('/login', login);

// GET /api/auth/profile - Get current user profile (requires authentication)
router.get('/profile', authenticateToken, getUserProfile);

export default router;