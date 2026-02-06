"use client";

interface ProgressBarProps {
  progress: number; // 0-100
  message?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({ 
  progress, 
  message,
  showPercentage = true 
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full space-y-2">
      {message && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">{message}</span>
          {showPercentage && (
            <span className="font-semibold text-violet-600">{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-600 transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
        >
          <div className="h-full w-full animate-pulse bg-gradient-to-r from-violet-400/50 to-violet-500/50"></div>
        </div>
      </div>
    </div>
  );
}

