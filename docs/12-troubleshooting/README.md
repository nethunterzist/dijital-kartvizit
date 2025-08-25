# 🔧 Sorun Giderme

Bu bölümde yaygın sorunların çözümleri, debug teknikleri ve sistem sorun giderme rehberleri yer almaktadır.

## 📋 İçerik Listesi

### 📄 Ana Dokümantasyon
- `common-issues.md` - Yaygın sorunlar ve çözümleri
- `debugging-guide.md` - Debug teknikleri
- `error-codes.md` - Hata kodları referansı
- `performance-issues.md` - Performans sorunları
- `database-issues.md` - Veritabanı sorunları
- `deployment-issues.md` - Deployment sorunları

### 🔗 İlgili Bölümler
- [Development](../02-development/) - Geliştirme ortamı sorunları
- [Security](../08-security/) - Güvenlik sorunları
- [Performance](../10-performance/) - Performans optimizasyonu
- [Guides](../11-guides/) - Kullanıcı rehberleri

## 🚨 Yaygın Sorunlar ve Çözümleri

### 🔌 Bağlantı Sorunları

#### Database Bağlantı Hatası
```bash
# Error: P1001: Can't reach database server
```
**Çözümler:**
1. DATABASE_URL kontrol edin
2. Supabase project durumunu kontrol edin
3. Network bağlantısını test edin
4. Firewall ayarlarını kontrol edin

```bash
# Database bağlantı testi
npx prisma db execute --stdin <<< "SELECT 1"
```

#### API Endpoint Erişim Sorunu
```bash
# Error: 500 Internal Server Error
```
**Debug Adımları:**
1. Vercel logs kontrol edin: `vercel logs`
2. Browser Developer Tools → Network tab
3. Environment variables doğrulama
4. API route handler kontrol edin

### 🏗️ Build ve Deployment Sorunları

#### TypeScript Build Hatası
```bash
# Error: Type 'string | undefined' is not assignable to type 'string'
```
**Çözümler:**
```typescript
// ❌ Hatalı kullanım
const value: string = process.env.NEXT_PUBLIC_API_URL

// ✅ Doğru kullanım
const value: string = process.env.NEXT_PUBLIC_API_URL || ''
```

#### Prisma Generation Hatası
```bash
# Error: Prisma schema not found
```
**Çözümler:**
```bash
# Prisma client yeniden oluştur
npx prisma generate

# Schema dosyası kontrol et
ls -la schema.prisma

# Database push
npx prisma db push
```

#### Vercel Deployment Hatası
```bash
# Error: Build failed due to environment variables
```
**Kontrol Listesi:**
- ✅ Environment variables Vercel'de tanımlı mı?
- ✅ DATABASE_URL production URL'i mi?
- ✅ NEXTAUTH_URL production domain'i mi?
- ✅ Build komutları package.json'da doğru mu?

### 🎨 Frontend Sorunları

#### Component Render Hatası
```bash
# Error: Hydration failed because the initial UI does not match
```
**Çözümler:**
```typescript
// ❌ Server/Client uyumsuzluğu
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return null

// ✅ Dynamic import kullanın
const DynamicComponent = dynamic(() => import('./Component'), {
  ssr: false
})
```

#### Image Yükleme Sorunu
```bash
# Error: Image optimization error
```
**Çözümler:**
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif']
  }
}
```

### 🗄️ Veritabanı Sorunları

#### SSL Certificate Hatası (Vercel + Supabase)
```bash
# Error: self-signed certificate in certificate chain
# Error: cert file not found (Is a directory (os error 21))
```
**Çözüm:**
📄 **[Detaylı SSL Certificate Çözüm Rehberi](./ssl-certificate-issues.md)**

Bu kritik sorunu çözmek için yukarıdaki rehberi mutlaka inceleyin.

#### Migration Hatası
```bash
# Error: Migration failed to apply
```
**Çözümler:**
```bash
# Migration durumunu kontrol et
npx prisma migrate status

# Schema reset (development only!)
npx prisma migrate reset

# Manuel migration
npx prisma db execute --file ./fix-migration.sql
```

#### Query Performance Sorunu
```sql
-- Slow query tespit etme
EXPLAIN ANALYZE SELECT * FROM "Firma" WHERE "slug" = 'example';
```
**Optimizasyon:**
```typescript
// Index ekleme
model Firma {
  id        String  @id @default(uuid())
  slug      String  @unique
  firmaAdi  String
  @@index([slug]) // Performance için index
}
```

## 🐛 Debug Teknikleri

### 1. Logging Sistemi
```typescript
// Structured logging
import { logger } from '@/lib/logger'

logger.info('API request', {
  method: request.method,
  url: request.url,
  userId: session?.user?.id
})

logger.error('Database error', {
  error: error.message,
  query: 'SELECT * FROM Firma',
  duration: Date.now() - startTime
})
```

### 2. Environment Debug
```typescript
// Environment variables debug
export async function GET() {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json({
      nodeEnv: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
      nextauthSecret: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT_SET'
    })
  }
  
  return NextResponse.json({ error: 'Only in development' })
}
```

### 3. Database Debug
```typescript
// Prisma query logging
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
})

// Manual query with raw SQL
const result = await prisma.$queryRaw`
  SELECT * FROM "Firma" WHERE "slug" = ${slug}
`
```

## 📊 Monitoring ve Alerting

### Performance Monitoring
```javascript
// Web Vitals tracking
import { getCLS, getFID, getLCP } from 'web-vitals'

function sendToAnalytics({ name, value, id }) {
  // Performance metric gönderme
  console.log(`${name}: ${value} (ID: ${id})`)
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getLCP(sendToAnalytics)
```

### Error Tracking
```typescript
// Global error handler
export function handleApiError(error: unknown, context?: string) {
  const errorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    context,
    timestamp: new Date().toISOString()
  }
  
  // Log to external service (Sentry, LogRocket, etc.)
  console.error('API Error:', errorInfo)
  
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}
```

## 🔧 Debug Komutları

### Development
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Database status
npx prisma migrate status

# Database studio
npx prisma studio

# Build test
npm run build
```

### Production
```bash
# Vercel logs
vercel logs

# Database connection test
npx prisma db execute --stdin <<< "SELECT 1"

# Health check
curl https://yourdomain.com/api/health
```

## 📞 Destek Alma

### İç Kaynaklardan Destek
1. **Documentation**: Bu docs/ klasöründeki rehberler
2. **Code Comments**: Kaynak kod yorumları
3. **Git History**: Commit geçmişi incelemesi
4. **Test Cases**: Mevcut test senaryoları

### Dış Kaynaklardan Destek
1. **Next.js Docs**: https://nextjs.org/docs
2. **Prisma Docs**: https://www.prisma.io/docs
3. **Vercel Community**: https://vercel.com/support
4. **Stack Overflow**: nextjs, prisma, typescript tag'leri

### Issue Reporting Template
```markdown
## Bug Report

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Environment**
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]
- Node.js version: 
- Next.js version:

**Additional context**
Add any other context about the problem here.
```

---
*Son güncelleme: 2025-08-25*