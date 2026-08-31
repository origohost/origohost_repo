import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertOctagon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
  action?: React.ReactNode;
}

export function Alert({
  variant = 'info',
  title,
  onClose,
  action,
  className,
  children,
  ...props
}: AlertProps) {
  const configs = {
    info: {
      container: 'bg-primary/10 border-primary/20 text-ink',
      icon: <Info className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />,
    },
    success: {
      container: 'bg-accent-green/10 border-accent-green/20 text-ink',
      icon: <CheckCircle2 className="h-5 w-5 text-accent-green shrink-0" aria-hidden="true" />,
    },
    warning: {
      container: 'bg-accent-orange/10 border-accent-orange/20 text-ink',
      icon: <AlertTriangle className="h-5 w-5 text-accent-orange shrink-0" aria-hidden="true" />,
    },
    error: {
      container: 'bg-accent-pink/10 border-accent-pink/20 text-ink',
      icon: <AlertOctagon className="h-5 w-5 text-accent-pink shrink-0" aria-hidden="true" />,
    },
  };

  const { container, icon } = configs[variant];

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3.5 p-4 rounded-card border shadow-xs transition-colors duration-150',
        container,
        className
      )}
      {...props}
    >
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        {title && <h4 className="text-body-md font-semibold text-ink leading-snug">{title}</h4>}
        <div className="text-body-sm text-ink-secondary mt-0.5 leading-relaxed">{children}</div>
        {action && <div className="mt-3">{action}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss alert"
          className="text-ink-muted hover:text-ink p-1 rounded-btn transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
