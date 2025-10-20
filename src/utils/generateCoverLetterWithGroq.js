import axios from 'axios';

const createPrompt = (resumeText, jobDescription) => `
You are an expert cover letter writer.

Based on the resume:
---
${resumeText}
---

And job description:
---
${jobDescription}
---

Write a concise, engaging, and tailored cover letter (≤150 words). Do not include "Here is your letter" or explanations.
`;

const callGroq = async (model, resumeText, jobDescription) => {
    const prompt = createPrompt(resumeText, jobDescription);

    const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
            model,
            messages: [
                { role: 'system', content: 'You are a professional career assistant.' },
                { role: 'user', content: prompt },
            ],
            temperature: 0.7,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            },
        }
    );

    return response.data.choices[0]?.message?.content || 'No response.';
};

const callOpenRouter = async (resumeText, jobDescription) => {
    const prompt = `
  You are an expert career assistant.
  
  Using the resume below:
  ---
  ${resumeText}
  ---
  
  And the job description:
  ---
  ${jobDescription}
  ---
  
  Write a concise, clear, and enthusiastic cover letter under 150 words. Do not include extra explanations — just return the letter body.
    `;

    const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
            model: 'mistralai/mistral-7b-instruct',
            messages: [
                { role: 'system', content: 'You are a helpful assistant that writes great cover letters.' },
                { role: 'user', content: prompt },
            ],
        },
        {
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                'HTTP-Referer': 'http://localhost:5173', // replace with your deployed domain later
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data.choices[0]?.message?.content || 'No response from OpenRouter.';
};


export const generateThreeCoverLetters = async ({ resumeText, jobDescription }) => {
    try {
        const groqModels = [
            'llama-3.1-8b-instant',
            'llama-3.3-70b-versatile'
        ];
        const groqPromises = groqModels.map((model) =>
            callGroq(model, resumeText, jobDescription)
        );

        const openRouterPromise = callOpenRouter(resumeText, jobDescription);

        const results = await Promise.all([...groqPromises, openRouterPromise]);

        return results;
    } catch (error) {
        console.error('Cover letter generation failed:', error.response?.data || error.message);
        return ['Failed to generate cover letters. Please try again.'];
    }
};

