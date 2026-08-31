'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Filter,
  Clock,
  User,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type { CrmTaskItem, TaskPriority } from '@/types/crm';
import { toggleCrmTaskStatus, deleteCrmTask } from '@/services/crm/tasks.service';

interface TasksViewProps {
  initialTasks: CrmTaskItem[];
}

const statusOptions = ['All Statuses', 'Pending', 'In Progress', 'Completed'];
const priorityOptions = ['All Priorities', 'Low', 'Medium', 'High', 'Urgent'];

export function TasksView({ initialTasks }: TasksViewProps) {
  const [tasks, setTasks] = useState<CrmTaskItem[]>(initialTasks);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = statusFilter === 'All Statuses' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All Priorities' || t.priority === priorityFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      t.title.toLowerCase().includes(q) ||
      (t.description && t.description.toLowerCase().includes(q)) ||
      (t.assignedToName && t.assignedToName.toLowerCase().includes(q));

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleToggle = async (id: string) => {
    setTogglingId(id);
    const res = await toggleCrmTaskStatus(id);
    if (res.success && res.data) {
      setTasks((prev) => prev.map((item) => (item.id === id ? (res.data as CrmTaskItem) : item)));
    }
    setTogglingId(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete task "${title}"?`)) return;
    const res = await deleteCrmTask(id);
    if (res.success) {
      setTasks((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const totalTasks = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === 'Pending' || t.status === 'In Progress').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'Urgent':
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">CRM Module</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// OPERATIONAL TASKS & TO-DOS'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Operational Tasks & Milestones
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Manage team follow-ups, speaker outreach assignments, and partner onboarding deadlines.
          </Text>
        </div>
        <Link
          href="/crm/tasks/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs"
        >
          <Plus className="h-4 w-4" />
          Create Task
        </Link>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <CheckSquare className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Total Tasks</span>
            <span className="text-heading-sm font-bold text-ink">{totalTasks} Tasks</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-amber/10 text-accent-amber">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Pending Tasks</span>
            <span className="text-heading-sm font-bold text-ink">{pendingCount} Pending</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-emerald/10 text-accent-emerald">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Completed Milestones</span>
            <span className="text-heading-sm font-bold text-ink">{completedCount} Completed</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-surface p-4 rounded-card border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search tasks by title, assigned operator, or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-ink-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {priorityOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-surface rounded-card border border-border space-y-3">
            <CheckSquare className="h-10 w-10 text-ink-muted mx-auto" />
            <Heading as="h3" size="sm" className="text-ink">
              No Operational Tasks Found
            </Heading>
            <Text size="xs" variant="muted">
              Try adjusting your search query or filters.
            </Text>
          </div>
        ) : (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-card bg-surface border transition-colors flex items-center justify-between gap-4 ${
                t.status === 'Completed' ? 'border-border/60 opacity-70' : 'border-border hover:border-primary/40'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => handleToggle(t.id)}
                  disabled={togglingId === t.id}
                  className="mt-0.5 text-primary hover:text-primary-hover transition-colors"
                >
                  {t.status === 'Completed' ? (
                    <CheckSquare className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Square className="h-5 w-5 text-ink-muted" />
                  )}
                </button>

                <div>
                  <span
                    className={`font-bold text-body-sm block ${
                      t.status === 'Completed' ? 'line-through text-ink-muted' : 'text-ink'
                    }`}
                  >
                    {t.title}
                  </span>
                  {t.description && (
                    <p className="text-body-xs text-ink-muted mt-0.5 line-clamp-1">{t.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-ink-muted">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3 text-primary" /> {t.assignedToName || t.assignee || 'Unassigned'}
                    </span>
                    {(t.dueAt || t.dueDate) && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-primary" /> Due: {t.dueAt || t.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={getPriorityBadge(t.priority)} size="sm">
                  {t.priority}
                </Badge>
                <button
                  onClick={() => handleDelete(t.id, t.title)}
                  className="p-1.5 rounded text-ink-muted hover:text-accent-rose transition-colors"
                  title="Delete Task"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
