# 🚀 Supabase + Prisma Bağlantı Rehberi

## 📋 **İçindekiler**
1. [Supabase Proje Oluşturma](#1-supabase-proje-oluşturma)
2. [Database Şifresi ve Connection String](#2-database-şifresi-ve-connection-string)
3. [Prisma Konfigürasyonu](#3-prisma-konfigürasyonu)
4. [Yaşanan Hatalar ve Çözümleri](#4-yaşanan-hatalar-ve-çözümleri)
5. [Doğru Adımlar](#5-doğru-adımlar)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. 🏗️ **Supabase Proje Oluşturma**

### CLI ile Proje Oluşturma
```bash
# Supabase'e login ol
supabase login

# Proje oluştur
supabase projects create "proje-adi" --org-id YOUR_ORG_ID --region eu-central-1
```

### Dashboard'da Proje Oluşturma
1. https://supabase.com/dashboard
2. **"New Project"** butonuna tıkla
3. **Organization** seç
4. **Project name** gir
5. **Database password** oluştur (güçlü şifre)
6. **Region** seç (Europe - Frankfurt önerilen)
7. **Create new project** tıkla

---

## 2. 🔐 **Database Şifresi ve Connection String**

### ⚠️ **ÖNEMLİ: Şifre Kuralları**
- **Özel karakterler** URL encoding gerektirir
- `@` → `%40`
- `#` → `%23`
- `&` → `%26`
- **Basit şifre kullan** (sadece harf, rakam, - ve _)

### Connection String Alma
1. **Supabase Dashboard** → **Connect** butonu
2. **"Connection String"** sekmesi
3. **"Transaction pooler"** bölümü
4. String'i kopyala:
```
postgres://postgres:[YOUR-PASSWORD]@db.projectref.supabase.co:6543/postgres
```

### ❌ **YANLIŞ FORMAT**
```env
DATABASE_URL="postgres://postgres:password@db.projectref.supabase.co:6543/postgres"
```

### ✅ **DOĞRU FORMAT**
```env
DATABASE_URL="postgres://postgres.projectref:password@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
```

**Kritik Fark**: Username kısmında **project reference ID** kullanılmalı!

---

## 3. ⚙️ **Prisma Konfigürasyonu**

### schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### .env Dosyası
```env
# Supabase Database (PostgreSQL)
DATABASE_URL="postgres://postgres.PROJECTREF:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# Supabase API
SUPABASE_URL="https://PROJECTREF.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### Migration Komutları
```bash
# 1. Prisma client generate et
npx prisma generate

# 2. Database'e push et
npx prisma db push

# 3. (Opsiyonel) Migration dosyası oluştur
npx prisma migrate dev --name init
```

---

## 4. ❌ **Yaşanan Hatalar ve Çözümleri**

### Hata 1: DNS Resolution Failure
```
Error: P1001: Can't reach database server at db.projectref.supabase.co:6543
ping: cannot resolve db.projectref.supabase.co: Unknown host
```

**Neden**: Database subdomain'i henüz oluşturulmamış
**Çözüm**: Pooler URL kullan

### Hata 2: Tenant or User Not Found
```
Error: Schema engine error: FATAL: Tenant or user not found
```

**Neden**: Username kısmında sadece `postgres` kullanılmış
**Çözüm**: `postgres.projectref` formatını kullan

### Hata 3: Authentication Failed
```
Error: Schema engine error: FATAL: password authentication failed
```

**Neden**: Yanlış şifre veya özel karakter sorunu
**Çözüm**: Şifreyi reset et, basit şifre kullan

### Hata 4: Connection Timeout
```
Error: P1001: Can't reach database server
```

**Neden**: Yanlış port veya host
**Çözüm**: Pooler URL ve port 5432 kullan

---

## 5. ✅ **Doğru Adımlar (Sıralı)**

### Adım 1: Supabase Projesi Oluştur
```bash
supabase projects create "my-project" --org-id YOUR_ORG_ID --region eu-central-1
```

### Adım 2: Project Reference ID'yi Al
Dashboard'da proje URL'sinden: `https://supabase.com/dashboard/project/PROJECTREF`

### Adım 3: Database Şifresi Oluştur/Reset Et
- Dashboard → Settings → Database → Reset database password
- **Basit şifre kullan**: `MyPassword123` (özel karakter yok)

### Adım 4: Connection String Formatını Doğru Yaz
```env
DATABASE_URL="postgres://postgres.PROJECTREF:MyPassword123@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
```

### Adım 5: Prisma Schema'yı Ayarla
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Adım 6: Migration Yap
```bash
npx prisma generate
npx prisma db push
```

---

## 6. 🔧 **Troubleshooting**

### Bağlantı Testi
```bash
# 1. API test et
curl -H "apikey: YOUR_ANON_KEY" "https://PROJECTREF.supabase.co/rest/v1/"

# 2. DNS test et
nslookup PROJECTREF.supabase.co

# 3. Pooler test et
nslookup aws-0-eu-central-1.pooler.supabase.com
```

### Yaygın Sorunlar

#### Problem: "Database not ready"
**Çözüm**: 5-10 dakika bekle, yeni projeler hazırlanma süresi gerektirir

#### Problem: "IPv4 not compatible"
**Çözüm**: IPv4 add-on satın al veya shared pooler kullan

#### Problem: "Connection limit exceeded"
**Çözüm**: Connection pooling ayarlarını kontrol et

#### Problem: "SSL required"
**Çözüm**: Connection string'e `?sslmode=require` ekle

---

## 7. 📝 **Hızlı Başlangıç Template**

### .env Template
```env
# Supabase Configuration
DATABASE_URL="postgres://postgres.PROJECTREF:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
SUPABASE_URL="https://PROJECTREF.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### package.json Scripts
```json
{
  "scripts": {
    "db:generate": "npx prisma generate",
    "db:push": "npx prisma db push",
    "db:migrate": "npx prisma migrate dev",
    "db:studio": "npx prisma studio"
  }
}
```

### Hızlı Setup Komutları
```bash
# 1. Proje oluştur
supabase projects create "my-project" --org-id YOUR_ORG_ID --region eu-central-1

# 2. .env dosyasını düzenle (yukarıdaki template'i kullan)

# 3. Prisma setup
npx prisma generate
npx prisma db push

# 4. Test et
npx prisma studio
```

---

## 8. 🎯 **En Önemli Noktalar**

### ✅ **YAPILMASI GEREKENLER**
1. **Project reference ID'yi username'de kullan**: `postgres.PROJECTREF`
2. **Pooler URL kullan**: `aws-0-eu-central-1.pooler.supabase.com`
3. **Port 5432 kullan** (6543 değil)
4. **Basit şifre kullan** (özel karakter yok)
5. **Transaction pooler seç** (direct connection değil)

### ❌ **YAPILMAMASI GEREKENLER**
1. **Direct connection kullanma** (`db.projectref.supabase.co`)
2. **Sadece `postgres` username kullanma**
3. **Özel karakterli şifre kullanma**
4. **Port 6543 kullanma** (pooler için)
5. **Proje hazır olmadan bağlanmaya çalışma**

---

## 9. 🚀 **Production Önerileri**

### Environment Variables
```env
# Development
DATABASE_URL="postgres://postgres.devproject:devpass@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# Production
DATABASE_URL="postgres://postgres.prodproject:prodpass@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
```

### Connection Pooling
```env
# Yüksek trafikli uygulamalar için
DATABASE_URL="postgres://postgres.PROJECTREF:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=10"
```

### Backup Strategy
```bash
# Database backup
npx prisma db pull
npx prisma migrate diff --from-empty --to-schema-datamodel schema.prisma --script > backup.sql
```

---

## 10. 📞 **Destek ve Kaynaklar**

### Supabase Destek
- **Discord**: https://discord.supabase.com
- **GitHub**: https://github.com/supabase/supabase/issues
- **Docs**: https://supabase.com/docs

### Prisma Destek
- **Discord**: https://pris.ly/discord
- **GitHub**: https://github.com/prisma/prisma/issues
- **Docs**: https://www.prisma.io/docs

---

## ✅ **Özet Checklist**

- [ ] Supabase projesi oluşturuldu
- [ ] Project reference ID alındı
- [ ] Database şifresi oluşturuldu (basit)
- [ ] Connection string doğru formatta yazıldı
- [ ] Prisma schema PostgreSQL'e ayarlandı
- [ ] `npx prisma generate` çalıştırıldı
- [ ] `npx prisma db push` başarılı oldu
- [ ] Supabase Table Editor'da tablolar görünüyor
- [ ] Uygulama cloud database ile çalışıyor

**Bu rehberi takip ederek her projede sorunsuz Supabase bağlantısı kurabilirsiniz!** 🎉
