import express from "express";

import {
    generateSummary,
    generateActionItems,
    generateInsights,
    generateFollowup,
    generateTitle,
    generateKeywords,
    chat,
    cleanTranscript
} from "../controllers/aiController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/summary",
    protect,
    generateSummary
);

router.post(
    "/action-items",
    protect,
    generateActionItems
);

router.post(
    "/insights",
    protect,
    generateInsights
);

router.post(
    "/followup",
    protect,
    generateFollowup
);

router.post(
    "/title",
    protect,
    generateTitle
);

router.post(
    "/keywords",
    protect,
    generateKeywords
);

router.post(
    "/chat",
    protect,
    chat
);

router.post(
    "/transcript/clean",
    protect,
    cleanTranscript
);

export default router;