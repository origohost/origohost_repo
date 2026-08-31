import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  readonly label: string;
  readonly value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly SelectOption[];
  error?: boolean;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, error, placeholder, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            'w-full appearance-none px-4 py-2.5 pr-10 rounded-btn bg-surface text-ink text-body-md',
            'border transition-colors duration-150 ease-standard outline-none cursor-pointer',
            'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-elevated',
            error
              ? 'border-accent-pink focus-visible:ring-accent-pink'
              : 'border-border hover:border-border-strong focus:border-primary',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted flex items-center">
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
