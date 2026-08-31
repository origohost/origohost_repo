'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckSquare } from 'lucide-react';
import { CrmPageHeader } from '@/features/crm/components';
import { createCrmTask } from '@/services/crm/tasks.service';
import type { TaskPriority, TaskStatus } from '@/types/crm';

export default function NewTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedToName, setAssignedToName] = useState('System Operator');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [dueAt, setDueAt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);

    const res = await createCrmTask({
      title: title.trim(),
      description: description.trim(),
      assignedToName: assignedToName.trim(),
      priority,
      dueAt: dueAt || new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
      status: 'Pending',
    });

    if (res.success) {
      router.push('/crm/tasks');
    } else {
      alert('Failed to create task.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/crm/tasks"
          className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Tasks Roster
        </Link>
        <CrmPageHeader
          title="Create Operational Task"
          subtitle="Assign a follow-up action, event milestone, or partner outreach item."
        />
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-card bg-surface border border-border space-y-5">
        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Task Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="e.g. Schedule Speaker Keynote Pre-briefing for KSS2026 Ep 05"
          />
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Detailed Instructions / Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            placeholder="Key outcomes, contact links, or checklist items..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Assignee Name</label>
            <input
              type="text"
              value={assignedToName}
              onChange={(e) => setAssignedToName(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Low" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Low</option>
              <option value="Medium" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Medium</option>
              <option value="High" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">High</option>
              <option value="Urgent" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Due Date</label>
            <input
              type="date"
              value={dueAt}
              onChange={(e) => setDueAt(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <CheckSquare className="h-4 w-4" />
          {isSubmitting ? 'Creating Task...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}
