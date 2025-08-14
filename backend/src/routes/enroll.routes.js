import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { enrollInCourse } from "../controller/enroll.controller.js";
import { updateActivityStreak } from "../middlewares/loginStreak.js";

const router = express.Router();

router.post("/", protect, updateActivityStreak, enrollInCourse); // Handles POST /api/v1/enroll

export default router;
