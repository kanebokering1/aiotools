"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AdBannerTop Component
 * 
 * Banner ad for top sections (below breadcrumbs, above content)
 * Size: 728x90 (Desktop) / 320x50 (Mobile)
 * 
 * SETUP AFTER ADSENSE APPROVAL:
 * 1. Get Ad Unit ID from AdSense dashboard
 * 2. Replace 'YOUR_AD_SLOT_ID' below with actual ID
 * 3. Uncomment the ad code
 * 
 * OPTIMAL PLACEMENT:
 * - Below breadcrumbs
 * - Above tool interface
 * - After page title
 * 
 * EXPECTED PERFORMANCE:
 * - CTR: 1-2%
 * - Viewability: 85-95%
 * - Revenue: Low-Medium
 */

interface AdBannerTopProps {
  slot?: string; // Ad Slot ID from AdSense
  className?: string;
}

export default function AdBannerTop({ slot = "YOUR_AD_SLOT_ID", className = "" }: AdBannerTopProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only load ads in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // Check if ad slot is configured
    if (slot === "YOUR_AD_SLOT_ID") {
      console.warn("AdBannerTop: Ad slot not configured yet. Set your Ad Unit ID after AdSense approval.");
      return;
    }

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            loadAd();
          }
        });
      },
      {
        rootMargin: "200px", // Load 200px before ad is visible
      }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, slot]);

  const loadAd = () => {
    try {
      // @ts-ignore
      if (window.adsbygoogle && slot !== "YOUR_AD_SLOT_ID") {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdBannerTop error:", err);
    }
  };

  // Don't show in development
  if (process.env.NODE_ENV !== "production") {
    return (
      <div className={`rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 p-4 text-center ${className}`}>
        <p className="text-sm text-gray-600 font-medium">
          📢 Ad Space: Banner Top (728x90)
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Will appear here after AdSense approval
        </p>
      </div>
    );
  }

  // Show placeholder if not configured
  if (slot === "YOUR_AD_SLOT_ID") {
    return null; // Hide if not configured in production
  }

  return (
    <div ref={adRef} className={`flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3785229797706695"
        data-ad-slot={slot}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}

/*
 * USAGE EXAMPLE:
 * ==============
 * 
 * import AdBannerTop from "@/components/ads/AdBannerTop";
 * 
 * function ToolPage() {
 *   return (
 *     <div>
 *       <Breadcrumbs />
 *       
 *       {/* Ad below breadcrumbs *\/}
 *       <AdBannerTop slot="1234567890" className="my-6" />
 *       
 *       <h1>Tool Title</h1>
 *       <ToolContent />
 *     </div>
 *   );
 * }
 * 
 * BEST PRACTICES:
 * ===============
 * 1. Always include className="my-6" for proper spacing
 * 2. Place AFTER breadcrumbs but BEFORE main content
 * 3. Don't place too many banner ads (max 2-3 per page)
 * 4. Monitor performance in AdSense dashboard
 * 5. A/B test different positions
 * 
 * PERFORMANCE TIPS:
 * =================
 * - Lazy loads when within 200px of viewport
 * - Responsive (adapts to mobile/desktop)
 * - Doesn't block page rendering
 * - Minimal performance impact
 */

