import { ArrowLeft } from 'lucide-react';
import { getSubjectsForClass } from '../../../data/curriculum';

interface Props {
  value: string;
  classNumber: number;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SubjectSelection({ value, classNumber, onChange, onNext, onBack }: Props) {
  const availableSubjects = getSubjectsForClass(classNumber);

  return (
    <div className="animate-fadeIn">
      <button 
        onClick={onBack}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
        Select Subject
      </h2>
      <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-4">
        {availableSubjects.map((subject) => (
          <button
            key={subject}
            onClick={() => {
              onChange(subject);
              onNext();
            }}
            className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group
              ${value === subject
                ? 'border-primary bg-primary/10'
                : 'border-neutral-800 hover:border-primary'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl font-medium relative z-10">{subject}</span>
          </button>
        ))}
      </div>
    </div>
  );
}