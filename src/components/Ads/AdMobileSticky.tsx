"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

/**
 * AdMobileSticky Component - MOBILE REVENUE! 📱
 * 
 * Sticky bottom ad for mobile users
 * Size: 320x50 or 320x100
 * 
 * WHY MOBILE MATTERS:
 * - 60-70% of traffic is mobile
 * - Mobile CPM growing fast
 * - Sticky = high viewability
 * - Always visible
 * 
 * SETUP AFTER ADSENSE APPROVAL:
 * 1. Get Mobile Ad Unit ID from AdSense
 * 2. Replace 'YOUR_AD_SLOT_ID' below
 * 3. Test on mobile device
 * 
 * FEATURES:
 * - Auto-hides when user scrolls up (better UX)
 * - Close button (AdSense policy compliant)
 * - Doesn't block content
 * - Smooth animations
 * 
 * EXPECTED PERFORMANCE:
 * - CTR: 1-2%
 * - Viewability: 95-100%
 * - Revenue: Medium-High (mobile)
 */

interface AdMobileStickyProps {
  slot?: string;
  closeable?: boolean; // Allow users to close ad
}

export default function AdMobileSticky({ 
  slot = "YOUR_AD_SLOT_ID",
  closeable = true
}: AdMobileStickyProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (slot === "YOUR_AD_SLOT_ID") {
      console.warn("AdMobileSticky: Ad slot not configured yet.");
      return;
    }

    // Load ad
    loadAd();

    // Handle scroll to show/hide
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, slot]);

  const loadAd = () => {
    try {
      // @ts-ignore
      if (window.adsbygoogle && slot !== "YOUR_AD_SLOT_ID") {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdMobileSticky error:", err);
    }
  };

  const handleClose = () => {
    setIsClosed(true);
    // Store in session to not show again
    sessionStorage.setItem("mobileAdClosed", "true");
  };

  // Check if already closed in session
  useEffect(() => {
    const wasClosed = sessionStorage.getItem("mobileAdClosed");
    if (wasClosed === "true") {
      setIsClosed(true);
    }
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-white border-t-2 border-blue-300 shadow-2xl p-2">
          <div className="mx-auto max-w-[320px] rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-purple-300 p-4 text-center relative">
            <button className="absolute top-1 right-1 text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
            <p className="text-sm text-gray-900 font-bold mb-1">
              📱 Ad Space: Mobile Sticky
            </p>
            <p className="text-xs text-gray-600 mb-1">
              320x50 or 320x100
            </p>
            <p className="text-xs text-purple-700 font-semibold">
              MOBILE REVENUE!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (slot === "YOUR_AD_SLOT_ID" || isClosed) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white border-t border-gray-200 shadow-2xl p-2 relative">
        {closeable && (
          <button
            onClick={handleClose}
            className="absolute top-1 right-1 rounded-full bg-gray-200 p-1 hover:bg-gray-300 transition-colors z-10"
            aria-label="Close ad"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        )}
        
        <div ref={adRef} className="mx-auto max-w-[320px]">
          <ins
            className="adsbygoogle"
            style={{ display: "inline-block", width: "320px", height: "50px" }}
            data-ad-client="ca-pub-3785229797706695"
            data-ad-slot={slot}
          />
        </div>
      </div>
    </div>
  );
}

/*
 * USAGE:
 * ======
 * 
 * import AdMobileSticky from "@/components/ads/AdMobileSticky";
 * 
 * function Layout({ children }) {
 *   return (
 *     <>
 *       {children}
 *       <AdMobileSticky slot="1234567890" closeable={true} />
 *     </>
 *   );
 * }
 * 
 * BEST PRACTICES:
 * ===============
 * 1. Only one per page (AdSense policy!)
 * 2. Always provide close button
 * 3. Auto-hide when scrolling down (better UX)
 * 4. Test visibility on different devices
 * 
 * UX CONSIDERATIONS:
 * ==================
 * - Don't block important content
 * - Smooth animations
 * - Easy to close
 * - Respects user scroll direction
 * - Session memory (doesn't re-appear if closed)
 * 
 * MOBILE REVENUE:
 * ===============
 * - 60-70% of users are mobile
 * - This ad catches ALL mobile users
 * - High viewability = good CPM
 * - Expected: $2-5 per 1000 mobile views
 * 
 * TOTAL MOBILE STRATEGY:
 * ======================
 * Mobile user journey:
 * 1. Visits page → Sees in-article ad (if blog)
 * 2. Uses tool → Sees mobile sticky
 * 3. Scrolls content → Sees in-content ads
 * 
 * Result: 2-3 ad impressions per mobile visit
 * Revenue: $5-10 per 1000 mobile visitors
 */

