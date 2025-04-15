import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/Auth/_lib/session'

const protectedRoutes = ['/dashboard', '/orders']
const publicRoutes = ['/signin', '/signup', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.toLowerCase()
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = req.cookies.get('session')?.value
  console.log('Cookie:', cookie);
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.exp) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }

  if (isPublicRoute && session?.exp ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}