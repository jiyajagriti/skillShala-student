import { Course } from "../model/course.model.js";

// POST /api/v1/courses/sync
export const syncCourse = async (req, res) => {
  try {
    const incomingCourse = req.body;

    const existing = await Course.findById(incomingCourse._id);

    if (existing) {
      await Course.findByIdAndUpdate(incomingCourse._id, incomingCourse, { new: true });
      return res.status(200).json({ message: "Course updated with videos" });
    }

    const newCourse = new Course(incomingCourse);
    await newCourse.save();

    res.status(201).json({ message: "Course synced with videos" });
  } catch (err) {
    console.error("❌ Course sync error:", err.message);
    res.status(500).json({ message: "Failed to sync course" });
  }
};

// GET /api/v1/courses - fetch all synced courses
export const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

// GET /api/v1/courses/:id - fetch one course
export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.status(200).json(course);
};
