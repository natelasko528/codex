# Hail Backend

Simple Express server to store leads and hail events.
Data is kept in memory only and resets whenever you restart the server.

## Running locally

```
pnpm install --ignore-workspace
pnpm start
```

This will start the server on port `3001` by default. The API exposes:

- `GET /leads` - list all leads
- `POST /leads` - add a new lead
- `GET /hail-events` - list hail events
- `POST /hail-events` - add a new hail event
