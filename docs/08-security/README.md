# 🔒 Güvenlik Dokümantasyonu

Bu bölümde authentication, authorization, input validation, güvenlik best practices ve vulnerability assessment süreçleri yer almaktadır.

## 📋 İçerik Listesi

### 📁 Alt Klasörler
- [`auth/`](./auth/) - Authentication ve authorization sistemleri
- [`validation/`](./validation/) - Input validation ve sanitization
- [`best-practices/`](./best-practices/) - Güvenlik best practices
- [`vulnerability-reports/`](./vulnerability-reports/) - Güvenlik açığı raporları

### 📄 Ana Dokümantasyon
- `security-overview.md` - Güvenlik genel bakış
- `threat-model.md` - Tehdit modeli analizi
- `security-checklist.md` - Güvenlik kontrol listesi
- `incident-response.md` - Güvenlik olayı müdahale planı
- `compliance.md` - Uyumluluk gereksinimleri (GDPR, vb.)

### 🔗 İlgili Bölümler
- [Backend → Auth](../07-backend/auth/) - Authentication implementasyonu
- [API → Authentication](../03-api/authentication/) - API güvenliği
- [Deployment](../05-deployment/) - Production güvenlik konfigürasyonu

## 🛡️ Güvenlik Katmanları

### 1. Authentication & Authorization
```typescript
// NextAuth.js konfigürasyonu
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "text" },
        password: { type: "password" }
      },
      authorize: async (credentials) => {
        // Güvenli credential validation
        return await validateUser(credentials)
      }
    })
  ],
  session: { 
    strategy: "jwt",
    maxAge: 24 * 60 * 60 // 24 saat
  }
}
```

### 2. Input Validation & Sanitization
```typescript
// Zod validation schemas
export const FirmaSchema = z.object({
  firmaAdi: z.string()
    .min(2, "En az 2 karakter")
    .max(100, "En fazla 100 karakter")
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Geçersiz karakterler"),
  
  email: z.string()
    .email("Geçerli bir email adresi girin")
    .toLowerCase()
})
```

### 3. Data Protection
- **Encryption at Rest**: Supabase encryption
- **Encryption in Transit**: HTTPS/TLS 1.3
- **Password Hashing**: bcrypt with salt
- **API Keys**: Environment variables, rotation policy

## 🚨 Threat Model

### Tanımlanmış Tehditler
1. **SQL Injection** → Prisma ORM koruması
2. **XSS Attacks** → Input sanitization, CSP headers
3. **CSRF** → NextAuth CSRF tokens
4. **File Upload Attacks** → MIME type validation, size limits
5. **Brute Force** → Rate limiting, account lockout
6. **Data Exposure** → Proper authorization, data filtering

### Risk Değerlendirmesi
- **Critical**: Authentication bypass
- **High**: Data leakage, file upload vulnerabilities  
- **Medium**: Rate limiting bypass
- **Low**: Information disclosure

## 🔧 Güvenlik Konfigürasyonu

### Content Security Policy
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self' https://fonts.gstatic.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
]
```

### Rate Limiting
```typescript
// Rate limiting konfigürasyonu
const limiter = new RateLimiterFlexible({
  storeClient: redis,
  keyPrefix: 'middleware',
  points: 100, // Request sayısı
  duration: 60, // 60 saniye
})
```

### Environment Security
```bash
# Production environment variables
NEXTAUTH_SECRET="complex-secret-min-64-characters"
DATABASE_URL="encrypted-connection-string"
NODE_ENV="production"

# Güvenlik headers
FORCE_HTTPS=true
SECURE_COOKIES=true
```

## 📊 Güvenlik Monitoring

### Log Monitoring
- Authentication attempts
- Failed login patterns
- File upload activities
- API abuse patterns
- Database query anomalies

### Alerting Rules
```typescript
// Security event monitoring
export const securityAlerts = {
  multipleFailedLogins: { threshold: 5, timeWindow: '5m' },
  suspiciousFileUpload: { fileTypes: ['exe', 'bat', 'cmd'] },
  anomalousApiUsage: { requestRate: 1000, timeWindow: '1m' }
}
```

## ✅ Security Checklist

### Development
- ✅ Input validation implemented
- ✅ SQL injection protection (Prisma)
- ✅ XSS prevention
- ✅ CSRF protection
- ✅ Secure file upload

### Production
- ✅ HTTPS enforced
- ✅ Security headers configured
- ✅ Rate limiting active
- ✅ Database encryption
- ✅ Environment variables secured
- ✅ Logging and monitoring active

### Operational
- ✅ Security testing scheduled
- ✅ Vulnerability scanning
- ✅ Incident response plan
- ✅ Regular security reviews
- ✅ Staff security training

---
*Son güncelleme: 2025-08-25*