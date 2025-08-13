import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  getcomments,
  likeComment,
  getcommentsbyUser,
  getPostCommentsbyUser,
  createReply,
  getReplies,
  editReply,
  deleteReply,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.get("/getPostCommentsbyUser/:postId", getPostCommentsbyUser);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
router.get("/getcomments", verifyToken, getcomments);
router.get("/getcommentsbyUser", verifyToken, getcommentsbyUser);
router.post("/createReply", verifyToken, createReply);
router.get("/getReplies/:commentId", getReplies);
router.put("/editReply/:replyId", verifyToken, editReply);
router.delete("/deleteReply/:replyId", verifyToken, deleteReply);

export default router;
