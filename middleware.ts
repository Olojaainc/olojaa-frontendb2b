import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/Auth/_lib/session'

const protectedRoutes = ['/dashboard', '/orders']
const publicRoutes = ['/signin', '/signup', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = req.cookies.get("session")?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && (!session?.exp || !session?.userId)) {
    const redirectResponse = NextResponse.redirect(new URL('/signin', req.nextUrl));
    redirectResponse.headers.set("x-middleware-cache", "no-cache");
    return redirectResponse;
  }

  if (isPublicRoute && session?.exp && session?.userId) {
    const redirectResponse = NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    redirectResponse.headers.set("x-middleware-cache", "no-cache");
    return redirectResponse;
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|favicon.ico|login|).*)'],
}
