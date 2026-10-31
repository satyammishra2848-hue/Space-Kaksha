import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface KakshaLogoProps {
  className?: string;
  showTagline?: boolean;
}

export const KakshaLogo: React.FC<KakshaLogoProps> = ({
  className = '',
  showTagline = true,
}) => {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 group ${className}`}>
      <div className="relative h-10 w-auto flex items-center">
        {/* Crisp cropped authentic reference logo */}
        <div className="relative w-28 h-8 sm:w-32 sm:h-9">
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
        <span className="hidden lg:inline-block text-xs font-hand text-ink-muted group-hover:text-ink transition-colors pl-1 border-l border-line ml-1">
          Seekho orbit se.
        </span>
      )}
    </Link>
  );
};
