# Hail Lead Generation App

This directory contains a simple proof-of-concept hail storm lead generation application.
All data is stored in memory, so restarting the backend will clear any leads or events.

Features:

- Express backend for managing leads and hail events
- React frontend with basic forms to add/view leads and events
- Intended to be mobile friendly using responsive design

## Getting started

1. Start the backend API:

   ```
   cd backend
   pnpm install --ignore-workspace
   pnpm start
   ```

2. In a separate terminal, start the frontend:

   ```
   cd frontend
   pnpm install --ignore-workspace
   pnpm start
   ```

The frontend will open at `http://localhost:3000` and communicate with the backend running on `http://localhost:3001`.

This is a minimal skeleton to demonstrate the idea from the user request. It is not production ready.
