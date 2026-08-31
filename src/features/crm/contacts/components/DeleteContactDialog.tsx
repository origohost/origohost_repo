'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Heading, Text } from '@/components/ui';

interface DeleteContactDialogProps {
  isOpen: boolean;
  contactName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteContactDialog({ isOpen, contactName, onConfirm, onCancel }: DeleteContactDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-card max-w-md w-full p-6 space-y-4 shadow-lg animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-rose-500/10 text-rose-500 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <Heading as="h3" size="sm" className="text-ink">
              Soft Delete Contact?
            </Heading>
            <Text size="xs" variant="muted" className="mt-0.5">
              Record for &quot;{contactName}&quot; will be marked as deleted.
            </Text>
          </div>
        </div>

        <p className="text-body-xs text-ink-secondary leading-relaxed bg-surface-elevated p-3 rounded-btn border border-border/40">
          <strong>Soft Delete Policy:</strong> This contact record will be flagged with a <code className="font-mono text-[10px] text-rose-500">deleted_at</code> timestamp. It can be restored at any time by an authorized CRM Admin.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-1.5 rounded-btn bg-surface border border-border text-body-xs font-semibold text-ink hover:bg-surface-elevated transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-1.5 rounded-btn bg-rose-600 text-white font-semibold text-body-xs hover:bg-rose-700 transition-colors shadow-xs"
          >
            Confirm Soft Delete
          </button>
        </div>
      </div>
    </div>
  );
}
