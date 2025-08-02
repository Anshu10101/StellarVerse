"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { speechHandler } from "@/utils/speech";

interface EventCardProps {
  year: number;
  description: string;
  links?: {
    title: string;
    url: string;
  }[];
  delay: number;
  onReadMore?: () => void;
}

const EventCard = ({ year, description, links = [], delay, onReadMore }: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const handleRead = () => {
    if (speechHandler) {
      if (isReading) {
        speechHandler.stop();
        setIsReading(false);
      } else {
        const textToRead = `In ${year}, ${description}`;
        speechHandler.speak(textToRead, 
          () => setIsReading(true),
          () => setIsReading(false)
        );
      }
    }
  };

  const truncatedDescription = description.length > 150 
    ? description.substring(0, 150) + '...' 
    : description;

  return (
    <motion.div 
      className="w-full bg-[#0a0a1a]/40 backdrop-blur-sm rounded-xl border border-purple-500/30 p-5 mb-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ 
        scale: 1.02, 
        borderColor: "rgba(168, 85, 247, 0.8)",
        boxShadow: "0 10px 30px -15px rgba(168, 85, 247, 0.3)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"
        initial={{ width: "0%" }}
        animate={isHovered ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <motion.div 
          className="flex-shrink-0 bg-purple-600 text-white px-4 py-2 rounded-full font-medium"
          whileHover={{ scale: 1.05 }}
        >
          {year}
        </motion.div>
        
        <div className="flex-1">
          <p className="text-gray-200 text-lg mb-3">{truncatedDescription}</p>
          
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              onClick={handleRead}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 transition-colors"
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

            {onReadMore && description.length > 150 && (
              <motion.button
                onClick={onReadMore}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Read More
              </motion.button>
            )}

            {links && links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {links.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.span 
                      className="inline-block text-sm bg-[#1a1a2e] text-purple-300 hover:text-white px-3 py-1 rounded-full border border-purple-500/30"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(168, 85, 247, 0.2)"
                      }}
                    >
                      {link.title}
                    </motion.span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
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

export default EventCard; 