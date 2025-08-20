"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { audioPlayer } from "@/utils/audio";
import { motion } from "framer-motion";

interface MenuItemProps {
  text: string;
  url: string;
}

function MenuItem({ text, url }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === url;
  
  return (
    <motion.li 
      className="relative flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={url}
        className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 z-10 ${
          isActive 
            ? "text-white" 
            : "text-gray-300 hover:text-white"
        }`}
        onClick={() => audioPlayer.playClick()}
        onMouseEnter={() => audioPlayer.playHover()}
      >
        {text}
        {isActive && (
          <motion.span 
            className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30"
            layoutId="activeBackground"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    </motion.li>
  );
}

export default MenuItem;