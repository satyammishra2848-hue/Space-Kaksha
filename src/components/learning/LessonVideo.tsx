import React from 'react';

interface LessonVideoProps {
  src?: string;
  title: string;
  className?: string;
}

export const LessonVideo: React.FC<LessonVideoProps> = ({
  src,
  title,
  className = '',
}) => {
  if (src) {
    return (
      <div className={`aspect-video rounded-2xl overflow-hidden border border-line bg-night shadow-card ${className}`}>
        <video controls className="w-full h-full object-cover">
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className={`aspect-video rounded-2xl border border-line bg-night text-surface starfield-bg flex flex-col items-center justify-center p-6 text-center shadow-card relative overflow-hidden ${className}`}>
      <div className="w-12 h-12 rounded-full bg-orange/20 border border-orange flex items-center justify-center text-orange text-xl mb-3">
        ▶
      </div>
      <h4 className="text-base font-bold text-surface uppercase mb-1">
        Video Coming Soon
      </h4>
      <p className="text-xs text-ink-faint max-w-sm mb-4">
        An animated 4K cinematic lesson for &ldquo;{title}&rdquo; is in mission production.
      </p>
      <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-night-soft border border-night-line text-yellow">
        ✦ Mission Briefing in Progress
      </span>
    </div>
  );
};
