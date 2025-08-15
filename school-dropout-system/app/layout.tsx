import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'School Dropout Detection System',
  description: 'Advanced AI-powered system for early detection and prevention of student dropouts',
  keywords: 'education, dropout prevention, student analytics, AI, machine learning',
  authors: [{ name: 'Education Tech Solutions' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'School Dropout Detection System',
    description: 'Advanced AI-powered system for early detection and prevention of student dropouts',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School Dropout Detection System',
    description: 'Advanced AI-powered system for early detection and prevention of student dropouts',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="h-full overflow-hidden">
        <Providers>
          <div className="h-full flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}