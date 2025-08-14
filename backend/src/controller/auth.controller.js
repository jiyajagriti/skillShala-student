import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import { uploadToCloudinary } from "../utils/cloudinary.js"; // ✅ Cloudinary helper

// Token utility
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Signup controller
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    // Sync to Admin Panel backend
    try {
      await axios.post("https://skillshala-admin-seller-backend.onrender.com/api/users", {
        name,
        email,
        course: "",
        xp: 0,
        role: "learner",
      });
      console.log("✅ Synced user to admin backend");
    } catch (syncError) {
      console.error("❌ Sync to admin failed:", syncError.response?.data || syncError.message);
    }

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        enrolledCourses: user.enrolledCourses || [],
        profilePic: user.profilePic || "",
        totalXP: user.totalXP || 0,
      },
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Signup failed" });
  }
};

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  // Remove direct update of lastLoginDates here
  await user.save(); // Remove this line if it was only for streak

  res.json({
    token: generateToken(user._id),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      enrolledCourses: user.enrolledCourses || [],
      profilePic: user.profilePic || "",
      totalXP: user.totalXP || 0,
    },
  });
};

// Get current user
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
};


// Update profile picture controller
export const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    // Check if Cloudinary credentials are configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Cloudinary credentials not configured");
      return res.status(500).json({ message: "Image upload service not configured" });
    }

    const upload = await uploadToCloudinary(req.file.buffer, "profile-pics");
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: upload.secure_url },
      { new: true }
    );

    res.status(200).json({ message: "Profile picture updated", profilePic: user.profilePic });
  } catch (err) {
    console.error("Update profile pic error:", err.message);
    res.status(500).json({ message: "Failed to update profile picture" });
  }
};
