import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Command } from "cmdk";
import {
  Search,
  LayoutDashboard,
  Globe,
  Calendar,
  BookOpen,
  Gift,
  Users,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { WORKSPACES, WORKSPACE_OVERRIDES, slugify } from "@/config/admin";
import { useAuth } from "@/hooks/use-auth";

const DASHBOARD_ITEMS = [
  { label: "My Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Events", href: "/dashboard/events", icon: Calendar },
  { label: "Learning Hub", href: "/dashboard/learning", icon: BookOpen },
  { label: "Rewards & XP", href: "/dashboard/rewards", icon: Gift },
  { label: "Certificates", href: "/dashboard/certificates", icon: GraduationCap },
  { label: "Community", href: "/dashboard/community", icon: Users },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { roles } = useAuth();
  const isAdmin = roles.includes("admin") || roles.includes("super_admin");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed left-1/2 top-1/2 z-[100] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[var(--brand-ink)]/10 bg-white/80 p-0 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200"
    >
      <div className="flex items-center border-b border-[var(--brand-ink)]/10 px-4">
        <Search className="mr-2 h-5 w-5 shrink-0 opacity-50" />
        <Command.Input
          placeholder={
            isAdmin ? "Search 150+ workspaces and modules..." : "Search dashboard and community..."
          }
          className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-[var(--brand-ink)]/50 focus:outline-none"
        />
        <div className="ml-2 flex items-center gap-1 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-[var(--brand-ink)]/60">
          <kbd className="font-sans">⌘</kbd>
          <kbd className="font-sans">K</kbd>
        </div>
      </div>

      <Command.List className="max-h-[350px] overflow-y-auto overflow-x-hidden p-2 scrollbar-hide">
        <Command.Empty className="py-6 text-center text-sm text-[var(--brand-ink)]/50">
          No results found for your search.
        </Command.Empty>

        <Command.Group
          heading="Global Actions"
          className="px-2 py-1.5 text-xs font-semibold text-[var(--brand-ink)]/40"
        >
          <Command.Item
            onSelect={() => runCommand(() => router.navigate({ to: "/" }))}
            className="flex cursor-pointer items-center rounded-lg px-2 py-2.5 text-sm font-medium transition-colors aria-selected:bg-[var(--brand-ink)]/5 aria-selected:text-[var(--brand-ink)]"
          >
            <Globe className="mr-2 h-4 w-4 opacity-50" /> Return to Public Site
          </Command.Item>
          {isAdmin && (
            <Command.Item
              onSelect={() => runCommand(() => router.navigate({ to: "/admin" }))}
              className="flex cursor-pointer items-center rounded-lg px-2 py-2.5 text-sm font-medium transition-colors aria-selected:bg-[var(--brand-ink)]/5 aria-selected:text-[var(--brand-ink)]"
            >
              <ShieldCheck className="mr-2 h-4 w-4 text-[var(--brand-orange)] opacity-80" /> Admin
              Dashboard
            </Command.Item>
          )}
        </Command.Group>

        <Command.Group
          heading="Member Portal"
          className="px-2 py-1.5 text-xs font-semibold text-[var(--brand-ink)]/40 mt-2"
        >
          {DASHBOARD_ITEMS.map((item) => (
            <Command.Item
              key={item.href}
              value={item.label}
              onSelect={() => runCommand(() => router.navigate({ to: item.href as any }))}
              className="flex cursor-pointer items-center rounded-lg px-2 py-2.5 text-sm font-medium transition-colors aria-selected:bg-[var(--brand-ink)]/5 aria-selected:text-[var(--brand-ink)]"
            >
              <item.icon className="mr-2 h-4 w-4 opacity-50" />
              {item.label}
            </Command.Item>
          ))}
        </Command.Group>

        {isAdmin &&
          WORKSPACES.map((ws) => (
            <Command.Group
              key={ws.name}
              heading={ws.name + " Workspace"}
              className="px-2 py-1.5 text-xs font-semibold text-[var(--brand-ink)]/40 mt-2"
            >
              {ws.items.map((item: any) => {
                const label = typeof item === "string" ? item : item.label;
                if (label.includes("Search")) return null;

                let href = "";
                if (typeof item === "string") {
                  const slug = slugify(label);
                  href = WORKSPACE_OVERRIDES[slug] || `/admin/${slugify(ws.name)}/${slug}`;
                } else {
                  href = item.href;
                }

                return (
                  <Command.Item
                    key={href}
                    value={`${ws.name} ${label}`}
                    onSelect={() => runCommand(() => router.navigate({ to: href as string & {} }))}
                    className="flex cursor-pointer items-center rounded-lg px-2 py-2.5 text-sm font-medium transition-colors aria-selected:bg-[var(--brand-ink)]/5 aria-selected:text-[var(--brand-ink)]"
                  >
                    <ws.icon className="mr-2 h-4 w-4 opacity-50" />
                    <span className="text-[var(--brand-ink)]/60 mr-2">{ws.name} &rarr;</span>
                    {label}
                  </Command.Item>
                );
              })}
            </Command.Group>
          ))}
      </Command.List>
    </Command.Dialog>
  );
}
