import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface SkeletonCardProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
}

export function SkeletonCard({
  className,
  lines = 2,
  showAvatar = false,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl border border-border p-4 animate-pulse-soft",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {showAvatar && <Skeleton className="w-10 h-10 rounded-full shrink-0" />}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          {Array.from({ length: lines - 1 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-1/2" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonTimeline() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="w-12 h-4" />
          <SkeletonCard className="flex-1" lines={2} />
        </div>
      ))}
    </div>
  );
}

export function SkeletonBentoGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-28 rounded-2xl" />
    </div>
  );
}
