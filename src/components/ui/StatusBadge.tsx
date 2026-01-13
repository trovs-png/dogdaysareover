import { cn } from "@/lib/utils";

type StatusVariant = "success" | "warning" | "info" | "magic" | "destructive";

interface StatusBadgeProps {
  variant: StatusVariant;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const variantStyles: Record<StatusVariant, string> = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  info: "bg-info/10 text-info border-info/20",
  magic: "bg-magic/10 text-magic border-magic/20",
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
};

export function StatusBadge({
  variant,
  children,
  className,
  icon,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full border",
        variantStyles[variant],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
