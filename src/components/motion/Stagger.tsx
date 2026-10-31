// src/components/motion/Stagger.tsx
'use client';

import React, { useEffect, useRef, useState, Children } from 'react';
import { useReducedMotion } from '@/context/MotionContext';

interface StaggerProps {
  children: React.ReactNode;
  staggerMs?: number; // 60-80ms per spec
  className?: string;
  duration?: number;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  staggerMs = 70,
  className = '',
  duration = 420,
}) => {
  const { reducedMotion } = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(container);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const childArray = Children.toArray(children);

  return (
    <div ref={containerRef} className={className}>
      {childArray.map((child, index) => {
        // Cap stagger to max 8 items per spec
        const delay = Math.min(index, 7) * staggerMs;

        return (
          <div
            key={index}
            className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};
