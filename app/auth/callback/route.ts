import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const role = searchParams.get('role') || 'buyer'

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Update user role
      if (data.user) {
        await supabase
          .from('users')
          .update({ role })
          .eq('id', data.user.id)
      }

      // Redirect to appropriate page based on role
      const redirectTo = role === 'seller' ? '/seller/dashboard' : '/'
      return NextResponse.redirect(`${origin}${redirectTo}`)
    }
  }

  // Redirect to login page on error
  return NextResponse.redirect(`${origin}/auth/login`)
}