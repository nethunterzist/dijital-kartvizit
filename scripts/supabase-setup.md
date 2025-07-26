# Supabase Database Kurulum Rehberi

## 1. Supabase Hesabı ve Proje Oluşturma

### Adım 1: Hesap Oluşturun
1. [supabase.com](https://supabase.com) adresine gidin
2. **"Start your project"** → **"Sign Up"**
3. GitHub hesabınızla giriş yapın

### Adım 2: Yeni Proje Oluşturun
1. **"New Project"** butonuna tıklayın
2. **Organization**: Kendi hesabınızı seçin
3. **Project Name**: `dijital-kartvizit`
4. **Database Password**: Güçlü bir şifre oluşturun (kaydedin!)
5. **Region**: `Europe (Frankfurt)` - Türkiye'ye en yakın
6. **"Create new project"** butonuna tıklayın

### Adım 3: Proje Hazır Olmasını Bekleyin
- 2-3 dakika sürer
- "Setting up project..." yazısı kaybolana kadar bekleyin

## 2. Database Connection Bilgilerini Alın

### Adım 1: Settings Sayfasına Gidin
1. Sol menüden **"Settings"** → **"Database"**
2. **"Connection string"** bölümünü bulun

### Adım 2: Connection String'i Kopyalayın
```
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?sslmode=require
```

**Önemli**: `[YOUR-PASSWORD]` kısmını kendi şifrenizle değiştirin!

### Adım 3: API Keys'leri Alın
1. **"Settings"** → **"API"**
2. Şu bilgileri kopyalayın:
   - **Project URL**: `https://[YOUR-PROJECT-REF].supabase.co`
   - **anon public**: `eyJ...` (uzun anahtar)
   - **service_role**: `eyJ...` (uzun anahtar)

## 3. Environment Variables Ayarlayın

### Local Development (.env dosyası):
```env
# Supabase Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?sslmode=require"

# Supabase API (opsiyonel)
SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

# NextAuth
NEXTAUTH_SECRET="Re4l7gbgNto8Mc2aNVyJBCYnRJu5tuf0vuvlKqMNE3lRWsvpSnDTDMCcJeLlwvQL"
NEXTAUTH_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

### Vercel Production:
Vercel Dashboard → Settings → Environment Variables:
```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?sslmode=require
NEXTAUTH_SECRET=Re4l7gbgNto8Mc2aNVyJBCYnRJu5tuf0vuvlKqMNE3lRWsvpSnDTDMCcJeLlwvQL
NEXTAUTH_URL=https://your-project.vercel.app
NODE_ENV=production
```

## 4. Database Schema Oluşturun

### Adım 1: Prisma Migration
```bash
# Local'de test edin
npx prisma db push

# Başarılı olursa
npx prisma generate
```

### Adım 2: Supabase Dashboard'da Kontrol
1. Supabase → **"Table Editor"**
2. Tablolarınızın oluştuğunu kontrol edin:
   - `firmalar`
   - `admins`
   - `IletisimBilgisi`
   - `SosyalMedyaHesabi`
   - `BankaHesabi`
   - vb.

## 5. Mevcut Verileri Transfer Edin (Opsiyonel)

### SQLite'dan Supabase'e Veri Aktarımı:
```bash
# 1. Mevcut verileri export edin
npx prisma db seed

# 2. Veya manuel olarak SQL export
sqlite3 db.sqlite .dump > backup.sql

# 3. Supabase'e import (SQL Editor'da)
```

## 6. Test Edin

### Local Test:
```bash
npm run dev
```

### Production Test:
1. Vercel'de redeploy yapın
2. Site açılıyor mu kontrol edin
3. Admin paneline giriş yapın
4. Yeni kartvizit oluşturun

## 7. Supabase Avantajları

### Ücretsiz Plan:
- ✅ 500MB database
- ✅ 50,000 monthly active users
- ✅ 2GB bandwidth
- ✅ Real-time subscriptions

### Güçlü Özellikler:
- ✅ Otomatik API oluşturma
- ✅ Real-time updates
- ✅ Built-in authentication
- ✅ Row Level Security
- ✅ Dashboard ve monitoring

### Maliyet:
- **Ücretsiz**: 500MB'a kadar
- **Pro**: $25/ay (8GB database)
- **Team**: $599/ay (unlimited)

## 8. Sorun Giderme

### Connection Error:
- Şifrenizi kontrol edin
- SSL mode'un `require` olduğundan emin olun
- Project REF'in doğru olduğunu kontrol edin

### Migration Error:
- Prisma schema'nın PostgreSQL uyumlu olduğunu kontrol edin
- `npx prisma db push --force-reset` deneyin

### Performance:
- Database'iniz Frankfurt'ta (Europe)
- Connection pooling aktif
- Indexler otomatik oluşturuluyor

---

**Sonuç**: Supabase kurulumu tamamlandığında çok daha güçlü, ölçeklenebilir ve özellik açısından zengin bir database'iniz olacak!
