import express from "express";
import { verifyToken } from "../utils/verifyUser.js"; // Assuming you have a middleware for token verification
import {
  createSuggestion,
  getAllSuggestions,
  getUserSuggestions,
} from "../controllers/suggestion.controller.js";

const router = express.Router();

// Route to submit a suggestion
router.post("/suggestions", verifyToken, createSuggestion);
router.get("/suggestions", verifyToken, getAllSuggestions);
router.get("/user-suggestions", verifyToken, getUserSuggestions);

export default router;
