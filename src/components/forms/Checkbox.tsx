import React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label: React.ReactNode;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, label, description, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex items-start gap-3">
        <div className="flex items-center h-5 mt-0.5">
          <input
            id={inputId}
            type="checkbox"
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            className={cn(
              'h-4 w-4 rounded-xs border transition-colors duration-150 ease-standard cursor-pointer',
              'text-primary accent-primary outline-none',
              'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-accent-pink'
                : 'border-border hover:border-border-strong',
              className
            )}
            {...props}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={inputId}
            className={cn(
              'text-body-sm font-medium text-ink cursor-pointer select-none',
              disabled && 'opacity-50 cursor-not-allowed',
              error && 'text-accent-pink'
            )}
          >
            {label}
          </label>
          {description && (
            <p className="text-body-xs text-ink-muted mt-0.5">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
