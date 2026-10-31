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
    sm: 'px-4 py-2 text-xs font-bold whitespace-nowrap',
    md: 'px-5 py-2.5 text-sm font-bold whitespace-nowrap',
    lg: 'px-7 py-3 text-base font-bold whitespace-nowrap',
  }[size];

  const variantClasses = {
    ink: 'bg-[#171715] text-[#F7F4ED] border-2 border-[#171715] shadow-[3px_3px_0_#171715] hover:shadow-[5px_5px_0_#171715] hover:bg-[#282723] active:shadow-[1px_1px_0_#171715] active:translate-x-[2px] active:translate-y-[2px]',
    orange: 'bg-[#F2A23A] text-[#171715] border-2 border-[#171715] shadow-[3px_3px_0_#171715] hover:shadow-[5px_5px_0_#171715] hover:bg-[#f5ad4e] active:shadow-[1px_1px_0_#171715] active:translate-x-[2px] active:translate-y-[2px]',
  }[variant];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-lg cursor-pointer transition-all duration-100 select-none text-center whitespace-nowrap ${sizeClasses} ${variantClasses} ${
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

