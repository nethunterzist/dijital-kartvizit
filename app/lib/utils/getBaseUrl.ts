/**
 * Dinamik base URL algılama utility'si
 * Port değişikliklerinde otomatik uyum sağlar
 */

export function getBaseUrl(): string {
  // Browser ortamında window.location kullan
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Server-side ortamında environment variables kontrol et
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  
  // Development ortamında port algılama
  const port = process.env.PORT || '3001';
  return `http://localhost:${port}`;
}

export function getApiUrl(): string {
  return `${getBaseUrl()}/api`;
}

/**
 * Server-side için özel base URL algılama
 * Request headers'ından port bilgisini alır
 */
export function getServerBaseUrl(headers?: Headers): string {
  if (headers) {
    const host = headers.get('host');
    const protocol = headers.get('x-forwarded-proto') || 'http';
    
    if (host) {
      return `${protocol}://${host}`;
    }
  }
  
  return getBaseUrl();
}
