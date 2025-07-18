import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting için basit in-memory store (production'da Redis kullanın)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string, limit: number = 100, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const key = ip;
  
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

export default withAuth(
  function middleware(req: NextRequest) {
    // Rate limiting
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    
    // API routes için rate limiting
    if (req.nextUrl.pathname.startsWith('/api/')) {
      if (!rateLimit(ip, 100, 15 * 60 * 1000)) { // 15 dakikada 100 istek
        return new NextResponse(
          JSON.stringify({ error: 'Too many requests' }),
          { 
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '900' // 15 dakika
            }
          }
        );
      }
    }

    // Admin routes için daha sıkı rate limiting
    if (req.nextUrl.pathname.startsWith('/api/admin/')) {
      if (!rateLimit(`admin-${ip}`, 50, 15 * 60 * 1000)) { // 15 dakikada 50 istek
        return new NextResponse(
          JSON.stringify({ error: 'Too many admin requests' }),
          { 
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '900'
            }
          }
        );
      }
    }

    // Security headers
    const response = NextResponse.next();
    
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    // CSRF protection için
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
      const origin = req.headers.get('origin');
      const host = req.headers.get('host');
      
      if (origin && host && !origin.includes(host)) {
        return new NextResponse(
          JSON.stringify({ error: 'CSRF protection: Invalid origin' }),
          { 
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    return response;
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    // Admin routes require authentication
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/firmalar/:path*",
    "/api/upload/:path*",
    "/api/settings/:path*",
    // Apply rate limiting to all API routes
    "/api/:path*"
  ]
};
