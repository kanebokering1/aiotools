"use client";

import AdUnit from "./AdUnit";

export default function AdSidebar() {
  return (
    <aside className="hidden lg:block w-[300px] flex-shrink-0 space-y-6">
      {/* Ad Unit 1 - Medium Rectangle */}
      <div className="sticky top-24">
        <p className="text-xs text-gray-500 text-center mb-2">Advertisement</p>
        <AdUnit
          adSlot="1234567890" // Replace with your ad slot ID
          style={{ width: "300px", height: "250px" }}
          className="rounded-lg overflow-hidden shadow-sm"
        />
      </div>

      {/* Ad Unit 2 - Large Rectangle (appears on scroll) */}
      <div className="sticky top-[400px]">
        <p className="text-xs text-gray-500 text-center mb-2">Advertisement</p>
        <AdUnit
          adSlot="0987654321" // Replace with your ad slot ID
          style={{ width: "300px", height: "600px" }}
          className="rounded-lg overflow-hidden shadow-sm"
        />
      </div>
    </aside>
  );
}

