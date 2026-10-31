import React from 'react';

interface ProgressBarProps {
  current?: number;
  total?: number;
  percentage?: number;
  segments?: boolean;
  color?: 'orange' | 'lavender' | 'mint' | 'blue';
  className?: string;
  showLabel?: boolean;
  labelPrefix?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current = 1,
  total = 12,
  percentage,
  segments = false,
  color = 'orange',
  className = '',
  showLabel = false,
  labelPrefix = 'SPACE CHECK',
}) => {
  const colorMap = {
    orange: 'bg-orange',
    lavender: 'bg-lavender',
    mint: 'bg-mint',
    blue: 'bg-dusty-blue',
  };

  const calculatedPercent =
    percentage !== undefined ? Math.min(100, Math.max(0, percentage)) : Math.round((current / total) * 100);

  if (segments) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {Array.from({ length: total }).map((_, idx) => (
          <div
            key={idx}
            className={`h-2 flex-1 rounded-sm transition-colors duration-200 ${
              idx < current ? colorMap[color] : 'bg-line/60'
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-ink-muted mb-1 font-mono">
          <span>{labelPrefix} {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <span>{calculatedPercent}%</span>
        </div>
      )}
      <div className="w-full h-2 rounded-full bg-surface-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${colorMap[color]}`}
          style={{ width: `${calculatedPercent}%` }}
        />
      </div>
    </div>
  );
};
