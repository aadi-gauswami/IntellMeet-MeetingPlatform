import aiService from "../services/aiService.js";

export const generateSummary = async (req, res, next) => {

    try {

        const { meetingId } = req.body;

        const summary = await aiService.generateSummary(
            meetingId,
            req.user?._id
        );

        res.status(200).json({
            success: true,
            message: "Meeting summary generated successfully.",
            data: summary
        });

    } catch (error) {
        next(error);
    }

};

export const generateActionItems = async (req, res, next) => {

    try {

        const { meetingId } = req.body;

        const tasks =
            await aiService.generateActionItems(meetingId);

        res.status(200).json({
            success: true,
            message: "Action items generated successfully.",
            data: tasks
        });

    } catch (error) {
        next(error);
    }

};

export const generateInsights = async (req, res, next) => {

    try {

        const { meetingId } = req.body;

        const insights =
            await aiService.generateInsights(
                meetingId,
                req.user?._id
            );

        res.status(200).json({
            success: true,
            message: "Insights generated successfully.",
            data: insights
        });

    } catch (error) {
        next(error);
    }

};

export const generateFollowup = async (req, res, next) => {

    try {

        const { meetingId } = req.body;

        const email =
            await aiService.generateFollowup(meetingId);

        res.status(200).json({
            success: true,
            message: "Follow-up email generated successfully.",
            data: email
        });

    } catch (error) {
        next(error);
    }

};

export const generateTitle = async (req, res, next) => {

    try {

        const { meetingId } = req.body;

        const title =
            await aiService.generateTitle(meetingId);

        res.status(200).json({
            success: true,
            message: "Meeting title generated successfully.",
            data: title
        });

    } catch (error) {
        next(error);
    }

};

export const generateKeywords = async (req, res, next) => {

    try {

        const { meetingId } = req.body;

        const keywords =
            await aiService.generateKeywords(meetingId);

        res.status(200).json({
            success: true,
            message: "Keywords extracted successfully.",
            data: keywords
        });

    } catch (error) {
        next(error);
    }

};

export const chat = async (req, res, next) => {

    try {

        const { meetingId, question } = req.body;

        const answer =
            await aiService.chat(
                meetingId,
                question
            );

        res.status(200).json({
            success: true,
            message: "AI response generated successfully.",
            data: answer
        });

    } catch (error) {
        next(error);
    }

};

export const cleanTranscript = async (req, res, next) => {

    try {

        const { meetingId } = req.body;

        const transcript =
            await aiService.cleanTranscript(meetingId);

        res.status(200).json({
            success: true,
            message: "Transcript cleaned successfully.",
            data: transcript
        });

    } catch (error) {
        next(error);
    }

};