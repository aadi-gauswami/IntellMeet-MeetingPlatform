import aiService from "../services/aiService.js";
import EVENTS from "./socketEvents.js";

const registerAISocket = (io, socket) => {

    socket.on(EVENTS.MEETING.JOIN, (meetingId) => {

        socket.join(meetingId);

        socket.emit("joined-meeting", {
            success: true,
            meetingId
        });

    });

    socket.on(EVENTS.MEETING.LEAVE, (meetingId) => {

        socket.leave(meetingId);

    });

    socket.on(EVENTS.AI.CHAT, async ({ meetingId, question }) => {

        try {

            const answer = await aiService.chat(
                meetingId,
                question
            );

            socket.emit(EVENTS.AI.CHAT_RESPONSE, {
                success: true,
                answer
            });

        } catch (error) {

            socket.emit(EVENTS.AI.ERROR, {
                success: false,
                message: error.message
            });

        }

    });

    socket.on(EVENTS.AI.GENERATE_SUMMARY, async (meetingId) => {

        try {

            io.to(meetingId).emit(
                EVENTS.AI.SUMMARY_PROCESSING
            );

            const summary =
                await aiService.generateSummary(
                    meetingId,
                    socket.user._id
                );

            io.to(meetingId).emit(
                EVENTS.AI.SUMMARY_GENERATED,
                summary
            );

        } catch (error) {

            socket.emit(EVENTS.AI.ERROR, {
                success: false,
                message: error.message
            });

        }

    });

    socket.on(EVENTS.AI.GENERATE_ACTION_ITEMS, async (meetingId) => {

        try {

            const actions =
                await aiService.generateActionItems(
                    meetingId
                );

            io.to(meetingId).emit(
                EVENTS.AI.ACTION_ITEMS_GENERATED,
                actions
            );

        } catch (error) {

            socket.emit(EVENTS.AI.ERROR, {
                success: false,
                message: error.message
            });

        }

    });

    socket.on(EVENTS.AI.GENERATE_INSIGHTS, async (meetingId) => {

        try {

            const insights =
                await aiService.generateInsights(
                    meetingId,
                    socket.user._id
                );

            io.to(meetingId).emit(
                EVENTS.AI.INSIGHTS_GENERATED,
                insights
            );

        } catch (error) {

            socket.emit(EVENTS.AI.ERROR, {
                success: false,
                message: error.message
            });

        }

    });

    socket.on(EVENTS.AI.TRANSCRIPT_UPDATE, (payload) => {

        io.to(payload.meetingId).emit(
            EVENTS.AI.TRANSCRIPT_UPDATED,
            payload
        );

    });

};

export default registerAISocket;