import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
        <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">404</span>
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Lost in Space</h2>
      <p className="text-xl text-gray-300 max-w-md mb-10">
        Looks like you've drifted beyond the known universe. This page doesn't exist in our cosmic map.
      </p>
      <div className="mb-12 relative w-64 h-64">
        <div className="absolute inset-0 rounded-full bg-purple-900/30 animate-pulse"></div>
        <div className="absolute w-48 h-48 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black border-4 border-purple-500/50 overflow-hidden flex items-center justify-center">
          <div className="text-white text-lg font-bold">VOID</div>
        </div>
      </div>
      <Link
        href="/"
        className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all"
      >
        Return to Home Base
      </Link>
    </div>
  );
} 