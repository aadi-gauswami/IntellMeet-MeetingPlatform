import openai from "./openai.js";
import PROMPTS from "./prompts.js";


export const extractKeywords = async (transcript) => {

    try {

        if (!transcript || transcript.trim() === "") {
            throw new Error("Meeting transcript is required.");
        }

        const response = await openai.responses.create({

            model: process.env.OPENAI_MODEL,

            input: PROMPTS.KEYWORDS(transcript),

            temperature: 0.2,

            max_output_tokens: 300

        });

        const output = response.output_text.trim();

        try {

            return JSON.parse(output);

        } catch {

            throw new Error("Invalid JSON returned from OpenAI.");

        }

    } catch (error) {

        console.error("Keyword Extractor Error:", error);

        throw new Error("Failed to extract meeting keywords.");

    }

};

export default extractKeywords;