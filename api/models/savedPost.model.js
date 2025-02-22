// savedPost.model.js
import mongoose from "mongoose";

const savedPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    saveDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const SavedPost = mongoose.model("SavedPost", savedPostSchema);

export default SavedPost;
