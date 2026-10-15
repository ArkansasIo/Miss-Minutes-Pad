# Audio Assets

Store only audio that you created, licensed, or otherwise have permission to distribute.

Supported browser formats may include:

- `.mp3`
- `.wav`
- `.ogg`
- `.m4a` where supported by the target browser

Suggested naming:

```text
public/audio/
  ui-start.mp3
  ui-confirm.mp3
  ui-alert.mp3
  assistant-greeting.mp3
```

The application can use `src/audio.ts` to play these assets. Browser Speech Synthesis remains the default fallback, so the application does not require bundled voice recordings.
