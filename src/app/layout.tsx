// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from './components/NavBar';
import ClientProvider from './components/client-provider'; // Import ClientProvider

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Subletify",
  description: "Sublet apartments and sell furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ backgroundColor: 'white' }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* This is still server-side */}
        
        {/* Wrap all client-side components with ClientProvider */}
        <ClientProvider>
        <Navbar />
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
