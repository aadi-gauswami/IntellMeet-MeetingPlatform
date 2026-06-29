import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    emoji: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const readReceiptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    readAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const attachmentSchema = new mongoose.Schema(
  {
    fileName: String,

    fileUrl: String,

    fileType: {
      type: String,
      enum: [
        "image",
        "pdf",
        "video",
        "audio",
        "document",
        "other",
      ],
    },

    fileSize: Number,
  },
  {
    _id: false,
  }
);

const chatSchema = new mongoose.Schema(
  {

    meeting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
      maxlength: 5000,
    },

    messageType: {
      type: String,
      enum: [
        "text",
        "image",
        "file",
        "audio",
        "video",
        "system",
      ],
      default: "text",
    },

    attachment: attachmentSchema,

    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      default: null,
    },

    reactions: [reactionSchema],

    readBy: [readReceiptSchema],

    isEdited: {
      type: Boolean,
      default: false,
    },

    editedAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    pinnedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


chatSchema.index({
  meeting: 1,
  createdAt: 1,
});

chatSchema.index({
  sender: 1,
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;