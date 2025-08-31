# 🚀 Hızlı Başlangıç Rehberi

## 📋 Ön Gereksinimler

Sistemi çalıştırmak için aşağıdaki araçlar kurulu olmalıdır:

| Araç | Versiyon | Gereklilik | İndirme |
|------|----------|------------|---------|
| **Node.js** | 18.0+ | Zorunlu | [nodejs.org](https://nodejs.org) |
| **npm** | 8.0+ | Zorunlu | Node.js ile birlikte gelir |
| **PostgreSQL** | 14.0+ | Zorunlu | [postgresql.org](https://postgresql.org) |
| **Git** | 2.0+ | Zorunlu | [git-scm.com](https://git-scm.com) |
| **Docker** | 20.0+ | Opsiyonel | [docker.com](https://docker.com) |

## ⚡ 5 Dakikada Kurulum

### 1. 📥 Repository Clone

```bash
# Repository'yi clone edin
git clone <repository-url>
cd dijitalKartvizit

# Branch durumunu kontrol edin
git status
git branch -a
```

### 2. 📦 Bağımlılık Kurulumu

```bash
# Package'ları yükleyin
npm install

# Kurulum doğrulaması
npm list --depth=0
```

**Beklenen Çıktı:**
```
├── next@14.0.4
├── react@18.2.0
├── prisma@6.7.0
├── tailwindcss@3.4.0
└── typescript@5.3.3
```

### 3. 🔧 Environment Yapılandırması

```bash
# Environment dosyasını oluşturun
cp .env.example .env.local

# Environment dosyasını düzenleyin
nano .env.local  # veya VS Code ile: code .env.local
```

**Gerekli Environment Variables:**
```bash
# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/dijital_kartvizit"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-32-characters-minimum"

# File Upload Settings
UPLOAD_MAX_SIZE=5242880
UPLOAD_PATH="./public/uploads"

# Development Settings
NODE_ENV="development"
```

### 4. 🗄️ Database Setup

```bash
# PostgreSQL veritabanı oluşturun
createdb dijital_kartvizit

# Prisma generate (client oluşturma)
npx prisma generate

# Database schema'sını uygulayın
npx prisma db push

# Veritabanı bağlantısını test edin
npm run db:verify
```

**Başarılı Output:**
```
✅ Database connection: OK
✅ Tables created: 10
✅ Indexes created: 15
```

### 5. 🏃‍♂️ Development Server

```bash
# Development server'ı başlatın
npm run dev

# Alternatif olarak (production mode)
npm run build
npm start
```

**Server URL'leri:**
- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Admin Panel**: http://localhost:3000/admin
- 📊 **Health Check**: http://localhost:3000/api/health

## 🔐 İlk Kullanıcı Oluşturma

### Admin Hesabı Kurulumu

```bash
# Database'e admin kullanıcısı ekleyin
npx prisma studio  # Database GUI'si açılır

# Alternatif: Direct SQL
psql -d dijital_kartvizit -c "
INSERT INTO admins (username, password, created_at) 
VALUES ('admin', '\$2b\$12\$hashed_password_here', NOW());"
```

**Bcrypt Password Hash Oluşturma:**
```javascript
// Node.js console'da çalıştırın
const bcrypt = require('bcrypt');
bcrypt.hash('admin123', 12).then(hash => console.log(hash));
```

### Test Login

1. http://localhost:3000/login adresine gidin
2. **Username**: `admin`
3. **Password**: `admin123` (yukarıda belirlediğiniz)

## 📁 Proje Yapısı Hızlı Bakış

```
dijitalKartvizit/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API endpoints
│   ├── admin/             # Admin panel pages
│   ├── [slug]/            # Dynamic business card pages
│   ├── components/        # React components
│   └── lib/              # Utility functions & services
├── docs/                  # Dokümantasyon (bu dosyalar)
├── public/               # Static files
│   └── uploads/          # Yüklenen dosyalar
├── prisma/               # Database schema & migrations
├── package.json          # Dependencies & scripts
└── README.md            # Ana README
```

## 🧪 Test Etme

### Sistem Testleri

```bash
# Health check
curl http://localhost:3000/api/health

# API test
curl http://localhost:3000/api/firmalar

# Upload test
curl -X POST http://localhost:3000/api/upload \
  -F "file=@test-image.jpg" \
  -F "folder=firma_logolari"
```

### Beklenen Responses

**Health Check:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected",
  "services": {
    "fileUpload": "active",
    "templateEngine": "active"
  }
}
```

**API Test:**
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 1000,
    "total": 0,
    "totalPages": 0
  }
}
```

## 📋 İlk Firma Oluşturma

### Admin Panel Üzerinden

1. **Admin Login**: http://localhost:3000/admin
2. **Yeni Firma**: Admin → Firmalar → Yeni Firma
3. **Gerekli Alanlar**:
   - Firma Adı: `Test Teknoloji`
   - Slug: `test-teknoloji`
   - Template: `Gold` (varsayılan)

### API ile Oluşturma

```bash
curl -X POST http://localhost:3000/api/firmalar \
  -H "Content-Type: application/json" \
  -d '{
    "firmaAdi": "Test Teknoloji",
    "slug": "test-teknoloji",
    "yetkiliAdi": "Ahmet Yılmaz",
    "templateId": 1,
    "communication_data": "[{\"type\":\"email\",\"value\":\"test@test.com\",\"label\":\"E-posta\"}]"
  }'
```

### Kartviziti Görüntüleme

Firma oluşturduktan sonra: http://localhost:3000/test-teknoloji

## 🛠️ Development Scripts

```bash
# Development server (hot reload)
npm run dev

# Production build
npm run build

# Production server
npm start

# TypeScript type check
npm run type-check

# Database operations
npm run db:push        # Schema değişikliklerini uygula
npm run db:verify      # Database bağlantısını test et

# Code quality
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
```

## 🚨 Yaygın Sorunlar & Çözümler

### Database Connection Error

**Hata:** `ECONNREFUSED 127.0.0.1:5432`

**Çözüm:**
```bash
# PostgreSQL servisini başlatın
brew services start postgresql  # macOS
sudo service postgresql start   # Linux
```

### Port 3000 Already in Use

**Hata:** `EADDRINUSE: address already in use :::3000`

**Çözüm:**
```bash
# Farklı port kullanın
PORT=3001 npm run dev

# Veya işlemi sonlandırın
lsof -ti:3000 | xargs kill
```

### Prisma Generate Error

**Hata:** `Prisma schema not found`

**Çözüm:**
```bash
# Prisma client'ı yeniden oluşturun
npx prisma generate

# Cache'i temizleyin
rm -rf node_modules/.prisma
npm run build
```

### File Upload Permission Error

**Hata:** `EACCES: permission denied`

**Çözüm:**
```bash
# Upload dizinleri oluşturun
mkdir -p public/uploads/{firma_logolari,profil_fotograflari,firma_kataloglari}

# Yazma izni verin
chmod 755 public/uploads
chmod 755 public/uploads/*
```

## 🔄 Development Workflow

### Git Workflow

```bash
# Feature branch oluşturun
git checkout -b feature/yeni-ozellik

# Değişiklikleri commit edin
git add .
git commit -m "feat: yeni özellik eklendi"

# Main branch'e merge edin
git checkout main
git merge feature/yeni-ozellik
```

### Code Style

**ESLint & Prettier** otomatik konfigürasyonlu:
```bash
# Format check
npm run lint

# Auto fix
npm run lint:fix
```

## 📚 Sonraki Adımlar

### Frontend Development için:
- [Frontend Guide](./FRONTEND-GUIDE.md) - React components & UI development
- [Component Library](../technical/COMPONENT-LIBRARY.md) - Reusable components

### Backend Development için:
- [Backend Guide](./BACKEND-GUIDE.md) - API development & database operations
- [API Documentation](../API-DOCUMENTATION.md) - Complete API reference

### Production Deployment için:
- [Deployment Guide](../DEPLOYMENT.md) - Docker & production setup
- [Security Guide](../SECURITY.md) - Security best practices

## 🆘 Yardım & Destek

### Kaynaklar

- 📖 **Dokümantasyon**: [docs/README.md](../README.md)
- 🗃️ **API Reference**: [API-DOCUMENTATION.md](../API-DOCUMENTATION.md)
- 🏗️ **Architecture**: [ARCHITECTURE.md](../ARCHITECTURE.md)
- 🛡️ **Security**: [SECURITY.md](../SECURITY.md)

### Community & Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: tech@example.com (if configured)

### Debug Mode

Development'ta detaylı log için:
```bash
DEBUG=* npm run dev
```

---

> 🎉 **Tebrikler!** Sistem başarıyla kuruldu. Artık geliştirme sürecine başlayabilirsiniz. Sorularınız için [developer-guides](./README.md) bölümüne bakın.