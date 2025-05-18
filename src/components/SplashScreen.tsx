import { Infinity } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <Infinity className="w-16 h-16 text-primary animate-bounce mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white">
          Quiz<span className="text-primary">Bot</span>
        </h1>
      </div>
    </div>
  );
}