# System Architecture

## Purpose

Define the boundary between the static iPhone-first TemPad client, the dynamic API, AI-agent services, scheduled jobs, and MySQL persistence.

## Components

| Component | Responsibility | Deployment |
|---|---|---|
| Web client | UI, speech input, audio playback, AJAX | GitHub Pages |
| API | Authentication, validation, agent orchestration, persistence | HTTPS server |
| Agent service | Prompt handling, tool/plugin orchestration | Backend |
| Scheduler | Cron jobs and maintenance tasks | Backend |
| MySQL | Persistent application state | Managed/private database |

## Data boundary

The browser may contain public configuration such as the API base URL. It must never contain database credentials or private backend secrets.

## Runtime flow

1. User interacts with the TemPad.
2. Speech recognition converts microphone input into text when enabled.
3. The frontend sends an authenticated HTTPS AJAX request.
4. The API validates the request.
5. The agent service processes the request.
6. The backend reads/writes MySQL as needed.
7. The API returns JSON.
8. The frontend updates the interface and optionally plays an authorized audio asset or synthetic voice.
