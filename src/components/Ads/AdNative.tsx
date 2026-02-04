"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

interface AdNativeProps {
  style: "card" | "list" | "inline";
  className?: string;
}

export default function AdNative({ style, className = "" }: AdNativeProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

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
    }, 800);
  };

  const mockAds = [
    {
      title: "Professional Design Tools",
      description: "Create stunning graphics with our premium design suite",
      image: "https://via.placeholder.com/300x200?text=Design+Tools",
      sponsor: "DesignPro",
    },
    {
      title: "Cloud Storage Solution",
      description: "Secure your files with 1TB free cloud storage",
      image: "https://via.placeholder.com/300x200?text=Cloud+Storage",
      sponsor: "CloudSafe",
    },
    {
      title: "Learn Programming Online",
      description: "Master coding with interactive tutorials and projects",
      image: "https://via.placeholder.com/300x200?text=Code+Academy",
      sponsor: "CodeLearn",
    },
  ];

  const randomAd = mockAds[Math.floor(Math.random() * mockAds.length)];

  if (style === "card") {
    return (
      <div ref={adRef} className={`${className}`}>
        {isVisible && (
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md border-gray-700 bg-white border border-gray-200">
            {adLoaded ? (
              <>
                <div className="aspect-video overflow-hidden rounded-t-xl bg-gray-100 bg-gray-700">
                  <img
                    src={randomAd.image}
                    alt={randomAd.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 text-gray-400">
                      Sponsored by {randomAd.sponsor}
                    </span>
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900 text-white">
                    {randomAd.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-gray-400">
                    {randomAd.description}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex h-64 items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
              </div>
            )}
            
            {/* Ad label */}
            <div className="absolute top-2 right-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
              Ad
            </div>
          </div>
        )}
      </div>
    );
  }

  if (style === "list") {
    return (
      <div ref={adRef} className={`${className}`}>
        {isVisible && (
          <div className="relative flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md border-gray-700 bg-white border border-gray-200">
            {adLoaded ? (
              <>
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 bg-gray-700">
                  <img
                    src={randomAd.image}
                    alt={randomAd.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500 text-gray-400">
                      Sponsored
                    </span>
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  </div>
                  <h3 className="mb-1 font-medium text-gray-900 text-white">
                    {randomAd.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-gray-400">
                    {randomAd.description}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex h-16 w-full items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
              </div>
            )}
            
            {/* Ad label */}
            <div className="absolute top-2 right-2 rounded bg-gray-200 px-1 text-xs text-gray-600 bg-gray-700 text-gray-400">
              Ad
            </div>
          </div>
        )}
      </div>
    );
  }

  // Inline style
  return (
    <div ref={adRef} className={`${className}`}>
      {isVisible && (
        <div className="relative rounded-lg border border-gray-200 bg-blue-50 p-4 border-gray-700 bg-blue-900/20">
          {adLoaded ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 text-xs text-blue-600 text-blue-400">
                  Sponsored Content
                </div>
                <div className="font-medium text-gray-900 text-white">
                  {randomAd.title}
                </div>
                <div className="text-sm text-gray-600 text-gray-400">
                  {randomAd.description}
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          ) : (
            <div className="flex h-16 items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent"></div>
            </div>
          )}
          
          {/* Ad label */}
          <div className="absolute top-2 right-2 rounded bg-blue-200 px-1 text-xs text-blue-800 bg-blue-800 text-blue-200">
            Ad
          </div>
        </div>
      )}
    </div>
  );
}
