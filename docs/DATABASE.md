# Database Design

## MySQL boundary

MySQL is a backend-only dependency. The browser never connects directly to the database.

## Core tables

```text
users
sessions
conversations
messages
memories
timeline_events
plugins
jobs
agent_events
```

## Initial relational model

- `users`: account identity and authentication metadata.
- `sessions`: server-side session/token metadata with expiry and revocation state.
- `conversations`: conversation ownership and timestamps.
- `messages`: ordered user/agent messages belonging to a conversation.
- `memories`: user-scoped persistent facts with source and timestamps.
- `timeline_events`: events displayed by the TemPad timeline.
- `plugins`: registered feature metadata and enablement state.
- `jobs`: scheduled task definitions and execution state.
- `agent_events`: audit/diagnostic events that do not contain secrets.

## Requirements

- Use foreign keys for ownership relationships.
- Add indexes for account IDs, conversation IDs, timestamps, and job status.
- Use parameterized queries or an ORM.
- Encrypt sensitive values where appropriate.
- Apply retention rules to logs and agent events.
- Run migrations through a controlled deployment process.
