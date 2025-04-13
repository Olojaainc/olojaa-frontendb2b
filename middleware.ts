import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/Auth/_lib/session'

const protectedRoutes = ['/dashboard', '/orders']
const publicRoutes = ['/signin', '/signup', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.toLowerCase()
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = req.cookies.get('session')?.value
  const session = await decrypt(cookie)

  // ✅ Step 1: Protected routes need valid session
  if (isProtectedRoute && (!session?.exp)) {
    // ✅ Prevent infinite redirect if already on /signin
    if (req.nextUrl.pathname !== '/signin') {
      return NextResponse.redirect(new URL('/signin', req.nextUrl))
    }
    return NextResponse.next()
  }

  // ✅ Step 2: Public routes, redirect to dashboard if already authenticated
  if (isPublicRoute && session?.exp && !req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}