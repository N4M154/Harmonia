import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletepost,
  getposts,
  updatepost,
  savePost,
  unsavePost,
  checkSavedPost,
  getSavedPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);
router.post("/save", verifyToken, savePost);
router.delete("/unsave/:postId", verifyToken, unsavePost);
router.get("/savedPost/:postId", verifyToken, checkSavedPost);
router.get("/savedposts", verifyToken, getSavedPosts);

export default router;
