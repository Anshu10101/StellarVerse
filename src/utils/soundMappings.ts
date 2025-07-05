import { audioPlayer } from './audio';

// Utility function to add sound effects to any element
export function addSoundEffect(element: HTMLElement, effect: 'click' | 'hover') {
  if (effect === 'click') {
    element.addEventListener('click', () => audioPlayer.playClick());
  } else if (effect === 'hover') {
    element.addEventListener('mouseenter', () => audioPlayer.playHover());
  }
}

// Utility function to remove sound effects from any element
export function removeSoundEffect(element: HTMLElement, effect: 'click' | 'hover') {
  if (effect === 'click') {
    element.removeEventListener('click', () => audioPlayer.playClick());
  } else if (effect === 'hover') {
    element.removeEventListener('mouseenter', () => audioPlayer.playHover());
  }
}

// React hook to add sound effects to elements
export function useSoundEffects() {
  return {
    // Add click and hover effects to an element
    addSoundEffects: (ref: React.RefObject<HTMLElement>) => {
      if (ref.current) {
        addSoundEffect(ref.current, 'click');
        addSoundEffect(ref.current, 'hover');
      }
    },
    // Remove click and hover effects from an element
    removeSoundEffects: (ref: React.RefObject<HTMLElement>) => {
      if (ref.current) {
        removeSoundEffect(ref.current, 'click');
        removeSoundEffect(ref.current, 'hover');
      }
    },
    // Play specific sounds
    playClick: () => audioPlayer.playClick(),
    playHover: () => audioPlayer.playHover(),
    playCorrect: () => audioPlayer.playCorrect(),
    playWrong: () => audioPlayer.playWrong(),
    playSuccess: () => audioPlayer.playSuccess(),
    playNotification: () => audioPlayer.playNotification(),
  };
}

// Common sound effect props for components
export const soundEffectProps = {
  onClick: () => audioPlayer.playClick(),
  onMouseEnter: () => audioPlayer.playHover(),
};

// Sound effect mappings for different interactions
export const soundMappings = {
  // Quiz interactions
  quiz: {
    correctAnswer: () => audioPlayer.playCorrect(),
    wrongAnswer: () => audioPlayer.playWrong(),
    complete: () => audioPlayer.playSuccess(),
  },
  
  // Navigation interactions
  navigation: {
    menuOpen: () => audioPlayer.playClick(),
    menuClose: () => audioPlayer.playClick(),
    routeChange: () => audioPlayer.playSuccess(),
  },
  
  // UI feedback
  ui: {
    buttonClick: () => audioPlayer.playClick(),
    buttonHover: () => audioPlayer.playHover(),
    modalOpen: () => audioPlayer.playNotification(),
    modalClose: () => audioPlayer.playClick(),
    notification: () => audioPlayer.playNotification(),
    success: () => audioPlayer.playSuccess(),
    error: () => audioPlayer.playWrong(),
  },
  
  // Form interactions
  form: {
    submit: () => audioPlayer.playSuccess(),
    error: () => audioPlayer.playWrong(),
    fieldChange: () => audioPlayer.playClick(),
  },
  
  // Calendar interactions
  calendar: {
    dateSelect: () => audioPlayer.playClick(),
    eventAdd: () => audioPlayer.playSuccess(),
    eventRemove: () => audioPlayer.playWrong(),
  },
}; 