import mongoose from "mongoose";
import crypto from "crypto";

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Meeting title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        joinedAt: {
          type: Date,
        },

        leftAt: {
          type: Date,
        },

        role: {
          type: String,
          enum: ["host", "participant"],
          default: "participant",
        },

        attendanceDuration: {
          type: Number,
          default: 0,
        },
      },
    ],

    meetingCode: {
      type: String,
      unique: true,
    },

    meetingPassword: {
      type: String,
      default: "",
    },

    roomId: {
      type: String,
      unique: true,
    },

    meetingType: {
      type: String,
      enum: ["instant", "scheduled", "recurring"],
      default: "instant",
    },

    status: {
      type: String,
      enum: [
        "upcoming",
        "live",
        "completed",
        "cancelled",
      ],
      default: "upcoming",
    },

    scheduledDate: {
      type: Date,
    },

    startTime: {
      type: Date,
    },

    endTime: {
      type: Date,
    },

    duration: {
      type: Number,
      default: 30,
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    recurrence: {
      enabled: {
        type: Boolean,
        default: false,
      },

      frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
      },

      interval: {
        type: Number,
        default: 1,
      },
    },

    waitingRoom: {
      type: Boolean,
      default: true,
    },

    recordingEnabled: {
      type: Boolean,
      default: false,
    },

    screenShareEnabled: {
      type: Boolean,
      default: true,
    },

    microphoneEnabled: {
      type: Boolean,
      default: true,
    },

    cameraEnabled: {
      type: Boolean,
      default: true,
    },

    chatEnabled: {
      type: Boolean,
      default: true,
    },

    aiSummary: {
      type: String,
      default: "",
    },

    transcript: {
      type: String,
      default: "",
    },

    actionItems: [
      {
        task: String,

        assignedTo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        priority: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },

        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],

    totalParticipants: {
      type: Number,
      default: 0,
    },

    totalMessages: {
      type: Number,
      default: 0,
    },

    recordingUrl: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


meetingSchema.pre("save", function (next) {
  if (!this.meetingCode) {
    this.meetingCode = crypto.randomBytes(4).toString("hex").toUpperCase();
  }

  if (!this.roomId) {
    this.roomId = crypto.randomUUID();
  }

  next();
});

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;