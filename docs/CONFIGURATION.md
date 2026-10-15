# Configuration

## Frontend

Create `.env` locally from `.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

`VITE_*` values are compiled into the browser bundle. Never place passwords, database credentials, or private API keys in them.

## Backend

Create `backend/.env` from `backend/.env.example`:

```env
PORT=3000
DATABASE_URL=mysql://app_user:change_me@localhost:3306/miss_minutes
CORS_ORIGINS=http://localhost:5173
```

## Local Docker

```bash
cd backend
docker compose up --build
```

The API is then available at `http://localhost:3000` and MySQL at port `3306`.

## Production

Deploy the frontend to GitHub Pages and the API/MySQL stack to a server or managed platform. Set the frontend `VITE_API_URL` to the public API origin during the Pages build.

Do not expose `DATABASE_URL` or database passwords to the frontend.
