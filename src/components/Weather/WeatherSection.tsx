'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const SpaceWeatherWidget = dynamic(() => import('./SpaceWeatherWidget'), {
  ssr: false,
  loading: () => (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 w-full max-w-sm animate-pulse">
      <div className="h-40 bg-gray-700/50 rounded"></div>
    </div>
  )
});

export default function WeatherSection() {
  return (
    <section className="relative w-full min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/videos/blackhole.webm" type="video/webm" />
          <source src="/videos/blackhole-golden.webm" type="video/webm" />
          <source src="/videos/blackhole-golden.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <motion.div 
          className="max-w-lg"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
            Space Weather Monitor
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-6">
            Stay informed about solar activity, geomagnetic conditions, and potential space weather events that could affect Earth&apos;s magnetic field and technology.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-purple-500/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">Why Monitor?</h3>
              <p className="text-sm text-gray-400">
                Space weather can impact satellite operations, power grids, and radio communications on Earth.
              </p>
            </div>
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2">Real-time Data</h3>
              <p className="text-sm text-gray-400">
                Get live updates on solar wind speed and geomagnetic activity levels.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Weather Widget */}
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SpaceWeatherWidget />
        </motion.div>
      </div>
    </section>
  );
} 