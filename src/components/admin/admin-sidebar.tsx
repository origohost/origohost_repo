import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { LogOut, ChevronLeft, ChevronRight, Search, Grip, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { WORKSPACES, WORKSPACE_OVERRIDES, ADMIN_PILLARS, slugify } from "@/config/admin";
import { BrandLogo } from "@/components/brand/brand-logo";

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState("Dashboard");
  const location = useLocation();
  const { signOut } = useAuth();

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  const currentWorkspace = WORKSPACES.find((w) => w.name === activeWorkspace) || WORKSPACES[0];

  return (
    <div className="hidden md:flex h-screen bg-white shrink-0">
      {/* 1. Thin Left Rail (Workspace Switcher) - Grouped by Pillar */}
      <aside className="w-16 flex flex-col items-center border-r border-[var(--brand-ink)]/10 bg-zinc-50/50 py-4 z-20">
        <div className="mb-4">
          <Link
            to="/"
            className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand-ink)] text-white shadow-sm transition-transform hover:scale-105"
          >
            <BrandLogo size={20} />
          </Link>
        </div>

        <div className="flex-1 w-full space-y-4 px-2 overflow-y-auto scrollbar-hide flex flex-col items-center">
          {ADMIN_PILLARS.map((pillar) => {
            const pillarWorkspaces = WORKSPACES.filter((w) => w.pillar === pillar.id);
            if (pillarWorkspaces.length === 0) return null;

            return (
              <div key={pillar.id} className="w-full flex flex-col items-center space-y-1.5 pt-1 border-t border-[var(--brand-ink)]/10 first:border-t-0 first:pt-0">
                <span className="text-[9px] font-black uppercase tracking-wider text-[var(--brand-ink)]/70 px-1 select-none">
                  {pillar.id.slice(0, 3)}
                </span>
                {pillarWorkspaces.map((ws) => (
                  <button
                    key={ws.name}
                    onClick={() => setActiveWorkspace(ws.name)}
                    title={`${ws.name} (${pillar.name} Pillar)`}
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-xl transition-all relative group",
                      activeWorkspace === ws.name
                        ? "bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] ring-1 ring-[var(--brand-orange)]/20"
                        : "text-[var(--brand-ink)]/75 hover:bg-[var(--brand-ink)]/10 hover:text-[var(--brand-ink)]",
                    )}
                  >
                    <ws.icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-4 w-full px-2">
          <button
            onClick={() => signOut()}
            title="Sign Out"
            className="grid h-10 w-10 place-items-center rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </aside>

      {/* 2. Primary Sidebar (Module Navigation) */}
      <aside
        className={cn(
          "relative flex flex-col border-r border-[var(--brand-ink)]/10 bg-white transition-all duration-300 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
          collapsed ? "w-0 overflow-hidden border-r-0 opacity-0" : "w-[260px] opacity-100",
        )}
      >
        <div className="flex flex-col justify-center px-6 py-4 border-b border-[var(--brand-ink)]/5 shrink-0 bg-zinc-50/30">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-orange)] font-mono">
            {currentWorkspace.pillar} PILLAR
          </span>
          <h2 className="font-bold text-[var(--brand-ink)] flex items-center gap-2 mt-0.5 text-base">
            <currentWorkspace.icon className="h-4 w-4 opacity-85 text-[var(--brand-orange)]" />
            {currentWorkspace.name}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
          <ul className="space-y-1">
            {currentWorkspace.items.map((item: any) => {
              const label = typeof item === "string" ? item : item.label;
              const isSearch = label.includes("Search");

              let href = "";
              if (typeof item === "string") {
                const slug = slugify(label);
                const workspaceSlug = slugify(currentWorkspace.name);
                href =
                  WORKSPACE_OVERRIDES[`${workspaceSlug}/${slug}`] ||
                  WORKSPACE_OVERRIDES[slug] ||
                  `/admin/${workspaceSlug}/${slug}`;
              } else {
                href = item.href;
              }

              const isActive = location.pathname === href;

              if (isSearch) {
                return (
                  <li key={label}>
                    <button
                      onClick={handleSearchClick}
                      className="group flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--brand-ink)]/80 hover:bg-[var(--brand-ink)]/5 hover:text-[var(--brand-ink)] transition-colors"
                    >
                      <Search className="h-4 w-4 mr-3 opacity-60" />
                      <span>{label}</span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={label}>
                  <Link
                    to={href}
                    className={cn(
                      "group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-[var(--brand-ink)]/5 text-[var(--brand-ink)] font-bold"
                        : "text-[var(--brand-ink)]/80 hover:bg-[var(--brand-ink)]/5 hover:text-[var(--brand-ink)]",
                    )}
                  >
                    <Grip className="h-3 w-3 mr-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Collapse Toggle floating on the edge */}
      <div className="relative z-30 flex items-center h-screen bg-transparent w-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--brand-ink)]/10 bg-white text-[var(--brand-ink)]/60 shadow-sm hover:text-[var(--brand-ink)] hover:shadow-md transition-all"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </div>
    </div>
  );
}
