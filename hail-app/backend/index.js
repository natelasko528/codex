import express from "express";
import dotenv from 'dotenv';
import { createSchema } from "./src/db/index.js";
import cors from "cors";
import authRoutes from './src/routes/authRoutes.js';
import leadRoutes from './src/routes/leadRoutes.js';
import clientRoutes from './src/routes/clientRoutes.js';
import propertyRoutes from './src/routes/propertyRoutes.js';
import hailEventRoutes from './src/routes/hailEventRoutes.js';
import errorHandler from './src/middleware/errorHandler.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/hail-events', hailEventRoutes);


// Add generic error handler middleware as the last middleware
app.use(errorHandler);

// IIFE to run async operations like schema creation and server start
(async () => {
  try {
    await createSchema();
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
