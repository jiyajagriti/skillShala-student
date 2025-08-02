// src/controller/xp.controller.js
import { User } from "../model/user.model.js";
import { Course } from "../model/course.model.js";
import { Certificate } from "../model/certificate.model.js";
import { v4 as uuidv4 } from "uuid";

export const completeVideo = async (req, res) => {
  const { courseId, videoUrl } = req.body;
  const userId = req.user._id;

  if (!courseId || !videoUrl) {
    return res.status(400).json({ message: "Course ID and video URL are required" });
  }

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or course not found" });
    }

    // 1. Check if video already marked completed
    const alreadyCompleted = user.completedVideos.find(
      (v) => v.courseId === courseId && v.videoId === videoUrl
    );

    if (alreadyCompleted) {
      return res.status(200).json({ message: "Already marked as completed" });
    }

    // 2. Mark video as completed
    user.completedVideos.push({
      courseId,
      videoId: videoUrl,
      date: new Date(),
    });

    // 3. Add XP
    user.totalXP += 10;

    // 4. Track XP history (by day)
    const today = new Date().toDateString();
    const dayEntry = user.xpHistory.find((e) => e.date === today);
    if (dayEntry) {
      dayEntry.xp += 10;
    } else {
      user.xpHistory.push({ date: today, xp: 10 });
    }

    // 5. Update activity streak (meaningful action)
    if (!user.lastLoginDates) {
      user.lastLoginDates = [];
    }
    if (!user.lastLoginDates.includes(today)) {
      user.lastLoginDates.push(today);
      if (user.lastLoginDates.length > 30) {
        user.lastLoginDates = user.lastLoginDates.slice(-30);
      }
      console.log(`📅 Updated activity streak for user ${user.name} after video completion`);
    }

    await user.save();

    // 6. Check if all videos of course are completed
    const completedVideos = user.completedVideos.filter(v => v.courseId === courseId);
    const allVideosWatched = completedVideos.length === course.videos.length;

    // 7. If completed, generate certificate (if not already)
    if (allVideosWatched) {
      const alreadyIssued = await Certificate.findOne({ userId, courseId });
      if (!alreadyIssued) {
        await Certificate.create({
          userId,
          courseId,
          courseTitle: course.title,
          userName: user.name,
          certificateId: uuidv4(),
        });
        console.log("🎓 Certificate generated for:", course.title);
      }
    }

    res.status(200).json({ message: "✅ Video completed and XP awarded" });
  } catch (err) {
    console.error("❌ Error awarding XP:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
