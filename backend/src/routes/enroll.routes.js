import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { enrollInCourse } from "../controller/enroll.controller.js";

const router = express.Router();

router.post("/", protect, enrollInCourse); // 👈 Handles POST /api/v1/enroll

export default router;
