// import mongoose from "mongoose";

// const AudioSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   artist: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   tags: {
//     type: [String],
//     required: true,
//   },
//   uploadDate: {
//     type: Date,
//     default: Date.now,
//   },
//   fileLink: {
//     type: String,
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // Referencing the User model
//     required: true,
//   },
// });

// const Audio = mongoose.model("Audio", AudioSchema);

// export default Audio;

import mongoose from "mongoose";

const AudioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  fileLink: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default:
      "https://i.pinimg.com/736x/1b/d1/6d/1bd16d916408f56e0003ce2b1bccbb08.jpg", // Default image URL
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Audio = mongoose.model("Audio", AudioSchema);

export default Audio;
