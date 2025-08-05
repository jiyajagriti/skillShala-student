import cron from "node-cron";
import axios from "axios";

export const startCourseSyncJob = () => {
  // Runs every Sunday at 12:00 AM
  cron.schedule("0 0 * * 0", async () => {
    try {
      console.log("🔄 Syncing courses from Admin...");

      const res = await axios.get("https://skillshala-admin-seller-backend.onrender.com/api/v1/courses");
      const courses = res.data;

      for (const course of courses) {
        await axios.post(`${process.env.BACKEND_URL}/api/v1/courses/sync`, course);
      }

      console.log(`✅ Synced ${courses.length} courses to student DB`);
    } catch (err) {
      console.error("❌ Course sync failed:", err.message);
    }
  });
};
