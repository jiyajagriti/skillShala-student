// src/controller/user.controller.js
import { User } from "../model/user.model.js";

export const getUserRewards = async (req, res) => {
  const user = await User.findById(req.user._id);

  const unlocked = user.badges || ["HTML Pro", "CSS Master"];
  const allBadges = ["HTML Pro", "CSS Master", "JavaScript Guru", "React Star"];
  const locked = allBadges.filter((badge) => !unlocked.includes(badge));

  const today = new Date().toDateString();
  const streak = user.lastLoginDates?.includes(today) ? user.lastLoginDates.length : 0;

  res.json({
    totalXP: user.totalXP || 7420, // default XP
    badges: { unlocked, locked },
    streak,
    xpHistory: [
      { day: "Mon", xp: 200 },
      { day: "Tue", xp: 340 },
      { day: "Wed", xp: 290 },
      { day: "Thu", xp: 500 },
      { day: "Fri", xp: 700 },
      { day: "Sat", xp: 920 },
      { day: "Sun", xp: 1240 },
    ],
  });
};
