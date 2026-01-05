# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Dijital Kartvizit** - Next.js 14 digital business card platform

Companies create professional digital business cards with QR codes, social media links, contact information, and bank account details.

**Live Site**: https://dijitalkartvizitmerkezi.com

**Tech Stack**: Next.js 14 (App Router), TypeScript, PostgreSQL, Prisma ORM, NextAuth.js, Tailwind CSS

**Infrastructure**: Hetzner Cloud + Coolify v4 + Docker + Traefik (auto-SSL)

---

## Quick Start

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run type-check       # TypeScript validation
npm run build            # Production build

# Database
npx prisma generate      # Generate Prisma Client after schema changes
npx prisma db push       # Push schema to database
npm run db:push          # Alias for prisma db push

# Health check
npm run health:check     # Run health check script
```

**Admin Login** (change password after first deployment!):
- URL: http://localhost:3000/admin
- Username: `admin`
- Password: `admin123` ⚠️

---

## Project Structure

```
/app
  /admin               # Admin dashboard (protected by middleware.ts)
  /api                 # API routes
  /components          # React components
  /lib                 # Core utilities and business logic
    /validations       # Zod validation schemas
    /templates         # Card templates (9 templates)
    /services          # Business logic services
  /[slug]              # Dynamic company card pages

/docs                  # 📚 Complete Documentation
  /api                 # API documentation
  /architecture        # Architecture guides
  /development         # Development guides
  /infrastructure      # Production deployment

/schema.prisma         # ⚠️ Database schema (in root, not /prisma)
/middleware.ts         # Route protection
```

**📚 Complete Documentation**: See [`docs/README.md`](docs/README.md) for comprehensive guides

---

## Critical Patterns ⚠️

### 1. Prisma Client Lazy Loading (CRITICAL)

**Rule**: Never use module-level `new PrismaClient()`

```typescript
// ❌ WRONG - Causes build errors
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ CORRECT - Use lazy-loading pattern
import { prisma } from '@/app/lib/db';
```

**Why**: Module-level instantiation causes build-time errors. The `app/lib/db.ts` pattern uses a Proxy for lazy initialization.

**Details**: See [CRITICAL_PATTERNS.md](docs/architecture/CRITICAL_PATTERNS.md#pattern-1-prisma-lazy-loading)

### 2. Database Schema Location

⚠️ Schema is at `schema.prisma` in project root, NOT in `/prisma` directory

```bash
# After schema changes
npx prisma generate
npx prisma db push
```

### 3. Graceful Database Degradation

Build succeeds even without database connection. Functions return empty data during build, populate at runtime.

**Details**: See [CRITICAL_PATTERNS.md](docs/architecture/CRITICAL_PATTERNS.md#pattern-2-graceful-database-degradation)

---

## Database Overview

**17 Tables** organized in 4 groups:

**Core Tables**:
- `firmalar` - Companies (slug, logos, catalog, template_id, gradient_color)
- `IletisimBilgisi` - Contact info (phone, email, WhatsApp, address)
- `SosyalMedyaHesabi` - Social media accounts (6 platforms)
- `BankaHesabi` - Bank accounts with logos
- `BankaHesapDetay` - IBAN details (multi-currency: TRY, EUR, USD)

**Reference Tables**: `sektorler`, `kategoriler`, `iller`, `ilceler`, `Icon`

**Admin Tables**: `admins`, `AdminPasswordHistory`

**Site Tables**: `SiteSettings`, `packages`, `PackageInquiry`, `Faq`, `Testimonial`, `SliderImage`

**Key Relationships**: All foreign keys use **CASCADE DELETE**. See [DATABASE_SCHEMA.md](docs/architecture/DATABASE_SCHEMA.md)

---

## API Routes

**20+ Endpoints** organized by resource:

```
/api/auth/*            # Authentication (NextAuth.js)
/api/firmalar          # Company CRUD operations
/api/upload            # File upload handling
/api/health            # Health check + admin initialization
/api/settings          # Application settings
```

**Authentication**: JWT-based with NextAuth.js, protected routes via `middleware.ts`

**Validation**: All inputs validated with Zod schemas in `app/lib/validations/`

**Error Handling**: Custom error classes with consistent JSON responses

**Details**: See [ENDPOINTS.md](docs/api/ENDPOINTS.md) and [VALIDATION.md](docs/api/VALIDATION.md)

---

## Development Workflows

### Adding a New Feature

1. **Database Changes** (if needed):
   ```bash
   # Edit schema.prisma → npx prisma db push → npx prisma generate
   ```

2. **Create Validation**: Add Zod schema to `app/lib/validations/`

3. **Create API Route**: Use pattern from [ENDPOINTS.md](docs/api/ENDPOINTS.md)

4. **Create UI Component**: Use Tailwind CSS, follow existing patterns

5. **Type Check**: `npm run type-check`

**Complete Workflow**: See [WORKFLOWS.md](docs/development/WORKFLOWS.md)

---

## Production Deployment

**Infrastructure**: Hetzner Cloud Server + Coolify v4 + Docker

**Required Environment Variables**:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_SECRET="[64+ chars random]"  # Generate: node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
NEXTAUTH_URL="https://your-domain.com"
NODE_ENV="production"
```

**Optional** (for full functionality):
```env
# Cache (Upstash Redis)
KV_URL="..."
KV_REST_API_URL="..."
KV_REST_API_TOKEN="..."

# File Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

**Deployment Process**: Coolify auto-builds with Nixpacks (~4 minute deployment)

**Complete Guide**: See [PRODUCTION.md](docs/infrastructure/PRODUCTION.md)

**Monitoring**: See [MONITORING.md](docs/infrastructure/MONITORING.md)

---

## Security

**Application Security**:
- Rate limiting: 5 login attempts / 15 minutes
- Input validation: Zod schemas
- File upload: 5MB limit, MIME type validation
- SQL injection: Parameterized queries via Prisma
- XSS: React auto-escaping + DOMPurify
- CSRF: NextAuth.js built-in protection

**Headers**: CSP, HSTS, X-Frame-Options, X-Content-Type-Options (configured in next.config.js)

**Production**: HTTPS enforced, SSL auto-renewed, database on internal network

---

## Common Issues

### Build-Time Issues

**Issue**: `@prisma/client did not initialize yet`
**Solution**: Always import from `app/lib/db`, never use module-level `new PrismaClient()`

**Issue**: `relation "firmalar" does not exist` during build
**Solution**: Already handled with graceful degradation

**Issue**: TypeScript errors prevent build
**Solution**: `npm run type-check` locally first

### Runtime Issues

**Issue**: 502 Bad Gateway
**Solution**: Check Coolify logs, verify env vars, restart container

**Issue**: Database connection error
**Solution**: Verify `DATABASE_URL`, check database container status

**Issue**: File upload fails
**Solution**:
- Development: Verify `/public/uploads` exists
- Production: Check Cloudinary credentials

**Complete Troubleshooting**: See [TROUBLESHOOTING.md](docs/development/TROUBLESHOOTING.md)

---

## Documentation Hub

**📚 Complete Documentation**: [`docs/README.md`](docs/README.md)

**Quick Links by Role**:

**For Developers**:
- [Setup Guide](docs/development/SETUP.md) - Local environment setup
- [Commands Reference](docs/development/COMMANDS.md) - All npm scripts
- [Development Workflows](docs/development/WORKFLOWS.md) - Common workflows
- [Troubleshooting](docs/development/TROUBLESHOOTING.md) - Common issues

**For Architects**:
- [Architecture Overview](docs/architecture/OVERVIEW.md) - System architecture
- [Critical Patterns](docs/architecture/CRITICAL_PATTERNS.md) - Important patterns
- [Database Schema](docs/architecture/DATABASE_SCHEMA.md) - Complete schema reference
- [Services](docs/architecture/SERVICES.md) - Business logic services

**For API Consumers**:
- [API Endpoints](docs/api/ENDPOINTS.md) - Complete API reference
- [Validation Schemas](docs/api/VALIDATION.md) - Zod schemas
- [Error Handling](docs/api/ERROR_HANDLING.md) - Error response formats

**For DevOps**:
- [Production Deployment](docs/infrastructure/PRODUCTION.md) - Hetzner + Coolify guide
- [Monitoring & Health](docs/infrastructure/MONITORING.md) - Observability guide
- [Production Snapshot](docs/infrastructure/PRODUCTION_SNAPSHOT.md) - Current live state (Jan 5, 2026)
- [Server Deep Dive](docs/infrastructure/SERVER_DEEP_DIVE.md) - SSH technical analysis & security audit (Jan 5, 2026)

---

## Key Files Reference

**Configuration**:
- `next.config.js` - Next.js config, security headers
- `schema.prisma` - Database schema (⚠️ in root)
- `middleware.ts` - Route protection
- `tailwind.config.js` - Tailwind config

**Core Utilities**:
- `app/lib/db.ts` - Prisma client (⚠️ ALWAYS USE THIS)
- `app/lib/direct-db.ts` - Direct PostgreSQL queries
- `app/lib/cache.ts` - Redis cache abstraction
- `app/lib/errors.ts` - Error handling utilities
- `app/lib/validations/` - Zod validation schemas

---

**Last Updated**: January 2026
**Version**: 1.0
**Documentation**: [`docs/README.md`](docs/README.md)
