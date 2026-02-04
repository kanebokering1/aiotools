"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface AdConfig {
  enabled: boolean;
  maxAdsPerPage: number;
  refreshInterval: number;
  networks: string[];
}

interface AdContextType {
  config: AdConfig;
  adsShown: number;
  canShowAd: () => boolean;
  incrementAdCount: () => void;
  resetAdCount: () => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

interface AdManagerProps {
  children: ReactNode;
  config?: Partial<AdConfig>;
}

const defaultConfig: AdConfig = {
  enabled: true,
  maxAdsPerPage: 4,
  refreshInterval: 30000, // 30 seconds
  networks: ["adsense", "media.net"],
};

export function AdManager({ children, config: userConfig }: AdManagerProps) {
  const [config] = useState<AdConfig>({ ...defaultConfig, ...userConfig });
  const [adsShown, setAdsShown] = useState(0);

  useEffect(() => {
    // Reset ad count when page changes
    const handleRouteChange = () => {
      setAdsShown(0);
    };

    // Listen for route changes (if using Next.js router)
    window.addEventListener("popstate", handleRouteChange);
    
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const canShowAd = () => {
    return config.enabled && adsShown < config.maxAdsPerPage;
  };

  const incrementAdCount = () => {
    setAdsShown(prev => prev + 1);
  };

  const resetAdCount = () => {
    setAdsShown(0);
  };

  const contextValue: AdContextType = {
    config,
    adsShown,
    canShowAd,
    incrementAdCount,
    resetAdCount,
  };

  return (
    <AdContext.Provider value={contextValue}>
      {children}
    </AdContext.Provider>
  );
}

export function useAdManager() {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error("useAdManager must be used within an AdManager");
  }
  return context;
}

// Analytics tracking
export const trackAdView = (adType: string, position: string) => {
  // In a real implementation, send to analytics service
  console.log(`Ad viewed: ${adType} at ${position}`);
  
  // Example: Google Analytics
  // gtag('event', 'ad_view', {
  //   ad_type: adType,
  //   position: position,
  // });
};

export const trackAdClick = (adType: string, position: string) => {
  // In a real implementation, send to analytics service
  console.log(`Ad clicked: ${adType} at ${position}`);
  
  // Example: Google Analytics
  // gtag('event', 'ad_click', {
  //   ad_type: adType,
  //   position: position,
  // });
};
