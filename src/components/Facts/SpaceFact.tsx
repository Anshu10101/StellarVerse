"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { speechHandler } from '@/utils/speech';

// Space facts database
const spaceFacts = [
  "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
  "A day on Venus is longer than its year. It takes Venus 243 Earth days to rotate on its axis but only 225 Earth days to orbit the Sun.",
  "The largest known star, UY Scuti, is so big that it would take 1,700 years for a passenger jet to fly around it.",
  "There are more stars in the universe than grains of sand on all of Earth's beaches combined.",
  "Black holes aren't actually black. They emit radiation, now known as Hawking radiation.",
  "The footprints left by Apollo astronauts on the Moon will last for at least 100 million years.",
  "One day on Mars is 24 hours and 37 minutes long.",
  "The Great Red Spot on Jupiter is a giant storm that has been raging for at least 400 years.",
  "If you could put Saturn in a giant bathtub, it would float. The planet's density is less than that of water.",
  "The Milky Way galaxy is moving through space at a speed of about 2.1 million kilometers per hour.",
  "There is a planet made largely of diamonds, called 55 Cancri e.",
  "The largest asteroid ever recorded is Ceres, which is also classified as a dwarf planet.",
  "The temperature at the Sun's core is about 15 million degrees Celsius.",
  "Astronauts grow taller in space due to the lack of gravity on their spine.",
  "The most distant human-made object is Voyager 1, launched in 1977."
];

interface SpaceFactProps {
  isVisible: boolean;
  onClose: () => void;
}

export function SpaceFact({ isVisible, onClose }: SpaceFactProps) {
  const [fact, setFact] = useState('');
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
      setFact(randomFact);
    }
  }, [isVisible]);

  const handleRead = () => {
    if (speechHandler) {
      if (isReading) {
        speechHandler.stop();
        setIsReading(false);
      } else {
        speechHandler.speak(fact, 
          () => setIsReading(true),
          () => setIsReading(false)
        );
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-4 xs:bottom-8 right-4 xs:right-8 w-[calc(100%-2rem)] xs:w-auto max-w-sm bg-[#0a0a1a]/95 backdrop-blur-md rounded-xl border border-purple-500/30 p-4 xs:p-6 shadow-lg shadow-purple-500/10 z-50"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Close fact"
          >
            <span className="text-xl">×</span>
          </button>
          
          <h3 className="text-lg xs:text-xl font-bold text-white mb-2 xs:mb-3">
            Did You Know?
          </h3>
          
          <p className="text-sm xs:text-base text-gray-300 mb-4">
            {fact}
          </p>
          
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-0 xs:justify-between items-stretch xs:items-center">
            <button
              onClick={handleRead}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 transition-colors text-sm xs:text-base"
            >
              {isReading ? (
                <>
                  <StopIcon /> Stop
                </>
              ) : (
                <>
                  <SpeakerIcon /> Listen
                </>
              )}
            </button>
            
            <motion.button
              onClick={() => {
                const newFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
                setFact(newFact);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors text-sm xs:text-base"
            >
              New Fact
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Icon components
const SpeakerIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l3.75-3.75M12 18l-3.75-3.75M12 6L8.25 9.75M12 6l3.75 3.75" />
  </svg>
);

const StopIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
  </svg>
); 