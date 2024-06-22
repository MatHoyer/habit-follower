import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';

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
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>{children}</body>
    </html>
  );
}
