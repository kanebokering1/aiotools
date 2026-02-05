"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AdInArticle Component - NATIVE ADS (High CTR!)
 * 
 * In-article ads that blend with content
 * Format: Responsive/Native
 * 
 * BENEFITS:
 * - Blends naturally with content
 * - High CTR (users think it's content!)
 * - Mobile-friendly
 * - Good user experience
 * 
 * SETUP AFTER ADSENSE APPROVAL:
 * 1. Create "In-article ad" in AdSense
 * 2. Get Ad Unit ID
 * 3. Replace 'YOUR_AD_SLOT_ID' below
 * 
 * OPTIMAL PLACEMENT:
 * - After first paragraph (blog posts)
 * - Between tool sections
 * - Mid-content
 * - Before SEO content
 * 
 * EXPECTED PERFORMANCE:
 * - CTR: 3-5% ⭐⭐⭐
 * - Viewability: 80-90%
 * - Revenue: HIGH 💰💰
 */

interface AdInArticleProps {
  slot?: string;
  className?: string;
}

export default function AdInArticle({ 
  slot = "YOUR_AD_SLOT_ID",
  className = ""
}: AdInArticleProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (slot === "YOUR_AD_SLOT_ID") {
      console.warn("AdInArticle: Ad slot not configured yet.");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            loadAd();
          }
        });
      },
      { rootMargin: "250px" }
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
      console.error("AdInArticle error:", err);
    }
  };

  if (process.env.NODE_ENV !== "production") {
    return (
      <div className={`rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 p-6 text-center my-8 ${className}`}>
        <p className="text-sm text-gray-900 font-bold mb-2">
          📰 Ad Space: In-Article Native
        </p>
        <p className="text-xs text-gray-600 mb-1">
          Responsive / Native Format
        </p>
        <p className="text-xs text-blue-700 font-semibold">
          BLENDS WITH CONTENT!
        </p>
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-xs text-gray-600">
            Expected CTR: 3-5%<br/>
            Best for: Blog posts & articles
          </p>
        </div>
      </div>
    );
  }

  if (slot === "YOUR_AD_SLOT_ID") {
    return null;
  }

  return (
    <div ref={adRef} className={`my-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-3785229797706695"
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-ad-layout="in-article"
      />
    </div>
  );
}

/*
 * USAGE EXAMPLES:
 * ===============
 * 
 * 1. BLOG POST - After First Paragraph:
 * 
 * function BlogPost() {
 *   return (
 *     <article>
 *       <h1>Title</h1>
 *       <p>First paragraph...</p>
 *       
 *       <AdInArticle slot="1234567890" />
 *       
 *       <p>Continue content...</p>
 *     </article>
 *   );
 * }
 * 
 * 2. TOOL PAGE - Between Sections:
 * 
 * function ToolPage() {
 *   return (
 *     <div>
 *       <ToolInterface />
 *       
 *       <AdInArticle slot="1234567890" className="my-12" />
 *       
 *       <SEOContent />
 *     </div>
 *   );
 * }
 * 
 * BEST PRACTICES:
 * ===============
 * 1. Place after engaging content (users already interested)
 * 2. Don't place too close to other ads (min 250px apart)
 * 3. Max 3 in-article ads per page
 * 4. Use in blog posts for best results
 * 5. Test different positions
 * 
 * WHY THIS WORKS:
 * ===============
 * - Users are already reading/engaged
 * - Looks like content (not obviously an ad)
 * - Responsive (works on all devices)
 * - AdSense shows relevant ads (high match rate)
 * 
 * REVENUE OPTIMIZATION:
 * =====================
 * Blog posts with in-article ads typically earn:
 * - 2-3x more than banner ads
 * - $8-15 per 1000 views
 * - Best CTR of all ad formats
 * 
 * Perfect for content-heavy pages! 📰💰
 */

