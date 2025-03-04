import { useRef } from "react";
import {
  Newspaper,
  Music2,
  Shuffle,
  Lightbulb,
  Sparkles,
  AudioLines,
} from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export function Landing() {
  const mainContentRef = useRef(null);

  const handleExplore = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      {/* Header */}
      <header
        className="fixed w-full border-b-2 border-violet-200 dark:border-none bg-violet-100/40 dark:bg-black/40 backdrop-blur-sm py-4 z-50 transition-all duration-300 shadow-[0_1px_50px_rgb(124,58,237)] dark:shadow-[0_10px_50px_rgba(0,0,0,1)]"
        style={{
          borderBottomLeftRadius: "1.5rem",
          borderBottomRightRadius: "1.5rem",
        }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-light text-violet-500 ml-5">N4M154</h1>
          <nav className="hidden md:flex space-x-6"></nav>
          <div className="mr-5">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 z-0 bg-[url('/landing.png')] dark:bg-[url('/landing_dark.png')]"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-violet-200/30 dark:from-[#18181b]/40 dark:via-violet-900/30 dark:to-violet-950/40 to-violet-500/40"></div>
        </div>
        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-3xl">
            <h1
              className="-mt-[35px] ml-10 text-7xl md:text-9xl hover:translate-x-2 transition-all duration-700 font-thin mb-6 text-violet-700 dark:text-white animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-violet-500 dark:from-violet-200 dark:to-violet-400"
              style={{
                textShadow: "3px 6px 12px rgba(124,58,237,0.3)",
                letterSpacing: "-2px",
              }}
            >
              Harmonia
            </h1>

            <p className="ml-10 text-xl mb-8 text-violet-700 font-thin text-justify dark:text-violet-300 animate-fade-in max-w-2xl leading-relaxed hover:translate-x-2 transition-all duration-700">
              Experience the world of music in a whole new dimension. Create,
              share, and discover the perfect harmony between technology and
              sound.
            </p>
            <div className="ml-10 flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/sign-in">
                <button className="group relative w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/30">
                  <span className="flex items-center gap-2">
                    Let&apos;s Begin
                    <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400 to-violet-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </Link>
              <button
                onClick={handleExplore}
                className="w-full sm:w-auto bg-transparent border-2 border-violet-400/30 dark:border-violet-500/30 hover:border-violet-500 dark:hover:border-violet-400 text-violet-700 dark:text-violet-300 px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Explore Features
              </button>
            </div>

            <div className="ml-10 hidden lg:flex gap-6 transform hover:translate-x-2 transition-transform duration-500">
              {[
                {
                  icon: (
                    <Newspaper className="w-6 h-6 text-violet-700 dark:text-violet-500" />
                  ),
                  label: "Blog",
                },
                {
                  icon: <AudioLines className="w-6 h-6 text-teal-400" />,
                  label: "Music",
                },

                {
                  icon: <Music2 className="w-6 h-6 text-rose-400" />,
                  label: "Lyric-Card",
                },
                {
                  icon: <Shuffle className="w-6 h-6 text-blue-500" />,
                  label: "Playlist",
                },
                {
                  icon: <Lightbulb className="w-6 h-6 text-yellow-300" />,
                  label: "Suggestion",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-24 h-24 bg-gradient-to-br from-transparent via-violet-200 to-violet-300 dark:from-transparent dark:via-black/30 dark:to-black rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="text-sm text-gray-800 dark:text-gray-200 font-thin">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section
        ref={mainContentRef}
        className="py-20 bg-gradient-to-b from-white to-violet-100 dark:from-[#18181b] dark:to-black"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-thin text-center text-black dark:text-white mb-16 transform transition-all duration-200 hover:scale-105">
            <span className="text-violet-700 font-semibold">
              Harmonia&apos;s
            </span>{" "}
            Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                icon: (
                  <Newspaper className="w-10 h-10 text-violet-700 drop-shadow-[0_0_12px_rgba(236,140,245,1)] hover:scale-105 transition-all duration-200" />
                ),
                title: "Blog",
                description:
                  "Dive into the latest, hottest blog posts and get in on the action with your thoughts and comments!",
              },
              {
                icon: (
                  <AudioLines className="w-10 h-10 mb-2 text-teal-400 drop-shadow-[0_0_8px_rgba(69,245,204,1)] hover:scale-105 transition-all duration-200" />
                ),
                title: "Share Your Music",
                description:
                  "Share your music with the world! Upload your music, tell your unique stories, and join a community of passionate listeners and creators.",
              },
              {
                icon: (
                  <Music2 className="w-10 h-10 text-rose-400 drop-shadow-[0_0_8px_rgba(245,140,203,1)] hover:scale-105 transition-all duration-200" />
                ),
                title: "Lyric Card Maker",
                description:
                  "Create your own personalized lyric cards and share them with the world. Perfect for showing off your vibe!",
              },
              {
                icon: (
                  <Shuffle className="w-10 h-10 text-blue-700 drop-shadow-[0_0_8px_rgba(131,177,242,1)] hover:scale-105 transition-all duration-200" />
                ),
                title: "Mood Based Playlist",
                description:
                  "Let your mood guide the tunes! Generate playlists that'll match exactly how you're feeling in the moment.",
              },
              {
                icon: (
                  <Lightbulb className="w-10 h-10 text-yellow-300 drop-shadow-[0_0_8px_rgba(255,234,0,1)] hover:scale-105 transition-all duration-200" />
                ),
                title: "Have a Suggestion?",
                description:
                  "Got ideas for making us even better? Drop your suggestions and toss in some cool blog topic ideas while you're at it!",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-transparent border border-violet-700 p-8 rounded-2xl flex flex-col items-center justify-center transform transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <div className="mb-6 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-thin text-black dark:text-violet-500 mb-4 group-hover:text-gray-500 dark:group-hover:text-violet-300 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm text-violet-800 group-hover:text-violet-700 dark:text-gray-300 dark:group-hover:text-gray-400 transition-colors duration-300 font-thin text-justify">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
