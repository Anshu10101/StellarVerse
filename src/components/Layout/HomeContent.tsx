'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SpaceFact } from '@/components/Facts/SpaceFact';

// Dynamic import with SSR disabled to avoid hydration issues with animations
const HeroSection = dynamic(
  () => import('@/components/Main/HeroSection'),
  { ssr: false }
);

const HistoricalEvents = dynamic(
  () => import('@/components/Events/HistoricalEvents'),
  { ssr: false }
);

const AstronomyPicture = dynamic(
  () => import('@/components/NASA/AstronomyPicture'),
  { ssr: false }
);

const WeatherSection = dynamic(
  () => import('@/components/Weather/WeatherSection'),
  { ssr: false }
);

export default function HomeContent() {
  const [isFactVisible, setIsFactVisible] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col w-full">
        <HeroSection />
        <HistoricalEvents />
        <AstronomyPicture />
        <WeatherSection />
      </div>
      
      <div className="fixed bottom-4 xs:bottom-8 right-4 xs:right-8 z-50">
        <SpaceFact 
          isVisible={isFactVisible}
          onClose={() => setIsFactVisible(false)}
        />
      </div>

      {/* Space Facts Button */}
      <button
        onClick={() => setIsFactVisible(true)}
        className="fixed bottom-4 xs:bottom-8 left-4 xs:left-8 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors z-50"
      >
        Show me a fact!
      </button>
    </main>
  );
} 