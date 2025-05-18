import Groq from 'groq-sdk';

const CHAT_API_KEY = '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';

export const chatGroq = new Groq({
  apiKey: CHAT_API_KEY,
  dangerouslyAllowBrowser: true
});
