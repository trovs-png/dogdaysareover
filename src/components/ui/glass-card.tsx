import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "lime" | "fuchsia" | "indigo";
  interactive?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, interactive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05]",
          variant === "lime" && "border-l-[4px] border-l-[#CFFF04]",
          variant === "fuchsia" && "border-l-[4px] border-l-[#FF2E9A]",
          variant === "indigo" && "border-l-[4px] border-l-[#5D00FF]",
          interactive && "cursor-pointer transition-all duration-200 hover:bg-white/[0.04] active:scale-[0.98]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
