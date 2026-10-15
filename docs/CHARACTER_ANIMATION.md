# Character Animation System

## Purpose

This document defines the original, clock-themed animated assistant presentation used by Miss-Minutes-Pad. The application can accept user-supplied/licensed character artwork, but the repository does not redistribute Marvel/Disney artwork or actor voice recordings.

## Animation states

| State | Trigger | Visual behavior | Voice behavior |
|---|---|---|---|
| `idle` | No interaction | Gentle bob + clock pulse | Silent |
| `listening` | Speech recognition active | Faster pulse + listening ring | Silent |
| `thinking` | Agent request pending | Rotating temporal ring | Optional short UI tone |
| `speaking` | Reply being spoken | Mouth/face frame cycle | Browser TTS or authorized audio |
| `alert` | Error/system event | Amber warning pulse | Optional generic alert tone |
| `success` | Completed action | Brief positive pulse | Optional generic confirmation |

## Asset layout

```text
public/
  character/
    README.md
    idle-01.svg
    idle-02.svg
    listening.svg
    thinking.svg
    speaking-01.svg
    speaking-02.svg
    alert.svg
```

SVG is recommended for the original clock mascot because it scales cleanly on iPhone displays.

## Runtime controller

The UI should expose a single state variable:

```ts
type CharacterState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'alert'
  | 'success';
```

State transitions should be driven by application events rather than timers alone.

## Voice policy

The default implementation uses browser Speech Synthesis with a generic synthetic voice. Do not package recordings that imitate a specific performer unless the project has the required rights.
