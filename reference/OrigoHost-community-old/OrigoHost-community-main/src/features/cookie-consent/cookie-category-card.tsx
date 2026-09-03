import { Lock } from "lucide-react";
import { ToggleSwitch } from "./toggle-switch";
import type { CookieCategoryMeta } from "./types";

export interface CookieCategoryCardProps {
  category: CookieCategoryMeta;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CookieCategoryCard({ category, checked, onChange }: CookieCategoryCardProps) {
  const inputId = `cookie-cat-${category.id}`;
  const descId = `${inputId}-desc`;
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-foreground/10 bg-background/50 p-4 transition-colors hover:bg-foreground/[0.03]">
      <div className="min-w-0 flex-1">
        <label
          htmlFor={inputId}
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          {category.title}
          {category.alwaysOn && (
            <span className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground/70">
              <Lock className="h-3 w-3" aria-hidden="true" /> Always on
            </span>
          )}
        </label>
        <p id={descId} className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </div>
      <div className="pt-0.5">
        <ToggleSwitch
          id={inputId}
          label={`${category.title} — ${category.alwaysOn ? "always enabled" : checked ? "enabled" : "disabled"}`}
          checked={checked}
          onCheckedChange={onChange}
          disabled={category.alwaysOn}
        />
      </div>
    </div>
  );
}
