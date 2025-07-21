import jwt from 'jsonwebtoken';
import { createUser as createUserModel, findUserByEmail } from '../models/User.js'; // Renamed to avoid conflict

// Placeholder for secret key. In production, use environment variables.
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key'; 

// Function to generate JWT
const generateToken = (userId, username) => {
    return jwt.sign(
        { userId, username },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );
};

// Controller for user registration
export const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required: username, email, password' });
    }

    try {
        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Create new user
        const newUser = await createUserModel(username, email, password); // Use the renamed model function
        
        // Generate JWT token
        const token = generateToken(newUser.user_id, newUser.username);

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: { userId: newUser.user_id, username: newUser.username, email: newUser.email }, 
            token 
        });
    } catch (error) {
        console.error('Error in registration controller:', error);
        // Pass error to the next middleware (e.g., error handler)
        next(error); 
    }
};

// Controller for user login
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // In a real app, you would compare the provided password with the stored hash
        // For now, we'll assume a successful match if user is found and password verification is faked
        // Example: const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
        // For this example, we'll simulate a successful login for any provided password if user exists
        const isPasswordMatch = true; // Replace with actual password verification

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user.user_id, user.username);

        res.status(200).json({ 
            message: 'User logged in successfully', 
            user: { userId: user.user_id, username: user.username, email: user.email }, 
            token 
        });
    } catch (error) {
        console.error('Error in login controller:', error);
        next(error);
    }
};

// Controller to get current user info (requires auth middleware)
export const getUserProfile = async (req, res, next) => {
    // req.user is populated by the authenticateToken middleware
    const { userId, username, email } = req.user; 
    try {
        // You might want to fetch more details from the DB if needed
        res.json({ userId, username, email });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        next(error);
    }
};