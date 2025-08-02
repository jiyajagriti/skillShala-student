// backend/src/model/course.model.js

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  fileName: String,
  url: String,
  order: Number
}, { _id: false }); // Prevents nesting unnecessary _id in array

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: String, required: true },
  level: String,
  thumbnail: String,
  videos: [videoSchema], // ✅ MUST BE INCLUDED
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
