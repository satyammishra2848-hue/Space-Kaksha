// src/components/motion/TransitionLink.tsx
'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useTransitionContext } from '@/context/TransitionContext';

export interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  download?: any;
  rel?: string;
  'aria-label'?: string;
  title?: string;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  className = '',
  onClick,
  target,
  download,
  ...rest
}) => {
  const { navigateWithWipe } = useTransitionContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call consumer's onClick first
    if (onClick) onClick(e);

    // If default was already prevented by consumer, exit
    if (e.defaultPrevented) return;

    // Do NOT intercept modified clicks, downloads, or target="_blank"
    const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    const isMiddleClick = e.button === 1;
    const isSpecialTarget = target && target !== '_self';
    const isDownload = Boolean(download);

    const hrefString = typeof href === 'string' ? href : href.pathname || '';
    const isAnchorOnly = hrefString.startsWith('#');
    const isExternal = hrefString.startsWith('http://') || hrefString.startsWith('https://') || hrefString.startsWith('mailto:');

    if (isModified || isMiddleClick || isSpecialTarget || isDownload || isAnchorOnly || isExternal) {
      // Allow native browser behavior
      return;
    }

    // Intercept standard internal client-side navigation
    e.preventDefault();
    navigateWithWipe(hrefString);
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      target={target}
      download={download}
      {...rest}
    >
      {children}
    </Link>
  );
};
