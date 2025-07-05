import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - StellarVerse",
  description: "Learn about StellarVerse, our mission, and the wonders of space exploration.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24 px-4 md:px-10 lg:px-20">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
        About <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">StellarVerse</span>
      </h1>
      
      <div className="w-full max-w-4xl mb-16">
        <div className="bg-[#0a0a1a]/40 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            StellarVerse aims to make astronomy and space exploration accessible to everyone. 
            Our platform provides educational resources, interactive experiences, and a community 
            for space enthusiasts of all ages and backgrounds.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Whether you're tracking celestial events through our calendar, testing your knowledge 
            with our space quizzes, or simply exploring the cosmos through our content, 
            StellarVerse is your gateway to the universe.
          </p>
        </div>
        
        <div className="bg-[#0a0a1a]/40 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
          <ul className="text-gray-300 space-y-4">
            <li className="flex items-start">
              <div className="bg-purple-500 rounded-full w-2 h-2 mt-2 mr-3"></div>
              <div>
                <span className="font-semibold text-white">Events Calendar:</span> Stay updated with upcoming astronomical events, space missions, and cosmic phenomena.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-500 rounded-full w-2 h-2 mt-2 mr-3"></div>
              <div>
                <span className="font-semibold text-white">Space Quiz:</span> Test your knowledge about the universe with interactive quizzes across various difficulty levels.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-500 rounded-full w-2 h-2 mt-2 mr-3"></div>
              <div>
                <span className="font-semibold text-white">Community:</span> Connect with fellow space enthusiasts and share your cosmic journey.
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-[#0a0a1a]/40 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 mb-4">
            Have questions or suggestions? Feel free to reach out through our social media channels.
          </p>
          <div className="bg-black/30 border border-purple-500/30 rounded-lg p-5">
            <p className="text-white mb-2">Email: <span className="text-purple-400">anshul.yadv22@gmail.com</span></p>
          </div>
        </div>
      </div>
    </div>
  );
} 