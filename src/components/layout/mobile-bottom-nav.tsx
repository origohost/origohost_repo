import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calendar, Users, Layers, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/events", icon: Calendar, label: "Events" },
  { href: "/domains", icon: Layers, label: "Explore", isPrimary: true },
  { href: "/community", icon: Users, label: "Community" },
  { href: "/dashboard", icon: User, label: "Profile" },
];

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 text-white backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center justify-center w-12 h-12 -mt-5 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/50 transform transition-transform active:scale-95 mx-2"
              >
                <Icon className="w-5 h-5" />
                <span className="sr-only">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 gap-1 min-w-[60px] min-h-[44px] transition-colors",
                isActive ? "text-blue-400 font-bold" : "text-slate-400 hover:text-white",
              )}
            >
              <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
