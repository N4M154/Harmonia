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
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

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
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-light mt-20 mb-10 text-violet-700 text-center">
              Recent Posts
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

      {/* Lyric Card */}
      <section
        ref={lyricRef}
        className="min-h-screen bg-violet-200 dark:bg-[#18181b] relative"
      ></section>

      {/* Playlist */}
      <section
        ref={playlistRef}
        className="min-h-screen bg-violet-50 dark:bg-[#18181b] relative"
      ></section>

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
          <div className="mt-20 text-center">
            <Link to="/suggest">
              <button className="px-8 py-4 bg-violet-800 hover:bg-violet-700 text-white rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
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
