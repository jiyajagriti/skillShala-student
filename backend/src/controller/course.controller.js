import { Course } from "../model/course.model.js";
import axios from "axios";

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
  try {
    console.log('📚 Fetching all courses from database...');
    const courses = await Course.find();
    console.log('✅ Found courses:', courses.length);
    console.log('📋 Course IDs:', courses.map(c => c._id));
    console.log('📋 Course details:', courses.map(c => ({ id: c._id, title: c.title, price: c.price })));
    
    if (courses.length === 0) {
      console.log('⚠️ No courses found in database. This might be because courses haven\'t been synced from admin backend.');
    }
    
    res.json(courses);
  } catch (error) {
    console.error('❌ Error fetching courses:', error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};

// GET /api/v1/courses/:id - fetch one course
export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.status(200).json(course);
};

// POST /api/v1/courses/sync-manual - manually sync courses from admin
export const syncCoursesManual = async (req, res) => {
  try {
    console.log("🔄 Manually syncing courses from Admin...");

    const res = await axios.get("https://skillshala-admin-seller-backend.onrender.com/api/v1/courses");
    const courses = res.data;

    for (const course of courses) {
      await axios.post(`${process.env.BACKEND_URL}/api/v1/courses/sync`, course);
    }

    console.log(`✅ Manually synced ${courses.length} courses to student DB`);
    res.status(200).json({ message: `Synced ${courses.length} courses successfully` });
  } catch (err) {
    console.error("❌ Manual course sync failed:", err.message);
    res.status(500).json({ message: "Failed to sync courses" });
  }
};
