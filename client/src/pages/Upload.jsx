// import React, { useState, useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import axios from "axios";
// import { X } from "lucide-react";

// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [description, setDescription] = useState("");
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");
//   const [uploadDate, setUploadDate] = useState(new Date().toISOString());
//   const [fileLink, setFileLink] = useState("");
//   const [audioFiles, setAudioFiles] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAudio, setSelectedAudio] = useState(null);

//   const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: "mern-auth-b8aa0.firebaseapp.com",
//     projectId: "mern-auth-b8aa0",
//     storageBucket: "mern-auth-b8aa0.appspot.com",
//     messagingSenderId: "1050835060039",
//     appId: "1:1050835060039:web:5ed5377b35feb79a28b862",
//   };

//   const app = initializeApp(firebaseConfig);
//   const storage = getStorage(app);

//   useEffect(() => {
//     axios
//       .get("/api/audio/getallaudio")
//       .then((response) => {
//         setAudioFiles(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching audio files:", error);
//       });
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleTagInput = (e) => {
//     if (e.key === "Enter" && tagInput !== "") {
//       setTags((prevTags) => [...prevTags, tagInput]);
//       setTagInput("");
//     }
//   };

//   const handleUpload = () => {
//     if (!file) return;

//     const storageRef = ref(storage, `harmonia_audio_files/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setProgress(prog);
//       },
//       (error) => {
//         console.error("Upload error:", error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setFileLink(downloadURL);
//           const data = {
//             title,
//             artist,
//             description,
//             tags,
//             uploadDate,
//             fileLink: downloadURL,
//           };

//           axios.post("/api/audio/createaudio", data).then((response) => {
//             console.log("Audio data saved:", response.data);
//           });
//         });
//       }
//     );
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleDescriptionChange = (e) => {
//     const { value } = e.target;
//     if (value.length <= 350) {
//       setDescription(value);
//     }
//   };

//   const openModal = (audio) => {
//     setSelectedAudio(audio);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold text-center mb-6">Upload Your Audio</h1>

//       <div className="space-y-4">
//         {/* File Upload */}
//         <div>
//           <label
//             htmlFor="file-upload"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Choose Audio File
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             accept="audio/*"
//             onChange={handleFileChange}
//             className="mt-2 block w-full text-sm text-gray-900 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//         {/* Title */}
//         <div>
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Title
//           </label>
//           <input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="mt-2 block w-full p-2 text-sm border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter a title"
//           />
//         </div>

//         {/* Artist */}
//         <div>
//           <label
//             htmlFor="artist"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Artist
//           </label>
//           <input
//             id="artist"
//             type="text"
//             value={artist}
//             onChange={(e) => setArtist(e.target.value)}
//             className="mt-2 block w-full p-2 text-sm border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter the artist"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description (Max: 350 characters)
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={handleDescriptionChange}
//             className="mt-2 block w-full p-2 text-sm border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter a description (Max: 350 characters)"
//             rows="4"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             {description.length}/350 characters
//           </p>
//         </div>

//         {/* Tags */}
//         <div>
//           <label
//             htmlFor="tags"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Tags (press Enter to add)
//           </label>
//           <input
//             id="tags"
//             type="text"
//             value={tagInput}
//             onChange={(e) => setTagInput(e.target.value)}
//             onKeyDown={handleTagInput}
//             className="mt-2 block w-full p-2 text-sm border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Add tags"
//           />
//           <div className="mt-2">
//             <ul className="flex flex-wrap gap-2">
//               {tags.map((tag, index) => (
//                 <li
//                   key={index}
//                   className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
//                 >
//                   {tag}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Upload Button */}
//         <div className="text-center">
//           <button
//             onClick={handleUpload}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
//           >
//             Upload
//           </button>
//         </div>

//         {/* Upload Progress */}
//         {progress > 0 && (
//           <div>
//             <p className="text-center text-sm text-gray-600">
//               Upload Progress: {progress}%
//             </p>
//             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//               <div
//                 className="bg-blue-600 h-2 rounded-full"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>
//         )}

//         {/* File Link */}
//         {fileLink && (
//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-600">File uploaded successfully!</p>
//             <a
//               href={fileLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               View File
//             </a>
//           </div>
//         )}
//       </div>

//       {/* Display all Audio Files in Grid Layout */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">Uploaded Audio Files</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//           {audioFiles.map((audioFile) => (
//             <div
//               key={audioFile._id}
//               className="p-6 bg-gray-50 rounded-lg shadow-md flex flex-col items-center relative"
//             >
//               <button
//                 onClick={() => openModal(audioFile)}
//                 className="absolute top-2 right-2 px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//               >
//                 Read
//               </button>
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {audioFile.title}
//                 <span className="text-xs"> by</span> {audioFile.artist}
//               </h3>
//               <p className="text-sm text-gray-600">
//                 Uploaded by: {audioFile.user.username} ({audioFile.user.email})
//               </p>
//               <p className="text-sm text-gray-600">
//                 Uploaded on: {formatDate(audioFile.uploadDate)}
//               </p>
//               <audio controls className="mt-4 w-full">
//                 <source src={audioFile.fileLink} type="audio/mpeg" />
//                 Your browser does not support the audio element.
//               </audio>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Description Modal */}
//       {isModalOpen && selectedAudio && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-[500px] max-h-[90vh] overflow-hidden relative flex flex-col">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <X size={24} />
//             </button>
//             <div className="p-6 border-b">
//               <h3 className="text-xl font-semibold">{selectedAudio.title}</h3>
//               <p className="text-gray-600">
//                 by <span className="font-medium">{selectedAudio.artist}</span>
//               </p>
//             </div>
//             <div className="p-6 flex-grow overflow-auto">
//               <h4 className="text-lg font-medium mb-3">Description</h4>
//               <p className="text-gray-700 whitespace-pre-wrap">
//                 {selectedAudio.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import axios from "axios";
// import { X } from "lucide-react";

// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [description, setDescription] = useState("");
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");
//   const [uploadDate, setUploadDate] = useState(new Date().toISOString());
//   const [fileLink, setFileLink] = useState("");
//   const [audioFiles, setAudioFiles] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAudio, setSelectedAudio] = useState(null);
//   const [image, setImage] = useState(null);
//   const [imageLink, setImageLink] = useState("");

//   const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: "mern-auth-b8aa0.firebaseapp.com",
//     projectId: "mern-auth-b8aa0",
//     storageBucket: "mern-auth-b8aa0.appspot.com",
//     messagingSenderId: "1050835060039",
//     appId: "1:1050835060039:web:5ed5377b35feb79a28b862",
//   };

//   const app = initializeApp(firebaseConfig);
//   const storage = getStorage(app);

//   useEffect(() => {
//     axios
//       .get("/api/audio/getallaudio")
//       .then((response) => {
//         setAudioFiles(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching audio files:", error);
//       });
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleTagInput = (e) => {
//     if (e.key === "Enter" && tagInput !== "") {
//       setTags((prevTags) => [...prevTags, tagInput]);
//       setTagInput("");
//     }
//   };

//   const handleUpload = () => {
//     if (!file) return;

//     const storageRef = ref(storage, `harmonia_audio_files/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setProgress(prog);
//       },
//       (error) => {
//         console.error("Upload error:", error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setFileLink(downloadURL);

//           // Upload image if provided
//           if (image) {
//             const imageRef = ref(storage, `harmonia_audio_files/${image.name}`);
//             const imageUploadTask = uploadBytesResumable(imageRef, image);

//             imageUploadTask.on(
//               "state_changed",
//               null,
//               (error) => console.error("Image upload error:", error),
//               () => {
//                 getDownloadURL(imageUploadTask.snapshot.ref).then(
//                   (imageURL) => {
//                     submitForm(downloadURL, imageURL);
//                   }
//                 );
//               }
//             );
//           } else {
//             submitForm(
//               downloadURL,
//               "https://i.pinimg.com/736x/1b/d1/6d/1bd16d916408f56e0003ce2b1bccbb08.jpg"
//             ); // Use default image if none is uploaded
//           }
//         });
//       }
//     );
//   };
//   const submitForm = (fileURL, imageURL) => {
//     const data = {
//       title,
//       artist,
//       description,
//       tags,
//       fileLink: fileURL,
//       coverImage: imageURL,
//     };

//     axios.post("/api/audio/createaudio", data).then((response) => {
//       console.log("Audio data saved:", response.data);
//     });
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleDescriptionChange = (e) => {
//     const { value } = e.target;
//     if (value.length <= 350) {
//       setDescription(value);
//     }
//   };

//   const openModal = (audio) => {
//     setSelectedAudio(audio);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold text-center mb-6">Upload Your Audio</h1>

//       <div className="space-y-4">
//         {/* File Upload */}
//         <div>
//           <label
//             htmlFor="file-upload"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Choose Audio File
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             accept="audio/*"
//             onChange={handleFileChange}
//             className="mt-2 block w-full text-sm text-gray-900 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         {/* Cover Image Upload */}
//         <div>
//           <label
//             htmlFor="image-upload"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Upload Cover Image
//           </label>
//           <input
//             id="image-upload"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="mt-2 block w-full text-sm text-gray-900 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         {/* Title */}
//         <div>
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Title
//           </label>
//           <input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="mt-2 block w-full p-2 text-sm border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter a title"
//           />
//         </div>

//         {/* Artist */}
//         <div>
//           <label
//             htmlFor="artist"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Artist
//           </label>
//           <input
//             id="artist"
//             type="text"
//             value={artist}
//             onChange={(e) => setArtist(e.target.value)}
//             className="mt-2 block w-full p-2 text-sm border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter the artist"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description (Max: 350 characters)
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={handleDescriptionChange}
//             className="mt-2 block w-full p-2 text-sm border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter a description (Max: 350 characters)"
//             rows="4"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             {description.length}/350 characters
//           </p>
//         </div>

//         {/* Tags */}
//         <div>
//           <label
//             htmlFor="tags"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Tags (press Enter to add)
//           </label>
//           <input
//             id="tags"
//             type="text"
//             value={tagInput}
//             onChange={(e) => setTagInput(e.target.value)}
//             onKeyDown={handleTagInput}
//             className="mt-2 block w-full p-2 text-sm border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Add tags"
//           />
//           <div className="mt-2">
//             <ul className="flex flex-wrap gap-2">
//               {tags.map((tag, index) => (
//                 <li
//                   key={index}
//                   className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
//                 >
//                   {tag}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Upload Button */}
//         <div className="text-center">
//           <button
//             onClick={handleUpload}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
//           >
//             Upload
//           </button>
//         </div>

//         {/* Upload Progress */}
//         {progress > 0 && (
//           <div>
//             <p className="text-center text-sm text-gray-600">
//               Upload Progress: {progress}%
//             </p>
//             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//               <div
//                 className="bg-blue-600 h-2 rounded-full"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>
//         )}

//         {/* File Link */}
//         {fileLink && (
//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-600">File uploaded successfully!</p>
//             <a
//               href={fileLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               View File
//             </a>
//           </div>
//         )}
//       </div>

//       {/* Display all Audio Files in Grid Layout */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">Uploaded Audio Files</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//           {audioFiles.map((audioFile) => (
//             <div
//               key={audioFile._id}
//               className="p-6 bg-gray-50 rounded-lg shadow-md flex flex-col items-center relative"
//             >
//               <img
//                 src={audioFile.coverImage}
//                 alt={audioFile.title}
//                 className="w-32 h-32 object-cover rounded-lg"
//               />
//               <button
//                 onClick={() => openModal(audioFile)}
//                 className="absolute top-2 right-2 px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//               >
//                 Read
//               </button>
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {audioFile.title}
//                 <span className="text-xs"> by</span> {audioFile.artist}
//               </h3>
//               <p className="text-sm text-gray-600">
//                 Uploaded by: {audioFile.user.username} ({audioFile.user.email})
//               </p>
//               <p className="text-sm text-gray-600">
//                 Uploaded on: {formatDate(audioFile.uploadDate)}
//               </p>
//               <audio controls className="mt-4 w-full">
//                 <source src={audioFile.fileLink} type="audio/mpeg" />
//                 Your browser does not support the audio element.
//               </audio>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Description Modal */}
//       {isModalOpen && selectedAudio && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-[500px] max-h-[90vh] overflow-hidden relative flex flex-col">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <X size={24} />
//             </button>
//             <div className="p-6 border-b">
//               <h3 className="text-xl font-semibold">{selectedAudio.title}</h3>
//               <p className="text-gray-600">
//                 by <span className="font-medium">{selectedAudio.artist}</span>
//               </p>
//             </div>
//             <div className="p-6 flex-grow overflow-auto">
//               <h4 className="text-lg font-medium mb-3">Description</h4>
//               <p className="text-gray-700 whitespace-pre-wrap">
//                 {selectedAudio.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { X, Upload as UploadIcon } from "lucide-react";

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

          // Upload image if provided
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
              "https://i.pinimg.com/736x/1b/d1/6d/1bd16d916408f56e0003ce2b1bccbb08.jpg"
            ); // Use default image if none is uploaded
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
        setIsFormOpen(false); // Close form after successful upload
        // Reset form
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
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-50 dark:from-[#18181b] dark:to-black">
      <div className="max-w-7xl mx-auto p-8">
        {/* Upload Button */}
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="mb-6 flex items-center gap-2 bg-violet-500 text-white font-thin px-3 py-3 rounded-full shadow-md hover:bg-opacity-80 transition-all mx-auto"
        >
          {isFormOpen ? <X size={20} /> : <UploadIcon size={20} />}
        </button>

        {/* Upload Form */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isFormOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-transparent border border-violet-700 dark:border-violet-700/50 rounded-lg p-8 mb-8">
            <h1 className="text-2xl font-thin text-black dark:text-white text-center mb-6">
              Share your music with the world
            </h1>

            <div className="space-y-4">
              {/* File Upload Section (Music & Cover Image) */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Music File Upload */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="file-upload"
                    className="block text-sm font-thin text-gray-700 dark:text-violet-500"
                  >
                    Choose music file
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="dark:bg-transparent mt-2 block w-full text-sm font-thin dark:text-white rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 border border-violet-700/50"
                  />
                </div>

                {/* Cover Image Upload */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="image-upload"
                    className="block text-sm font-thin text-gray-700 dark:text-violet-500"
                  >
                    Choose cover image
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="dark:bg-transparent mt-2 block w-full text-sm font-thin dark:text-white rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 border border-violet-700/50"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-thin text-gray-700 dark:text-violet-500"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="dark:bg-transparent mt-2 block w-full text-sm font-thin dark:text-white rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Enter a title"
                />
              </div>

              {/* Artist */}
              <div>
                <label
                  htmlFor="artist"
                  className="block text-sm font-thin text-gray-700 dark:text-violet-500"
                >
                  Artist
                </label>
                <input
                  id="artist"
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="dark:bg-transparent mt-2 block w-full text-sm font-thin dark:text-white rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Enter the artist"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-thin text-gray-700 dark:text-violet-500"
                >
                  Description (Max: 350 characters)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="dark:bg-transparent mt-2 block w-full text-sm font-thin dark:text-white rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Enter a description (Max: 350 characters)"
                  rows="4"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {description.length}/350 characters
                </p>
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-thin text-gray-700 dark:text-violet-500"
                >
                  Tags (press Enter to add)
                </label>
                <input
                  id="tags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  className="dark:bg-transparent mt-2 block w-full text-sm font-thin dark:text-white rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Add tags"
                />
                <div className="mt-2">
                  <ul className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <li
                        key={index}
                        className="bg-violet-200 text-violet-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Upload Button */}
              <div className="text-center">
                <button
                  onClick={handleUpload}
                  className="w-full bg-violet-500 text-white font-thin py-2 rounded-lg shadow-md hover:opacity-80 transition-colors"
                >
                  Upload
                </button>
              </div>

              {/* Upload Progress */}
              {progress > 0 && (
                <div>
                  <p className="text-center text-sm text-gray-600">
                    Upload Progress: {progress}%
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* File Link */}
              {fileLink && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    File uploaded successfully!
                  </p>
                  <a
                    href={fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View File
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Display all Audio Files in Grid Layout */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Uploaded Audio Files</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {audioFiles.map((audioFile) => (
              <div
                key={audioFile._id}
                className="bg-transparent dark:bg-transparent rounded-lg shadow-lg overflow-hidden hover:shadow-xl dark:shadow-xl dark:hover:shadow-2xl dark:shadow-violet-600/30 dark:hover:shadow-violet-600/40 transition-shadow duration-300"
              >
                {/* Cover Image */}
                <div className="relative aspect-video">
                  <img
                    src={audioFile.coverImage}
                    alt={audioFile.title}
                    className="w-full h-full object-cover"
                  />{" "}
                  <button
                    onClick={() => openModal(audioFile)}
                    className="absolute top-3 right-3 px-4 py-2 text-xs bg-violet-600 text-white rounded-full hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    Read
                  </button>
                </div>

                {/* Audio Details */}
                <div className="p-4">
                  <h3 className="text-xl font-normal text-black dark:text-violet-300 truncate">
                    {audioFile.title}
                  </h3>
                  <p className="text-xs font-thin text-gray-600 dark:text-gray-300 mb-2">
                    by{" "}
                    <span className="font-normal text-md text-black dark:text-violet-200">
                      {audioFile.artist}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300/60 mb-3">
                    Shared by: {audioFile.user.username} on{" "}
                    {formatDate(audioFile.uploadDate)}
                  </p>

                  {/* Audio Player */}
                  <div className="bg-violet-100 dark:bg-violet-900 rounded-2xl p-2">
                    <audio controls className="w-full bg-transparent">
                      <source src={audioFile.fileLink} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description Modal */}
        {isModalOpen && selectedAudio && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[500px] max-h-[90vh] overflow-hidden relative flex flex-col">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold">{selectedAudio.title}</h3>
                <p className="text-gray-600">
                  by <span className="font-medium">{selectedAudio.artist}</span>
                </p>
              </div>
              <div className="p-6 flex-grow overflow-auto">
                <h4 className="text-lg font-medium mb-3">Description</h4>
                <p className="text-gray-700 whitespace-pre-wrap">
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
