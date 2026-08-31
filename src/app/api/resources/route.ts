import { NextResponse } from 'next/server';
import { getResources } from '@/services/content/resources.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'All';
  const search = searchParams.get('search') || undefined;

  const resources = await getResources({ category, search });

  return NextResponse.json(
    {
      success: true,
      total: resources.length,
      data: resources,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}
