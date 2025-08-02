"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "@/components/Calendar/DatePicker";
import HistoricalEvents from "@/components/Events/HistoricalEvents";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
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

      <div className="w-full max-w-6xl backdrop-blur-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate.toISOString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <HistoricalEvents date={selectedDate} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 