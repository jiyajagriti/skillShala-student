import express from "express";
import {
  signup,
  login,
  getMe,
  updateProfilePic,
} from "../controller/auth.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { getUserRewards } from "../controller/user.controller.js";
import { completeVideo } from "../controller/xp.controller.js";
import { readLoginStreak, updateActivityStreak } from "../middlewares/loginStreak.js";
import { upload } from "../middlewares/upload.middleware.js"; // ✅ Multer middleware

const router = express.Router();

router.post("/signup", signup);
router.post("/login", updateActivityStreak, login);

// ✅ Use read-only login streak middleware when fetching profile
router.get("/me", protect, readLoginStreak, getMe);

// ✅ Video completion route for XP
router.post("/xp/complete-video", protect, updateActivityStreak, completeVideo);

// ✅ XP rewards
router.get("/rewards", protect, getUserRewards);

// ✅ Profile picture upload
router.put("/update-profile-pic", protect, upload.single("image"), updateProfilePic);

export default router;
