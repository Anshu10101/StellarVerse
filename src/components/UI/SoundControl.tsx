"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioPlayer } from '@/utils/audio';

export function SoundControl() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMuted(audioPlayer.isSoundMuted());
    setVolume(audioPlayer.getMasterVolume());
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioPlayer.setMasterVolume(newVolume);
    audioPlayer.playClick();
  };

  const toggleMute = () => {
    const newMuted = audioPlayer.toggleMute();
    setIsMuted(newMuted);
    if (!newMuted) {
      audioPlayer.playClick();
    }
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <motion.div
        className={`bg-[#0a0a1a]/90 backdrop-blur-lg rounded-xl border border-purple-500/30 p-4 ${
          isOpen ? 'mb-2' : ''
        }`}
      >
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            audioPlayer.playClick();
          }}
          className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
          onMouseEnter={() => audioPlayer.playHover()}
        >
          {isMuted ? (
            <VolumeOffIcon className="w-6 h-6" />
          ) : (
            <VolumeOnIcon className="w-6 h-6" />
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-purple-400 transition-colors"
                  onMouseEnter={() => audioPlayer.playHover()}
                >
                  {isMuted ? (
                    <VolumeOffIcon className="w-6 h-6" />
                  ) : (
                    <VolumeOnIcon className="w-6 h-6" />
                  )}
                </button>
                <div className="relative flex-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 accent-purple-500"
                  />
                  <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-xs text-purple-400">
                    <span>0%</span>
                    <span>{Math.round(volume * 100)}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function VolumeOnIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    </svg>
  );
}

function VolumeOffIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    </svg>
  );
} 