export const PROMPTS = {

    SUMMARY: (transcript) => `
You are an AI meeting assistant.

Generate a professional meeting summary from the transcript below.

Requirements:

- Executive Summary
- Main Discussion Points
- Important Decisions
- Risks
- Next Steps

Meeting Transcript:

${transcript}

Return the result in clean Markdown.
`,


    ACTION_ITEMS: (transcript) => `
Analyze the meeting transcript.

Extract every action item.

For each action item include:

- Task
- Assigned To
- Priority (High / Medium / Low)
- Due Date (if mentioned)

Transcript:

${transcript}

Return JSON only.
`,


    INSIGHTS: (transcript) => `
Analyze the meeting transcript.

Generate:

- Important Decisions
- Risks
- Blockers
- Opportunities
- Suggestions

Transcript:

${transcript}

Return Markdown.
`,


    FOLLOWUP: (transcript) => `
Write a professional follow-up email based on the meeting.

Include:

- Thank you
- Summary
- Decisions
- Action Items
- Next Meeting

Meeting Transcript:

${transcript}
`,


    TITLE: (transcript) => `
Generate one short professional meeting title.

Meeting Transcript:

${transcript}

Return only the title.
`,


   KEYWORDS: (transcript) => `
Extract the most important keywords from the meeting transcript.

Rules:

- Return ONLY a valid JSON array.
- Include technologies, tools, products, people, organizations, business terms, and recurring discussion topics.
- Remove duplicate keywords.
- Keep keywords concise (1–3 words).
- Maximum 20 keywords.

Meeting Transcript:

${transcript}
`,


    CHAT: (transcript, question) => `
You are IntellMeet AI Assistant.

Use ONLY the transcript below.

If the answer is not available inside the transcript,
reply:

"I couldn't find that information in this meeting."

Meeting Transcript:

${transcript}

User Question:

${question}
`,


    DECISIONS: (transcript) => `
Extract all final decisions made during the meeting.

For every decision include:

- Decision
- Decision Maker
- Reason

Transcript:

${transcript}

Return JSON.
`,


    MINUTES: (transcript) => `
Generate professional Meeting Minutes.

Include:

- Date
- Participants
- Agenda
- Discussion
- Decisions
- Action Items
- Next Meeting

Transcript:

${transcript}
`,


    CLEAN_TRANSCRIPT: (transcript) => `
Clean the following transcript.

Fix:

- Grammar
- Punctuation
- Speaker formatting
- Remove filler words
- Keep original meaning

Transcript:

${transcript}
`,


    ANALYTICS: (transcript) => `
Analyze this meeting.

Generate:

- Participation Score
- Collaboration Score
- Meeting Effectiveness
- Positive Sentiment
- Negative Sentiment
- Recommendations

Transcript:

${transcript}

Return JSON.
`
};

export default PROMPTS;