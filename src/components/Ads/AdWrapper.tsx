"use client";

import { ReactNode, useEffect, useState } from "react";

interface AdWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export default function AdWrapper({ children, fallback, className = "" }: AdWrapperProps) {
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple ad blocker detection
    const detectAdBlocker = () => {
      const testAd = document.createElement("div");
      testAd.innerHTML = "&nbsp;";
      testAd.className = "adsbox";
      testAd.style.position = "absolute";
      testAd.style.left = "-9999px";
      document.body.appendChild(testAd);

      setTimeout(() => {
        if (testAd.offsetHeight === 0) {
          setAdBlockerDetected(true);
        }
        document.body.removeChild(testAd);
        setIsLoading(false);
      }, 100);
    };

    detectAdBlocker();
  }, []);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
      </div>
    );
  }

  if (adBlockerDetected && fallback) {
    return <div className={className}>{fallback}</div>;
  }

  if (adBlockerDetected) {
    return (
      <div className={`rounded-lg border border-gray-200 bg-gray-50 p-4 text-center border-gray-700 bg-white border border-gray-200 ${className}`}>
        <div className="text-sm text-gray-600 text-gray-400">
          <p className="mb-2 font-medium">Support Our Free Tools</p>
          <p>Consider disabling your ad blocker to help us keep these tools free for everyone.</p>
        </div>
      </div>
    );
  }

  return <div className={className}>{children}</div>;
}
