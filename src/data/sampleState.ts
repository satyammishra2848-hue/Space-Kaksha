// UI build only, replaced by real state later
// Reference sample telemetry extracted strictly from reference mockups for UI display fidelity.
// Never present them as real verified learner telemetry.

import { UserState } from '@/types';

export const sampleUserState: UserState = {
  name: 'Aarav',
  avatar: '/assets/illustrations/aarav_avatar.png',
  currentLevelId: 'level-1',
  xp: 320,
  streakDays: 7,
  completedLessonIds: ['earth-and-sky'], // 1 of 4 completed in Level 1
  passedCheckIds: [],
  earnedBadgeIds: ['first-lesson', 'moon-explorer', '7-day-streak'],
  topicScores: {
    'planets-solar-system': 80,
    'moon-earth': 60,
    'space-science-basics': 40,
    'space-technology': 50,
  },
  activeLocale: 'en',
};

export const sampleBadges = [
  {
    id: 'first-lesson',
    title: 'First Lesson',
    description: 'Completed your very first mission lesson in Kaksha.',
    icon: '🪐',
    xpReward: 50,
    unlocked: true,
  },
  {
    id: 'moon-explorer',
    title: 'Moon Explorer',
    description: 'Discovered the secrets of Earth\'s cosmic companion.',
    icon: '🚀',
    xpReward: 100,
    unlocked: true,
  },
  {
    id: '7-day-streak',
    title: '7 Day Streak',
    description: 'Maintained a persistent orbit for 7 continuous days.',
    icon: '⭐',
    xpReward: 100,
    unlocked: true,
  },
  {
    id: 'cadet-ready',
    title: 'Cadet Ready',
    description: 'Unlock and advance to Level 2 Cadet ranking.',
    icon: '🔒',
    xpReward: 100,
    unlocked: false,
  },
];
