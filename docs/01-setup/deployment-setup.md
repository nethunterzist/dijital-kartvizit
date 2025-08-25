# 🚀 Production Deployment Rehberi

Bu rehber, **Dijital Kartvizit** projesinin Vercel + Supabase kullanarak production ortamına deploy edilmesi için kapsamlı adımları içerir.

## 📋 İçindekiler

1. [Deployment Stratejisi](#-deployment-stratejisi)
2. [Vercel Hesap Kurulumu](#-vercel-hesap-kurulumu)
3. [GitHub Repository Hazırlığı](#-github-repository-hazırlığı)
4. [Vercel Deployment](#-vercel-deployment)
5. [Environment Variables Setup](#-environment-variables-setup)
6. [Domain ve SSL Konfigürasyonu](#-domain-ve-ssl-konfigürasyonu)
7. [Performance Monitoring Setup](#-performance-monitoring-setup)
8. [Production Checklist](#-production-checklist)
9. [Troubleshooting](#-troubleshooting)

---

## 📊 Deployment Stratejisi

### Deployment Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│     Vercel       │───▶│  Production     │
│   (Source Code) │    │   (Build & CDN)  │    │   Website       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │     Supabase     │
                       │    (Database)    │
                       └──────────────────┘
```

### Teknoloji Yığını
- **Frontend Hosting**: Vercel (Serverless)
- **Backend API**: Next.js API Routes (Vercel Functions)
- **Database**: Supabase PostgreSQL
- **CDN**: Vercel Edge Network (Global)
- **SSL**: Automatic via Vercel
- **Monitoring**: Vercel Analytics + Supabase Dashboard

### Deployment Workflow
1. **Code Push** → GitHub repository  
2. **Auto Deploy** → Vercel detects changes
3. **Build Process** → Next.js build + optimization
4. **Database Migrate** → Supabase schema sync
5. **Go Live** → Production URL aktif

---

## 🔧 Vercel Hesap Kurulumu

### 1. Vercel Hesabı Oluşturma

1. **[vercel.com](https://vercel.com)** adresine gidin
2. **"Sign up"** butonuna tıklayın
3. **GitHub** hesabınızla giriş yapın (önerilen)

**Alternatif Giriş Yöntemleri:**
- GitHub (önerilen - otomatik repo erişimi)
- GitLab
- Bitbucket
- Email + Password

### 2. Plan Seçimi

```yaml
Hobby Plan (Free):
  - Unlimited personal projects
  - 100GB bandwidth/month
  - Custom domains
  - SSL certificates
  - Global CDN

Pro Plan ($20/month):
  - Team collaboration  
  - Advanced analytics
  - Password protection
  - 1TB bandwidth/month
```

**🆓 Free Tier Başlangıç İçin Yeterli:**
- Sınırsız deployment
- Custom domain desteği
- Otomatik SSL
- Global CDN

### 3. GitHub Integration

Vercel otomatik olarak GitHub hesabınıza erişim ister:
- ✅ Repository okuma yetkisi
- ✅ Deploy status güncelleme  
- ✅ Webhook kurulumu

---

## 📂 GitHub Repository Hazırlığı

### 1. Repository Kontrolü

```bash
# Mevcut git durumunu kontrol et
git status

# Uzak repository URL'ini kontrol et
git remote -v

# Eğer remote yok ise ekle
git remote add origin https://github.com/USERNAME/dijital-kartvizit.git
```

### 2. Production Branch Stratejisi

```bash
# Main branch production için kullanılır
git checkout main

# Development branch oluştur (opsiyonel)
git checkout -b development
git push -u origin development

# Feature branches
git checkout -b feature/new-feature
```

### 3. .gitignore Kontrolü

`.gitignore` dosyasında aşağıdakilerin olduğunu kontrol edin:

```gitignore
# Environment variables (güvenlik)
.env*.local
.env.development
.env.production

# Next.js build outputs
.next/
out/

# Dependencies
node_modules/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Vercel
.vercel

# IDE files
.vscode/
.idea/

# OS generated files
.DS_Store
Thumbs.db
```

### 4. Package.json Scripts Kontrolü

Production için gerekli script'lerin tanımlı olduğunu kontrol edin:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "postinstall": "prisma generate"
  }
}
```

**⚠️ Önemli Notlar:**
- `build` script'inde `prisma generate` olmalı
- `postinstall` script'i Vercel'de otomatik Prisma setup sağlar

---

## 🚀 Vercel Deployment

### 1. Repository Import

1. **Vercel Dashboard** → **"New Project"**
2. **"Import Git Repository"**  
3. GitHub repository'nizi seçin: `dijital-kartvizit`
4. **"Import"** butonuna tıklayın

### 2. Project Configuration

```yaml
Project Name: dijital-kartvizit
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build (auto-detected)
Output Directory: .next (auto-detected)
Install Command: npm install (auto-detected)
```

**Auto-Detection:**
Vercel Next.js projelerini otomatik tanır ve optimal ayarları uygular.

### 3. Environment Variables Ekleme

**Deployment sırasında environment variables ekleyin:**

```bash
# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require

# Authentication
NEXTAUTH_SECRET=your-production-secret-min-64-chars-long-different-from-dev
NEXTAUTH_URL=https://your-domain.vercel.app

# Supabase  
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Environment
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production
```

**⚠️ Kritik Güvenlik Notları:**
- **NEXTAUTH_SECRET**: Development'dan farklı olmalı
- **NEXTAUTH_URL**: Production domain'iniz olmalı
- **Şifreler**: Production için güçlü şifreler kullanın

### 4. İlk Deployment

1. **"Deploy"** butonuna tıklayın
2. Build process'i izleyin (2-3 dakika)
3. Deployment URL'ini alın: `https://dijital-kartvizit-xyz.vercel.app`

**Deployment Process:**
```
⚡ Building...
├── Installing dependencies
├── Running npm run build
├── Generating Prisma Client
├── Building Next.js application
├── Optimizing images and assets
└── ✅ Deployment successful!
```

---

## ⚙️ Environment Variables Setup

### 1. Production Environment Variables

Vercel Dashboard → **Project** → **Settings** → **Environment Variables**

#### 🔧 Sistem Konfigürasyonu
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-custom-domain.com
```

#### 🗄️ Database Konfigürasyonu
```bash
# Supabase Production Database
DATABASE_URL=postgresql://postgres:[PROD_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres?sslmode=require
```

#### 🔐 Authentication (NextAuth.js)
```bash
# Production secret - DEV'den farklı olmalı!
NEXTAUTH_SECRET=your-super-secure-production-secret-key-min-64-chars-completely-different-from-dev

# Production domain  
NEXTAUTH_URL=https://your-custom-domain.com
```

#### 🚀 Supabase Production Keys
```bash
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.production.anon.key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.production.service.key
```

#### 📁 File Upload (Production)
```bash
# Cloudinary Production Keys
CLOUDINARY_CLOUD_NAME=prod-cloud-name
CLOUDINARY_API_KEY=production-api-key
CLOUDINARY_API_SECRET=production-api-secret

# Vercel Blob Storage (alternatif)
# BLOB_READ_WRITE_TOKEN=vercel_blob_token
```

#### 📊 Monitoring ve Analytics
```bash
# Vercel Analytics (otomatik)
# Google Analytics (opsiyonel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry Error Tracking (opsiyonel)
# SENTRY_DSN=https://sentry.io/dsn
```

### 2. Environment Variables Yönetimi

#### Branch-specific Variables:
```yaml
Production (main branch):
  NEXTAUTH_URL: https://yourdomain.com
  
Preview (other branches):  
  NEXTAUTH_URL: https://branch-name-project.vercel.app

Development (local):
  NEXTAUTH_URL: http://localhost:3000
```

#### Sensitive Data Encryption:
Vercel otomatik olarak tüm environment variables'ları şifreler.

---

## 🌐 Domain ve SSL Konfigürasyonu

### 1. Custom Domain Ekleme

#### Ücretsiz Vercel Domain:
```
Otomatik verilen URL: https://dijital-kartvizit-xyz.vercel.app
```

#### Custom Domain (Önerilen):
1. **Vercel Dashboard** → **Project** → **Settings** → **Domains**
2. **"Add Domain"** → `yourdomain.com` girin
3. DNS ayarlarını yapın

### 2. DNS Konfigürasyonu

#### A Record (Apex Domain):
```
Type: A
Name: @
Value: 76.76.19.61
```

#### CNAME Record (www):
```
Type: CNAME
Name: www  
Value: cname.vercel-dns.com
```

#### Alternatif CNAME Setup:
```
Type: CNAME
Name: @
Value: dijital-kartvizit-xyz.vercel.app
```

### 3. SSL Certificate

**Vercel Otomatik SSL:**
- ✅ Let's Encrypt ile ücretsiz SSL
- ✅ Otomatik renewal  
- ✅ HTTP → HTTPS redirect
- ✅ HSTS headers

**SSL Doğrulama:**
```bash
# SSL test
curl -I https://yourdomain.com

# Expected headers:
# HTTP/2 200
# strict-transport-security: max-age=63072000
```

### 4. Domain Yönlendirme

```javascript
// next.config.js redirects
async redirects() {
  return [
    {
      source: '/admin',
      destination: '/admin/dashboard',
      permanent: true,
    },
    {
      source: '/:slug/qr',
      destination: '/api/qr-codes/:slug',
      permanent: true,
    }
  ]
}
```

---

## 📊 Performance Monitoring Setup

### 1. Vercel Analytics

#### Built-in Analytics (Free):
```bash
# Otomatik aktif:
- Page views
- Unique visitors  
- Top pages
- Referrers
- Device/browser stats
```

#### Vercel Speed Insights:
```bash
# package.json'a ekle
npm install @vercel/speed-insights

# _app.tsx'e ekle:
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  )
}
```

### 2. Core Web Vitals Monitoring

```typescript
// lib/analytics.ts
export function sendToAnalytics(metric: any) {
  // Vercel Analytics
  if (typeof window !== 'undefined') {
    window.va?.track('WebVital', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    })
  }
}

// pages/_app.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

// Report Web Vitals
export function reportWebVitals(metric: any) {
  sendToAnalytics(metric)
}
```

### 3. Error Tracking (Opsiyonel)

#### Sentry Integration:
```bash
# Install Sentry
npm install @sentry/nextjs

# sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

### 4. Uptime Monitoring

#### External Services:
- **UptimeRobot** (Free)
- **Pingdom** 
- **StatusPage**

```bash
# Health check endpoint
# /api/health/route.ts
export async function GET() {
  try {
    // Database health check
    const dbHealth = await prisma.$queryRaw`SELECT 1`;
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: process.env.npm_package_version
    })
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: 'Database connection failed'
    }, { status: 503 })
  }
}
```

---

## ✅ Production Checklist

### 🔧 Technical Setup

#### Environment & Configuration:
- [ ] Production environment variables ayarlandı
- [ ] `NEXTAUTH_SECRET` development'dan farklı
- [ ] `NEXTAUTH_URL` production domain'i
- [ ] Database URL production Supabase'e işaret ediyor
- [ ] SSL sertifikası aktif
- [ ] Custom domain bağlandı

#### Security & Performance:
- [ ] RLS policies Supabase'de aktif
- [ ] API rate limiting konfigüre edildi
- [ ] CORS ayarları doğru
- [ ] CSP headers ayarlandı (next.config.js)
- [ ] Error pages customize edildi
- [ ] Sitemap.xml oluşturuldu

#### Database & Content:
- [ ] Production database schema import edildi
- [ ] Sample/test data temizlendi
- [ ] Database backup stratejisi kuruldu
- [ ] Admin user production'da oluşturuldu

### 📊 Performance & Monitoring

#### Core Web Vitals:
- [ ] Lighthouse Score >90
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] Bundle size <500KB

#### Monitoring Setup:
- [ ] Vercel Analytics aktif
- [ ] Health check endpoint test edildi
- [ ] Error tracking kuruldu (opsiyonel)
- [ ] Uptime monitoring ayarlandı

### 🔍 Quality Assurance

#### Functionality Testing:
- [ ] Ana sayfa yükleniyor
- [ ] Firma sayfaları çalışıyor
- [ ] QR kod generation aktif
- [ ] vCard download çalışıyor
- [ ] PDF export fonksiyonel
- [ ] Admin panel erişilebilir
- [ ] File upload çalışıyor

#### Cross-platform Testing:
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile devices (iOS Safari, Android Chrome)
- [ ] Tablet görünüm
- [ ] Performance mobile'da kabul edilebilir

### 🌐 SEO & Content

#### SEO Optimization:
- [ ] Meta titles ve descriptions
- [ ] Open Graph tags
- [ ] Twitter Cards
- [ ] Structured data (JSON-LD)
- [ ] robots.txt
- [ ] sitemap.xml

#### Content Management:
- [ ] Placeholder içerikler kaldırıldı
- [ ] Legal pages (Privacy Policy, Terms)
- [ ] Contact information güncellendi
- [ ] About page içeriği hazır

---

## 🔧 Troubleshooting

### Yaygın Deployment Sorunları

#### 1. Build Failure - Prisma Error
```bash
# Hata: "Prisma Client not generated"
# Çözüm: package.json scripts kontrol
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}

# Vercel'de rebuild
vercel --force
```

#### 2. Environment Variables Not Loading
```bash
# Hata: Environment variable undefined
# Kontrol: Vercel Dashboard → Settings → Environment Variables
# Vercel CLI ile kontrol:
vercel env ls

# Local test:
vercel dev
```

#### 3. Database Connection Failed
```bash
# Hata: "Connection timeout"
# Kontrol: DATABASE_URL format
# Production format:
DATABASE_URL="postgresql://postgres:PASSWORD@db.PROJECT-REF.supabase.co:5432/postgres?sslmode=require"

# Connection test:
npx prisma db execute --stdin <<< "SELECT 1"
```

#### 4. NextAuth Configuration Error
```bash
# Hata: "NEXTAUTH_URL configuration error"
# Kontrol: NEXTAUTH_URL production domain
# Production:
NEXTAUTH_URL="https://yourdomain.com"

# NOT localhost!
```

#### 5. API Routes 404 Error
```bash
# Hata: API routes not found
# Kontrol: app/api/ directory structure
# Vercel functions logs:
vercel logs
```

#### 6. CORS Error
```bash
# Hata: "Access blocked by CORS policy"
# Kontrol: next.config.js headers
# Supabase dashboard → Authentication → Site URL
# Add: https://yourdomain.com
```

### Performance Issues

#### 1. Slow Page Load
```bash
# Analiz: Vercel Analytics
# Optimize: next.config.js compression
# Bundle analysis: 
npx @next/bundle-analyzer

# Image optimization check:
# next.config.js images configuration
```

#### 2. High Memory Usage
```bash
# Vercel function limits: 1GB (Hobby), 3GB (Pro)
# Memory profiling:
NODE_OPTIONS="--inspect" npm run dev

# Optimize: Prisma connection pooling
```

### Debug Komutları

```bash
# Vercel CLI debugging
vercel logs --follow

# Local production test
npm run build && npm run start

# Environment variables debug
vercel env pull .env.vercel
```

---

## 📚 Sonraki Adımlar

Production deployment tamamlandıktan sonra:

1. **[Performance Monitoring](../10-performance/)** - Performans optimizasyonu
2. **[Security Guidelines](../08-security/)** - Güvenlik best practices  
3. **[API Documentation](../03-api/)** - Production API endpoints
4. **[User Guides](../11-guides/)** - Son kullanıcı rehberleri

---

## 🎉 Deployment Başarılı!

**Production URL**: `https://your-domain.com`  
**Admin Panel**: `https://your-domain.com/admin`  
**API Health Check**: `https://your-domain.com/api/health`

### 🔗 Önemli Linkler

- **Vercel Dashboard**: [https://vercel.com/dashboard](https://vercel.com/dashboard)
- **Supabase Dashboard**: [https://app.supabase.com](https://app.supabase.com)
- **Domain DNS Management**: Your domain provider
- **Analytics**: Vercel Analytics dashboard

---

**✅ Production Deployment Tamamlandı!** 

Artık Dijital Kartvizit sisteminiz production'da canlı ve kullanıma hazır. Performans monitoring'i aktif ederek ve güvenlik best practices'lerini takip ederek sistem sağlığını koruyun.

---
*Son güncelleme: 2025-08-25 | Versiyon: 1.0.0*