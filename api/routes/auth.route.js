import express from "express";
import {
  google,
  signin,
  signup,
  twitter,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/twitter", twitter);

export default router;
