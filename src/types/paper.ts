export interface Stream {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  streamId?: string;
}

export interface Chapter {
  id: string;
  name: string;
  subjectId: string;
}

export interface PaperConfig {
  class: number;
  stream?: string;
  subject: string;
  chapters: string[];
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GeneratedPaper {
  id: string;
  userId: string;
  config: PaperConfig;
  content: string;
  createdAt: string;
}