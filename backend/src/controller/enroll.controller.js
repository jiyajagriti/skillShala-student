import { User } from "../model/user.model.js";
import { Course } from "../model/course.model.js";
import axios from "axios";

// ✅ Enroll in a course
export const enrollInCourse = async (req, res) => {
  try {
    // Extract user ID from protect middleware and course ID from body
    const userId = req.user?._id;
    const { courseId } = req.body;

    // Validate both IDs
    if (!userId || !courseId) {
      return res.status(400).json({ message: "User ID and Course ID required" });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicate enrollments
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    // Add course to user's enrolledCourses array
    user.enrolledCourses.push(courseId);
    await user.save();

    // 🔄 Sync to Admin Panel
    try {
      await axios.patch(`http://localhost:5000/api/users/${user.email}/update-course`, {
        course: course.title,
      });
      console.log("✅ Synced to admin");
    } catch (err) {
      console.error("❌ Sync to admin failed:", err.message);
    }

    // ✅ Respond success
    res.status(200).json({
      message: "Enrolled successfully",
      enrolledCourses: user.enrolledCourses,
    });

  } catch (error) {
    console.error("❌ Enroll error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Fetch all courses (optional utility)
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};
