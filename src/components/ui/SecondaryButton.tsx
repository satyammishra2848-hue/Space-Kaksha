import React from 'react';
import Link from 'next/link';

interface SecondaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  href,
  onClick,
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
}) => {
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-xs font-medium',
    md: 'px-5 py-2.5 text-sm font-semibold',
    lg: 'px-6 py-3 text-base font-bold',
  }[size];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-full cursor-pointer transition-all duration-150 select-none text-center border border-line bg-surface text-ink hover:border-ink hover:bg-paper-warm active:scale-98 ${sizeClasses} ${
    disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:shadow-xs'
  } ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={baseClasses}
    >
      {children}
    </button>
  );
};

