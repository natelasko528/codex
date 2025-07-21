import jwt from 'jsonwebtoken';

// Placeholder for secret key. In production, use environment variables.
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // if there is no token, return 401 Unauthorized
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.sendStatus(403); // if token is invalid, return 403 Forbidden
        }

        // Attach user information from the token to the request object
        // This assumes the token payload contains userId and potentially other user details
        // You might want to fetch the full user object from the database here if needed
        // For now, we'll use the decoded payload directly
        try {
            // Find user by ID from decoded token to ensure user still exists and get latest info
            // This is an optional but good practice. For simplicity, we are directly using decoded payload.
            // If fetching user data:
            // const user = await findUserById(decoded.userId);
            // if (!user) return res.sendStatus(403); // User not found

            req.user = {
                userId: decoded.userId,
                username: decoded.username,
                // email: user.email if fetched from DB
            };
            next(); // Token is valid, proceed to the route handler
        } catch (dbError) {
            console.error('Error fetching user during token authentication:', dbError);
            res.sendStatus(500); // Internal server error if DB fails
        }
    });
};