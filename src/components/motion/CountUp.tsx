// src/components/motion/CountUp.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/context/MotionContext';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number; // ms
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 700,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const { reducedMotion } = useReducedMotion();
  const [count, setCount] = useState<number>(reducedMotion ? end : start);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setCount(end);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(element);

          const startTime = performance.now();
          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(start + (end - start) * easedProgress);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [end, start, duration, reducedMotion]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};
