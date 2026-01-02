import { RateLimiterMemory } from 'rate-limiter-flexible';
import { NextRequest } from 'next/server';

// Rate limiters for different endpoints
const loginLimiter = new RateLimiterMemory({
  points: 5, // 5 attempts
  duration: 60 * 15, // per 15 minutes
  blockDuration: 60 * 30, // block for 30 minutes after limit
});

const apiLimiter = new RateLimiterMemory({
  points: 100, // 100 requests
  duration: 60, // per minute
});

const uploadLimiter = new RateLimiterMemory({
  points: 10, // 10 uploads
  duration: 60 * 60, // per hour
});

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}

export async function rateLimitLogin(request: NextRequest) {
  const ip = getClientIp(request);

  try {
    await loginLimiter.consume(ip);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: 'Çok fazla giriş denemesi. Lütfen 30 dakika sonra tekrar deneyin.',
      retryAfter: 1800 // 30 minutes in seconds
    };
  }
}

export async function rateLimitApi(request: NextRequest) {
  const ip = getClientIp(request);

  try {
    await apiLimiter.consume(ip);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: 'Çok fazla istek. Lütfen bir dakika sonra tekrar deneyin.',
      retryAfter: 60
    };
  }
}

export async function rateLimitUpload(request: NextRequest) {
  const ip = getClientIp(request);

  try {
    await uploadLimiter.consume(ip);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: 'Çok fazla dosya yükleme. Lütfen bir saat sonra tekrar deneyin.',
      retryAfter: 3600
    };
  }
}
