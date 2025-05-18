import { ArrowLeft } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StreamSelection({ value, onChange, onNext, onBack }: Props) {
  const streams = [
    { id: 'science', name: 'Science' },
    { id: 'commerce', name: 'Commerce' },
    { id: 'arts', name: 'Arts' }
  ];

  return (
    <div className="animate-fadeIn">
      <button 
        onClick={onBack}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <h2 className="text-2xl font-bold mb-6">Select Stream</h2>
      <div className="grid gap-4">
        {streams.map((stream) => (
          <button
            key={stream.id}
            onClick={() => {
              onChange(stream.id);
              onNext();
            }}
            className={`p-6 rounded-2xl border ${
              value === stream.id
                ? 'border-primary bg-primary/10'
                : 'border-neutral-800 hover:border-primary'
            } transition-all duration-300 hover:-translate-y-1`}
          >
            <span className="text-xl font-medium">{stream.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}