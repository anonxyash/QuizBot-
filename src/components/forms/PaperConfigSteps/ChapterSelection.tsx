import { ArrowLeft } from 'lucide-react';
import { getChaptersForSubject } from '../../../data/curriculum';

interface Props {
  value: string[];
  subject: string;
  classNumber: number;
  onChange: (value: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ChapterSelection({ value, subject, classNumber, onChange, onNext, onBack }: Props) {
  const availableChapters = getChaptersForSubject(subject, classNumber);

  const toggleChapter = (chapter: string) => {
    const newValue = value.includes(chapter)
      ? value.filter(v => v !== chapter)
      : [...value, chapter];
    onChange(newValue);
  };

  return (
    <div className="animate-fadeIn">
      <button 
        onClick={onBack}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
        Select Chapters
      </h2>
      <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-4">
        {availableChapters.map((chapter) => (
          <button
            key={chapter}
            onClick={() => toggleChapter(chapter)}
            className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group
              ${value.includes(chapter)
                ? 'border-primary bg-primary/10'
                : 'border-neutral-800 hover:border-primary'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl font-medium relative z-10">{chapter}</span>
          </button>
        ))}
      </div>
      
      {value.length > 0 && (
        <button
          onClick={onNext}
          className="mt-6 w-full bg-primary hover:bg-primary-hover text-black font-medium py-4 px-6 rounded-2xl transition-colors relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10">
            Continue with {value.length} chapter{value.length !== 1 ? 's' : ''}
          </span>
        </button>
      )}
    </div>
  );
}