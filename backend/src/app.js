import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import courseRoutes from "./routes/course.routes.js";
import queryRoutes from "./routes/query.routes.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes);

app.use("/api/v1/courses", courseRoutes);

app.use("/api", queryRoutes);


export { app }