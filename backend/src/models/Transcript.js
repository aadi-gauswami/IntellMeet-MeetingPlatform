import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema({

    meeting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meeting",
        required: true,
        index: true
    },

    speaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    speakerName: {
        type: String,
        trim: true
    },

    transcript: {
        type: String,
        required: true,
        trim: true
    },

    cleanedTranscript: {
        type: String,
        default: ""
    },

    language: {
        type: String,
        default: "en"
    },

    source: {
        type: String,
        enum: [
            "manual",
            "speech-to-text",
            "ai"
        ],
        default: "speech-to-text"
    },

    chunkIndex: {
        type: Number,
        default: 0
    },

    totalChunks: {
        type: Number,
        default: 1
    },

    aiProcessed: {
        type: Boolean,
        default: false
    },

    processingStatus: {
        type: String,
        enum: [
            "pending",
            "processing",
            "completed",
            "failed"
        ],
        default: "pending"
    },

    metadata: {

        duration: {
            type: Number,
            default: 0
        },

        confidence: {
            type: Number,
            default: 1
        },

        startTime: {
            type: Number,
            default: 0
        },

        endTime: {
            type: Number,
            default: 0
        }

    }

}, {
    timestamps: true
});

transcriptSchema.index({
    meeting: 1,
    createdAt: 1
});

transcriptSchema.index({
    speaker: 1
});

const Transcript = mongoose.model(
    "Transcript",
    transcriptSchema
);

export default Transcript;