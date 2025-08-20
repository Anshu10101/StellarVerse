"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { audioPlayer } from "@/utils/audio";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/30 backdrop-blur-md fixed top-[85px] left-4 right-4 z-50 rounded-3xl border border-white/20 shadow-xl shadow-black/30"
        >
          <motion.ul 
            className="flex flex-col w-full py-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <MobileMenuItem text="Home" url="/" onClick={onClose} />
            <MobileMenuItem text="Space Journey" url="/journey" onClick={onClose} />
            <MobileMenuItem text="Calendar" url="/calendar" onClick={onClose} />
            <MobileMenuItem text="Quiz" url="/quiz" onClick={onClose} />
            <MobileMenuItem text="Space Education" url="/education" onClick={onClose} />
            <MobileMenuItem text="About" url="/about" onClick={onClose} />
          </motion.ul>
          
          {/* Login Button for Mobile */}
          <div className="px-6 py-4 border-t border-white/10">
            <Link href="/login">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full group relative px-6 py-3 rounded-2xl bg-gradient-to-r from-space-purple-600/30 to-space-cyan-600/30 border border-white/30 text-white font-medium transition-all duration-300 hover:scale-105 overflow-hidden"
                onMouseEnter={() => audioPlayer.playHover()}
                onClick={() => audioPlayer.playClick()}
              >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-space-purple-600/20 to-space-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute top-2 left-3 w-1 h-1 bg-space-cyan-400 rounded-full animate-pulse" />
                <div className="absolute top-4 right-4 w-0.5 h-0.5 bg-space-purple-400 rounded-full animate-pulse delay-100" />
                <div className="absolute bottom-3 left-5 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200" />
              </div>
              
              {/* Text with icon */}
                              <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Login to StellarVerse
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mobile menu item with larger touch target
function MobileMenuItem({ text, url, onClick }: { text: string; url: string; onClick: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === url;
  
  return (
    <motion.li 
      className="w-full"
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      }}
    >
      <Link
        href={url}
        className={`flex w-full px-6 py-4 text-base font-medium transition-colors ${
          isActive 
            ? "text-white bg-space-purple-600/30 border-l-4 border-space-purple-500" 
            : "text-gray-300 hover:text-white hover:bg-space-purple-600/20"
        }`}
        onClick={() => {
          audioPlayer.playClick();
          onClick();
        }}
        onMouseEnter={() => audioPlayer.playHover()}
      >
        {text}
      </Link>
    </motion.li>
  );
} 