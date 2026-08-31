import { NextResponse } from 'next/server';
import { getCRMSession } from '@/lib/security/auth.boundary';
import { getLeads, createLead } from '@/services/crm/leads.service';

export async function GET() {
  const session = await getCRMSession();
  if (!session.isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await getLeads();
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const session = await getCRMSession();
  if (!session.isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const result = await createLead(body);
  return NextResponse.json(result, { status: 201 });
}
