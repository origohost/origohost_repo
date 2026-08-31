import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = 'text', startIcon, endIcon, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {startIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none flex items-center">
            {startIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            'w-full px-4 py-2.5 rounded-btn bg-surface text-ink text-body-md',
            'border transition-colors duration-150 ease-standard',
            'placeholder:text-ink-muted outline-none',
            'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-elevated',
            error
              ? 'border-accent-pink focus-visible:ring-accent-pink'
              : 'border-border hover:border-border-strong focus:border-primary',
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none flex items-center">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
