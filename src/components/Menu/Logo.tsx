"use client";

import Image from "next/image";
import Link from "next/link";
import { audioPlayer } from "@/utils/audio";
import { motion } from "framer-motion";

function Logo() {
  return (
    <Link 
      href="/"
      className="h-auto w-auto flex flex-row items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-lg"
      onClick={() => audioPlayer.playClick()}
      onMouseEnter={() => audioPlayer.playHover()}
    >
      <motion.div 
        className="relative h-9 w-9 sm:h-10 sm:w-10"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Image 
          src="/galaxy-logo.png"
          alt="StellarVerse Logo"
          fill
          sizes="(max-width: 640px) 36px, 40px"
          className="object-contain cursor-pointer"
          priority
        />
      </motion.div>
      <motion.span 
        className="font-bold ml-2 text-lg sm:text-xl heading-gradient"
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="hidden xs:inline">StellarVerse</span>
        <span className="xs:hidden">SV</span>
      </motion.span>
    </Link>
  );
}

export default Logo;