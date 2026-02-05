"use client";

import { useEffect } from "react";

interface AdUnitProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  style?: React.CSSProperties;
  className?: string;
}

export default function AdUnit({ 
  adSlot, 
  adFormat = "auto", 
  style, 
  className = "" 
}: AdUnitProps) {
  useEffect(() => {
    // Only load ads in production
    if (process.env.NODE_ENV === "production") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, []);

  // Don't show ads in development
  if (process.env.NODE_ENV !== "production") {
    return (
      <div 
        className={`border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center ${className}`}
        style={style}
      >
        <span className="text-gray-500 text-sm font-medium">
          [Ad Placeholder - Production Only]
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-XXXXXXXXXX" // Replace with your AdSense ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

