import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  label: React.ReactNode;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function FormField({
  label,
  error,
  required,
  hint,
  children,
  id,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-label-md font-semibold text-ink flex items-center gap-1 select-none"
        >
          {label}
          {required && (
            <span className="text-accent-pink" title="Required field" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {hint && <span className="text-body-xs text-ink-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <span
          id={id ? `${id}-error` : undefined}
          role="alert"
          className="text-body-xs font-medium text-accent-pink mt-0.5 flex items-center gap-1.5 animate-fade-up"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </span>
      )}
    </div>
  );
}
