import React from 'react';
import Image from 'next/image';
import { TransitionLink } from '@/components/motion/TransitionLink';

interface KakshaLogoProps {
  className?: string;
  showTagline?: boolean;
}

export const KakshaLogo: React.FC<KakshaLogoProps> = ({
  className = '',
  showTagline = true,
}) => {
  return (
    <TransitionLink href="/" className={`inline-flex items-center gap-2 group ${className}`}>
      <div className="relative h-12 w-auto flex items-center">
        {/* Crisp cropped authentic reference logo matching full reference scale */}
        <div className="relative w-40 h-10 sm:w-48 sm:h-12">
          <Image
            src="/assets/illustrations/kaksha_logo.png"
            alt="Kaksha — The Space Academy"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </div>
      {showTagline && (
        <span className="hidden md:inline-block text-xs font-hand text-ink-muted group-hover:text-ink transition-colors pl-2 border-l border-line ml-2 select-none">
          Seekho orbit se.
        </span>
      )}
    </TransitionLink>
  );
};
