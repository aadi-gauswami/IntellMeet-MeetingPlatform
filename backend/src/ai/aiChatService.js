import openai from "./openai.js";
import PROMPTS from "./prompts.js";


export const askMeetingAssistant = async (transcript, question) => {

    try {

        if (!transcript || transcript.trim() === "") {
            throw new Error("Meeting transcript is required.");
        }

        if (!question || question.trim() === "") {
            throw new Error("Question is required.");
        }

        const response = await openai.responses.create({

            model: process.env.OPENAI_MODEL,

            input: PROMPTS.CHAT(transcript, question),

            temperature: 0.3,

            max_output_tokens: 1000

        });

        return response.output_text.trim();

    } catch (error) {

        console.error("AI Chat Service Error:", error);

        throw new Error("Failed to generate AI response.");

    }

};

export default askMeetingAssistant;