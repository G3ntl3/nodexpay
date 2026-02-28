import { Syne } from 'next/font/google';
import { Metadata } from 'next';
import "./globals.css";

// Configure the font
const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Nodexpay - Crypto Access for Africa',
  description: 'Access crypto in Africa made simple. Buy, swap, and use cryptocurrency in everyday life with Nodexpay.',
  keywords: 'crypto, Africa, blockchain, payments, wallet',
  openGraph: {
    title: 'Nodexpay - Crypto Access for Africa',
    description: 'Access crypto in Africa made simple. Buy, swap, and use cryptocurrency in everyday life.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={syne.variable}>
      <>Nodexpay</>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}