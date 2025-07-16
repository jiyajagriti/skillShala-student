// student-backend/routes/query.routes.js

import express from "express";
import axios from "axios";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST query => forward to admin
router.post("/queries", protect, async (req, res) => {
  const { question } = req.body;

  try {
    const user = req.user; // from authMiddleware

    const response = await axios.post("http://localhost:5000/api/queries", {
      studentName: user.name,
      studentEmail: user.email,
      course: user.course || "",
      query: question,
    });

    res.status(201).json(response.data);
  } catch (err) {
    console.error("❌ Failed to sync query to admin:", err.message);
    res.status(500).json({ message: "Query submission failed" });
  }
});

export default router;
