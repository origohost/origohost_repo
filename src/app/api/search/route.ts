import { NextResponse } from 'next/server';
import { searchEcosystem, type SearchResultType } from '@/services/search/search.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const typeParam = (searchParams.get('type') || 'all') as SearchResultType | 'all';
  const limitParam = parseInt(searchParams.get('limit') || '50', 10);

  const { results, total } = await searchEcosystem(q, {
    type: typeParam,
    limit: isNaN(limitParam) ? 50 : limitParam,
  });

  return NextResponse.json(
    {
      success: true,
      query: q,
      total,
      data: results,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    }
  );
}
