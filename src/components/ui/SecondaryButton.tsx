import React from 'react';
import { TransitionLink } from '@/components/motion/TransitionLink';

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
    sm: 'px-4 py-1.5 text-xs font-semibold',
    md: 'px-5 py-2 text-sm font-bold',
    lg: 'px-6 py-2.5 text-base font-bold',
  }[size];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-lg cursor-pointer transition-all duration-100 select-none text-center border-2 border-[#171715] bg-[#FFFEFA] text-[#171715] shadow-[3px_3px_0_#171715] hover:shadow-[4px_4px_0_#171715] hover:bg-[#F0EBE1] active:shadow-[1px_1px_0_#171715] active:translate-x-[2px] active:translate-y-[2px] ${sizeClasses} ${
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

