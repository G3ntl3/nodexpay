import { Syne } from 'next/font/google';
import "./globals.css";

// Configure the font
const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={syne.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}