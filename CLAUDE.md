# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 14 digital business card (dijital kartvizit) platform using App Router, TypeScript, PostgreSQL with Prisma ORM, and NextAuth.js. Companies create professional digital business cards with QR codes, social media links, contact information, and bank account details.

**Live Site**: https://dijitalkartvizitmerkezi.com

## Development Commands

### Essential Commands
```bash
# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build              # Runs: prisma generate && next build

# Start production server
npm start                  # Runs: prisma generate && next start

# Database operations
npx prisma generate        # Generate Prisma Client after schema changes
npx prisma db push         # Push schema changes to database
npm run db:push           # Alias for prisma db push

# Code quality
npm run lint              # Run ESLint
npm run type-check        # TypeScript type checking without emit

# Health check
npm run health:check      # Run health check script

# Bundle analysis (optional)
ANALYZE=true npm run build # Analyze bundle size with webpack-bundle-analyzer
```

### Testing Commands
```bash
npm test                  # Run all tests
npm test -- --coverage    # Run tests with coverage report
npm test -- --watch       # Run tests in watch mode
```

## Tech Stack

**Core Technologies**:
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js with JWT strategy
- **Styling**: Tailwind CSS

**File Storage & Caching**:
- **Production Storage**: Cloudinary (images, PDFs)
- **Development Storage**: Local filesystem (`/public/uploads`)
- **Cache**: Upstash Redis KV (optional, graceful degradation if unavailable)

**State Management**:
- **Server State**: React Query (TanStack Query) + SWR
- **Form Validation**: Zod schemas

**Production Infrastructure**:
- **Hosting**: Hetzner Cloud Server (157.180.78.53)
- **Platform**: Coolify v4 (self-hosted PaaS)
- **Build System**: Nixpacks
- **Container**: Docker
- **Reverse Proxy**: Traefik (automatic HTTPS + Let's Encrypt SSL)

## Architecture Overview

### Directory Structure

```
/app                         # Next.js App Router
  /admin                    # Admin dashboard (protected by middleware.ts)
  /api                      # API routes
    /auth                   # NextAuth.js authentication endpoints
    /firmalar               # Company CRUD operations
    /upload                 # File upload handling
    /health                 # Health check and admin initialization
    /settings               # Application settings
  /components               # React components
    /ui                     # Reusable UI components
  /lib                      # Core utilities and business logic
    /validations            # Zod validation schemas
    /templates              # Card templates
    /hooks                  # React hooks
    /services               # Business logic services
    /utils                  # Utility functions
  /[slug]                   # Dynamic company card pages
  layout.tsx                # Root layout
  page.tsx                  # Home page

/prisma or /schema.prisma   # Database schema (note: in root, not /prisma)
/public                     # Static assets
/scripts                    # Utility scripts (health-check.js)
/docs                       # Documentation
/middleware.ts              # Route protection (admin authentication)
/next.config.js             # Next.js configuration
/tailwind.config.js         # Tailwind CSS configuration
/tsconfig.json              # TypeScript configuration
/nixpacks.toml              # Coolify/Nixpacks start command override
```

### Database Schema (Prisma)

**Core Tables**:
- `admins` - Admin users with bcrypt hashed passwords
- `firmalar` - Companies (slug, profile_photo, logo, catalog, view_count, template_id, gradient_color)
- `IletisimBilgisi` - Contact info (phone, email, WhatsApp, address, fax, website)
- `SosyalMedyaHesabi` - Social media accounts (Instagram, Facebook, Twitter, LinkedIn, YouTube, TikTok)
- `BankaHesabi` - Bank accounts with logo support
- `BankaHesapDetay` - IBAN details per bank (multi-currency: TRY, EUR, USD)

**Reference Tables**:
- `sektorler`, `kategoriler` - Business sectors and categories
- `iller`, `ilceler` - Cities and districts (location hierarchy)
- `Icon` - Icon priority configuration

**Key Relationships**:
- Each `firmalar` has multiple contact info, social media, and bank accounts (one-to-many with **CASCADE DELETE**)
- Location hierarchy: `iller` → `ilceler` → `firmalar`
- Bank accounts: `BankaHesabi` → `BankaHesapDetay` (one-to-many)

**Important Indexes**:
- `firmalar`: slug (unique), created_at, goruntulenme, onay, sektor_id, kategori_id
- All relation tables indexed by firma_id, aktif, sira

## Critical Architectural Patterns

### 1. Prisma Client Lazy Loading (⚠️ CRITICAL)

**Rule**: Never instantiate `PrismaClient` at module level in API routes or components.

```typescript
// ❌ WRONG - Module-level instantiation causes build errors
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ CORRECT - Use lazy-loading pattern
import { prisma } from '@/app/lib/db';
```

**Why**: Module-level PrismaClient instantiation causes build-time initialization errors. The lazy-loading pattern in `app/lib/db.ts` uses a Proxy to defer initialization until first use.

**Implementation** (`app/lib/db.ts`):
```typescript
// Uses Proxy pattern to lazily initialize PrismaClient on first access
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrismaClient();
    return client[prop as keyof PrismaClient];
  }
});
```

### 2. Database Query Patterns

Two query approaches are available:

**A. Prisma ORM** (app/lib/db.ts):
- Use for CRUD operations with type safety
- Import: `import { prisma } from '@/app/lib/db';`
- Automatic connection pooling and lazy initialization

**B. Direct PostgreSQL** (app/lib/direct-db.ts):
- Use for optimized complex queries
- Includes graceful error handling for build-time unavailability
- Returns empty data during build, full data at runtime

```typescript
// Example: Direct DB pattern with graceful degradation
export async function getAllFirmalar(search?: string, page = 1, limit = 1000) {
  try {
    const client = await getPool().connect();
    try {
      // ... query logic
      return { data, total, page, limit, totalPages };
    } finally {
      client.release();
    }
  } catch (error) {
    // Graceful degradation for build-time
    console.error('Database query error (possibly during build):', error);
    return { data: [], total: 0, page, limit, totalPages: 0 };
  }
}
```

**When to use which**:
- **Prisma**: Standard CRUD operations, type safety required, relationships needed
- **Direct DB**: Performance-critical queries, build-time compatibility required, complex SQL needed

### 3. File Upload Flow

**Upload Process**:
1. Parse multipart form data using `formidable`
2. Validate file (size <5MB, MIME type, dimensions for images)
3. **Production**: Upload to Cloudinary → return URL
4. **Development**: Save to `/public/uploads` → return local path
5. Update database with file URL

**File Upload Locations**:
- Profile photos: `profil_foto` field in `firmalar`
- Company logos: `firma_logo` field in `firmalar`
- Catalogs (PDF): `katalog` field in `firmalar`
- Bank logos: `banka_logo` field in `BankaHesabi`

**Validation Rules**:
- Max file size: 5MB
- Allowed image types: JPEG, PNG, WebP, SVG
- Allowed document types: PDF
- Dimension validation for images (if applicable)

### 4. Authentication & Authorization

**NextAuth Setup**:
- Session strategy: JWT tokens
- Credentials provider with bcrypt password hashing (10 rounds)
- Protected routes: `/admin/*` via `middleware.ts`

**Default Admin** (auto-created by `/api/health`):
- Username: `admin`
- Password: `admin123` ⚠️ **MUST change in production**

**Admin Protection Flow**:
```
User request → middleware.ts → NextAuth JWT validation
  ↓ Unauthorized                    ↓ Authorized
Redirect to /api/auth/signin   Allow access to /admin
```

**Route Protection** (middleware.ts):
- Uses `getToken()` from `next-auth/jwt`
- Checks for valid JWT token
- Redirects unauthenticated users to signin with `callbackUrl`

### 5. Cache Strategy

**Two-tier caching system** (Redis when available):
- `app/lib/cache.ts` - Cache abstraction layer
- Time-based TTL + tag-based invalidation
- Graceful degradation if Redis unavailable

**Cache Key Patterns**:
```typescript
firma:${slug}              // Single company
firmas:all                 // All companies list
firmas:page:${page}        // Paginated company list
settings:*                 // Application settings
```

**Cache Invalidation Examples**:
```typescript
import { cache } from '@/app/lib/cache';

// After updating a company
await cache.del(`firma:${slug}`);
await cache.del('firmas:all');

// After updating settings
await cache.del('settings:*');
```

**When to invalidate cache**:
- After creating, updating, or deleting companies
- After updating application settings
- After bulk operations affecting list views

### 6. Card Template System

**Template Configuration**:
- Multiple templates in `app/lib/templates/`
- Each company has `template_id` (default: 1)
- Gradient colors stored as CSV: `"#D4AF37,#F7E98E,#B8860B"`
- Templates support dynamic gradient rendering

**HTML Generation**:
- Static HTML pages generated for each company card
- Templates support Handlebars-like patterns
- Dynamic components loaded via `DynamicComponents-optimized.tsx`
- QR code generation for each company card

## Common Development Workflows

### Adding a New Feature

1. **Database Changes** (if needed):
   ```bash
   # Edit schema.prisma
   npx prisma db push        # Development
   npx prisma generate       # Regenerate Prisma Client
   ```

2. **Create Validation Schema**:
   - Add Zod schema to `app/lib/validations/`
   - Export from `app/lib/validations/index.ts`

3. **Create API Route**:
   ```typescript
   // app/api/your-feature/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   import { prisma } from '@/app/lib/db';
   import { yourSchema } from '@/app/lib/validations';
   import { errorResponse } from '@/app/lib/errors';

   export async function POST(request: NextRequest) {
     try {
       // 1. Parse request
       const body = await request.json();

       // 2. Validate with Zod
       const validated = yourSchema.parse(body);

       // 3. Execute business logic
       const result = await prisma.yourTable.create({
         data: validated,
       });

       // 4. Invalidate cache if needed
       await cache.del('your:cache:key');

       // 5. Return response
       return NextResponse.json(result, { status: 201 });
     } catch (error) {
       return errorResponse(error);
     }
   }
   ```

4. **Create UI Component**:
   - Add to `app/components/` or `app/admin/`
   - Use Tailwind CSS for styling
   - Follow existing component patterns

5. **Type Check**:
   ```bash
   npm run type-check
   ```

### Database Schema Changes

**Development** (schema changes):
```bash
# 1. Edit schema.prisma
# 2. Push changes to database
npx prisma db push
# 3. Regenerate Prisma Client
npx prisma generate
```

**Production** (migrations):
```bash
# Create migration
npx prisma migrate dev --name your_migration_name
# Deploy to production
npx prisma migrate deploy
```

### Working with Cache

```typescript
import { cache } from '@/app/lib/cache';

// Set cache with TTL (seconds)
await cache.set('key', value, 3600);

// Get cache
const value = await cache.get('key');

// Delete cache
await cache.del('key');

// Delete pattern
await cache.del('prefix:*');
```

**Common cache invalidation scenarios**:
- After creating/updating/deleting a company: `firma:${slug}`, `firmas:all`
- After updating company settings: `settings:*`
- After bulk operations: all related cache keys

## Production Deployment (Hetzner + Coolify)

### Required Environment Variables

**Critical** (must be set in Coolify):
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_SECRET="[64+ chars random string]"
NEXTAUTH_URL="https://your-domain.com"
NODE_ENV="production"
```

**Optional** (for full functionality):
```env
# Upstash Redis (caching)
KV_URL="rediss://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."

# Cloudinary (file storage)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Sentry (monitoring - optional)
SENTRY_DSN="..."
```

### Generate NEXTAUTH_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

### Build Configuration (Nixpacks)

Nixpacks auto-detects and builds with:
```yaml
phases:
  setup:
    nixPkgs: [nodejs_22, npm-9_x, openssl]
  install:
    cmds: ["npm ci"]
  build:
    cmds: ["npm run build"]  # Runs: prisma generate && next build
start:
  cmd: "next start"
```

**Build Script** (package.json):
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### Critical Build-Time Patterns

1. **Sitemap Generation**:
   - Must handle database unavailability during build
   - Returns empty array if DB unavailable
   - Populated dynamically at runtime

2. **Static Page Generation**:
   - Build succeeds even without database connection
   - Dynamic routes (`[slug]`) render at request time

3. **Environment Variable Access**:
   - All `process.env` variables must be defined in Coolify
   - Separate "Build-time" and "Runtime" variables in Coolify UI

### Deployment Checklist

- [ ] Set all required environment variables in Coolify
- [ ] Change default admin password (`admin`/`admin123`)
- [ ] Configure Redis for caching (optional but recommended)
- [ ] Set up Cloudinary for file storage in production
- [ ] Enable Sentry for error tracking (optional)
- [ ] Verify DNS records point to server IP (157.180.78.53)
- [ ] Confirm SSL certificate auto-generated by Traefik
- [ ] Test `/api/health` endpoint after deployment

### Health Monitoring

**Health Check Endpoint**:
```bash
curl https://dijitalkartvizitmerkezi.com/api/health

# Expected response:
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-01-02T12:00:00.000Z"
}
```

**Container Logs** (Coolify Dashboard):
- Application → Deployment → Latest → Logs
- Or via Docker CLI: `docker logs [container-id] -f`

## Security

### Security Features

**Application Security**:
- Rate limiting: 5 login attempts / 15 minutes (`app/lib/rateLimit.ts`)
- Input validation: Zod schemas in `app/lib/validations/`
- File upload: 5MB limit, MIME type validation, dimension checks
- SQL injection: Parameterized queries via Prisma
- XSS: React auto-escaping + DOMPurify for user content
- CSRF: NextAuth.js built-in CSRF protection

**Headers** (configured in next.config.js):
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy (restricts camera, microphone, geolocation, etc.)
- X-Powered-By header removed

**Authentication**:
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with secure secrets (64+ character random string)
- Session-based admin protection via middleware

**Production Security**:
- HTTPS enforced via Traefik
- SSL certificates auto-renewed via Let's Encrypt
- Database container on internal network only
- Environment secrets encrypted in Coolify

## Common Issues & Solutions

### Build-Time Issues

**Issue**: `@prisma/client did not initialize yet`
**Solution**: Never use module-level `new PrismaClient()`. Always import from `@/app/lib/db`.

**Issue**: `relation "firmalar" does not exist` during build
**Solution**: Already handled - database queries gracefully degrade during build, returning empty data.

**Issue**: TypeScript errors prevent build
**Solution**: Run `npm run type-check` locally first. Fix all TS errors before deploying.

### Runtime Issues

**Issue**: 502 Bad Gateway
**Solution**: Check container logs in Coolify. Verify environment variables are set. Restart container via Coolify dashboard.

**Issue**: Database connection error
**Solution**: Verify `DATABASE_URL` is correct. Check database container is running with `docker ps | grep postgres`.

**Issue**: File upload fails
**Solution**:
- Development: Check `/public/uploads` directory exists and is writable
- Production: Verify Cloudinary credentials (`CLOUDINARY_*` env vars) are set correctly

**Issue**: Cache errors
**Solution**: Redis is optional. App functions without it. Check Redis connection if performance degrades.

### Development Issues

**Issue**: `npm run dev` fails
**Solution**:
```bash
rm -rf node_modules package-lock.json .next
npm install
npx prisma generate
npm run dev
```

**Issue**: Prisma schema changes not reflecting
**Solution**:
```bash
npx prisma generate
npx prisma db push
# Restart dev server (Ctrl+C then npm run dev)
```

## Performance

### Next.js Configuration Optimizations

**Performance Features** (next.config.js):
- SWC minification enabled
- Image optimization: WebP/AVIF formats
- Bundle analyzer: `ANALYZE=true npm run build`
- Code splitting with dynamic imports
- Static asset caching (31536000s for static, 86400s for images)
- ETags generation
- Compression enabled

**Production Features**:
- `console.log` removal (keeps `error` and `warn`)
- React properties removal
- Package import optimization for @heroicons/react, lucide-react, react-icons

### Bundle Size

- Target: ~150KB optimized
- Use `ANALYZE=true npm run build` to analyze bundle
- Bundle analyzer runs at http://localhost:8888

## Key Files Reference

### Configuration Files
- `next.config.js` - Next.js configuration, security headers, performance optimizations
- `schema.prisma` - Database schema (⚠️ in root directory, not /prisma)
- `middleware.ts` - Route protection for /admin routes
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript strict mode configuration
- `nixpacks.toml` - Coolify/Nixpacks start command override

### Core Utilities
- `app/lib/db.ts` - Prisma client with lazy loading (⚠️ ALWAYS USE THIS)
- `app/lib/direct-db.ts` - Direct PostgreSQL queries with graceful degradation
- `app/lib/cache.ts` - Redis cache abstraction with fallback
- `app/lib/errors.ts` - Error handling utilities and custom error classes
- `app/lib/logger.ts` - Winston logging configuration
- `app/lib/rateLimit.ts` - Rate limiting middleware
- `app/lib/cloudinary.ts` - Cloudinary integration for file storage

### Validation
- `app/lib/validations/firma.schema.ts` - Company validation schemas
- `app/lib/validations/auth.schema.ts` - Authentication validation schemas
- `app/lib/validations/index.ts` - Export all schemas

### Generators
- `app/lib/vcardGenerator.ts` - vCard file generation (.vcf)
- `app/lib/qrCodeGenerator.ts` - QR code generation for company cards
- `app/lib/htmlGenerator.ts` - Static HTML generation for card templates

## Documentation

Additional documentation in `/docs`:
- `/docs/api/` - API endpoint documentation
- `/docs/architecture/` - System architecture details
- `/docs/deployment/` - Deployment guides and checklists
- `/docs/security/` - Security documentation
- `/docs/guides/` - Development guides

**Useful Documentation Files**:
- `DEPLOYMENT_READINESS_REPORT.md` - Production readiness assessment
- `security-report.md` - Security audit report
- `README.md` - Comprehensive project overview and deployment guide
