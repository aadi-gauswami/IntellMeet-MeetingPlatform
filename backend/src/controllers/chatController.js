import asyncHandler from "../utils/asyncHandler.js";

import {
  sendMessageService,
  getMeetingMessagesService,
  editMessageService,
  deleteMessageService,
  addReactionService,
  removeReactionService,
  markAsReadService,
  pinMessageService,
  unpinMessageService,
  searchMessagesService,
  getPinnedMessagesService,
} from "../services/chatService.js";

/** @route POST /api/v1/chat */
export const sendMessage = asyncHandler(async (req, res) => {
  const { meetingId, ...messageData } = req.body;

  const message = await sendMessageService(
    meetingId,
    req.user.id,
    messageData
  );

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: message,
  });
});

/** @route GET /api/v1/chat/:meetingId */
export const getMeetingMessages = asyncHandler(async (req, res) => {
  const messages = await getMeetingMessagesService(
    req.params.meetingId
  );

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages,
  });
});

/** @route PUT /api/v1/chat/:messageId */
export const editMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;

  const updatedMessage = await editMessageService(
    req.params.messageId,
    req.user.id,
    message
  );

  res.status(200).json({
    success: true,
    message: "Message updated successfully",
    data: updatedMessage,
  });
});

/** @route DELETE /api/v1/chat/:messageId */
export const deleteMessage = asyncHandler(async (req, res) => {
  const deletedMessage = await deleteMessageService(
    req.params.messageId,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
    data: deletedMessage,
  });
});

/** @route PATCH /api/v1/chat/:messageId/reaction */
export const addReaction = asyncHandler(async (req, res) => {
  const { emoji } = req.body;

  const message = await addReactionService(
    req.params.messageId,
    req.user.id,
    emoji
  );

  res.status(200).json({
    success: true,
    message: "Reaction added successfully",
    data: message,
  });
});

/** @route DELETE /api/v1/chat/:messageId/reaction */
export const removeReaction = asyncHandler(async (req, res) => {
  const { emoji } = req.body;

  const message = await removeReactionService(
    req.params.messageId,
    req.user.id,
    emoji
  );

  res.status(200).json({
    success: true,
    message: "Reaction removed successfully",
    data: message,
  });
});

/** @route PATCH /api/v1/chat/:messageId/read */
export const markAsRead = asyncHandler(async (req, res) => {
  const message = await markAsReadService(
    req.params.messageId,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Message marked as read",
    data: message,
  });
});

/** @route PATCH /api/v1/chat/:messageId/pin */
export const pinMessage = asyncHandler(async (req, res) => {
  const message = await pinMessageService(
    req.params.messageId,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Message pinned successfully",
    data: message,
  });
});

/** @route PATCH /api/v1/chat/:messageId/unpin */
export const unpinMessage = asyncHandler(async (req, res) => {
  const message = await unpinMessageService(
    req.params.messageId
  );

  res.status(200).json({
    success: true,
    message: "Message unpinned successfully",
    data: message,
  });
});

/** @route GET /api/v1/chat/search/:meetingId */
export const searchMessages = asyncHandler(async (req, res) => {
  const { keyword } = req.query;

  const messages = await searchMessagesService(
    req.params.meetingId,
    keyword
  );

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages,
  });
});

/** @route GET /api/v1/chat/pinned/:meetingId */
export const getPinnedMessages = asyncHandler(async (req, res) => {
  const messages = await getPinnedMessagesService(
    req.params.meetingId
  );

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages,
  });
});