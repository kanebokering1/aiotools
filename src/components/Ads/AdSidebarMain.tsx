"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AdSidebarMain Component - HIGHEST EARNING AD UNIT! 💰
 * 
 * Sidebar ad for desktop users
 * Size: 300x600 (Half Page) or 300x250 (Medium Rectangle)
 * 
 * WHY THIS IS BEST:
 * - Always visible while scrolling (sticky)
 * - Large size = high CPM
 * - Doesn't interfere with content
 * - Desktop users = higher CPM
 * 
 * SETUP AFTER ADSENSE APPROVAL:
 * 1. Get Ad Unit ID from AdSense dashboard
 * 2. Replace 'YOUR_AD_SLOT_ID' below
 * 3. Uncomment ad code
 * 
 * OPTIMAL PLACEMENT:
 * - Right sidebar (desktop only)
 * - Sticky positioning
 * - Near top of content
 * 
 * EXPECTED PERFORMANCE:
 * - CTR: 3-5% ⭐⭐⭐
 * - Viewability: 90-100%
 * - Revenue: HIGH 💰💰💰
 */

interface AdSidebarMainProps {
  slot?: string;
  sticky?: boolean; // Make ad sticky (recommended!)
}

export default function AdSidebarMain({ 
  slot = "YOUR_AD_SLOT_ID",
  sticky = true 
}: AdSidebarMainProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (slot === "YOUR_AD_SLOT_ID") {
      console.warn("AdSidebarMain: Ad slot not configured yet.");
      return;
    }

    // Lazy load
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            loadAd();
          }
        });
      },
      { rootMargin: "300px" }
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
      console.error("AdSidebarMain error:", err);
    }
  };

  // Development placeholder
  if (process.env.NODE_ENV !== "production") {
    return (
      <div className={`${sticky ? "sticky top-8" : ""} hidden lg:block`}>
        <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-dashed border-green-300 p-6 text-center w-[300px]">
          <div className="mb-3">💰</div>
          <p className="text-sm text-gray-900 font-bold mb-2">
            Ad Space: Sidebar Main
          </p>
          <p className="text-xs text-gray-600 mb-1">
            300x600 or 300x250
          </p>
          <p className="text-xs text-green-700 font-semibold">
            HIGHEST EARNING POSITION!
          </p>
          <div className="mt-3 pt-3 border-t border-green-200">
            <p className="text-xs text-gray-600">
              Expected CTR: 3-5%<br/>
              Revenue: HIGH 💎
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (slot === "YOUR_AD_SLOT_ID") {
    return null;
  }

  return (
    <div 
      ref={adRef}
      className={`${sticky ? "sticky top-8" : ""} hidden lg:block`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3785229797706695"
        data-ad-slot={slot}
        data-ad-format="vertical"
        data-full-width-responsive="false"
      />
    </div>
  );
}

/*
 * USAGE EXAMPLE - SIDEBAR LAYOUT:
 * ================================
 * 
 * import AdSidebarMain from "@/components/ads/AdSidebarMain";
 * 
 * function ToolPage() {
 *   return (
 *     <div className="flex gap-8">
 *       {/* Main Content *\/}
 *       <main className="flex-1">
 *         <h1>Tool Title</h1>
 *         <ToolContent />
 *       </main>
 *       
 *       {/* Sidebar with Ad *\/}
 *       <aside className="w-[300px]">
 *         <AdSidebarMain 
 *           slot="1234567890" 
 *           sticky={true} 
 *         />
 *       </aside>
 *     </div>
 *   );
 * }
 * 
 * LAYOUT TIPS:
 * ============
 * 1. Reserve 300px width for sidebar
 * 2. Use flexbox layout (main + aside)
 * 3. Hide on mobile (handled automatically)
 * 4. Keep sticky for maximum visibility
 * 
 * MONETIZATION TIPS:
 * ==================
 * - This is your #1 money maker! 💰
 * - Always prioritize this ad unit
 * - If you can only have 1 ad, use this!
 * - Test 300x600 vs 300x250 (usually 600 wins)
 * - Monitor AdSense dashboard regularly
 * 
 * PERFORMANCE:
 * ============
 * - Lazy loads (performance-friendly)
 * - Sticky = always visible = high viewability
 * - Desktop-only = higher CPM
 * - Expected: $5-15 per 1000 views
 */

