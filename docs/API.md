# API Design

## Base URL

The frontend reads `VITE_API_URL` at build time. Production requests must use HTTPS.

## Endpoints

### `GET /api/health`

Returns service health information.

### `POST /api/agent/chat`

Request:

```json
{"message":"Hello"}
```

Response:

```json
{"reply":"Hello!"}
```

### `GET /api/conversations`

Returns conversation summaries available to the authenticated user.

### `GET /api/memories`

Returns authorized persistent agent memories.

### `GET /api/timeline`

Returns authorized timeline/event data.

### `GET /api/plugins`

Returns the plugins/features available to the current account.

## Error contract

Use JSON errors in production:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "message is required"
  }
}
```

Recommended HTTP statuses include `400` for malformed input, `401` for missing authentication, `403` for authorization failures, `404` for missing resources, `429` for rate limits, and `500` for unexpected server errors.

## CORS

The backend should allow the deployed GitHub Pages origin and local development origin only. Do not use wildcard CORS for authenticated production APIs.
