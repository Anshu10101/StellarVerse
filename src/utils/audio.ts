type SoundEffect = 'click' | 'hover' | 'correct' | 'wrong' | 'success' | 'notification';

interface SoundConfig {
  src: string;
  volume: number;
  defaultVolume?: number;
}

const SOUND_CONFIGS: Record<SoundEffect, SoundConfig> = {
  click: { src: '/sounds/click.wav', volume: 0.4 },
  hover: { src: '/sounds/hover.mp3', volume: 0.2 },
  correct: { src: '/sounds/correct.wav', volume: 0.5 },
  wrong: { src: '/sounds/wrong.mp3', volume: 0.5 },
  success: { src: '/sounds/success.mp3', volume: 0.6 },
  notification: { src: '/sounds/notification.mp3', volume: 0.5 }
};

class AudioPlayer {
  private sounds: Map<SoundEffect, HTMLAudioElement> = new Map();
  private isMuted: boolean = false;
  private masterVolume: number = 0.5;
  private soundVolumes: Map<SoundEffect, number> = new Map();
  private lastPlayedTime: Map<SoundEffect, number> = new Map();
  private readonly DEBOUNCE_TIME = 50; // ms between same sound plays

  constructor() {
    if (typeof window !== 'undefined') {
      // Initialize all sound effects with their configs
      Object.entries(SOUND_CONFIGS).forEach(([effect, config]) => {
        const audio = new Audio(config.src);
        this.sounds.set(effect as SoundEffect, audio);
        this.soundVolumes.set(effect as SoundEffect, config.volume);
      });

      // Restore settings from localStorage
      this.restoreSettings();
      
      // Initial volume update
      this.updateAllVolumes();
    }
  }

  private restoreSettings() {
    const savedMute = localStorage.getItem('audioMuted');
    const savedVolume = localStorage.getItem('audioVolume');
    
    if (savedMute) {
      this.isMuted = savedMute === 'true';
    }
    
    if (savedVolume) {
      this.masterVolume = parseFloat(savedVolume);
    }
  }

  private saveSettings() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('audioMuted', this.isMuted.toString());
      localStorage.setItem('audioVolume', this.masterVolume.toString());
    }
  }

  private updateAllVolumes() {
    this.sounds.forEach((sound, effect) => {
      const baseVolume = this.soundVolumes.get(effect) || 0.5;
      sound.volume = this.isMuted ? 0 : baseVolume * this.masterVolume;
    });
  }

  play(effect: SoundEffect) {
    if (this.isMuted || typeof window === 'undefined') return;

    const sound = this.sounds.get(effect);
    if (!sound) return;

    const now = Date.now();
    const lastPlayed = this.lastPlayedTime.get(effect) || 0;

    // Debounce rapidly repeated sounds
    if (now - lastPlayed < this.DEBOUNCE_TIME) return;

    // Update last played time
    this.lastPlayedTime.set(effect, now);

    // Play the sound
    sound.currentTime = 0;
    sound.play().catch(() => {
      // Ignore errors - audio might be blocked by browser
    });
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
    this.saveSettings();
  }

  getMasterVolume(): number {
    return this.masterVolume;
  }

  setSoundVolume(effect: SoundEffect, volume: number) {
    volume = Math.max(0, Math.min(1, volume));
    this.soundVolumes.set(effect, volume);
    this.updateAllVolumes();
  }

  getSoundVolume(effect: SoundEffect): number {
    return this.soundVolumes.get(effect) || 0.5;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.updateAllVolumes();
    this.saveSettings();
    return this.isMuted;
  }

  isSoundMuted(): boolean {
    return this.isMuted;
  }

  // Convenience methods for common sounds
  playClick() { this.play('click'); }
  playHover() { this.play('hover'); }
  playCorrect() { this.play('correct'); }
  playWrong() { this.play('wrong'); }
  playSuccess() { this.play('success'); }
  playNotification() { this.play('notification'); }
}

// Create and export a singleton instance
export const audioPlayer = new AudioPlayer();

export function playNotification() {
  const audio = new Audio('/sounds/notification.mp3');
  audio.volume = 0.5;
  return audio.play().catch(err => console.error('Failed to play notification:', err));
} 