import { NextResponse } from 'next/server';
import { getPrograms } from '@/services/content/programs.service';
import type { ProgramStatus } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = (searchParams.get('status') || 'All') as ProgramStatus | 'All';
  const search = searchParams.get('search') || undefined;

  const programs = await getPrograms({ status, search });

  return NextResponse.json(
    {
      success: true,
      total: programs.length,
      data: programs,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}
