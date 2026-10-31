// src/components/motion/StarBurst.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '@/context/MotionContext';

interface StarBurstProps {
  active?: boolean;
  count?: number; // 6 to 10
  className?: string;
}

export const StarBurst: React.FC<StarBurstProps> = ({
  active = true,
  count = 8,
  className = '',
}) => {
  const { reducedMotion } = useReducedMotion();
  const [animating, setAnimating] = useState(() => active && !reducedMotion);

  useEffect(() => {
    if (!active || reducedMotion) {
      return;
    }

    const timer = setTimeout(() => {
      setAnimating(false);
    }, 400); // 400ms max per spec

    return () => clearTimeout(timer);
  }, [active, reducedMotion]);

  if (!animating || reducedMotion) return null;

  // Generate star positions radiating outwards in a circle
  const stars = Array.from({ length: Math.min(Math.max(count, 6), 10) }).map((_, i) => {
    const angle = (i / count) * 2 * Math.PI;
    const distance = 28 + (i % 3) * 8; // 28px - 44px burst radius
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const isOrange = i % 2 === 0;
    const starChar = i % 3 === 0 ? '✦' : '✧';

    return { x, y, isOrange, starChar, id: i };
  });

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible ${className}`}
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute text-xs select-none transition-all duration-400 ease-out"
          style={{
            transform: `translate(${star.x}px, ${star.y}px) scale(0)`,
            animation: 'starBurstPop 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            color: star.isOrange ? 'var(--orange)' : 'var(--ink)',
          }}
        >
          {star.starChar}
        </span>
      ))}
    </div>
  );
};
