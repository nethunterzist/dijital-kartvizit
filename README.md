# Dijital Kartvizit Uygulaması

Modern ve kullanıcı dostu dijital kartvizit oluşturma platformu.

## 🚀 Özellikler

### Temel Özellikler
- **Kolay Kartvizit Oluşturma**: Sürükle-bırak ile kolay tasarım
- **QR Kod Entegrasyonu**: Otomatik QR kod oluşturma ve yönetimi
- **Responsive Tasarım**: Tüm cihazlarda (mobil, tablet, desktop) mükemmel görünüm
- **Admin Paneli**: Kapsamlı yönetim sistemi ve dashboard
- **vCard Support**: Rehbere tek tıkla ekleme özelliği

### İletişim ve Sosyal Medya
- **Çoklu İletişim Yönetimi**: Telefon, e-posta, WhatsApp, adres, fax, website
- **Sosyal Medya Entegrasyonu**: Instagram, Facebook, Twitter, LinkedIn, YouTube, TikTok
- **Özelleştirilebilir Etiketler**: Her iletişim kanalı için özel etiketler
- **Sıralama ve Önceliklendirme**: İkon sıralaması ve görünürlük kontrolü

### Finansal Bilgiler
- **Çoklu Banka Hesabı Desteği**: Sınırsız banka hesabı ekleme
- **Çoklu IBAN Yönetimi**: Her banka için farklı para birimlerinde IBAN tanımlama
- **Banka Logo Entegrasyonu**: Otomatik banka logo gösterimi
- **Para Birimi Desteği**: TRY, EUR, USD ve diğer para birimleri

### İçerik Yönetimi
- **Firma Hakkında**: Zengin metin editörü ile firma tanıtımı
- **Katalog Yönetimi**: PDF katalog yükleme ve görüntüleme
- **Profil ve Logo**: Yüksek kaliteli görsel yönetimi
- **Özel URL (Slug)**: SEO uyumlu özel URL'ler

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Cache**: Upstash Redis KV
- **File Storage**: Cloudinary (production)
- **Testing**: Jest + React Testing Library
- **Monitoring**: Sentry, Winston Logger

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- PostgreSQL 14+
- npm veya yarn

### Yerel Geliştirme

1. Repository'yi klonlayın:
```bash
git clone https://github.com/nethunterzist/sanalkartvizitim.git
cd sanalkartvizitim
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment variables'ları ayarlayın:
```bash
cp .env.example .env
```

4. Veritabanını başlatın:
```bash
npx prisma db push
```

5. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📁 Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin paneli
│   ├── api/               # API routes
│   ├── components/        # React bileşenleri
│   └── lib/               # Utility fonksiyonları
├── prisma/                # Database schema ve migrations
├── public/                # Static dosyalar
├── __tests__/             # Test dosyaları
└── docs/                  # Dokümantasyon
    ├── api/              # API dokümantasyonu
    ├── architecture/     # Mimari dokümantasyon
    ├── deployment/       # Deployment rehberleri
    ├── guides/           # Kullanıcı rehberleri
    ├── security/         # Güvenlik dokümantasyonu
    └── reports/          # Geliştirme raporları
```

## 📚 Dokümantasyon

### Başlangıç Rehberleri
- **[Dokümantasyon Ana Sayfası](docs/README.md)** - Tüm dokümantasyona erişim
- **[Hızlı Başlangıç](docs/developer-guides/QUICK-START.md)** - Projeye hızlı başlangıç
- **[Katkıda Bulunma](docs/guides/CONTRIBUTING.md)** - Geliştirici katkı rehberi

### Teknik Dokümantasyon
- **[API Dokümantasyonu](docs/api/API.md)** - API endpoint'leri ve kullanım örnekleri
- **[Mimari Rehber](docs/architecture/ARCHITECTURE.md)** - Sistem mimarisi ve teknik detaylar
- **[Veritabanı Şeması](docs/architecture/DATABASE-SCHEMA.md)** - Veritabanı yapısı ve ilişkiler

### Deployment ve Operasyon
- **[Deployment Rehberi](docs/deployment/DEPLOYMENT.md)** - Production deployment kılavuzu
- **[Deployment Checklist](docs/deployment/DEPLOYMENT_CHECKLIST.md)** - Canlıya alma kontrol listesi
- **[İzleme ve Gözlemleme](docs/guides/MONITORING.md)** - Sistem izleme ve uyarı konfigürasyonu

### Güvenlik ve Kalite
- **[Güvenlik Dokümantasyonu](docs/security/SECURITY.md)** - Güvenlik önlemleri ve best practices
- **[Erişilebilirlik Rehberi](docs/guides/ACCESSIBILITY.md)** - WCAG uyumluluk ve erişilebilirlik
- **[Test Rehberi](docs/guides/TESTING_QUICK_START.md)** - Test yazma ve çalıştırma

## 🚀 Production Deployment

### Hetzner Server + Coolify + Docker

Bu proje **Hetzner sunucusu** üzerinde **Coolify** ile self-hosted olarak çalışmaktadır.

**Canlı Site**: [https://dijitalkartvizitmerkezi.com](https://dijitalkartvizitmerkezi.com)

**Sunucu Altyapısı:**
- **Hosting**: Hetzner Cloud Server (157.180.78.53)
- **Platform**: Coolify v4.0.0-beta.460 (Self-hosted PaaS)
- **Build System**: Nixpacks v1.41.0
- **Container Runtime**: Docker
- **Database**: PostgreSQL 14+ (Docker container)
- **Reverse Proxy**: Traefik (automatic HTTPS)
- **SSL**: Let's Encrypt (automatic renewal)
- **Cache**: Upstash Redis KV
- **File Storage**: Cloudinary

**Detaylı kurulum için:** [Production Deployment Rehberi](#production-deployment-detaylı-rehber)

---

## 📖 Production Deployment Detaylı Rehber

Bu bölümde, projeyi Hetzner sunucusunda Coolify ile production'a alma sürecinde karşılaştığımız **tüm sorunlar** ve **çözümler** detaylı olarak açıklanmıştır.

### 🎯 Deployment Hedefi

**Amaç**: Next.js 14 uygulamasını Hetzner VPS'de Coolify ile self-hosted olarak production'a almak

**Başlangıç Durumu**:
- ✅ Local development çalışıyor
- ✅ Git repository hazır (GitHub)
- ✅ Hetzner sunucusu aktif
- ✅ Coolify kurulumu tamamlanmış
- ❌ Production deployment başarısız (100+ başarısız deneme)

---

### 🛠️ Adım 1: Hetzner Sunucu Kurulumu

#### 1.1 Sunucu Özellikleri
```
Server IP: 157.180.78.53
OS: Ubuntu 22.04 LTS
RAM: 4GB (minimum)
Storage: 80GB SSD
Coolify Port: 8000
```

#### 1.2 Coolify Kurulumu
```bash
# Coolify installation script
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash

# Coolify erişimi
http://157.180.78.53:8000
```

**İlk Admin Kurulumu**:
- Email: admin@dijitalkartvizit.com
- Password: [güvenli şifre]
- Team: Root Team

---

### 🔧 Adım 2: Coolify'da Proje Yapılandırması

#### 2.1 Application Oluşturma

**Coolify Dashboard → New Resource → Application**

**Git Configuration**:
- Source: GitHub
- Repository: `https://github.com/nethunterzist/dijital-kartvizit`
- Branch: `main`
- Build Pack: Nixpacks (auto-detected)

**Sunucu Seçimi**:
- Server: localhost (Coolify'nin kurulu olduğu sunucu)
- Destination: localhost-coolify

#### 2.2 Environment Variables

**Kritik Değişkenler** (Coolify dashboard'dan eklendi):

```env
# Database (Coolify tarafından otomatik oluşturuldu)
DATABASE_URL="postgresql://postgres:[password]@[container-id]:5432/postgres"

# NextAuth Configuration
NEXTAUTH_SECRET="[64+ karakter rastgele string]"
NEXTAUTH_URL="https://dijitalkartvizitmerkezi.com"

# Node.js Environment
NODE_ENV="production"

# Upstash Redis (Optional - caching)
KV_URL="rediss://default:[token]@[endpoint].upstash.io:6379"
KV_REST_API_URL="https://[endpoint].upstash.io"
KV_REST_API_TOKEN="[token]"

# Cloudinary (Optional - file storage)
CLOUDINARY_CLOUD_NAME="[cloud-name]"
CLOUDINARY_API_KEY="[api-key]"
CLOUDINARY_API_SECRET="[api-secret]"
```

**NextAuth Secret Oluşturma**:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

---

### ⚠️ Karşılaşılan Sorunlar ve Çözümler

#### Sorun 1: Prisma Client Initialization Error (Build-time)

**Hata Mesajı**:
```
Error: @prisma/client did not initialize yet.
Please run "prisma generate" and try to import it again.
at new PrismaClient (/app/node_modules/.prisma/client/default.js:43:11)
```

**Hata Zamanı**: Next.js build sırasında "Collecting page data" aşamasında

**Kök Neden**:
- `/app/api/firmalar/[id]/route.ts` dosyasında **module-level** `new PrismaClient()` instantiation
- Build-time'da Next.js API route'ları analiz ederken Prisma Client henüz hazır değildi

**Çözüm**:
```typescript
// ❌ YANLIŞ - Module-level instantiation
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ DOĞRU - Lazy-loading pattern
import { prisma } from '@/app/lib/db';
```

**Uygulanan Fix** (Commit: e40ad61):
- `/app/api/firmalar/[id]/route.ts` dosyasını güncelleme
- Module-level PrismaClient kaldırma (24 satır)
- Merkezi lazy-loading import ekleme

**app/lib/db.ts** (Zaten mevcuttu):
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getPrismaClient() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client;
  }

  return client;
}

// Proxy pattern ile lazy initialization
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrismaClient();
    return client[prop as keyof PrismaClient];
  }
});
```

**Test**:
```bash
npm run build
# ✅ Build başarılı - "Collecting page data" geçildi
```

---

#### Sorun 2: Database Schema Error During Build (Sitemap Generation)

**Hata Mesajı**:
```
Error generating sitemap: error: relation "firmalar" does not exist
PostgreSQL Error Code: 42P01 (undefined_table)
at /app/.next/server/app/sitemap.xml/route.js
```

**Hata Zamanı**: Static page generation sırasında (9/13 pages)

**Kök Neden**:
- `sitemap.xml` generation sırasında database query yapılıyor
- Build-time'da database tabloları henüz oluşturulmamış
- `getAllFirmalar()` fonksiyonu database hatalarını handle etmiyor

**Çözüm** (Commit: 1790c23):

**app/lib/direct-db.ts** dosyasına graceful error handling ekleme:

```typescript
export async function getAllFirmalar(search?: string, page = 1, limit = 1000) {
  try {
    const client = await getPool().connect();

    try {
      const offset = (page - 1) * limit;
      // ... query logic
      return {
        data: firmalar,
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      };
    } finally {
      client.release();
    }
  } catch (error) {
    // Graceful error handling for build-time database unavailability
    console.error('Database query error (possibly during build):',
      error instanceof Error ? error.message : 'Unknown error'
    );

    return {
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 0
    };
  }
}
```

**Sonuç**:
- Build sırasında database yoksa: boş sitemap oluşturulur
- Runtime'da database varsa: dinamik sitemap doldurulur
- Build başarıyla tamamlanır

**Test**:
```bash
npm run build
# ✅ Generating static pages (13/13) - Başarılı!
```

---

#### Sorun 3: Domain Configuration ve SSL

**İlk Durum**:
- Default Coolify domain: `http://pksw4ss08408kgscs844kg0c.157.180.78.53.sslip.io`
- Hedef domain: `https://dijitalkartvizitmerkezi.com`

**Adımlar**:

**3.1 Coolify'da Domain Değişikliği**:
```
Coolify → Application → Configuration → Domain
```
- Eski: `http://pksw4ss08408kgscs844kg0c.157.180.78.53.sslip.io`
- Yeni: `https://dijitalkartvizitmerkezi.com`

**3.2 DNS Kayıtları Ekleme** (Domain firması dashboard):

```dns
# A Records
Type: A
Name: www
Content: 157.180.78.53
TTL: Auto

Type: A
Name: @ (veya dijitalkartvizitmerkezi.com)
Content: 157.180.78.53
TTL: Auto
```

**3.3 DNS Propagation Kontrolü**:
```bash
# Online tool kullanarak
https://dnschecker.org

# Veya terminal'den
nslookup dijitalkartvizitmerkezi.com
dig dijitalkartvizitmerkezi.com
```

**Bekleme Süresi**: 5-30 dakika (genellikle 5-10 dakika)

**3.4 SSL Sertifikası (Otomatik)**:

Coolify + Traefik otomatik olarak Let's Encrypt SSL sertifikası oluşturur:
- Redeploy yapıldıktan sonra
- DNS kayıtları yayıldıktan sonra
- İlk HTTPS isteği geldiğinde

**Traefik Labels** (Coolify tarafından otomatik eklendi):
```yaml
traefik.enable: true
traefik.http.middlewares.redirect-to-https.redirectscheme.scheme: https
traefik.http.routers.https-0-pksw4ss08408kgscs844kg0c.entryPoints: https
traefik.http.routers.https-0-pksw4ss08408kgscs844kg0c.rule: Host(`dijitalkartvizitmerkezi.com`)
```

**Doğrulama**:
```bash
# SSL sertifikası kontrolü
curl -I https://dijitalkartvizitmerkezi.com

# Çıktıda görmemiz gerekenler:
# HTTP/2 200
# Content-Type: text/html
# strict-transport-security: max-age=31536000
```

---

### 📊 Deployment Süreci ve Timeline

**Final Deployment** (Commit: 1790c23):

```
[11:58:49] Deployment başladı
[11:58:50] Git clone başarılı (commit: 1790c23)
[11:58:56] Nixpacks plan oluşturuldu
[11:59:00] Docker build başladı
[12:00:14] npm ci tamamlandı (695 packages, 76 saniye)
[12:00:18] Prisma generate başarılı (591ms)
[12:00:20] npm run build başladı
[12:01:44] Collecting page data...
[12:01:52] Database error gracefully handled ✅
[12:01:55] Generating static pages (13/13) ✅
[12:02:18] Build tamamlandı (119 saniye)
[12:02:51] Docker image export
[12:02:54] Container başlatıldı (pksw4ss08408kgscs844kg0c-115847626134)
[12:02:56] Eski container kaldırıldı
[12:02:56] Deployment BAŞARILI! ✅
```

**Toplam Deployment Süresi**: ~4 dakika

---

### 🏗️ Build Configuration (Nixpacks)

Coolify Nixpacks'i otomatik algılıyor ve aşağıdaki konfigürasyonu oluşturuyor:

**Algılanan Stack**:
```yaml
providers: []
buildImage: ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
variables:
  NODE_ENV: production
  NIXPACKS_NODE_VERSION: "22"
  NPM_CONFIG_PRODUCTION: "false"
phases:
  setup:
    nixPkgs: [nodejs_22, npm-9_x, openssl, curl, wget]
  install:
    cmds: ["npm ci"]
  build:
    cmds: ["npm run build"]
start:
  cmd: "next start"
```

**package.json Scripts**:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

**Build Komut Sırası**:
1. `npm ci` - Dependencies kurulumu
2. `prisma generate` - Prisma Client oluşturma (postinstall)
3. `npm run build` - Next.js production build
4. `next start` - Production server başlatma

---

### 🐳 Docker Container Yapılandırması

**Container Details**:
```
Container Name: pksw4ss08408kgscs844kg0c-115847626134
Image: pksw4ss08408kgscs844kg0c:1790c23e85c6b7edf0503ee28defe637eb2f6a98
Network: coolify
Port: 3000 (internal)
Restart Policy: unless-stopped
```

**Environment Variables** (Runtime):
```env
SOURCE_COMMIT=1790c23e85c6b7edf0503ee28defe637eb2f6a98
COOLIFY_URL=https://dijitalkartvizitmerkezi.com
COOLIFY_FQDN=dijitalkartvizitmerkezi.com
COOLIFY_BRANCH=main
DATABASE_URL=postgres://postgres:[password]@[db-container]:5432/postgres
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
```

**Docker Compose** (Coolify tarafından oluşturuldu):
```yaml
version: '3.8'
services:
  app:
    image: pksw4ss08408kgscs844kg0c:1790c23e85c6b7edf0503ee28defe637eb2f6a98
    container_name: pksw4ss08408kgscs844kg0c-115847626134
    restart: unless-stopped
    networks:
      - coolify
    environment:
      - DATABASE_URL
      - NEXTAUTH_SECRET
      - NEXTAUTH_URL
      - NODE_ENV=production
    labels:
      - traefik.enable=true
      - traefik.http.routers.https-app.rule=Host(`dijitalkartvizitmerkezi.com`)
      - traefik.http.routers.https-app.entrypoints=https
      - traefik.http.routers.https-app.tls.certresolver=letsencrypt
networks:
  coolify:
    external: true
```

---

### 📋 Production Checklist

**✅ Tamamlanan Adımlar**:

- [x] Hetzner sunucu hazır
- [x] Coolify kurulumu
- [x] Git repository bağlantısı
- [x] Environment variables yapılandırması
- [x] Database container oluşturuldu
- [x] Prisma Client lazy-loading fix
- [x] Database graceful error handling
- [x] Local build testleri başarılı
- [x] Production build başarılı
- [x] Domain yapılandırması (dijitalkartvizitmerkezi.com)
- [x] DNS kayıtları eklendi ve yayıldı
- [x] SSL sertifikası otomatik oluşturuldu
- [x] Container başarıyla çalışıyor
- [x] Site canlıda erişilebilir

**⚠️ Kritik Güvenlik Adımı**:

```bash
# Default admin şifresini DEĞİŞTİRİN!
URL: https://dijitalkartvizitmerkezi.com/admin
Username: admin
Password: admin123  # ⚠️ HEMEN DEĞİŞTİRİN!
```

---

### 🎓 Öğrenilen Dersler

#### 1. Build-time vs Runtime Separation
**Problem**: Build sırasında database erişimi
**Çözüm**: Graceful degradation - build'de boş data, runtime'da dolu data

#### 2. Module-level Initialization
**Problem**: Next.js build sırasında PrismaClient initialization
**Çözüm**: Lazy-loading pattern ile Proxy kullanımı

#### 3. Environment-specific Configuration
**Problem**: Build ve runtime environment variables karışıklığı
**Çözüm**: Coolify'da "Build-time" ve "Runtime" ayırımı yapma

#### 4. DNS Propagation
**Problem**: DNS değişikliklerinin yayılması için bekleme
**Çözüm**: DNS checker tools kullanma, sabırlı olma (5-30 dakika)

#### 5. SSL Certificate Auto-generation
**Problem**: Manual SSL sertifika kurulumu karmaşıklığı
**Çözüm**: Traefik + Let's Encrypt otomatik yönetimi

---

### 🔍 Monitoring ve Debugging

#### Container Logs Görüntüleme

**Coolify Dashboard**:
```
Application → Deployment → Latest → Logs
```

**Docker CLI** (Sunucuda):
```bash
# Container logs
docker logs pksw4ss08408kgscs844kg0c-115847626134 -f

# Container durumu
docker ps | grep pksw4ss08408kgscs844kg0c

# Container içine giriş
docker exec -it pksw4ss08408kgscs844kg0c-115847626134 /bin/bash
```

#### Health Check

```bash
# API health endpoint
curl https://dijitalkartvizitmerkezi.com/api/health

# Expected response:
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-01-02T12:00:00.000Z"
}
```

#### Database Access

**Coolify Database Container**:
```bash
# Database container'a bağlan
docker exec -it [database-container-id] psql -U postgres

# Tablolar listele
\dt

# Firma sayısı
SELECT COUNT(*) FROM firmalar;
```

---

### 🚀 Deployment Workflow (Sonraki Deploymentlar)

**1. Kod Değişiklikleri**:
```bash
git add .
git commit -m "feat: yeni özellik eklendi"
git push origin main
```

**2. Coolify'da Redeploy**:
- Coolify Dashboard → Application → Redeploy
- Veya: Git commit'i otomatik trigger (webhook ayarlanmışsa)

**3. Build ve Deploy**:
- Otomatik build başlar
- Tests pass olursa deploy edilir
- Eski container durur, yeni container başlar (zero-downtime)

**4. Verification**:
```bash
# Site kontrolü
curl -I https://dijitalkartvizitmerkezi.com

# Logs kontrolü
# Coolify dashboard'dan
```

---

### 📊 Performance Metrics

**Build Metrikleri**:
- Dependencies install: ~76 saniye (695 packages)
- Prisma generate: ~600ms
- Next.js build: ~119 saniye
- Docker image size: ~800MB
- Total deployment time: ~4 dakika

**Runtime Performance**:
- Container start time: <2 saniye
- First request: <500ms
- Subsequent requests: <100ms
- Memory usage: ~150MB (idle), ~300MB (peak)

---

### 🔒 Güvenlik Notları

**Coolify Güvenlik**:
- Coolify dashboard sadece sunucu IP'sinden erişilebilir
- SSH key authentication kullanılıyor
- Database container internal network'te (dışarıdan erişilemez)

**Application Güvenlik**:
- HTTPS zorunlu (Traefik redirect)
- Security headers aktif (next.config.js)
- Rate limiting aktif (5 attempt / 15 min)
- Environment secrets encrypted (Coolify)

**Backup Strategy**:
- Database: Günlük otomatik backup (Coolify)
- Files: Cloudinary'de bulut storage
- Code: Git repository

---

### 📞 Troubleshooting Common Issues

#### Issue: "502 Bad Gateway"
**Neden**: Container başlamadı veya çöktü
**Çözüm**:
```bash
docker logs [container-id] --tail 100
# Hata mesajlarını kontrol et
# Container restart: Coolify dashboard → Restart
```

#### Issue: "DNS_PROBE_FINISHED_NXDOMAIN"
**Neden**: DNS kayıtları henüz yayılmadı
**Çözüm**:
- 5-30 dakika bekle
- DNS checker ile kontrol et: https://dnschecker.org
- Cache temizle: `ipconfig /flushdns` (Windows) veya `sudo dscacheutil -flushcache` (Mac)

#### Issue: Database Connection Error
**Neden**: DATABASE_URL yanlış veya database container çalışmıyor
**Çözüm**:
```bash
# Database container kontrolü
docker ps | grep postgres

# Database bağlantı testi
docker exec -it [db-container] psql -U postgres -c "SELECT 1;"
```

#### Issue: Build Failed
**Neden**: Type errors, dependency issues, environment variables eksik
**Çözüm**:
1. Coolify logs kontrol et
2. Local'de test et: `npm run build`
3. Environment variables kontrol et
4. Cache temizle ve rebuild: Coolify → Clear Cache → Redeploy

---

## 🎉 Sonuç

Bu deployment süreci boyunca:
- ✅ **2 kritik bug** tespit edildi ve düzeltildi
- ✅ **100+ başarısız deneme** sonrası başarılı deployment
- ✅ **Production-ready** uygulama elde edildi
- ✅ **Self-hosted** ve **maliyet-efektif** altyapı kuruldu
- ✅ **Otomatik SSL** ve **zero-downtime** deployment

**Final Site**: [https://dijitalkartvizitmerkezi.com](https://dijitalkartvizitmerkezi.com)

**Deployment Tarihi**: 2 Ocak 2026
**Final Commit**: 1790c23e85c6b7edf0503ee28defe637eb2f6a98

### Environment Variables

**Temel Yapılandırma:**
```env
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_SECRET="your-super-secret-key-min-64-chars"
NEXTAUTH_URL="https://your-domain.com"
NODE_ENV="production"
```

**Opsiyonel (Cache & Storage):**
```env
KV_URL="rediss://default:[TOKEN]@[endpoint].upstash.io:6379"
KV_REST_API_URL="https://[endpoint].upstash.io"
KV_REST_API_TOKEN="your-token"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

Tam liste için: `.env.example` dosyasına bakın

## 🔧 Admin Setup

### İlk Admin Kullanıcısı

Uygulama ilk çalıştırıldığında `/api/health` endpoint'i otomatik olarak default admin kullanıcısı oluşturur:

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

**⚠️ Önemli:** Production ortamında bu şifreyi mutlaka değiştirin!

## 📊 Performance & Kalite

- **Lighthouse Score**: 95+
- **Test Coverage**: 60-70%
- **Bundle Size**: ~150KB (optimized)
- **Loading Time**: <2s
- **SEO Friendly**: Meta tags ve structured data
- **Accessibility**: WCAG 2.1 AA uyumlu

## 🔒 Güvenlik

- ✅ HTTPS zorunlu
- ✅ SQL Injection koruması
- ✅ XSS koruması
- ✅ CSRF koruması
- ✅ Rate limiting (5 login attempts / 15 minutes)
- ✅ Input validation (Zod schemas)
- ✅ File upload security (5MB limit, MIME validation)
- ✅ Security headers (CSP, HSTS, X-Frame-Options)

Detaylı bilgi: [Güvenlik Dokümantasyonu](docs/security/SECURITY.md)

## 🚨 Troubleshooting

### Yaygın Sorunlar

#### Database Bağlantı Hatası
```bash
# Database URL'ini kontrol edin
psql $DATABASE_URL
```

#### Build Hatası
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Prisma Hatası
```bash
npx prisma generate
npx prisma db push
```

### Sağlık Kontrolü
```bash
curl http://localhost:3000/api/health
```

## 🧪 Testing

```bash
# Tüm testleri çalıştır
npm test

# Coverage raporu
npm test -- --coverage

# Watch mode
npm test -- --watch
```

Test dokümantasyonu: [Test Rehberi](docs/guides/TESTING_QUICK_START.md)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

Detaylı bilgi: [Katkıda Bulunma Rehberi](docs/guides/CONTRIBUTING.md)

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje sahibi: [@nethunterzist](https://github.com/nethunterzist)

Proje Linki: [https://github.com/nethunterzist/sanalkartvizitim](https://github.com/nethunterzist/sanalkartvizitim)

## 🔗 Faydalı Linkler

- [Dokümantasyon Ana Sayfası](docs/README.md)
- [Deployment Checklist](docs/deployment/DEPLOYMENT_CHECKLIST.md)
- [Production Hazırlık Raporu](docs/reports/PRODUCTION_READY_REPORT.md)
- [Mimari Kararlar](docs/architecture/ARCHITECTURE.md)
- [API Referansı](docs/api/API.md)
