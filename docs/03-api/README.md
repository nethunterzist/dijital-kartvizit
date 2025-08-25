# 🔌 API Dokümantasyonu

Bu bölümde REST API endpoint'leri, authentication yapısı ve API kullanım örnekleri detaylandırılmıştır.

## 📋 İçerik Listesi

### 📁 Alt Klasörler
- [`endpoints/`](./endpoints/) - API endpoint dokümantasyonları
- [`authentication/`](./authentication/) - Kimlik doğrulama sistemi
- [`validation/`](./validation/) - Girdi doğrulama kuralları
- [`examples/`](./examples/) - API kullanım örnekleri

### 📄 Ana Dokümantasyon
- `api-overview.md` - API genel bakış
- `error-handling.md` - Hata yönetimi
- `rate-limiting.md` - Hız sınırlama
- `versioning.md` - API versiyon yönetimi

### 🔗 İlgili Bölümler
- [Backend → Services](../07-backend/services/) - Backend servisleri
- [Security → Auth](../08-security/auth/) - Güvenlik dokümantasyonu
- [Database → Schema](../04-database/schema/) - Veritabanı şeması

## 🎯 Ana Endpoint Grupları

### 🏢 Firma API'leri
- `GET /api/firmalar` - Firma listesi
- `POST /api/firmalar` - Yeni firma oluşturma
- `GET /api/firmalar/[id]` - Firma detayı
- `PUT /api/firmalar/[id]` - Firma güncelleme
- `DELETE /api/firmalar/[id]` - Firma silme

### 🔒 Authentication API'leri
- `POST /api/auth/signin` - Giriş yapma
- `POST /api/auth/signout` - Çıkış yapma
- `GET /api/auth/session` - Oturum kontrolü

### 📱 QR Kod API'leri
- `GET /api/qr-codes/[slug]` - QR kod oluşturma
- `GET /api/sayfalar/[slug]` - Sayfa verileri
- `GET /api/sayfalar/[slug]/vcard` - vCard indirme

### 📤 Upload API'leri
- `POST /api/upload` - Dosya yükleme
- `DELETE /api/upload/[filename]` - Dosya silme

## 🔧 API Konfigürasyonu

```javascript
// Base URL
const API_BASE = process.env.NEXTAUTH_URL || 'http://localhost:3000'

// Headers
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

## 📊 Response Formatı

```json
{
  "success": true,
  "data": { ... },
  "message": "İşlem başarılı",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

---
*Son güncelleme: 2025-08-25*