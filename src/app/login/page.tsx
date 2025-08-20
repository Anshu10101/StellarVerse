"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, RocketLaunchIcon, StarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { audioPlayer } from '@/utils/audio';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    audioPlayer.playClick();
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Handle actual login logic here
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Stars */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-space-cyan-400 rounded-full animate-pulse delay-300" />
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-space-purple-400 rounded-full animate-pulse delay-700" />
        <div className="absolute top-80 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-500" />
        <div className="absolute top-96 left-1/3 w-0.5 h-0.5 bg-space-cyan-300 rounded-full animate-pulse delay-1000" />
        
        {/* Nebula-like clouds */}
        <div className="absolute top-32 left-1/2 w-96 h-96 bg-gradient-to-r from-space-purple-500/10 to-space-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-1/2 w-80 h-80 bg-gradient-to-l from-space-purple-500/10 to-space-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Login Form Card */}
          <div className="bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/50 p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-r from-space-purple-600/30 to-space-cyan-600/30 rounded-full border border-white/20">
                  <RocketLaunchIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-300">Continue your cosmic journey in StellarVerse</p>
            </motion.div>

                         {/* Google Login Button - First */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4, duration: 0.6 }}
               className="mb-8"
             >
                               <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => audioPlayer.playHover()}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
             </motion.div>

             {/* Divider */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6, duration: 0.6 }}
               className="relative mb-8"
             >
               <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-white/20" />
               </div>
               <div className="relative flex justify-center text-sm">
                 <span className="px-2 bg-black/30 text-gray-400">Or sign in with email</span>
               </div>
             </motion.div>

             {/* Login Form */}
             <motion.form
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8, duration: 0.6 }}
               onSubmit={handleSubmit}
               className="space-y-6"
             >
               {/* Email Field */}
               <div>
                 <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                   Email Address
                 </label>
                 <div className="relative">
                   <input
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-space-purple-500 focus:border-transparent transition-all duration-300"
                     placeholder="Enter your email"
                     onMouseEnter={() => audioPlayer.playHover()}
                   />
                   <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                     <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                   </div>
                 </div>
               </div>

               {/* Password Field */}
               <div>
                 <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                   Password
                 </label>
                 <div className="relative">
                   <input
                     type={showPassword ? "text" : "password"}
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-space-purple-500 focus:border-transparent transition-all duration-300"
                     placeholder="Enter your password"
                     onMouseEnter={() => audioPlayer.playHover()}
                   />
                   <button
                     type="button"
                     onClick={() => {
                       setShowPassword(!showPassword);
                       audioPlayer.playClick();
                     }}
                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                   >
                     {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                   </button>
                 </div>
               </div>

               {/* Remember Me & Forgot Password */}
               <div className="flex items-center justify-between">
                 <label className="flex items-center">
                   <input
                     type="checkbox"
                     className="w-4 h-4 text-space-purple-600 bg-white/10 border-white/20 rounded focus:ring-space-purple-500 focus:ring-offset-0"
                   />
                   <span className="ml-2 text-sm text-gray-300">Remember me</span>
                 </label>
                 <Link
                   href="/forgot-password"
                   className="text-sm text-space-cyan-400 hover:text-space-cyan-300 transition-colors"
                   onMouseEnter={() => audioPlayer.playHover()}
                 >
                   Forgot password?
                 </Link>
               </div>

               {/* Login Button */}
               <motion.button
                 type="submit"
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 disabled={isLoading}
                 className="w-full group relative px-6 py-3 rounded-xl bg-gradient-to-r from-space-purple-600 to-space-cyan-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-space-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                 onMouseEnter={() => audioPlayer.playHover()}
               >
                 {/* Animated background */}
                 <div className="absolute inset-0 bg-gradient-to-r from-space-purple-700 to-space-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 
                 {/* Floating particles */}
                 <div className="absolute inset-0 overflow-hidden rounded-xl">
                   <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-pulse" />
                   <div className="absolute top-3 right-4 w-0.5 h-0.5 bg-space-cyan-300 rounded-full animate-pulse delay-200" />
                   <div className="absolute bottom-2 left-6 w-0.5 h-0.5 bg-space-purple-300 rounded-full animate-pulse delay-400" />
                 </div>
                 
                 <span className="relative z-10 flex items-center justify-center gap-2">
                   {isLoading ? (
                     <>
                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       Signing in...
                     </>
                   ) : (
                     <>
                       <RocketLaunchIcon className="w-4 h-4" />
                       Sign In
                     </>
                   )}
                 </span>
               </motion.button>
             </motion.form>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-center mt-8"
            >
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="text-space-cyan-400 hover:text-space-cyan-300 font-medium transition-colors"
                  onMouseEnter={() => audioPlayer.playHover()}
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
                     </div>

           {/* Back to Home Button */}
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
             className="absolute top-6 left-6 z-20"
           >
             <Link href="/">
               <motion.button
                 whileHover={{ scale: 1.1, x: 5 }}
                 whileTap={{ scale: 0.95 }}
                 className="group relative flex items-center gap-2 px-3 py-2 bg-black/40 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-full transition-all duration-300 hover:bg-black/60 hover:border-white/40 overflow-hidden shadow-lg"
                 onMouseEnter={() => audioPlayer.playHover()}
               >
                 {/* Animated background */}
                 <div className="absolute inset-0 bg-gradient-to-r from-space-purple-600/20 to-space-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 
                 {/* Floating particles trail */}
                 <div className="absolute inset-0 overflow-hidden rounded-full">
                   <motion.div
                     animate={{ 
                       x: [0, -8, -16],
                       opacity: [0, 1, 0]
                     }}
                     transition={{ 
                       duration: 1.5, 
                       repeat: Infinity, 
                       ease: "easeOut" 
                     }}
                     className="absolute top-1/2 left-1 w-1 h-1 bg-space-cyan-400 rounded-full"
                   />
                   <motion.div
                     animate={{ 
                       x: [0, -6, -12],
                       opacity: [0, 1, 0]
                     }}
                     transition={{ 
                       duration: 1.5, 
                       repeat: Infinity, 
                       ease: "easeOut",
                       delay: 0.3
                     }}
                     className="absolute top-1/2 left-1 w-0.5 h-0.5 bg-space-purple-400 rounded-full"
                   />
                   <motion.div
                     animate={{ 
                       x: [0, -4, -8],
                       opacity: [0, 1, 0]
                     }}
                     transition={{ 
                       duration: 1.5, 
                       repeat: Infinity, 
                       ease: "easeOut",
                       delay: 0.6
                     }}
                     className="absolute top-1/2 left-1 w-0.5 h-0.5 bg-white rounded-full"
                   />
                 </div>
                 
                 {/* Icon with rotation */}
                 <motion.div
                   animate={{ 
                     rotate: [0, -10, 0],
                     scale: [1, 1.1, 1]
                   }}
                   transition={{ 
                     duration: 2, 
                     repeat: Infinity, 
                     ease: "easeInOut" 
                   }}
                   className="relative z-10 p-1 bg-gradient-to-r from-space-purple-600/40 to-space-cyan-600/40 rounded-full border border-white/30"
                 >
                   <motion.div
                     animate={{ 
                       y: [0, -1, 0],
                       rotate: [0, -5, 0]
                     }}
                     transition={{ 
                       duration: 1.5, 
                       repeat: Infinity, 
                       ease: "easeInOut",
                       delay: 0.5
                     }}
                   >
                     <RocketLaunchIcon className="w-3 h-3 text-white" />
                   </motion.div>
                 </motion.div>
                 
                 {/* Text with slide effect */}
                 <motion.span
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 1.6, duration: 0.5 }}
                   className="relative z-10 text-xs font-medium"
                 >
                   Back
                 </motion.span>
                 
                 {/* Hover glow effect */}
                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-space-purple-500/30 to-space-cyan-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                 
                 {/* Pulse ring effect */}
                 <motion.div
                   animate={{ 
                     scale: [1, 1.2, 1],
                     opacity: [0.5, 0, 0]
                   }}
                   transition={{ 
                     duration: 2, 
                     repeat: Infinity, 
                     ease: "easeOut" 
                   }}
                   className="absolute inset-0 rounded-full border border-space-cyan-400/50"
                 />
               </motion.button>
             </Link>
           </motion.div>
         </motion.div>
       </div>
     </div>
   );
 }
