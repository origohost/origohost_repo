'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { CrmPageHeader, FilterBar, DataTableShell, ConfirmDialog } from '@/features/crm/components';
import { ContactTable } from '@/features/crm/contacts/components/ContactTable';
import { getContacts, deleteContact, archiveContact, restoreContact } from '@/services/crm/contacts.service';
import type { Contact } from '@/types/crm';

export default function ContactsPage() {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('Active');
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(null);

  const loadData = React.useCallback(async () => {
    const res = await getContacts(searchQuery, statusFilter);
    if (res.data) setContacts(res.data);
  }, [searchQuery, statusFilter]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async () => {
    if (deleteTargetId) {
      await deleteContact(deleteTargetId);
      setDeleteTargetId(null);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <CrmPageHeader
        title="Contacts & Ecosystem Roster"
        subtitle="Manage leads, participants, mentors, speakers, and enterprise partner contacts."
        badgeText={`${contacts.length} Records`}
        actions={
          <Link
            href="/crm/contacts/new"
            className="px-4 py-2 rounded-btn bg-primary text-white font-semibold text-body-sm flex items-center gap-1.5 shadow-xs hover:bg-primary-hover transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Contact
          </Link>
        }
      />

      <FilterBar
        searchPlaceholder="Search contacts by name, email, or role..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filterLabel="Status"
        filterValue={statusFilter}
        filterOptions={[
          { label: 'Active Contacts', value: 'Active' },
          { label: 'Leads', value: 'Lead' },
          { label: 'Engaged', value: 'Engaged' },
          { label: 'Inactive', value: 'Inactive' },
          { label: 'Archived', value: 'Archived' },
        ]}
        onFilterChange={setStatusFilter}
      />

      <DataTableShell
        footer={
          <div className="flex items-center justify-between">
            <span>Showing {contacts.length} records</span>
            <span className="font-mono text-[11px]">Audit Engine Active</span>
          </div>
        }
      >
        <ContactTable contacts={contacts} onDelete={(id) => setDeleteTargetId(id)} />
      </DataTableShell>

      {deleteTargetId && (
        <ConfirmDialog
          isOpen={true}
          title="Delete Contact Record"
          message="Are you sure you want to delete this contact? Soft-delete policy will set status to Deleted."
          confirmText="Soft Delete"
          variant="danger"
          onConfirm={handleDelete}
          onClose={() => setDeleteTargetId(null)}
        />
      )}
    </div>
  );
}
