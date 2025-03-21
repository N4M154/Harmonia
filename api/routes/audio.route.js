import express from "express";
import {
  createAudio,
  getAllAudioFiles,
} from "../controllers/audio.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/createaudio", verifyToken, createAudio);
router.get("/getallaudio", verifyToken, getAllAudioFiles);
export default router;
