// src/components/motion/DrawPath.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/context/MotionContext';

interface DrawPathProps {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharrayPattern?: string; // e.g. "6 6"
  className?: string;
  duration?: number;
}

export const DrawPath: React.FC<DrawPathProps> = ({
  d,
  stroke = 'var(--ink)',
  strokeWidth = 2,
  strokeDasharrayPattern,
  className = '',
  duration = 700,
}) => {
  const { reducedMotion } = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);
  const [totalLength, setTotalLength] = useState(1000);

  useEffect(() => {
    if (reducedMotion) {
      setIsDrawn(true);
      return;
    }

    const path = pathRef.current;
    if (!path) return;

    try {
      const length = path.getTotalLength();
      setTotalLength(length);
    } catch {
      // Fallback
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsDrawn(true);
          observer.unobserve(path);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(path);

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharrayPattern}
        className={className}
      />
    );
  }

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={totalLength}
      strokeDashoffset={isDrawn ? 0 : totalLength}
      className={className}
      style={{
        transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    />
  );
};
