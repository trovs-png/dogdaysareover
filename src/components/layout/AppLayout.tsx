import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-zinc-900 via-[#09090b] to-[#050505] relative overflow-hidden">
      {/* SVG Filter for glass refraction effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="glass-refract" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Aurora Light Flares - Subtle colored hints */}
      <div className="pointer-events-none fixed top-0 right-0 w-96 h-96 bg-violet-500/[0.03] blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="pointer-events-none fixed top-20 left-0 w-64 h-64 bg-emerald-500/[0.02] blur-3xl rounded-full -translate-x-1/2" />
      
      {/* Main content area with bottom padding for floating nav */}
      <main className="pb-28 min-h-screen relative z-10">
        <Outlet />
      </main>

      {/* Floating bottom navigation */}
      <BottomNav />
    </div>
  );
}
