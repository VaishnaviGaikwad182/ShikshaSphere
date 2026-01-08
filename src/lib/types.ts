import type { LucideIcon } from 'lucide-react';

export type User = {
  id: string;
  name: string;
  avatarId: string;
  points: number;
  rank: number;
};

export type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
};

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Module = {
  id: string;
  title: string;
  description: string;
  subject: 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics';
  icon: LucideIcon;
  imageId: string;
  culturalContext: string;
  questions: Record<Difficulty, Question[]>;
};

export type SerializableModule = Omit<Module, 'icon'>;

export type Badge = {
  id: string;
  title: string;
  description: string;
  imageId: string;
  icon: LucideIcon;
};

export type Activity = {
  id: string;
  text: string;
  timestamp: string;
  icon: LucideIcon;
};
