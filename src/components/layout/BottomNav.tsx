import { NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/calendar", icon: Calendar, label: "Agenda" },
  { to: "/messages", icon: MessageSquare, label: "Chat" },
  { to: "/profile", icon: User, label: "Perfil" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-area-inset-bottom">
      <div className="max-w-lg mx-auto relative">
        {/* Refraction layer on edges */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ filter: 'url(#glass-refract)' }}
        >
          <div className="absolute inset-0 bg-white/[0.03] rounded-3xl" />
        </div>
        
        {/* Glass container */}
        <div className="relative liquid-glass-nav rounded-3xl">
          {/* Specular highlight - subtle line at top */}
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {/* Nav items */}
          <div className="relative flex items-center justify-around h-14 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 px-4 py-2",
                    "transition-colors duration-200"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-white" : "text-zinc-500"
                    )}
                    strokeWidth={1.5}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-medium transition-colors",
                      isActive ? "text-white" : "text-zinc-500"
                    )}
                  >
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
