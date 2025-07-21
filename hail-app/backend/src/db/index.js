import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Configure database connection based on environment variables
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'hail_db',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
};

const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err.stack);
});

// Schema definition script (example with Users table)
// In a real application, you'd likely use a migration tool like Knex.js or Sequelize
const createSchema = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS leads (
                lead_id SERIAL PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE,
                phone VARCHAR(20),
                status VARCHAR(50) DEFAULT 'New', -- e.g., New, Contacted, Follow-up, Converted, Lost
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS clients (
                client_id SERIAL PRIMARY KEY,
                lead_id INTEGER REFERENCES leads(lead_id) ON DELETE SET NULL, -- Link to lead that converted, optional
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                phone VARCHAR(20),
                address VARCHAR(255),
                city VARCHAR(100),
                state VARCHAR(50),
                zip_code VARCHAR(20),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS properties (
                property_id SERIAL PRIMARY KEY,
                client_id INTEGER REFERENCES clients(client_id) ON DELETE CASCADE, -- Link property to a client
                address VARCHAR(255) NOT NULL,
                city VARCHAR(100),
                state VARCHAR(50),
                zip_code VARCHAR(20),
                owner_name VARCHAR(100), -- Can be different from client name for specific properties
                notes TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS hail_events (
                event_id SERIAL PRIMARY KEY,
                event_date DATE NOT NULL,
                location VARCHAR(255) NOT NULL,
                damage_description TEXT,
                severity VARCHAR(50), -- e.g., Light, Moderate, Severe
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            -- Optionally, link hail events to properties if a specific hail event affected a specific property
            -- CREATE TABLE property_hail_events (
            --     property_id INTEGER REFERENCES properties(property_id) ON DELETE CASCADE,
            --     event_id INTEGER REFERENCES hail_events(event_id) ON DELETE CASCADE,
            --     PRIMARY KEY (property_id, event_id)
            -- );
        `);
    console.log('Database schema created successfully or already exists.');
  } catch (err) {
    console.error('Error creating database schema:', err.stack);
  } finally {
    client.release();
  }
};

// Function to get a client from the pool
const query = (text, params) => pool.query(text, params);

export { query, createSchema };