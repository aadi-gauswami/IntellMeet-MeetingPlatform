import Chat from "../models/Chat.js";

export const createMessage = async (messageData) => {
  return await Chat.create(messageData);
};

export const findMessageById = async (messageId) => {
  return await Chat.findById(messageId)
    .populate("sender", "name email avatar")
    .populate("replyTo")
    .populate("readBy.user", "name avatar")
    .populate("reactions.user", "name avatar");
};

export const getMeetingMessages = async (meetingId) => {
  return await Chat.find({
    meeting: meetingId,
    isDeleted: false,
  })
    .populate("sender", "name email avatar")
    .populate({
      path: "replyTo",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    })
    .sort({ createdAt: 1 });
};

export const updateMessage = async (
  messageId,
  updateData
) => {
  return await Chat.findByIdAndUpdate(
    messageId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).populate("sender", "name email avatar");
};

export const deleteMessage = async (messageId) => {
  return await Chat.findByIdAndUpdate(
    messageId,
    {
      isDeleted: true,
      deletedAt: new Date(),
      message: "This message was deleted.",
    },
    {
      new: true,
    }
  );
};

export const addReaction = async (
  messageId,
  reaction
) => {
  return await Chat.findByIdAndUpdate(
    messageId,
    {
      $push: {
        reactions: reaction,
      },
    },
    {
      new: true,
    }
  );
};

export const removeReaction = async (
  messageId,
  userId,
  emoji
) => {
  return await Chat.findByIdAndUpdate(
    messageId,
    {
      $pull: {
        reactions: {
          user: userId,
          emoji,
        },
      },
    },
    {
      new: true,
    }
  );
};

export const markMessageAsRead = async (
  messageId,
  readReceipt
) => {
  return await Chat.findByIdAndUpdate(
    messageId,
    {
      $push: {
        readBy: readReceipt,
      },
    },
    {
      new: true,
    }
  );
};

export const pinMessage = async (
  messageId,
  userId
) => {
  return await Chat.findByIdAndUpdate(
    messageId,
    {
      isPinned: true,
      pinnedBy: userId,
    },
    {
      new: true,
    }
  );
};

export const unpinMessage = async (
  messageId
) => {
  return await Chat.findByIdAndUpdate(
    messageId,
    {
      isPinned: false,
      pinnedBy: null,
    },
    {
      new: true,
    }
  );
};

export const searchMessages = async (
  meetingId,
  keyword
) => {
  return await Chat.find({
    meeting: meetingId,
    isDeleted: false,
    message: {
      $regex: keyword,
      $options: "i",
    },
  })
    .populate("sender", "name avatar")
    .sort({ createdAt: -1 });
};

export const getPinnedMessages = async (
  meetingId
) => {
  return await Chat.find({
    meeting: meetingId,
    isPinned: true,
    isDeleted: false,
  })
    .populate("sender", "name avatar")
    .sort({ createdAt: -1 });
};

export const saveMessage = async (message) => {
  return await message.save();
};