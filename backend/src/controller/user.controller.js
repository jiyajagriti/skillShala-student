// src/controller/user.controller.js
import { User } from "../model/user.model.js";

// src/controller/user.controller.js
export const getUserRewards = async (req, res) => {
  const user = await User.findById(req.user._id);

  const allBadges = ["HTML Pro", "CSS Master", "JavaScript Guru", "React Star"];
  const unlocked = user.badges || [];
  const locked = allBadges.filter(b => !unlocked.includes(b));

  const today = new Date().toDateString();
  const streak = user.lastLoginDates?.includes(today) ? user.lastLoginDates.length : 0;

  res.json({
    totalXP: user.totalXP || 0,
    badges: { unlocked, locked },
    streak,
    xpHistory: user.xpHistory || [], // ⬅️ Real-time XP tracking here
  });
};
