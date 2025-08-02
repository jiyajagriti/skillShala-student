// src/controller/certificate.controller.js
import { Certificate } from "../model/certificate.model.js";
import { User } from "../model/user.model.js";
import { Course } from "../model/course.model.js";
import { v4 as uuidv4 } from "uuid";

export const generateCertificate = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user._id;
  
    try {
      if (!courseId) return res.status(400).json({ message: "Course ID is required" });
  
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);
  
      if (!user || !course) {
        return res.status(404).json({ message: "User or course not found" });
      }
  
      const exists = await Certificate.findOne({ userId, courseId });
      if (exists) {
        return res.status(200).json({ message: "Certificate already issued", certificate: exists });
      }
  
      const newCertificate = await Certificate.create({
        userId,
        courseId, // ✅ Store actual ID for later access
        courseTitle: course.title,
        userName: user.name,
        certificateId: uuidv4(),
      });
  
      res.status(201).json({ message: "Certificate generated", certificate: newCertificate });
    } catch (error) {
      console.error("Certificate generation error:", error.message);
      res.status(500).json({ message: "Failed to generate certificate", error: error.message });
    }
  };
  

  export const getUserCertificates = async (req, res) => {
    try {
      const certificates = await Certificate.find({ userId: req.user._id }).select("courseId courseTitle");
      res.status(200).json(certificates);
    } catch (err) {
      console.error("Certificate fetch error:", err.message);
      res.status(500).json({ message: "Error fetching certificates" });
    }
  };