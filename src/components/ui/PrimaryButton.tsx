import React from 'react';
import Link from 'next/link';

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'ink' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'ink',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
}) => {
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-xs font-medium',
    md: 'px-5 py-2.5 text-sm font-semibold',
    lg: 'px-7 py-3.5 text-base font-bold',
  }[size];

  const variantClasses = {
    ink: 'bg-ink text-surface hover:bg-ink-soft active:bg-ink-soft border border-ink',
    orange: 'bg-orange text-ink hover:opacity-90 active:scale-98 border border-orange shadow-sm font-bold',
  }[variant];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-full cursor-pointer transition-all duration-150 select-none text-center ${sizeClasses} ${variantClasses} ${
    disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:shadow-card'
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

