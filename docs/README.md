# 🎯 Dijital Kartvizit Sistemi - Ana Dokümantasyon

> **Modern dijital kartvizit platformu** - Next.js 14, TypeScript, PostgreSQL tabanlı

## 📋 Proje Genel Bakış

Bu sistem, işletmelerin dijital kartvizitlerini oluşturmasına, yönetmesine ve paylaşmasına olanak sağlayan modern bir web uygulamasıdır.

### ⭐ Temel Özellikler
- **9 Farklı Premium Template** - Altın, Waves, Luxury Black vb.
- **Çoklu Sosyal Medya Desteği** - Instagram, LinkedIn, WhatsApp vb.
- **Banka Hesap Bilgileri** - 17 farklı Türk bankası desteği
- **QR Kod Üretimi** - Otomatik QR kod oluşturma
- **vCard Export** - Telefon rehberine ekleme
- **Mobil Responsive** - Tüm cihazlarda optimum görünüm
- **Dosya Yükleme** - Logo, katalog, profil fotoğrafı
- **Admin Panel** - Kapsamlı yönetim sistemi

### 🏗️ Teknoloji Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Storage**: Local file system + Volume mounting
- **Styling**: Tailwind CSS, Custom CSS
- **Templating**: Handlebars
- **Containerization**: Docker
- **Authentication**: NextAuth.js

## 📚 Dokümantasyon İndeksi

### 🏛️ Sistem Mimarisi
- [**ARCHITECTURE.md**](./ARCHITECTURE.md) - Genel sistem mimarisi ve bileşenler
- [**API-DOCUMENTATION.md**](./API-DOCUMENTATION.md) - REST API endpoints ve örnekler
- [**DATABASE-SCHEMA.md**](./DATABASE-SCHEMA.md) - Veritabanı şeması ve ilişkiler

### 🚀 Geliştirici Rehberleri
- [**developer-guides/QUICK-START.md**](./developer-guides/QUICK-START.md) - Hızlı başlangıç rehberi
- [**developer-guides/FRONTEND-GUIDE.md**](./developer-guides/FRONTEND-GUIDE.md) - Frontend geliştirme rehberi
- [**developer-guides/BACKEND-GUIDE.md**](./developer-guides/BACKEND-GUIDE.md) - Backend geliştirme rehberi
- [**developer-guides/CODE-STANDARDS.md**](./developer-guides/CODE-STANDARDS.md) - Kodlama standartları

### 🔧 Teknik Dokümantasyon
- [**technical/TEMPLATE-SYSTEM.md**](./technical/TEMPLATE-SYSTEM.md) - Template sistemi detayları
- [**technical/FILE-UPLOAD.md**](./technical/FILE-UPLOAD.md) - Dosya yükleme sistemi
- [**technical/PERFORMANCE.md**](./technical/PERFORMANCE.md) - Performans optimizasyonu

### 🛡️ Güvenlik ve Operasyon
- [**SECURITY.md**](./SECURITY.md) - Güvenlik rehberi ve best practices
- [**DEPLOYMENT.md**](../DEPLOYMENT.md) - Production deployment rehberi
- [**operations/TROUBLESHOOTING.md**](./operations/TROUBLESHOOTING.md) - Sorun giderme

## 🚀 Hızlı Başlangıç

```bash
# 1. Repository'yi clone edin
git clone <repo-url>
cd dijitalKartvizit

# 2. Bağımlılıkları yükleyin
npm install

# 3. Environment variables'ları ayarlayın
cp .env.example .env.local

# 4. Database'i hazırlayın
npm run db:push

# 5. Geliştirme sunucusunu başlatın
npm run dev
```

## 📊 Sistem İstatistikleri

| Bileşen | Sayı | Açıklama |
|---------|------|----------|
| **API Endpoints** | 17 | REST API endpoints |
| **Templates** | 9 | Premium kartvizit şablonları |
| **Database Tables** | 10 | İlişkisel veritabanı tabloları |
| **React Components** | 20+ | Yeniden kullanılabilir bileşenler |
| **Supported Banks** | 17 | Türk bankası logoları |
| **Social Platforms** | 10+ | Sosyal medya platformları |

## 👥 Ekip Rolleri ve Sorumlulukları

### 🎨 Frontend Developer
- React bileşenleri geliştirme
- Responsive tasarım implementasyonu
- Template sistemi geliştirme
- UI/UX optimizasyonu

### ⚙️ Backend Developer
- API endpoint geliştirme
- Database operasyonları
- Dosya yükleme sistemi
- Performance optimizasyonu

### 🛡️ Security Expert
- Güvenlik açığı analizi
- Data privacy uyumluluk
- Authentication sistemi
- Input validation

### 🚀 DevOps Engineer
- Docker containerization
- Production deployment
- Monitoring ve logging
- Backup stratejileri

## 📞 Destek ve İletişim

- **Hata Bildirimi**: GitHub Issues
- **Özellik İsteği**: GitHub Discussions
- **Acil Destek**: Admin dashboard üzerinden

## 📄 Lisans

Bu proje özel lisans altındadır. Kullanım koşulları için [LICENSE](../LICENSE) dosyasına bakın.

---

> 📝 **Not**: Bu dokümantasyon sürekli güncellenmektedir. En güncel bilgiler için ilgili bölüm dokümantasyonlarını kontrol edin.