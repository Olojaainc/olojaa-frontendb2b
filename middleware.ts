import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/Auth/_lib/session'
import { cookies } from 'next/headers'

const protectedRoutes = ['/dashboard', '/orders']
const publicRoutes = ['/signin', '/signup', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = (await cookies()).get("session")?.value;
  console.log('Cookie exists:', !!cookie);
  const session = await decrypt(cookie)
  console.log('Decrypted session:', session);


  if (isProtectedRoute) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }

  if (isPublicRoute && session?.expiresAt ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
