# 🐘 PostgreSQL Migration Rehberi

## 📋 Geçiş Tamamlandı - Yapılan Değişiklikler

### ✅ 1. Schema Güncellendi
- `schema.prisma` dosyasında provider `sqlite` → `postgresql` olarak değiştirildi
- Prisma client PostgreSQL için yeniden generate edildi

### ✅ 2. Dependencies Eklendi
- `pg` - PostgreSQL client
- `@types/pg` - TypeScript definitions

### ✅ 3. Environment Variables Hazırlandı
- `.env` dosyasında PostgreSQL connection strings eklendi
- Vercel Postgres için gerekli environment variables tanımlandı

## 🚀 Deployment Adımları

### 1. Vercel'de PostgreSQL Database Oluşturma

```bash
# Vercel CLI ile
vercel postgres create dijital-kartvizit-db

# Veya Vercel Dashboard'dan:
# 1. Vercel Dashboard → Storage → Create Database
# 2. PostgreSQL seçin
# 3. Database adı: dijital-kartvizit-db
# 4. Region: Frankfurt (en yakın)
```

### 2. Environment Variables Ayarlama

Vercel Dashboard'da şu environment variables'ları ekleyin:

```bash
# Vercel Postgres otomatik olarak bunları sağlar:
POSTGRES_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgresql://..."
POSTGRES_URL_NO_SSL="postgresql://..."
POSTGRES_URL_NON_POOLING="postgresql://..."

# Ana database URL (Prisma için)
DATABASE_URL="${POSTGRES_PRISMA_URL}"

# Diğer environment variables
NEXTAUTH_SECRET="güçlü-rastgele-anahtar-buraya"
NEXTAUTH_URL="https://yourdomain.com"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 3. Database Migration

```bash
# Production'da database'i oluşturmak için
npx prisma db push

# Veya migration dosyaları ile
npx prisma migrate deploy
```

### 4. Veri Transferi (SQLite'dan PostgreSQL'e)

Eğer mevcut SQLite verilerinizi taşımak istiyorsanız:

```bash
# 1. SQLite'dan veri export edin
npx prisma db seed

# 2. Veya manuel SQL export
sqlite3 db.sqlite .dump > backup.sql

# 3. PostgreSQL'e import edin (manuel düzenleme gerekebilir)
```

## 🔧 Local Development

### PostgreSQL ile Local Çalışma

```bash
# Docker ile PostgreSQL çalıştırma
docker run --name postgres-dev \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=dijitalkartvizit \
  -p 5432:5432 \
  -d postgres:15

# .env dosyasında local PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/dijitalkartvizit?schema=public"

# Database push
npx prisma db push

# Prisma Studio
npx prisma studio
```

### SQLite'a Geri Dönüş (Gerekirse)

```bash
# .env dosyasında
DATABASE_URL="file:./db.sqlite"

# Schema'da
provider = "sqlite"

# Prisma generate
npx prisma generate
```

## 📊 PostgreSQL Avantajları

### 🚀 Performance
- **Concurrent Access**: Çoklu kullanıcı desteği
- **Indexing**: Gelişmiş index türleri
- **Query Optimization**: Daha iyi query planner

### 🔍 Advanced Features
- **JSON Support**: Native JSON operations
- **Full-text Search**: Built-in search capabilities
- **Extensions**: PostGIS, pg_trgm, etc.

### 🏢 Production Ready
- **ACID Compliance**: Tam transaction desteği
- **Replication**: Master-slave setup
- **Backup & Recovery**: Point-in-time recovery

## 🎯 Performans İyileştirmeleri

### Index'ler Ekleme

```sql
-- Sık kullanılan alanlar için index'ler
CREATE INDEX idx_firmalar_slug ON firmalar(slug);
CREATE INDEX idx_firmalar_sektor ON firmalar(sektor_id);
CREATE INDEX idx_firmalar_kategori ON firmalar(kategori_id);
CREATE INDEX idx_firmalar_onay ON firmalar(onay);
CREATE INDEX idx_firmalar_created_at ON firmalar(created_at);

-- Full-text search için
CREATE INDEX idx_firmalar_search ON firmalar USING gin(to_tsvector('turkish', firma_adi || ' ' || COALESCE(firma_hakkinda, '')));
```

### Connection Pooling

```typescript
// lib/db.ts - Connection pooling
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## 🔍 Monitoring

### Database Monitoring

```sql
-- Active connections
SELECT count(*) FROM pg_stat_activity;

-- Slow queries
SELECT query, mean_exec_time, calls 
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;

-- Database size
SELECT pg_size_pretty(pg_database_size('dijitalkartvizit'));
```

### Vercel Analytics

```typescript
// Vercel'de otomatik monitoring
import { Analytics } from '@vercel/analytics/react';

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

## 🚨 Troubleshooting

### Common Issues

1. **Connection Timeout**
   ```bash
   # Connection pool ayarları
   DATABASE_URL="postgresql://...?connection_limit=20&pool_timeout=20"
   ```

2. **SSL Issues**
   ```bash
   # SSL disable (sadece development)
   DATABASE_URL="postgresql://...?sslmode=disable"
   ```

3. **Migration Errors**
   ```bash
   # Force reset (dikkatli kullanın!)
   npx prisma migrate reset --force
   ```

## ✅ Deployment Checklist

- [ ] Vercel Postgres database oluşturuldu
- [ ] Environment variables ayarlandı
- [ ] Database schema push edildi
- [ ] Index'ler oluşturuldu
- [ ] Connection pooling ayarlandı
- [ ] Monitoring kuruldu
- [ ] Backup stratejisi belirlendi

## 🎉 Sonuç

PostgreSQL geçişi tamamlandı! Artık:
- ✅ Daha iyi performance
- ✅ Concurrent user support
- ✅ Advanced database features
- ✅ Production-ready scalability

**Vercel'e deploy etmeye hazırsınız!** 🚀
