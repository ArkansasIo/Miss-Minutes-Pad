# Security Design

## Threat model

The client is an untrusted environment. Assume users can inspect, modify, or replay browser requests.

## Controls

- Keep all database credentials on the backend.
- Use HTTPS in production.
- Validate request bodies and query parameters.
- Authenticate and authorize every protected resource.
- Use secure, expiring sessions or tokens.
- Rate-limit login and agent endpoints.
- Parameterize database queries.
- Restrict CORS to known origins.
- Avoid logging secrets, session tokens, or raw credentials.
- Apply content/security headers appropriate to the deployment.
- Review third-party dependencies and lock versions.

## Audio security

Only distribute audio assets for which the project has permission. Do not treat a voice imitation as authorization to copy a particular person's protected performance.
