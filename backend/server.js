import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectDB from "./src/config/db.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

import { initializeSocket } from "./src/sockets/socketServer.js";

import healthRoutes from "./src/routes/healthRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import meetingRoutes from "./src/routes/meetingRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import aiRoutes from "./src/routes/aiRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to IntellMeet API",
    });
});

// API Routes
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/meetings", meetingRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/ai", aiRoutes);


initializeSocket(server);

app.use(errorMiddleware);


const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});