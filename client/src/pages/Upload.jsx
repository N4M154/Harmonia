import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import {
  X,
  Upload as UploadIcon,
  Music2,
  Image as ImageIcon,
} from "lucide-react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [uploadDate, setUploadDate] = useState(new Date().toISOString());
  const [fileLink, setFileLink] = useState("");
  const [audioFiles, setAudioFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-b8aa0.firebaseapp.com",
    projectId: "mern-auth-b8aa0",
    storageBucket: "mern-auth-b8aa0.appspot.com",
    messagingSenderId: "1050835060039",
    appId: "1:1050835060039:web:5ed5377b35feb79a28b862",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  useEffect(() => {
    axios
      .get("/api/audio/getallaudio")
      .then((response) => {
        setAudioFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching audio files:", error);
      });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && tagInput !== "") {
      setTags((prevTags) => [...prevTags, tagInput]);
      setTagInput("");
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `harmonia_audio_files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileLink(downloadURL);

          if (image) {
            const imageRef = ref(storage, `harmonia_audio_files/${image.name}`);
            const imageUploadTask = uploadBytesResumable(imageRef, image);

            imageUploadTask.on(
              "state_changed",
              null,
              (error) => console.error("Image upload error:", error),
              () => {
                getDownloadURL(imageUploadTask.snapshot.ref).then(
                  (imageURL) => {
                    submitForm(downloadURL, imageURL);
                  }
                );
              }
            );
          } else {
            submitForm(
              downloadURL,
              "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80"
            );
          }
        });
      }
    );
  };

  const submitForm = (fileURL, imageURL) => {
    const data = {
      title,
      artist,
      description,
      tags,
      fileLink: fileURL,
      coverImage: imageURL,
    };

    axios
      .post("/api/audio/createaudio", data)
      .then((response) => {
        console.log("Audio data saved:", response.data);
        setAudioFiles((prevAudioFiles) => [...prevAudioFiles, response.data]);
        setIsFormOpen(false);
        setFile(null);
        setImage(null);
        setTitle("");
        setArtist("");
        setDescription("");
        setTags([]);
        setTagInput("");
        setProgress(0);
        setFileLink("");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    if (value.length <= 350) {
      setDescription(value);
    }
  };

  const openModal = (audio) => {
    setSelectedAudio(audio);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100 dark:from-[#18181b] dark:to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/30 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse-ring"
          style={{ animationDelay: "-0.75s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        {/* Upload Button */}
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="mb-6 group relative inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card hover:glass-card-hover transition-all duration-500 mx-auto"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400/20 to-violet-400/20 animate-pulse-ring"></div>
          {isFormOpen ? (
            <X className="w-5 h-5 text-violet-500 dark:text-violet-300" />
          ) : (
            <UploadIcon className="w-5 h-5 text-violet-500 dark:text-violet-300" />
          )}
          <span className="text-sm font-medium text-gray-800 dark:text-violet-200">
            {isFormOpen ? "Close Upload" : "Share Your Music"}
          </span>
        </button>

        {/* Upload Form */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isFormOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass-card rounded-2xl p-8 mb-8">
            <h1 className="text-3xl font-light text-gray-800 dark:text-violet-200 text-center mb-8 bg-gradient-to-r from-teal-400 via-violet-500 to-purple-600 bg-clip-text text-transparent">
              Share your music with the world
            </h1>

            <div className="space-y-6">
              {/* File Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Music File Upload */}
                <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:glass-card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <Music2 className="w-5 h-5 text-violet-500 dark:text-violet-300" />
                    <label
                      htmlFor="file-upload"
                      className="text-sm font-medium text-gray-700 dark:text-violet-300"
                    >
                      Choose music file
                    </label>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-900/50 dark:file:text-violet-300"
                  />
                </div>

                {/* Cover Image Upload */}
                <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:glass-card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <ImageIcon className="w-5 h-5 text-violet-500 dark:text-violet-300" />
                    <label
                      htmlFor="image-upload"
                      className="text-sm font-medium text-gray-700 dark:text-violet-300"
                    >
                      Choose cover image
                    </label>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-900/50 dark:file:text-violet-300"
                  />
                </div>
              </div>

              {/* Title & Artist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-violet-300 mb-2"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/10 border border-violet-200 dark:border-violet-700/50 text-gray-800 dark:text-violet-200 placeholder-gray-400 dark:placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Enter a title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="artist"
                    className="block text-sm font-medium text-gray-700 dark:text-violet-300 mb-2"
                  >
                    Artist
                  </label>
                  <input
                    id="artist"
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/10 border border-violet-200 dark:border-violet-700/50 text-gray-800 dark:text-violet-200 placeholder-gray-400 dark:placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Enter artist name"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-violet-300 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-violet-200 dark:border-violet-700/50 text-gray-800 dark:text-violet-200 placeholder-gray-400 dark:placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 min-h-[100px]"
                  placeholder="Enter a description (Max: 350 characters)"
                />
                <p className="text-xs text-gray-500 dark:text-violet-400/70 mt-2">
                  {description.length}/350 characters
                </p>
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 dark:text-violet-300 mb-2"
                >
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-violet-200 dark:border-violet-700/50 text-gray-800 dark:text-violet-200 placeholder-gray-400 dark:placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  placeholder="Press Enter to add tags"
                />
                <div className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <li
                        key={index}
                        className="lowercase px-3 py-1 rounded-full text-sm bg-violet-500/20 dark:bg-violet-500/30 text-violet-700 dark:text-violet-200 border border-violet-300 dark:border-violet-600/50"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Upload Button & Progress */}
              <div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleUpload}
                    className="w-20 flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity relative overflow-hidden group"
                  >
                    <UploadIcon className="" /> {/* Remove ml-[600px] */}
                    <div className="absolute inset-0 animate-shimmer group-hover:opacity-100 opacity-0 transition-opacity"></div>
                  </button>
                </div>

                {progress > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-violet-300 mb-2">
                      <span>Uploading...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-violet-100 dark:bg-violet-900/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Audio Files Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-thin text-gray-800 dark:text-violet-200 mb-8">
            Discover Tracks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {audioFiles.map((audioFile) => (
              <div
                key={audioFile._id}
                className="glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:glass-card-hover group"
              >
                <div className="relative aspect-video">
                  <img
                    src={audioFile.coverImage}
                    alt={audioFile.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button
                    onClick={() => openModal(audioFile)}
                    className="absolute bottom-4 right-4 px-4 py-2 text-sm bg-violet-400 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-opacity-80"
                  >
                    View Details
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-thin text-black dark:text-violet-200 mb-2">
                    {audioFile.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-normal dark:text-violet-300/70 mb-4">
                    by {audioFile.artist}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-violet-400/50 mb-4">
                    Shared by {audioFile.user.username} •{" "}
                    {formatDate(audioFile.uploadDate)}
                  </div>

                  <div className="bg-white/5 backdrop-blur-md rounded-xl p-3">
                    <audio controls className="w-full audio-player">
                      <source src={audioFile.fileLink} type="audio/mpeg" />
                    </audio>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedAudio && (
          <div className="fixed inset-0 bg-violet-100/40 dark:bg-[#18181b]/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-violet-100 dark:bg-[#18181b] rounded-2xl w-[600px] max-h-[90vh] overflow-hidden relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>

              <img
                src={selectedAudio.coverImage}
                alt={selectedAudio.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-thin text-black dark:text-violet-200 mb-2">
                  {selectedAudio.title}
                </h3>
                <p className="text-gray-600 dark:text-violet-300 mb-6">
                  by <span className="font-normal">{selectedAudio.artist}</span>
                </p>

                <h4 className="text-xs font-thin text-gray-400 dark:text-violet-200/50 mb-3">
                  shared by {selectedAudio.user.username} •{" "}
                  {formatDate(selectedAudio.uploadDate)}
                </h4>
                <p className="text-gray-600 dark:text-white whitespace-pre-wrap font-thin">
                  {selectedAudio.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
