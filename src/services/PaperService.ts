import { paperGroq } from '../lib/groq/paper-config';
import type { PaperConfig } from '../types/paper';

class PaperService {
  async generatePaper(config: PaperConfig): Promise<string> {
    try {
      const difficultyGuide = {
        easy: 'Focus on basic concepts and direct questions. Include more recall-based questions and simple applications. Use straightforward language.',
        medium: 'Balance between basic and advanced concepts. Mix recall and analytical questions. Include moderate application-based problems.',
        hard: 'Emphasize complex concepts and higher-order thinking. Include challenging analytical and application questions. Add case studies and multi-concept problems.'
      };

      const prompt = `Generate a detailed ${config.marks} marks sample paper for Class ${config.class} ${
        config.stream ? `(${config.stream} Stream)` : ''
      } in ${config.subject}, covering these chapters: ${config.chapters.join(', ')}.

Difficulty Level: ${config.difficulty.toUpperCase()}
${difficultyGuide[config.difficulty as keyof typeof difficultyGuide]}

Follow these NCERT guidelines strictly:

1. Paper Structure:
   - Total Marks: ${config.marks}
   - Time: ${config.marks === 80 ? '3 hours' : config.marks === 40 ? '2 hours' : '1 hour'}
   - Clear sections for different question types
   - Proper marking distribution

2. Question Types & Distribution:
   For ${config.marks} marks paper:
   ${this.getQuestionDistribution(config.marks)}

3. Format Requirements:
   - Start with clear instructions
   - Number questions sequentially
   - Indicate marks for each question
   - Include choice questions where applicable
   - Group similar difficulty questions together

4. Special Instructions:
   - Questions should match the specified ${config.difficulty} difficulty level
   - Include NCERT-based conceptual questions
   - Add practical/application based questions
   - Ensure proper difficulty distribution

Generate the complete paper following this format exactly.`;

      const completion = await paperGroq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        max_tokens: 2000,
        top_p: 1,
        stream: false
      });

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        throw new Error('Failed to generate paper');
      }

      return response;
    } catch (error) {
      console.error('Paper Generation Error:', error);
      throw new Error('Failed to generate paper. Please try again.');
    }
  }

  private getQuestionDistribution(marks: number): string {
    switch (marks) {
      case 80:
        return `- Section A: MCQs (20 marks)
   - 20 questions × 1 mark each
   - All questions compulsory
- Section B: Short Answer I (15 marks)
   - 5 questions × 3 marks each
   - All questions compulsory
- Section C: Short Answer II (25 marks)
   - 5 questions × 5 marks each
   - Internal choice in 2 questions
- Section D: Long Answer (20 marks)
   - 2 questions × 10 marks each
   - Internal choice in both questions`;
      
      case 40:
        return `- Section A: MCQs (10 marks)
   - 10 questions × 1 mark each
   - All questions compulsory
- Section B: Short Answer (15 marks)
   - 5 questions × 3 marks each
   - Internal choice in 2 questions
- Section C: Long Answer (15 marks)
   - 3 questions × 5 marks each
   - Internal choice in 1 question`;
      
      case 20:
        return `- Section A: MCQs (8 marks)
   - 8 questions × 1 mark each
   - All questions compulsory
- Section B: Short Answer (12 marks)
   - 3 questions × 4 marks each
   - Internal choice in 1 question`;
      
      default:
        return '';
    }
  }
}

export const paperService = new PaperService();