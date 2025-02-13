import { BookOpen, Music, Sparkles, HeartHandshake, Disc3 } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-100 dark:from-[#18181b] dark:to-black relative overflow-hidden pointer-events-none">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-rose-400/10 dark:bg-rose-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Disc3 className="w-16 h-16 text-violet-500 dark:text-violet-400 animate-spin-slow" />
          </div>
          <h1 className="text-5xl font-thin tracking-tight sm:text-6xl mb-6 dark:text-white">
            About{" "}
            <span className="font-bold">
              <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-rose-500 bg-clip-text text-transparent">
                Ha
              </span>
              <span className="bg-gradient-to-r from-rose-500 via-yellow-300 to-rose-500 bg-clip-text text-transparent">
                rm
              </span>
              <span className="bg-gradient-to-r from-rose-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                onia
              </span>
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-thin">
            Your creative sanctuary for music, expression, and community
            connection.
          </p>
        </div>

        {/* Main Content */}
        <div className="backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl p-12 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent dark:from-violet-500/10"></div>

          <p className="relative z-10 leading-relaxed text-gray-800 dark:text-gray-200 text-lg font-thin text-center mb-16">
            Harmonia is where technology meets artistry, creating a unique space
            for music lovers, creators, and innovators. We blend cutting-edge
            features with intuitive design to bring your musical ideas to life.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <div className="backdrop-blur-lg bg-white/20 dark:bg-white/5 border border-white/20 rounded-xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-lg mb-4">
                <BookOpen className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-violet-300 mb-3">
                Fresh Perspectives
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-thin">
                Discover thought-provoking articles on music, creativity, and
                the intersection of art and technology.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/20 dark:bg-white/5 border border-white/20 rounded-xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-rose-100 dark:bg-rose-900/50 rounded-lg mb-4">
                <Music className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-rose-300 mb-3">
                Lyric Artistry
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-thin">
                Transform your favorite lyrics into stunning visual cards with
                our intuitive creator.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/20 dark:bg-white/5 border border-white/20 rounded-xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg mb-4">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-blue-300 mb-3">
                Mood Music
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-thin">
                Let your emotions guide you to the perfect playlist with our
                mood-based music generator.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/20 dark:bg-white/5 border border-white/20 rounded-xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg mb-4">
                <HeartHandshake className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-yellow-300 mb-3">
                Community Voice
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-thin">
                Share ideas, suggest features, and help shape the future of our
                creative community.
              </p>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="mt-16 text-center relative z-10">
            <p className="text-xl font-thin text-gray-800 dark:text-violet-200">
              Join us in creating a world where music, technology, and
              creativity unite to inspire and connect.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-violet-500/20 dark:bg-violet-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-rose-500/20 dark:bg-rose-500/30 rounded-full blur-3xl"></div>
    </div>
  );
}
