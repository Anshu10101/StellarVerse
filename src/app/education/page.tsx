"use client";

import React, { useState } from 'react';
import { BookOpenIcon, PlayIcon, MusicalNoteIcon, GlobeAltIcon, VideoCameraIcon, AcademicCapIcon, RocketLaunchIcon, ClockIcon, ArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';



interface LearningResource {
  title: string;
  description: string;
  type: 'book' | 'video' | 'podcast' | 'course' | 'interactive' | 'documentary';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  url: string;
  tags: string[];
}

const spaceEducationResources: LearningResource[] = [
  // Books
  {
    title: "A Brief History of Time",
    description: "Stephen Hawking's masterpiece explaining the universe from the Big Bang to black holes.",
    type: "book",
    difficulty: "intermediate",
    duration: "300 pages",
    url: "https://www.amazon.com/Brief-History-Time-Stephen-Hawking/dp/0553380168",
    tags: ["cosmology", "black holes", "universe"]
  },
  {
    title: "The Universe in a Nutshell",
    description: "Visual exploration of modern physics and cosmology with stunning illustrations.",
    type: "book",
    difficulty: "intermediate",
    duration: "224 pages",
    url: "https://www.amazon.com/Universe-Nutshell-Stephen-William-Hawking/dp/055380202X",
    tags: ["physics", "cosmology", "quantum mechanics"]
  },
  {
    title: "Astrophysics for People in a Hurry",
    description: "Neil deGrasse Tyson's accessible guide to understanding the cosmos.",
    type: "book",
    difficulty: "beginner",
    duration: "224 pages",
    url: "https://www.amazon.com/Astrophysics-People-Hurry-Neil-Tyson/dp/0393609391",
    tags: ["astrophysics", "cosmos", "beginner-friendly"]
  },
  {
    title: "Cosmos",
    description: "Carl Sagan's timeless exploration of the universe and human understanding.",
    type: "book",
    difficulty: "beginner",
    duration: "432 pages",
    url: "https://www.amazon.com/Cosmos-Carl-Sagan/dp/0345539435",
    tags: ["universe", "science", "philosophy"]
  },
  {
    title: "The Elegant Universe",
    description: "Brian Greene's exploration of string theory and the nature of reality.",
    type: "book",
    difficulty: "advanced",
    duration: "464 pages",
    url: "https://www.amazon.com/Elegant-Universe-Superstrings-Dimensions-Ultimate/dp/039333810X",
    tags: ["string theory", "physics", "advanced"]
  },

  // Videos & Documentaries
  {
    title: "Cosmos: A Spacetime Odyssey",
    description: "Neil deGrasse Tyson's modern reboot of Carl Sagan's classic series.",
    type: "documentary",
    difficulty: "beginner",
    duration: "13 episodes",
    url: "https://www.disneyplus.com/series/cosmos-a-spacetime-odyssey/3JkONDisney",
    tags: ["documentary", "universe", "science"]
  },
  {
    title: "PBS Space Time",
    description: "Deep dives into space science, physics, and cosmology concepts.",
    type: "video",
    difficulty: "intermediate",
    duration: "15-20 min episodes",
    url: "https://www.youtube.com/c/pbsspacetime",
    tags: ["physics", "cosmology", "space science"]
  },
  {
    title: "Kurzgesagt - In a Nutshell",
    description: "Beautifully animated explanations of complex space concepts.",
    type: "video",
    difficulty: "beginner",
    duration: "5-10 min episodes",
    url: "https://www.youtube.com/c/inanutshell",
    tags: ["animation", "space", "science"]
  },
  {
    title: "The Feynman Lectures on Physics",
    description: "Richard Feynman's legendary physics lectures, now available online.",
    type: "video",
    difficulty: "advanced",
    duration: "Full course",
    url: "https://www.feynmanlectures.caltech.edu/",
    tags: ["physics", "lectures", "advanced"]
  },
  {
    title: "NASA's Eyes",
    description: "Interactive 3D visualization of the solar system and beyond.",
    type: "interactive",
    difficulty: "beginner",
    duration: "Self-paced",
    url: "https://eyes.nasa.gov/",
    tags: ["interactive", "solar system", "NASA"]
  },

  // Podcasts
  {
    title: "StarTalk Radio",
    description: "Neil deGrasse Tyson's podcast exploring space, science, and pop culture.",
    type: "podcast",
    difficulty: "beginner",
    duration: "45-60 min episodes",
    url: "https://www.startalkradio.net/",
    tags: ["podcast", "space", "science"]
  },
  {
    title: "The Infinite Monkey Cage",
    description: "BBC Radio 4's science comedy show with Brian Cox and Robin Ince.",
    type: "podcast",
    difficulty: "beginner",
    duration: "30 min episodes",
    url: "https://www.bbc.co.uk/programmes/b00snr0w",
    tags: ["podcast", "science", "comedy"]
  },
  {
    title: "Astronomy Cast",
    description: "Weekly discussions about astronomy and space science topics.",
    type: "podcast",
    difficulty: "intermediate",
    duration: "30-45 min episodes",
    url: "https://www.astronomycast.com/",
    tags: ["podcast", "astronomy", "space science"]
  },

  // Courses
  {
    title: "Introduction to Astronomy",
    description: "Coursera course covering the fundamentals of astronomy and cosmology.",
    type: "course",
    difficulty: "beginner",
    duration: "8 weeks",
    url: "https://www.coursera.org/learn/astronomy",
    tags: ["course", "astronomy", "beginner"]
  },
  {
    title: "Astrophysics: Exploring Exoplanets",
    description: "EdX course on exoplanet discovery and characterization.",
    type: "course",
    difficulty: "intermediate",
    duration: "10 weeks",
    url: "https://www.edx.org/course/astrophysics-exploring-exoplanets",
    tags: ["course", "exoplanets", "astrophysics"]
  },
  {
    title: "MIT OpenCourseWare - Astrophysics",
    description: "Free MIT course materials on astrophysics and cosmology.",
    type: "course",
    difficulty: "advanced",
    duration: "Self-paced",
    url: "https://ocw.mit.edu/courses/physics/8-901-astrophysics-i-spring-2006/",
    tags: ["course", "MIT", "advanced"]
  },

  // Interactive Resources
  {
    title: "Khan Academy - Cosmology",
    description: "Free online lessons on cosmology and astronomy.",
    type: "interactive",
    difficulty: "beginner",
    duration: "Self-paced",
    url: "https://www.khanacademy.org/science/cosmology-and-astronomy",
    tags: ["interactive", "cosmology", "free"]
  },
  {
    title: "ESA Kids",
    description: "European Space Agency's educational resources for children.",
    type: "interactive",
    difficulty: "beginner",
    duration: "Self-paced",
    url: "https://www.esa.int/kids/en/home",
    tags: ["interactive", "kids", "ESA"]
  },
  {
    title: "NASA STEM Engagement",
    description: "NASA's comprehensive STEM education resources and activities.",
    type: "interactive",
    difficulty: "beginner",
    duration: "Self-paced",
    url: "https://www.nasa.gov/stem",
    tags: ["interactive", "NASA", "STEM"]
  }
];

const getIconForType = (type: string) => {
  switch (type) {
    case 'book': return <BookOpenIcon className="w-5 h-5" />;
    case 'video': return <PlayIcon className="w-5 h-5" />;
    case 'podcast': return <MusicalNoteIcon className="w-5 h-5" />;
    case 'course': return <AcademicCapIcon className="w-5 h-5" />;
    case 'interactive': return <GlobeAltIcon className="w-5 h-5" />;
    case 'documentary': return <VideoCameraIcon className="w-5 h-5" />;
    default: return <BookOpenIcon className="w-5 h-5" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'book': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'video': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'podcast': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'course': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'interactive': return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'documentary': return 'bg-pink-100 text-pink-800 border-pink-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function SpaceEducationPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = spaceEducationResources.filter(resource => {
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    const difficultyMatch = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
    const searchMatch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return typeMatch && difficultyMatch && searchMatch;
  });

  const resourceTypes = ['all', ...Array.from(new Set(spaceEducationResources.map(r => r.type)))];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  return (
    <div className="min-h-screen">
             {/* Hero Section */}
       <div className="relative overflow-hidden">
         <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
                             <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                 <RocketLaunchIcon className="w-12 h-12 text-white" />
               </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Space Education
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Embark on a cosmic journey of learning with curated resources from books and videos 
              to interactive courses and podcasts. Discover the universe at your own pace.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                             <div className="flex items-center gap-2 text-white">
                 <GlobeAltIcon className="w-5 h-5" />
                 <span>Comprehensive Learning</span>
               </div>
               <div className="flex items-center gap-2 text-white">
                 <GlobeAltIcon className="w-5 h-5" />
                 <span>All Skill Levels</span>
               </div>
               <div className="flex items-center gap-2 text-white">
                 <GlobeAltIcon className="w-5 h-5" />
                 <span>Multiple Formats</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                Search Resources
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                Media Type
              </label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {resourceTypes.map(type => (
                  <option key={type} value={type} className="bg-gray-800 text-white">
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty} className="bg-gray-800 text-white">
                    {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing {filteredResources.length} of {spaceEducationResources.length} resources
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
                         <div
               key={index}
               className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-black/40 group"
             >
              {/* Resource Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  {getIconForType(resource.type)}
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                </div>
              </div>

              {/* Resource Content */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {resource.title}
              </h3>
              <p className="text-gray-300 mb-4 line-clamp-3">
                {resource.description}
              </p>

              {/* Duration */}
              {resource.duration && (
                                 <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                   <ClockIcon className="w-4 h-4" />
                   <span>{resource.duration}</span>
                 </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 group-hover:bg-purple-500"
              >
                                 <span>Learn More</span>
                 <ArrowUpIcon className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
                         <div className="p-4 bg-white/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
               <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
             </div>
            <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
            <p className="text-gray-400">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Learning Paths Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Recommended Learning Paths</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Follow these curated paths to build your space knowledge systematically
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {/* Beginner Path */}
           <div className="bg-gradient-to-br from-green-500/30 to-blue-500/30 backdrop-blur-sm rounded-2xl p-6 border border-green-500/50">
            <div className="text-center mb-6">
                             <div className="p-3 bg-green-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                 <RocketLaunchIcon className="w-8 h-8 text-green-400" />
               </div>
              <h3 className="text-xl font-semibold text-white mb-2">Beginner Explorer</h3>
              <p className="text-gray-300 text-sm">Start your cosmic journey here</p>
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Start with "Astrophysics for People in a Hurry"</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Watch "Cosmos: A Spacetime Odyssey"</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Listen to "StarTalk Radio" podcast</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Explore NASA's interactive resources</span>
              </li>
            </ul>
          </div>

                     {/* Intermediate Path */}
           <div className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/50">
            <div className="text-center mb-6">
                             <div className="p-3 bg-yellow-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                 <GlobeAltIcon className="w-8 h-8 text-yellow-400" />
               </div>
              <h3 className="text-xl font-semibold text-white mb-2">Intermediate Observer</h3>
              <p className="text-gray-300 text-sm">Deepen your understanding</p>
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Read "A Brief History of Time"</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Follow "PBS Space Time" videos</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Take online astronomy courses</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Study exoplanet discoveries</span>
              </li>
            </ul>
          </div>

                     {/* Advanced Path */}
           <div className="bg-gradient-to-br from-red-500/30 to-purple-500/30 backdrop-blur-sm rounded-2xl p-6 border border-red-500/50">
            <div className="text-center mb-6">
                             <div className="p-3 bg-red-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                 <GlobeAltIcon className="w-8 h-8 text-red-400" />
               </div>
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Scholar</h3>
              <p className="text-gray-300 text-sm">Master complex concepts</p>
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Study "The Elegant Universe"</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Watch Feynman Lectures</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Explore MIT OpenCourseWare</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Research current papers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
