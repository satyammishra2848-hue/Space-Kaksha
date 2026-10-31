// src/context/MotionContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface MotionContextType {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const MotionContext = createContext<MotionContextType>({
  reducedMotion: false,
  toggleReducedMotion: () => {},
});

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kaksha_reduced_motion');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    // 1. Mark html as JS-enabled for safe-by-default motion styles
    document.documentElement.classList.add('js');

    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reducedMotion]);

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => {
      const next = !prev;
      localStorage.setItem('kaksha_reduced_motion', String(next));
      if (next) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
      return next;
    });
  };

  return (
    <MotionContext.Provider value={{ reducedMotion, toggleReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useReducedMotion = () => useContext(MotionContext);
export const useMotion = useReducedMotion;

