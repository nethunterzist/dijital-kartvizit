# 🌐 API Dokümantasyonu

## 📍 Genel Bilgiler

**Base URL**: `https://your-domain.com/api`  
**Authentication**: NextAuth.js (Session-based)  
**Content-Type**: `application/json` veya `multipart/form-data`  
**Rate Limiting**: Aktif (varsayılan limitler)

## 📋 API Endpoint'leri

### 1. 🏢 Firmalar (Business) API

#### `GET /api/firmalar`
Tüm firmaları listeler (sayfalama destekli).

**Query Parameters:**
```typescript
{
  page?: number;          // Sayfa numarası (varsayılan: 1)
  limit?: number;         // Sayfa başı kayıt (varsayılan: 1000, max: 1000)
  search?: string;        // Firma adında arama
}
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "firma_adi": "Örnek Teknoloji",
      "slug": "ornek-teknoloji",
      "profil_foto": "/uploads/profil_fotograflari/photo.jpg",
      "firma_logo": "/uploads/firma_logolari/logo.png",
      "yetkili_adi": "Ahmet Yılmaz",
      "yetkili_pozisyon": "Genel Müdür",
      "template_id": 1,
      "gradient_color": "#D4AF37,#F7E98E,#B8860B",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "goruntulenme": 142
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 1000,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  },
  "meta": {
    "count": 1,
    "search": null,
    "cached": false,
    "fetchTime": "2024-01-01T00:00:00.000Z"
  }
}
```

#### `POST /api/firmalar`
Yeni firma oluşturur.

**Content-Type**: `multipart/form-data` (dosya yükleme için) veya `application/json`

**Request Body (FormData):**
```typescript
{
  firmaAdi: string;                    // Zorunlu - Firma adı
  slug: string;                        // Zorunlu - URL slug (unique)
  yetkiliAdi?: string;                // Yetkili kişi adı
  yetkiliPozisyon?: string;           // Yetkili pozisyonu
  templateId?: number;                // Template ID (varsayılan: 1)
  gradientColor?: string;             // Gradient renkleri
  firma_hakkinda?: string;            // Firma hakkında metni
  firma_hakkinda_baslik?: string;     // Hakkında başlığı
  firma_unvan?: string;               // Firma ünvanı
  firma_vergi_no?: string;            // Vergi numarası
  vergi_dairesi?: string;             // Vergi dairesi
  
  // Dosyalar (multipart/form-data)
  profilePhoto?: File;                // Profil fotoğrafı
  logoFile?: File;                    // Firma logosu
  katalog?: File;                     // Katalog PDF'i
  
  // JSON Arrays (string olarak)
  communication_data?: string;        // İletişim bilgileri JSON
  sosyalMedyaHesaplari?: string;     // Sosyal medya hesapları JSON
  bankaHesaplari?: string;           // Banka hesapları JSON
}
```

**Communication Data Format:**
```json
[
  {
    "type": "telefon",
    "value": "+90 555 123 45 67",
    "label": "Cep Telefonu"
  },
  {
    "type": "email", 
    "value": "info@ornek.com",
    "label": "E-posta"
  },
  {
    "type": "adres",
    "value": "İstanbul, Türkiye",
    "label": "Adres"
  }
]
```

**Sosyal Medya Data Format:**
```json
[
  {
    "platform": "instagram",
    "url": "https://instagram.com/ornek",
    "label": "Instagram"
  },
  {
    "platform": "linkedin",
    "url": "https://linkedin.com/company/ornek",
    "label": "LinkedIn"
  }
]
```

**Banka Hesapları Data Format:**
```json
[
  {
    "bank_name": "garanti",
    "bank_label": "Garanti BBVA",
    "bank_logo": "/img/banks/garanti.png",
    "account_holder": "ÖRNEK TEKNOLOJİ A.Ş.",
    "accounts": [
      {
        "iban": "TR33 0062 0910 0000 0006 2900 01",
        "currency": "TRY"
      }
    ]
  }
]
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "firma_adi": "Örnek Teknoloji",
    "slug": "ornek-teknoloji",
    // ... diğer firma bilgileri
    "debug": {
      "actual_iletisim_count": 3,
      "actual_sosyal_count": 2,
      "actual_banka_count": 1,
      "actual_banka_detay_count": 1,
      "save_status": {
        "iletisim_kaydetme_durumu": "success",
        "sosyal_kaydetme_durumu": "success",
        "banka_kaydetme_durumu": "success"
      }
    }
  },
  "message": "Firma başarıyla oluşturuldu"
}
```

#### `DELETE /api/firmalar?id={firmaId}`
Firma siler.

**Query Parameters:**
- `id`: number (zorunlu) - Silinecek firma ID'si

**Response:**
```json
{
  "data": {
    "id": 1,
    "firma_adi": "Silinen Firma"
  },
  "message": "Firma başarıyla silindi"
}
```

### 2. 🔍 Firma Detay API'leri

#### `GET /api/firmalar/by-slug/[slug]`
Slug ile firma detaylarını getirir (tüm ilişkili verilerle).

**Response:**
```json
{
  "firma": {
    "id": 1,
    "firma_adi": "Örnek Teknoloji",
    "slug": "ornek-teknoloji",
    // ... temel firma bilgileri
    "iletisim_bilgileri": [
      {
        "id": 1,
        "tip": "telefon",
        "deger": "+90 555 123 45 67",
        "etiket": "Cep Telefonu",
        "sira": 0
      }
    ],
    "sosyal_medya_hesaplari": [
      {
        "id": 1,
        "platform": "instagram",
        "url": "https://instagram.com/ornek",
        "etiket": "Instagram",
        "sira": 0
      }
    ],
    "banka_hesaplari": [
      {
        "id": 1,
        "banka_adi": "Garanti BBVA",
        "banka_kodu": "garanti",
        "banka_logo": "/img/banks/garanti.png",
        "hesap_sahibi": "ÖRNEK TEKNOLOJİ A.Ş.",
        "hesaplar": [
          {
            "id": 1,
            "iban": "TR33 0062 0910 0000 0006 2900 01",
            "para_birimi": "TRY"
          }
        ]
      }
    ]
  }
}
```

#### `GET /api/firmalar/[id]`
ID ile firma detaylarını getirir.

#### `PUT /api/firmalar/[id]`
Firma bilgilerini günceller.

### 3. 📁 File Upload API

#### `POST /api/upload?folder={folderName}`
Tek dosya yükler.

**Query Parameters:**
- `folder`: string - Hedef klasör (`firma_logolari`, `profil_fotograflari`, `firma_kataloglari`)

**Request Body (multipart/form-data):**
```typescript
{
  file: File;  // Yüklenecek dosya
}
```

**Supported File Types:**
- **Images**: JPG, PNG, GIF, WebP (max: 5MB)
- **PDF**: PDF dosyalar (max: 10MB)

**Response:**
```json
{
  "url": "/uploads/firma_logolari/logo_1234567890_abc123.jpg"
}
```

### 4. 🏷️ QR Code API

#### `GET /api/qr-codes/[slug]`
Firma için QR kod oluşturur.

**Response**: PNG image (binary)

### 5. 📄 Page Generation API

#### `GET /api/sayfalar/[slug]`
Firma kartvizit sayfası HTML'ini getirir.

#### `GET /api/sayfalar/[slug]/vcard`
vCard dosyasını indirir.

**Response**: vCard file (text/vcard)

### 6. 🗺️ Geographic Data API

#### `GET /api/iller`
Türkiye illerini listeler.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "ad": "İstanbul"
    },
    {
      "id": 6,
      "ad": "Ankara"
    }
  ]
}
```

#### `GET /api/ilceler?il_id={ilId}`
Belirli ile ait ilçeleri listeler.

#### `GET /api/kategoriler`
Firma kategorilerini listeler.

#### `GET /api/sektorler`
Sektörleri listeler.

### 7. ⚙️ System API

#### `GET /api/health`
Sistem sağlık kontrolü.

**Response:**
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

#### `GET /api/monitoring`
Sistem metrikleri.

#### `POST /api/regenerate-html`
Firma HTML'ini yeniden oluşturur.

#### `POST /api/save-html`
Generate edilmiş HTML'i kaydeder.

### 8. 🔧 Settings API

#### `GET /api/settings/icon-order`
İkon sıralaması ayarlarını getirir.

#### `POST /api/settings/icon-order`
İkon sıralama ayarlarını günceller.

## 🚨 Error Handling

Tüm API endpoint'leri standart hata formatı kullanır:

```json
{
  "error": {
    "message": "Hata açıklaması",
    "code": "ERROR_CODE",
    "details": "Ek hata detayları"
  }
}
```

### Standart HTTP Status Kodları:
- `200`: Başarılı
- `201`: Oluşturuldu
- `400`: Geçersiz istek
- `401`: Kimlik doğrulama gerekli
- `403`: Yetki yok
- `404`: Bulunamadı
- `500`: Sunucu hatası

### Yaygın Error Kodları:
- `MISSING_FIELDS`: Gerekli alanlar eksik
- `INVALID_CONTENT_TYPE`: Desteklenmeyen content type
- `UPLOAD_ERROR`: Dosya yükleme hatası
- `DATABASE_ERROR`: Veritabanı hatası
- `VALIDATION_ERROR`: Veri doğrulama hatası

## 🔒 Authentication

Sistem NextAuth.js kullanır. Admin işlemleri için session gereklidir.

**Session Check:**
```javascript
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

const session = await getServerSession(authOptions);
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

## 📊 Rate Limiting

API endpoint'leri rate limiting kullanır:
- **Default**: 100 requests/hour per IP
- **Upload**: 20 requests/hour per IP
- **Auth**: 5 requests/minute per IP

## 🔍 API Testing

### cURL Examples:

**Firma Listesi:**
```bash
curl -X GET "https://your-domain.com/api/firmalar?page=1&limit=10"
```

**Dosya Yükleme:**
```bash
curl -X POST "https://your-domain.com/api/upload?folder=firma_logolari" \
  -F "file=@logo.jpg"
```

**Yeni Firma Oluşturma:**
```bash
curl -X POST "https://your-domain.com/api/firmalar" \
  -H "Content-Type: application/json" \
  -d '{
    "firmaAdi": "Test Firma",
    "slug": "test-firma",
    "communication_data": "[{\"type\":\"email\",\"value\":\"test@test.com\"}]"
  }'
```

## 📝 Changelog

### v1.0.0 (Mevcut)
- ✅ Firma CRUD operasyonları
- ✅ Multi-part dosya yükleme
- ✅ İlişkisel veri yönetimi
- ✅ QR kod üretimi
- ✅ vCard export
- ✅ Geographic data API'leri

### Planned Features
- 🔄 Real-time notifications
- 🔄 Bulk operations
- 🔄 API versioning
- 🔄 GraphQL endpoint

---

> 📝 **Not**: Bu API dokümantasyonu aktif geliştirme aşamasındadır. Değişiklikler için [CHANGELOG.md] dosyasını takip edin.