/**
 * Dinamik base URL algılama utility'si
 * Port değişikliklerinde otomatik uyum sağlar
 */

import { logger } from '@/app/lib/logger';

/**
 * Dinamik base URL algılama utility'si
 * Port değişikliklerinde otomatik uyum sağlar
 */

export function getBaseUrl(): string {
  // Browser ortamında window.location kullan
  if (typeof window !== 'undefined') {
    logger.info('getBaseUrl: Running in browser, using window.location.origin', { origin: window.location.origin });
    return window.location.origin;
  }
  
  // Server-side ortamında environment variables kontrol et
  if (process.env.VERCEL_URL) {
    const url = `https://${process.env.VERCEL_URL}`;
    logger.info('getBaseUrl: Running on Vercel, using VERCEL_URL', { url });
    return url;
  }
  
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    logger.info('getBaseUrl: Using NEXT_PUBLIC_BASE_URL', { url: process.env.NEXT_PUBLIC_BASE_URL });
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  
  // Development ortamında port algılama
  const port = process.env.PORT || '3001';
  const url = `http://localhost:${port}`;
  logger.info('getBaseUrl: Running in development, using localhost', { url });
  return url;
}

export function getApiUrl(): string {
  const baseUrl = getBaseUrl();
  logger.info('getApiUrl: Base URL', { baseUrl });
  return `${baseUrl}/api`;
}

/**
 * Server-side için özel base URL algılama
 * Request headers'ından port bilgisini alır
 */
export function getServerBaseUrl(headers?: Headers): string {
  // Vercel production ortamında absolute URL gerekli
  if (process.env.VERCEL_URL && process.env.NODE_ENV === 'production') {
    const url = `https://${process.env.VERCEL_URL}`;
    logger.info('getServerBaseUrl: Using Vercel URL in production', { url });
    return url;
  }
  
  if (headers) {
    const host = headers.get('host');
    const protocol = headers.get('x-forwarded-proto') || 'http';
    
    if (host) {
      const url = `${protocol}://${host}`;
      logger.info('getServerBaseUrl: Using host from headers', { url, host, protocol });
      return url;
    }
  }
  
  const baseUrl = getBaseUrl();
  logger.info('getServerBaseUrl: Falling back to getBaseUrl', { baseUrl });
  return baseUrl;
}
