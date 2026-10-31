import React from 'react';
import Image from 'next/image';

interface LevelBadgeProps {
  levelNumber?: number;
  levelName?: string;
  variant?: 'pill' | 'card' | 'compact';
  iconSrc?: string;
  className?: string;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({
  levelNumber = 1,
  levelName = 'Explorer',
  variant = 'compact',
  iconSrc,
  className = '',
}) => {
  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-warm border border-line text-xs font-semibold text-ink ${className}`}>
        <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
        <span>Level {levelNumber} · {levelName}</span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-xl bg-surface-muted/60 border border-line ${className}`}>
        {iconSrc && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-line bg-surface">
            <Image src={iconSrc} alt={levelName} fill className="object-cover" />
          </div>
        )}
        <div>
          <span className="text-[10px] font-bold tracking-wider text-ink-muted uppercase block">
            Level {levelNumber}
          </span>
          <span className="text-sm font-bold text-ink block">{levelName}</span>
        </div>
      </div>
    );
  }

  // Compact variant for navbar
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-warm border border-line text-xs font-medium text-ink ${className}`}>
      {iconSrc ? (
        <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
          <Image src={iconSrc} alt={levelName} fill className="object-cover" />
        </div>
      ) : (
        <span className="w-2 h-2 rounded-full bg-mint" />
      )}
      <span>Level {levelNumber} · {levelName}</span>
    </div>
  );
};

