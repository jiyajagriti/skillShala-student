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
import { updateLoginStreak } from "../middlewares/loginStreak.js";
import { generateCertificate } from "../controller/certificate.controller.js";
import { upload } from "../middlewares/upload.middleware.js"; // ✅ Multer middleware

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// ✅ Use login streak middleware when fetching profile
router.get("/me", protect, updateLoginStreak, getMe);

// ✅ Video completion route for XP
router.post("/xp/complete-video", protect, completeVideo);

// ✅ XP rewards
router.get("/rewards", protect, getUserRewards);

// ✅ Certificate generation
router.post("/certificate", protect, generateCertificate);

// ✅ Profile picture upload
router.put("/update-profile-pic", protect, upload.single("image"), updateProfilePic);

export default router;
