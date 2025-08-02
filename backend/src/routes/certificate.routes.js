// src/routes/certificate.routes.js
import express from "express";
import {
  generateCertificate,
  getUserCertificates
} from "../controller/certificate.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, generateCertificate);
router.get("/my", protect, getUserCertificates);

export default router;
