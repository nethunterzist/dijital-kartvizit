# 🚀 Vercel Production Deployment Rehberi

## Genel Bakış

Dijital Kartvizit sisteminin Vercel platformuna production deployment süreci. Bu rehber, sıfırdan tam deployment için tüm adımları içerir.

## 📋 Ön Hazırlık Kontrol Listesi

### ✅ Code Readiness
- [ ] Tüm environment variables tanımlandı
- [ ] Database production'a hazır (Supabase)
- [ ] Build errors çözülmüş
- [ ] TypeScript errors temizlenmiş
- [ ] Linting warnings giderilmiş
- [ ] Test suite geçiyor
- [ ] Performance optimizasyonları uygulanmış

### ✅ Infrastructure Readiness
- [ ] Domain registered/ready
- [ ] SSL certificate otomatik olarak alınacak
- [ ] CDN configuration (Cloudinary)
- [ ] Monitoring tools aktif (Vercel Analytics)
- [ ] Error tracking (optional: Sentry)

## 🏗️ Vercel Project Setup

### 1. GitHub Repository Hazırlama

```bash
# Repository'yi güncelleyip push et
git add .
git commit -m "feat: prepare for production deployment"
git push origin main

# Production branch oluştur (opsiyonel)
git checkout -b production
git push origin production
```

### 2. Vercel CLI Kurulumu

```bash
# Global Vercel CLI kurulumu
npm install -g vercel

# Vercel'e login
vercel login

# Project initialize
vercel
```

### 3. Vercel Dashboard'dan Setup

**Adım 1: New Project**
- https://vercel.com/new adresine git
- GitHub repository'nizi seçin
- Import butonuna tıklayın

**Adım 2: Configure Project**

```yaml
Project Settings:
  Framework Preset: Next.js
  Root Directory: ./
  Build Command: npm run build
  Output Directory: .next
  Install Command: npm install
  Development Command: npm run dev
```

## ⚙️ Environment Variables Configuration

### Production Environment Variables

Vercel Dashboard → Project → Settings → Environment Variables

```bash
# Database
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require"

# NextAuth.js - PRODUCTION
NEXTAUTH_SECRET="production-secret-min-64-chars-random-string"
NEXTAUTH_URL="https://your-domain.com"

# API Encryption
API_ENCRYPTION_KEY="your-encryption-key-here"

# Cloudinary (File Upload)
CLOUDINARY_URL="cloudinary://[key]:[secret]@[cloud-name]"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Supabase (Production)
SUPABASE_URL="https://[your-project-ref].supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Monitoring
UPTIME_MONITOR_URL="https://your-monitoring-url.com"
ERROR_WEBHOOK_URL="https://hooks.slack.com/services/..."

# Node Environment
NODE_ENV="production"
```

### Environment Variable Security

```typescript
// Güvenli env variable kullanımı
const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL'
] as const;

// Startup validation
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// Type-safe environment
interface Environment {
  DATABASE_URL: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
  CLOUDINARY_URL?: string;
}

const env: Environment = {
  DATABASE_URL: process.env.DATABASE_URL!,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};
```

## 🏗️ Build Configuration

### Production Build Settings

**vercel.json Configuration**:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next@latest"
    }
  ],
  "regions": ["fra1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    },
    "app/**/*.tsx": {
      "maxDuration": 10
    }
  },
  "crons": [
    {
      "path": "/api/health",
      "schedule": "*/5 * * * *"
    },
    {
      "path": "/api/cleanup",
      "schedule": "0 2 * * *"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/:slug/qr",
      "destination": "/api/qr-codes/:slug",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/health",
      "destination": "/api/health"
    }
  ]
}
```

### Build & Bundle Optimization

**next.config.js Production Settings**:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    output: 'standalone',
    poweredByHeader: false,
    generateEtags: true,
    
    // Compiler optimizations
    compiler: {
      removeConsole: {
        exclude: ['error', 'warn'],
      },
      reactRemoveProperties: true,
    },
    
    // Advanced webpack optimizations
    webpack: (config, { dev, isServer }) => {
      if (!dev) {
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react-vendor',
              priority: 10,
            },
            // ... diğer optimizasyonlar
          },
        };
      }
      return config;
    },
  }),
};
```

## 🔐 Security Configuration

### 1. Security Headers

```typescript
// Security headers (next.config.js'te tanımli)
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline'..."
  }
];
```

### 2. API Security

```typescript
// Rate limiting configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  maxDuration: 30,
  regions: ['fra1'],
}

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
```

### 3. Database Security

```typescript
// Supabase RLS policies
-- Row Level Security for firmalar table
CREATE POLICY "Firmalar are viewable by everyone when approved"
ON firmalar FOR SELECT
USING (onay = true);

CREATE POLICY "Firmalar can only be inserted/updated by authenticated users"
ON firmalar FOR ALL
TO authenticated
USING (auth.role() = 'admin');

-- API key validation
const validateApiKey = (req: NextRequest) => {
  const apiKey = req.headers.get('X-API-Key');
  if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
    throw new Error('Invalid API key');
  }
};
```

## 📊 Domain & DNS Configuration

### 1. Custom Domain Setup

**Vercel Dashboard Steps**:
1. Project → Settings → Domains
2. "Add Domain" butonuna tıkla
3. Domain'i girin: `your-domain.com`
4. DNS kayıtlarını güncelleyin

**DNS Records**:

```dns
# A Record (IP'ler Vercel tarafından sağlanır)
Type: A
Name: @
Value: 76.76.19.61

# CNAME Record (www subdomain)
Type: CNAME  
Name: www
Value: your-project.vercel.app

# MX Records (email için, opsiyonel)
Type: MX
Name: @
Value: mx1.your-email-provider.com
Priority: 10
```

### 2. SSL Certificate

Vercel otomatik olarak Let's Encrypt SSL certificate sağlar:

```bash
# SSL durumunu kontrol et
curl -I https://your-domain.com

# Expected headers:
# HTTP/2 200
# strict-transport-security: max-age=63072000
# x-frame-options: DENY
```

## 🚀 Deployment Process

### 1. Manual Deployment

```bash
# Local'den production deploy
vercel --prod

# Specific branch'den deploy
git checkout production
git merge main
git push origin production
vercel --prod
```

### 2. Automated Deployment (GitHub Integration)

**GitHub Actions Workflow** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run type check
      run: npm run type-check
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm run test
      
    - name: Build application
      run: npm run build
      env:
        DATABASE_URL: ${{ secrets.DATABASE_URL }}
        NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        working-directory: ./
        vercel-args: '--prod'
```

### 3. Deployment Verification

**Post-deployment Health Checks**:

```bash
# Health endpoint kontrolü
curl https://your-domain.com/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "database": "connected",
  "version": "1.2.0"
}

# Performance check
curl -w "@curl-format.txt" -o /dev/null -s https://your-domain.com/

# curl-format.txt content:
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
```

## 📈 Performance Optimization

### 1. Vercel Analytics

**Setup**:
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. Speed Insights

```bash
npm install @vercel/speed-insights
```

```typescript
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 3. Edge Functions

```typescript
// app/api/qr-codes/[slug]/route.ts
export const config = {
  runtime: 'edge',
  regions: ['fra1'], // Frankfurt region
};

export async function GET(request: Request) {
  // Edge function implementation
  // Düşük latency için edge'de çalışır
}
```

### 4. ISR (Incremental Static Regeneration)

```typescript
// app/[slug]/page.tsx
export async function generateStaticParams() {
  const firmalar = await getFirmalar();
  return firmalar.map(firma => ({ slug: firma.slug }));
}

export const revalidate = 3600; // 1 saat cache

export default async function FirmaPage({ params }) {
  const firma = await getFirmaBySlug(params.slug);
  return <FirmaSayfasi firma={firma} />;
}
```

## 🔍 Monitoring & Alerts

### 1. Uptime Monitoring

**Vercel'in Built-in Monitoring**:
- Response time tracking
- Error rate monitoring  
- Availability alerts

**External Services** (opsiyonel):
```typescript
// Uptime monitoring endpoint
export async function GET() {
  try {
    // Database connection check
    await prisma.$queryRaw`SELECT 1`;
    
    // External service checks
    const cloudinaryStatus = await checkCloudinary();
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        cloudinary: cloudinaryStatus ? 'connected' : 'disconnected'
      }
    });
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    );
  }
}
```

### 2. Error Tracking

**Sentry Integration** (opsiyonel):

```bash
npm install @sentry/nextjs
```

```javascript
// next.config.js
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  // ... existing config
};

const sentryWebpackPluginOptions = {
  org: "your-org",
  project: "dijital-kartvizit",
  silent: true,
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
```

### 3. Performance Monitoring

```typescript
// Performance metrics collection
export async function middleware(request: NextRequest) {
  const start = Date.now();
  
  const response = NextResponse.next();
  
  const duration = Date.now() - start;
  
  // Log slow requests
  if (duration > 1000) {
    console.warn(`Slow request: ${request.url} took ${duration}ms`);
  }
  
  response.headers.set('X-Response-Time', `${duration}ms`);
  return response;
}
```

## 🧪 Testing in Production

### 1. Smoke Tests

```typescript
// scripts/smoke-test.ts
const PRODUCTION_URL = 'https://your-domain.com';

const smokeTests = [
  {
    name: 'Homepage loads',
    test: () => fetch(`${PRODUCTION_URL}`).then(r => r.status === 200)
  },
  {
    name: 'API health check',
    test: () => fetch(`${PRODUCTION_URL}/api/health`).then(r => r.status === 200)
  },
  {
    name: 'Sample firma page',
    test: () => fetch(`${PRODUCTION_URL}/sample-firma`).then(r => r.status === 200)
  }
];

async function runSmokeTests() {
  for (const test of smokeTests) {
    try {
      const result = await test.test();
      console.log(`✅ ${test.name}: ${result ? 'PASSED' : 'FAILED'}`);
    } catch (error) {
      console.log(`❌ ${test.name}: ERROR - ${error.message}`);
    }
  }
}

runSmokeTests();
```

### 2. Load Testing

```bash
# Apache Bench ile basit load test
ab -n 100 -c 10 https://your-domain.com/

# Artillery ile advanced testing
npm install -g artillery
artillery quick --count 10 --num 20 https://your-domain.com/
```

## 📋 Post-Deployment Checklist

### ✅ Immediate Checks (0-30 minutes)
- [ ] Site loads properly
- [ ] All pages accessible
- [ ] Forms working
- [ ] Database connections active
- [ ] File uploads working
- [ ] QR codes generating
- [ ] Admin panel accessible

### ✅ Extended Checks (1-24 hours)
- [ ] Performance metrics good
- [ ] No error spikes
- [ ] SSL certificate valid
- [ ] SEO meta tags correct
- [ ] Analytics tracking
- [ ] Search indexing

### ✅ Weekly Monitoring
- [ ] Performance trends
- [ ] Error rate analysis
- [ ] User feedback review
- [ ] Security scan results
- [ ] Dependency updates
- [ ] Backup verification

## 🚨 Rollback Plan

### Emergency Rollback

```bash
# Quick rollback to previous deployment
vercel rollback

# Rollback to specific deployment
vercel rollback [deployment-url]

# Alternative: Redeploy previous commit
git checkout [previous-commit-hash]
vercel --prod
```

### Rollback Checklist

1. **Identify Issue**: Error logs, monitoring alerts
2. **Assess Impact**: User-facing vs. backend issue
3. **Execute Rollback**: Use vercel rollback command
4. **Verify Fix**: Run smoke tests
5. **Communicate**: Notify team and users if needed
6. **Post-mortem**: Analyze and document issue

## 💡 Best Practices

### 1. Deployment Strategy

- **Blue-Green Deployments**: Use Vercel's preview deployments
- **Feature Flags**: Gradual feature rollout
- **Database Migrations**: Run migrations before code deploy
- **Cache Invalidation**: Clear caches after deployment

### 2. Security Best Practices

- **Environment Variables**: Never commit secrets
- **HTTPS Only**: Force HTTPS in production
- **Rate Limiting**: Implement API rate limits
- **Input Validation**: Validate all user inputs
- **Regular Updates**: Keep dependencies updated

### 3. Performance Best Practices

- **Image Optimization**: Use Next.js Image component
- **Code Splitting**: Dynamic imports for large components
- **Caching Strategy**: Implement appropriate cache headers
- **Bundle Size**: Monitor and optimize bundle size
- **Core Web Vitals**: Optimize for Google's metrics

---

## 📚 İlgili Dökümanlar

- [Environment Setup](../../01-setup/environment-setup.md) - Env variables setup
- [Database Migration](../../04-database/migrations/README.md) - DB migration guide  
- [Security Guidelines](../../08-security/README.md) - Security best practices
- [Performance Monitoring](../../10-performance/monitoring.md) - Performance optimization
- [Troubleshooting](../../11-guides/troubleshooting/README.md) - Common issues

---

*Son güncelleme: 2025-08-25 | Deployment Version: 1.2.0*