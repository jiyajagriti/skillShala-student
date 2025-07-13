import { User } from "../model/user.model.js";
import { Course } from "../model/course.model.js";

// Controller to enroll in a course
export const enrollInCourse = async (req, res) => {
  const userId = req.user._id;
  const { courseId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const user = await User.findById(userId);
  if (user.enrolledCourses.includes(courseId))
    return res.status(400).json({ message: "Already enrolled" });

  user.enrolledCourses.push(courseId);
  await user.save();

  res.status(200).json({
    message: "Enrolled successfully",
    enrolledCourses: user.enrolledCourses,
  });
};

// ✅ Controller to get all available courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};
