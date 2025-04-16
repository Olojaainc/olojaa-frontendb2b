import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/Auth/_lib/session'
import { cookies } from 'next/headers'

// Define your protected routes
const protectedRoutes = ['/dashboard', '/orders', '/account', '/settings']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  
  // Check if this is a protected route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  
  if (isProtectedRoute) {
    // Get and verify the session
    const cookie = req.cookies.get("session")?.value
    if (!cookie) {
      return NextResponse.redirect(new URL('/signin', req.nextUrl))
    }
    
    const session = await decrypt(cookie)
    if (!session?.exp || !session?.userId) {
      return NextResponse.redirect(new URL('/signin', req.nextUrl))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|favicon.ico|login|signin|signup|).*)']
}