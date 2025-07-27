# 🚀 Supabase Bağlantısı Kurulum Rehberi

## 1. Supabase Dashboard'a Giriş

1. https://supabase.com/dashboard adresine gidin
2. GitHub hesabınızla giriş yapın
3. "New Project" butonuna tıklayın

## 2. Yeni Proje Oluşturma

1. **Organization**: Mevcut organizasyonunuzu seçin
2. **Project Name**: `dijitalkartvizit`
3. **Database Password**: Güçlü bir şifre oluşturun (örn: `DijitalKartvizit2025!`)
4. **Region**: `Europe (Frankfurt)` - eu-central-1
5. **Pricing Plan**: Pro (zaten üyesiniz)
6. "Create new project" butonuna tıklayın

## 3. Proje Bilgilerini Alma

Proje oluşturulduktan sonra:

1. **Settings** > **Database** bölümüne gidin
2. **Connection string** kısmından PostgreSQL bağlantı stringini kopyalayın
3. **Settings** > **API** bölümüne gidin
4. Aşağıdaki bilgileri kopyalayın:
   - Project URL
   - Anon (public) key
   - Service role key

## 4. .env Dosyasını Güncelleme

Aşağıdaki bilgileri `.env` dosyanıza ekleyin:

```env
# Supabase Database (PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?sslmode=require"

# Supabase API
SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (if used)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Upstash KV (mevcut)
KV_URL="rediss://default:ATfnAAIjcDE5OWI3NzVlNGM0ZTU0ZGUwYjBiMDI1NThiN2ZmNDE0OHAxMA@eternal-sheep-14311.upstash.io:6379"
KV_REST_API_URL="https://eternal-sheep-14311.upstash.io"
KV_REST_API_TOKEN="ATfnAAIjcDE5OWI3NzVlNGM0ZTU0ZGUwYjBiMDI1NThiN2ZmNDE0OHAxMA"
KV_REST_API_READ_ONLY_TOKEN="AjfnAAIgcDEVzvjz084Fo71QcFtQ79PFXZ2W8qoi7o_U2mft6vZa3A"
```

## 5. Database Migration

Supabase bağlantısı kurulduktan sonra:

```bash
# Prisma client'ı yeniden generate et
npx prisma generate

# Database'i push et (tablolar oluşturulacak)
npx prisma db push

# Verileri seed et (opsiyonel)
npm run init-db
```

## 6. Test Etme

```bash
# Uygulamayı başlat
npm run dev

# Health check
curl http://localhost:3000/api/health
```

## 7. Production Deployment

### Vercel Environment Variables Setup:

Vercel Dashboard → Project Settings → Environment Variables:

**CRITICAL: Set for Production, Preview, AND Development environments**

```bash
DATABASE_URL=postgres://postgres.rlhqnrfhjumbkxghyocd:3x8uwLJT9NDfKdL@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
SUPABASE_URL=https://rlhqnrfhjumbkxghyocd.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsaHFucmZoanVtYmt4Z2h5b2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NjQ0MTUsImV4cCI6MjA2OTE0MDQxNX0.H4zO6N35FEJh0Ua1pufu36qQRHqAvfVsjzCqUX-_F1k
NEXTAUTH_SECRET=Re4l7gbgNto8Mc2aNVyJBCYnRJu5tuf0vuvlKqMNE3lRWsvpSnDTDMCcJeLlwvQL
NEXTAUTH_URL=https://sanalkartvizitim.vercel.app
```

### 🚨 Critical Production Issue Fixed (27 Temmuz 2025)

**Problem:** All dynamic pages (`/[slug]`) returned 404 errors in production while working perfectly in localhost.

**Root Cause:** Environment variables were missing in Vercel, causing:
- Database connection failures
- Internal API call failures  
- Serverless function instability

**Resolution Steps:**
1. ✅ Added all environment variables to Vercel Dashboard
2. ✅ Set variables for Production, Preview, and Development environments
3. ✅ Replaced internal API calls with direct database access
4. ✅ Implemented case-insensitive slug matching
5. ✅ Added production debug tools

**Verification:**
- `/api/env-debug` - Environment variables status
- `/api/test-slug` - Database connectivity test
- `/api/health` - System health check

**Important:** Always verify environment variables are set BEFORE deploying to production!

## 🔧 Troubleshooting

### Bağlantı Hatası
- Database şifresinin doğru olduğundan emin olun
- Project reference ID'nin doğru olduğundan emin olun
- SSL bağlantısının aktif olduğundan emin olun

### Migration Hatası
- Önce `npx prisma generate` çalıştırın
- Sonra `npx prisma db push` çalıştırın

### Permission Hatası
- Service role key'in doğru olduğundan emin olun
- Supabase dashboard'da RLS (Row Level Security) ayarlarını kontrol edin

## 📞 Yardım

Herhangi bir sorun yaşarsanız:
1. Supabase dashboard'da logs'ları kontrol edin
2. Browser console'da hata mesajlarını kontrol edin
3. Terminal'de detaylı hata mesajlarını okuyun
