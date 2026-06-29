import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectDB from "./src/config/db.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

import healthRoutes from "./src/routes/healthRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import meetingRoutes from "./src/routes/meetingRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to IntellMeet API"
    });
});

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/meetings", meetingRoutes);
app.use("/api/v1/chat", chatRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});