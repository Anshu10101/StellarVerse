import { Variants } from 'framer-motion';

/**
 * Animation variants for consistent motion effects
 */

// Fade in animation
export const fadeIn = (delay: number = 0): Variants => ({
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeInOut',
    }
  },
});

// Fade in up animation
export const fadeInUp = (delay: number = 0, y: number = 20): Variants => ({
  hidden: { 
    opacity: 0, 
    y 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut',
    }
  },
});

// Fade in down animation
export const fadeInDown = (delay: number = 0, y: number = -20): Variants => ({
  hidden: { 
    opacity: 0, 
    y 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut',
    }
  },
});

// Scale animation
export const scaleIn = (delay: number = 0): Variants => ({
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: 'easeOut',
    }
  },
});

// Stagger children animation
export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    }
  },
});

// Slide in from left
export const slideInLeft = (delay: number = 0): Variants => ({
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: 'easeOut',
    }
  },
});

// Slide in from right
export const slideInRight = (delay: number = 0): Variants => ({
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: 'easeOut',
    }
  },
});

// Pulse animation
export const pulse = (duration: number = 2): Variants => ({
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    }
  }
});

// Float animation
export const float = (duration: number = 3, y: number = 10): Variants => ({
  float: {
    y: [`-${y}px`, `${y}px`, `-${y}px`],
    transition: {
      duration,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    }
  }
}); 