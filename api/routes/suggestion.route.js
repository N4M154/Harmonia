import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createSuggestion,
  getAllSuggestions,
  getUserSuggestions,
  deleteSuggestion,
} from "../controllers/suggestion.controller.js";

const router = express.Router();

router.post("/suggestions", verifyToken, createSuggestion);
router.get("/suggestions", verifyToken, getAllSuggestions);
router.get("/user-suggestions", verifyToken, getUserSuggestions);
router.delete(
  "/deletesuggestions/:suggestionId",
  verifyToken,
  deleteSuggestion
);

export default router;
