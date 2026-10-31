import type { Metadata } from 'next';
import { Space_Grotesk, Inter, Caveat } from 'next/font/google';
import './globals.css';
import { AppContextProvider } from '@/context/AppContext';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  fallback: ['Arial Rounded MT Bold', 'system-ui', 'sans-serif'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  fallback: ['Segoe UI', 'system-ui', 'sans-serif'],
});

const caveat = Caveat({
  variable: '--font-hand',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  fallback: ['Comic Sans MS', 'cursive'],
});

export const metadata: Metadata = {
  title: 'Kaksha — The Space Academy | Seekho orbit se',
  description: 'An illustrated space learning academy for curious minds. Guided missions, interactive simulations, and personal AI space tutor.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${caveat.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-paper text-ink font-body antialiased">
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
