// src/routes/auth.routes.js
import express from "express";
import { signup, login, getMe } from "../controller/auth.controller.js";
import { protect } from "../middlewares/authMiddleware.js"; // make sure this exists
import { getUserRewards } from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, async (req, res) => {
    res.json(req.user);
  });
router.get("/rewards", protect, getUserRewards);

export default router;
