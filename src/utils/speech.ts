class SpeechHandler {
  private static instance: SpeechHandler;
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[];
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private constructor() {
    this.synthesis = window.speechSynthesis;
    this.voices = [];
    
    // Initialize voices
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = () => {
        this.voices = this.synthesis.getVoices();
      };
    }
    this.voices = this.synthesis.getVoices();
  }

  public static getInstance(): SpeechHandler {
    if (!SpeechHandler.instance) {
      SpeechHandler.instance = new SpeechHandler();
    }
    return SpeechHandler.instance;
  }

  public speak(text: string, onStart?: () => void, onEnd?: () => void): void {
    // Cancel any ongoing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find an English voice
    const englishVoice = this.voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.includes('Female')
    ) || this.voices[0];
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;

    this.currentUtterance = utterance;
    this.synthesis.speak(utterance);
  }

  public stop(): void {
    if (this.currentUtterance) {
      this.synthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public isPaused(): boolean {
    return this.synthesis.paused;
  }

  public isPlaying(): boolean {
    return this.synthesis.speaking;
  }
}

// Export a singleton instance
export const speechHandler = typeof window !== 'undefined' ? SpeechHandler.getInstance() : null; 