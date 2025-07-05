"use client";

import { useState, useEffect } from 'react';
import StarsCanvas from '@/components/VFX/StarsBackground';
import Menu from '@/components/Menu/Menu';
import { SpaceFact } from '@/components/Facts/SpaceFact';
import { ScrollProgressBar } from '@/components/UI/ScrollProgressBar';
import { SoundControl } from '@/components/UI/SoundControl';
import { audioPlayer } from '@/utils/audio';
import { applyBrowserFixes } from '@/utils/browserCompatibility';
import { motion } from 'framer-motion';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isFactVisible, setIsFactVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Apply browser compatibility fixes on mount
  useEffect(() => {
    applyBrowserFixes();
    setIsMounted(true);
  }, []);

  // Show a fact every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFactVisible(true);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleFactButtonClick = () => {
    setIsFactVisible(true);
    audioPlayer.playClick();
  };

  // Skip rendering animations on server
  if (!isMounted) {
    return (
      <div className="relative z-10">
        <Menu />
        <main className="relative z-10 pt-[65px]">
          {children}
        </main>
      </div>
    );
  }

  return (
    <>
      <StarsCanvas />
      <ScrollProgressBar />
      <div className="relative z-10">
        <Menu />
        <main className="relative z-10 pt-[65px]">
          {children}
        </main>
      </div>

      {/* Space Facts Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={handleFactButtonClick}
        onMouseEnter={() => audioPlayer.playHover()}
        className="fixed bottom-4 xs:bottom-8 left-4 xs:left-8 px-4 xs:px-6 py-2 xs:py-3 rounded-full bg-space-purple-600 hover:bg-space-purple-700 text-white font-medium transition-all z-50 flex items-center gap-2 shadow-space-sm hover:shadow-space"
      >
        <StarIcon />
        <span className="hidden xs:inline">Show me a fact!</span>
        <span className="xs:hidden">Fact</span>
      </motion.button>

      {/* Space Facts Component */}
      <SpaceFact 
        isVisible={isFactVisible}
        onClose={() => setIsFactVisible(false)}
      />

      {/* Sound Control */}
      <SoundControl />
    </>
  );
}

const StarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
); 