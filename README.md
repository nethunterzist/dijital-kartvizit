# Dijital Kartvizit Uygulaması

Modern ve kullanıcı dostu dijital kartvizit oluşturma platformu.

**🌐 Canlı Site**: [https://dijitalkartvizitmerkezi.com](https://dijitalkartvizitmerkezi.com)

---

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

---

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Cache**: Upstash Redis KV
- **File Storage**: Cloudinary (production), Local (development)
- **Infrastructure**: Hetzner Cloud + Coolify v4 + Docker

---

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
# .env dosyasını düzenleyin
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

**Detaylı kurulum için**: [SETUP.md](docs/development/SETUP.md)

---

## 📁 Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin paneli
│   ├── api/               # API routes
│   ├── components/        # React bileşenleri
│   └── lib/               # Utility fonksiyonları
├── schema.prisma          # Database schema (⚠️ kök dizinde)
├── public/                # Static dosyalar
├── docs/                  # 📚 Kapsamlı Dokümantasyon
│   ├── api/              # API dokümantasyonu
│   ├── architecture/     # Mimari dokümantasyon
│   ├── development/      # Geliştirme rehberleri
│   └── infrastructure/   # Production deployment
└── middleware.ts          # Route koruması
```

---

## 📚 Dokümantasyon

### 🎯 Dokümantasyon Hub
**Tüm dokümantasyona erişim**: [`docs/README.md`](docs/README.md)

### Hızlı Erişim

**Geliştiriciler İçin**:
- [Kurulum Rehberi](docs/development/SETUP.md) - Yerel ortam kurulumu
- [Komut Referansı](docs/development/COMMANDS.md) - Tüm npm scriptleri
- [Geliştirme Workflows](docs/development/WORKFLOWS.md) - Yaygın iş akışları
- [Sorun Giderme](docs/development/TROUBLESHOOTING.md) - Yaygın sorunlar

**Mimarlar İçin**:
- [Mimari Genel Bakış](docs/architecture/OVERVIEW.md) - Sistem mimarisi
- [Kritik Patternler](docs/architecture/CRITICAL_PATTERNS.md) - Önemli kod kalıpları
- [Veritabanı Şeması](docs/architecture/DATABASE_SCHEMA.md) - Tam şema referansı
- [Servisler](docs/architecture/SERVICES.md) - Business logic servisleri

**API Kullanıcıları İçin**:
- [API Endpoints](docs/api/ENDPOINTS.md) - Tam API referansı
- [Validasyon Şemaları](docs/api/VALIDATION.md) - Zod şemaları
- [Hata Yönetimi](docs/api/ERROR_HANDLING.md) - Hata yanıt formatları

**DevOps İçin**:
- [Production Deployment](docs/infrastructure/PRODUCTION.md) - Hetzner + Coolify rehberi
- [İzleme & Sağlık](docs/infrastructure/MONITORING.md) - Monitoring kılavuzu
- [Production Snapshot](docs/infrastructure/PRODUCTION_SNAPSHOT.md) - Güncel production durumu (5 Ocak 2026)
- [Server Deep Dive](docs/infrastructure/SERVER_DEEP_DIVE.md) - SSH teknik analizi ve güvenlik denetimi (5 Ocak 2026)

---

## 🚀 Production Deployment

**Altyapı**: Hetzner Cloud Server + Coolify v4 + Docker + Traefik

**Gerekli Environment Variables**:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_SECRET="[64+ karakter rastgele string]"
NEXTAUTH_URL="https://your-domain.com"
NODE_ENV="production"
```

**Opsiyonel** (tam fonksiyonellik için):
```env
# Upstash Redis (Cache)
KV_URL="rediss://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."

# Cloudinary (File Storage)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

**NEXTAUTH_SECRET Oluşturma**:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

**📖 Detaylı Production Deployment Rehberi**: [PRODUCTION.md](docs/infrastructure/PRODUCTION.md)

Bu rehber şunları içerir:
- Hetzner sunucu kurulumu
- Coolify yapılandırması
- Domain ve SSL ayarları
- Karşılaşılan sorunlar ve çözümler (100+ başarısız denemeden sonra başarılı deployment)
- Build-time pattern'leri (Prisma lazy-loading, graceful degradation)
- Deployment timeline ve metrikleri
- Monitoring ve troubleshooting

---

## 🔧 Admin Setup

### İlk Admin Kullanıcısı

Uygulama ilk çalıştırıldığında `/api/health` endpoint'i otomatik olarak default admin kullanıcısı oluşturur:

**Default Credentials**:
- Username: `admin`
- Password: `admin123`

**⚠️ ÖNEMLİ**: Production ortamında bu şifreyi MUTLAKA değiştirin!

---

## 📊 Performance & Kalite

- **Lighthouse Score**: 95+
- **Bundle Size**: ~150KB (optimized)
- **Loading Time**: <2s
- **SEO Friendly**: Meta tags ve structured data
- **Accessibility**: WCAG 2.1 AA uyumlu

---

## 🔒 Güvenlik

**Uygulama Güvenliği**:
- ✅ HTTPS zorunlu (Traefik otomatik redirect)
- ✅ SQL Injection koruması (Prisma parameterized queries)
- ✅ XSS koruması (React auto-escaping + DOMPurify)
- ✅ CSRF koruması (NextAuth.js built-in)
- ✅ Rate limiting (5 login attempts / 15 dakika)
- ✅ Input validation (Zod schemas)
- ✅ File upload security (5MB limit, MIME validation)
- ✅ Security headers (CSP, HSTS, X-Frame-Options)

**Production Güvenliği**:
- SSL sertifikaları otomatik yenilenir (Let's Encrypt)
- Database container internal network'te (dışarıdan erişilemez)
- Environment secrets şifreli (Coolify)

---

## 🚨 Sorun Giderme

### Yaygın Sorunlar

**Build Hatası**: `@prisma/client did not initialize yet`
- **Çözüm**: Asla module-level `new PrismaClient()` kullanmayın
- Detay: [CRITICAL_PATTERNS.md](docs/architecture/CRITICAL_PATTERNS.md)

**Database Bağlantı Hatası**:
```bash
# Database URL'ini kontrol edin
psql $DATABASE_URL
```

**Deployment Başarısız**:
- Coolify logs kontrol edin
- Environment variables doğrulayın
- Local'de build test edin: `npm run build`

**📖 Tam Sorun Giderme Rehberi**: [TROUBLESHOOTING.md](docs/development/TROUBLESHOOTING.md)

---

## 🧪 Testing

```bash
# Tüm testleri çalıştır
npm test

# Coverage raporu
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: amazing feature eklendi'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

Kod standartları için [CLAUDE.md](CLAUDE.md) ve [Architecture guides](docs/architecture/) belgelerine bakın.

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 📞 İletişim

**Proje Sahibi**: [@nethunterzist](https://github.com/nethunterzist)

**Repository**: [github.com/nethunterzist/sanalkartvizitim](https://github.com/nethunterzist/sanalkartvizitim)

**Canlı Site**: [dijitalkartvizitmerkezi.com](https://dijitalkartvizitmerkezi.com)

---

## 🔗 Faydalı Linkler

- **[📚 Dokümantasyon Ana Sayfası](docs/README.md)**
- **[🚀 Production Deployment Rehberi](docs/infrastructure/PRODUCTION.md)**
- **[📊 Production Snapshot](docs/infrastructure/PRODUCTION_SNAPSHOT.md)** - Güncel canlı durum
- **[🔍 Server Deep Dive](docs/infrastructure/SERVER_DEEP_DIVE.md)** - SSH teknik analizi ve güvenlik denetimi
- **[🏗️ Mimari Genel Bakış](docs/architecture/OVERVIEW.md)**
- **[📖 API Referansı](docs/api/ENDPOINTS.md)**
- **[🛠️ Geliştirme Rehberleri](docs/development/)**

---

**Son Güncelleme**: Ocak 2026
**Versiyon**: 1.0
**Deployment Tarihi**: 2 Ocak 2026
