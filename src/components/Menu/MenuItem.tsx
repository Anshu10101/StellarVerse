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
        className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all ${
          isActive 
            ? "text-white bg-space-purple-600/30" 
            : "text-gray-300 hover:text-white hover:bg-space-purple-600/20"
        }`}
        onClick={() => audioPlayer.playClick()}
        onMouseEnter={() => audioPlayer.playHover()}
      >
        {text}
        {isActive && (
          <motion.span 
            className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-1/2 bg-gradient-to-r from-space-purple-400 to-space-cyan-500"
            layoutId="underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    </motion.li>
  );
}

export default MenuItem;