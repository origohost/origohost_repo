import { NextResponse } from 'next/server';
import { authorizeCRMAction } from '@/lib/security/auth.boundary';
import { getOutboxMetrics } from '@/lib/events/outbox.processor';

export async function GET(request: Request) {
  const auth = await authorizeCRMAction('audit.read', request.headers);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  const metrics = getOutboxMetrics();
  return NextResponse.json({
    success: true,
    data: metrics,
  });
}
