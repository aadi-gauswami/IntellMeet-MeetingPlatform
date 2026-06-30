import Transcript from "../models/Transcript.js";
import MeetingSummary from "../models/MeetingSummary.js";
import ActionItem from "../models/ActionItem.js";
import AIInsight from "../models/AIInsight.js";

import {
    transcriptService,
    generateMeetingSummary,
    generateActionItems,
    generateMeetingInsights,
    generateMeetingTitle,
    generateFollowupEmail,
    extractKeywords,
    askMeetingAssistant
} from "../ai/index.js";

class AIService {

    async getMeetingTranscript(meetingId) {

        const transcripts = await Transcript.find({
            meeting: meetingId
        }).sort({ createdAt: 1 });

        if (!transcripts.length) {
            throw new Error("Transcript not found.");
        }

        return transcripts
            .map(item => item.cleanedTranscript || item.transcript)
            .join("\n");
    }

    async cleanTranscript(meetingId) {

        const transcript =
            await this.getMeetingTranscript(meetingId);

        const cleaned =
            await transcriptService.cleanTranscript(transcript);

        await Transcript.updateMany(
            { meeting: meetingId },
            {
                cleanedTranscript: cleaned,
                aiProcessed: true,
                processingStatus: "completed"
            }
        );

        return cleaned;
    }

    async generateSummary(meetingId, userId = null) {

        const transcript =
            await this.getMeetingTranscript(meetingId);

        const title =
            await generateMeetingTitle(transcript);

        const summary =
            await generateMeetingSummary(transcript);

        const summaryDoc =
            await MeetingSummary.findOneAndUpdate(
                { meeting: meetingId },
                {
                    meeting: meetingId,
                    generatedBy: userId,
                    title,
                    executiveSummary: summary,
                    processingStatus: "completed"
                },
                {
                    new: true,
                    upsert: true
                }
            );

        return summaryDoc;
    }

    async generateActionItems(meetingId) {

        const transcript =
            await this.getMeetingTranscript(meetingId);

        const tasks =
            await generateActionItems(transcript);

        await ActionItem.deleteMany({
            meeting: meetingId
        });

        const savedTasks = [];

        for (const item of tasks) {

            const task =
                await ActionItem.create({

                    meeting: meetingId,

                    task: item.task,

                    priority: item.priority || "Medium",

                    dueDate: item.dueDate || null,

                    aiGenerated: true

                });

            savedTasks.push(task);

        }

        return savedTasks;

    }

    async generateInsights(meetingId, userId = null) {

        const transcript =
            await this.getMeetingTranscript(meetingId);

        const insights =
            await generateMeetingInsights(transcript);

        const insight =
            await AIInsight.findOneAndUpdate(
                { meeting: meetingId },
                {
                    meeting: meetingId,
                    generatedBy: userId,
                    recommendations: [insights],
                    processingStatus: "completed"
                },
                {
                    new: true,
                    upsert: true
                }
            );

        return insight;

    }

    async generateTitle(meetingId) {

        const transcript =
            await this.getMeetingTranscript(meetingId);

        return await generateMeetingTitle(transcript);

    }

    async generateKeywords(meetingId) {

        const transcript =
            await this.getMeetingTranscript(meetingId);

        return await extractKeywords(transcript);

    }

    async generateFollowup(meetingId) {

        const transcript =
            await this.getMeetingTranscript(meetingId);

        return await generateFollowupEmail(transcript);

    }

    async chat(meetingId, question) {

        const transcript =
            await this.getMeetingTranscript(meetingId);

        return await askMeetingAssistant(
            transcript,
            question
        );

    }

}

export default new AIService();