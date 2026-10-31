// src/components/ui/WavyDivider.tsx
import React from 'react';

interface WavyDividerProps {
  variant: 'paper-to-night' | 'night-to-paper' | 'paper-to-warm' | 'warm-to-night';
  className?: string;
  height?: number;
}

export const WavyDivider: React.FC<WavyDividerProps> = ({
  variant,
  className = '',
  height = 56,
}) => {
  if (variant === 'paper-to-night') {
    return (
      <div className={`w-full overflow-hidden leading-none relative z-10 ${className}`} style={{ height: `${height}px` }}>
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          {/* Organic lunar horizon cut into night */}
          <path
            d="M0,80 C320,15 760,65 1120,20 C1280,3 1380,12 1440,25 L1440,80 L0,80 Z"
            fill="var(--night)"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'night-to-paper') {
    return (
      <div className={`w-full overflow-hidden leading-none relative z-10 ${className}`} style={{ height: `${height}px` }}>
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          {/* Organic lunar horizon transitioning back to paper */}
          <path
            d="M0,0 C280,55 640,15 980,60 C1160,82 1340,40 1440,35 L1440,0 L0,0 Z"
            fill="var(--night)"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'warm-to-night') {
    return (
      <div className={`w-full overflow-hidden leading-none relative z-10 ${className}`} style={{ height: `${height}px` }}>
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            d="M0,80 C240,30 580,75 920,25 C1180,-10 1350,35 1440,40 L1440,80 L0,80 Z"
            fill="var(--night)"
          />
        </svg>
      </div>
    );
  }

  // paper-to-warm
  return (
    <div className={`w-full overflow-hidden leading-none relative z-10 ${className}`} style={{ height: `${height}px` }}>
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <path
          d="M0,60 C420,10 880,55 1440,25 L1440,60 L0,60 Z"
          fill="var(--paper-warm)"
          fillOpacity="0.6"
        />
      </svg>
    </div>
  );
};

