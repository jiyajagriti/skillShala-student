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

    // Remove direct update of lastLoginDates here
    // Only save after query creation, not for streak

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
