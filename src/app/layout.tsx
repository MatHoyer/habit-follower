import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

export const metadata = {
  title: 'Habit follower',
  description: 'follow preset habit',
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex justify-center">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
