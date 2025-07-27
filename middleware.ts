import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Rate limiter configurations
const apiLimiter = new RateLimiterMemory({
  keyPrefix: 'api',
  points: 1000, // Number of requests (increased from 100)
  duration: 60, // Per 60 seconds (1 minute)
  blockDuration: 30, // Block for 30 seconds if exceeded (reduced from 60)
});

const authLimiter = new RateLimiterMemory({
  keyPrefix: 'auth',
  points: 5, // Number of login attempts
  duration: 900, // Per 15 minutes
  blockDuration: 900, // Block for 15 minutes if exceeded
});

async function rateLimit(req: any, limiter: RateLimiterMemory, identifier: string) {
  try {
    await limiter.consume(identifier);
    return null;
  } catch (rateLimiterRes: any) {
    const secs = Math.round((rateLimiterRes?.msBeforeNext || 60000) / 1000) || 1;
    return NextResponse.json(
      { 
        error: { 
          message: 'Rate limit exceeded', 
          retryAfter: secs 
        } 
      },
      { 
        status: 429,
        headers: {
          'Retry-After': String(secs),
          'X-RateLimit-Limit': limiter.points.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(Date.now() + (rateLimiterRes?.msBeforeNext || 60000)).toISOString(),
        }
      }
    );
  }
}

async function middleware(req: any) {
  const ip = req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
  const pathname = req.nextUrl.pathname;

  // Public API endpoints that don't require authentication
  const publicApiEndpoints = [
    '/api/firmalar', // GET requests for listing firms
    '/api/sayfalar', // GET requests for firm pages
    '/api/health',
    '/api/monitoring',
    '/api/test-db' // Database test endpoint
  ];
  
  // Check if this is a public API endpoint with GET method
  if (req.method === 'GET' && publicApiEndpoints.some(endpoint => pathname.startsWith(endpoint))) {
    // Still apply rate limiting but skip auth
    if (pathname.startsWith('/api/')) {
      const rateLimitResponse = await rateLimit(req, apiLimiter, ip);
      if (rateLimitResponse) return rateLimitResponse;
    }
    return NextResponse.next();
  }

  // For protected routes, use withAuth
  if (pathname.startsWith('/admin') || 
      (pathname.startsWith('/api/') && !publicApiEndpoints.some(endpoint => pathname.startsWith(endpoint)))) {
    
    // Apply withAuth for protected routes
    const authMiddleware = withAuth(
      async function(req) {
        // HTTPS Redirect (production only)
        if (process.env.NODE_ENV === 'production') {
          const isHttps = req.headers.get('x-forwarded-proto') === 'https' || 
                         req.headers.get('x-forwarded-ssl') === 'on' ||
                         req.nextUrl.protocol === 'https:';
          
          if (!isHttps && !pathname.startsWith('/api/health')) {
            const httpsUrl = new URL(req.url);
            httpsUrl.protocol = 'https:';
            return NextResponse.redirect(httpsUrl, 301);
          }
        }

        // Rate limiting for API routes
        if (pathname.startsWith('/api/')) {
          const rateLimitResponse = await rateLimit(req, apiLimiter, ip);
          if (rateLimitResponse) return rateLimitResponse;
        }

        // Stricter rate limiting for auth endpoints
        if (pathname.startsWith('/api/auth/') || pathname === '/login') {
          const rateLimitResponse = await rateLimit(req, authLimiter, ip);
          if (rateLimitResponse) return rateLimitResponse;
        }

        return NextResponse.next();
      },
      {
        pages: {
          signIn: "/login",
        },
      }
    );
    
    return authMiddleware(req, {} as any);
  }

  // For other routes, just apply rate limiting
  if (pathname.startsWith('/api/')) {
    const rateLimitResponse = await rateLimit(req, apiLimiter, ip);
    if (rateLimitResponse) return rateLimitResponse;
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: [
    // Admin routes için auth + rate limiting
    "/admin/:path*",
    "/api/upload/:path*",
    "/api/settings/:path*",
    // Rate limiting için tüm API routes
    "/api/:path*",
    "/login"
  ]
};
