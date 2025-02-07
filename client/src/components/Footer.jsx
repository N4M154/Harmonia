import React, { useEffect, useState } from "react";
import { Music, Github, Mail } from "lucide-react";
import { PiSnowflakeThin } from "react-icons/pi";

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

function Footer() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopTracks() {
      try {
        // Get the current day
        const today = new Date().toLocaleDateString("en-US", {
          weekday: "long",
        });

        // Set the slice range based on the day of the week
        let sliceStart = 0;
        let sliceEnd = 3;

        switch (today) {
          case "Monday":
            sliceStart = 8;
            sliceEnd = 11;
            break;
          case "Tuesday":
            sliceStart = 12;
            sliceEnd = 15;
            break;
          case "Wednesday":
            sliceStart = 16;
            sliceEnd = 19;
            break;
          case "Thursday":
            sliceStart = 20;
            sliceEnd = 23;
            break;
          case "Friday":
            sliceStart = 24;
            sliceEnd = 27;
            break;
          case "Saturday":
            sliceStart = 28;
            sliceEnd = 31;
            break;
          case "Sunday":
          default:
            // For Sunday (default case), set it to 0, 3
            sliceStart = 4;
            sliceEnd = 7;
            break;
        }

        // Fetch top tracks globally
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json`
        );
        const data = await response.json();
        if (data.tracks && data.tracks.track) {
          setTracks(data.tracks.track.slice(sliceStart, sliceEnd)); // Use dynamic slice range
        }
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopTracks();
  }, []);

  return (
    <footer className="w-full px-6 py-4 bg-violet-50 dark:bg-[#18181b] border-t-2 border-violet-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left Section */}
          <div className="flex items-center -ml-[500px] justify-center md:justify-start gap-2 flex-col">
            <div className="flex items-center gap-2 ml-[40px]">
              <PiSnowflakeThin className="w-4 h-4 -mr-1 text-black dark:text-violet-300" />
              <span className="text-sm text-black dark:text-violet-300 font-light">
                N4M154
              </span>
              <PiSnowflakeThin className="w-4 h-4 -ml-1 text-black dark:text-violet-300" />
            </div>
            <span className="text-[10px] text-black dark:text-violet-300 font-normal ml-10">
              © {new Date().getFullYear()} Harmonia. All rights reserved.
            </span>
          </div>

          {/* Middle Section - Top Songs */}
          <div className="flex flex-col items-center justify-center">
            {loading ? (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Loading...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <div className="relative">
                  <Music className="w-6 h-6 text-violet-700 dark:text-violet-500 animate-bounce-music" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-violet-400 rounded-full animate-ping" />
                  <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-violet-500 rounded-full animate-ping delay-100" />
                </div>
                {tracks.map((track, index) => (
                  <React.Fragment key={track.mbid || index}>
                    <div className="text-[11px] uppercase text-black dark:text-violet-300 text-center transition-colors hover:text-violet-600 dark:hover:text-violet-400">
                      <span>{track.name}</span>
                      <div className="text-[10px] lowercase text-black/70 dark:text-violet-200">
                        ({track.artist.name}){" "}
                      </div>
                    </div>
                    {index < tracks.length - 1 && (
                      <span className="text-black dark:text-violet-300">
                        &bull;
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Right Section - Links */}
          <div className="-mr-20 flex items-center justify-center md:justify-end">
            <a
              href="https://github.com/N4M154"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black dark:text-violet-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-thin hover:underline">GitHub</span>
            </a>
            <div className="mx-4 h-5 w-px bg-black/30 dark:bg-violet-300/30" />
            <a
              href="mailto:namisa.najah.raisa@gmail.com"
              className="flex items-center gap-2 text-black dark:text-violet-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm font-thin hover:underline">
                Namisa Najah
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
