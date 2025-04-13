import { NextResponse } from 'next/server';
import { db } from '@/db';
import { electionCandidates } from '@/db/schema';

export async function GET() {
  try {
    const candidates = await db.select().from(electionCandidates);

    return new NextResponse(JSON.stringify(candidates), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);

    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch candidates' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}
