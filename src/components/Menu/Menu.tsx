"use client";

import { useState } from "react";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import { audioPlayer } from "@/utils/audio";
import MobileMenu from "./MobileMenu";
import { motion } from "framer-motion";

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    audioPlayer.playClick();
  };

  return (
    <nav className="w-full h-auto md:h-[65px] fixed top-0 shadow-space-sm bg-space-dark/40 backdrop-blur-lg z-50">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-4 md:px-8 max-w-7xl mx-auto">
        <Logo />

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center p-2 rounded-lg text-white hover:bg-space-purple-600/20 transition-colors"
          onClick={toggleMenu}
          onMouseEnter={() => audioPlayer.playHover()}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center">
          <motion.ul 
            className="flex items-center space-x-2 lg:space-x-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
          >
            <MenuItem text="Home" url="/" />
            <MenuItem text="Calendar" url="/calendar" />
            <MenuItem text="Quiz" url="/quiz" />
            <MenuItem text="About" url="/about" />
          </motion.ul>
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