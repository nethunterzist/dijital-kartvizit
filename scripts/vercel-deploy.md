# Vercel Deployment Rehberi

## 1. Vercel Dashboard Ayarları

### Environment Variables
Vercel Dashboard → Settings → Environment Variables bölümünde şu değişkenleri ekleyin:

```bash
# Database (Vercel Postgres kullanıyorsanız otomatik gelecek)
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Authentication
NEXTAUTH_SECRET=Re4l7gbgNto8Mc2aNVyJBCYnRJu5tuf0vuvlKqMNE3lRWsvpSnDTDMCcJeLlwvQL
NEXTAUTH_URL=https://your-project-name.vercel.app

# Environment
NODE_ENV=production

# Cloudinary (Sonra ekleyeceğiz)
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret
```

## 2. Database Kurulumu

### Vercel Postgres (Önerilen)
1. Vercel Dashboard → Storage → Create Database → Postgres
2. Database adı: `dijital-kartvizit-db`
3. Connection string otomatik olarak `DATABASE_URL` environment variable'ına eklenecek

### Alternatif: External PostgreSQL
- Neon, Supabase, Railway gibi servisleri kullanabilirsiniz
- Connection string'i `DATABASE_URL` olarak ekleyin

## 3. Build Ayarları

Vercel otomatik olarak şu ayarları kullanacak:
- **Build Command**: `prisma generate && next build`
- **Install Command**: `npm install`
- **Output Directory**: `.next`

## 4. Domain Ayarları

### Vercel Subdomain
- Otomatik: `your-project-name.vercel.app`
- Özelleştirilebilir: Settings → Domains

### Custom Domain (İsteğe bağlı)
- Settings → Domains → Add Domain
- DNS ayarlarını yapın

## 5. Database Migration

İlk deployment'tan sonra:
1. Vercel Dashboard → Functions → Terminal
2. Şu komutu çalıştırın:
```bash
npx prisma db push
```

## 6. İlk Admin Kullanıcısı Oluşturma

Database migration'dan sonra admin kullanıcısı oluşturmak için:
1. Vercel Terminal'de:
```bash
node scripts/init-db.js
```

## 7. Test Etme

Deployment tamamlandıktan sonra:
- Ana sayfa: `https://your-project-name.vercel.app`
- Admin paneli: `https://your-project-name.vercel.app/admin`
- Health check: `https://your-project-name.vercel.app/api/health`

## 8. Monitoring

Vercel otomatik olarak şunları sağlar:
- Performance monitoring
- Error tracking
- Analytics
- Logs

## 9. Sorun Giderme

### Build Hatası
- Vercel Dashboard → Deployments → Build logs kontrol edin
- Environment variables'ları kontrol edin

### Database Bağlantı Hatası
- `DATABASE_URL` formatını kontrol edin
- SSL ayarlarını kontrol edin (`?sslmode=require`)

### Authentication Hatası
- `NEXTAUTH_SECRET` ve `NEXTAUTH_URL` kontrol edin
- URL'nin https olduğundan emin olun

## 10. Production Optimizasyonları

Proje zaten şu optimizasyonları içeriyor:
- ✅ Bundle optimization
- ✅ Image optimization
- ✅ Security headers
- ✅ Performance monitoring
- ✅ Error boundaries
- ✅ Rate limiting

## 11. Cloudinary Entegrasyonu (Sonra)

File upload için Cloudinary ayarları:
1. Cloudinary hesabı oluşturun
2. Environment variables ekleyin:
```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 12. Backup Stratejisi

- Vercel Postgres otomatik backup yapar
- Manual backup için: `pg_dump` kullanın
- Code backup: GitHub repository

---

**Not**: Bu rehber adım adım takip edildiğinde projeniz production'da çalışır durumda olacaktır.
