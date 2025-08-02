import { User } from "../model/user.model.js";

// Middleware for meaningful activities (video completion, etc.)
export const updateActivityStreak = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return next();

    const today = new Date().toDateString();

    // Initialize lastLoginDates if it doesn't exist
    if (!user.lastLoginDates) {
      user.lastLoginDates = [];
    }

    // Only add today if it's not already included (meaningful activity)
    if (!user.lastLoginDates.includes(today)) {
      user.lastLoginDates.push(today);
      
      // Keep only the last 30 dates to prevent array from growing too large
      if (user.lastLoginDates.length > 30) {
        user.lastLoginDates = user.lastLoginDates.slice(-30);
      }
      
      console.log(`📅 Updated activity streak for user ${user.name}: ${user.lastLoginDates.length} total logins`);
    }

    await user.save();
    next();
  } catch (err) {
    console.error("Activity streak update error:", err.message);
    next(); // Don't block user access
  }
};

// Middleware for just reading streak (no update)
export const readLoginStreak = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return next();

    // Just read the streak, don't update it
    console.log(`📊 Reading streak for user ${user.name}: ${user.lastLoginDates?.length || 0} total logins`);
    next();
  } catch (err) {
    console.error("Read streak error:", err.message);
    next(); // Don't block user access
  }
};
