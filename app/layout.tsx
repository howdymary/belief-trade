import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Belief Trade — Trade Belief',
  icons: { icon: '/belief-trade/favicon.svg' },
  description:
    'The future starts as someone’s belief. Explore five visions for portfolios built on conviction.',
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
