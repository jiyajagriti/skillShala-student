import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import axios from "axios"; // ✅ required to sync with admin backend

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

    // ✅ Sync to Admin Panel backend
    try {
      await axios.post("http://localhost:5000/api/users", {
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

  res.json({
    token: generateToken(user._id),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      enrolledCourses: user.enrolledCourses || [],
    },
  });
};

// Get current user
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
};
