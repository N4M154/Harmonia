import React, { useState, useRef } from "react";
import axios from "axios";
import download from "downloadjs";
import { toPng } from "html-to-image";
import ColorPicker from "../components/ColorPicker";
import LyricCard from "../components/LyricCard";
import { Download, RefreshCw } from "lucide-react";

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_CLIENT_ID; //from spotify developer mode
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const LyricCardMaker = () => {
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumArt, setAlbumArt] = useState("");
  const [songLink, setSongLink] = useState("");
  const [lyrics, setLyrics] = useState([]);
  const [cardBgColor1, setCardBgColor1] = useState("#8B5CF6");
  const [cardBgColor2, setCardBgColor2] = useState("#000000");
  const [textColor, setTextColor] = useState("#F5F5F5");
  const [trackId, setTrackId] = useState("");
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);

  const fetchSpotifyData = async () => {
    if (!songLink && (!songTitle || !artist)) {
      alert("Please enter a Spotify link or both song title and artist name.");
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

      if (songLink) {
        const trackIdFromLink = songLink.split("/track/")[1]?.split("?")[0];
        if (!trackIdFromLink) {
          alert(
            "Invalid Spotify link. Please enter a valid Spotify track link."
          );
          setLoading(false);
          return;
        }

        const trackResponse = await axios.get(
          `https://api.spotify.com/v1/tracks/${trackIdFromLink}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const track = trackResponse.data;

        setSongTitle(track.name);
        setArtist(track.artists.map((artist) => artist.name).join(", "));
        setAlbumArt(track.album.images[0].url);
        setTrackId(track.id);
      } else {
        const searchResponse = await axios.get(
          `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(
            songTitle
          )}%20artist:${encodeURIComponent(artist)}&type=track&limit=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const track = searchResponse.data.tracks.items[0];

        if (track) {
          setSongTitle(track.name);
          setArtist(track.artists.map((artist) => artist.name).join(", "));
          setAlbumArt(track.album.images[0].url);
          setTrackId(track.id);
        } else {
          alert("No matching track found on Spotify.");
        }
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCard = () => {
    if (cardRef.current === null) {
      return;
    }
    toPng(cardRef.current, {
      backgroundColor: "transparent",
      pixelRatio: 2,
    })
      .then((dataUrl) => {
        download(dataUrl, `${songTitle + " - " + artist}.png`);
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  };

  const handleRefresh = () => {
    setSongTitle("");
    setArtist("");
    setAlbumArt("");
    setSongLink("");
    setLyrics([]);
    setTrackId("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-violet-200 dark:from-[#18181b] dark:to-black p-3 sm:p-5">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl lg:space-x-8 space-y-8 lg:space-y-0">
        {" "}
        <div className="flex-1 space-y-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Spotify Song Link"
              value={songLink}
              onChange={(e) => setSongLink(e.target.value)}
              className="p-3 rounded-lg shadow-lg dark:shadow-gray-400/20 dark:shadow-md bg-violet-50 dark:bg-[#18181b] text-black dark:text-white w-full border border-violet-300 dark:border-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-grow h-px bg-violet-200 dark:bg-violet-700"></div>
            <span className="text-violet-600 font-medium">OR</span>
            <div className="flex-grow h-px bg-violet-200 dark:bg-violet-700"></div>
          </div>{" "}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
            {" "}
            <input
              type="text"
              placeholder="Song Title"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="p-3 rounded-lg shadow-lg dark:shadow-md bg-violet-50 dark:bg-[#18181b] dark:border-violet-800  dark:shadow-gray-400/20 dark:text-white text-black w-full border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
            <input
              type="text"
              placeholder="Artist Name"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="p-3 rounded-lg shadow-lg dark:shadow-md bg-violet-50 dark:bg-[#18181b] dark:border-violet-800  dark:text-white text-black dark:shadow-gray-400/20 w-full border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
            <button
              onClick={fetchSpotifyData}
              className="p-4 rounded-full shadow-lg dark:shadow-md bg-black dark:bg-violet-500 dark:text-black dark:hover:opacity-80 text-violet-500 font-bold hover:bg-opacity-70 transition duration-200 whitespace-nowrap"
            >
              GO!
            </button>
            <button
              onClick={handleRefresh}
              className="p-4 rounded-full shadow-lg dark:shadow-md bg-violet-500 text-black hover:bg-opacity-80 transition duration-300 group text-2xl"
            >
              <RefreshCw className="w-6 h-6 transition-transform duration-500 ease-in-out group-hover:rotate-180" />{" "}
            </button>
          </div>
          <div>
            <textarea
              placeholder="Write lyrics here, each line on a new row..."
              value={lyrics.join("\n")}
              onChange={(e) => setLyrics(e.target.value.split("\n"))}
              className="p-3 rounded-md border dark:border-violet-800  border-violet-300 bg-violet-50 dark:bg-black dark:text-white dark:shadow-gray-400/20 dark:shadow-md text-black w-full h-40 focus:outline-none focus:ring-2 focus:ring-violet-400 shadow-lg"
            />
          </div>
          <div>
            <div
              ref={cardRef}
              style={{
                background: `linear-gradient(to bottom, ${cardBgColor1}, ${cardBgColor2})`,
                color: textColor,
                maxWidth: "350px",
                width: "100%",
              }}
              className="p-6 rounded-lg shadow-lg dark:shadow-md dark:shadow-gray-400/20 transform transition duration-300 hover:scale-105"
            >
              <LyricCard
                songTitle={songTitle}
                artist={artist}
                albumArt={albumArt}
                lyrics={lyrics}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={downloadCard}
              className="mt-4 p-3 -ml-[120px] rounded-lg shadow-lg dark:shadow-md dark:shadow-gray-400/20 dark:bg-violet-700/60 dark:text-white dark:hover:opacity-80 bg-black text-violet-400 font-thin hover:bg-opacity-60 transition duration-300 flex items-center gap-2"
            >
              {" "}
              <Download className="w-5 h-5" />
              Download png
            </button>
          </div>
        </div>
        {/* Color stuff */}
        <div className="flex-1 flex flex-col items-center space-y-6 dark:shadow-md p-4 rounded-xl border border-violet-300 dark:border-violet-800 shadow-lg dark:shadow-gray-400/20 bg-gradient-to-b from-white to-violet-200 dark:from-violet-900/20 dark:to-violet-950/20">
          <div className="space-y-4 text-[15px] mt-5">
            <div className="flex space-x-4">
              <div className="flex-1">
                <h3 className="mb-2 text-black dark:text-violet-400 font-thin inline-block">
                  Upper Gradient:
                </h3>
                <ColorPicker color={cardBgColor1} onChange={setCardBgColor1} />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-black dark:text-violet-400  font-thin inline-block">
                  Lower Gradient:
                </h3>
                <ColorPicker color={cardBgColor2} onChange={setCardBgColor2} />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-black dark:text-violet-400 font-thin inline-block">
                  Text:&nbsp;&nbsp;
                </h3>
                <ColorPicker color={textColor} onChange={setTextColor} />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-violet-700 font-thin text-lg">
                Loading music player...
              </p>
            </div>
          ) : trackId ? (
            <div className="mt-4 w-full flex justify-center">
              <iframe
                src={`https://open.spotify.com/embed/track/${trackId}`}
                width="450" // Adjusted width
                height="300"
                frameBorder="0"
                allow="encrypted-media"
                title="Spotify Player"
                className="rounded-lg shadow-lg dark:shadow-md dark:shadow-gray-400/20 transform transition duration-300 hover:scale-105 mt-[140px]"
              ></iframe>
            </div>
          ) : (
            <div className="text-center p-5">
              <h2 className="mt-40 text-[17px] font-thin text-violet-600">
                Enter correct credentials to fetch and see the player here.
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LyricCardMaker;
