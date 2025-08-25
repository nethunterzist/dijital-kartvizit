# 🗄️ Veritabanı Dokümantasyonu

Bu bölümde veritabanı şeması, migrasyonlar ve veritabanı yönetim işlemleri detaylandırılmıştır.

## 📋 İçerik Listesi

### 📁 Alt Klasörler
- [`schema/`](./schema/) - Veritabanı şema dokümantasyonu
- [`migrations/`](./migrations/) - Migration dosyaları ve açıklamaları
- [`queries/`](./queries/) - Örnek sorgular ve optimizasyonlar
- [`backup/`](./backup/) - Yedekleme ve geri yükleme prosedürleri

### 📄 Ana Dokümantasyon
- `database-overview.md` - Veritabanı genel bakış
- `prisma-guide.md` - Prisma ORM kullanım kılavuzu
- `indexing-strategy.md` - Index stratejisi
- `data-relationships.md` - Tablo ilişkileri

### 🔗 İlgili Bölümler
- [Architecture](../01-architecture/) - Sistem mimarisi
- [API → Endpoints](../03-api/endpoints/) - API endpoint'leri
- [Performance → Optimization](../10-performance/optimization/) - Performans optimizasyonu

## 📊 Temel Tablolar

### 🏢 Firma Tablosu
```sql
Table: Firma {
  id: String (Primary Key)
  firmaAdi: String
  slug: String (Unique)
  logoUrl: String?
  sektorId: String?
  createdAt: DateTime
  updatedAt: DateTime
}
```

### 👤 Yetkili Tablosu
```sql
Table: Yetkili {
  id: String (Primary Key)
  firmaId: String (Foreign Key)
  adSoyad: String
  pozisyon: String?
  telefon: String?
  email: String?
  fotoUrl: String?
}
```

### 🏦 Banka Bilgileri
```sql
Table: BankaBilgileri {
  id: String (Primary Key)
  firmaId: String (Foreign Key)
  bankaAdi: String
  iban: String
  hesapSahibi: String
}
```

## 🔧 Prisma Komutları

### Geliştirme Ortamı
```bash
# Schema değişikliklerini veritabanına uygula
npx prisma db push

# Prisma Client'ı yeniden oluştur
npx prisma generate

# Prisma Studio'yu aç
npx prisma studio
```

### Production Ortamı
```bash
# Migration oluştur
npx prisma migrate dev --name migration_name

# Production'a migration uygula  
npx prisma migrate deploy
```

## 📈 Performans Optimizasyonları

- Index'ler: slug, firmaId, createdAt
- Query optimizasyonu
- Connection pooling
- Caching stratejileri

---
*Son güncelleme: 2025-08-25*