# ⚙️ Backend Dokümantasyonu

Bu bölümde Node.js/Next.js backend servisleri, API route handlers, authentication sistemi ve backend altyapısı detaylandırılmıştır.

## 📋 İçerik Listesi

### 📁 Alt Klasörler
- [`services/`](./services/) - Backend servis sınıfları
- [`auth/`](./auth/) - Authentication ve authorization
- [`file-handling/`](./file-handling/) - Dosya upload ve yönetimi
- [`cache/`](./cache/) - Caching stratejileri

### 📄 Ana Dokümantasyon
- `service-architecture.md` - Servis mimarisi
- `api-route-handlers.md` - Next.js API route'ları
- `database-integration.md` - Veritabanı entegrasyonu
- `error-handling.md` - Hata yönetimi
- `logging-monitoring.md` - Loglama ve monitoring

### 🔗 İlgili Bölümler
- [API Documentation](../03-api/) - API endpoint'leri
- [Database](../04-database/) - Veritabanı konfigürasyonu
- [Security](../08-security/) - Güvenlik sistemleri

## 🛠️ Servis Mimarisi

### Ana Servisler
```typescript
// ServiceRegistry.ts - Servis yöneticisi
export class ServiceRegistry {
  static firmaService = new FirmaService()
  static fileUploadService = new FileUploadService()
  static authService = new AuthService()
  static cacheService = new CacheInvalidationService()
}
```

### Servis Katmanları
- **Controller Layer**: API route handlers
- **Service Layer**: İş mantığı
- **Data Access Layer**: Veritabanı işlemleri
- **Utility Layer**: Yardımcı fonksiyonlar

## 📡 API Route Handlers

### Firma API Routes
```typescript
// /api/firmalar/route.ts
export async function GET(request: NextRequest) {
  try {
    const firmalar = await ServiceRegistry.firmaService.getFirmalar()
    return NextResponse.json({ success: true, data: firmalar })
  } catch (error) {
    return handleApiError(error)
  }
}
```

### Authentication Routes
```typescript
// /api/auth/[...nextauth]/route.ts
export const authOptions: NextAuthOptions = {
  providers: [
    // ... auth providers
  ],
  session: { strategy: "jwt" },
  // ... diğer konfigürasyon
}
```

## 🔐 Authentication Sistemi

### NextAuth.js Konfigürasyonu
- **Providers**: Credential-based auth
- **Session Strategy**: JWT tokens
- **Database**: Session ve kullanıcı verisi
- **Callbacks**: Custom auth logic

### Authorization Middleware
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Admin rotaları için auth kontrolü
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return withAuth(request)
  }
}
```

## 📁 Dosya Yönetimi

### Upload Sistemi
```typescript
// FileUploadService.ts
class FileUploadService {
  async uploadImage(file: File): Promise<UploadResult> {
    // Cloudinary entegrasyonu
    // File validation
    // Error handling
  }
}
```

### Desteklenen Formatlar
- **Images**: PNG, JPG, WebP (max 5MB)
- **Documents**: PDF (max 10MB)
- **Validation**: MIME type, boyut, güvenlik kontrolü

## ⚡ Caching Sistemi

### Caching Stratejileri
- **API Response Caching**: React Query
- **Database Query Caching**: Prisma
- **Static Asset Caching**: Next.js
- **CDN Caching**: Vercel Edge Network

### Cache Invalidation
```typescript
// CacheInvalidationService.ts
class CacheInvalidationService {
  async invalidateFirmaCache(firmaId: string) {
    // Cache temizleme logic'i
  }
}
```

## 📊 Error Handling

### Centralized Error Handler
```typescript
// errorHandling.ts
export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  // ... diğer error tipleri
}
```

### Logging Sistemi
```typescript
// logger.ts
import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
```

---
*Son güncelleme: 2025-08-25*