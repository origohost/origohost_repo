import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/**
 * Thin, accessible wrapper around shadcn's Switch so the cookie modal
 * has a single named component to import. Uses Radix under the hood,
 * which handles keyboard toggling (Space / Enter) and ARIA state.
 */
export interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
  className?: string;
}

export function ToggleSwitch({
  id,
  checked,
  onCheckedChange,
  disabled,
  label,
  className,
}: ToggleSwitchProps) {
  return (
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "data-[state=checked]:bg-[var(--brand-orange)] focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]",
        className,
      )}
    />
  );
}
