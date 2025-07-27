# 🚀 Supabase Migration Planı

## 📊 Mevcut Durum
- **Database**: SQLite (dev.db)
- **Schema**: PostgreSQL için hazırlandı
- **Proje Oluşturma**: CLI ile devam ediyor...

## 🎯 Supabase Projesi Oluşturulduktan Sonra Yapılacaklar

### 1. Proje Bilgilerini Al
```bash
# Yeni proje listesini kontrol et
supabase projects list

# Yeni projeye bağlan
supabase link --project-ref [YENİ-PROJECT-REF]
```

### 2. Environment Variables Güncelle
```env
# .env dosyasında güncellenecek değerler:
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require"
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="[ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[SERVICE-ROLE-KEY]"
```

### 3. Database Migration
```bash
# Prisma client'ı yeniden generate et
npx prisma generate

# Veritabanı şemasını push et
npx prisma db push

# Mevcut SQLite verilerini export et (opsiyonel)
npx prisma db seed
```

### 4. Mevcut Verileri Migrate Et (Eğer varsa)
```bash
# SQLite'dan veri export
sqlite3 prisma/dev.db ".dump" > backup.sql

# PostgreSQL'e import (manuel düzenleme gerekebilir)
# Supabase dashboard'da SQL editor kullanarak
```

### 5. Test Et
```bash
# Uygulamayı başlat
npm run dev

# API endpoints'leri test et
curl http://localhost:3000/api/health
curl http://localhost:3000/api/firmalar
```

### 6. Production Deployment
```bash
# Vercel environment variables güncelle
# GitHub'a push et
git add .
git commit -m "feat: Supabase PostgreSQL migration"
git push origin main
```

## 🔧 Olası Sorunlar ve Çözümler

### Problem: Prisma Client Hatası
```bash
# Çözüm:
rm -rf node_modules/.prisma
npx prisma generate
```

### Problem: Database Connection Hatası
```bash
# Kontrol et:
1. DATABASE_URL doğru mu?
2. Supabase projesi aktif mi?
3. SSL sertifikası sorunu var mı?
```

### Problem: Migration Hatası
```bash
# Çözüm:
npx prisma db push --force-reset
npx prisma db push
```

## 📋 Checklist

- [ ] Supabase projesi oluşturuldu
- [ ] Project reference ID alındı
- [ ] Database password belirlendi
- [ ] .env dosyası güncellendi
- [ ] Prisma client generate edildi
- [ ] Database push yapıldı
- [ ] Test edildi
- [ ] Production'a deploy edildi

## 🎯 Beklenen Sonuç

✅ SQLite → PostgreSQL migration tamamlandı
✅ Supabase cloud database aktif
✅ Tüm API endpoints çalışıyor
✅ Admin paneli erişilebilir
✅ Production deployment hazır

## ⏱️ Tahmini Süre
- Proje oluşturma: 5-10 dakika
- Migration: 5 dakika
- Test: 5 dakika
- **Toplam: 15-20 dakika**
