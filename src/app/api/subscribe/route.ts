import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )
}

export async function POST(request: Request) {
  const { name, company, email, source } = await request.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }
  if (!name || !name.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  if (!company || !company.trim()) {
    return NextResponse.json({ error: 'Company is required' }, { status: 400 })
  }

  try {
    const supabase = getSupabase()
    const { error } = await supabase
      .from('demo_requests')
      .insert({
        email: email.toLowerCase().trim(),
        name: name.trim(),
        company: company.trim(),
        source: source || 'unknown',
      })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already registered!' })
      }
      throw error
    }

    return NextResponse.json({ message: 'Success!' })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
