"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getNasaAPOD } from "@/services/nasaService";
import Image from "next/image";

interface APODData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  date: string;
  copyright?: string;
}

const AstronomyPicture = () => {
  const [data, setData] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        setLoading(true);
        const response = await getNasaAPOD();
        setData(response);
      } catch (err) {
        setError("Failed to fetch NASA's Picture of the Day");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 text-white p-4 rounded-lg text-center">
        {error}
      </div>
    );
  }

  if (!data) return null;

  // Determine the URL for full resolution
  const fullResolutionUrl = data.media_type === "image" ? data.hdurl || data.url : data.url;

  const handleViewFullResolution = () => {
    if (fullResolutionUrl) {
      window.open(fullResolutionUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-3 text-white select-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          NASA's Astronomy Picture of the Day
        </motion.h2>

        <motion.p
          className="text-xl text-center text-gray-300 mb-8 select-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {new Date(data.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            className="relative aspect-video w-full overflow-hidden rounded-xl border border-purple-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {data.media_type === "image" ? (
              <Image
                src={data.url}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <iframe
                src={data.url}
                title={data.title}
                className="w-full h-full"
                allowFullScreen
              />
            )}
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white select-text">
              {data.title}
            </h3>
            
            <p className="text-gray-300 leading-relaxed select-text">
              {data.explanation}
            </p>

            {data.copyright && (
              <p className="text-sm text-gray-400 select-text">
                © {data.copyright}
              </p>
            )}

            <div className="pt-4">
              {fullResolutionUrl && (
                <motion.button
                  onClick={handleViewFullResolution}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all group cursor-pointer select-none"
                  whileHover={{ scale: 1.02 }}
                >
                  View Full Resolution
                  <motion.span
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    →
                  </motion.span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AstronomyPicture; 