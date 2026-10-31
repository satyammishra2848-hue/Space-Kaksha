import React from 'react';
import { TransitionLink } from '@/components/motion/TransitionLink';

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
    sm: 'px-4 py-1.5 text-xs font-semibold',
    md: 'px-5 py-2.5 text-sm font-bold',
    lg: 'px-7 py-3 text-base font-bold',
  }[size];

  const variantClasses = {
    ink: 'bg-ink text-[var(--paper)] border-2 border-ink shadow-[3px_3px_0_var(--ink)] hover:shadow-[4px_4px_0_var(--ink)] active:shadow-[1px_1px_0_var(--ink)] active:translate-x-[2px] active:translate-y-[2px]',
    orange: 'bg-orange text-ink border-2 border-ink shadow-[3px_3px_0_var(--ink)] hover:shadow-[4px_4px_0_var(--ink)] active:shadow-[1px_1px_0_var(--ink)] active:translate-x-[2px] active:translate-y-[2px]',
  }[variant];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-lg cursor-pointer transition-all duration-100 select-none text-center ${sizeClasses} ${variantClasses} ${
    disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
  } ${className}`;

  if (href && !disabled) {
    return (
      <TransitionLink href={href} className={baseClasses} aria-label={ariaLabel}>
        {children}
      </TransitionLink>
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

