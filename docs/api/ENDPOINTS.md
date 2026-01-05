# API Endpoints Reference

Complete reference for all API endpoints in the Dijital Kartvizit platform.

**Base URL (Production):** `https://dijitalkartvizitmerkezi.com`
**Base URL (Development):** `http://localhost:3000`

---

## Authentication

All `/api/admin/*` endpoints require authentication.

**Authentication Method:** NextAuth.js JWT tokens
**Login:** POST `/api/auth/signin`
**Session:** Stored in HTTP-only cookie

---

## Table of Contents

1. [Authentication](#authentication-endpoints)
2. [Companies (Firmalar)](#companies-firmalar)
3. [File Upload](#file-upload)
4. [Settings](#settings)
5. [Packages](#packages)
6. [Reference Data](#reference-data)
7. [Health & Monitoring](#health--monitoring)
8. [Utility](#utility-endpoints)

---

## Authentication Endpoints

### POST /api/auth/signin
Login to admin panel.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "admin"
  },
  "expires": "2026-01-10T12:00:00.000Z"
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

**Rate Limiting:** 5 attempts per 15 minutes per IP

---

### POST /api/auth/signout
Logout from admin panel.

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Companies (Firmalar)

### GET /api/firmalar
Get all companies (paginated).

**Query Parameters:**
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Results per page (default: 20, max: 100)
- `search` (string, optional) - Search by company name
- `onay` (boolean, optional) - Filter by approval status
- `sektor_id` (number, optional) - Filter by sector
- `kategori_id` (number, optional) - Filter by category

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "firma_adi": "Example Corp",
      "slug": "example-corp",
      "profil_foto": "/uploads/profile.jpg",
      "onay": true,
      "goruntulenme": 150,
      "created_at": "2026-01-01T00:00:00.000Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5
}
```

---

### GET /api/firmalar/[id]
Get company by ID.

**Parameters:**
- `id` (path) - Company ID

**Response (200):**
```json
{
  "id": 1,
  "firma_adi": "Example Corp",
  "slug": "example-corp",
  "profil_foto": "/uploads/profile.jpg",
  "firma_logo": "/uploads/logo.jpg",
  "yetkili_adi": "John Doe",
  "yetkili_pozisyon": "CEO",
  "firma_hakkinda": "<p>About company...</p>",
  "template_id": 1,
  "gradient_color": "#D4AF37,#F7E98E,#B8860B",
  "iletisim_bilgileri": [
    {
      "id": 1,
      "tip": "telefon",
      "deger": "+90 212 123 4567",
      "etiket": "Head Office",
      "sira": 0
    }
  ],
  "sosyal_medya_hesaplari": [
    {
      "id": 1,
      "platform": "instagram",
      "url": "https://instagram.com/example",
      "sira": 0
    }
  ],
  "banka_hesaplari": [
    {
      "id": 1,
      "banka_adi": "Ziraat Bankası",
      "banka_logo": "/uploads/ziraat.png",
      "hesap_sahibi": "Example Corp",
      "hesaplar": [
        {
          "id": 1,
          "iban": "TR12 3456 7890 1234 5678 9012 34",
          "para_birimi": "TRY"
        }
      ]
    }
  ]
}
```

**Error (404):**
```json
{
  "error": {
    "message": "Company not found",
    "code": "NOT_FOUND",
    "statusCode": 404
  }
}
```

---

### POST /api/firmalar
Create new company.

**Authentication:** Required

**Request Body:**
```json
{
  "firma_adi": "New Company",
  "slug": "new-company",
  "yetkili_adi": "John Doe",
  "yetkili_pozisyon": "CEO",
  "template_id": 1,
  "sektor_id": 1,
  "kategori_id": 1,
  "il_id": 34,
  "ilce_id": 449,
  "onay": false
}
```

**Response (201):**
```json
{
  "id": 2,
  "firma_adi": "New Company",
  "slug": "new-company",
  "created_at": "2026-01-05T12:00:00.000Z"
}
```

**Validation Errors (400):**
```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "statusCode": 400,
    "details": [
      {
        "field": "slug",
        "message": "Slug must be lowercase alphanumeric with hyphens"
      }
    ]
  }
}
```

---

### PUT /api/firmalar/[id]
Update company.

**Authentication:** Required

**Parameters:**
- `id` (path) - Company ID

**Request Body:** (partial update supported)
```json
{
  "firma_adi": "Updated Name",
  "onay": true
}
```

**Response (200):**
```json
{
  "id": 1,
  "firma_adi": "Updated Name",
  "updated_at": "2026-01-05T12:00:00.000Z"
}
```

---

### DELETE /api/firmalar/[id]
Delete company.

**Authentication:** Required

**Parameters:**
- `id` (path) - Company ID

**Response (200):**
```json
{
  "message": "Company deleted successfully"
}
```

**Cascade:** Deletes all related contacts, social media, bank accounts

---

### GET /api/firmalar/slug/[slug]
Get company by slug.

**Parameters:**
- `slug` (path) - Company slug

**Response:** Same as GET /api/firmalar/[id]

**Cache:** 30 minutes

---

## File Upload

### POST /api/upload
Upload files (images, PDFs).

**Authentication:** Required

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `file` (file) - File to upload
- `type` (string) - Upload type: `profile`, `logo`, `catalog`, `bank_logo`
- `firma_id` (number, optional) - Company ID to associate file with

**Supported Files:**
- **Images:** JPEG, PNG, WebP, SVG (max 5MB)
- **Documents:** PDF (max 5MB)

**Response (200):**
```json
{
  "url": "/uploads/profiles/12345.jpg",
  "size": 245612,
  "format": "jpg"
}
```

**Production:** Uploads to Cloudinary
**Development:** Saves to `/public/uploads/`

---

## Settings

### GET /api/settings/site
Get site settings.

**Response (200):**
```json
{
  "site_name": "Dijital Kartvizit Merkezi",
  "contact_email": "info@example.com",
  "contact_phone": "+90 212 123 4567",
  "whatsapp_number": "+90 555 123 4567",
  "whatsapp_message": "Merhaba! Dijital kartvizit hakkında bilgi almak istiyorum.",
  "whatsapp_enabled": true
}
```

---

### PUT /api/settings/site
Update site settings.

**Authentication:** Required

**Request Body:**
```json
{
  "site_name": "Updated Name",
  "contact_email": "new@example.com",
  "whatsapp_enabled": false
}
```

**Response (200):**
```json
{
  "message": "Settings updated successfully"
}
```

---

### POST /api/settings/password
Change admin password.

**Authentication:** Required

**Request Body:**
```json
{
  "oldPassword": "current_password",
  "newPassword": "new_secure_password"
}
```

**Response (200):**
```json
{
  "message": "Password changed successfully"
}
```

**Error (401):**
```json
{
  "error": {
    "message": "Current password is incorrect",
    "code": "AUTHENTICATION_ERROR",
    "statusCode": 401
  }
}
```

---

### GET /api/settings/faq
Get FAQs.

**Query Parameters:**
- `active` (boolean, optional) - Filter by active status

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "question": "How does it work?",
      "answer": "Detailed answer...",
      "category": "general",
      "display_order": 0
    }
  ]
}
```

---

### PUT /api/settings/faq
Update FAQs.

**Authentication:** Required

**Request Body:**
```json
{
  "faqs": [
    {
      "id": 1,
      "question": "Updated question?",
      "answer": "Updated answer",
      "display_order": 0
    }
  ]
}
```

---

### GET /api/settings/testimonials
Get testimonials.

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Customer Name",
      "title": "CEO, Company",
      "text": "Great service!",
      "rating": 5,
      "avatar_url": "/uploads/avatar.jpg",
      "display_order": 0
    }
  ]
}
```

---

### GET /api/settings/slider
Get slider images.

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "image_url": "/uploads/slider1.jpg",
      "alt_text": "Banner 1",
      "display_order": 0
    }
  ]
}
```

---

### POST /api/settings/icon-order
Update icon display order.

**Authentication:** Required

**Request Body:**
```json
{
  "order": [
    { "name": "telefon", "priority": 1 },
    { "name": "email", "priority": 2 },
    { "name": "whatsapp", "priority": 3 }
  ]
}
```

---

## Packages

### GET /api/packages
Get all packages.

**Query Parameters:**
- `active` (boolean, optional) - Filter active packages only

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "package_key": "basic",
      "name": "Basic Package",
      "description": "Perfect for small businesses",
      "price": 29900,
      "card_count": 5,
      "features": [
        "5 Digital Cards",
        "QR Code",
        "Social Media Links",
        "Contact Form"
      ],
      "popular": false,
      "display_order": 0
    }
  ]
}
```

---

### POST /api/package-inquiry
Submit package inquiry.

**Request Body:**
```json
{
  "name": "John",
  "surname": "Doe",
  "phone": "+90 555 123 4567",
  "email": "john@example.com",
  "package_key": "premium"
}
```

**Response (201):**
```json
{
  "id": 1,
  "message": "Inquiry submitted successfully"
}
```

**Rate Limiting:** 3 inquiries per hour per IP

---

### GET /api/admin/package-inquiries
Get all package inquiries.

**Authentication:** Required

**Query Parameters:**
- `status` (string, optional) - Filter by status: `pending`, `contacted`, `completed`, `cancelled`

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "John",
      "surname": "Doe",
      "phone": "+90 555 123 4567",
      "email": "john@example.com",
      "package_key": "premium",
      "package_name": "Premium Package",
      "package_price": 49900,
      "status": "pending",
      "created_at": "2026-01-05T10:00:00.000Z"
    }
  ]
}
```

---

## Reference Data

### GET /api/sektorler
Get all sectors.

**Response (200):**
```json
{
  "data": [
    { "id": 1, "ad": "Technology" },
    { "id": 2, "ad": "Manufacturing" }
  ]
}
```

---

### GET /api/kategoriler
Get all categories.

**Response (200):**
```json
{
  "data": [
    { "id": 1, "ad": "Software" },
    { "id": 2, "ad": "Hardware" }
  ]
}
```

---

### GET /api/iller
Get all cities.

**Response (200):**
```json
{
  "data": [
    { "id": 34, "ad": "İstanbul" },
    { "id": 6, "ad": "Ankara" }
  ]
}
```

---

### GET /api/ilceler
Get districts by city.

**Query Parameters:**
- `il_id` (number) - City ID

**Response (200):**
```json
{
  "data": [
    { "id": 449, "ad": "Kadıköy", "il_id": 34 },
    { "id": 450, "ad": "Beşiktaş", "il_id": 34 }
  ]
}
```

---

## Health & Monitoring

### GET /api/health
Health check endpoint.

**Response (200):**
```json
{
  "status": "ok",
  "database": "connected",
  "cache": "available",
  "timestamp": "2026-01-05T12:00:00.000Z"
}
```

**Auto-creates default admin** if no admins exist

---

### GET /api/monitoring
Monitoring metrics.

**Authentication:** Required

**Response (200):**
```json
{
  "uptime": 86400,
  "memory": {
    "used": 157286400,
    "total": 2147483648
  },
  "requests": {
    "total": 15000,
    "errors": 25,
    "errorRate": 0.17
  }
}
```

---

## Utility Endpoints

### GET /api/view/[slug]
Increment view count for company.

**Parameters:**
- `slug` (path) - Company slug

**Response (200):**
```json
{
  "goruntulenme": 151
}
```

**Cache:** Debounced (1 view per IP per hour)

---

### GET /api/qr-codes/[slug]
Generate QR code for company card.

**Parameters:**
- `slug` (path) - Company slug

**Response:** QR code image (PNG)

**Headers:**
```
Content-Type: image/png
Cache-Control: public, max-age=86400
```

---

### GET /api/sayfalar/[slug]/vcard
Generate vCard file for company.

**Parameters:**
- `slug` (path) - Company slug

**Response:** vCard file (.vcf)

**Headers:**
```
Content-Type: text/vcard
Content-Disposition: attachment; filename="example-corp.vcf"
```

---

### POST /api/save-html
Save static HTML for company card.

**Authentication:** Required

**Request Body:**
```json
{
  "slug": "example-corp",
  "html": "<html>...</html>"
}
```

---

### POST /api/regenerate-html
Regenerate HTML for all companies.

**Authentication:** Required

**Response (200):**
```json
{
  "message": "Regenerated 100 company pages"
}
```

---

## Error Responses

All endpoints follow consistent error format:

```json
{
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "statusCode": 400,
    "details": {} // Optional additional details
  }
}
```

**Common Error Codes:**
- `VALIDATION_ERROR` (400) - Invalid input
- `AUTHENTICATION_ERROR` (401) - Not logged in
- `AUTHORIZATION_ERROR` (403) - Insufficient permissions
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT_ERROR` (409) - Duplicate resource
- `RATE_LIMIT_ERROR` (429) - Too many requests
- `INTERNAL_ERROR` (500) - Server error

See **[ERROR_HANDLING.md](ERROR_HANDLING.md)** for detailed error handling.

---

## Rate Limiting

- **Login:** 5 attempts / 15 minutes per IP
- **Package Inquiry:** 3 submissions / 1 hour per IP
- **File Upload:** 10 uploads / 1 hour per authenticated user
- **API Calls:** 100 requests / 1 minute per authenticated user

**Rate Limit Response (429):**
```json
{
  "error": {
    "message": "Too many requests, please try again later",
    "code": "RATE_LIMIT_ERROR",
    "statusCode": 429,
    "retryAfter": 900
  }
}
```

---

## Related Documentation

- **[VALIDATION.md](VALIDATION.md)** - Request validation schemas
- **[ERROR_HANDLING.md](ERROR_HANDLING.md)** - Error handling guide
- **[../architecture/SERVICES.md](../architecture/SERVICES.md)** - Service layer docs

---

**API Version:** 1.0
**Last Updated:** January 2026
**Base URL:** https://dijitalkartvizitmerkezi.com
