'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserState, Locale } from '@/types';
import { sampleUserState } from '@/data/sampleState';
import { translations, TranslationKey } from '@/content/locales';

interface AppContextType {
  user: UserState;
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: (key: TranslationKey) => string;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string, xpReward: number, badgeId?: string) => boolean;
  passLevelCheck: (levelId: string, xpReward: number) => boolean;
  setUserLevel: (levelId: string) => void;
  resetProgress: () => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isLevelUnlocked: (levelId: string) => boolean;
}

const STORAGE_KEY = 'kaksha_user_state_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback to sample state
      }
    }
    return sampleUserState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      // Safe fail
    }
  }, [user]);

  const setLocale = (loc: Locale) => {
    setUser((prev) => ({ ...prev, activeLocale: loc }));
  };

  const t = (key: TranslationKey): string => {
    const dict = translations[user.activeLocale] || translations.en;
    return dict[key] || translations.en[key] || String(key);
  };

  const addXp = (amount: number) => {
    setUser((prev) => ({ ...prev, xp: prev.xp + amount }));
  };

  // Rule: Award XP and unlocks ONCE only. Never farmable on refresh.
  const completeLesson = (lessonId: string, xpReward: number, badgeId?: string): boolean => {
    if (user.completedLessonIds.includes(lessonId)) {
      return false; // Already completed, no double-reward
    }

    setUser((prev) => {
      const nextCompleted = [...prev.completedLessonIds, lessonId];
      const nextBadges = badgeId && !prev.earnedBadgeIds.includes(badgeId)
        ? [...prev.earnedBadgeIds, badgeId]
        : prev.earnedBadgeIds;

      return {
        ...prev,
        xp: prev.xp + xpReward,
        completedLessonIds: nextCompleted,
        earnedBadgeIds: nextBadges,
      };
    });
    return true;
  };

  const passLevelCheck = (levelId: string, xpReward: number): boolean => {
    if (user.passedCheckIds.includes(levelId)) {
      return false; // Already passed, no double-reward
    }

    setUser((prev) => ({
      ...prev,
      xp: prev.xp + xpReward,
      passedCheckIds: [...prev.passedCheckIds, levelId],
      currentLevelId: levelId === 'level-1' ? 'level-2' : prev.currentLevelId,
      earnedBadgeIds: !prev.earnedBadgeIds.includes('cadet-badge')
        ? [...prev.earnedBadgeIds, 'cadet-badge']
        : prev.earnedBadgeIds,
    }));
    return true;
  };

  const setUserLevel = (levelId: string) => {
    setUser((prev) => ({ ...prev, currentLevelId: levelId }));
  };

  const resetProgress = () => {
    setUser(sampleUserState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return user.completedLessonIds.includes(lessonId);
  };

  const isLevelUnlocked = (levelId: string): boolean => {
    if (levelId === 'level-1') return true;
    if (levelId === 'level-2') return user.passedCheckIds.includes('level-1');
    return false; // Level 3 and 4 are Coming Soon
  };

  return (
    <AppContext.Provider
      value={{
        user,
        locale: user.activeLocale,
        setLocale,
        t,
        addXp,
        completeLesson,
        passLevelCheck,
        setUserLevel,
        resetProgress,
        isLessonCompleted,
        isLevelUnlocked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const AppProvider = AppContextProvider;

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  return context;
}
