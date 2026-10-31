// src/app/template.tsx
'use client';

import React, { useEffect } from 'react';
import { useTransitionContext } from '@/context/TransitionContext';
import { useReducedMotion } from '@/context/MotionContext';

export default function Template({ children }: { children: React.ReactNode }) {
  const { notifyPageMounted } = useTransitionContext();
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    // Notify TransitionContext that the new page route has mounted
    notifyPageMounted();
  }, [notifyPageMounted]);

  return (
    <div
      className={`w-full min-h-full ${
        reducedMotion
          ? 'animate-fade-in'
          : 'animate-page-rise'
      }`}
    >
      {children}
    </div>
  );
}

