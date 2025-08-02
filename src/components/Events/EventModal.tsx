"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { speechHandler } from "@/utils/speech";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    type: 'wikipedia' | 'nasa';
    year?: number;
    date?: string;
    title?: string;
    description: string;
    explanation?: string;
    url?: string;
    hdurl?: string;
    media_type?: string;
    copyright?: string;
    links?: {
      title: string;
      url: string;
    }[];
  } | null;
}

const EventModal = ({ isOpen, onClose, event }: EventModalProps) => {
  const [isReading, setIsReading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleRead = () => {
    if (speechHandler && event) {
      if (isReading) {
        speechHandler.stop();
        setIsReading(false);
      } else {
        const textToRead = event.type === 'nasa' 
          ? `${event.title}. ${event.explanation || event.description}`
          : `In ${event.year}, ${event.description}`;
        
        speechHandler.speak(textToRead, 
          () => setIsReading(true),
          () => setIsReading(false)
        );
      }
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatYear = (year?: number) => {
    if (!year) return '';
    return year.toString();
  };

  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a1a] border border-purple-500/30 rounded-xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a1a]/95 backdrop-blur-sm border-b border-purple-500/30 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {event.type === 'nasa' ? event.title : `${formatYear(event.year)} - ${event.description.split('.')[0]}`}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.type === 'nasa' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-purple-600 text-white'
                    }`}>
                      {event.type === 'nasa' ? 'NASA APOD' : 'Space Event'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.type === 'nasa' ? formatDate(event.date) : formatYear(event.year)}
                    </div>
                    {event.type === 'nasa' && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                        NASA Archive
                      </div>
                    )}
                  </div>
                </div>
                
                <motion.button
                  onClick={onClose}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Image Section (for NASA events) */}
              {event.type === 'nasa' && event.media_type === 'image' && !imageError && (
                <div className="mb-6">
                  <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={event.url || ''}
                      alt={event.title || 'NASA APOD'}
                      fill
                      className="object-cover"
                      onError={() => setImageError(true)}
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                  
                  <div className="mt-3 flex items-center gap-3">
                    <motion.a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      NASA APOD Image
                    </motion.a>
                    
                    {event.hdurl && (
                      <motion.a
                        href={event.hdurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        HD Version
                      </motion.a>
                    )}
                  </div>
                </div>
              )}

              {/* Copyright Section (for NASA events) */}
              {event.type === 'nasa' && event.copyright && (
                <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-yellow-500/30">
                  <div className="text-yellow-400 text-sm font-medium mb-1">
                    © Image Credit & Copyright
                  </div>
                  <div className="text-white text-sm">
                    Image Credit & Copyright: <span className="text-blue-400 hover:text-blue-300 cursor-pointer">{event.copyright}</span>
                  </div>
                </div>
              )}

              {/* Description Section */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {event.type === 'nasa' ? 'Description' : 'Event Details'}
                  </h3>
                  <motion.button
                    onClick={handleRead}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isReading ? (
                      <>
                        <StopIcon /> Stop
                      </>
                    ) : (
                      <>
                        <SpeakerIcon /> Listen
                      </>
                    )}
                  </motion.button>
                </div>
                
                <div className="text-gray-200 leading-relaxed text-base">
                  {event.type === 'nasa' ? (event.explanation || event.description) : event.description}
                </div>
              </div>

              {/* Links Section (for Wikipedia events) */}
              {event.type === 'wikipedia' && event.links && event.links.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Related Links</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.links.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 rounded-full bg-[#1a1a2e] text-purple-300 hover:text-white border border-purple-500/30 hover:bg-purple-500/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.title}
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Icon components
const SpeakerIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l3.75-3.75M12 18l-3.75-3.75M12 6L8.25 9.75M12 6l3.75 3.75" />
  </svg>
);

const StopIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
  </svg>
);

export default EventModal; 