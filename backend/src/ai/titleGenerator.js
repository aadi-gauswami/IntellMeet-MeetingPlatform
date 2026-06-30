import openai from "./openai.js";
import PROMPTS from "./prompts.js";


export const generateMeetingTitle = async (transcript) => {

    try {

        if (!transcript || transcript.trim() === "") {
            throw new Error("Meeting transcript is required.");
        }

        const response = await openai.responses.create({

            model: process.env.OPENAI_MODEL,

            input: PROMPTS.TITLE(transcript),

            temperature: 0.2,

            max_output_tokens: 50

        });

        return response.output_text.trim();

    } catch (error) {

        console.error("Title Generator Error:", error);

        throw new Error("Failed to generate meeting title.");

    }

};

export default generateMeetingTitle;