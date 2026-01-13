import { Home, Calendar, MessageSquare, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/calendar", icon: Calendar, label: "Agenda" },
  { to: "/inbox", icon: MessageSquare, label: "Inbox" },
  { to: "/profile", icon: User, label: "Perfil" },
];

export const FloatingDock = () => {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
      <div className="flex items-center justify-around bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl py-3 px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive
                  ? "text-white bg-white/10"
                  : "text-white/40 hover:text-white/60"
              )
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
