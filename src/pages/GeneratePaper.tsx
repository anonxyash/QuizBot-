import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paperService } from '../services/PaperService';
import type { PaperConfig } from '../types/paper';
import ClassSelection from '../components/forms/PaperConfigSteps/ClassSelection';
import SubjectSelection from '../components/forms/PaperConfigSteps/SubjectSelection';
import ChapterSelection from '../components/forms/PaperConfigSteps/ChapterSelection';
import FinalConfig from '../components/forms/PaperConfigSteps/FinalConfig';

export default function GeneratePaper() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [config, setConfig] = useState<PaperConfig>({
    class: 6,
    subject: '',
    chapters: [],
    marks: 80,
    difficulty: 'medium'
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const paper = await paperService.generatePaper(config);
      navigate('/paper-result', { state: { paper, config } });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-[#111] rounded-3xl p-8 relative">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              {error}
            </div>
          )}

          {currentStep === 0 && (
            <ClassSelection
              value={config.class}
              onChange={(value) => setConfig(prev => ({ ...prev, class: value }))}
              onNext={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 1 && (
            <SubjectSelection
              value={config.subject}
              classNumber={config.class}
              onChange={(value) => setConfig(prev => ({ ...prev, subject: value }))}
              onNext={() => setCurrentStep(2)}
              onBack={() => setCurrentStep(0)}
            />
          )}

          {currentStep === 2 && (
            <ChapterSelection
              value={config.chapters}
              subject={config.subject}
              classNumber={config.class}
              onChange={(value) => setConfig(prev => ({ ...prev, chapters: value }))}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <FinalConfig
              marks={config.marks}
              difficulty={config.difficulty}
              onMarksChange={(value) => setConfig(prev => ({ ...prev, marks: value }))}
              onDifficultyChange={(value) => setConfig(prev => ({ ...prev, difficulty: value }))}
              onSubmit={handleSubmit}
              onBack={() => setCurrentStep(2)}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}