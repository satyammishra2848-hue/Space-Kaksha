import React from 'react';

interface XpChipProps {
  xp: number;
  className?: string;
  showBar?: boolean;
  nextLevelXp?: number;
}

export const XpChip: React.FC<XpChipProps> = ({
  xp,
  className = '',
  showBar = false,
  nextLevelXp = 680,
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-line text-xs font-semibold text-ink shadow-2xs ${className}`}>
      <span className="text-yellow text-sm" aria-hidden="true">★</span>
      <span>{xp} XP</span>
      {showBar && (
        <div className="w-12 h-1.5 rounded-full bg-surface-muted overflow-hidden ml-1">
          <div
            className="h-full bg-orange rounded-full"
            style={{ width: `${Math.min(100, (xp / nextLevelXp) * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

interface StreakChipProps {
  days: number;
  className?: string;
}

export const StreakChip: React.FC<StreakChipProps> = ({ days, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-line text-xs font-semibold text-ink shadow-2xs ${className}`}>
      <span className="text-orange text-sm" aria-hidden="true">🔥</span>
      <span>{days} day streak</span>
    </div>
  );
};

