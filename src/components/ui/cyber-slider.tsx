import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface CyberSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string;
  showValue?: boolean;
  unit?: string;
}

export const CyberSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  CyberSliderProps
>(({ className, label, showValue, unit = "", ...props }, ref) => {
  const [value, setValue] = React.useState(props.defaultValue || [0]);

  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-white/60 text-sm">{label}</span>}
          {showValue && (
            <span className="text-white text-sm font-medium">
              {value[0]}
              {unit}
            </span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        onValueChange={setValue}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-white/10">
          <SliderPrimitive.Range className="absolute h-full bg-[#5D00FF]" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-[#5D00FF] bg-white shadow-[0_0_10px_rgba(93,0,255,0.5)] transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
});

CyberSlider.displayName = "CyberSlider";
