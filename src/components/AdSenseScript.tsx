"use client";

import Script from "next/script";

/**
 * Google AdSense Script Component
 * Publisher ID: ca-pub-3785229797706695
 * 
 * This component loads the AdSense script for ad serving
 * Only loads in production to avoid unnecessary requests during development
 */
export default function AdSenseScript() {
  // Only load AdSense in production
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3785229797706695"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

