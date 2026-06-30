import openai from "./openai.js";
import PROMPTS from "./prompts.js";

export const generateMeetingInsights = async (transcript) => {

    try {

        if (!transcript || transcript.trim() === "") {
            throw new Error("Meeting transcript is required.");
        }

        const response = await openai.responses.create({

            model: process.env.OPENAI_MODEL,

            input: PROMPTS.INSIGHTS(transcript),

            temperature: 0.4,

            max_output_tokens: 1500

        });

        return response.output_text.trim();

    } catch (error) {

        console.error("Insights Service Error:", error);

        throw new Error("Failed to generate meeting insights.");

    }

};

export default generateMeetingInsights;