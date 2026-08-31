'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserCheck, Search, Filter, ShieldCheck, Award, ArrowUpRight, Plus } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';


interface CommunityMember {
  id: string;
  name: string;
  email: string;
  role: 'VOLUNTEER' | 'MENTOR' | 'SPEAKER' | 'ORGANIZER' | 'PARTICIPANT';
  communityStatus: 'Active' | 'VIP' | 'Alumni';
  joinedDate: string;
}

const mockMembers: CommunityMember[] = [
  { id: 'mem-1', name: 'Dr. Evelyn Reed', email: 'evelyn@stanford.edu', role: 'MENTOR', communityStatus: 'VIP', joinedDate: '2026-01-15' },
  { id: 'mem-2', name: 'James Chen', email: 'jchen@devhub.io', role: 'SPEAKER', communityStatus: 'Active', joinedDate: '2026-03-10' },
  { id: 'mem-3', name: 'Sophia Taylor', email: 'sophia@nodecore.org', role: 'ORGANIZER', communityStatus: 'Active', joinedDate: '2026-02-01' },
];

export function CommunityView() {
  const [members, setMembers] = useState<CommunityMember[]>(mockMembers);
  const [search, setSearch] = useState('');

  const filteredMembers = members.filter((m) =>
    !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">Community Subsystem</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// MEMBERS & MENTORS'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Community Member Relationships
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Track community engagement roles (Volunteers, Mentors, Speakers, Organizers, VIPs).
          </Text>
        </div>
      </div>

      {/* Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMembers.map((m) => (
          <div key={m.id} className="p-5 rounded-card bg-surface border border-border shadow-2xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Heading as="h3" size="sm" className="text-ink font-bold">{m.name}</Heading>
                <span className="text-body-xs text-ink-muted block mt-0.5">{m.email}</span>
              </div>
              <Badge variant={m.role === 'MENTOR' || m.role === 'SPEAKER' ? 'primary' : 'info'} size="sm">
                {m.role}
              </Badge>
            </div>
            <div className="pt-3 border-t border-border/60 flex items-center justify-between text-body-xs">
              <span className="font-mono text-ink-muted text-[10px]">Joined: {m.joinedDate}</span>
              <Badge variant="success" size="sm">{m.communityStatus}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
