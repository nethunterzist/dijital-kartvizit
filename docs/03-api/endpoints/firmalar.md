# 🏢 Firmalar API Endpoint Dokümantasyonu

## Genel Bakış

Firmalar API, dijital kartvizit sistemindeki firma (işletme) verilerinin yönetimini sağlar. Bu endpoint üzerinden firma oluşturma, listeleme, güncelleme ve silme işlemleri gerçekleştirilir.

## Base URL

```
/api/firmalar
```

## Endpoints

### 📋 GET /api/firmalar

Tüm firmaları listeler veya arama yapar.

#### Request

##### Query Parameters

| Parametre | Tip | Zorunlu | Açıklama | Default | Min | Max |
|-----------|-----|---------|----------|---------|-----|-----|
| `page` | integer | Hayır | Sayfa numarası | 1 | 1 | - |
| `limit` | integer | Hayır | Sayfa başına kayıt sayısı | 1000 | 1 | 1000 |
| `search` | string | Hayır | Arama terimi (firma adı, yetkili adı) | - | - | - |

##### Headers

```http
Content-Type: application/json
```

#### Response

##### Success Response (200 OK)

```json
{
  "data": [
    {
      "id": 1,
      "firma_adi": "ABC Teknoloji",
      "slug": "abc-teknoloji",
      "yetkili_adi": "Ahmet Yılmaz",
      "yetkili_soyadi": "Yılmaz",
      "telefon": "+905551234567",
      "email": "info@abcteknoloji.com",
      "website": "https://abcteknoloji.com",
      "adres": "İstanbul, Türkiye",
      "sektor": "Teknoloji",
      "logo_url": "/uploads/abc-teknoloji-logo.png",
      "profil_resmi": "/uploads/ahmet-yilmaz-profile.jpg",
      "qr_kod_url": "/img/id/qr-abc-teknoloji.png",
      "aktif": true,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "sosyal_medya": {
        "instagram": "abcteknoloji",
        "twitter": "abctech",
        "linkedin": "company/abc-teknoloji",
        "facebook": "abcteknoloji"
      },
      "banka_bilgileri": [
        {
          "banka_adi": "Ziraat Bankası",
          "iban": "TR12 3456 7890 1234 5678 9012 34",
          "hesap_sahibi": "ABC Teknoloji Ltd. Şti."
        }
      ],
      "template_id": 5,
      "template_settings": {
        "primaryColor": "#0066CC",
        "fontFamily": "Inter",
        "showQrCode": true
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 1000,
    "total": 150,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  },
  "meta": {
    "count": 150,
    "search": null,
    "cached": false,
    "fetchTime": "2024-01-15T10:30:00Z"
  }
}
```

##### Error Response (400 Bad Request)

```json
{
  "error": {
    "message": "Invalid query parameters",
    "code": "INVALID_PARAMS",
    "details": {
      "page": "Page must be a positive integer"
    }
  }
}
```

##### Error Response (500 Internal Server Error)

```json
{
  "error": {
    "message": "Database connection failed",
    "code": "DB_ERROR",
    "details": null
  }
}
```

#### Example Usage

##### cURL

```bash
# Tüm firmaları getir
curl -X GET "https://yourdomain.com/api/firmalar"

# Sayfalama ile
curl -X GET "https://yourdomain.com/api/firmalar?page=2&limit=20"

# Arama ile
curl -X GET "https://yourdomain.com/api/firmalar?search=teknoloji"
```

##### JavaScript (Fetch)

```javascript
// Tüm firmaları getir
const response = await fetch('/api/firmalar');
const data = await response.json();

// Parametreler ile
const params = new URLSearchParams({
  page: '1',
  limit: '20',
  search: 'teknoloji'
});

const response = await fetch(`/api/firmalar?${params}`);
const data = await response.json();
```

##### React Query Example

```jsx
import { useQuery } from '@tanstack/react-query';

function useFirmalar(page = 1, limit = 20, search = '') {
  return useQuery({
    queryKey: ['firmalar', page, limit, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search })
      });
      
      const response = await fetch(`/api/firmalar?${params}`);
      if (!response.ok) throw new Error('Failed to fetch firmalar');
      return response.json();
    }
  });
}
```

---

### ➕ POST /api/firmalar

Yeni bir firma oluşturur.

#### Request

##### Headers

```http
Content-Type: application/json
Authorization: Bearer {token} (Admin authentication required)
```

##### Body

```json
{
  "firma_adi": "XYZ Danışmanlık",
  "yetkili_adi": "Mehmet",
  "yetkili_soyadi": "Demir",
  "telefon": "+905559876543",
  "email": "mehmet@xyzdanismanlik.com",
  "website": "https://xyzdanismanlik.com",
  "adres": "Ankara, Türkiye",
  "sektor": "Danışmanlık",
  "logo_url": "/uploads/xyz-logo.png",
  "profil_resmi": "/uploads/mehmet-demir.jpg",
  "sosyal_medya": {
    "instagram": "xyzdanismanlik",
    "linkedin": "company/xyz-danismanlik"
  },
  "banka_bilgileri": [
    {
      "banka_adi": "İş Bankası",
      "iban": "TR98 7654 3210 9876 5432 1098 76",
      "hesap_sahibi": "XYZ Danışmanlık A.Ş."
    }
  ],
  "template_id": 12,
  "template_settings": {
    "primaryColor": "#FF6B6B",
    "fontFamily": "Roboto"
  }
}
```

##### Validation Rules

| Alan | Zorunlu | Tip | Min | Max | Format |
|------|---------|-----|-----|-----|--------|
| `firma_adi` | Evet | string | 2 | 255 | - |
| `yetkili_adi` | Evet | string | 2 | 100 | - |
| `yetkili_soyadi` | Evet | string | 2 | 100 | - |
| `telefon` | Evet | string | 10 | 20 | Phone |
| `email` | Evet | string | 5 | 255 | Email |
| `website` | Hayır | string | - | 255 | URL |
| `adres` | Hayır | string | - | 500 | - |
| `sektor` | Hayır | string | - | 100 | - |
| `template_id` | Hayır | integer | 1 | 40 | - |

#### Response

##### Success Response (201 Created)

```json
{
  "data": {
    "id": 151,
    "firma_adi": "XYZ Danışmanlık",
    "slug": "xyz-danismanlik",
    "created_at": "2024-01-15T11:00:00Z"
  },
  "message": "Firma başarıyla oluşturuldu"
}
```

##### Error Response (400 Bad Request)

```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": {
      "email": "Geçersiz email formatı",
      "telefon": "Telefon numarası geçersiz"
    }
  }
}
```

##### Error Response (409 Conflict)

```json
{
  "error": {
    "message": "Firma already exists",
    "code": "DUPLICATE_ENTRY",
    "details": {
      "slug": "xyz-danismanlik"
    }
  }
}
```

---

### 🔍 GET /api/firmalar/[id]

Belirli bir firmanın detaylarını getirir.

#### Request

##### Path Parameters

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `id` | integer | Evet | Firma ID |

#### Response

##### Success Response (200 OK)

```json
{
  "data": {
    "id": 1,
    "firma_adi": "ABC Teknoloji",
    "slug": "abc-teknoloji",
    "yetkili_adi": "Ahmet",
    "yetkili_soyadi": "Yılmaz",
    "telefon": "+905551234567",
    "email": "info@abcteknoloji.com",
    "website": "https://abcteknoloji.com",
    "adres": "İstanbul, Türkiye",
    "sektor": "Teknoloji",
    "logo_url": "/uploads/abc-teknoloji-logo.png",
    "profil_resmi": "/uploads/ahmet-yilmaz-profile.jpg",
    "qr_kod_url": "/img/id/qr-abc-teknoloji.png",
    "aktif": true,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z",
    "sosyal_medya": {
      "instagram": "abcteknoloji",
      "twitter": "abctech",
      "linkedin": "company/abc-teknoloji",
      "facebook": "abcteknoloji",
      "youtube": "abcteknoloji",
      "tiktok": "@abctech"
    },
    "banka_bilgileri": [
      {
        "banka_adi": "Ziraat Bankası",
        "iban": "TR12 3456 7890 1234 5678 9012 34",
        "hesap_sahibi": "ABC Teknoloji Ltd. Şti."
      }
    ],
    "template_id": 5,
    "template_settings": {
      "primaryColor": "#0066CC",
      "secondaryColor": "#003366",
      "fontFamily": "Inter",
      "showQrCode": true,
      "showSocialMedia": true,
      "showBankInfo": false
    },
    "iletisim_formu": {
      "enabled": true,
      "fields": ["name", "email", "phone", "message"]
    },
    "katalog_url": "/uploads/kataloglar/katalog_abc-teknoloji.pdf",
    "galeri": [
      "/uploads/galeri/abc-1.jpg",
      "/uploads/galeri/abc-2.jpg"
    ]
  }
}
```

##### Error Response (404 Not Found)

```json
{
  "error": {
    "message": "Firma not found",
    "code": "NOT_FOUND",
    "details": {
      "id": 999
    }
  }
}
```

---

### ✏️ PUT /api/firmalar/[id]

Mevcut bir firmayı günceller.

#### Request

##### Headers

```http
Content-Type: application/json
Authorization: Bearer {token} (Admin authentication required)
```

##### Path Parameters

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `id` | integer | Evet | Firma ID |

##### Body

```json
{
  "firma_adi": "ABC Teknoloji ve Yazılım",
  "telefon": "+905551234568",
  "email": "contact@abcteknoloji.com",
  "template_settings": {
    "primaryColor": "#0077EE",
    "showBankInfo": true
  }
}
```

**Not**: Sadece güncellenecek alanların gönderilmesi yeterlidir.

#### Response

##### Success Response (200 OK)

```json
{
  "data": {
    "id": 1,
    "firma_adi": "ABC Teknoloji ve Yazılım",
    "slug": "abc-teknoloji-ve-yazilim",
    "updated_at": "2024-01-15T12:00:00Z"
  },
  "message": "Firma başarıyla güncellendi"
}
```

---

### 🗑️ DELETE /api/firmalar/[id]

Bir firmayı siler.

#### Request

##### Headers

```http
Authorization: Bearer {token} (Admin authentication required)
```

##### Path Parameters

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `id` | integer | Evet | Firma ID |

#### Response

##### Success Response (200 OK)

```json
{
  "message": "Firma başarıyla silindi",
  "data": {
    "id": 1,
    "deleted_at": "2024-01-15T13:00:00Z"
  }
}
```

##### Error Response (404 Not Found)

```json
{
  "error": {
    "message": "Firma not found",
    "code": "NOT_FOUND",
    "details": {
      "id": 999
    }
  }
}
```

---

## Rate Limiting

- **Rate Limit**: 100 requests per minute per IP
- **Burst Limit**: 20 requests per second
- **Headers**:
  - `X-RateLimit-Limit`: 100
  - `X-RateLimit-Remaining`: 95
  - `X-RateLimit-Reset`: 1705316400

## Error Codes

| Kod | HTTP Status | Açıklama |
|-----|-------------|----------|
| `INVALID_PARAMS` | 400 | Geçersiz query parametreleri |
| `VALIDATION_ERROR` | 400 | Validation hatası |
| `UNAUTHORIZED` | 401 | Authentication gerekli |
| `FORBIDDEN` | 403 | Yetki yetersiz |
| `NOT_FOUND` | 404 | Kayıt bulunamadı |
| `DUPLICATE_ENTRY` | 409 | Duplicate kayıt |
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit aşıldı |
| `DB_ERROR` | 500 | Database hatası |
| `INTERNAL_ERROR` | 500 | Sunucu hatası |

## Security Considerations

1. **Authentication**: Admin işlemleri için JWT token gereklidir
2. **Input Validation**: Tüm input'lar validate edilir
3. **SQL Injection**: Parametreli sorgular kullanılır
4. **XSS Protection**: HTML/JS içerik sanitize edilir
5. **CORS**: Sadece belirli origin'lere izin verilir
6. **Rate Limiting**: DDoS koruması için rate limit uygulanır

## Performance Notes

- Response'lar cache'lenmez (real-time data)
- Database connection pooling kullanılır
- Pagination varsayılan olarak 1000 kayıt döner
- Search işlemleri indexed field'lar üzerinden yapılır
- Large dataset'ler için cursor-based pagination önerilir

---

*Son güncelleme: 2025-08-25 | API Version: 1.0.0*