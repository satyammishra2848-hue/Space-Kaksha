import React from 'react';

interface SpaceDoodleProps {
  type: 'star' | 'sparkle' | 'planet-ring' | 'crescent' | 'satellite' | 'arrow' | 'telescope';
  className?: string;
  size?: number;
  color?: string;
}

export const SpaceDoodle: React.FC<SpaceDoodleProps> = ({
  type,
  className = '',
  size = 24,
  color = 'currentColor',
}) => {
  switch (type) {
    case 'star':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* 4-point classic astronomy editorial star */}
          <path
            d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
            fill={color}
          />
        </svg>
      );

    case 'sparkle':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M12 3V21M3 12H21M6 6L18 18M6 18L18 6"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'crescent':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M20 13C19.5 17 16 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C13.5 4 14.9 4.4 16.1 5.1C13.6 6.3 12 8.9 12 12C12 15.1 13.6 17.7 16.1 18.9C17.2 17.3 19.3 14.5 20 13Z"
            fill={color}
          />
        </svg>
      );

    case 'satellite':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect x="9" y="9" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" />
          <path d="M4 10H9M4 14H9M15 10H20M15 14H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 4V9M12 15V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'arrow':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
};

