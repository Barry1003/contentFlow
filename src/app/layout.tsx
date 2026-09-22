import type { Metadata } from "next";
import "../index.css"; // Relative to src/app

export const metadata: Metadata = {
  title: "ContentFlow — Social Media Content Calendar & Tracker",
  description: "A mobile-friendly content calendar maker and performance tracker for social media creators with AI assistance, ideas bank, and analytics.",
};

import { Providers } from './providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
