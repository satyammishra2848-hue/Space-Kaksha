import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface AppShellProps {
  children: React.ReactNode;
  navbarVariant?: 'logged-out' | 'logged-in' | 'auto';
  hideFooter?: boolean;
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  navbarVariant = 'auto',
  hideFooter = false,
  className = '',
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <Navbar variant={navbarVariant} />
      <main className={`flex-1 w-full ${className}`}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};
