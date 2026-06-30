import openai from "./openai.js";
import PROMPTS from "./prompts.js";


export const generateFollowupEmail = async (transcript) => {

    try {

        if (!transcript || transcript.trim() === "") {
            throw new Error("Meeting transcript is required.");
        }

        const response = await openai.responses.create({

            model: process.env.OPENAI_MODEL,

            input: PROMPTS.FOLLOWUP(transcript),

            temperature: 0.6,

            max_output_tokens: 1200

        });

        return response.output_text.trim();

    } catch (error) {

        console.error("Follow-up Service Error:", error);

        throw new Error("Failed to generate follow-up email.");

    }

};

export default generateFollowupEmail;