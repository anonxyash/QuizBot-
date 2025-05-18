import { ArrowLeft } from 'lucide-react';

interface Props {
  marks: number;
  difficulty: string;
  onMarksChange: (value: number) => void;
  onDifficultyChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export default function FinalConfig({ 
  marks, 
  difficulty,
  onMarksChange, 
  onDifficultyChange,
  onSubmit, 
  onBack,
  isLoading 
}: Props) {
  return (
    <div className="animate-fadeIn">
      <button 
        onClick={onBack}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <h2 className="text-2xl font-bold mb-6">Final Configuration</h2>
      
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">Total Marks</label>
          <div className="grid grid-cols-3 gap-4">
            {[20, 40, 80].map((value) => (
              <button
                key={value}
                onClick={() => onMarksChange(value)}
                className={`p-4 rounded-2xl border ${
                  marks === value
                    ? 'border-primary bg-primary/10'
                    : 'border-neutral-800 hover:border-primary'
                } transition-all duration-300 hover:-translate-y-1`}
              >
                <span className="text-lg font-medium">{value} Marks</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">Difficulty Level</label>
          <div className="grid grid-cols-3 gap-4">
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <button
                key={level}
                onClick={() => onDifficultyChange(level.toLowerCase())}
                className={`p-4 rounded-2xl border ${
                  difficulty === level.toLowerCase()
                    ? 'border-primary bg-primary/10'
                    : 'border-neutral-800 hover:border-primary'
                } transition-all duration-300 hover:-translate-y-1`}
              >
                <span className="text-lg font-medium">{level}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-hover text-black font-medium py-4 px-6 rounded-2xl transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Generating Paper...' : 'Generate Paper'}
        </button>
      </div>
    </div>
  );
}