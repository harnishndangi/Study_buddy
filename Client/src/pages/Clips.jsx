import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Play, X, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'
import Sidebar from '../components/Layout/Sidebar'

const mockVideos = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    duration: "15:30",
    thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
    channel: "Tech Education",
    views: "125K",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "React Hooks Explained",
    duration: "22:45",
    thumbnail: "https://img.youtube.com/vi/O6P86uwfdR0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0",
    channel: "React Masters",
    views: "89K",
    gradient: "from-green-500 to-teal-600"
  },
  {
    id: 3,
    title: "CSS Grid Layout",
    duration: "18:20",
    thumbnail: "https://img.youtube.com/vi/jV8B24rSN5o/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/jV8B24rSN5o",
    channel: "CSS Wizards",
    views: "67K",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    duration: "35:15",
    thumbnail: "https://img.youtube.com/vi/fBNz5xF-Kx4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/fBNz5xF-Kx4",
    channel: "Backend Pro",
    views: "156K",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    id: 5,
    title: "MongoDB Tutorial",
    duration: "28:40",
    thumbnail: "https://img.youtube.com/vi/-56x56UppqQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/-56x56UppqQ",
    channel: "Database Expert",
    views: "78K",
    gradient: "from-indigo-500 to-blue-600"
  },
  {
    id: 6,
    title: "Git & GitHub Mastery",
    duration: "42:10",
    thumbnail: "https://img.youtube.com/vi/RGOj5yH7evk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/RGOj5yH7evk",
    channel: "Version Control",
    views: "203K",
    gradient: "from-red-500 to-pink-600"
  },
  {
    id: 7,
    title: "TypeScript Deep Dive",
    duration: "50:30",
    thumbnail: "https://img.youtube.com/vi/BwuLxPH8IDs/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/BwuLxPH8IDs",
    channel: "TypeScript Academy",
    views: "120K",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    id: 8,
    title: "Python for Beginners",
    duration: "45:20",
    thumbnail: "https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
    channel: "Python Academy",
    views: "340K",
    gradient: "from-green-500 to-blue-600"
  },
  {
    id: 9,
    title: "Vue.js Complete Guide",
    duration: "38:45",
    thumbnail: "https://img.youtube.com/vi/FXpIoQ_rT_c/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/FXpIoQ_rT_c",
    channel: "Vue Masters",
    views: "95K",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: 10,
    title: "Angular Components",
    duration: "32:15",
    thumbnail: "https://img.youtube.com/vi/23o0evRtrFI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/23o0evRtrFI",
    channel: "Angular Pro",
    views: "76K",
    gradient: "from-red-500 to-orange-600"
  },
  {
    id: 11,
    title: "Docker Containers",
    duration: "41:30",
    thumbnail: "https://img.youtube.com/vi/fqMOX6JJhGo/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/fqMOX6JJhGo",
    channel: "DevOps Hub",
    views: "185K",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    id: 12,
    title: "Kubernetes Basics",
    duration: "55:20",
    thumbnail: "https://img.youtube.com/vi/X48VuDVv0do/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/X48VuDVv0do",
    channel: "Cloud Native",
    views: "167K",
    gradient: "from-violet-500 to-purple-600"
  },
  {
    id: 13,
    title: "AWS Fundamentals",
    duration: "63:45",
    thumbnail: "https://img.youtube.com/vi/ulprqHHWlng/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
    channel: "Cloud Academy",
    views: "290K",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: 14,
    title: "SQL Database Design",
    duration: "39:10",
    thumbnail: "https://img.youtube.com/vi/HXV3zeQKqGY/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    channel: "Database Pro",
    views: "145K",
    gradient: "from-teal-500 to-green-600"
  },
  {
    id: 15,
    title: "REST API Development",
    duration: "47:25",
    thumbnail: "https://img.youtube.com/vi/0oXYLzuucwE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/0oXYLzuucwE",
    channel: "API Masters",
    views: "112K",
    gradient: "from-indigo-500 to-blue-600"
  },
  {
    id: 16,
    title: "GraphQL Tutorial",
    duration: "34:55",
    thumbnail: "https://img.youtube.com/vi/ed8SzALpx1Q/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ed8SzALpx1Q",
    channel: "GraphQL Hub",
    views: "87K",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: 17,
    title: "Machine Learning Basics",
    duration: "52:30",
    thumbnail: "https://img.youtube.com/vi/ukzFI9rgwfU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
    channel: "AI Academy",
    views: "245K",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: 18,
    title: "Data Structures & Algorithms",
    duration: "68:15",
    thumbnail: "https://img.youtube.com/vi/BBpAmxU_NQo/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/BBpAmxU_NQo",
    channel: "CS Fundamentals",
    views: "456K",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    id: 19,
    title: "Redux State Management",
    duration: "29:40",
    thumbnail: "https://img.youtube.com/vi/CVpUuw9XSjY/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/CVpUuw9XSjY",
    channel: "State Masters",
    views: "98K",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 20,
    title: "Next.js Full Stack",
    duration: "44:20",
    thumbnail: "https://img.youtube.com/vi/1WmNXEVia8I/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1WmNXEVia8I",
    channel: "Next Academy",
    views: "134K",
    gradient: "from-gray-500 to-slate-600"
  },
  {
    id: 21,
    title: "Tailwind CSS Mastery",
    duration: "36:15",
    thumbnail: "https://img.youtube.com/vi/UBOj6rqRUME/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/UBOj6rqRUME",
    channel: "CSS Pro",
    views: "156K",
    gradient: "from-sky-500 to-cyan-600"
  },
  {
    id: 22,
    title: "Webpack Configuration",
    duration: "33:50",
    thumbnail: "https://img.youtube.com/vi/X1nxTjVDYdQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/X1nxTjVDYdQ",
    channel: "Build Tools",
    views: "73K",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: 23,
    title: "Testing with Jest",
    duration: "27:35",
    thumbnail: "https://img.youtube.com/vi/7r4xVDI2vho/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/7r4xVDI2vho",
    channel: "Testing Hub",
    views: "89K",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: 24,
    title: "Cypress E2E Testing",
    duration: "42:10",
    thumbnail: "https://img.youtube.com/vi/u8vMu7viCm8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/u8vMu7viCm8",
    channel: "QA Masters",
    views: "67K",
    gradient: "from-teal-500 to-cyan-600"
  },
  {
    id: 25,
    title: "Firebase Backend",
    duration: "38:45",
    thumbnail: "https://img.youtube.com/vi/9kRgVxULbag/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/9kRgVxULbag",
    channel: "Firebase Pro",
    views: "123K",
    gradient: "from-orange-500 to-yellow-600"
  },
  {
    id: 26,
    title: "Microservices Architecture",
    duration: "56:20",
    thumbnail: "https://img.youtube.com/vi/y8OnoxKotPQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/y8OnoxKotPQ",
    channel: "Architecture Hub",
    views: "198K",
    gradient: "from-violet-500 to-purple-600"
  },
  {
    id: 27,
    title: "WebSocket Real-time",
    duration: "31:15",
    thumbnail: "https://img.youtube.com/vi/1BfCnjr_Vjg/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1BfCnjr_Vjg",
    channel: "Real-time Tech",
    views: "85K",
    gradient: "from-pink-500 to-red-600"
  },
  {
    id: 28,
    title: "Progressive Web Apps",
    duration: "49:30",
    thumbnail: "https://img.youtube.com/vi/sFsRylCQblw/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/sFsRylCQblw",
    channel: "PWA Academy",
    views: "134K",
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    id: 29,
    title: "Svelte Framework",
    duration: "35:40",
    thumbnail: "https://img.youtube.com/vi/AdNJ3fydeao/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/AdNJ3fydeao",
    channel: "Svelte Masters",
    views: "92K",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: 30,
    title: "Express.js Server",
    duration: "43:25",
    thumbnail: "https://img.youtube.com/vi/SccSCuHhOw0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/SccSCuHhOw0",
    channel: "Server Side",
    views: "167K",
    gradient: "from-gray-500 to-zinc-600"
  },
  {
    id: 31,
    title: "Linux Command Line",
    duration: "54:15",
    thumbnail: "https://img.youtube.com/vi/oxuRxtrO2Ag/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/oxuRxtrO2Ag",
    channel: "Linux Pro",
    views: "234K",
    gradient: "from-slate-500 to-gray-600"
  },
  {
    id: 32,
    title: "Vim Editor Mastery",
    duration: "28:50",
    thumbnail: "https://img.youtube.com/vi/wlR5gYd6um0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/wlR5gYd6um0",
    channel: "Editor Pro",
    views: "78K",
    gradient: "from-emerald-500 to-green-600"
  },
  {
    id: 33,
    title: "CI/CD Pipelines",
    duration: "47:35",
    thumbnail: "https://img.youtube.com/vi/1er2cjUq1UI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1er2cjUq1UI",
    channel: "DevOps Pro",
    views: "145K",
    gradient: "from-blue-500 to-teal-600"
  },
  {
    id: 34,
    title: "Web Security Basics",
    duration: "52:10",
    thumbnail: "https://img.youtube.com/vi/VQe1qcc2mBQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/VQe1qcc2mBQ",
    channel: "Security Hub",
    views: "189K",
    gradient: "from-red-500 to-pink-600"
  },
  {
    id: 35,
    title: "OAuth Authentication",
    duration: "39:25",
    thumbnail: "https://img.youtube.com/vi/996OiexHze0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/996OiexHze0",
    channel: "Auth Masters",
    views: "112K",
    gradient: "from-purple-500 to-violet-600"
  },
  {
    id: 36,
    title: "Blockchain Fundamentals",
    duration: "61:45",
    thumbnail: "https://img.youtube.com/vi/SSo_EIwHSd4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/SSo_EIwHSd4",
    channel: "Crypto Academy",
    views: "276K",
    gradient: "from-yellow-500 to-amber-600"
  },
  {
    id: 37,
    title: "React Native Mobile",
    duration: "46:30",
    thumbnail: "https://img.youtube.com/vi/0-S5a0eXPoc/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/0-S5a0eXPoc",
    channel: "Mobile Dev",
    views: "156K",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 38,
    title: "Flutter Development",
    duration: "53:20",
    thumbnail: "https://img.youtube.com/vi/x0uinJvhNxI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/x0uinJvhNxI",
    channel: "Flutter Pro",
    views: "198K",
    gradient: "from-sky-500 to-cyan-600"
  },
  {
    id: 39,
    title: "Golang Concurrency",
    duration: "37:15",
    thumbnail: "https://img.youtube.com/vi/f6kdp27TYZs/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/f6kdp27TYZs",
    channel: "Go Masters",
    views: "134K",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: 40,
    title: "Rust Programming",
    duration: "48:40",
    thumbnail: "https://img.youtube.com/vi/zF34dRivLOw/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/zF34dRivLOw",
    channel: "Systems Programming",
    views: "167K",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: 41,
    title: "Java Spring Boot",
    duration: "58:25",
    thumbnail: "https://img.youtube.com/vi/vtPkZShrvXQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/vtPkZShrvXQ",
    channel: "Java Academy",
    views: "245K",
    gradient: "from-red-500 to-orange-600"
  },
  {
    id: 42,
    title: "C# .NET Development",
    duration: "44:55",
    thumbnail: "https://img.youtube.com/vi/GhQdlIFylQ8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/GhQdlIFylQ8",
    channel: "Microsoft Dev",
    views: "189K",
    gradient: "from-purple-500 to-blue-600"
  },
  {
    id: 43,
    title: "PHP Laravel Framework",
    duration: "51:10",
    thumbnail: "https://img.youtube.com/vi/ImtZ5yENzgE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ImtZ5yENzgE",
    channel: "PHP Masters",
    views: "123K",
    gradient: "from-violet-500 to-purple-600"
  },
  {
    id: 44,
    title: "Ruby on Rails",
    duration: "42:35",
    thumbnail: "https://img.youtube.com/vi/fmyvWz5TUWg/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/fmyvWz5TUWg",
    channel: "Ruby Academy",
    views: "98K",
    gradient: "from-red-500 to-pink-600"
  },
  {
    id: 45,
    title: "WebAssembly Basics",
    duration: "36:20",
    thumbnail: "https://img.youtube.com/vi/MaJCfdmr9Wg/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/MaJCfdmr9Wg",
    channel: "WebAssembly Hub",
    views: "76K",
    gradient: "from-teal-500 to-cyan-600"
  },
  {
    id: 46,
    title: "Deno Runtime",
    duration: "29:45",
    thumbnail: "https://img.youtube.com/vi/M3BM9TB-8yA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/M3BM9TB-8yA",
    channel: "Modern Runtime",
    views: "67K",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: 47,
    title: "GraphQL Apollo Client",
    duration: "41:15",
    thumbnail: "https://img.youtube.com/vi/1232sa_yCh4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1232sa_yCh4",
    channel: "Apollo Academy",
    views: "89K",
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    id: 48,
    title: "Serverless Functions",
    duration: "34:50",
    thumbnail: "https://img.youtube.com/vi/EeQfPa3lJqw/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/EeQfPa3lJqw",
    channel: "Serverless Pro",
    views: "112K",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 49,
    title: "TensorFlow Machine Learning",
    duration: "67:30",
    thumbnail: "https://img.youtube.com/vi/tPYj3fFJGjk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/tPYj3fFJGjk",
    channel: "ML Academy",
    views: "298K",
    gradient: "from-orange-500 to-yellow-600"
  },
  {
    id: 50,
    title: "Design Patterns",
    duration: "55:40",
    thumbnail: "https://img.youtube.com/vi/NU_1StN5Tkk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/NU_1StN5Tkk",
    channel: "Software Design",
    views: "187K",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: 51,
    title: "Clean Code Principles",
    duration: "49:25",
    thumbnail: "https://img.youtube.com/vi/7EmboKQH8lM/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/7EmboKQH8lM",
    channel: "Code Quality",
    views: "234K",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: 52,
    title: "System Design Interview",
    duration: "72:15",
    thumbnail: "https://img.youtube.com/vi/xpDnVSmNFX0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/xpDnVSmNFX0",
    channel: "Interview Prep",
    views: "456K",
    gradient: "from-violet-500 to-purple-600"
  }
]

function Clips() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredVideos, setFilteredVideos] = useState(mockVideos)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const filtered = mockVideos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredVideos(filtered)
  }, [searchTerm])

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-50 overflow-hidden ml-20 md:ml-40 flex flex-col">
          
          {/* Header Section */}
          <div className="px-4 sm:px-6 md:px-10 py-4 sm:py-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-center text-blue-800 drop-shadow-md">
              Educational Videos
            </h1>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:gap-3 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for educational videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 border border-blue-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow text-sm sm:text-base"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Video Grid */}
          <div className="px-4 sm:px-6 md:px-10 pb-6 overflow-y-auto flex-1">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto"
              layout
            >
              <AnimatePresence>
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -50 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative h-64 mb-4">
                      {/* Video Container */}
                      <div 
                        className="w-full h-full bg-white rounded-xl relative overflow-hidden transition-all duration-300 group-hover:shadow-lg shadow-md border border-gray-200"
                      >
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${video.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                        
                        {/* Thumbnail */}
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover transition-opacity duration-300"
                          onError={(e) => {
                            console.log(`Failed to load thumbnail for: ${video.title}`)
                            e.target.src = `https://via.placeholder.com/640x360/374151/ffffff?text=${encodeURIComponent(video.title.substring(0, 20) + '...')}`
                          }}
                          onLoad={(e) => {
                            e.target.style.opacity = '1'
                          }}
                          loading="lazy"
                          style={{ opacity: 0 }}
                        />
                        
                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-blue-600/90 backdrop-blur-sm rounded-full p-4 border border-blue-500/50 shadow-lg"
                          >
                            <Play className="text-white" size={32} fill="white" />
                          </motion.div>
                        </div>
                        
                        {/* Duration Badge */}
                        <div className="absolute bottom-3 right-3 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Info */}
                    <div className="text-center">
                      <h3 className="text-gray-800 font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{video.channel}</p>
                      <p className="text-gray-500 text-xs">{video.views} views</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredVideos.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-gray-600 text-xl">No videos found</div>
                <div className="text-gray-500 text-sm mt-2">Try adjusting your search terms</div>
              </motion.div>
            )}
          </div>

          {/* Floating Video Player Modal */}
          <AnimatePresence>
            {selectedVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedVideo(null)}
              >
                {/* Blurred Background */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>
                
                {/* Video Player Container */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl ${
                    isFullscreen ? 'w-full h-full' : 'w-full max-w-4xl aspect-video'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Video Player */}
                  <iframe
                    src={`${selectedVideo.videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={selectedVideo.title}
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                  
                  {/* Player Controls */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="bg-blue-600/80 hover:bg-blue-700/90 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="bg-blue-600/80 hover:bg-blue-700/90 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                    >
                      {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="bg-red-600/80 hover:bg-red-700/90 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <h2 className="text-white text-xl font-bold mb-2">{selectedVideo.title}</h2>
                    <div className="flex items-center justify-between text-white/80">
                      <span>{selectedVideo.channel}</span>
                      <span>{selectedVideo.views} views</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  )
}

export default Clips