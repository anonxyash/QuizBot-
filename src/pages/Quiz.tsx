import { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { MCQQuestion } from '../services/MCQService';

export default function Quiz() {
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showAnimation, setShowAnimation] = useState<{ questionId: number; correct: boolean } | null>(null);

  useEffect(() => {
    const mcqData = sessionStorage.getItem('mcqData');
    if (mcqData) {
      setQuestions(JSON.parse(mcqData));
    }
  }, []);

  const handleAnswer = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    const question = questions[questionId];
    const isCorrect = answer === question.correct;
    
    setShowAnimation({
      questionId,
      correct: isCorrect
    });
    
    setTimeout(() => setShowAnimation(null), 1000);
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(selectedAnswers).forEach(([questionId, answer]) => {
      if (questions[parseInt(questionId)].correct === answer) {
        correct++;
      }
    });
    return correct;
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <p>No questions available. Please generate MCQs first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-black/50 rounded-xl p-8 border border-[#222] backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-8">Quiz Time</h1>
          
          {questions.map((question, questionId) => (
            <div key={questionId} className="mb-8">
              <div className="text-lg font-medium mb-4">
                <span className="text-primary">{questionId + 1}.</span>
                <span className="text-sm ml-2 text-gray-400">(Complexity: {question.complexity}/5)</span>
                <div className="mt-2">{question.question}</div>
              </div>
              
              <div className="space-y-4">
                {['A', 'B', 'C', 'D'].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(questionId, option)}
                    className={`w-full p-4 rounded-lg border ${
                      selectedAnswers[questionId] === option
                        ? 'border-primary bg-primary/10'
                        : 'border-[#222] hover:border-primary'
                    } transition-all text-left relative overflow-hidden`}
                  >
                    <span className="font-medium text-primary mr-2">
                      {option}.
                    </span>
                    {question.options[index]}
                    {showAnimation?.questionId === questionId && selectedAnswers[questionId] === option && (
                      <div className={`absolute inset-0 ${
                        showAnimation.correct ? 'bg-primary/20' : 'bg-red-500/20'
                      } animate-ping`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowResults(true)}
            className="w-full py-4 bg-primary text-black rounded-lg font-medium hover:bg-primary-hover transition-colors"
          >
            Submit Quiz
          </button>
        </div>
      </div>

      {showResults && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/50 rounded-xl p-8 border border-[#222] max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
            <div className="flex items-center justify-between mb-4">
              <span>Score:</span>
              <span className="text-primary font-medium">{calculateScore()}/{questions.length}</span>
            </div>
            <div className="space-y-2">
              {questions.map((question, index) => (
                <div key={index} className="flex items-center gap-2">
                  {selectedAnswers[index] === question.correct ? (
                    <CheckCircle className="text-primary" />
                  ) : (
                    <XCircle className="text-red-500" />
                  )}
                  <span>Question {index + 1}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowResults(false)}
              className="w-full py-3 bg-primary text-black rounded-lg font-medium mt-6 hover:bg-primary-hover transition-colors"
            >
              Review Answers
            </button>
          </div>
        </div>
      )}
    </div>
  );
}