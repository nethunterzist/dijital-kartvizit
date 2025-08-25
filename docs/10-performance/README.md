# ⚡ Performans Dokümantasyonu

Bu bölümde performans optimizasyonu, monitoring, benchmarking ve performans raporları detaylandırılmıştır.

## 📋 İçerik Listesi

### 📁 Alt Klasörler
- [`optimization/`](./optimization/) - Performans optimizasyon teknikleri
- [`monitoring/`](./monitoring/) - Performans izleme sistemleri
- [`benchmarks/`](./benchmarks/) - Performans benchmark'ları
- [`reports/`](./reports/) - Performans analiz raporları

### 📄 Ana Dokümantasyon
- `performance-strategy.md` - Performans strateji ve hedefleri
- `core-web-vitals.md` - Core Web Vitals optimizasyonu
- `database-optimization.md` - Veritabanı performans optimizasyonu
- `caching-strategy.md` - Caching stratejileri
- `bundle-optimization.md` - JavaScript bundle optimizasyonu

### 🔗 İlgili Bölümler
- [Frontend](../06-frontend/) - Frontend optimizasyonu
- [Backend](../07-backend/) - Backend performansı
- [Database](../04-database/) - Database optimizasyonu
- [Deployment](../05-deployment/) - Production performansı

## 🎯 Performans Hedefleri

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms  
- **CLS (Cumulative Layout Shift)**: <0.1
- **FCP (First Contentful Paint)**: <1.8s
- **TTI (Time to Interactive)**: <3.8s

### Lighthouse Scores
- **Performance**: >90
- **Accessibility**: >95
- **Best Practices**: >90
- **SEO**: >95

### Custom Metrics
- **API Response Time**: <200ms (95th percentile)
- **Database Query Time**: <100ms (average)
- **Bundle Size**: <500KB (initial load)
- **Memory Usage**: <100MB (mobile)

## 🚀 Frontend Optimizasyonu

### Next.js Optimizasyonları
```javascript
// next.config.js
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  },
  
  // Bundle optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  // Compression
  compress: true,
  
  // Static optimization
  trailingSlash: false
}
```

### Bundle Optimization
```typescript
// Dynamic imports
const HeavyComponent = dynamic(() => import('../HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
})

// Code splitting by routes
const AdminPanel = dynamic(() => import('../admin/AdminPanel'))
```

### Image Optimization
```tsx
// Next.js Image component
import Image from 'next/image'

<Image
  src="/firma-logo.jpg"
  alt="Firma Logo"
  width={300}
  height={200}
  priority={false}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## ⚙️ Backend Optimizasyonu

### Database Query Optimization
```typescript
// Prisma query optimization
const firmalarWithIncludes = await prisma.firma.findMany({
  select: {
    id: true,
    firmaAdi: true,
    slug: true,
    _count: {
      select: { yetkililer: true }
    }
  },
  where: {
    aktif: true
  },
  orderBy: {
    createdAt: 'desc'
  },
  take: 50 // Pagination
})
```

### Caching Stratejileri
```typescript
// Redis caching
import { redis } from '@/lib/redis'

export async function getFirmaWithCache(id: string) {
  const cacheKey = `firma:${id}`
  
  // Cache'den kontrol et
  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }
  
  // Database'den çek ve cache'le
  const firma = await prisma.firma.findUnique({ where: { id } })
  await redis.setex(cacheKey, 300, JSON.stringify(firma)) // 5 dakika
  
  return firma
}
```

### API Response Optimization
```typescript
// Response compression
export async function GET(request: NextRequest) {
  const data = await getFirmalar()
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 's-maxage=300, stale-while-revalidate=59',
      'Content-Encoding': 'gzip'
    }
  })
}
```

## 📊 Monitoring ve Analytics

### Performance Monitoring
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

export function sendToAnalytics(metric) {
  // Google Analytics 4
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    value: Math.round(metric.value),
    event_label: metric.id
  })
}

// Metric collection
getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

### Server-side Monitoring
```typescript
// API response time tracking
export async function performanceMiddleware(
  request: NextRequest,
  response: NextResponse
) {
  const start = Date.now()
  
  // Process request
  const result = await processRequest(request)
  
  const duration = Date.now() - start
  
  // Log performance metrics
  console.log({
    path: request.nextUrl.pathname,
    method: request.method,
    duration,
    status: response.status
  })
  
  return result
}
```

### Database Performance Monitoring
```typescript
// Prisma query logging
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    }
  ]
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Duration: ' + e.duration + 'ms')
})
```

## 🔧 Performans Araçları

### Development Tools
```bash
# Bundle analyzer
npm install --save-dev @next/bundle-analyzer
npx @next/bundle-analyzer

# Performance profiling
npm run build && npm run start
# Chrome DevTools → Performance tab

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

### Production Monitoring
```javascript
// Vercel Analytics integration
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Custom Performance Hooks
```typescript
// usePerformance hook
export function usePerformance(componentName: string) {
  useEffect(() => {
    const start = performance.now()
    
    return () => {
      const end = performance.now()
      console.log(`${componentName} render time: ${end - start}ms`)
    }
  }, [componentName])
}
```

## 📈 Performance Budget

### JavaScript Bundle
- **Critical Path**: <150KB
- **Total Bundle**: <500KB
- **Third-party Scripts**: <100KB
- **Runtime Overhead**: <50KB

### Network Performance
- **HTTP/2 Multiplexing**: Enabled
- **Gzip Compression**: 70-80% reduction
- **CDN Distribution**: Global edge locations
- **Asset Optimization**: WebP, AVIF support

### Database Performance
- **Query Response**: <100ms average
- **Connection Pool**: 10-20 connections
- **Index Coverage**: >95% queries
- **Cache Hit Rate**: >80%

---
*Son güncelleme: 2025-08-25*