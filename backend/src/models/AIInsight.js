import mongoose from "mongoose";

const aiInsightSchema = new mongoose.Schema({

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

    decisions: [{
        type: String,
        trim: true
    }],

    risks: [{
        type: String,
        trim: true
    }],

    blockers: [{
        type: String,
        trim: true
    }],

    opportunities: [{
        type: String,
        trim: true
    }],

    recommendations: [{
        type: String,
        trim: true
    }],

    sentiment: {
        overall: {
            type: String,
            enum: [
                "Positive",
                "Neutral",
                "Negative"
            ],
            default: "Neutral"
        },

        score: {
            type: Number,
            min: -1,
            max: 1,
            default: 0
        }
    },

    meetingEffectiveness: {
        score: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        level: {
            type: String,
            enum: [
                "Poor",
                "Average",
                "Good",
                "Excellent"
            ],
            default: "Average"
        }
    },

    participation: {

        totalSpeakers: {
            type: Number,
            default: 0
        },

        totalMessages: {
            type: Number,
            default: 0
        },

        averageMessageLength: {
            type: Number,
            default: 0
        }

    },

    aiConfidence: {
        type: Number,
        default: 1,
        min: 0,
        max: 1
    },

    processingTime: {
        type: Number,
        default: 0
    },

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
    }

}, {
    timestamps: true
});

aiInsightSchema.index({
    meeting: 1
});

const AIInsight = mongoose.model(
    "AIInsight",
    aiInsightSchema
);

export default AIInsight;