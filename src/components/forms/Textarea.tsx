import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'w-full px-4 py-2.5 rounded-btn bg-surface text-ink text-body-md',
          'border min-h-[100px] resize-y transition-colors duration-150 ease-standard',
          'placeholder:text-ink-muted outline-none',
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-elevated',
          error
            ? 'border-accent-pink focus-visible:ring-accent-pink'
            : 'border-border hover:border-border-strong focus:border-primary',
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
