import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import courseRoutes from "./routes/course.routes.js";
import queryRoutes from "./routes/query.routes.js";
import enrollRoutes from "./routes/enroll.routes.js";
import { startCourseSyncJob } from "./utils/courseSyncJob.js";
import xpRoutes from "./routes/xp.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ ADD THIS
  }));
  
app.use(express.json({limit: "200mb"}))
app.use(express.urlencoded({extended: true, limit: "200mb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes);

app.use("/api/v1/courses", courseRoutes);

app.use("/api", queryRoutes);

app.use("/api/v1/enroll", enrollRoutes);

app.use("/api/v1/xp", xpRoutes);

app.use("/api/v1/certificates", certificateRoutes);

startCourseSyncJob();

export { app }