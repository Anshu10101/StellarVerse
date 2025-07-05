'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchSpaceWeather, shouldNotifyWeatherConditions } from '@/services/spaceWeatherService';
import { SpaceWeatherState } from '@/types/spaceWeather';
import { SolarWindIcon, GeomagneticIcon, AlertIcon, StatusIcon } from './WeatherIcons';
import { playNotification } from '@/utils/audio';

const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

export default function SpaceWeatherWidget() {
  const [weatherData, setWeatherData] = useState<SpaceWeatherState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSpaceWeather();
        setWeatherData(data);
        
        // Play notification if conditions are severe
        if (shouldNotifyWeatherConditions(data)) {
          playNotification();
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  if (isLoading && !weatherData) {
    return (
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 w-full">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-8 bg-gray-700/50 rounded w-3/4"></div>
          <div className="h-24 bg-gray-700/50 rounded"></div>
          <div className="h-6 bg-gray-700/50 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 w-full text-red-400">
        <AlertIcon className="w-8 h-8 mb-2" />
        <p>Unable to fetch space weather data</p>
      </div>
    );
  }

  const statusColor = {
    quiet: 'text-green-400',
    active: 'text-yellow-400',
    storm: 'text-orange-400',
    severe: 'text-red-400'
  }[weatherData.status];

  // Mobile collapsed view
  if (!isExpanded && window.innerWidth < 640) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsExpanded(true)}
        className="w-full bg-black/30 backdrop-blur-sm rounded-full p-3 shadow-lg flex items-center gap-2 justify-center"
      >
        <StatusIcon status={weatherData.status} className={`w-6 h-6 ${statusColor}`} />
        <span className="text-sm font-medium">Space Weather</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-sm rounded-lg p-4 w-full shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base xs:text-lg font-semibold">Space Weather</h3>
        <div className="flex items-center gap-2">
          <StatusIcon status={weatherData.status} className={`w-5 h-5 xs:w-6 xs:h-6 ${statusColor}`} />
          {window.innerWidth < 640 && (
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Collapse widget"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3 xs:space-y-4">
        <div className="flex items-center gap-3">
          <SolarWindIcon className="w-4 h-4 xs:w-5 xs:h-5 text-blue-400" />
          <div>
            <p className="text-xs xs:text-sm text-gray-400">Solar Wind</p>
            <p className="text-sm xs:text-base font-medium">{weatherData.solarWind.speed} km/s</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <GeomagneticIcon className="w-4 h-4 xs:w-5 xs:h-5 text-purple-400" />
          <div>
            <p className="text-xs xs:text-sm text-gray-400">Kp Index</p>
            <p className="text-sm xs:text-base font-medium">{weatherData.geomagneticActivity.kpIndex}</p>
          </div>
        </div>

        <AnimatePresence>
          {weatherData.alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-2 xs:gap-3 bg-red-500/20 rounded p-2 xs:p-3"
            >
              <AlertIcon className="w-4 h-4 xs:w-5 xs:h-5 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs xs:text-sm font-medium text-red-400">Active Alerts</p>
                <ul className="text-xs xs:text-sm space-y-1 mt-1">
                  {weatherData.alerts.map(alert => (
                    <li key={alert.messageID}>
                      {alert.message.slice(0, 80)}
                      {alert.message.length > 80 ? '...' : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 xs:mt-4 flex justify-between items-center text-[10px] xs:text-xs text-gray-500">
        <p>Last updated: {new Date(weatherData.lastUpdated).toLocaleTimeString()}</p>
        {isLoading && <p>Refreshing...</p>}
      </div>
    </motion.div>
  );
} 