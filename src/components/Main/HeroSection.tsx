"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/UI/Button";
import { Container } from "@/components/UI/Container";
import { fadeInUp, staggerContainer } from "@/utils/animations";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video 
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 30%' }}
        >
          <source src="/videos/blackhole-golden.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-space-black/30 to-space-black"></div>
      </div>
      
      <Container>
        <motion.div 
          className="relative z-10 flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.2, 0.3)}
        >
          <motion.h1 
            variants={fadeInUp()}
            className="text-4xl xs:text-5xl md:text-7xl font-bold text-center text-white mb-6 select-text"
          >
            Welcome to <span className="heading-gradient">StellarVerse</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp()}
            className="text-lg xs:text-xl md:text-2xl text-center text-gray-300 max-w-3xl px-4 mb-10 select-text"
          >
            Explore the cosmos, discover celestial events, test your space knowledge, and journey through the universe.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp()}
            className="flex flex-col xs:flex-row gap-4 mt-4"
          >
            <Button 
              href="/calendar"
              variant="primary"
              size="lg"
            >
              Explore Events
            </Button>
            <Button 
              href="/quiz"
              variant="outline"
              size="lg"
            >
              Take a Quiz
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
} 