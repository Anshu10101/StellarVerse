"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "@/components/Calendar/DatePicker";
import { getHistoricalAstronomyEvents } from "@/services/eventService";
import EventCard from "@/components/Events/EventCard";
import type { DataSourceType } from "@/services/eventService";

interface Event {
  year: number;
  description: string;
  links?: {
    title: string;
    url: string;
  }[];
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<DataSourceType>('space_events_today');

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents(new Date());
  }, []);

  const fetchEvents = async (date: Date) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getHistoricalAstronomyEvents(date);
      setEvents(response.events);
      setDataSource(response.dataSource);
    } catch (err) {
      setError("Failed to fetch events. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = async (date: Date) => {
    setSelectedDate(date);
    await fetchEvents(date);
  };

  // Function to render appropriate heading based on data source
  const renderSourceMessage = () => {
    switch (dataSource) {
      case 'space_events_today':
        return (
          <motion.p
            className="text-xl text-center text-emerald-300 mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Space events that occurred on this day in history
          </motion.p>
        );
      case 'mock_space_events':
        return (
          <motion.p
            className="text-xl text-center text-purple-300 mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Notable space milestones throughout history
          </motion.p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen pt-24 px-4 md:px-10 lg:px-20">
      {/* Video Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
        >
          <source src="/videos/cards-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-black/50 to-space-black pointer-events-none" />
      </div>

      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">Space History</span>
      </motion.h1>

      <motion.div
        className="w-full max-w-md mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      </motion.div>

      {!loading && !error && renderSourceMessage()}

      <div className="w-full max-w-4xl backdrop-blur-sm">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <motion.div
            className="bg-red-900/20 border border-red-500/30 text-white p-4 rounded-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDate.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {events.map((event, index) => (
                <EventCard
                  key={`${event.year}-${index}`}
                  year={event.year}
                  description={event.description}
                  links={event.links}
                  delay={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
} 