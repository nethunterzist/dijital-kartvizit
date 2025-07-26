# Dijital Kartvizit Uygulaması

Modern ve kullanıcı dostu dijital kartvizit oluşturma platformu.

## 🚀 Özellikler

- **Kolay Kartvizit Oluşturma**: Sürükle-bırak ile kolay tasarım
- **QR Kod Entegrasyonu**: Otomatik QR kod oluşturma
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Admin Paneli**: Kapsamlı yönetim sistemi
- **Sosyal Medya Entegrasyonu**: Tüm popüler platformlar
- **Banka Bilgileri**: IBAN ve hesap bilgileri yönetimi
- **PDF Export**: Kartvizitleri PDF olarak indirme
- **vCard Support**: Rehbere ekleme özelliği

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM (SQLite/PostgreSQL)
- **Authentication**: NextAuth.js
- **File Upload**: Cloudinary
- **Testing**: Jest + Cypress
- **Deployment**: Vercel

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Yerel Geliştirme

1. Repository'yi klonlayın:
```bash
git clone https://github.com/nethunterzist/sanalkartvizitim.git
cd sanalkartvizitim
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment variables'ları ayarlayın:
```bash
cp .env.example .env
```

4. Veritabanını başlatın:
```bash
npm run init-db
npx prisma db push
```

5. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 🚀 Production Deployment

### Supabase + Vercel Deployment

1. **Supabase Database Kurulumu:**
   - [supabase.com](https://supabase.com) hesabı oluşturun
   - Yeni proje oluşturun: `dijital-kartvizit`
   - Region: `Europe (Frankfurt)`
   - Database connection string'i alın

2. **Vercel Deployment:**
   - Vercel hesabınızı GitHub'a bağlayın
   - Bu repository'yi import edin
   - Environment variables'ları ayarlayın

3. **Database Migration:**
   - `npx prisma db push`
   - `npx prisma generate`

### Environment Variables

```env
# Supabase Database
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-min-64-chars"
NEXTAUTH_URL="https://yourdomain.com"

# Supabase API (opsiyonel)
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

# File Upload (opsiyonel)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

NODE_ENV="production"
```

## 📁 Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin paneli
│   ├── api/               # API routes
│   ├── components/        # React bileşenleri
│   └── lib/               # Utility fonksiyonları
├── prisma/                # Database schema ve migrations
├── public/                # Static dosyalar
├── cypress/               # E2E testler
└── scripts/               # Utility scripts
```

## 🧪 Testing

```bash
# Unit testler
npm run test

# E2E testler
npm run cypress:open

# Test coverage
npm run test:coverage
```

## 📊 Performance

- **Lighthouse Score**: 95+
- **Bundle Size**: Optimize edilmiş
- **Loading Time**: <2s
- **SEO Friendly**: Meta tags ve structured data

## 🔒 Güvenlik

- HTTPS zorunlu
- SQL Injection koruması
- XSS koruması
- CSRF koruması
- Rate limiting
- Input validation

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

Proje sahibi: [@nethunterzist](https://github.com/nethunterzist)

Proje Linki: [https://github.com/nethunterzist/sanalkartvizitim](https://github.com/nethunterzist/sanalkartvizitim)
