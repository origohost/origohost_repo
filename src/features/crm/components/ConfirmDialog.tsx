'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs">
      <div className="bg-surface border border-border rounded-card max-w-md w-full p-6 space-y-4 shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-rose-500/10 text-rose-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="text-body-md font-bold text-ink">{title}</h3>
          </div>
          <button onClick={onClose} className="text-ink-muted hover:text-ink">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-body-sm text-ink-secondary">{message}</p>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-body-sm font-semibold rounded-btn bg-surface-elevated border border-border text-ink hover:bg-surface"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-body-sm font-semibold rounded-btn bg-rose-600 text-white hover:bg-rose-700 shadow-xs"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
