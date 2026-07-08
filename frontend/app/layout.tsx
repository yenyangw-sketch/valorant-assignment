import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'APU Valorant Club',
  description: 'APU Valorant Club - Play • Compete • Improve Together',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
