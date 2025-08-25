# 🏗️ Sistem Mimarisi

Bu bölümde dijital kartvizit sisteminin genel mimarisi, teknoloji yığını ve sistem tasarım kararları detaylandırılmıştır.

## 📋 İçerik Listesi

### 📁 Dosya Yapısı
- `system-architecture.md` - Genel sistem mimarisi
- `technology-stack.md` - Teknoloji seçimleri ve gerekçeleri
- `design-patterns.md` - Kullanılan tasarım desenleri
- `data-flow.md` - Veri akış diyagramları
- `scalability-plan.md` - Ölçeklenebilirlik planı

### 🔗 İlgili Bölümler
- [Database → Schema](../04-database/schema/) - Veritabanı şema tasarımı
- [Frontend → Components](../06-frontend/components/) - Bileşen mimarisi  
- [Backend → Services](../07-backend/services/) - Servis mimarisi

## 📊 Sistem Genel Bakış

**Teknoloji Yığını:**
- Frontend: Next.js 14 (App Router)
- Database: Prisma ORM + Supabase
- Deployment: Vercel + Supabase
- Authentication: NextAuth.js

**Mimari Prensipleri:**
- Modüler yapı
- Separation of Concerns
- API-first yaklaşım
- Progressive Web App (PWA) hazırlığı

## 🚀 Hızlı Başlangıç

1. [Development Guide](../02-development/) - Geliştirme ortamı kurulumu
2. [API Documentation](../03-api/) - API kullanımı
3. [Database Setup](../04-database/) - Veritabanı kurulumu

---
*Son güncelleme: 2025-08-25*