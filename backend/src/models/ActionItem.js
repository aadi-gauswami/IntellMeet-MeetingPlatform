import mongoose from "mongoose";

const actionItemSchema = new mongoose.Schema({

    meeting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meeting",
        required: true,
        index: true
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
        index: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    task: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    priority: {
        type: String,
        enum: [
            "Low",
            "Medium",
            "High",
            "Critical"
        ],
        default: "Medium"
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "In Progress",
            "Completed",
            "Cancelled"
        ],
        default: "Pending",
        index: true
    },

    dueDate: {
        type: Date,
        default: null
    },

    completedAt: {
        type: Date,
        default: null
    },

    aiGenerated: {
        type: Boolean,
        default: true
    },

    aiConfidence: {
        type: Number,
        default: 1,
        min: 0,
        max: 1
    },

    notes: {
        type: String,
        default: ""
    },

    reminderSent: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

actionItemSchema.index({
    meeting: 1,
    assignedTo: 1
});

actionItemSchema.index({
    dueDate: 1
});

const ActionItem = mongoose.model(
    "ActionItem",
    actionItemSchema
);

export default ActionItem;