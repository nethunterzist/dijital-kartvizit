# 📚 Kılavuz ve Rehberler

Bu bölümde kullanıcı kılavuzları, admin rehberleri, geliştirici kılavuzları ve sorun giderme rehberleri yer almaktadır.

## 📋 İçerik Listesi

### 📁 Alt Klasörler
- [`user-guides/`](./user-guides/) - Son kullanıcı kılavuzları
- [`admin-guides/`](./admin-guides/) - Yönetici panel rehberleri
- [`developer-guides/`](./developer-guides/) - Geliştirici kılavuzları
- [`troubleshooting/`](./troubleshooting/) - Sorun giderme rehberleri

### 📄 Ana Dokümantasyon
- `getting-started.md` - Hızlı başlangıç rehberi
- `feature-overview.md` - Özellik genel bakış
- `workflow-guide.md` - İş akışı rehberi
- `best-practices.md` - En iyi uygulamalar
- `faq.md` - Sık sorulan sorular

### 🔗 İlgili Bölümler
- [Development](../02-development/) - Geliştirme ortamı
- [API Documentation](../03-api/) - API kullanımı
- [Troubleshooting](../12-troubleshooting/) - Teknik sorun giderme

## 👥 Kullanıcı Kılavuzları

### 🆕 Yeni Kullanıcılar İçin
- **Hesap Oluşturma**: Kayıt işlemi adımları
- **İlk Kartvizit**: Kartvizit oluşturma rehberi
- **Template Seçimi**: Uygun template bulma
- **Temel Düzenlemeler**: Logo, renk, bilgi ekleme

### 📱 Kartvizit Yönetimi
- **Bilgi Güncelleme**: Kişisel ve firma bilgileri
- **Sosyal Medya**: Platform bağlantıları
- **Banka Bilgileri**: IBAN ve hesap bilgileri
- **QR Kod Kullanımı**: QR kod ile paylaşım

### 📤 Paylaşım ve Export
- **Link Paylaşımı**: URL ile kartvizit paylaşma
- **QR Kod İndirme**: QR kod görselini indirme
- **vCard Export**: Rehbere ekleme
- **PDF İndirme**: Kartviziti PDF olarak kaydetme

## 👨‍💼 Admin Kılavuzları

### 🎛️ Admin Panel Kullanımı
- **Dashboard Genel Bakış**: Ana panel özellikleri
- **Firma Yönetimi**: CRUD işlemleri
- **Kullanıcı Yönetimi**: Kullanıcı onaylama/reddetme
- **Template Yönetimi**: Yeni template ekleme

### 📊 Raporlama ve Analitik
- **Kullanım İstatistikleri**: Aktif kullanıcı sayıları
- **Firma Kategorileri**: Sektör dağılımı
- **Performans Metrikleri**: Sistem performansı
- **Error Logging**: Hata kayıtları inceleme

### ⚙️ Sistem Yönetimi
- **Database Backup**: Yedekleme prosedürleri
- **System Maintenance**: Sistem bakım modları
- **Security Settings**: Güvenlik ayarları
- **Performance Monitoring**: Performans izleme

## 👨‍💻 Geliştirici Kılavuzları

### 🚀 Proje Setup
```bash
# Geliştirme ortamı kurulumu
git clone [repo-url]
cd dijital-kartvizit
npm install
cp .env.example .env.local
npm run db:push
npm run dev
```

### 🧩 Yeni Özellik Ekleme
1. **Feature Branch**: `git checkout -b feature/new-feature`
2. **Database Schema**: Prisma şema güncellemeleri
3. **API Endpoints**: Yeni API route'ları
4. **Frontend Components**: React bileşenleri
5. **Testing**: Unit ve integration testleri
6. **Documentation**: Dokümantasyon güncelleme

### 🎨 Template Sistemi
```typescript
// Yeni template oluşturma
export const templateNew: Template = {
  id: 'template-new',
  name: 'Yeni Template',
  category: 'modern',
  preview: '/previews/template-new.png',
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#007bff'
  },
  layout: {
    // Layout konfigürasyonu
  }
}

// Template registry'ye ekleme
import { templateNew } from './template-new'
export const templateRegistry = [
  // ... mevcut template'ler
  templateNew
]
```

### 🔌 API Entegrasyonu
```typescript
// Yeni API endpoint oluşturma
// /api/new-feature/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // İş mantığı
    const data = await getNewFeatureData()
    
    return NextResponse.json({
      success: true,
      data
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
```

## 🔧 En İyi Uygulamalar

### Kod Kalitesi
- **TypeScript**: Tip güvenliği
- **ESLint**: Kod standardizasyonu
- **Prettier**: Kod formatlama
- **Git Hooks**: Pre-commit kontrolleri

### Performance
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Dynamic imports
- **Caching**: Uygun caching stratejileri
- **Bundle Size**: Düzenli bundle analizi

### Güvenlik
- **Input Validation**: Zod schema validation
- **SQL Injection**: Prisma ORM koruması
- **XSS Protection**: Content Security Policy
- **Authentication**: NextAuth.js güvenlik önlemleri

## ❓ Sık Sorulan Sorular

### Genel Sorular
**Q: Kartvizitimi nasıl güncellerim?**
A: Admin panelinden "Firmalar" sekmesine gidip firmanızı düzenleyebilirsiniz.

**Q: QR kod neden çalışmıyor?**
A: QR kodu güncellemek için sayfa yenilenmesi gerekebilir. Cache temizleme yapmayı deneyin.

### Teknik Sorular
**Q: Local development ortamı nasıl kurulur?**
A: [Development Guide](../02-development/) bölümündeki adımları takip edin.

**Q: Production deployment nasıl yapılır?**
A: [Deployment Guide](../05-deployment/) bölümündeki Vercel + Supabase kılavuzunu kullanın.

### Sorun Giderme
**Q: Database bağlantı hatası alıyorum**
A: Environment variables'larınızı kontrol edin ve DATABASE_URL'nin doğru olduğundan emin olun.

**Q: Build hatası alıyorum**
A: `npm run type-check` komutu ile TypeScript hatalarını kontrol edin.

---
*Son güncelleme: 2025-08-25*