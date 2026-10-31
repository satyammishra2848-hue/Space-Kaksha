// src/components/motion/ScrollProgress.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '@/context/MotionContext';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const current = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, current)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-orange-bg transition-[width] duration-75 ease-out shadow-xs"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

