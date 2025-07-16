import { Query } from "../model/query.model.js";

export const submitQuery = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }

  const query = await Query.create({
    user: req.user._id,
    question,
  });

  res.status(201).json({ message: "Query submitted successfully", query });
};

export const getMyQueries = async (req, res) => {
  const queries = await Query.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(queries);
};
