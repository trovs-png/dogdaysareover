import { cn } from "@/lib/utils";

interface LedIndicatorProps {
  status: "online" | "offline" | "ai" | "pending";
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LedIndicator = ({
  status,
  pulse = false,
  size = "md",
  className,
}: LedIndicatorProps) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const statusClasses = {
    online: "bg-[#CFFF04] shadow-[0_0_8px_#CFFF04]",
    offline: "bg-[#FF2E9A] shadow-[0_0_8px_#FF2E9A]",
    ai: "bg-[#5D00FF] shadow-[0_0_8px_#5D00FF]",
    pending: "bg-[#5D00FF]/50 shadow-[0_0_8px_#5D00FF]/50",
  };

  return (
    <span
      className={cn(
        "inline-block rounded-full",
        sizeClasses[size],
        statusClasses[status],
        pulse && "animate-pulse",
        className
      )}
    />
  );
};
