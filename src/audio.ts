export type VoiceMood = 'idle' | 'happy' | 'alert' | 'thinking';

export interface VoiceOptions {
  mood?: VoiceMood;
  rate?: number;
  pitch?: number;
  volume?: number;
}

/**
 * Plays a prerecorded Miss Minutes-style WAV/MP3 asset when available.
 * The repository intentionally uses original/licensed audio assets rather than
 * reproducing a copyrighted performance or actor's voice.
 */
export async function playVoiceAsset(path: string): Promise<void> {
  const audio = new Audio(path);
  audio.preload = 'auto';
  await audio.play();
}

/**
 * Local fallback for browsers that cannot play a supplied voice asset.
 * This is a stylized synthetic voice, not an imitation of a specific performer.
 */
export function speakText(text: string, options: VoiceOptions = {}): void {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate ?? 1.02;
  utterance.pitch = options.pitch ?? 1.28;
  utterance.volume = options.volume ?? 1;
  window.speechSynthesis.speak(utterance);
}

export function stopVoice(): void {
  window.speechSynthesis?.cancel();
}
