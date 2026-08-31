import React from 'react';
import type { Metadata } from 'next';
import { AuditLogsView } from '@/features/crm/audit/AuditLogsView';

export const metadata: Metadata = {
  title: 'Audit Log Trail — CRM | OrigoHOST',
  description: 'Security audit trail of all operator actions, entity mutations, and data exports.',
};

export default function AuditPage() {
  return <AuditLogsView />;
}
