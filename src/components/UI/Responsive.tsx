"use client";

import { useState, useEffect } from 'react';

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<BreakpointKey, number> = {
  'xs': 480,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
};

interface ResponsiveProps {
  children: React.ReactNode;
  breakpoint: BreakpointKey;
  mode: 'up' | 'down';
}

/**
 * Responsive component that conditionally renders content based on screen size
 * @param children Content to render
 * @param breakpoint The breakpoint to check against
 * @param mode 'up' shows content at or above breakpoint, 'down' shows content below breakpoint
 */
export function Responsive({ children, breakpoint, mode }: ResponsiveProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    const checkSize = () => {
      const width = window.innerWidth;
      if (mode === 'up') {
        setShouldRender(width >= breakpoints[breakpoint]);
      } else {
        setShouldRender(width < breakpoints[breakpoint]);
      }
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    
    return () => window.removeEventListener('resize', checkSize);
  }, [breakpoint, mode]);

  // Don't render anything on the server to avoid hydration mismatches
  if (!hasMounted) return null;
  
  return shouldRender ? <>{children}</> : null;
}

/**
 * Hook to get current screen size information
 * @returns Object with screen size information
 */
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        width,
        height,
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return screenSize;
} 