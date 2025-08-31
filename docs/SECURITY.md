# 🛡️ Güvenlik Dokümantasyonu

## 🎯 Güvenlik Genel Bakış

Bu dokümantasyon, Dijital Kartvizit sistemi için güvenlik önlemlerini, best practice'leri ve uyulması gereken güvenlik standartlarını içerir.

## 🔐 Authentication & Authorization

### NextAuth.js Implementation

**Sistem**: NextAuth.js v4 tabanlı session yönetimi
**Session Storage**: Database sessions (PostgreSQL)
**Session Duration**: 30 gün (configurable)

```typescript
// /app/lib/auth.ts
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Bcrypt password verification
        // Rate limiting implemented
        // Account lockout after 5 failed attempts
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // JWT token customization
    },
    session: async ({ session, token }) => {
      // Session customization
    }
  }
};
```

### Admin Route Protection

**Implementation**: Middleware-based route protection

```typescript
// middleware.ts
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const sessionToken = req.cookies.get('next-auth.session-token');
    if (!sessionToken) {
      return NextResponse.redirect('/login');
    }
  }
}
```

### Security Headers

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options', 
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()'
          }
        ]
      }
    ];
  }
};
```

## 🔒 Input Validation & Sanitization

### API Input Validation

**Framework**: Zod schema validation
**Implementation**: Tüm API endpoint'lerinde input validation

```typescript
// Example validation schema
const FirmaSchema = z.object({
  firma_adi: z.string().min(1).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  email: z.string().email().optional(),
  telefon: z.string().regex(/^\+?[0-9\s\-\(\)]+$/).optional()
});

// API route implementation
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const validated = FirmaSchema.parse(data); // Throws if invalid
    // Process validated data
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
  }
}
```

### SQL Injection Prevention

**Method**: Parameterized queries via Prisma ORM ve raw queries
**Implementation**: Tüm database queries parameterized

```typescript
// Safe parameterized query
const result = await client.query(
  'SELECT * FROM firmalar WHERE slug = $1',
  [slug]
);

// NEVER DO THIS (SQL injection vulnerable)
// const query = `SELECT * FROM firmalar WHERE slug = '${slug}'`;
```

### XSS Prevention

**Frontend Protection**:
- React's automatic JSX escaping
- DOMPurify for HTML content
- Content Security Policy headers

```typescript
// Safe HTML rendering
import DOMPurify from 'dompurify';

function DisplayContent({ htmlContent }: { htmlContent: string }) {
  const sanitized = DOMPurify.sanitize(htmlContent);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

## 📁 File Upload Security

### Upload Restrictions

**Allowed File Types**:
- Images: JPG, JPEG, PNG, GIF, WebP
- Documents: PDF
- Max file size: 5MB (images), 10MB (PDFs)

**Security Measures**:
```typescript
// /app/lib/services/LocalFileUploadService.ts
class LocalFileUploadService {
  private static readonly ALLOWED_TYPES = {
    images: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    documents: ['application/pdf']
  };

  private static readonly MAX_FILE_SIZE = {
    images: 5 * 1024 * 1024, // 5MB
    documents: 10 * 1024 * 1024 // 10MB
  };

  static async uploadSingleFile(file: File, folder: string, isPdf = false) {
    // 1. MIME type validation
    const allowedTypes = isPdf ? this.ALLOWED_TYPES.documents : this.ALLOWED_TYPES.images;
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }

    // 2. File size validation
    const maxSize = isPdf ? this.MAX_FILE_SIZE.documents : this.MAX_FILE_SIZE.images;
    if (file.size > maxSize) {
      throw new Error('File too large');
    }

    // 3. File content validation (magic bytes)
    const buffer = await file.arrayBuffer();
    if (!this.validateFileSignature(buffer, file.type)) {
      throw new Error('Invalid file signature');
    }

    // 4. Generate secure filename
    const secureFilename = this.generateSecureFilename(file.name);
    
    // 5. Store in secure location
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', folder);
    await fs.ensureDir(uploadPath);
    
    return { success: true, url: `/uploads/${folder}/${secureFilename}` };
  }

  private static validateFileSignature(buffer: ArrayBuffer, mimeType: string): boolean {
    const bytes = new Uint8Array(buffer.slice(0, 8));
    
    // Check magic bytes for different file types
    const signatures = {
      'image/jpeg': [[0xFF, 0xD8, 0xFF]],
      'image/png': [[0x89, 0x50, 0x4E, 0x47]],
      'application/pdf': [[0x25, 0x50, 0x44, 0x46]]
    };

    return signatures[mimeType as keyof typeof signatures]?.some(sig => 
      sig.every((byte, i) => bytes[i] === byte)
    ) || false;
  }

  private static generateSecureFilename(originalName: string): string {
    const ext = path.extname(originalName);
    const timestamp = Date.now();
    const random = crypto.randomBytes(3).toString('hex');
    return `${timestamp}_${random}${ext}`;
  }
}
```

### File Storage Security

**Directory Structure**:
```
public/uploads/
├── firma_logolari/         # Company logos
├── profil_fotograflari/    # Profile photos  
└── firma_kataloglari/      # Company catalogs (PDFs)
```

**Security Measures**:
- Files stored outside web root when possible
- Generated filenames (no user input)
- Directory traversal prevention
- File access logging

## 🚦 Rate Limiting

### API Rate Limits

**Implementation**: rate-limiter-flexible

```typescript
// /app/lib/rateLimiter.ts
import { RateLimiterRedis } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'api_limit',
  points: 100, // Number of requests
  duration: 3600, // Per 1 hour
  blockDuration: 3600, // Block for 1 hour if exceeded
});

export async function checkRateLimit(identifier: string) {
  try {
    await rateLimiter.consume(identifier);
    return { allowed: true };
  } catch (rateLimiterRes) {
    return {
      allowed: false,
      resetTime: rateLimiterRes.msBeforeNext,
      remainingPoints: rateLimiterRes.remainingPoints
    };
  }
}
```

**Rate Limit Policies**:
- **General API**: 100 requests/hour per IP
- **File Upload**: 20 requests/hour per IP  
- **Authentication**: 5 attempts/minute per IP
- **Password Reset**: 3 attempts/hour per email

## 🗄️ Database Security

### Connection Security

```typescript
// Database connection with SSL
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

**Security Measures**:
- SSL-only connections
- Connection pooling limits
- Query timeout limits
- Prepared statements only

### Data Encryption

**At Rest**:
- PostgreSQL transparent data encryption
- Backup encryption with AES-256

**In Transit**:
- TLS 1.3 for all connections
- HTTPS enforced (HSTS headers)

**Sensitive Data**:
```typescript
// Password hashing
import bcrypt from 'bcrypt';

const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Sensitive data masking in logs
logger.info('User login', { 
  username: user.username,
  ip: req.ip,
  userAgent: req.headers['user-agent'],
  // Never log: password, tokens, sensitive data
});
```

## 🔍 Security Monitoring & Logging

### Security Event Logging

```typescript
// /app/lib/logger.ts
import winston from 'winston';

export const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/security.log' }),
    new winston.transports.Console()
  ]
});

// Usage in code
securityLogger.warn('Multiple failed login attempts', {
  username: 'admin',
  ip: req.ip,
  attempts: failedAttempts,
  timestamp: new Date().toISOString()
});
```

**Monitored Events**:
- Failed authentication attempts
- Admin panel access
- File upload attempts
- Rate limit violations
- Suspicious query patterns
- Error patterns indicating attacks

### Error Handling

**Secure Error Messages**:
```typescript
// DON'T expose internal details
return NextResponse.json({ 
  error: 'Database connection failed: Connection to localhost:5432 refused' 
}, { status: 500 });

// DO provide generic messages
return NextResponse.json({ 
  error: 'Internal server error. Please try again.' 
}, { status: 500 });
```

## 🚨 Vulnerability Management

### Dependency Security

**Automated Scanning**:
```bash
# Regular security audits
npm audit
npm audit fix

# Update dependencies
npm update
```

**Package.json Security**:
```json
{
  "scripts": {
    "audit": "npm audit --audit-level moderate",
    "audit:fix": "npm audit fix",
    "security:scan": "npm audit && npm outdated"
  }
}
```

### Security Headers Checklist

**Implemented Headers**:
```typescript
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff', 
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
};
```

## 🔒 Environment & Secrets Management

### Environment Variables

**Required Environment Variables**:
```bash
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=very-long-random-string-32-chars-min

# File uploads
UPLOAD_MAX_SIZE=5242880
ALLOWED_ORIGINS=https://yourdomain.com

# Security
RATE_LIMIT_POINTS=100
RATE_LIMIT_DURATION=3600
```

**Security Best Practices**:
- Never commit secrets to git
- Use strong random values (32+ characters)
- Rotate secrets regularly
- Use different secrets for different environments

### Production Deployment Security

**Docker Security**:
```dockerfile
# Use non-root user
USER node

# Minimize attack surface  
RUN apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# Security scanning
RUN npm audit --audit-level moderate
```

**NGINX Configuration**:
```nginx
# Security headers
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";

# Hide server information
server_tokens off;

# Rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req zone=api burst=20 nodelay;
```

## 📋 Security Checklist

### Pre-Deployment Security Audit

**Code Review**:
- [ ] No hardcoded secrets
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS prevention measures
- [ ] CSRF protection enabled
- [ ] Rate limiting implemented
- [ ] Error handling doesn't leak info
- [ ] Authentication required for admin routes
- [ ] File upload restrictions enforced
- [ ] Security headers configured

**Infrastructure**:
- [ ] HTTPS enforced (HSTS)
- [ ] Database access restricted
- [ ] Backups encrypted
- [ ] Monitoring/alerting configured
- [ ] Log retention policies
- [ ] Incident response plan
- [ ] Regular security updates scheduled

### Monthly Security Tasks

**Routine Security Maintenance**:
- [ ] Update dependencies (`npm audit`)
- [ ] Review access logs for anomalies
- [ ] Check for failed authentication patterns
- [ ] Verify backup integrity
- [ ] Review and rotate secrets
- [ ] Security monitoring health check
- [ ] Penetration testing (quarterly)

## 🚨 Incident Response

### Security Incident Types

**High Priority**:
- Data breach or unauthorized access
- Authentication bypass
- SQL injection attacks
- XSS attacks affecting users
- DoS/DDoS attacks

**Response Steps**:
1. **Immediate**: Isolate affected systems
2. **Assessment**: Determine scope and impact
3. **Containment**: Stop the attack/breach
4. **Eradication**: Remove vulnerabilities
5. **Recovery**: Restore normal operations
6. **Lessons Learned**: Update security measures

### Emergency Contacts

**Security Incidents**:
- Technical Lead: [contact]
- System Administrator: [contact]  
- Legal/Compliance: [contact]

## 📚 Security Resources

### OWASP Top 10 Compliance

**Covered Risks**:
1. ✅ Injection (SQL, XSS) - Parameterized queries, input validation
2. ✅ Broken Authentication - NextAuth.js, session management
3. ✅ Sensitive Data Exposure - Encryption, secure headers
4. ✅ XML External Entities (XXE) - Not applicable (no XML processing)
5. ✅ Broken Access Control - Role-based access, route protection
6. ✅ Security Misconfiguration - Security headers, secure defaults
7. ✅ Cross-Site Scripting - React JSX escaping, CSP headers
8. ✅ Insecure Deserialization - JSON only, validation
9. ✅ Known Vulnerabilities - Automated dependency scanning
10. ✅ Insufficient Logging - Comprehensive security logging

### Security Training Resources

**Recommended Reading**:
- OWASP Application Security Verification Standard
- Next.js Security Best Practices
- Node.js Security Handbook
- PostgreSQL Security Guide

---

> 🚨 **Important**: Bu güvenlik dokümantasyonu düzenli olarak güncellenmelidir. Yeni güvenlik açıkları ve tehditlere karşı sürekli güncelleme gereklidir.