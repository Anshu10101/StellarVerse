"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  RocketLaunchIcon, 
  StarIcon, 
  GlobeAltIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  AcademicCapIcon,
  EnvelopeIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';
import { audioPlayer } from '@/utils/audio';
import Link from 'next/link';

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: CalendarIcon,
      title: "Events Calendar",
      description: "Stay updated with upcoming astronomical events, space missions, and cosmic phenomena.",
      color: "from-space-purple-500 to-space-cyan-500"
    },
    {
      icon: AcademicCapIcon,
      title: "Space Quiz",
      description: "Test your knowledge about the universe with interactive quizzes across various difficulty levels.",
      color: "from-space-cyan-500 to-space-blue-500"
    },
    {
      icon: UserGroupIcon,
      title: "Community",
      description: "Connect with fellow space enthusiasts and share your cosmic journey.",
      color: "from-space-blue-500 to-space-purple-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Space Enthusiasts" },
    { number: "500+", label: "Astronomical Events" },
    { number: "100+", label: "Quiz Questions" },
    { number: "24/7", label: "Cosmic Updates" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-space-purple-950/20 to-space-cyan-950/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Stars */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full"
        />
        <motion.div 
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-20 w-1 h-1 bg-space-cyan-400 rounded-full"
        />
        <motion.div 
          animate={{ 
            y: [0, -25, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-space-purple-400 rounded-full"
        />
        
        {/* Nebula-like clouds */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-1/2 w-96 h-96 bg-gradient-to-r from-space-purple-500/10 to-space-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 right-1/2 w-80 h-80 bg-gradient-to-l from-space-purple-500/10 to-space-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 px-4 md:px-10 lg:px-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-8"
          >
            <div className="p-6 bg-gradient-to-r from-space-purple-600/30 to-space-cyan-600/30 rounded-full border border-white/20 shadow-2xl">
              <RocketLaunchIcon className="w-16 h-16 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            About{" "}
            <span className="bg-gradient-to-r from-space-purple-400 via-space-cyan-400 to-space-blue-400 text-transparent bg-clip-text">
              StellarVerse
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Embark on an extraordinary journey through the cosmos with our cutting-edge space exploration platform
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:border-white/40 transition-all duration-300">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                  className="inline-block mb-3 p-3 bg-gradient-to-r from-space-purple-600/30 to-space-cyan-600/30 rounded-full"
                >
                  <StarIcon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-space-cyan-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our{" "}
                <span className="bg-gradient-to-r from-space-purple-400 to-space-cyan-400 text-transparent bg-clip-text">
                  Mission
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-space-purple-500 to-space-cyan-500 mx-auto rounded-full" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.8 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  StellarVerse aims to make astronomy and space exploration accessible to everyone. 
                  Our platform provides educational resources, interactive experiences, and a community 
                  for space enthusiasts of all ages and backgrounds.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Whether you're tracking celestial events through our calendar, testing your knowledge 
                  with our space quizzes, or simply exploring the cosmos through our content, 
                  StellarVerse is your gateway to the universe.
                </p>
              </div>
              
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="p-8 bg-gradient-to-r from-space-purple-600/20 to-space-cyan-600/20 rounded-2xl border border-white/20">
                  <GlobeAltIcon className="w-20 h-20 text-white mx-auto" />
                </div>
                {/* Floating particles around the globe */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-2 left-2 w-2 h-2 bg-space-cyan-400 rounded-full" />
                  <div className="absolute top-4 right-4 w-1 h-1 bg-space-purple-400 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white rounded-full" />
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-space-cyan-300 rounded-full" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Amazing{" "}
              <span className="bg-gradient-to-r from-space-cyan-400 to-space-blue-400 text-transparent bg-clip-text">
                Features
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-space-cyan-500 to-space-blue-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.7 + index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-8 h-full hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-space-purple-500/20">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    className={`inline-block mb-6 p-4 bg-gradient-to-r ${feature.color} rounded-2xl border border-white/20`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-space-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover effect line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-gradient-to-r from-space-purple-500 to-space-cyan-500 mt-6 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Get in{" "}
                <span className="bg-gradient-to-r from-space-blue-400 to-space-purple-400 text-transparent bg-clip-text">
                  Touch
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-space-blue-500 to-space-purple-500 mx-auto rounded-full" />
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Have questions or suggestions? Feel free to reach out through our social media channels 
                or drop us an email. We'd love to hear from you!
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link href="mailto:anshul.yadv22@gmail.com">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-space-purple-600 to-space-cyan-600 text-white font-medium rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-space-purple-500/25 overflow-hidden"
                    onMouseEnter={() => audioPlayer.playHover()}
                    onClick={() => audioPlayer.playClick()}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-space-purple-700 to-space-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Floating particles */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-pulse" />
                      <div className="absolute top-3 right-4 w-0.5 h-0.5 bg-space-cyan-300 rounded-full animate-pulse delay-200" />
                      <div className="absolute bottom-2 left-6 w-0.5 h-0.5 bg-space-purple-300 rounded-full animate-pulse delay-400" />
                    </div>
                    
                    <span className="relative z-10 flex items-center gap-3">
                      <EnvelopeIcon className="w-5 h-5" />
                      Contact Us
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-space-purple-600/20 to-space-cyan-600/20 border border-white/30 text-white font-medium rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-space-purple-600/30 hover:to-space-cyan-600/30 hover:border-white/50 overflow-hidden"
            onMouseEnter={() => audioPlayer.playHover()}
            onClick={() => audioPlayer.playClick()}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-space-purple-600/10 to-space-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute top-1/2 left-0 w-1 h-1 bg-space-cyan-400 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-space-purple-400 rounded-full animate-pulse delay-100" />
              <div className="absolute top-1/2 left-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200" />
            </div>
            
            <span className="relative z-10 flex items-center gap-2">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUpIcon className="w-4 h-4" />
              </motion.div>
              <span>Back to Top</span>
            </span>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-space-purple-500/20 to-space-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 