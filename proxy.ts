// app/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Public routes (accessible without authentication)
  const publicRoutes = ['/', '/login', '/register', '/forgot-password']
  const isPublicPath = publicRoutes.includes(path)
  
  // Protected routes (require authentication)
  const protectedRoutes = ['/dashboard', '/shipments', '/drivers', '/tracking', '/analytics']
  const isProtectedPath = protectedRoutes.some(route => path.startsWith(route))
  
  // Check for auth cookie
  const authCookie = request.cookies.get('auth_user')
  const isAuthenticated = !!authCookie
  
  // Debug logging
  console.log(`🔍 Middleware: Path=${path}, IsPublic=${isPublicPath}, IsProtected=${isProtectedPath}, IsAuth=${isAuthenticated}`)
  
  // Redirect logic
  if (isProtectedPath && !isAuthenticated) {
    console.log('🔄 Middleware: Redirecting to login (protected route)')
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (isPublicPath && isAuthenticated && path !== '/') {
    console.log('🔄 Middleware: Redirecting to dashboard (already logged in)')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}