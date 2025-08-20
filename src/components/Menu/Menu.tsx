"use client";

import { useState } from "react";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import { audioPlayer } from "@/utils/audio";
import MobileMenu from "./MobileMenu";
import { motion } from "framer-motion";
import Link from "next/link";

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    audioPlayer.playClick();
  };

  return (
    <nav className="w-full h-auto md:h-[65px] fixed top-4 z-50 px-4 md:px-8">
      <div className="w-full h-full flex flex-row items-center justify-center m-auto max-w-7xl mx-auto">
        <div className="bg-black/20 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl shadow-black/30">
          <div className="flex flex-row items-center justify-between px-8 py-4">
            <Logo />

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.ul 
                className="flex items-center space-x-1 lg:space-x-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, staggerChildren: 0.1 }}
              >
                <MenuItem text="Home" url="/" />
                <MenuItem text="Journey" url="/journey" />
                <MenuItem text="Calendar" url="/calendar" />
                <MenuItem text="Quiz" url="/quiz" />
                <MenuItem text="Education" url="/education" />
                <MenuItem text="About" url="/about" />
              </motion.ul>
              
              {/* Login Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="relative"
              >
                <Link href="/login">
                  <button
                    className="group relative px-6 py-2.5 rounded-2xl bg-gradient-to-r from-space-purple-600/20 to-space-cyan-600/20 border border-white/30 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-space-purple-500/25 overflow-hidden"
                    onMouseEnter={() => audioPlayer.playHover()}
                    onClick={() => audioPlayer.playClick()}
                  >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-space-purple-600/10 to-space-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute top-1 left-2 w-1 h-1 bg-space-cyan-400 rounded-full animate-pulse" />
                    <div className="absolute top-3 right-3 w-0.5 h-0.5 bg-space-purple-400 rounded-full animate-pulse delay-100" />
                    <div className="absolute bottom-2 left-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200" />
                  </div>
                  
                  {/* Text with glow effect */}
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Login
                  </span>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-space-purple-500/20 to-space-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
              onClick={toggleMenu}
              onMouseEnter={() => audioPlayer.playHover()}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );
}

// Menu icon
function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

// Close icon
function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default Menu;