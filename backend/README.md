# Miss Minutes API

Express + TypeScript API for the TemPad frontend.

## Development

```bash
npm install
npm run dev
```

## Docker

From the repository root:

```bash
cd backend
docker compose up --build
```

## Endpoints

- `GET /api/health`
- `POST /api/agent/chat`
- `GET /api/conversations`
- `GET /api/memories`
- `GET /api/timeline`
- `GET /api/plugins`

## Database

The API uses MySQL through `mysql2/promise`. The initial schema is in `sql/schema.sql`.

## Security

Keep database credentials server-side. Configure `CORS_ORIGINS` explicitly in production. Add authentication, rate limiting, request logging, and provider-specific authorization before exposing the API publicly.
