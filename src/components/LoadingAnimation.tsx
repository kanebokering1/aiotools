"use client";

import { Loader2 } from "lucide-react";

interface LoadingAnimationProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export default function LoadingAnimation({ 
  message = "Processing...", 
  size = "md",
  fullScreen = false 
}: LoadingAnimationProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-violet-600`} />
      {message && (
        <p className="text-sm font-medium text-slate-700 animate-pulse">{message}</p>
      )}
      <div className="flex gap-1">
        <div className="h-2 w-2 rounded-full bg-violet-600 animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="h-2 w-2 rounded-full bg-violet-600 animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="h-2 w-2 rounded-full bg-violet-600 animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {content}
    </div>
  );
}

