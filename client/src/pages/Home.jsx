import { useRef, useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Music2,
  Shuffle,
  Lightbulb,
  ChevronsDown,
  Sparkles,
  MessageSquarePlus,
  TrendingUp,
  Disc3,
  Radio,
  Music,
  Search,
  Palette,
  Share2,
  AudioLines,
  Headphones,
  UploadCloud,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts); // Get all posts, we'll display them in batches of 3
    };
    fetchPosts();
  }, []);

  const blogRef = useRef(null);
  const handleExploreBlog = () => {
    if (blogRef.current) {
      blogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const musicRef = useRef(null);
  const handleExploreMusic = () => {
    if (musicRef.current) {
      musicRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const lyricRef = useRef(null);
  const handleExploreLyric = () => {
    if (lyricRef.current) {
      lyricRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const playlistRef = useRef(null);
  const handleExplorePlaylist = () => {
    if (playlistRef.current) {
      playlistRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const suggestionRef = useRef(null);
  const handleExploreSuggestion = () => {
    if (suggestionRef.current) {
      suggestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll functions to go through posts
  const handleScrollLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, posts.length - 3) : prevIndex - 3
    );
  };

  const handleScrollRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= posts.length ? 0 : prevIndex + 3
    );
  };

  return (
    <div>
      <ScrollToTop />
      {/* Initial View */}
      <div className="h-screen relative bg-gradient-to-b from-violet-300 to-violet-100 dark:from-[#18181b] dark:via-[#18181b] dark:to-violet-800 pointer-events-none">
        <div
          className="absolute inset-0 z-0 opacity-60 dark:opacity-50 bg-[url('/home.png')] dark:bg-[url('/home_dark.png')]"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="p-8 text-center">
          <h1 className="text-[120px] -mt-[30px] font-thin tracking-wider dark:text-white/80 dark:mix-blend-screen text-violet-700/60 mix-blend-darken">
            Harmonia
          </h1>
          <div className="flex justify-center mt-4">
            <button className="-mt-[20px] flex flex-col items-center gap-2 group transition-all duration-300 hover:opacity-80">
              <span className="text-sm tracking-widest dark:text-violet-400 dark:mix-blend-screen text-black/60 mix-blend-darken">
                EXPLORE
              </span>
              <ChevronDown className="w-6 h-6 animate-pulse text-black/60 dark:text-violet-300" />
            </button>
          </div>
          {/* Feature Buttons Container */}
          <div className="flex justify-center gap-10 mt-6 pointer-events-auto">
            <div className="relative group">
              <button
                onClick={handleExploreBlog}
                className="px-5 py-5 bg-gradient-to-tr from-transparent to-violet-500 rounded-lg shadow-lg hover:scale-105 hover:opacity-80 duration-300"
              >
                <Newspaper className="w-8 h-8 text-violet-700/50 dark:text-violet-500 dark:mix-blend-screen mix-blend-multiply" />
              </button>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full -mt-[30px] hidden group-hover:block">
                <div className="relative bg-transparent text-violet-800 font-thin dark:text-violet-100 px-3 py-1.5 text-sm rounded-sm border border-violet-300 dark:border-violet-700 shadow-lg">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-2 h-2 bg-violet-200 dark:bg-violet-900 border-t border-l border-violet-400 dark:border-violet-700 rotate-45"></div>
                  Blog
                </div>
              </div>
              <ChevronsDown className="ml-6 mt-2 text-violet-700/50 dark:text-violet-500 animate-bounce" />
            </div>

            <div className="mt-10 relative group">
              <button
                onClick={handleExploreMusic}
                className="px-5 py-5 bg-gradient-to-tr from-transparent to-violet-500 rounded-lg shadow-lg hover:scale-105 hover:opacity-80 duration-300"
              >
                <AudioLines className="w-8 h-8 text-teal-400 mix-blend-multiply dark:mix-blend-screen" />
              </button>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 hidden group-hover:block">
                <div className="relative bg-transparent text-teal-800 font-thin dark:text-teal-100 px-3 py-1.5 text-sm rounded-sm border border-teal-300 dark:border-teal-700 shadow-lg">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-2 h-2 bg-teal-200 dark:bg-teal-900 border-t border-l border-teal-400 dark:border-teal-700 rotate-45"></div>
                  <span className="text-xs">Share your music</span>
                </div>
              </div>
              <ChevronDown className="ml-6 mt-2 text-teal-300 animate-bounce" />
            </div>

            <div className="mt-20 relative group">
              <button
                onClick={handleExploreLyric}
                className="px-5 py-5 bg-gradient-to-tr from-transparent to-violet-500 rounded-lg shadow-lg hover:scale-105 hover:opacity-80 duration-300"
              >
                <Music2 className="w-8 h-8 text-rose-300 mix-blend-multiply dark:mix-blend-screen" />
              </button>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 hidden group-hover:block">
                <div className="relative bg-transparent text-rose-800 font-thin dark:text-rose-100 px-3 py-1.5 text-sm rounded-sm border border-rose-300 dark:border-rose-700 shadow-lg">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-2 h-2 bg-rose-200 dark:bg-rose-900 border-t border-l border-rose-400 dark:border-rose-700 rotate-45"></div>
                  <span className="text-xs">Lyric-Card</span>
                </div>
              </div>
              <ChevronDown className="ml-6 mt-2 text-rose-300 animate-bounce" />
            </div>

            <div className="mt-10 relative group">
              <button
                onClick={handleExplorePlaylist}
                className="px-5 py-5 bg-gradient-to-tr from-transparent to-violet-500 rounded-lg shadow-lg hover:scale-105 hover:opacity-80 duration-300"
              >
                <Shuffle className="w-8 h-8 text-blue-400 mix-blend-multiply dark:mix-blend-screen" />
              </button>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 hidden group-hover:block">
                <div className="relative bg-transparent text-blue-800 font-thin dark:text-blue-100 px-3 py-1.5 text-sm rounded-sm border border-blue-300 dark:border-blue-700 shadow-lg">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-2 h-2 bg-blue-200 dark:bg-blue-900 border-t border-l border-blue-400 dark:border-blue-700 rotate-45"></div>
                  <span className="text-xs">Mood-Based Playlist</span>
                </div>
              </div>
              <ChevronDown className="ml-6 mt-2 text-blue-400 animate-bounce" />
            </div>
            <div className="relative group">
              <button
                onClick={handleExploreSuggestion}
                className="px-5 py-5 bg-gradient-to-tr from-transparent to-violet-500 rounded-lg shadow-lg hover:scale-105 hover:opacity-80 duration-300"
              >
                <Lightbulb className="w-8 h-8 text-yellow-200 mix-blend-multiply dark:mix-blend-screen" />
              </button>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full -mt-[30px] hidden group-hover:block">
                <div className="relative bg-transparent text-yellow-800 font-thin dark:text-yellow-100 px-3 py-1.5 text-xs rounded-sm border border-yellow-300 dark:border-yellow-700 shadow-lg">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-2 h-2 bg-yellow-200 dark:bg-yellow-900 border-t border-l border-yellow-400 dark:border-yellow-700 rotate-45"></div>
                  <span className="text-xs">Suggestions</span>
                </div>
              </div>
              <ChevronsDown className="ml-6 mt-2 text-yellow-300 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Blog */}
      <section
        ref={blogRef}
        className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-200 dark:from-[#18181b] dark:to-black relative"
      >
        {/* Blog Posts */}
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          <div className="flex flex-col gap-6 mt-20">
            <h2 className="text-4xl md:text-5xl font-thin text-black/60 dark:text-violet-300 text-center mb-12">
              Fresh Perspectives
            </h2>
            <div className="flex justify-center items-center gap-4">
              {/* Left Chevron */}
              <button
                onClick={handleScrollLeft}
                className="p-2 bg-violet-500 text-white rounded-full hover:bg-violet-600"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Post Cards */}
              <div className="flex w-full p-4 justify-center gap-4">
                <AnimatePresence>
                  {posts
                    .slice(currentIndex, currentIndex + 3)
                    .map((post, idx) => (
                      <motion.div
                        key={post._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: idx === 1 ? 1.1 : 0.9,
                          y: idx === 1 ? -20 : 0,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex-1 cursor-pointer"
                      >
                        <PostCard post={post} />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* Right Chevron */}
              <button
                onClick={handleScrollRight}
                className="p-2 bg-violet-500 text-white rounded-full hover:bg-violet-600"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {posts.length === 0 && (
              <p className="text-center text-gray-400">No posts available.</p>
            )}

            <a
              href="/search"
              className="text-lg text-violet-500 hover:underline text-center"
            >
              View all posts
            </a>
          </div>
        </div>
      </section>

      {/* Music */}
      <section
        ref={musicRef}
        className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-200 dark:from-[#18181b] dark:to-black relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/30 dark:bg-teal-400/10 rounded-full blur-3xl animate-pulse-ring"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-violet-400/30 dark:bg-violet-400/10 rounded-full blur-3xl animate-pulse-ring"
            style={{ animationDelay: "-1.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/30 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse-ring"
            style={{ animationDelay: "-0.75s" }}
          ></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="mt-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-12">
              {/* Header */}
              <div className="space-y-8">
                <Link to="/upload">
                  <div className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card hover:glass-card-hover transition-all duration-500">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400/20 to-violet-400/20 animate-pulse-ring"></div>
                    <AudioLines className="w-6 h-6 text-teal-500 dark:text-teal-300 animate-wave" />
                    <span className="text-sm font-medium text-gray-800 dark:text-teal-200 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                      Share your music
                    </span>
                  </div>
                </Link>

                <h1 className="text-[45px] font-bold">
                  <span className="block bg-gradient-to-r from-teal-400 via-violet-500 to-purple-600 dark:from-teal-300 dark:via-violet-400 dark:to-purple-500 bg-clip-text text-transparent">
                    Let the world hear your tunes
                  </span>
                </h1>

                <p className="text-lg font-light text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed">
                  Share your musical talents with the world and become part of a
                  vibrant community of artists and listeners.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: UploadCloud,
                    title: "Upload Your Music",
                    description:
                      "Share your music and artwork with the world. Let others enjoy your creative expression.",
                  },
                  {
                    icon: Headphones,
                    title: "Listen & Download",
                    description:
                      "Enjoy music from different artists online or download your favorite tunes for offline listening.",
                  },
                  {
                    icon: Music,
                    title: "Discover Artists",
                    description:
                      "Explore music from different genres and discover emerging artists that match your taste.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group glass-card rounded-2xl p-6 transition-all duration-500 hover:glass-card-hover"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <feature.icon className="w-8 h-8 text-violet-500 dark:text-violet-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-violet-300 group-hover:text-violet-600 dark:group-hover:text-violet-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="font-light text-gray-600 dark:text-gray-400 text-sm mt-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Two Tilted Images */}
            <div className="relative hidden lg:flex items-center justify-center gap-6">
              {/* First Image - Tilted Left */}
              <div className="relative w-full h-full transform rotate-[-10deg]">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-teal-400/20 rounded-2xl blur-2xl animate-pulse-ring"></div>
                <img
                  src="/upload1.png"
                  alt="Music Studio 1"
                  className="object-cover w-full h-full rounded-2xl shadow-xl"
                />
              </div>

              {/* Second Image - Tilted Right */}
              <div className="relative w-full h-full transform rotate-[10deg]">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-violet-400/20 rounded-2xl blur-2xl animate-pulse-ring"></div>
                <img
                  src="/upload2.png"
                  alt="Music Studio 2"
                  className="object-cover w-full h-full rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lyric Card */}
      <section
        ref={lyricRef}
        className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-100 dark:from-[#18181b] dark:to-black relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            {/* Left Side - Example Card */}
            <div className="w-full lg:w-1/2 xl:w-2/5">
              <div className="sticky top-8">
                <img
                  src="/lyric.png"
                  alt="Lyric Card Example"
                  className="scale-75 rounded-xl shadow-[15px_15px_20px_rgba(0,0,0,1)] dark:shadow-[15px_15px_30px_rgba(255,255,255,0.2)] transform hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full lg:w-1/2 xl:w-3/5 space-y-12 mt-[30px]">
              {/* Hero Section */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Music className="w-16 h-16 text-rose-400 dark:text-rose-300 animate-pulse" />
                  <h1 className="text-4xl md:text-6xl font-thin text-black/60 dark:text-violet-300/70">
                    Turn Lyrics into Art
                  </h1>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl font-thin">
                  Create beautiful, shareable cards featuring your favorite song
                  lyrics with our intuitive maker.
                </p>
              </div>
              {/* Animated Background Shapes */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/5 left-1/2 w-96 h-96 bg-rose-400/10 dark:bg-rose-400/60 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-1/5 right-1 w-96 h-96 bg-orange-400/10 dark:bg-orange-400/60 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/70 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl p-6 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-lg mb-4">
                    <Search className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-black dark:text-violet-300 mb-3">
                    Find Your Song
                  </h3>
                  <p className="text-black dark:text-white font-thin">
                    Search by song title, artist, or paste a Spotify link to
                    instantly load your favorite track.
                  </p>
                </div>

                <div className="backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl p-6 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-lg mb-4">
                    <Palette className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-black dark:text-violet-300 mb-3">
                    Customize Design
                  </h3>
                  <p className="text-black font-thin dark:text-white">
                    Choose your perfect color scheme with our intuitive gradient
                    and text color pickers.
                  </p>
                </div>

                <div className="backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl p-6 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-lg mb-4">
                    <Share2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-black dark:text-violet-300 mb-3">
                    Share & Download
                  </h3>
                  <p className="text-black font-thin dark:text-white">
                    Download your creation as a high-quality PNG image, perfect
                    for sharing on social media.
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center lg:text-left ml-[250px]">
                <Link to="/lyric-card">
                  <button className="px-8 py-2 hover:underline dark:hover:bg-opacity-70 underline-offset-2 rounded-full bg-rose-200 dark:bg-rose-400 hover:bg-opacity-70 text-rose-900 dark:text-rose-950 shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                    Create Your Lyric Card
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-violet-800/40 dark:bg-violet-400/50 rounded-full blur-2xl dark:blur-3xl" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-rose-400/50 dark:bg-rose-400/40 rounded-full blur-2xl dark:blur-3xl" />
        </div>
      </section>

      {/* Playlist */}
      <section
        ref={playlistRef}
        className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-200 dark:from-[#18181b] dark:to-black relative"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main content container */}
          <div className="mt-10 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Column - Content */}
            <div className="space-y-10">
              {/* Header */}
              <div className="space-y-6">
                <Link to="/music">
                  <div className="transition-all duration-300 shadow-xl dark:shadow-lg hover:underline dark:shadow-blue-400/50 hover:scale-110 cursor-pointer inline-flex items-center px-4 py-2 rounded-full bg-blue-200 dark:bg-blue-700/30 text-blue-800 dark:text-blue-200">
                    <Disc3 className="w-5 h-5 mr-2 animate-spin" />
                    <span className="text-sm font-semibold">
                      Generate your Mood Music
                    </span>
                  </div>
                </Link>
                <h1 className="text-5xl font-semibold bg-gradient-to-r from-blue-500 to-violet-700 dark:from-blue-400 dark:to-violet-500 bg-clip-text text-transparent">
                  Your Mood, Your Music
                </h1>
                <p className="text-md font-thin text-black dark:text-gray-300 max-w-xl">
                  Transform your emotions into the perfect soundtrack. Select
                  your current mood and let us craft a personalized playlist
                  just for you.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl shadow-xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border-t-4 border-r-4 border-violet-300 dark:border dark:border-violet-800/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <Radio className="w-8 h-8 text-violet-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-violet-300">
                    Smart Curation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Playlist generation based on your emotional state powered by{" "}
                    <span className="font-bold">
                      Spotify for Developers API
                    </span>
                  </p>
                </div>
                <div className="p-6 rounded-2xl shadow-xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border-t-4 border-r-4 border-violet-300 dark:border dark:border-violet-800/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <Sparkles className="w-8 h-8 text-violet-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-violet-300">
                    Instant Mix
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Get your perfect playlist in seconds with one-click
                    generation
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Floating Playlist Image */}
            <div className="ml-10 mt-20 relative hidden lg:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-gradient-to-r dark:from-violet-500 dark:to-fuchsia-500 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-[550px] h-[400px] absolute inset-0 bg-gradient-to-br from-violet-500/50 to-black/80 dark:from-violet-500/50 dark:to-black rounded-3xl transform rotate-6"></div>
                <img
                  src="/playlist.png"
                  alt="Playlist Visualization"
                  className=" w-[550px] h-[400px] object-contain rounded-3xl shadow-2xl transform -rotate-3 transition-transform hover:rotate-0 duration-500"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-violet-500 dark:bg-violet-500 rounded-full blur-2xl opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 dark:bg-blue-500/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500 dark:bg-blue-500/70 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Suggestion */}
      <section
        ref={suggestionRef}
        className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-100 dark:from-[#18181b] dark:to-black relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Lightbulb className="w-16 h-16 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-thin text-black/60 dark:text-violet-300 mb-6">
              Your Ideas Shape Our Future
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-thin">
              Share your brilliant ideas and help us create something
              extraordinary together.
            </p>
          </div>

          {/* Animated Background Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 dark:bg-violet-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-200/10 dark:bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/10 dark:bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 -mt-[20px] relative z-10">
            <div className="backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-lg mb-4">
                <Sparkles className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-violet-300 mb-3">
                Feature Requests
              </h3>
              <p className="text-black dark:text-white font-thin">
                Propose new features that could enhance your experience and make
                our platform even better.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-lg mb-4">
                <MessageSquarePlus className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-violet-300 mb-3">
                Blog Topics
              </h3>
              <p className="text-black font-thin dark:text-white">
                Suggest interesting topics you&apos;d like to read about in our
                upcoming blog posts.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-violet-300 mb-3">
                Track Impact
              </h3>
              <p className="text-black font-thin text-jut dark:text-white">
                See how your suggestions influence our development and
                contribute to our growth.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-[40px] text-center">
            <Link to="/suggest">
              <button className="px-8 py-2 hover:underline underline-offset-2 bg-yellow-200 hover:opacity-70 dark:bg-yellow-400/70 text-yellow-900 dark:text-yellow-950 rounded-full shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                Share Your Suggestion
              </button>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-violet-300/70 dark:bg-violet-300/20 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-violet-300/40 dark:bg-violet-400/20 rounded-full blur-xl" />
        </div>
      </section>
    </div>
  );
}

export default Home;
