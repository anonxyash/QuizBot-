import { ArrowLeft } from 'lucide-react';

interface Props {
  value: number;
  onChange: (value: number) => void;
  onNext: () => void;
  onBack?: () => void;
}

export default function ClassSelection({ value, onChange, onNext, onBack }: Props) {
  return (
    <div className="animate-fadeIn">
      {onBack && (
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
        Select Class
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.from({ length: 7 }, (_, i) => i + 6).map((classNum) => (
          <button
            key={classNum}
            onClick={() => {
              onChange(classNum);
              onNext();
            }}
            className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group
              ${value === classNum
                ? 'border-primary bg-primary/10'
                : 'border-neutral-800 hover:border-primary'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl font-medium relative z-10">Class {classNum}</span>
          </button>
        ))}
      </div>
    </div>
  );
}