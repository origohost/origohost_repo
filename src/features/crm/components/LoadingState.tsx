import React from 'react';

export function LoadingState() {
  return (
    <div className="space-y-4 p-6 rounded-card bg-surface border border-border animate-pulse">
      <div className="h-6 w-48 bg-surface-elevated rounded" />
      <div className="h-4 w-96 bg-surface-elevated rounded" />
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="h-20 bg-surface-elevated rounded-lg" />
        <div className="h-20 bg-surface-elevated rounded-lg" />
        <div className="h-20 bg-surface-elevated rounded-lg" />
      </div>
    </div>
  );
}
