import { NextResponse } from 'next/server';
import { getEvents } from '@/services/events/events.service';
import type { EventStatus, EventDelivery, EventFormat } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = (searchParams.get('status') || 'All') as EventStatus | 'All';
  const delivery = (searchParams.get('delivery') || 'All') as EventDelivery | 'All';
  const format = (searchParams.get('format') || 'All') as EventFormat | 'All';
  const search = searchParams.get('search') || undefined;
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  const events = await getEvents({
    status,
    delivery,
    format,
    search,
    limit,
  });

  return NextResponse.json(
    {
      success: true,
      total: events.length,
      data: events,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}
