"use client";

import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  size: "728x90" | "970x250" | "320x50";
  position: "top" | "middle" | "bottom";
  className?: string;
}

export default function AdBanner({ size, position, className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  const sizeMap = {
    "728x90": { width: 728, height: 90 },
    "970x250": { width: 970, height: 250 },
    "320x50": { width: 320, height: 50 },
  };

  const { width, height } = sizeMap[size];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !adLoaded) {
          setIsVisible(true);
          loadAd();
        }
      },
      { threshold: 0.1 }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [adLoaded]);

  const loadAd = () => {
    // Simulate ad loading
    setTimeout(() => {
      setAdLoaded(true);
    }, 1000);

    // In a real implementation, you would load actual ads here
    // Example for Google AdSense:
    // try {
    //   (window.adsbygoogle = window.adsbygoogle || []).push({});
    // } catch (e) {
    //   console.error('Ad loading failed:', e);
    // }
  };

  return (
    <div
      ref={adRef}
      className={`flex items-center justify-center ${className}`}
      style={{ minHeight: height }}
    >
      {isVisible && (
        <div
          className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 border-gray-700 bg-white border border-gray-200"
          style={{ width: Math.min(width, 320), height }}
        >
          {adLoaded ? (
            // Mock ad content
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 from-blue-900/30 to-purple-900/30">
              <div className="text-center">
                <div className="mb-2 text-sm font-semibold text-gray-700 text-gray-300">
                  Advertisement
                </div>
                <div className="text-xs text-gray-500 text-gray-400">
                  {size} • {position}
                </div>
              </div>
            </div>
          ) : (
            // Loading state
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
            </div>
          )}
          
          {/* Ad label */}
          <div className="absolute top-1 left-1 rounded bg-gray-200 px-1 text-xs text-gray-600 bg-gray-700 text-gray-400">
            Ad
          </div>
        </div>
      )}
    </div>
  );
}
