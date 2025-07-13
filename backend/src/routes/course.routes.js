import express from "express";
import { enrollInCourse, getAllCourses } from "../controller/enroll.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllCourses);

// Protected
router.post("/enroll", protect, enrollInCourse);

export default router;
