import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIO Tools - All-in-One Tools for Everything",
  description: "Free professional-grade online tools for all your digital needs. Compress images, remove backgrounds, merge PDFs, generate QR codes, convert videos, and more. No registration required, completely free, works offline.",
  keywords: "online tools, free tools, image compressor, background remover, PDF tools, QR generator, video converter, text tools, developer tools, AIO tools, all-in-one tools",
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/aio.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
