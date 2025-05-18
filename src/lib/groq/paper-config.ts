import Groq from 'groq-sdk';

const PAPER_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

if (!PAPER_API_KEY) {
  throw new Error('Missing GROQ_API_KEY environment variable');
}

export const paperGroq = new Groq({
  apiKey: PAPER_API_KEY,
  dangerouslyAllowBrowser: true
});