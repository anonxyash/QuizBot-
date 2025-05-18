import { useState } from 'react';
import { Upload, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mcqService } from '../services/MCQService';

export default function QuizGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const mcqs = await mcqService.generateMCQs(content);
        
        if (mcqs.length === 0) {
          throw new Error('No questions were generated. Please try with different content.');
        }

        sessionStorage.setItem('mcqData', JSON.stringify(mcqs));
        navigate('/quiz');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to generate MCQs. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 rounded-xl p-8 border border-white/10">
        <h1 className="text-3xl font-bold mb-8 text-center">Quiz Generator</h1>
        
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}
        
        <div className="grid gap-8">
          <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-xl hover:border-primary transition-colors cursor-pointer group">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".txt,.doc,.docx,.pdf"
            />
            <Upload className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-medium">Upload Document</span>
            <span className="text-sm text-gray-400 mt-2">TXT, DOC, DOCX, or PDF</span>
          </label>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-xl font-medium">Analyzing content & generating quiz questions...</p>
          </div>
        </div>
      )}
    </div>
  );
}