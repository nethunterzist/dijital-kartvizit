# 📱 QR Codes API Endpoint Dokümantasyonu

## Genel Bakış

QR Codes API, dijital kartvizit sisteminde QR kod oluşturma ve yönlendirme işlemlerini yönetir. Bu endpoint, firma slug'ına göre QR kod içeriği generate eder ve dijital kartvizit sayfalarına yönlendirme yapar.

## Base URL

```
/api/qr-codes
```

## Endpoints

### 📱 GET /api/qr-codes/[slug]

Belirli bir firma için QR kod sayfası veya QR kod image'ı döner.

#### Request

##### Path Parameters

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `slug` | string | Evet | Firma slug identifier |

##### Query Parameters

| Parametre | Tip | Zorunlu | Açıklama | Default |
|-----------|-----|---------|----------|---------|
| `format` | string | Hayır | Dönüş formatı | `html` |
| `size` | integer | Hayır | QR kod boyutu (px) | 300 |
| `margin` | integer | Hayır | QR kod kenar boşluğu | 4 |
| `color` | string | Hayır | QR kod rengi (hex) | `#000000` |
| `background` | string | Hayır | Arkaplan rengi (hex) | `#FFFFFF` |
| `download` | boolean | Hayır | Dosya olarak indir | `false` |

##### Headers

```http
Accept: text/html,application/json,image/png
User-Agent: {browser/app identifier}
```

#### Response Formats

##### 1. HTML Response (Default)

**Content-Type**: `text/html`

Firma template'ine göre render edilmiş HTML sayfa döner.

```html
<!DOCTYPE html>
<html>
<head>
    <title>ABC Teknoloji - Dijital Kartvizit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Template CSS -->
</head>
<body>
    <!-- Template HTML content -->
    <div class="business-card">
        <div class="logo">
            <img src="/uploads/abc-teknoloji-logo.png" alt="ABC Teknoloji">
        </div>
        <h1>ABC Teknoloji</h1>
        <h2>Ahmet Yılmaz</h2>
        <div class="contact-info">
            <!-- Dinamik iletişim bilgileri -->
        </div>
        <div class="social-media">
            <!-- Sosyal medya linkleri -->
        </div>
        <div class="qr-code">
            <canvas id="qr-canvas"></canvas>
        </div>
    </div>
</body>
</html>
```

##### 2. JSON Response

**Query**: `?format=json`
**Content-Type**: `application/json`

```json
{
  "data": {
    "firma": {
      "id": 1,
      "firma_adi": "ABC Teknoloji",
      "slug": "abc-teknoloji",
      "yetkili_adi": "Ahmet Yılmaz",
      "yetkili_pozisyon": "Genel Müdür",
      "template_id": 5,
      "qr_kod_url": "/api/qr-codes/abc-teknoloji?format=image",
      "kartvizit_url": "https://yourdomain.com/abc-teknoloji"
    },
    "qr_code": {
      "url": "https://yourdomain.com/abc-teknoloji",
      "image_url": "/api/qr-codes/abc-teknoloji?format=image",
      "size": 300,
      "format": "png"
    },
    "template": {
      "id": 5,
      "name": "Corporate Blue",
      "version": "1.2.0"
    }
  },
  "meta": {
    "generated_at": "2024-01-15T10:30:00Z",
    "expires_at": "2024-01-15T11:30:00Z",
    "cache_key": "qr:abc-teknoloji:v1"
  }
}
```

##### 3. PNG Image Response

**Query**: `?format=image` veya `?format=png`
**Content-Type**: `image/png`

QR kod PNG formatında binary data döner.

```http
HTTP/1.1 200 OK
Content-Type: image/png
Content-Length: 2048
Cache-Control: public, max-age=3600
```

Binary PNG data...

##### 4. SVG Image Response

**Query**: `?format=svg`
**Content-Type**: `image/svg+xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33" width="300" height="300">
  <rect width="33" height="33" fill="#FFFFFF"/>
  <!-- QR kod path'leri -->
  <path d="M1,1 h7v7h-7z" fill="#000000"/>
  <!-- ... -->
</svg>
```

#### Example Usage

##### HTML Sayfası (Default)

```bash
# Browser'da açmak için
curl -X GET "https://yourdomain.com/api/qr-codes/abc-teknoloji"

# cURL ile HTML içeriği almak
curl -X GET "https://yourdomain.com/api/qr-codes/abc-teknoloji" \
  -H "Accept: text/html"
```

##### PNG QR Kod Image

```bash
# QR kod resmi indir
curl -X GET "https://yourdomain.com/api/qr-codes/abc-teknoloji?format=image" \
  -o qr-code.png

# Özel boyut ve renk
curl -X GET "https://yourdomain.com/api/qr-codes/abc-teknoloji?format=image&size=500&color=%23FF0000" \
  -o custom-qr.png
```

##### JavaScript Integration

```javascript
// QR kod sayfasını iframe'de göster
const qrFrame = document.createElement('iframe');
qrFrame.src = '/api/qr-codes/abc-teknoloji';
qrFrame.width = '100%';
qrFrame.height = '600';
document.body.appendChild(qrFrame);

// QR kod image'ını img tag'de göster
const qrImg = document.createElement('img');
qrImg.src = '/api/qr-codes/abc-teknoloji?format=image&size=200';
qrImg.alt = 'ABC Teknoloji QR Kod';
document.getElementById('qr-container').appendChild(qrImg);

// Fetch ile JSON data al
const response = await fetch('/api/qr-codes/abc-teknoloji?format=json');
const data = await response.json();
console.log('QR Kod URL:', data.data.qr_code.image_url);
```

##### React Component

```jsx
import { useState, useEffect } from 'react';

function QRCodeDisplay({ slug, format = 'image', size = 300 }) {
  const [qrUrl, setQrUrl] = useState('');
  
  useEffect(() => {
    const url = `/api/qr-codes/${slug}?format=${format}&size=${size}`;
    setQrUrl(url);
  }, [slug, format, size]);
  
  if (format === 'image') {
    return (
      <img 
        src={qrUrl} 
        alt={`${slug} QR Kod`}
        width={size}
        height={size}
        className="qr-code-image"
      />
    );
  }
  
  if (format === 'html') {
    return (
      <iframe 
        src={qrUrl}
        width="100%"
        height="600"
        className="qr-code-frame"
        title={`${slug} Dijital Kartvizit`}
      />
    );
  }
  
  return null;
}

// Kullanım
<QRCodeDisplay slug="abc-teknoloji" format="image" size={250} />
```

#### Error Responses

##### 404 Not Found

```json
{
  "error": {
    "message": "Firma bulunamadı",
    "code": "FIRMA_NOT_FOUND",
    "details": {
      "slug": "non-existent-slug"
    }
  }
}
```

##### 400 Bad Request

```json
{
  "error": {
    "message": "Geçersiz format parametresi",
    "code": "INVALID_FORMAT",
    "details": {
      "format": "invalid-format",
      "allowed": ["html", "json", "image", "png", "svg"]
    }
  }
}
```

##### 500 Internal Server Error

```json
{
  "error": {
    "message": "QR kod oluşturulamadı",
    "code": "QR_GENERATION_ERROR",
    "details": {
      "template_id": 5,
      "reason": "Template rendering failed"
    }
  }
}
```

---

## QR Kod Özellikleri

### Supported Formats

| Format | MIME Type | Açıklama | Use Case |
|--------|-----------|----------|----------|
| `html` | `text/html` | Tam sayfa render | Browser görüntüleme |
| `json` | `application/json` | Structured data | API integration |
| `image` | `image/png` | PNG binary | Mobil uygulamalar |
| `png` | `image/png` | PNG binary | Alias for image |
| `svg` | `image/svg+xml` | Vector graphic | Scalable display |

### QR Code Specifications

```typescript
interface QRCodeConfig {
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'; // Default: 'M'
  type: 'image/png' | 'image/svg+xml';
  quality: number; // 0.92 default
  margin: number; // 4 default
  color: {
    dark: string; // '#000000' default
    light: string; // '#FFFFFF' default
  };
  width: number; // 300 default
}
```

### Generated QR Content

QR kod içerisinde encode edilen URL formatı:

```
https://yourdomain.com/{slug}
```

**Örnek**: `https://dijitalkartvizit.com/abc-teknoloji`

---

## Template System Integration

### Template Selection

```typescript
// Template ID'ye göre dinamik yükleme
const getTemplateModule = async (templateId: number) => {
  switch (templateId) {
    case 1: return await import('@/app/lib/templates/template1-gold');
    case 2: return await import('@/app/lib/templates/template2-modern');
    case 3: return await import('@/app/lib/templates/template3-minimal');
    // ... diğer template'ler
    default: return await import('@/app/lib/templates/template1-gold');
  }
};
```

### Template Variables

Her template'e aşağıdaki değişkenler inject edilir:

```handlebars
{{-- Firma Bilgileri --}}
{{firma.firma_adi}}
{{firma.yetkili_adi}}
{{firma.yetkili_pozisyon}}
{{firma.firma_hakkinda}}

{{-- İletişim Bilgileri --}}
{{#each iletisim_bilgileri}}
  {{tip}} - {{deger}} ({{etiket}})
{{/each}}

{{-- Sosyal Medya --}}
{{#each sosyal_medya}}
  {{platform}} - {{url}}
{{/each}}

{{-- Banka Bilgileri --}}
{{#each banka_hesaplari}}
  {{banka_adi}} - {{iban}}
{{/each}}

{{-- Asset URLs --}}
{{firma.logo_url}}
{{firma.profil_resmi}}
{{firma.katalog_url}}

{{-- QR Kod --}}
{{qr_code_data_url}}
{{qr_code_svg}}
```

---

## Performance & Caching

### Response Caching

```typescript
// Cache stratejisi
const CACHE_CONFIG = {
  HTML_RESPONSE: {
    ttl: 3600, // 1 saat
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'ETag': `"qr-html-${slug}-${templateId}-${lastModified}"`
    }
  },
  IMAGE_RESPONSE: {
    ttl: 7200, // 2 saat
    headers: {
      'Cache-Control': 'public, max-age=7200, immutable',
      'Content-Type': 'image/png'
    }
  },
  JSON_RESPONSE: {
    ttl: 1800, // 30 dakika
    headers: {
      'Cache-Control': 'public, max-age=1800'
    }
  }
};
```

### QR Code Generation Performance

```typescript
// QR kod generation metrikleri
const QR_PERFORMANCE = {
  SMALL: { size: 150, time: '~5ms', memory: '~2KB' },
  MEDIUM: { size: 300, time: '~10ms', memory: '~8KB' },
  LARGE: { size: 500, time: '~15ms', memory: '~20KB' },
  XLARGE: { size: 1000, time: '~30ms', memory: '~80KB' }
};
```

### CDN Integration

```typescript
// Statik QR kodları CDN'e push
const uploadToR2 = async (slug: string, qrBuffer: Buffer) => {
  const key = `qr-codes/${slug}-300x300.png`;
  await r2Client.putObject({
    Bucket: 'qr-codes',
    Key: key,
    Body: qrBuffer,
    ContentType: 'image/png',
    CacheControl: 'public, max-age=86400'
  });
  return `https://cdn.yourdomain.com/${key}`;
};
```

---

## Security Considerations

### Input Validation

```typescript
const validateQRRequest = (slug: string, query: URLSearchParams) => {
  // Slug validation
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error('Invalid slug format');
  }
  
  // Size validation
  const size = parseInt(query.get('size') || '300');
  if (size < 50 || size > 2000) {
    throw new Error('Size must be between 50-2000px');
  }
  
  // Color validation
  const color = query.get('color');
  if (color && !/^#[0-9A-Fa-f]{6}$/.test(color)) {
    throw new Error('Invalid color format');
  }
};
```

### Rate Limiting

```typescript
const QR_RATE_LIMITS = {
  IP_BASED: {
    windowMs: 60 * 1000, // 1 dakika
    max: 100, // request per minute
    message: 'Too many QR requests'
  },
  SLUG_BASED: {
    windowMs: 5 * 60 * 1000, // 5 dakika
    max: 500, // request per slug per 5 minutes
    message: 'Too many requests for this business card'
  }
};
```

---

## Integration Examples

### Mobile App Integration

```swift
// Swift iOS örneği
func loadQRCode(for slug: String) async throws -> UIImage {
    let url = URL(string: "https://api.yourdomain.com/qr-codes/\(slug)?format=image&size=300")!
    let (data, _) = try await URLSession.shared.data(from: url)
    guard let image = UIImage(data: data) else {
        throw QRError.invalidImageData
    }
    return image
}
```

### WhatsApp Sharing

```javascript
// WhatsApp'ta QR kod paylaşımı
function shareQRCode(slug) {
  const qrUrl = `/api/qr-codes/${slug}?format=image&size=400`;
  const businessUrl = `https://yourdomain.com/${slug}`;
  const message = `Dijital kartvizitimi inceleyin: ${businessUrl}`;
  
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}
```

### Email Signature Integration

```html
<!-- Email imzasında QR kod kullanımı -->
<table>
  <tr>
    <td>
      <strong>Ahmet Yılmaz</strong><br>
      ABC Teknoloji<br>
      +90 555 123 4567
    </td>
    <td style="padding-left: 20px;">
      <img src="https://yourdomain.com/api/qr-codes/abc-teknoloji?format=image&size=80" 
           alt="Dijital Kartvizit QR" 
           width="80" height="80">
    </td>
  </tr>
</table>
```

---

## Monitoring & Analytics

### QR Code Metrics

```typescript
interface QRMetrics {
  total_generations: number;
  unique_slugs: number;
  format_breakdown: {
    html: number;
    image: number;
    json: number;
    svg: number;
  };
  size_distribution: {
    small: number; // <200px
    medium: number; // 200-400px
    large: number; // >400px
  };
  response_times: {
    avg: number;
    p95: number;
    p99: number;
  };
}
```

### Error Tracking

```typescript
const QR_ERROR_CODES = {
  FIRMA_NOT_FOUND: 'Firma bulunamadı',
  TEMPLATE_LOAD_ERROR: 'Template yüklenemedi',
  QR_GENERATION_ERROR: 'QR kod oluşturulamadı',
  INVALID_FORMAT: 'Geçersiz format',
  RATE_LIMIT_EXCEEDED: 'Rate limit aşıldı'
};
```

---

*Son güncelleme: 2025-08-25 | API Version: 1.0.0*