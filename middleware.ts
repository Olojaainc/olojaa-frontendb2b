import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/Auth/_lib/session'
import { cookies } from 'next/headers'

const protectedRoutes = ['/dashboard', '/orders']
const publicRoutes = ['/signin', '/signup', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => path === route)

  // Get the session cookie
  const sessionCookie = req.cookies.get("session")?.value
  
  // Check if the user has a valid session
  const hasValidSession = sessionCookie ? await isValidSession(sessionCookie) : false
  
  // Helper function to check session validity
  async function isValidSession(cookie: string) {
    try {
      const payload = await decrypt(cookie)
      // Check if session exists and hasn't expired
      if (!payload || !payload.expiresAt) return false
      
      // Check if session has expired
      const now = Math.floor(Date.now() / 1000)
      return typeof payload.expiresAt === 'number' && payload.expiresAt > now
    } catch (error) {
      return false
    }
  }

  // Redirect logic
  if (isProtectedRoute && !hasValidSession) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }

  if (isPublicRoute && hasValidSession) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
