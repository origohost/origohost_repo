import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Search, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WORKSPACES, WORKSPACE_OVERRIDES, slugify } from "@/config/admin";
import { BrandLogo } from "@/components/brand/brand-logo";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import * as Collapsible from "@radix-ui/react-collapsible";

export function MobileAdminSidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();
  const [activeWorkspace, setActiveWorkspace] = useState(WORKSPACES[0].name);

  // Automatically find the workspace containing the active route
  // (simplified for this component)

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100/50 hover:bg-gray-100 text-[var(--brand-ink)] md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] p-0 flex flex-col bg-[#f8fafc] border-r-0 max-w-sm">
        <div className="flex h-16 items-center px-6 border-b border-[var(--brand-ink)]/5 shrink-0 bg-white">
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <BrandLogo size={24} />
            <span className="font-bold text-[var(--brand-ink)] tracking-tight">OrigoHOST</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-4">
            {WORKSPACES.map((ws) => (
              <Collapsible.Root
                key={ws.name}
                open={activeWorkspace === ws.name}
                onOpenChange={(isOpen) => {
                  if (isOpen) setActiveWorkspace(ws.name);
                }}
              >
                <Collapsible.Trigger className="flex w-full items-center justify-between rounded-xl px-4 py-3 bg-white border border-[var(--brand-ink)]/5 shadow-sm text-left">
                  <div className="flex items-center gap-3">
                    <ws.icon
                      className={cn(
                        "h-5 w-5",
                        activeWorkspace === ws.name
                          ? "text-[var(--brand-orange)]"
                          : "text-[var(--brand-ink)]/50",
                      )}
                    />
                    <span className="font-semibold text-[var(--brand-ink)] text-sm">
                      {ws.name}
                    </span>
                  </div>
                  {activeWorkspace === ws.name ? (
                    <ChevronDown className="h-4 w-4 text-[var(--brand-ink)]/40" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-[var(--brand-ink)]/40" />
                  )}
                </Collapsible.Trigger>

                <Collapsible.Content className="px-2 pt-2 pb-1 space-y-1">
                  {ws.items.map((item: any) => {
                    const label = typeof item === "string" ? item : item.label;
                    const isSearch = label.includes("Search");

                    let href = "";
                    if (typeof item === "string") {
                      const slug = slugify(label);
                      const workspaceSlug = slugify(ws.name);
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
                        <button
                          key={label}
                          onClick={handleSearchClick}
                          className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-[var(--brand-ink)]/70 hover:bg-black/5"
                        >
                          <Search className="h-4 w-4 mr-3 opacity-50" />
                          <span>{label}</span>
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={label}
                        to={href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-[var(--brand-ink)] text-white"
                            : "text-[var(--brand-ink)]/70 hover:bg-black/5",
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-50" />
                        <span>{label}</span>
                      </Link>
                    );
                  })}
                </Collapsible.Content>
              </Collapsible.Root>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-[var(--brand-ink)]/5 bg-white shrink-0">
          <button
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 text-red-600 px-4 py-3 text-sm font-bold transition-colors hover:bg-red-100"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
