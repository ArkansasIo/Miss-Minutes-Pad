# Audio and Speech Design

## Input

The client can use the Web Speech API for microphone speech recognition where the browser supports it and the user grants permission.

## Output

The audio layer supports:

1. Authorized WAV/MP3 assets.
2. Browser speech synthesis as a fallback.

## Pipeline

```text
Microphone → SpeechRecognition → transcript → AJAX → Agent → response → Audio/SpeechSynthesis
```

## Asset policy

Store only original, licensed, public-domain, or otherwise authorized recordings. Do not commit recordings of a performer or copyrighted dialogue without permission.

## UX states

- Idle
- Listening
- Processing
- Speaking
- Error

The UI should make microphone permission, unsupported-browser state, and playback failures visible to the user.
