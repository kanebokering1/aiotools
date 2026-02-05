"use client";

import AdUnit from "./AdUnit";

interface AdBannerProps {
  position?: "top" | "middle" | "bottom";
}

export default function AdBanner({ position = "middle" }: AdBannerProps) {
  return (
    <div className="my-8 flex justify-center">
      <div className="w-full max-w-[728px]">
        <p className="text-xs text-gray-500 text-center mb-2">Advertisement</p>
        <AdUnit
          adSlot="1111111111" // Replace with your ad slot ID
          style={{ width: "728px", height: "90px" }}
          className="mx-auto rounded-lg overflow-hidden shadow-sm"
        />
      </div>
    </div>
  );
}

// Mobile sticky banner
export function AdMobileSticky() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-lg">
      <p className="text-xs text-gray-500 text-center pt-1">Advertisement</p>
      <AdUnit
        adSlot="2222222222" // Replace with your ad slot ID
        style={{ width: "320px", height: "50px" }}
        className="mx-auto"
      />
    </div>
  );
}

