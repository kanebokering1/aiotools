import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AdSenseScript from "@/components/AdSenseScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://aiotools.arthacodestudio.com";
const siteName = "AIO Tools - All-in-One Digital Tools Suite";
const siteDescription = "Free professional-grade online tools for all your digital needs. Compress images, remove backgrounds, merge PDFs, generate QR codes, convert videos, and more. No registration required, completely free, works offline.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | AIO Tools",
  },
  description: siteDescription,
  keywords: [
    "online tools",
    "free tools",
    "image compressor",
    "background remover",
    "PDF tools",
    "QR generator",
    "video converter",
    "text tools",
    "developer tools",
    "AIO tools",
    "all-in-one tools",
    "YouTube downloader",
    "TikTok downloader",
    "image converter",
    "PDF merger",
    "word counter",
    "JSON formatter",
    "color picker",
    "password generator",
  ],
  authors: [{ name: "ArthaCode Studio", url: "https://arthacodestudio.com" }],
  creator: "ArthaCode Studio",
  publisher: "AIO Tools by ArthaCode Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/aio.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AIO Tools - All-in-One Digital Tools Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: "@arthacodestudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AIO Tools',
    description: siteDescription,
    url: siteUrl,
    publisher: {
      '@type': 'Organization',
      name: 'ArthaCode Studio',
      url: 'https://arthacodestudio.com',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/aio.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Google AdSense Verification */}
        <meta name="google-adsense-account" content="ca-pub-3785229797706695" />
        
        {/* AdSense Script */}
        <AdSenseScript />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
