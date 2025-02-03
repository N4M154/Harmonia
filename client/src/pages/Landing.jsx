import { Award } from "lucide-react";
import { Link } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

export function Landing() {
  return (
    <div>
      {/* Header */}
      <header
        className="fixed w-full border-b-2 border-violet-200 dark:border-none bg-violet-100/40 dark:bg-black/40 backdrop-blur-sm py-4 z-50 transition-all duration-300 shadow-[0_1px_50px_rgb(124,58,237)] dark:shadow-[0_10px_50px_rgb(24,24,28)]"
        style={{
          borderBottomLeftRadius: "1.5rem",
          borderBottomRightRadius: "1.5rem",
        }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-light text-violet-500 ml-5">N4M154</h1>
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
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 dark:from-[#18181b]/40 dark:to-violet-950/40 to-violet-500/40"></div>
        </div>
        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-3xl transform transition-all duration-700 hover:translate-x-2">
            <h1
              className="text-8xl md:text-9xl font-thin mb-6 text-violet-700 dark:text-white animate-fade-in"
              style={{ textShadow: "3px 6px 12px rgb(124,58,237)" }}
            >
              Harmonia
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-violet-700 font-thin dark:text-violet-300 animate-fade-in">
              something...
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/sign-in">
                <button className="w-full sm:w-auto bg-violet-400 hover:bg-violet-500 text-white dark:text-black px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-xl dark:shadow-xl shadow-black/40 dark:shadow-black dark:hover:shadow-black hover:shadow-xl dark:hover:shadow-xl hover:shadow-black/40">
                  Let&apos;s go!
                </button>
              </Link>
              {/* <Link to="/sign-up">
                <button className="w-full sm:w-auto bg-transparent border-2 border-yellow-200 hover:bg-yellow-200/10 text-yellow-200 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-200/20">
                  Explore Courses
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-violet-100 dark:from-[#18181b] dark:to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-thin text-center text-black dark:text-white mb-16 transform transition-all duration-200 hover:scale-105">
            <span className="text-violet-700 font-semibold">
              Harmonia&apos;s
            </span>{" "}
            Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <Award className="w-12 h-12 text-black dark:text-violet-500 group-hover:text-gray-800 dark:group-hover:text-violet-300 transition-colors duration-300" />
                ),
                title: "Certification",
                description:
                  "Earn certificates upon completing courses and projects.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-transparent border border-violet-700 p-8 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <div className="mb-6 transform transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-black dark:text-violet-500 mb-4 group-hover:text-violet-500 dark:group-hover:text-violet-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-violet-700 dark:text-gray-300 group-hover:text-gray-500 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
