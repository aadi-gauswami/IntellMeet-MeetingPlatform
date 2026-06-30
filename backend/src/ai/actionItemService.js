import openai from "./openai.js";
import PROMPTS from "./prompts.js";

export const generateActionItems = async (transcript) => {

    try {

        if (!transcript || transcript.trim() === "") {
            throw new Error("Meeting transcript is required.");
        }

        const response = await openai.responses.create({

            model: process.env.OPENAI_MODEL,

            input: PROMPTS.ACTION_ITEMS(transcript),

            temperature: 0.2,

            max_output_tokens: 1200

        });

        const output = response.output_text.trim();

        try {

            return JSON.parse(output);

        } catch {

            throw new Error("Invalid JSON returned from OpenAI.");
        }

    } catch (error) {

        console.error("Action Item Service Error:", error);

        throw new Error("Failed to generate action items.");

    }

};

export default generateActionItems;