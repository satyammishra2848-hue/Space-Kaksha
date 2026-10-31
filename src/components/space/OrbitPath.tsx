import React from 'react';

interface OrbitPathProps {
  className?: string;
  variant?: 'curved' | 'horizontal' | 'vertical';
}

export const OrbitPath: React.FC<OrbitPathProps> = ({
  className = '',
  variant = 'horizontal',
}) => {
  if (variant === 'horizontal') {
    return (
      <svg
        className={`w-full h-12 overflow-visible ${className}`}
        viewBox="0 0 800 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30 Q 200 10, 400 30 T 800 30"
          stroke="var(--line-strong)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
      </svg>
    );
  }

  return (
    <svg
      className={`w-full h-full overflow-visible ${className}`}
      viewBox="0 0 1000 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 150 C 250 50, 450 250, 650 120 S 950 200, 950 150"
        stroke="var(--line)"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
    </svg>
  );
};

