# 📚 Dijital Kartvizit - Dokümantasyon Merkezi

Modern dijital kartvizit sisteminin kapsamlı teknik dokümantasyonu. Bu merkezi hub, sistemin tüm yönlerini detaylı bir şekilde açıklar ve geliştiriciler, yöneticiler ve son kullanıcılar için rehberlik sağlar.

## 🎯 Proje Hakkında

**Dijital Kartvizit Sistemi**, modern iş dünyasının ihtiyaçlarını karşılayan, tamamen web tabanlı bir kartvizit oluşturma ve yönetim platformudur. Sistem, kullanıcı dostu arayüzü, güçlü admin paneli ve esnek template sistemi ile öne çıkar.

### ✨ Temel Özellikler
- 🎨 **40+ Profesyonel Template** - Her sektöre uygun tasarımlar
- 📱 **Tam Responsive** - Mobil-first yaklaşım
- ⚡ **QR Kod Entegrasyonu** - Anında paylaşım
- 🔒 **Güvenli Admin Panel** - Kapsamlı yönetim sistemi
- 📤 **Çoklu Export** - PDF, vCard, URL paylaşımı
- 🏦 **Banka Entegrasyonu** - IBAN ve hesap bilgileri
- 🌐 **SEO Optimizasyonu** - Arama motoru dostu

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji | Versiyon | Açıklama |
|--------|-----------|----------|-----------|
| **Frontend** | Next.js | 14.x | React tabanlı full-stack framework |
| **Backend** | Next.js API Routes | 14.x | API endpoints |
| **Database** | PostgreSQL | Latest | Self-hosted database |
| **ORM** | Prisma | 6.x | Type-safe database client |
| **Styling** | Tailwind CSS | 3.x | Utility-first CSS framework |
| **Authentication** | NextAuth.js | 4.x | Secure authentication system |
| **Deployment** | Hetzner + Coolify | Latest | Self-hosted deployment platform |
| **Cache** | Upstash Redis KV | Latest | Distributed cache system |
| **Containerization** | Docker | Latest | Container deployment |

## 📋 Dokümantasyon Navigasyonu

### 🏗️ [01. Sistem Mimarisi](./01-architecture/)
Sistem tasarımı, teknoloji seçimleri ve mimari kararların detaylı açıklamaları.
- Genel sistem mimarisi
- Teknoloji yığını analizi
- Tasarım desenleri
- Veri akış diyagramları
- Ölçeklenebilirlik planı

### 💻 [02. Geliştirme Ortamı](./02-development/)
Local development kurulumu ve geliştirme best practices.
- Kurulum kılavuzu
- Kodlama standartları
- Git workflow
- Debug teknikleri
- Environment konfigürasyonu

### 🔌 [03. API Dokümantasyonu](./03-api/)
REST API endpoints, authentication ve kullanım örnekleri.
- **Endpoints**: Tüm API rotaları ([endpoints/](./03-api/endpoints/))
- **Authentication**: Güvenlik sistemi ([authentication/](./03-api/authentication/))
- **Validation**: Girdi doğrulama ([validation/](./03-api/validation/))
- **Examples**: Kullanım örnekleri ([examples/](./03-api/examples/))

### 🗄️ [04. Veritabanı](./04-database/)
Database schema, migrations ve veritabanı yönetimi.
- **Schema**: Tablo yapıları ([schema/](./04-database/schema/))
- **Migrations**: Migration dosyaları ([migrations/](./04-database/migrations/))
- **Queries**: Sorgu örnekleri ([queries/](./04-database/queries/))
- **Backup**: Yedekleme prosedürleri ([backup/](./04-database/backup/))

### 🚀 [05. Deployment](./05-deployment/)
Production deployment ve DevOps süreçleri.
- **Coolify**: Self-hosted deployment platform
- **PostgreSQL**: Database setup and management
- **Environment**: Environment variables ([environment/](./05-deployment/environment/))
- **Monitoring**: İzleme sistemleri ([monitoring/](./05-deployment/monitoring/))

### 🎨 [06. Frontend](./06-frontend/)
React/Next.js bileşenleri ve frontend geliştirme.
- **Components**: Bileşen dokümantasyonu ([components/](./06-frontend/components/))
- **Templates**: Template sistemi ([templates/](./06-frontend/templates/))
- **Styling**: CSS/Tailwind kılavuzu ([styling/](./06-frontend/styling/))
- **Icons**: Icon sistemi ([icons/](./06-frontend/icons/))

### ⚙️ [07. Backend](./07-backend/)
Server-side logic, services ve backend altyapısı.
- **Services**: Servis sınıfları ([services/](./07-backend/services/))
- **Auth**: Authentication sistemi ([auth/](./07-backend/auth/))
- **File Handling**: Dosya yönetimi ([file-handling/](./07-backend/file-handling/))
- **Cache**: Caching stratejileri ([cache/](./07-backend/cache/))

### 🔒 [08. Güvenlik](./08-security/)
Security best practices ve güvenlik dokümantasyonu.
- **Auth**: Authentication/Authorization ([auth/](./08-security/auth/))
- **Validation**: Input validation ([validation/](./08-security/validation/))
- **Best Practices**: Güvenlik kılavuzu ([best-practices/](./08-security/best-practices/))
- **Vulnerability Reports**: Güvenlik raporları ([vulnerability-reports/](./08-security/vulnerability-reports/))

### 🧪 [09. Testing](./09-testing/)
Test stratejileri ve test dokümantasyonu.
- **Unit Tests**: Birim testleri ([unit-tests/](./09-testing/unit-tests/))
- **Integration Tests**: Entegrasyon testleri ([integration-tests/](./09-testing/integration-tests/))
- **E2E Tests**: End-to-end testler ([e2e-tests/](./09-testing/e2e-tests/))
- **Performance Tests**: Performans testleri ([performance-tests/](./09-testing/performance-tests/))

### ⚡ [10. Performans](./10-performance/)
Performans optimizasyonu ve monitoring.
- **Optimization**: Optimizasyon teknikleri ([optimization/](./10-performance/optimization/))
- **Monitoring**: İzleme sistemleri ([monitoring/](./10-performance/monitoring/))
- **Benchmarks**: Performance benchmarks ([benchmarks/](./10-performance/benchmarks/))
- **Reports**: Performans raporları ([reports/](./10-performance/reports/))

### 📚 [11. Kılavuz ve Rehberler](./11-guides/)
Kullanıcı, admin ve geliştirici kılavuzları.
- **User Guides**: Kullanıcı rehberleri ([user-guides/](./11-guides/user-guides/))
- **Admin Guides**: Yönetici kılavuzları ([admin-guides/](./11-guides/admin-guides/))
- **Developer Guides**: Geliştirici rehberleri ([developer-guides/](./11-guides/developer-guides/))
- **Troubleshooting**: Sorun giderme ([troubleshooting/](./11-guides/troubleshooting/))

### 🔧 [12. Sorun Giderme](./12-troubleshooting/)
Yaygın sorunlar ve çözümleri.
- Bağlantı sorunları
- Build ve deployment hataları
- Database sorunları
- Performance sorunları
- Debug teknikleri

## 🚀 Hızlı Başlangıç

### Geliştirici İçin
```bash
# 1. Repository klonlama
git clone https://github.com/username/dijital-kartvizit.git
cd dijital-kartvizit

# 2. Bağımlılık yükleme
npm install

# 3. Environment variables
cp .env.example .env.local
# .env.local dosyasını düzenleyin

# 4. Database kurulumu
npm run db:push

# 5. Development server
npm run dev
```

### Sistem Yöneticisi İçin
1. [Deployment Guide](./05-deployment/) - Production kurulumu
2. [Admin Guides](./11-guides/admin-guides/) - Yönetici panel kullanımı
3. [Security](./08-security/) - Güvenlik konfigürasyonu
4. [Monitoring](./10-performance/monitoring/) - İzleme sistemleri

### Son Kullanıcı İçin
1. [User Guides](./11-guides/user-guides/) - Kullanıcı rehberleri
2. [FAQ](./11-guides/faq.md) - Sık sorulan sorular
3. [Getting Started](./11-guides/getting-started.md) - İlk adımlar

## 📊 Sistem Durumu

| Metrik | Hedef | Mevcut |
|--------|-------|---------|
| **Lighthouse Performance** | >90 | 95+ |
| **Core Web Vitals LCP** | <2.5s | <2.0s |
| **API Response Time** | <200ms | ~150ms |
| **Database Query Time** | <100ms | ~80ms |
| **Bundle Size** | <500KB | ~450KB |
| **Test Coverage** | >80% | 85%+ |

## 🔗 Önemli Linkler

### Production Environment
- **Live Site**: [https://yourdomain.com](https://yourdomain.com)
- **Admin Panel**: [https://yourdomain.com/admin](https://yourdomain.com/admin)
- **API Health**: [https://yourdomain.com/api/health](https://yourdomain.com/api/health)

### Development Resources
- **GitHub Repository**: [Project Repository](https://github.com/username/dijital-kartvizit)
- **Coolify Dashboard**: Self-hosted deployment management
- **PostgreSQL**: Direct database management

### External Documentation
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs**: [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

## 🤝 Katkıda Bulunma

### Dokümantasyon Katkısı
1. **Issue açın** - Eksik veya hatalı dokümantasyon için
2. **Pull Request gönderin** - Düzeltmeler ve iyileştirmeler için
3. **Best Practices takip edin** - [Contribution Guidelines](./CONTRIBUTING.md)

### Geliştirme Katkısı
1. **Feature Branch** oluşturun
2. **Tests yazın** - Yeni özellikler için
3. **Documentation güncelleyin** - Code değişiklikleri için
4. **Code Review** sürecini takip edin

## 📞 İletişim ve Destek

### Teknik Destek
- **GitHub Issues**: [Project Issues](https://github.com/username/dijital-kartvizit/issues)
- **Documentation Issues**: Bu repository'de issue açın
- **Stack Overflow**: `dijital-kartvizit` tag'i ile

### İş Katkısı
- **Feature Requests**: GitHub Issues üzerinden
- **Bug Reports**: Detaylı repro steps ile
- **Security Issues**: Private olarak bildirin

---

## 📝 Dokümantasyon Bilgileri

- **Son Güncelleme**: 2025-08-25
- **Versiyon**: 1.0.0
- **Dil**: Türkçe (Ana), English (Kısmi)
- **Durum**: 🟢 Aktif Geliştirme

**Bu dokümantasyon sürekli güncellenmektedir. Değişiklikler için GitHub repository'sini takip edin.**