import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import { rateLimit } from './lib/rateLimit'

// Keep NextAuth protection for /dashboard, add rate limiting for auth/register/upload APIs
const authMiddleware = withAuth({
  pages: { signIn: '/login' },
})

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const method = req.method

  // Apply rate limits to sensitive endpoints
  const isAuthApi = pathname.startsWith('/api/auth')
  const isRegisterApi = pathname === '/api/auth/register'
  const isUploadApi = pathname === '/api/upload'
  const shouldRateLimit = (isAuthApi || isRegisterApi || isUploadApi) && method === 'POST'

  if (shouldRateLimit) {
    const ipHeader = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
    const ip = Array.isArray(ipHeader)
      ? ipHeader[0]
      : (ipHeader as string).split(',')[0].trim()
    const key = `${ip}:${pathname}`

    const limit = 10
    const window = 60
    const result = await rateLimit(key, { limit, window }) // 10 requests per 60s
    if (!result.ok) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(result.retryAfter ?? window),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(result.reset),
            'Cache-Control': 'no-store',
          },
        }
      )
    }

    // Attach rate limit headers when allowed
    const res = NextResponse.next()
    res.headers.set('X-RateLimit-Limit', String(limit))
    res.headers.set('X-RateLimit-Remaining', String(result.remaining))
    res.headers.set('X-RateLimit-Reset', String(result.reset))
    res.headers.set('Cache-Control', 'no-store')
    return res
  }

  // Protect /dashboard routes with NextAuth
  if (pathname.startsWith('/dashboard')) {
    return (authMiddleware as any)(req)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/auth/:path*', '/api/auth/register', '/api/upload'],
}
