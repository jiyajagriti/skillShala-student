import { User } from "../model/user.model.js";

export const updateLoginStreak = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return next();

    const today = new Date().toDateString();

    if (!user.lastLoginDates) {
      user.lastLoginDates = [today];
    } else if (!user.lastLoginDates.includes(today)) {
      user.lastLoginDates.push(today);
      // Keep only the last 7 dates
      user.lastLoginDates = user.lastLoginDates.slice(-7);
    }

    await user.save();
    next();
  } catch (err) {
    console.error("Login streak update error:", err.message);
    next(); // Don’t block user access
  }
};
