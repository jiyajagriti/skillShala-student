// src/controller/user.controller.js
import { User } from "../model/user.model.js";
import { Certificate } from "../model/certificate.model.js";

// Helper function to calculate consecutive streak
const calculateStreak = (loginDates) => {
  if (!loginDates || loginDates.length === 0) return 0;
  
  const today = new Date().toDateString();
  const sortedDates = [...loginDates].sort();
  
  // Check if today is included
  const hasToday = sortedDates.includes(today);
  
  // Calculate consecutive days from the most recent date
  let streak = 0;
  let currentDate = new Date();
  
  for (let i = sortedDates.length - 1; i >= 0; i--) {
    const loginDate = new Date(sortedDates[i]);
    const diffTime = currentDate - loginDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
      streak++;
      currentDate = loginDate;
    } else {
      break;
    }
  }
  
  return streak;
};

// src/controller/user.controller.js
export const getUserRewards = async (req, res) => {
  const user = await User.findById(req.user._id);

  // Fetch certificates from Certificate model
  const certificates = await Certificate.find({ userId: req.user._id }).select("courseId courseTitle");
  console.log("📜 Fetched certificates for user:", req.user._id, "Count:", certificates.length);

  const allBadges = ["HTML Pro", "CSS Master", "JavaScript Guru", "React Star"];
  const unlocked = user.badges || [];
  const locked = allBadges.filter(b => !unlocked.includes(b));

  // Calculate proper streak
  const streak = calculateStreak(user.lastLoginDates);

  // Format XP history for chart (last 7 days)
  const formattedXpHistory = (user.xpHistory || []).map(entry => ({
    day: entry.date,
    xp: entry.xp
  })).slice(-7); // Get last 7 entries

  res.json({
    totalXP: user.totalXP || 0,
    badges: { unlocked, locked },
    certificates: certificates, // Return actual certificates
    streak,
    xpHistory: formattedXpHistory, // ⬅️ Formatted XP tracking here
  });
};
