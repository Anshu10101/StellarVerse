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
          className="md:hidden bg-space-dark/95 backdrop-blur-lg fixed top-[65px] left-0 right-0 z-50"
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
            <MobileMenuItem text="About" url="/about" onClick={onClose} />
          </motion.ul>
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