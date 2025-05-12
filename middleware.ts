import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';

const protectedRoutes = ['']
const publicRoutes = ['/signin', '/signup', '/', '/dashboard', '/orders', '/deliveries']


export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = req.cookies.get("session")?.value
  let session: any = null;
  if (cookie) {
    session = jwt.decode(cookie);
  }

  if (isProtectedRoute && !session?.userId) {
    const redirectResponse = NextResponse.redirect(new URL('/signin', req.nextUrl));
    redirectResponse.headers.set("x-middleware-cache", "no-cache");
    return redirectResponse;
  }

  if (isPublicRoute && session?.userId ) {
    const redirectResponse = NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    redirectResponse.headers.set("x-middleware-cache", "no-cache");
    return redirectResponse;
  }

  return NextResponse.next()
}

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }
