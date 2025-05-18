import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { PaperConfig } from '../../types/paper';
import { subjects, chapters } from '../../data/curriculum';

const paperConfigSchema = z.object({
  class: z.number().min(1).max(12),
  stream: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  chapters: z.array(z.string()).min(1, "Select at least one chapter"),
  marks: z.number().refine(val => [20, 40, 80].includes(val), {
    message: "Marks must be either 20, 40, or 80"
  })
});

interface PaperConfigFormProps {
  onSubmit: (data: PaperConfig) => void;
  isLoading?: boolean;
}

export default function PaperConfigForm({ onSubmit, isLoading }: PaperConfigFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PaperConfig>({
    resolver: zodResolver(paperConfigSchema),
    defaultValues: {
      class: 11,
      marks: 80
    }
  });

  const selectedClass = watch('class');
  const selectedStream = watch('stream');
  const selectedSubject = watch('subject');
  const showStream = selectedClass >= 11;

  const getSubjects = () => {
    if (selectedClass >= 11 && selectedStream) {
      return subjects[selectedStream as keyof typeof subjects] || [];
    }
    return subjects.general;
  };

  const getChapters = () => {
    if (!selectedSubject) return [];
    return chapters[selectedSubject as keyof typeof chapters] || [];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300">Class</label>
        <select
          {...register('class', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>Class {i + 1}</option>
          ))}
        </select>
        {errors.class && (
          <p className="mt-1 text-sm text-red-500">{errors.class.message}</p>
        )}
      </div>

      {showStream && (
        <div>
          <label className="block text-sm font-medium text-gray-300">Stream</label>
          <select
            {...register('stream')}
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
          >
            <option value="">Select Stream</option>
            <option value="science">Science</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts</option>
          </select>
          {errors.stream && (
            <p className="mt-1 text-sm text-red-500">{errors.stream.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300">Subject</label>
        <select
          {...register('subject')}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
        >
          <option value="">Select Subject</option>
          {getSubjects().map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Chapters</label>
        <div className="mt-1 space-y-2 max-h-48 overflow-y-auto p-2 border border-gray-600 rounded-md">
          {getChapters().map(chapter => (
            <label key={chapter} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={chapter}
                {...register('chapters')}
                className="rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-300">{chapter}</span>
            </label>
          ))}
        </div>
        {errors.chapters && (
          <p className="mt-1 text-sm text-red-500">{errors.chapters.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Marks</label>
        <select
          {...register('marks', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
        >
          <option value={20}>20 Marks</option>
          <option value={40}>40 Marks</option>
          <option value={80}>80 Marks</option>
        </select>
        {errors.marks && (
          <p className="mt-1 text-sm text-red-500">{errors.marks.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary-hover text-black font-medium py-3 px-4 rounded-lg disabled:opacity-50 transition-colors"
      >
        {isLoading ? 'Generating...' : 'Generate Paper'}
      </button>
    </form>
  );
}