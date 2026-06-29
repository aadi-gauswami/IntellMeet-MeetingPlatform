import express from "express";

import {
  sendMessage,
  getMeetingMessages,
  editMessage,
  deleteMessage,
  addReaction,
  removeReaction,
  markAsRead,
  pinMessage,
  unpinMessage,
  searchMessages,
  getPinnedMessages,
} from "../controllers/chatController.js";

import { protect } from "../middleware/authMiddleware.js";

import {
  sendMessageValidation,
  editMessageValidation,
  deleteMessageValidation,
  reactionValidation,
  readValidation,
  pinValidation,
  meetingMessagesValidation,
  searchValidation,
} from "../validators/chatValidator.js";

const router = express.Router();


router.post(
  "/",
  protect,
  sendMessageValidation,
  sendMessage
);

router.get(
  "/:meetingId",
  protect,
  meetingMessagesValidation,
  getMeetingMessages
);

router.put(
  "/:messageId",
  protect,
  editMessageValidation,
  editMessage
);

router.delete(
  "/:messageId",
  protect,
  deleteMessageValidation,
  deleteMessage
);

router.patch(
  "/:messageId/reaction",
  protect,
  reactionValidation,
  addReaction
);

router.delete(
  "/:messageId/reaction",
  protect,
  reactionValidation,
  removeReaction
);

router.patch(
  "/:messageId/read",
  protect,
  readValidation,
  markAsRead
);

router.patch(
  "/:messageId/pin",
  protect,
  pinValidation,
  pinMessage
);

router.patch(
  "/:messageId/unpin",
  protect,
  pinValidation,
  unpinMessage
);

router.get(
  "/search/:meetingId",
  protect,
  searchValidation,
  searchMessages
);

router.get(
  "/pinned/:meetingId",
  protect,
  meetingMessagesValidation,
  getPinnedMessages
);

export default router;