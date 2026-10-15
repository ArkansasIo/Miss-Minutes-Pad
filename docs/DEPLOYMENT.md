# Deployment Design

## Frontend

Build the Vite application and publish the generated `dist/` directory through GitHub Pages.

## Backend

Deploy the API separately to an HTTPS-capable server/platform. Configure:

- `DATABASE_URL` or equivalent MySQL connection settings
- AI provider credentials
- authentication secrets
- CORS allowed origins
- cron/scheduler configuration

These values must remain server-side.

## Environments

Use separate development, staging, and production configurations. Never commit production secrets.

## Release sequence

1. Run type checking and tests.
2. Build the frontend.
3. Deploy the backend if API changes are included.
4. Run database migrations.
5. Deploy the static frontend.
6. Verify `/api/health` from the deployed client.
7. Smoke-test chat, speech, authentication, and authorized persistence paths.
