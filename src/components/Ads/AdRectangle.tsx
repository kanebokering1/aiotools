"use client";

import { useEffect, useRef, useState } from "react";

interface AdRectangleProps {
  size: "300x250" | "300x600" | "160x600";
  position: "sidebar" | "content" | "footer";
  className?: string;
}

export default function AdRectangle({ size, position, className = "" }: AdRectangleProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  const sizeMap = {
    "300x250": { width: 300, height: 250 },
    "300x600": { width: 300, height: 600 },
    "160x600": { width: 160, height: 600 },
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
    }, 1200);
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
          style={{ width, height }}
        >
          {adLoaded ? (
            // Mock ad content
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 from-green-900/30 to-blue-900/30">
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
