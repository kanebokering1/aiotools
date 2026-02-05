"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Microsoft Clarity Component
 * 
 * FREE Analytics Tool with:
 * - Unlimited session recordings
 * - Heatmaps (clicks, scrolls, area)
 * - User behavior insights
 * - No traffic limits!
 * 
 * Setup: https://clarity.microsoft.com/
 * 1. Create account
 * 2. Add website
 * 3. Get Project ID
 * 4. Replace PROJECT_ID below
 */

export default function MicrosoftClarity() {
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // Initialize Clarity
    if (typeof window !== "undefined" && (window as any).clarity) {
      (window as any).clarity("consent");
    }
  }, []);

  // Only load in production
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
        `,
      }}
    />
  );
}

/*
 * SETUP INSTRUCTIONS:
 * ====================
 * 
 * 1. Go to: https://clarity.microsoft.com/
 * 2. Sign in with Microsoft account (free)
 * 3. Click "Add new project"
 * 4. Enter website details:
 *    - Name: AIO Tools
 *    - Website URL: https://aiotools.arthacodestudio.com
 * 5. Copy the Project ID (format: xxxxxxxxxx)
 * 6. Replace "YOUR_PROJECT_ID" above with your actual Project ID
 * 
 * Example:
 * Before: "clarity", "script", "YOUR_PROJECT_ID"
 * After:  "clarity", "script", "abc123xyz45"
 * 
 * FEATURES YOU'LL GET:
 * ====================
 * 
 * 📹 Session Recordings
 *    - Watch exactly how users interact with your tools
 *    - See where they click, scroll, and get stuck
 *    - Replay any user session
 * 
 * 🔥 Heatmaps
 *    - Click maps: Where users click most
 *    - Scroll maps: How far users scroll
 *    - Area maps: Which sections get most attention
 * 
 * 📊 Insights
 *    - Dead clicks (where users expect something to happen)
 *    - Rage clicks (frustrated users)
 *    - Quick backs (users leaving immediately)
 *    - JavaScript errors
 * 
 * 💰 Benefits for Revenue:
 *    - Optimize ad placement based on heatmaps
 *    - Fix UX issues causing user dropoff
 *    - Improve tool usability → more engagement → more ads viewed
 *    - FREE forever (no usage limits!)
 * 
 * NO CREDIT CARD REQUIRED! 🎉
 */

