"use client";

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressBarProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

export function ScrollProgressBar({ 
  color = 'rgb(147, 51, 234)', // Default purple color
  height = 3,
  position = 'top' 
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed left-0 right-0 z-50 origin-left"
      style={{
        top: position === 'top' ? 0 : 'auto',
        bottom: position === 'bottom' ? 0 : 'auto',
        height,
        backgroundColor: color,
        scaleX,
        transformOrigin: 'left'
      }}
    />
  );
} 