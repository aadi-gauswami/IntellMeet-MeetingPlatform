import {
  createMessage,
  findMessageById,
  getMeetingMessages,
  updateMessage,
  deleteMessage,
  addReaction,
  removeReaction,
  markMessageAsRead,
  pinMessage,
  unpinMessage,
  searchMessages,
  getPinnedMessages,
} from "../repositories/chatRepository.js";

import { findMeetingById } from "../repositories/meetingRepository.js";


export const sendMessageService = async (
  meetingId,
  senderId,
  messageData
) => {
  const meeting = await findMeetingById(meetingId);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  const isHost =
    meeting.host._id.toString() === senderId.toString();

  const isParticipant = meeting.participants.some(
    (participant) =>
      participant.user &&
      participant.user._id.toString() === senderId.toString()
  );

  if (!isHost && !isParticipant) {
    throw new Error("You are not a participant of this meeting");
  }

  return await createMessage({
    meeting: meetingId,
    sender: senderId,
    ...messageData,
  });
};

export const getMeetingMessagesService = async (
  meetingId
) => {
  const meeting = await findMeetingById(meetingId);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  return await getMeetingMessages(meetingId);
};

export const editMessageService = async (
  messageId,
  userId,
  newMessage
) => {
  const message = await findMessageById(messageId);

  if (!message) {
    throw new Error("Message not found");
  }

  if (message.sender._id.toString() !== userId.toString()) {
    throw new Error("You can edit only your own messages");
  }

  return await updateMessage(messageId, {
    message: newMessage,
    isEdited: true,
    editedAt: new Date(),
  });
};

export const deleteMessageService = async (
  messageId,
  userId
) => {
  const message = await findMessageById(messageId);

  if (!message) {
    throw new Error("Message not found");
  }

  const meeting = await findMeetingById(message.meeting);

  const isHost =
    meeting.host._id.toString() === userId.toString();

  const isOwner =
    message.sender._id.toString() === userId.toString();

  if (!isHost && !isOwner) {
    throw new Error("Unauthorized");
  }

  return await deleteMessage(messageId);
};

export const addReactionService = async (
  messageId,
  userId,
  emoji
) => {
  const message = await findMessageById(messageId);

  if (!message) {
    throw new Error("Message not found");
  }

  const alreadyReacted = message.reactions.some(
    (reaction) =>
      reaction.user._id.toString() === userId.toString() &&
      reaction.emoji === emoji
  );

  if (alreadyReacted) {
    throw new Error("Reaction already exists");
  }

  return await addReaction(messageId, {
    user: userId,
    emoji,
  });
};

export const removeReactionService = async (
  messageId,
  userId,
  emoji
) => {
  const message = await findMessageById(messageId);

  if (!message) {
    throw new Error("Message not found");
  }

  return await removeReaction(
    messageId,
    userId,
    emoji
  );
};

export const markAsReadService = async (
  messageId,
  userId
) => {
  const message = await findMessageById(messageId);

  if (!message) {
    throw new Error("Message not found");
  }

  const alreadyRead = message.readBy.some(
    (read) =>
      read.user._id.toString() === userId.toString()
  );

  if (alreadyRead) {
    return message;
  }

  return await markMessageAsRead(messageId, {
    user: userId,
    readAt: new Date(),
  });
};

export const pinMessageService = async (
  messageId,
  userId
) => {
  return await pinMessage(messageId, userId);
};

export const unpinMessageService = async (
  messageId
) => {
  return await unpinMessage(messageId);
};

export const searchMessagesService = async (
  meetingId,
  keyword
) => {
  return await searchMessages(meetingId, keyword);
};

export const getPinnedMessagesService = async (
  meetingId
) => {
  return await getPinnedMessages(meetingId);
};