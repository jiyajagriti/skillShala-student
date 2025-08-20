import { User } from "../model/user.model.js";
import { Course } from "../model/course.model.js";
import axios from "axios";

//  Enroll in a course
export const enrollInCourse = async (req, res) => {
  try {
    console.log("🔥 Enroll API hit");

    // Extract user ID from protect middleware and course ID from body
    const userId = req.user?._id;
    const { courseId } = req.body;

    console.log("🧠 User from token:", userId);
    console.log("📦 Course ID from body:", courseId);

    // Validate both IDs
    if (!userId || !courseId) {
      return res.status(400).json({ message: "User ID and Course ID required" });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      console.log("❌ Course not found");
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicate enrollments
    if (user.enrolledCourses.includes(courseId)) {
      console.log("⚠️ Already enrolled");
      return res.status(400).json({ message: "Already enrolled" });
    }

    // Add course to user's enrolledCourses array
    user.enrolledCourses.push(courseId);
    
    // Update activity streak on course enrollment (meaningful action)
    await user.save(); // Only save after enrollment
    console.log("✅ Course added to user");

    // Sync to Admin Panel
    try {
      await axios.patch(`https://skillshala-admin-seller-backend.onrender.com/api/users/${user.email}/update-course`, {
        course: course.title,
      });
      console.log("✅ Synced to admin backend");
    } catch (err) {
      console.error("❌ Sync to admin failed:", err.message);
    }

    // Respond success
    res.status(200).json({
      message: "Enrolled successfully",
      enrolledCourses: user.enrolledCourses,
    });

  } catch (error) {
    console.error("❌ Enroll error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

