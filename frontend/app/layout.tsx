import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Valorant Assignment',
  description: 'Valorant Assignment - Next.js Frontend',
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
