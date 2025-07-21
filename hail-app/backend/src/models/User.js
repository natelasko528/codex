import { query } from '../db/index.js';

// Placeholder for password hashing (in a real app, use bcrypt)
const hashPassword = async (password) => {
  // Replace with actual password hashing logic, e.g., bcrypt
  return `hashed_password_${password}`; 
};

const createUser = async (username, email, password) => {
  try {
    const passwordHash = await hashPassword(password);
    const results = await query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username, email, created_at',
      [username, email, passwordHash]
    );
    return results.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Re-throw to be handled by the caller
  }
};

const findUserByEmail = async (email) => {
  try {
    const results = await query('SELECT * FROM users WHERE email = $1', [email]);
    return results.rows[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

const findUserById = async (userId) => {
  try {
    const results = await query('SELECT user_id, username, email, created_at FROM users WHERE user_id = $1', [userId]);
    return results.rows[0];
  } catch (error) {
    console.error('Error finding user by id:', error);
    throw error;
  }
};

export { createUser, findUserByEmail, findUserById };