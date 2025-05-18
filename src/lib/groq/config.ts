import Groq from 'groq-sdk';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

if (!API_KEY) {
  throw new Error('Missing GROQ_API_KEY environment variable');
}

export const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true // Enable browser usage
});