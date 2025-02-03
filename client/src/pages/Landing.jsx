import { Award, Book, Brain, Terminal, Timer, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

export function Landing() {
  return (
    <div>
      {/* Header */}
      <header className="fixed w-full border-b-2 border-violet-200 dark:border-gray-800 bg-violet-100 dark:bg-[#18181b] backdrop-blur-sm py-4 z-50 transition-all duration-300">
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
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-3xl transform transition-all duration-700 hover:translate-x-2">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-yellow-200 animate-fade-in">
              Master Programming with Confidence
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Interactive learning platform with AI-powered guidance, real-time
              coding environments, and a supportive community to help you
              achieve your coding goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/sign-up">
                <button className="w-full sm:w-auto bg-yellow-200 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-200/20">
                  Start Learning Now
                </button>
              </Link>
              <Link to="/courses">
                <button className="w-full sm:w-auto bg-transparent border-2 border-yellow-200 hover:bg-yellow-200/10 text-yellow-200 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-200/20">
                  Explore Courses
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-violet-100 dark:from-[#18181b] dark:to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-yellow-200 mb-16 transform transition-all duration-500 hover:scale-105">
            Everything You Need to Succeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <Terminal className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
                ),
                title: "Interactive Code Editor",
                description:
                  "Write, compile, and test code directly in your browser with our powerful editor.",
              },
              {
                icon: (
                  <Brain className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
                ),
                title: "AI-Powered Learning",
                description:
                  "Get personalized suggestions and help from our AI assistant as you code.",
              },
              {
                icon: (
                  <Book className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
                ),
                title: "Comprehensive Curriculum",
                description:
                  "Structured learning paths for multiple programming languages and skill levels.",
              },
              {
                icon: (
                  <Timer className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
                ),
                title: "Progress Tracking",
                description:
                  "Monitor your learning journey with detailed progress analytics.",
              },
              {
                icon: (
                  <Users className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
                ),
                title: "Community Support",
                description:
                  "Connect with fellow learners and mentors in our active community.",
              },
              {
                icon: (
                  <Award className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
                ),
                title: "Certification",
                description:
                  "Earn certificates upon completing courses and projects.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-yellow-50 dark:bg-gray-800 p-8 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <div className="mb-6 transform transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4 dark:group-hover:text-yellow-300 group-hover:text-yellow-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
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
