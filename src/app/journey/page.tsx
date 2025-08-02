"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioPlayer } from "@/utils/audio";
import Image from "next/image";

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  category: 'cosmic' | 'stellar' | 'planetary' | 'discovery' | 'mission' | 'technology';
  image?: string;
  links?: {
    title: string;
    url: string;
  }[];
  era: string;
  progress: number;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "13.8 BYA",
    title: "Big Bang",
    description: "The origin of space, time, matter, and energy. The universe begins with an unimaginable explosion, creating all the fundamental particles and forces that would eventually form everything we know.",
    category: "cosmic",
    era: "~13.8 Billion Years Ago",
    progress: 0,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    links: [
      { title: "Big Bang", url: "https://en.wikipedia.org/wiki/Big_Bang" },
      { title: "Cosmology", url: "https://en.wikipedia.org/wiki/Physical_cosmology" }
    ]
  },
  {
    id: 2,
    year: "13.6 BYA",
    title: "First Stars Form",
    description: "Pop III stars begin lighting up the early universe. These first stars were massive and short-lived, composed almost entirely of hydrogen and helium, and their light began to illuminate the cosmic darkness.",
    category: "stellar",
    era: "~13.6 Billion Years Ago",
    progress: 1.4,
    image: "https://images.unsplash.com/photo-1462331940025-496df7c1d41a?w=800&h=600&fit=crop",
    links: [
      { title: "Population III Stars", url: "https://en.wikipedia.org/wiki/Population_III_stars" },
      { title: "Stellar Evolution", url: "https://en.wikipedia.org/wiki/Stellar_evolution" }
    ]
  },
  {
    id: 3,
    year: "13.2 BYA",
    title: "First Galaxies Form",
    description: "Clusters of stars and gas evolve into baby galaxies. These early galaxies were much smaller than today's galaxies and contained the first generation of stars that would seed the universe with heavier elements.",
    category: "cosmic",
    era: "~13.2 Billion Years Ago",
    progress: 4.3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    links: [
      { title: "Galaxy Formation", url: "https://en.wikipedia.org/wiki/Galaxy_formation_and_evolution" },
      { title: "Early Universe", url: "https://en.wikipedia.org/wiki/Chronology_of_the_universe" }
    ]
  },
  {
    id: 4,
    year: "4.6 BYA",
    title: "Formation of the Sun",
    description: "Our solar system starts forming from a molecular cloud. A vast cloud of gas and dust collapses under gravity, forming a protostar that would become our Sun, surrounded by a disk of material that would form the planets.",
    category: "stellar",
    era: "~4.6 Billion Years Ago",
    progress: 66.7,
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop",
    links: [
      { title: "Solar System Formation", url: "https://en.wikipedia.org/wiki/Formation_and_evolution_of_the_Solar_System" },
      { title: "Sun", url: "https://en.wikipedia.org/wiki/Sun" }
    ]
  },
  {
    id: 5,
    year: "4.5 BYA",
    title: "Earth is Born",
    description: "The third rock from the Sun forms. Earth coalesces from the solar nebula, beginning as a molten ball of rock and metal that would eventually cool and develop the conditions necessary for life.",
    category: "planetary",
    era: "~4.5 Billion Years Ago",
    progress: 67.4,
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop",
    links: [
      { title: "Earth", url: "https://en.wikipedia.org/wiki/Earth" },
      { title: "Geological History", url: "https://en.wikipedia.org/wiki/Geological_history_of_Earth" }
    ]
  },
  {
    id: 6,
    year: "4.4 BYA",
    title: "Moon Forms",
    description: "Possibly from a Mars-sized body colliding with Earth. The giant impact hypothesis suggests that a massive collision between Earth and a Mars-sized protoplanet called Theia created the Moon and tilted Earth's axis.",
    category: "planetary",
    era: "~4.4 Billion Years Ago",
    progress: 68.1,
    image: "https://images.unsplash.com/photo-1522030299830-16c8c3fc1b3c?w=800&h=600&fit=crop",
    links: [
      { title: "Moon", url: "https://en.wikipedia.org/wiki/Moon" },
      { title: "Giant Impact Hypothesis", url: "https://en.wikipedia.org/wiki/Giant-impact_hypothesis" }
    ]
  },
  {
    id: 7,
    year: "3.5 BYA",
    title: "Earliest Life on Earth",
    description: "Microbial life starts showing up in ancient oceans. The first simple, single-celled organisms appear, beginning the incredible journey of life on Earth that would eventually lead to complex life forms.",
    category: "planetary",
    era: "~3.5 Billion Years Ago",
    progress: 74.6,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    links: [
      { title: "Origin of Life", url: "https://en.wikipedia.org/wiki/Abiogenesis" },
      { title: "History of Life", url: "https://en.wikipedia.org/wiki/History_of_life" }
    ]
  },
  {
    id: 8,
    year: "1609",
    title: "Galileo Builds the First Telescope",
    description: "He observes craters on the Moon and Jupiter's moons. Galileo Galilei's revolutionary observations with his telescope provided the first direct evidence that not everything orbited the Earth, challenging the geocentric model.",
    category: "discovery",
    era: "1609",
    progress: 88.3,
    image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop",
    links: [
      { title: "Galileo Galilei", url: "https://en.wikipedia.org/wiki/Galileo_Galilei" },
      { title: "Telescope", url: "https://en.wikipedia.org/wiki/Telescope" }
    ]
  },
  {
    id: 9,
    year: "1687",
    title: "Newton Publishes Principia",
    description: "Introduces universal gravity and laws of motion. Isaac Newton's 'Philosophiæ Naturalis Principia Mathematica' laid the foundation for classical mechanics and our understanding of how the universe works.",
    category: "discovery",
    era: "1687",
    progress: 87.8,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    links: [
      { title: "Isaac Newton", url: "https://en.wikipedia.org/wiki/Isaac_Newton" },
      { title: "Principia", url: "https://en.wikipedia.org/wiki/Philosophi%C3%A6_Naturalis_Principia_Mathematica" }
    ]
  },
  {
    id: 10,
    year: "1916",
    title: "Einstein's General Relativity",
    description: "Revolutionizes how we understand gravity. Einstein's theory of general relativity describes gravity as a curvature of spacetime caused by mass and energy, fundamentally changing our understanding of the universe.",
    category: "discovery",
    era: "1916",
    progress: 86.1,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    links: [
      { title: "General Relativity", url: "https://en.wikipedia.org/wiki/General_relativity" },
      { title: "Albert Einstein", url: "https://en.wikipedia.org/wiki/Albert_Einstein" }
    ]
  },
  {
    id: 11,
    year: "1929",
    title: "Hubble Discovers Universe Expansion",
    description: "Galaxies are moving away — the universe is growing. Edwin Hubble's discovery that galaxies are receding from us at speeds proportional to their distance provided the first evidence of an expanding universe.",
    category: "discovery",
    era: "1929",
    progress: 86.0,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    links: [
      { title: "Edwin Hubble", url: "https://en.wikipedia.org/wiki/Edwin_Hubble" },
      { title: "Hubble's Law", url: "https://en.wikipedia.org/wiki/Hubble%27s_law" }
    ]
  },
  {
    id: 12,
    year: "1969",
    title: "Apollo 11 Moon Landing",
    description: "First humans walk on the Moon. Iconic. Neil Armstrong and Buzz Aldrin became the first humans to set foot on another world, while Michael Collins orbited above in the command module.",
    category: "mission",
    era: "1969",
    progress: 85.9,
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&h=600&fit=crop",
    links: [
      { title: "Apollo 11", url: "https://en.wikipedia.org/wiki/Apollo_11" },
      { title: "Neil Armstrong", url: "https://en.wikipedia.org/wiki/Neil_Armstrong" }
    ]
  },
  {
    id: 13,
    year: "1990",
    title: "Hubble Space Telescope Launch",
    description: "It changes everything. Deep space becomes visible. The Hubble Space Telescope revolutionized astronomy by providing unprecedented views of the universe, free from Earth's atmospheric distortion.",
    category: "technology",
    era: "1990",
    progress: 85.8,
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
    links: [
      { title: "Hubble Space Telescope", url: "https://en.wikipedia.org/wiki/Hubble_Space_Telescope" }
    ]
  },
  {
    id: 14,
    year: "2004",
    title: "Cassini Reaches Saturn",
    description: "Sends stunning images and data from Saturn's system. The Cassini-Huygens mission provided unprecedented insights into Saturn, its rings, and its moons, including the discovery of liquid lakes on Titan.",
    category: "mission",
    era: "2004",
    progress: 85.5,
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop",
    links: [
      { title: "Cassini-Huygens", url: "https://en.wikipedia.org/wiki/Cassini%E2%80%93Huygens" },
      { title: "Saturn", url: "https://en.wikipedia.org/wiki/Saturn" }
    ]
  },
  {
    id: 15,
    year: "2015",
    title: "LIGO Detects Gravitational Waves",
    description: "Confirms Einstein's theory 100 years later. The Laser Interferometer Gravitational-Wave Observatory detected gravitational waves for the first time, confirming a key prediction of Einstein's general relativity.",
    category: "discovery",
    era: "2015",
    progress: 85.4,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    links: [
      { title: "LIGO", url: "https://en.wikipedia.org/wiki/LIGO" },
      { title: "Gravitational Wave", url: "https://en.wikipedia.org/wiki/Gravitational_wave" }
    ]
  },
  {
    id: 16,
    year: "2019",
    title: "First Image of a Black Hole",
    description: "Event Horizon Telescope captures M87's shadow. The Event Horizon Telescope collaboration produced the first direct image of a black hole, showing the shadow of the supermassive black hole at the center of galaxy M87.",
    category: "discovery",
    era: "2019",
    progress: 85.3,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    links: [
      { title: "Event Horizon Telescope", url: "https://en.wikipedia.org/wiki/Event_Horizon_Telescope" },
      { title: "Black Hole", url: "https://en.wikipedia.org/wiki/Black_hole" }
    ]
  },
  {
    id: 17,
    year: "2021",
    title: "James Webb Space Telescope Launch",
    description: "Peeks deep into the early universe, stunning clarity. The James Webb Space Telescope, the most powerful space telescope ever built, is designed to observe the earliest galaxies and stars in the universe.",
    category: "technology",
    era: "2021",
    progress: 85.3,
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
    links: [
      { title: "James Webb Space Telescope", url: "https://en.wikipedia.org/wiki/James_Webb_Space_Telescope" }
    ]
  },
  {
    id: 18,
    year: "2024",
    title: "Artemis I Launch (NASA)",
    description: "Marks return to Moon missions, prep for human return. NASA's Artemis program aims to return humans to the Moon and establish a sustainable presence, with Artemis I being the first uncrewed test flight.",
    category: "mission",
    era: "2024",
    progress: 85.3,
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&h=600&fit=crop",
    links: [
      { title: "Artemis Program", url: "https://en.wikipedia.org/wiki/Artemis_program" },
      { title: "Artemis I", url: "https://en.wikipedia.org/wiki/Artemis_1" }
    ]
  },
  {
    id: 19,
    year: "2025",
    title: "Planned Artemis II (Crewed Lunar Flyby)",
    description: "First crewed flight beyond low Earth orbit since Apollo. Artemis II will carry astronauts around the Moon, testing the Orion spacecraft and Space Launch System rocket in preparation for lunar landing.",
    category: "mission",
    era: "2025",
    progress: 85.3,
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&h=600&fit=crop",
    links: [
      { title: "Artemis II", url: "https://en.wikipedia.org/wiki/Artemis_2" }
    ]
  }
];

const categories = [
  { id: 'all', name: 'All Events', color: 'from-purple-500 to-blue-500' },
  { id: 'cosmic', name: 'Cosmic', color: 'from-purple-500 to-pink-500' },
  { id: 'stellar', name: 'Stellar', color: 'from-yellow-500 to-orange-500' },
  { id: 'planetary', name: 'Planetary', color: 'from-green-500 to-emerald-500' },
  { id: 'discovery', name: 'Discovery', color: 'from-blue-500 to-cyan-500' },
  { id: 'mission', name: 'Mission', color: 'from-red-500 to-pink-500' },
  { id: 'technology', name: 'Technology', color: 'from-indigo-500 to-purple-500' }
];

export default function SpaceJourneyPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [imageError, setImageError] = useState(false);

  const filteredEvents = selectedCategory === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    audioPlayer.playClick();
  };

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setImageError(false);
    audioPlayer.playClick();
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'from-purple-500 to-blue-500';
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
        className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">Cosmic Timeline</span>
      </motion.h1>

      <motion.p
        className="text-xl text-center text-gray-300 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        From the Big Bang to the future of space exploration
      </motion.p>

      {/* Journey Progress */}
      <motion.div
        className="w-full max-w-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-[#0a0a1a]/40 backdrop-blur-sm rounded-xl border border-purple-500/30 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">Journey Progress</span>
            <span className="text-purple-400 font-bold">85.3%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: '85.3%' }}
            ></div>
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'bg-[#1a1a2e] text-gray-300 hover:text-white hover:bg-[#2a2a3e]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="w-full max-w-6xl">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-x-1/2"></div>

          {/* Timeline Events */}
          <div className="space-y-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r ${getCategoryColor(event.category)} rounded-full border-4 border-[#0a0a1a] transform -translate-x-1/2 z-10`}></div>

                {/* Event Card */}
                <motion.div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="bg-[#0a0a1a]/40 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 cursor-pointer"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-bold text-purple-400">{event.year}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(event.category)} text-white`}>
                        {event.category.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{event.era}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {event.description.length > 150 
                        ? event.description.substring(0, 150) + '...' 
                        : event.description}
                    </p>
                    {event.description.length > 150 && (
                      <button className="mt-3 text-purple-400 hover:text-purple-300 text-sm font-medium">
                        Read More →
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Message */}
      <motion.div
        className="w-full max-w-4xl text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">The Journey Continues</h2>
        <p className="text-xl text-gray-300">Exploring the infinite cosmos ahead...</p>
      </motion.div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
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
              onClick={() => setSelectedEvent(null)}
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
                      <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedEvent.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(selectedEvent.category)} text-white`}>
                        {selectedEvent.category.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {selectedEvent.era}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {selectedEvent.year}
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => setSelectedEvent(null)}
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
                {/* Image Section */}
                {selectedEvent.image && !imageError ? (
                  <div className="mb-6">
                    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                      <Image
                        src={selectedEvent.image}
                        alt={selectedEvent.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  </div>
                ) : selectedEvent.image && (
                  <div className="mb-6">
                    <div className="w-full h-64 md:h-80 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 flex items-center justify-center">
                      <div className="text-center text-purple-300">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-lg font-medium">Image Unavailable</p>
                        <p className="text-sm text-gray-400 mt-2">{selectedEvent.title}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description Section */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                  <p className="text-gray-200 leading-relaxed text-base">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Links Section */}
                {selectedEvent.links && selectedEvent.links.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Learn More</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.links.map((link, index) => (
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
    </div>
  );
} 