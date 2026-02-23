import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = (body?.email || '').toString().trim().toLowerCase()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      if (error.code === '23505') {
        return NextResponse.json({ ok: true })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, entry: data?.[0] })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: `Server error: ${err instanceof Error ? err.message : 'Unknown'}` }, { status: 500 })
  }
}
