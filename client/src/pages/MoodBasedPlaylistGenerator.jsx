// import { useState } from "react";
// import axios from "axios";
// import { Play, Shuffle } from "lucide-react";

// const SPOTIFY_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
// const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

// const MoodBasedMusicGenerator = () => {
//   const [mood, setMood] = useState("");
//   const [playlist, setPlaylist] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchMoodBasedMusic = async () => {
//     if (!mood) {
//       alert("Please select a mood.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const tokenResponse = await axios.post(
//         "https://accounts.spotify.com/api/token",
//         "grant_type=client_credentials",
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             Authorization:
//               "Basic " + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
//           },
//         }
//       );

//       const token = tokenResponse.data.access_token;

//       const moodSearchMap = {
//         happy: "happy playlist",
//         sad: "sad playlist",
//         energetic: "energetic playlist",
//         nostalgic: "nostalgic playlist",
//         instrumental: "instrumental playlist",
//       };

//       const searchQuery = moodSearchMap[mood.toLowerCase()] || "playlist";

//       const searchResponse = await axios.get(
//         `https://api.spotify.com/v1/search?q=${encodeURIComponent(
//           searchQuery
//         )}&type=playlist&limit=1`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const playlistData = searchResponse.data.playlists.items[0];

//       if (playlistData) {
//         const playlistResponse = await axios.get(
//           `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks?limit=50`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setPlaylist(playlistResponse.data.items);
//       } else {
//         alert("No playlists found for the selected mood.");
//       }
//     } catch (error) {
//       console.error("Error fetching Spotify data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDuration = (ms) => {
//     const minutes = Math.floor(ms / 60000);
//     const seconds = Math.floor((ms % 60000) / 1000);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-200 dark:from-[#18181b] dark:to-black p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Controls Section */}
//         <div className="mb-8 space-y-4">
//           <select
//             value={mood}
//             onChange={(e) => setMood(e.target.value)}
//             className="bg-violet-100 dark:bg-transparent text-black dark:text-white font-thin px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-200 w-64"
//           >
//             <option value="">Select Mood</option>
//             <option value="Happy">Happy</option>
//             <option value="Sad">Sad</option>
//             <option value="Energetic">Energetic</option>
//             <option value="Nostalgic">Nostalgic</option>
//             <option value="Instrumental">Instrumental</option>
//           </select>

//           <button
//             onClick={fetchMoodBasedMusic}
//             className="bg-violet-500 text-black font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
//           >
//             <Play size={20} /> Generate Playlist
//           </button>
//         </div>

//         {/* Playlist Section */}
//         {loading ? (
//           <div className="text-violet-500 text-xl">Loading...</div>
//         ) : playlist.length > 0 ? (
//           <div className="bg-transparent border border-violet-700 dark:border-violet-700/40 rounded-lg p-6">
//             {/* Playlist Header */}
//             <div className="flex items-end gap-6 mb-8">
//               <div className="w-52 h-52 bg-gradient-to-br from-purple-400 to-black shadow-xl flex items-center justify-center">
//                 <Shuffle size={64} className="text-white opacity-80" />
//               </div>
//               <div>
//                 <h6 className="text-sm uppercase text-black dark:text-white">
//                   Playlist
//                 </h6>
//                 <h1 className="text-6xl font-bold mb-6 dark:text-violet-500">
//                   {mood} Mix
//                 </h1>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   {playlist.length} songs
//                 </p>
//               </div>
//             </div>

//             {/* Playlist Table */}
//             <div className="mt-8">
//               <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 border-b border-gray-800 dark:border-gray-600 text-gray-500 dark:text-gray-300 text-sm">
//                 <div>#</div>
//                 <div>TITLE</div>
//                 <div>ALBUM</div>
//                 <div>DURATION</div>
//               </div>

//               <div className="divide-y divide-gray-800/50 dark:divide-gray-600/50">
//                 {playlist.map((track, index) => {
//                   const albumArt = track.track?.album?.images?.[2]?.url;
//                   const trackName =
//                     track.track?.name || "Track name not available";
//                   const artistName =
//                     track.track?.artists?.[0]?.name ||
//                     "Artist name not available";
//                   const albumName =
//                     track.track?.album?.name || "Album not available";
//                   const duration = track.track?.duration_ms;

//                   return (
//                     <div
//                       key={index}
//                       className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 hover:bg-violet-700/10 rounded group"
//                     >
//                       <div className="text-gray-500 group-hover:text-violet-500">
//                         {index + 1}
//                       </div>
//                       <div className="flex items-center gap-3">
//                         {albumArt && (
//                           <img
//                             src={albumArt}
//                             alt={trackName}
//                             className="w-10 h-10"
//                           />
//                         )}
//                         <div>
//                           <div className="font-semibold dark:text-white group-hover:text-violet-500">
//                             {trackName}
//                           </div>
//                           <div className="text-sm text-black dark:text-gray-300 font-thin">
//                             {artistName}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="text-gray-500 dark:text-gray-400 font-thin self-center">
//                         {albumName}
//                       </div>
//                       <div className="text-gray-500 dark:text-gray-400 font-thin self-center">
//                         {duration ? formatDuration(duration) : "--:--"}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500 font-thin text-lg">
//             No tracks available. Select a mood and generate a playlist!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MoodBasedMusicGenerator;

import { useState } from "react";
import axios from "axios";
import { Play, Shuffle } from "lucide-react";

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const MoodBasedMusicGenerator = () => {
  const [mood, setMood] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMoodBasedMusic = async () => {
    if (!mood) {
      alert("Please select a mood.");
      return;
    }

    setLoading(true);

    try {
      const tokenResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
          },
        }
      );

      const token = tokenResponse.data.access_token;

      const moodSearchMap = {
        happy: "happy playlist",
        sad: "sad playlist",
        energetic: "energetic playlist",
        nostalgic: "nostalgic playlist",
        instrumental: "instrumental playlist",
      };

      const searchQuery = moodSearchMap[mood.toLowerCase()] || "playlist";

      const searchResponse = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchQuery
        )}&type=playlist&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const playlistData = searchResponse.data.playlists.items[0];

      if (playlistData) {
        const playlistResponse = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks?limit=50`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlaylist(playlistResponse.data.items);
      } else {
        alert("No playlists found for the selected mood.");
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Controls Section */}
        <div className="mb-8 space-y-4">
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="bg-gray-50 dark:bg-[#282828] text-gray-900 dark:text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 w-64 border border-gray-200 dark:border-violet-500/20"
          >
            <option value="">Select Mood</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Energetic">Energetic</option>
            <option value="Nostalgic">Nostalgic</option>
            <option value="Instrumental">Instrumental</option>
          </select>

          <button
            onClick={fetchMoodBasedMusic}
            className="bg-violet-500 hover:bg-violet-600 text-black font-semibold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-violet-500/20"
          >
            <Play size={20} className="animate-pulse text-white" /> Generate
            Playlist
          </button>
        </div>

        {/* Playlist Section */}
        {loading ? (
          <div className="text-violet-500 text-xl animate-pulse">
            Loading...
          </div>
        ) : playlist.length > 0 ? (
          <div className="bg-gray-50 dark:bg-[#18181b] rounded-lg p-6 shadow-xl shadow-gray-200/50 dark:shadow-violet-500/5">
            {/* Playlist Header */}
            <div className="flex items-end gap-6 mb-8">
              <div className="w-52 h-52 bg-gradient-to-br from-violet-200 to-violet-700 dark:from-violet-500 dark:to-violet-900 shadow-2xl rounded-md flex items-center justify-center group transition-transform duration-300 hover:scale-105">
                <Shuffle
                  size={64}
                  className="text-white opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div>
                <h6 className="text-sm uppercase text-black font-thin dark:text-violet-400 tracking-wider dark:font-medium">
                  Playlist
                </h6>
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-violet-700 dark:from-violet-300 dark:to-violet-600 bg-clip-text text-transparent leading-[1.2] py-1">
                  {mood} Mix
                </h1>
                <p className="text-gray-500 dark:text-violet-300">
                  {playlist.length} songs
                </p>
              </div>
            </div>

            {/* Playlist Table */}
            <div className="mt-8">
              <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 border-b border-gray-200 dark:border-violet-500/20 text-gray-700 dark:text-violet-300 text-sm tracking-wider">
                <div>#</div>
                <div>TITLE</div>
                <div>ALBUM</div>
                <div>DURATION</div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-violet-500/10">
                {playlist.map((track, index) => {
                  const albumArt = track.track?.album?.images?.[2]?.url;
                  const trackName =
                    track.track?.name || "Track name not available";
                  const artistName =
                    track.track?.artists?.[0]?.name ||
                    "Artist name not available";
                  const albumName =
                    track.track?.album?.name || "Album not available";
                  const duration = track.track?.duration_ms;

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-md group transition-colors duration-200"
                    >
                      <div className="text-gray-400 dark:text-violet-400/70 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-3">
                        {albumArt && (
                          <img
                            src={albumArt}
                            alt={trackName}
                            className="w-10 h-10 rounded shadow-md group-hover:shadow-violet-500/20 transition-shadow"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
                            {trackName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-violet-400/70">
                            {artistName}
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-500 dark:text-violet-400/70 self-center font-light">
                        {albumName}
                      </div>
                      <div className="text-gray-500 dark:text-violet-400/70 self-center font-light">
                        {duration ? formatDuration(duration) : "--:--"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-violet-500/60 dark:text-violet-400/60 text-lg text-center">
            No tracks available. Select a mood and generate a playlist!
          </p>
        )}
      </div>
    </div>
  );
};

export default MoodBasedMusicGenerator;
