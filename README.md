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

### Hetzner Server + Coolify

Bu proje **Hetzner sunucusu** üzerinde **Coolify** ile self-hosted olarak çalışmaktadır.

**Sunucu Altyapısı:**
- **Hosting**: Hetzner Cloud Server
- **Platform**: Coolify (Self-hosted PaaS)
- **Database**: PostgreSQL (Docker container)
- **Cache**: Upstash Redis KV
- **File Storage**: Cloudinary

**Detaylı kurulum için:** [Deployment Rehberi](docs/deployment/DEPLOYMENT.md)

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
