import express from "express";
import {
  syncCourse,
  getAllCourses,
  getCourseById,
  syncCoursesManual
} from "../controller/course.controller.js";
import { enrollInCourse } from "../controller/enroll.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/v1/courses/sync
router.post("/sync", asyncHandler(syncCourse));

// POST /api/v1/courses/sync-manual - manually sync courses
router.post("/sync-manual", asyncHandler(syncCoursesManual));

// GET /api/v1/courses - all courses
router.get("/", asyncHandler(getAllCourses));

// POST /api/v1/courses/enroll - enroll in a course
router.post("/enroll", protect, asyncHandler(enrollInCourse));

// GET /api/v1/courses/:id - single course detail
router.get("/:id", asyncHandler(getCourseById));

export default router;
