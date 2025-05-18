import { groq } from '../lib/groq/config';

export interface MCQQuestion {
  question: string;
  options: string[];
  correct: string;
  complexity: number;
}

class MCQService {
  async generateMCQs(content: string): Promise<MCQQuestion[]> {
    try {
      // Trim content to a reasonable size
      const trimmedContent = content.substring(0, 2000);
      
      const prompt = `Generate 3 multiple choice questions from this text. Format EXACTLY like this:

Question 1:
[Question text here]
A) [Option A text]
B) [Option B text]
C) [Option C text]
D) [Option D text]
Correct: [A/B/C/D]
Complexity: [1-5]

Text to generate questions from:
${trimmedContent}`;

      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      });

      const mcqData = completion.choices[0]?.message?.content;
      
      if (!mcqData) {
        throw new Error('Failed to generate MCQs');
      }

      return this.parseMCQs(mcqData);
    } catch (error) {
      console.error('MCQ Generation Error:', error);
      throw new Error('Failed to generate MCQs');
    }
  }

  private parseMCQs(data: string): MCQQuestion[] {
    const questions: MCQQuestion[] = [];
    const questionBlocks = data.split(/Question \d+:/g).filter(block => block.trim());

    questionBlocks.forEach(block => {
      try {
        const lines = block.trim().split('\n').filter(line => line.trim());
        if (lines.length >= 7) {
          const question = lines[0].trim();
          const options = [
            lines[1].replace(/^A\)/, '').trim(),
            lines[2].replace(/^B\)/, '').trim(),
            lines[3].replace(/^C\)/, '').trim(),
            lines[4].replace(/^D\)/, '').trim()
          ];
          const correctLine = lines.find(line => line.startsWith('Correct:'));
          const complexityLine = lines.find(line => line.startsWith('Complexity:'));
          
          const correct = correctLine ? correctLine.split(':')[1].trim() : '';
          const complexity = complexityLine ? 
            parseInt(complexityLine.split(':')[1].trim()) : 
            Math.floor(Math.random() * 5) + 1;

          if (question && options.length === 4 && correct) {
            questions.push({ question, options, correct, complexity });
          }
        }
      } catch (error) {
        console.error('Error parsing question block:', error);
      }
    });

    return questions;
  }
}

export const mcqService = new MCQService();