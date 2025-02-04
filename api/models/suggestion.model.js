import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencing the User model
      required: true,
    },
    subject: {
      type: String,
      enum: ["feature", "blog topic"], // Valid options: "feature" or "blog topic"
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, // Automatically set the current date/time
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

export default Suggestion;
