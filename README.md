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
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Cache**: Upstash Redis KV
- **Deployment**: Hetzner Server + Coolify

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
npx prisma db push
```

5. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 🚀 Production Deployment

### Hetzner Server + Coolify Deployment

Bu proje artık **Hetzner sunucusu** üzerinde **Coolify** ile self-hosted olarak çalışmaktadır.

1. **Sunucu Altyapısı:**
   - **Hosting**: Hetzner Cloud Server (46.62.171.65)
   - **Platform**: Coolify (Self-hosted PaaS)
   - **Database**: PostgreSQL (Docker container)
   - **Cache**: Upstash Redis KV

2. **Deployment Yöntemi:**
   - Docker container ile deployment
   - Coolify üzerinden otomatik build & deploy
   - PostgreSQL veritabanı aynı sunucuda

3. **Detaylı Kurulum:**
   - Kapsamlı kurulum için `SUNUCU-MIGRASYONU-KILAVUZU.md` dosyasına bakın

### Environment Variables

```env
# PostgreSQL Database (Coolify)
DATABASE_URL="postgresql://postgres:[PASSWORD]@46.62.171.65:5432/dijitalkartvizit?sslmode=disable"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-min-64-chars"
NEXTAUTH_URL="http://your-domain.com"

# Cache (Upstash Redis)
KV_URL="rediss://default:[TOKEN]@[endpoint].upstash.io:6379"
KV_REST_API_URL="https://[endpoint].upstash.io"
KV_REST_API_TOKEN="your-token"

# File Upload (opsiyonel - local storage kullanılıyor)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

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
└── public/                # Static dosyalar
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
