import openai from "./openai.js";

import { generateMeetingSummary } from "./summaryService.js";

import { generateActionItems } from "./actionItemService.js";

import { generateMeetingInsights } from "./insightsService.js";

import { generateFollowupEmail } from "./followupService.js";

import { generateMeetingTitle } from "./titleGenerator.js";

import { extractKeywords } from "./keywordExtractor.js";

import { askMeetingAssistant } from "./aiChatService.js";

import transcriptService from "./transcriptService.js";

import PROMPTS from "./prompts.js";

export {
    openai,

    PROMPTS,

    transcriptService,

    generateMeetingSummary,

    generateActionItems,

    generateMeetingInsights,

    generateFollowupEmail,

    generateMeetingTitle,

    extractKeywords,

    askMeetingAssistant
};

export default {

    openai,

    PROMPTS,

    transcriptService,

    generateMeetingSummary,

    generateActionItems,

    generateMeetingInsights,

    generateFollowupEmail,

    generateMeetingTitle,

    extractKeywords,

    askMeetingAssistant

};