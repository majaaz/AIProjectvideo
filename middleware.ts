import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // In production, verify Supabase session
  // const supabase = createClient()
  // const { data: { session } } = await supabase.auth.getSession()

  // For now, we'll just check for a basic auth cookie
  const session = request.cookies.get('sb-access-token')

  // Protected routes that require authentication
  const protectedPaths = ['/checkout', '/account']
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // Admin routes
  const adminPaths = ['/admin']
  const isAdminPath = adminPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // If accessing protected route without session, redirect to login
  if (isProtectedPath && !session) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If accessing admin route without admin role (would need proper auth check)
  if (isAdminPath) {
    // In production, verify user has admin role
    // For now, allow access to /admin for demonstration
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
