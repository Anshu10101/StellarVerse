"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { speechHandler } from "@/utils/speech";
import Image from "next/image";

interface NASAEventCardProps {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
  delay: number;
  onReadMore?: () => void;
}

const NASAEventCard = ({ 
  date, 
  title, 
  explanation, 
  url, 
  hdurl, 
  media_type, 
  copyright, 
  delay,
  onReadMore
}: NASAEventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleRead = () => {
    if (speechHandler) {
      if (isReading) {
        speechHandler.stop();
        setIsReading(false);
      } else {
        const textToRead = `NASA Astronomy Picture of the Day for ${date}: ${title}. ${explanation}`;
        speechHandler.speak(textToRead, 
          () => setIsReading(true),
          () => setIsReading(false)
        );
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const truncatedExplanation = explanation.length > 200 
    ? explanation.substring(0, 200) + '...' 
    : explanation;

  return (
    <motion.div 
      className="w-full bg-[#0a0a1a]/40 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 mb-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ 
        scale: 1.02, 
        borderColor: "rgba(59, 130, 246, 0.8)",
        boxShadow: "0 10px 30px -15px rgba(59, 130, 246, 0.3)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"
        initial={{ width: "0%" }}
        animate={isHovered ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full lg:w-64">
          {media_type === 'image' && !imageError ? (
            <motion.div 
              className="relative w-full h-48 lg:h-40 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={url}
                alt={title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, 256px"
              />
              {copyright && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">
                  © {copyright}
                </div>
              )}
            </motion.div>
          ) : (
            <div className="w-full h-48 lg:h-40 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <div className="text-center text-blue-300">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Image Unavailable</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <motion.div 
              className="flex-shrink-0 bg-blue-600 text-white px-4 py-2 rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
            >
              {formatDate(date)}
            </motion.div>
            <div className="flex items-center gap-2 text-blue-300 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              NASA APOD
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            {truncatedExplanation}
          </p>
          
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              onClick={handleRead}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 transition-colors"
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

            {onReadMore && explanation.length > 200 && (
              <motion.button
                onClick={onReadMore}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 transition-colors"
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

            <motion.a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a2e] text-blue-300 hover:text-white border border-blue-500/30 hover:bg-blue-500/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Image
            </motion.a>

            {hdurl && (
              <motion.a
                href={hdurl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a2e] text-cyan-300 hover:text-white border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
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

export default NASAEventCard; 