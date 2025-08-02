import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userName: String,
  courseTitle: String,
  certificateId: String,
}, {
  timestamps: true,
});

export const Certificate = mongoose.model("Certificate", certificateSchema);
