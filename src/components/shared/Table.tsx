import React from 'react';
import { cn } from '@/lib/utils';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
}

export function Table({ className, striped = false, children, ...props }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-card border border-border bg-surface">
      <table
        className={cn(
          'w-full text-left text-body-sm text-ink border-collapse',
          striped && '[&_tbody_tr:nth-child(even)]:bg-surface-elevated/50',
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        'bg-surface-elevated border-b border-border text-ink-muted text-label-sm font-semibold uppercase tracking-wider',
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn('divide-y divide-border/60', className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn('hover:bg-surface-elevated/80 transition-colors duration-100', className)}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({
  className,
  children,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn('px-4 py-3.5 font-semibold text-ink', className)} {...props}>
      {children}
    </th>
  );
}

export function TableCell({
  className,
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('px-4 py-3.5 text-ink-secondary', className)} {...props}>
      {children}
    </td>
  );
}
