
import { ArrowRight, BookOpen, Infinity } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAction = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
    }, 2000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative grid-pattern">
      <div className="container mx-auto px-4 text-center relative">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fadeIn">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-white animate-live-gradient" style={{ backgroundSize: '200% auto' }}>Millions of quiz questions</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">in your pocket</span>
        </h1>
        
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fadeIn animation-delay-200">
          Use AI to research, learn and understand any topic in SECONDS
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => handleAction('/chat')}
            className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full 
                     font-semibold text-lg transition-all hover:-translate-y-1 hover:bg-primary-hover
                     animate-fadeIn animation-delay-300"
          >
            Start Chatting with QuizBot
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleAction('/quiz')}
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded-full 
                     font-semibold text-lg transition-all hover:-translate-y-1
                     animate-fadeIn animation-delay-400"
          >
            Generate Quiz
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleAction('/paper')}
            className="inline-flex items-center gap-2 bg-black text-primary border border-primary px-8 py-4 rounded-full 
                     font-semibold text-lg transition-all hover:-translate-y-1 hover:bg-primary/10
                     animate-fadeIn animation-delay-500"
          >
            Sample Paper
            <BookOpen className="w-5 h-5" />
          </button>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black/50 blur-background flex items-center justify-center z-50">
            <div className="text-center">
              <Infinity className="w-16 h-16 text-primary animate-bounce mx-auto mb-4" />
              <p className="text-xl font-semibold">Loading your study assistant...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}