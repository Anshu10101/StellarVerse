"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getHistoricalAstronomyEvents } from "@/services/eventService";
import EventCard from "./EventCard";
import NASAEventCard from "./NASAEventCard";
import EventModal from "./EventModal";
import type { DataSourceType } from "@/services/eventService";

interface WikiEvent {
  year: number;
  description: string;
  links?: {
    title: string;
    url: string;
  }[];
}

interface NASAEvent {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
}

type EventTab = 'all' | 'wikipedia' | 'nasa';

interface HistoricalEventsProps {
  date?: Date;
}

const HistoricalEvents = ({ date }: HistoricalEventsProps) => {
  const [events, setEvents] = useState<WikiEvent[]>([]);
  const [nasaEvents, setNasaEvents] = useState<NASAEvent[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(date || new Date());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<DataSourceType>('space_events_today');
  const [activeTab, setActiveTab] = useState<EventTab>('all');
  const [modalEvent, setModalEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (date) {
      setCurrentDate(date);
    }
  }, [date]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getHistoricalAstronomyEvents(currentDate);
        setEvents(response.events);
        setNasaEvents(response.nasaEvents);
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
  }, [currentDate]);

  const handleReadMore = (event: any, type: 'wikipedia' | 'nasa') => {
    setModalEvent({ ...event, type });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalEvent(null);
  };

  // Function to render appropriate message based on data source
  const renderSourceMessage = () => {
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    switch (dataSource) {
      case 'space_events_today':
        return (
          <motion.p
            className="text-xl text-center text-emerald-300 mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Space events that occurred on {formattedDate} in history
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
            No space events occurred on {formattedDate} in history. Here&apos;s other notable events from this day.
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
            Unable to fetch historical events for {formattedDate}. Here are notable space milestones throughout history.
          </motion.p>
        );
      default:
        return null;
    }
  };

  const renderTabButton = (tab: EventTab, label: string, count: number) => (
    <motion.button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
        activeTab === tab
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
          : 'bg-[#1a1a2e] text-gray-300 hover:text-white hover:bg-[#2a2a3e]'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
      <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
        {count}
      </span>
    </motion.button>
  );

  const renderEvents = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <motion.div
          className="bg-red-900/20 border border-red-500/30 text-white p-4 rounded-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      );
    }

    const hasWikiEvents = events.length > 0;
    const hasNasaEvents = nasaEvents.length > 0;
    const totalEvents = events.length + nasaEvents.length;

    if (totalEvents === 0) {
      return (
        <motion.div
          className="bg-[#0a0a1a]/40 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-300 text-lg">No events found for this date in history.</p>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Tab Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {renderTabButton('all', 'All Events', totalEvents)}
          {hasWikiEvents && renderTabButton('wikipedia', 'Wikipedia', events.length)}
          {hasNasaEvents && renderTabButton('nasa', 'NASA APOD', nasaEvents.length)}
        </motion.div>

        {/* Events Content */}
        <div className="space-y-6">
          {/* Wikipedia Events */}
          {(activeTab === 'all' || activeTab === 'wikipedia') && hasWikiEvents && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === 'wikipedia' && (
                <motion.h3
                  className="text-2xl font-bold text-center mb-6 text-purple-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Historical Space Events
                </motion.h3>
              )}
              {events.map((event, index) => (
                <EventCard
                  key={`wiki-${event.year}-${index}`}
                  year={event.year}
                  description={event.description}
                  links={event.links}
                  delay={index}
                  onReadMore={() => handleReadMore(event, 'wikipedia')}
                />
              ))}
            </motion.div>
          )}

          {/* NASA APOD Events */}
          {(activeTab === 'all' || activeTab === 'nasa') && hasNasaEvents && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === 'nasa' && (
                <motion.h3
                  className="text-2xl font-bold text-center mb-6 text-blue-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  NASA Astronomy Pictures of the Day
                </motion.h3>
              )}
              {nasaEvents.map((event, index) => (
                <NASAEventCard
                  key={`nasa-${event.date}-${index}`}
                  date={event.date}
                  title={event.title}
                  explanation={event.explanation}
                  url={event.url}
                  hdurl={event.hdurl}
                  media_type={event.media_type}
                  copyright={event.copyright}
                  delay={index}
                  onReadMore={() => handleReadMore(event, 'nasa')}
                />
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <>
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
          {formattedDate}
        </motion.p>
        
        {!loading && !error && renderSourceMessage()}
        
        {renderEvents()}
      </section>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={modalEvent}
      />
    </>
  );
};

export default HistoricalEvents; 