// src/routes/xp.routes.js
import express from "express";
import { completeVideo } from "../controller/xp.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/complete-video", protect, completeVideo);

export default router;
