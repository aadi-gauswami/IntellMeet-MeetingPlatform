import openai from "./openai.js";
import PROMPTS from "./prompts.js";


export const cleanTranscript = async (transcript) => {

    try {

        if (!transcript || transcript.trim() === "") {
            throw new Error("Meeting transcript is required.");
        }

        const response = await openai.responses.create({

            model: process.env.OPENAI_MODEL,

            input: PROMPTS.CLEAN_TRANSCRIPT(transcript),

            temperature: 0.1,

            max_output_tokens: 2000

        });

        return response.output_text.trim();

    } catch (error) {

        console.error("Transcript Service Error:", error);

        throw new Error("Failed to clean transcript.");

    }

};

export const chunkTranscript = (
    transcript,
    chunkSize = 5000
) => {

    if (!transcript) return [];

    const chunks = [];

    for (
        let i = 0;
        i < transcript.length;
        i += chunkSize
    ) {
        chunks.push(
            transcript.substring(i, i + chunkSize)
        );
    }

    return chunks;
};

export const prepareTranscript = async (transcript) => {

    const cleanedTranscript =
        await cleanTranscript(transcript);

    const chunks =
        chunkTranscript(cleanedTranscript);

    return {

        originalTranscript: transcript,

        cleanedTranscript,

        chunks,

        totalChunks: chunks.length,

        totalCharacters: cleanedTranscript.length

    };

};

export default {
    cleanTranscript,
    chunkTranscript,
    prepareTranscript
};