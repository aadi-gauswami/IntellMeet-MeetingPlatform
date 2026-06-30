import mongoose from "mongoose";

const meetingSummarySchema = new mongoose.Schema({

    meeting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meeting",
        required: true,
        unique: true,
        index: true
    },

    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    title: {
        type: String,
        trim: true,
        default: ""
    },

    executiveSummary: {
        type: String,
        required: true
    },

    discussionPoints: [{
        type: String,
        trim: true
    }],

    keyDecisions: [{
        type: String,
        trim: true
    }],

    risks: [{
        type: String,
        trim: true
    }],

    nextSteps: [{
        type: String,
        trim: true
    }],

    model: {
        type: String,
        default: process.env.OPENAI_MODEL || "gpt-4.1-mini"
    },

    processingStatus: {
        type: String,
        enum: [
            "pending",
            "processing",
            "completed",
            "failed"
        ],
        default: "completed"
    },

    tokenUsage: {

        promptTokens: {
            type: Number,
            default: 0
        },

        completionTokens: {
            type: Number,
            default: 0
        },

        totalTokens: {
            type: Number,
            default: 0
        }

    },

    generationTime: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

meetingSummarySchema.index({
    meeting: 1
});

const MeetingSummary = mongoose.model(
    "MeetingSummary",
    meetingSummarySchema
);

export default MeetingSummary;