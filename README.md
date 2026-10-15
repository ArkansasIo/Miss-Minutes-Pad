# TVA TemPad — Miss Minutes

A TypeScript/Vite, iPhone-first TVA TemPad-style interface with an AJAX/HTTPS API boundary, speech recognition, voice playback, and a dynamic backend architecture designed to keep MySQL credentials off the client.

## Project status

The repository contains the frontend foundation and audio layer. The production deployment is intentionally split into a static GitHub Pages frontend and a separate HTTPS backend that owns the AI agent, authentication, scheduled jobs, and MySQL connection.

## Features

- iPhone-first responsive TemPad interface
- GitHub Pages-compatible static frontend
- TypeScript + Vite architecture
- AJAX requests implemented with the browser `fetch()` API
- Typed API wrapper for health, agent chat, conversations, memories, timeline, and plugins
- Web Speech API integration planned for microphone input and speech-to-text
- WAV/MP3 asset playback support
- Browser speech-synthesis fallback using a stylized synthetic voice
- PWA manifest and iOS safe-area support
- MySQL isolated behind an HTTPS API
- Environment-based API URL configuration
- Architecture suitable for cron/scheduled jobs and persistent agent state

## Important voice and IP note

The interface is inspired by the TVA/TemPad presentation associated with *Loki*. This repository does not include copyrighted voice recordings or claim to reproduce the voice performance of a specific actor. Use only audio files you own, have licensed, or are otherwise authorized to use. The built-in speech-synthesis fallback is a generic stylized synthetic voice.

## Architecture

```text
┌──────────────────────────────┐
│ iPhone / Safari / PWA        │
│                              │
│ TemPad UI                    │
│ Speech Recognition           │
│ Voice Playback               │
└──────────────┬───────────────┘
               │ HTTPS AJAX
               ▼
┌──────────────────────────────┐
│ Backend API                  │
│                              │
│ /api/health                  │
│ /api/agent/chat              │
│ /api/conversations           │
│ /api/memories               │
│ /api/timeline                │
│ /api/plugins                 │
│ Auth / validation / cron     │
└──────────────┬───────────────┘
               │ private DB connection
               ▼
┌──────────────────────────────┐
│ MySQL                        │
│ users / sessions / memory    │
│ conversations / timeline     │
│ plugins / jobs / events      │
└──────────────────────────────┘
```

The browser must never receive MySQL credentials. `VITE_API_URL` points the static frontend at the backend API.

## Local development

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Set the API endpoint:

```text
VITE_API_URL=http://localhost:3000
```

Run the frontend:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## AJAX API contract

The frontend uses a typed `ajax<T>()` wrapper around `fetch()`.

### Health

```http
GET /api/health
```

### Agent chat

```http
POST /api/agent/chat
Content-Type: application/json

{"message":"Hello, Miss Minutes"}
```

Expected response:

```json
{"reply":"Hello! How can I help?"}
```

### Conversations

```http
GET /api/conversations
```

### Memories

```http
GET /api/memories
```

### Timeline

```http
GET /api/timeline
```

### Plugins

```http
GET /api/plugins
```

## Speech pipeline

The intended voice interaction is:

```text
Microphone
   ↓
Web Speech API
   ↓
recognized text
   ↓
AJAX POST /api/agent/chat
   ↓
agent response
   ↓
WAV/MP3 asset OR browser speech synthesis
   ↓
TemPad UI
```

Because browser speech recognition support varies by platform, the application should expose a graceful fallback and clearly communicate microphone permission or unsupported-browser errors.

## Audio assets

Place authorized audio assets under a suitable static asset directory, for example:

```text
public/audio/
├── greeting.wav
├── confirmation.wav
├── alert.wav
└── error.wav
```

Do not commit third-party copyrighted recordings unless you have the necessary rights.

## Suggested repository structure

```text
Miss-Minutes-Pad/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATABASE.md
│   ├── DEPLOYMENT.md
│   ├── SECURITY.md
│   ├── AUDIO.md
│   └── uml/
│       ├── system-architecture.mmd
│       ├── sequence-chat.mmd
│       └── database-erd.mmd
├── public/
│   └── audio/
├── src/
│   ├── api.ts
│   ├── audio.ts
│   ├── main.ts
│   ├── speech.ts
│   └── style.css
├── .env.example
├── .gitignore
├── index.html
├── LICENSE
├── manifest.webmanifest
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Security model

- Never put MySQL usernames, passwords, private keys, or API secrets in `VITE_*` variables.
- Treat all browser input as untrusted.
- Validate and authorize requests on the backend.
- Use HTTPS in production.
- Configure CORS to allow only the deployed frontend origin.
- Store passwords using a modern password-hashing algorithm; never store plaintext passwords.
- Use parameterized SQL queries or a trusted ORM/query builder.
- Rate-limit authentication and AI-agent endpoints.
- Keep production secrets in the backend deployment environment.

## GitHub Pages

GitHub Pages can host the compiled Vite frontend because the frontend is static. The dynamic API and MySQL database must run on a separate backend service.

For a project Pages site, configure Vite's `base` option to match the repository path when required:

```ts
export default defineConfig({
  base: '/Miss-Minutes-Pad/'
});
```

The deployment workflow should build `dist/` and publish it through GitHub Pages.

## License

The source code in this repository is released under the MIT License. See [`LICENSE`](./LICENSE).

Third-party characters, trademarks, recordings, artwork, music, and other assets remain the property of their respective owners and are not granted by the MIT License.
