# ⚙️ Environment Konfigürasyonu

Bu rehber, **Dijital Kartvizit** projesinin environment variables'larının (ortam değişkenlerinin) güvenli ve doğru şekilde konfigüre edilmesi için kapsamlı bir kılavuz sağlar.

## 📋 İçindekiler

1. [Environment Variables Nedir?](#-environment-variables-nedir)
2. [Dosya Yapısı ve Hiyerarşi](#-dosya-yapısı-ve-hiyerarşi)
3. [Development Environment Setup](#-development-environment-setup)
4. [Environment Variables Listesi](#-environment-variables-listesi)
5. [Güvenlik Best Practices](#-güvenlik-best-practices)
6. [Port Konfigürasyonları](#-port-konfigürasyonları)
7. [Troubleshooting](#-troubleshooting)

---

## 🤔 Environment Variables Nedir?

Environment variables, uygulamanın çalıştığı ortama özel yapılandırma değerleridir. Bu değişkenler:

- **Güvenlik**: API keys, database passwords gibi hassas bilgileri saklar
- **Esneklik**: Farklı ortamlarda (development, staging, production) farklı değerler kullanır  
- **Konfigürasyon**: Uygulama davranışını değiştirir

### Örnek Kullanım:
```javascript
// Kod içinde kullanım
const databaseUrl = process.env.DATABASE_URL
const apiSecret = process.env.NEXTAUTH_SECRET
```

---

## 📁 Dosya Yapısı ve Hiyerarşi

Next.js otomatik olarak environment dosyalarını yükler:

```
dijital-kartvizit/
├── .env                    # Tüm ortamlar (genellikle kullanılmaz)
├── .env.local             # Local development (git ignore)  
├── .env.development       # Development ortamı
├── .env.production        # Production ortamı
└── .env.example           # Template dosya (git'e commit edilir)
```

### Dosya Öncelik Sırası:
1. `.env.local` (en yüksek öncelik)
2. `.env.development` / `.env.production`
3. `.env`

### Git Ignore Kuralları:
```gitignore
# Environment files (security)
.env*.local
.env.development
.env.production

# Template files (commit edilir)
.env.example ✓
```

---

## 🚀 Development Environment Setup

### 1. .env.local Dosyası Oluşturma

```bash
# Proje root dizininde
touch .env.local

# Windows PowerShell
New-Item .env.local -Type File
```

### 2. Temel Konfigürasyon

`.env.local` dosyasına aşağıdaki template'i kopyalayın:

```bash
# =============================================================================
# DIJITAL KARTVIZIT - DEVELOPMENT ENVIRONMENT VARIABLES
# =============================================================================
# UYARI: Bu dosya hassas bilgiler içerir - asla git'e commit ETMEYİN!
# =============================================================================

# -----------------------------------------------------------------------------
# ENVIRONMENT
# -----------------------------------------------------------------------------
NODE_ENV="development"
NEXT_PUBLIC_APP_ENV="development"

# -----------------------------------------------------------------------------  
# DATABASE CONNECTION
# -----------------------------------------------------------------------------
# Supabase PostgreSQL Database
# Format: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres?sslmode=require"

# -----------------------------------------------------------------------------
# AUTHENTICATION
# -----------------------------------------------------------------------------
# NextAuth.js Secret (minimum 64 karakter)
NEXTAUTH_SECRET="your-super-secret-key-for-development-min-64-characters-long-please-change-this"

# NextAuth URL (development için)
NEXTAUTH_URL="http://localhost:3000"

# -----------------------------------------------------------------------------
# SUPABASE CONFIGURATION
# -----------------------------------------------------------------------------  
# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"

# Supabase Anonymous Key (public - client tarafında kullanılır)
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6I..."

# Supabase Service Role Key (private - server tarafında kullanılır) 
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6I..."

# -----------------------------------------------------------------------------
# FILE UPLOAD (OPTIONAL)
# -----------------------------------------------------------------------------
# Cloudinary Configuration (dosya upload için opsiyonel)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="123456789012345"  
CLOUDINARY_API_SECRET="your-api-secret"

# Upload directory (local development için)
UPLOAD_DIR="public/uploads"

# -----------------------------------------------------------------------------
# REDIS & CACHING (OPTIONAL)
# -----------------------------------------------------------------------------
# Vercel KV Redis (production'da kullanılır)
# KV_REST_API_URL="https://your-redis.upstash.io"
# KV_REST_API_TOKEN="your-redis-token"

# -----------------------------------------------------------------------------
# EXTERNAL APIs (OPTIONAL)  
# -----------------------------------------------------------------------------
# Google Analytics (opsiyonel)
# NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# -----------------------------------------------------------------------------
# DEVELOPMENT SPECIFIC
# -----------------------------------------------------------------------------
# Debug modları
DEBUG="false"
VERBOSE_LOGGING="true"

# Performance monitoring
MONITOR_PERFORMANCE="true"

# -----------------------------------------------------------------------------
# CUSTOM SETTINGS
# -----------------------------------------------------------------------------
# Domain configuration (development için)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Admin panel settings
ADMIN_DEFAULT_PASSWORD="admin123456"

# Rate limiting
RATE_LIMIT_MAX="100"
RATE_LIMIT_WINDOW="3600000"
```

---

## 📝 Environment Variables Listesi

### 🔧 Sistem Konfigürasyonu

| Değişken | Açıklama | Örnek Değer | Zorunlu |
|----------|----------|-------------|---------|
| `NODE_ENV` | Çalışma ortamı | `development` | ✅ |
| `NEXT_PUBLIC_APP_ENV` | Public environment | `development` | ✅ |
| `NEXT_PUBLIC_BASE_URL` | Ana uygulama URL'i | `http://localhost:3000` | ✅ |

### 🗄️ Database Konfigürasyonu

| Değişken | Açıklama | Format | Zorunlu |
|----------|----------|--------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` | ✅ |

**DATABASE_URL Format Detayı:**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require

Açıklama:
- postgres: kullanıcı adı
- [PASSWORD]: Supabase database şifresi
- [PROJECT-REF]: Supabase proje referansı (örn: abcdefgh)
- 5432: PostgreSQL default port
- postgres: database adı
- sslmode=require: SSL zorunlu bağlantı
```

### 🔐 Authentication (NextAuth.js)

| Değişken | Açıklama | Örnek | Zorunlu |
|----------|----------|-------|---------|
| `NEXTAUTH_SECRET` | JWT token secret | Min 64 karakter random string | ✅ |
| `NEXTAUTH_URL` | Auth callback URL | `http://localhost:3000` | ✅ |

**NEXTAUTH_SECRET Oluşturma:**
```bash
# Terminal ile random secret oluşturma
openssl rand -base64 64

# Node.js ile
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"

# Online tool: https://generate-secret.vercel.app/32
```

### 🚀 Supabase Konfigürasyonu

| Değişken | Açıklama | Başlangıç | Zorunlu |
|----------|----------|-----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key | `eyJhbGciOiJI...` | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Private service key | `eyJhbGciOiJI...` | ✅ |

### 📁 File Upload (Opsiyonel)

| Değişken | Açıklama | Örnek | Zorunlu |
|----------|----------|-------|---------|
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `my-cloud` | ⚪ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` | ⚪ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abc123def456` | ⚪ |
| `UPLOAD_DIR` | Local upload directory | `public/uploads` | ⚪ |

### 🚦 Development Specific

| Değişken | Açıklama | Değer | Zorunlu |
|----------|----------|-------|---------|
| `DEBUG` | Debug modu | `false` | ⚪ |
| `VERBOSE_LOGGING` | Detaylı loglama | `true` | ⚪ |
| `MONITOR_PERFORMANCE` | Performance monitoring | `true` | ⚪ |

---

## 🔒 Güvenlik Best Practices

### 1. Dosya Permissions

```bash
# .env.local dosyasını sadece sahip okuyabilsin
chmod 600 .env.local

# Dizin permissions kontrol
ls -la .env*
```

### 2. Git Ignore Kontrolü

```bash
# .gitignore dosyasında aşağıdakilerin olduğunu kontrol edin:
cat .gitignore | grep -E "\\.env"

# Beklenen çıktı:
# .env*.local
# .env.development  
# .env.production
```

### 3. Secret Validation

```bash
# NEXTAUTH_SECRET uzunluk kontrolü (min 64 karakter)
node -e "console.log('NEXTAUTH_SECRET Length:', process.env.NEXTAUTH_SECRET?.length || 0)"
```

### 4. Public vs Private Keys

**NEXT_PUBLIC_*** prefix'li değişkenler browser'da görünür:
```javascript
// ✅ Public - client tarafında kullanılabilir
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  
NEXT_PUBLIC_BASE_URL

// ❌ Private - sadece server tarafında
DATABASE_URL
NEXTAUTH_SECRET
SUPABASE_SERVICE_ROLE_KEY
```

### 5. Development vs Production

```bash
# Development'da test değerleri kullanın
ADMIN_DEFAULT_PASSWORD="admin123456"  # ✅ Development
ADMIN_DEFAULT_PASSWORD="complex-prod-pass"  # ✅ Production

# Production'da debug kapatın  
DEBUG="true"   # ✅ Development
DEBUG="false"  # ✅ Production
```

---

## 🔌 Port Konfigürasyonları

### Default Portlar

| Servis | Port | Açıklama |
|--------|------|----------|
| Next.js Dev Server | 3000 | Ana uygulama |
| Supabase Local | 54321 | Local Supabase stack |
| PostgreSQL | 5432 | Database (production) |
| Redis | 6379 | Cache (varsa) |

### Port Değiştirme

```bash
# Farklı port ile başlatma
npm run dev -- -p 3001

# Environment variable ile
PORT=3001 npm run dev

# Package.json script'ini değiştirme
{
  "scripts": {
    "dev": "next dev -p 3001"  
  }
}
```

### Port Çakışması Çözümü

```bash
# Port 3000'i kullanan process'i bul
# macOS/Linux
lsof -ti:3000

# Process'i sonlandır
kill -9 $(lsof -ti:3000)

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

---

## 🧪 Environment Variables Test

### 1. Doğrulama Script'i

`.env.local` dosyanızın yanına `test-env.js` oluşturun:

```javascript
// test-env.js
require('dotenv').config({ path: '.env.local' });

const requiredVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET', 
  'NEXTAUTH_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

console.log('🔍 Environment Variables Test\n');

requiredVars.forEach(variable => {
  const value = process.env[variable];
  const status = value ? '✅' : '❌';
  const display = variable.includes('SECRET') || variable.includes('KEY') 
    ? `${value?.substring(0, 10)}...` 
    : value;
    
  console.log(`${status} ${variable}: ${display || 'NOT SET'}`);
});

// NEXTAUTH_SECRET uzunluk kontrolü
const secretLength = process.env.NEXTAUTH_SECRET?.length || 0;
const secretStatus = secretLength >= 64 ? '✅' : '❌';
console.log(`${secretStatus} NEXTAUTH_SECRET Length: ${secretLength}/64`);

// Database URL format kontrolü
const dbUrl = process.env.DATABASE_URL;
const dbStatus = dbUrl?.startsWith('postgresql://') ? '✅' : '❌';
console.log(`${dbStatus} DATABASE_URL Format: ${dbStatus === '✅' ? 'Valid PostgreSQL' : 'Invalid'}`);
```

```bash
# Test script'ini çalıştır
node test-env.js

# Test dosyasını sil
rm test-env.js
```

### 2. Next.js Environment Test

Development server'ı başlatıp `/api/health` endpoint'ini test edin:

```javascript
// app/api/env-test/route.ts (geçici test dosyası)
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Sadece development'da çalışsın
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }
  
  const envStatus = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING'
  };
  
  return NextResponse.json(envStatus);
}
```

```bash
# Server başlat ve test et
npm run dev
curl http://localhost:3000/api/env-test

# Test dosyasını sil
rm app/api/env-test/route.ts
```

---

## 🔧 Troubleshooting

### Yaygın Sorunlar

#### 1. "Environment Variable Not Found"
```bash
# Hata: process.env.VARIABLE_NAME is undefined
# Çözüm: .env.local dosyasında değişken var mı kontrol edin
grep "VARIABLE_NAME" .env.local

# Server'ı yeniden başlatın
npm run dev
```

#### 2. Database Connection Failed
```bash
# Hata: Database connection failed
# Kontrol edilecekler:
echo $DATABASE_URL

# Format kontrolü:
# postgresql://postgres:PASSWORD@db.PROJECT-REF.supabase.co:5432/postgres?sslmode=require
```

#### 3. NextAuth Secret Too Short
```bash
# Hata: NextAuth secret should be at least 64 characters
# Çözüm: Yeni secret oluşturun
openssl rand -base64 64
```

#### 4. CORS Hatası (Supabase)
```bash
# Hata: Access to fetch blocked by CORS policy
# Çözüm: NEXT_PUBLIC_SUPABASE_URL kontrol edin
echo $NEXT_PUBLIC_SUPABASE_URL

# Format: https://YOUR_PROJECT_REF.supabase.co
```

#### 5. Port Already in Use
```bash
# Hata: Port 3000 is already in use
# Çözüm: Farklı port kullanın
PORT=3001 npm run dev

# Veya process'i sonlandırın
kill -9 $(lsof -ti:3000)
```

### Debug Komutları

```bash
# Tüm environment variables'ları listele (dikkatli kullanın!)
node -e "console.log(process.env)" | grep NEXT

# Sadece NEXT_PUBLIC variables
node -e "Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC')).forEach(key => console.log(key, process.env[key]))"

# Database bağlantı testi
npm run db:verify
```

---

## 📚 Sonraki Adımlar

Environment konfigürasyonu tamamlandıktan sonra:

1. **[Supabase Setup](./supabase-setup.md)** - Database kurulum ve konfigürasyon
2. **[Development Guide](../02-development/)** - Geliştirme süreçleri
3. **[API Documentation](../03-api/)** - API endpoint'leri test etme

---

## ✅ Kontrol Listesi

Environment setup'ı tamamladıktan sonra aşağıdakileri kontrol edin:

- [ ] `.env.local` dosyası oluşturuldu
- [ ] Tüm zorunlu environment variables tanımlandı
- [ ] `NEXTAUTH_SECRET` minimum 64 karakter
- [ ] `DATABASE_URL` doğru format'ta
- [ ] Supabase keys doğru şekilde ayarlandı
- [ ] `.env.local` git ignore'da
- [ ] Development server başarıyla çalışıyor
- [ ] Environment variables test'i geçti

---

**🎉 Environment Konfigürasyonu Tamamlandı!**

Artık güvenli bir development environment'ınız hazır. Bir sonraki adım olarak [supabase-setup.md](./supabase-setup.md) rehberini takip ederek database'inizi konfigüre edin.

---
*Son güncelleme: 2025-08-25 | Versiyon: 1.0.0*