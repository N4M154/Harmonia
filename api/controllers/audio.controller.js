// // controllers/audioController.js

// import Audio from "../models/audio.model.js";
// import User from "../models/user.model.js";

// const createAudio = async (req, res) => {
//   try {
//     const { title, artist, description, tags, uploadDate, fileLink } = req.body;

//     // Check if user is logged in (assuming user is attached to req.user from authentication)
//     if (!req.user) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }

//     const newAudio = new Audio({
//       title,
//       artist,
//       description,
//       tags,
//       uploadDate,
//       fileLink,
//       user: req.user.id, // Assigning the logged-in user's ID
//     });

//     const savedAudio = await newAudio.save();

//     res.status(201).json(savedAudio);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error saving audio metadata", message: error.message });
//   }
// };

// // Fetch all audio files, populating user information
// const getAllAudioFiles = async (req, res) => {
//   try {
//     const audioFiles = await Audio.find().populate("user", "username email"); // Populating user data

//     res.status(200).json(audioFiles);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error fetching audio files", message: error.message });
//   }
// };

// export { createAudio, getAllAudioFiles };

import Audio from "../models/audio.model.js";

const createAudio = async (req, res) => {
  try {
    const { title, artist, description, tags, fileLink, coverImage } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const newAudio = new Audio({
      title,
      artist,
      description,
      tags,
      fileLink,
      coverImage:
        coverImage ||
        "https://i.pinimg.com/736x/1b/d1/6d/1bd16d916408f56e0003ce2b1bccbb08.jpg", // Default image if none is uploaded
      user: req.user.id,
    });

    const savedAudio = await newAudio.save();
    res.status(201).json(savedAudio);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error saving audio", message: error.message });
  }
};

const getAllAudioFiles = async (req, res) => {
  try {
    const audioFiles = await Audio.find().populate("user", "username email");
    res.status(200).json(audioFiles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching audio files", message: error.message });
  }
};

export { createAudio, getAllAudioFiles };
