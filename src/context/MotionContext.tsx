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
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // 1. Mark html as JS-enabled for safe-by-default motion styles
    document.documentElement.classList.add('js');

    // 2. Check system preference and localStorage
    const saved = localStorage.getItem('kaksha_reduced_motion');
    const systemPrefers = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initial = saved !== null ? saved === 'true' : systemPrefers;
    setReducedMotion(initial);

    if (initial) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, []);

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

