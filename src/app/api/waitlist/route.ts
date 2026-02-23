import { NextResponse } from 'next/server'
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // PRIVATE KEY must have real newlines; replace escaped newlines if present
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

const db = admin.firestore()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = (body?.email || '').toString().trim().toLowerCase()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const id = encodeURIComponent(email)
    await db.collection('waitlist').doc(id).set({
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: `Server error: ${err instanceof Error ? err.message : 'Unknown'}` }, { status: 500 })
  }
}
