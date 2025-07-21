import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

// Connect to the default postgres database first to create our target database
const setupClient = new Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres', // Connect to default database first
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
});

async function setupDatabase() {
  try {
    await setupClient.connect();
    console.log('Connected to PostgreSQL');
    
    // Check if database exists
    const checkDB = await setupClient.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME || 'hail_db']
    );
    
    if (checkDB.rows.length === 0) {
      // Create the database
      await setupClient.query(`CREATE DATABASE ${process.env.DB_NAME || 'hail_db'}`);
      console.log(`Database '${process.env.DB_NAME || 'hail_db'}' created successfully`);
    } else {
      console.log(`Database '${process.env.DB_NAME || 'hail_db'}' already exists`);
    }
    
  } catch (error) {
    console.error('Error setting up database:', error.message);
    process.exit(1);
  } finally {
    await setupClient.end();
  }
}

setupDatabase();