export type Locale = 'en' | 'hi';

export interface LevelInfo {
  id: string;
  number: number;
  name: string;
  theme: string;
  description: string;
  badgeTitle: string;
  planetIcon: string;
  isUnlocked: boolean;
  isComingSoon: boolean;
  lessonsCount: number;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
  diagramUrl?: string;
  topic?: string;
  tier?: number;
}

export interface Lesson {
  id: string;
  levelId: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  estimatedMinutes: number;
  objectives: string[];
  keyFacts: string[];
  videoUrl?: string;
  quiz: QuizQuestion[];
  xpReward: number;
  simulationType?: 'moon-phases' | 'gravity' | 'rocket-orbit';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
}

export interface UserState {
  name: string;
  avatar: string;
  currentLevelId: string;
  xp: number;
  streakDays: number;
  completedLessonIds: string[];
  passedCheckIds: string[];
  earnedBadgeIds: string[];
  topicScores: Record<string, number>;
  activeLocale: Locale;
}

export interface TutorMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  diagramUrl?: string;
  suggestions?: string[];
}
