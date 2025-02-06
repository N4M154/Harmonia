// import { Footer } from "flowbite-react";
// import { Link } from "react-router-dom";
// import { BsGithub } from "react-icons/bs";
// export default function FooterCom() {
//   return (
//     <Footer
//       container
//       className="py-[0.5mm] border border-t-[4px] border-violet-200 dark:border-violet-800 bg-gradient-to-b from-white to-violet-100 dark:from-[#18181b] dark:to-[#18181b]"
//     >
//       <div className="w-full max-w-7xl mx-auto ">
//         <div className="grid w-full justify-between sm:flex md:grid-cols-1">
//           <div className="mt-5">
//             <Link
//               to="/"
//               className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
//             >
//               <span className="px-2 py-1 rounded-lg text-violet-500">
//                 N4M154
//               </span>
//             </Link>
//           </div>
//           <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
//             <div>
//               <Footer.Title title="About" />
//               <Footer.LinkGroup col>
//                 <Footer.Link
//                   href="/about"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Harmonia
//                 </Footer.Link>
//               </Footer.LinkGroup>
//             </div>
//             <div>
//               <Footer.Title title="Follow us" />
//               <Footer.LinkGroup col>
//                 <Footer.Link
//                   href="https://www.github.com/N4M154"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Github
//                 </Footer.Link>
//               </Footer.LinkGroup>
//             </div>
//             <div>
//               <Footer.Title title="Legal" />
//               <Footer.LinkGroup col>
//                 <Footer.Link href="#">Privacy Policy</Footer.Link>
//                 <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
//               </Footer.LinkGroup>
//             </div>
//           </div>
//         </div>
//         <Footer.Divider />
//         <div className="w-full sm:flex sm:items-center sm:justify-between">
//           <Footer.Copyright
//             href="#"
//             by="Harmonia"
//             year={new Date().getFullYear()}
//           />
//           <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
//             <Footer.Icon href="https://github.com/N4M154" icon={BsGithub} />
//           </div>
//         </div>
//       </div>
//     </Footer>
//   );
// }

import React, { useEffect, useState } from "react";
import { Music, Github, Mail } from "lucide-react";
import { PiSnowflakeThin } from "react-icons/pi";

const API_KEY = "b21234c51548a298740bf6d314ffe55b";

function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopTracks() {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json`
        );
        const data = await response.json();
        if (data.tracks && data.tracks.track) {
          setTracks(data.tracks.track.slice(0, 3));
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
          <div className="flex items-center -ml-[90px] justify-center md:justify-start gap-2">
            <PiSnowflakeThin className="w-4 h-4 -mr-1 text-black dark:text-violet-300" />
            <span className="text-sm text-black dark:text-violet-300 font-light">
              N4M154
            </span>
            <PiSnowflakeThin className="w-4 h-4 -ml-1 text-black dark:text-violet-300" />
          </div>

          {/* Middle Section - Top Songs */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              {/* <Music className="w-4 h-4 text-black dark:text-violet-300" />
              <span className="text-sm font-medium text-black dark:text-violet-300">
                Top Tracks
              </span> */}
            </div>
            {loading ? (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Loading...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                {" "}
                <div className="relative">
                  <Music className="w-6 h-6 text-violet-700 dark:text-violet-500 animate-bounce-music" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-violet-400 rounded-full animate-ping" />
                  <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-violet-500 rounded-full animate-ping delay-100" />
                </div>
                {tracks.map((track, index) => (
                  <React.Fragment key={track.mbid || index}>
                    <div className="text-xs uppercase text-black dark:text-violet-300 text-center transition-colors hover:text-violet-600 dark:hover:text-violet-400">
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
              <span className="text-sm">GitHub</span>
            </a>
            <div className="mx-4 h-5 w-px bg-black/30 dark:bg-violet-300/30" />
            <a
              href="mailto:namisa.najah.raisa@gmail.com"
              className="flex items-center gap-2 text-black dark:text-violet-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">Namisa Najah</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
