import express from "express";
import { Course } from "../model/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { enrollInCourse } from "../controller/enroll.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET only approved courses (for students)
router.get("/", asyncHandler(async (req, res) => {
  const courses = await Course.find({ status: "approved" });
  res.json(courses);
}));

// POST a course — usually not needed in student backend
// Keep it only if students are allowed to suggest a course

// Enroll in a course

router.post("/enroll", protect, asyncHandler(enrollInCourse));

router.post("/sync", asyncHandler(async (req, res) => {
  const incomingCourse = req.body;

  // Upsert logic: update if exists, else insert
  const existing = await Course.findById(incomingCourse._id);

  if (existing) {
    await Course.findByIdAndUpdate(incomingCourse._id, incomingCourse);
    return res.status(200).json({ message: "Course updated" });
  }

  const course = new Course(incomingCourse);
  await course.save();
  res.status(201).json({ message: "Course synced to student DB" });
}));

export default router;
