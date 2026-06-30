import openai from "./openai.js";
import PROMPTS from "./prompts.js";

export const generateMeetingSummary = async (transcript) => {

    try {

        if (!transcript || transcript.trim() === "") {
            throw new Error("Meeting transcript is required.");
        }

        const response = await openai.responses.create({

            model: process.env.OPENAI_MODEL,

            input: PROMPTS.SUMMARY(transcript),

            temperature: 0.3,

            max_output_tokens: 1200

        });

        return response.output_text.trim();

    } catch (error) {

        console.error("Summary Service Error:", error);

        throw new Error("Failed to generate meeting summary.");

    }

};

export default generateMeetingSummary;