'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send } from 'lucide-react';
import { CrmPageHeader } from '@/features/crm/components';
import { sendCrmCommunication } from '@/services/crm/communications.service';

export default function NewCommunicationPage() {
  const router = useRouter();
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [snippet, setSnippet] = useState('');
  const [channel, setChannel] = useState<'Email' | 'SMS' | 'Notification'>('Email');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail.trim() || !subject.trim()) return;
    setIsSubmitting(true);

    const res = await sendCrmCommunication({
      recipientName: recipientName.trim() || 'Recipient',
      recipientEmail: recipientEmail.trim(),
      subject: subject.trim(),
      snippet: snippet.trim(),
      channel,
      status: 'Sent',
    });

    if (res.success) {
      router.push('/crm/communications');
    } else {
      alert('Failed to dispatch communication.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/crm/communications"
          className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Communications Hub
        </Link>
        <CrmPageHeader
          title="Send Communication / Email"
          subtitle="Dispatch an outreach message, speaker brief, or transactional notification."
        />
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-card bg-surface border border-border space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Recipient Name</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Recipient Email *</label>
            <input
              type="email"
              required
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="rahul.sharma@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Channel</label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as 'Email' | 'SMS' | 'Notification')}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Email" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Email</option>
              <option value="SMS" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">SMS</option>
              <option value="Notification" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">In-App Notification</option>
            </select>
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Subject *</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Speaker Briefing & Event Confirmation"
            />
          </div>
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Message Content / Snippet</label>
          <textarea
            rows={5}
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            placeholder="Enter message text, meeting link details, or briefing agenda..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? 'Dispatching Message...' : 'Dispatch Message'}
        </button>
      </form>
    </div>
  );
}
