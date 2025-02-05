import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  { timestamps: true }
);

const Reply = mongoose.model("Reply", replySchema);

export default Reply;
