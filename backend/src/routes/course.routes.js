import express from "express";
import { Course } from "../model/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { enrollInCourse } from "../controller/enroll.controller.js";

const router = express.Router();

// GET only approved courses (for students)
router.get("/", asyncHandler(async (req, res) => {
  const courses = await Course.find({ status: "approved" });
  res.json(courses);
}));

// POST a course — usually not needed in student backend
// Keep it only if students are allowed to suggest a course

// Enroll in a course
router.post("/enroll", asyncHandler(enrollInCourse));

export default router;
