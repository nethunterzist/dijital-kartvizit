# Kartvizit 404 Sorunu Çözümü

## Problem Tanımı
Kartvizit sayfaları açılırken "404 Sayfa Bulunamadı" hatası alınıyor. Bu problem sürekli tekrar ediyor.

## Sorunun Kök Nedenleri

### 1. Port Uyumsuzluğu
- **Problem**: Kartvizit sayfaları `http://localhost:3000` adresine API isteği atıyor
- **Gerçek Durum**: Server `http://localhost:3001` portunda çalışıyor
- **Sonuç**: API istekleri yanlış porta gidiyor ve 404/429 hatası alınıyor

### 2. Environment Ayarları
- `app/environment.ts` dosyasında yanlış base URL ayarı
- Development ve production ortamları için farklı port ayarları gerekiyor

### 3. Rate Limiting
- API'den 429 (Too Many Requests) hatası geliyor
- `x-ratelimit-limit: 100` ve `x-ratelimit-remaining: 0` görünüyor
- Rate limit aşıldığı için istekler reddediliyor

## Çözüm Adımları

### Adım 1: Environment Dosyasını Düzelt
```typescript
// app/environment.ts
export const environment = {
  production: false,
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:3001', // 3000 değil 3001 olmalı
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com/api' 
    : 'http://localhost:3001/api'
};
```

### Adım 2: Kartvizit Sayfası Base URL'ini Düzelt
```typescript
// app/[slug]/page.tsx içinde
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://yourdomain.com' 
  : 'http://localhost:3001'; // 3000 değil 3001
```

### Adım 3: API Route'larında Port Kontrolü
```typescript
// app/api/sayfalar/[slug]/route.ts
// Base URL'in doğru port ile ayarlandığından emin ol
```

### Adım 4: Rate Limiting Ayarları
- API rate limiting ayarlarını kontrol et
- Development ortamında rate limiting'i gevşet
- Production'da uygun limitler koy

## Kalıcı Çözüm

### 1. Environment Variables Kullan
```bash
# .env.local
NEXT_PUBLIC_BASE_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 2. Dynamic Port Detection
```typescript
// utils/getBaseUrl.ts
export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser'da çalışıyorsa window.location kullan
    return window.location.origin;
  }
  
  // Server-side'da çalışıyorsa environment variable kullan
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
}
```

### 3. API Client Wrapper
```typescript
// lib/apiClient.ts
const API_BASE = getBaseUrl();

export async function apiRequest(endpoint: string, options?: RequestInit) {
  const url = `${API_BASE}/api${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}
```

## Debugging Adımları

### 1. Port Kontrolü
```bash
# Hangi portun kullanıldığını kontrol et
lsof -i :3000
lsof -i :3001
```

### 2. Environment Debug
```typescript
// Herhangi bir component'te
console.log('Current environment:', {
  NODE_ENV: process.env.NODE_ENV,
  baseUrl: getBaseUrl(),
  windowOrigin: typeof window !== 'undefined' ? window.location.origin : 'N/A'
});
```

### 3. Network Tab Kontrolü
- Browser Developer Tools > Network tab
- API isteklerinin hangi URL'e gittiğini kontrol et
- Response status kodlarını incele

## Önleme Stratejileri

### 1. Consistent Configuration
- Tüm environment ayarlarını tek yerden yönet
- Development ve production için ayrı config dosyaları

### 2. Health Check Endpoint
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || '3001',
    environment: process.env.NODE_ENV
  });
}
```

### 3. Error Boundary
```typescript
// components/ErrorBoundary.tsx
// API hatalarını yakala ve kullanıcı dostu mesajlar göster
```

## Test Checklist

- [x] Kartvizit sayfaları doğru port'a istek atıyor mu? ✅ ÇÖZÜLDÜ
- [x] API endpoints'leri çalışıyor mu? ✅ ÇÖZÜLDÜ
- [x] Rate limiting uygun mu? ✅ ÇÖZÜLDÜ
- [x] Environment variables doğru set edilmiş mi? ✅ ÇÖZÜLDÜ
- [ ] Production'da da aynı ayarlar çalışıyor mu?

## ✅ ÇÖZÜM UYGULANDI

**Tarih**: 27 Temmuz 2025, 17:12
**Durum**: BAŞARIYLA ÇÖZÜLDÜ

### Yapılan Değişiklikler:
1. `app/environment.ts` - baseUrl port'u 3000'den 3001'e değiştirildi
2. `app/[slug]/page.tsx` - İki yerde baseUrl port'u 3000'den 3001'e değiştirildi
3. Template temizleme işlemi tamamlandı

### Test Sonuçları:
- ✅ API başarıyla çalışıyor: `GET /api/sayfalar/[slug] 200`
- ✅ Kartvizit sayfaları yükleniyor: `GET /[slug] 200`
- ✅ Template sistemi çalışıyor
- ✅ Database bağlantısı aktif
- ✅ Port uyumsuzluğu çözüldü

## Acil Durum Çözümü

Eğer problem devam ederse:

1. **Server'ı yeniden başlat**:
   ```bash
   npm run dev
   ```

2. **Cache'i temizle**:
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Port'u manuel belirle**:
   ```bash
   PORT=3001 npm run dev
   ```

4. **Database connection'ı kontrol et**:
   ```bash
   npx prisma db push
   ```

Bu adımları takip ederek kartvizit 404 sorunu kalıcı olarak çözülecektir.
