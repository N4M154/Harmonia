import { BookOpen, Music, Sparkles, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 to-white dark:from-[#18181b] dark:to-[#18181b]">
      <div className="max-w-5xl mx-auto px-6 py-16 sm:px-8 lg:px-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-thin tracking-tight sm:text-6xl mb-4 bg-clip-text text-black dark:text-white">
            About{" "}
            <span className="font-bold bg-gradient-to-r from-violet-500 via-rose-500 to-blue-500 bg-clip-text text-transparent leading-[1.2] py-1">
              Har
              <span className="bg-gradient-to-r from-blue-500 via-yellow-300 to-blue-500 bg-clip-text text-transparent">
                moni
              </span>
              <span className="bg-gradient-to-r from-rose-500 to-violet-500 bg-clip-text text-transparent">
                a
              </span>
            </span>
          </h1>
          <p className="text-lg font-thin text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your hub for music, creativity, and community. Discover, create, and
            share your passion.
          </p>
        </div>

        {/* Main Content */}
        <div className="p-10 bg-gradient-to-b from-violet-200 to-violet-100 dark:from-transparent dark:to-black shadow-xl rounded-xl dark:shadow-violet-800/20">
          <p className="leading-relaxed text-gray-900 dark:text-white text-md font-thin text-center">
            Harmonia is a space designed to merge the worlds of music,
            creativity, and technology. Whether you&apos;re here to explore new
            blog posts, create stunning lyric cards, generate mood-based
            playlists, or share innovative ideas, Harmonia is your platform to
            connect and express yourself.
          </p>

          <div className="w-full h-px bg-border my-10" />

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 my-12">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-violet-300 flex items-center justify-center mb-4 hover:-translate-y-2 transition-all duration-300">
                <BookOpen className="h-8 w-8 text-violet-700" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-violet-300">
                Engaging Blog
              </h3>
              <p className="text-sm text-gray-700 dark:text-white">
                Fresh perspectives on music, creativity, and technology every
                week.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-violet-300 flex items-center justify-center mb-4 hover:-translate-y-2 transition-all duration-300">
                <Music className="h-8 w-8 text-violet-700" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-violet-300">
                Lyric Cards
              </h3>
              <p className="text-sm text-gray-700 dark:text-white">
                Design beautiful, shareable lyric visuals with ease.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-violet-300 flex items-center justify-center mb-4 hover:-translate-y-2 transition-all duration-300">
                <Sparkles className="h-8 w-8 text-violet-700" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-violet-300">
                Mood Playlists
              </h3>
              <p className="text-sm text-gray-700 dark:text-white">
                Generate personalized playlists based on your emotions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-violet-300 flex items-center justify-center mb-4 hover:-translate-y-2 transition-all duration-300">
                <HeartHandshake className="h-8 w-8 text-violet-700" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-violet-300">
                Community Driven
              </h3>
              <p className="text-sm text-gray-700 dark:text-white">
                Engage with others, share ideas, and shape the platform.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-border my-8" />

          {/* Closing Statement */}
          <p className="text-center leading-relaxed text-lg text-gray-900 dark:text-violet-300">
            Harmonia is more than a website; it&apos;s a movement for
            creativity, self-expression, and connection. Join us on this journey
            and be part of something bigger.
          </p>
        </div>
      </div>
    </div>
  );
}
