import { chatGroq } from '../lib/groq/chat-config';
import { type GroqMessage } from '../lib/groq/types';

const SYSTEM_PROMPT = `You are QuizBot, a helpful academic assistant. Provide clear and concise answers to educational questions.`;

class ChatService {
  private messages: GroqMessage[] = [
    { role: "system", content: SYSTEM_PROMPT }
  ];

  async generateResponse(prompt: string): Promise<string> {
    try {
      // Clear previous messages to avoid token limit issues
      this.messages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ];

      const completion = await chatGroq.chat.completions.create({
        messages: this.messages,
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 512,
        top_p: 1,
        stream: false
      });

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        throw new Error('Invalid response from API');
      }

      return response;
    } catch (error) {
      console.error('ChatService Error:', error);
      throw new Error('Failed to generate response. Please try again.');
    }
  }
}

export const chatService = new ChatService();