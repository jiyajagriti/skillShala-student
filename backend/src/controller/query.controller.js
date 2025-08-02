import { Query } from "../model/query.model.js";
import { User } from "../model/user.model.js";

export const submitQuery = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }

  try {
    const query = await Query.create({
      user: req.user._id,
      question,
    });

    // Update activity streak on query submission (meaningful action)
    const user = await User.findById(req.user._id);
    if (user) {
      const today = new Date().toDateString();
      if (!user.lastLoginDates) {
        user.lastLoginDates = [];
      }
      if (!user.lastLoginDates.includes(today)) {
        user.lastLoginDates.push(today);
        if (user.lastLoginDates.length > 30) {
          user.lastLoginDates = user.lastLoginDates.slice(-30);
        }
        console.log(`📅 Updated activity streak for user ${user.name} after query submission`);
      }
      await user.save();
    }

    res.status(201).json({ message: "Query submitted successfully", query });
  } catch (error) {
    console.error("Query submission error:", error.message);
    res.status(500).json({ message: "Failed to submit query" });
  }
};

export const getMyQueries = async (req, res) => {
  const queries = await Query.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(queries);
};
