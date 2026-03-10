import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 1. Force dynamic execution to ensure fresh environment variables
export const dynamic = 'force-dynamic';

/**
 * Singleton pattern for the Supabase Service Role client.
 * This ensures we don't recreate the client on every request,
 * but also guarantees env vars are present before initialization.
 */
const getSupabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase Environment Variables');
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 2. Robust Email Normalization
    const email = body?.email?.toString().trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 3. Using .upsert with ignoreDuplicates: true 
    // This is cleaner than manual error code checking for 23505
    const { data, error } = await supabase
      .from('waitlist')
      .upsert(
        { email },
        { onConflict: 'email', ignoreDuplicates: true }
      )
      .select();

    if (error) {
      console.error('[WAITLIST_ERROR]:', error.message);
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message: 'Successfully joined the waitlist',
      data: data?.[0] || { email }
    }, { status: 201 });

  } catch (err) {
    console.error('[SERVER_ERROR]:', err);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}