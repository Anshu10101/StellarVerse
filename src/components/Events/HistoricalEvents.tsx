"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getHistoricalAstronomyEvents } from "@/services/eventService";
import EventCard from "./EventCard";
import type { DataSourceType } from "@/services/eventService";

interface WikiEvent {
  year: number;
  description: string;
  links?: {
    title: string;
    url: string;
  }[];
}

const HistoricalEvents = () => {
  const [events, setEvents] = useState<WikiEvent[]>([]);
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<DataSourceType>('space_events_today');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getHistoricalAstronomyEvents();
        setEvents(response.events);
        setDate(response.date);
        setError(response.error);
        setDataSource(response.dataSource);
      } catch (err) {
        console.error("Error in component:", err);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to render appropriate message based on data source
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
            Space events that occurred on {date} in history
          </motion.p>
        );
      case 'general_events_today':
        return (
          <motion.p
            className="text-xl text-center text-amber-300 mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            No space events occurred on {date} in history. Here&apos;s other notable events from this day.
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
            Unable to fetch today&apos;s historical events. Here are notable space milestones throughout history.
          </motion.p>
        );
      default:
        return null;
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-3 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        This Day in Space History
      </motion.h2>
      
      <motion.p
        className="text-xl text-center text-gray-300 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {date}
      </motion.p>
      
      {!loading && !error && renderSourceMessage()}
      
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
      ) : events.length === 0 ? (
        <motion.div
          className="bg-[#0a0a1a]/40 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-300 text-lg">No events found for today in history.</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
      )}
    </section>
  );
};

export default HistoricalEvents; 