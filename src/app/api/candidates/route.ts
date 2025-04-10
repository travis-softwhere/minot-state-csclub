import { NextResponse } from 'next/server';
import { db } from '@/db';
import { electionCandidates } from '@/db/schema';

export async function GET() {
  try {
    const candidates = await db.select().from(electionCandidates);
    return NextResponse.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 });
  }
} 