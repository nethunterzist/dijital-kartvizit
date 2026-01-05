# System Architecture Overview

This document provides a high-level overview of the Dijital Kartvizit platform architecture, tech stack, and key design decisions.

## System Architecture

### Architecture Type
**Layered (3-tier) Next.js 14 App Router Architecture**

```
┌─────────────────────────────────────────┐
│     Presentation Layer                   │
│  Pages, Components, UI (React/Tailwind)  │
└────────────────┬────────────────────────┘
                 │
┌─────────────────▼────────────────────────┐
│     API Layer                             │
│  Route Handlers, Validation, Services    │
└────────────────┬────────────────────────┘
                 │
┌─────────────────▼────────────────────────┐
│     Data Layer                            │
│  Prisma ORM, Direct DB, Cache            │
└─────────────────────────────────────────┘
                 │
┌─────────────────▼────────────────────────┐
│     Database Layer                        │
│  PostgreSQL (with Prisma migrations)     │
└─────────────────────────────────────────┘
```

## Tech Stack

### Core Technologies
- **Framework**: Next.js 14.0.4 (App Router)
- **Language**: TypeScript 5.9.3 (strict mode enabled)
- **Database**: PostgreSQL 14+ (via Prisma ORM 6.7.0)
- **Authentication**: NextAuth.js 4.24.11 (JWT strategy)
- **Styling**: Tailwind CSS 3.4.0

### File Storage & Caching
- **Production Storage**: Cloudinary 2.8.0 (images, PDFs)
- **Development Storage**: Local filesystem (`/public/uploads`)
- **Cache**: Upstash Redis KV via @vercel/kv 3.0.0 (optional, graceful degradation)

### State Management
- **Server State**: React Query (TanStack Query) 5.90.15 + SWR 2.3.8
- **Form Validation**: Zod 3.25.76
- **Client State**: React hooks (useState, useReducer)

### Production Infrastructure
- **Hosting**: Hetzner Cloud Server (157.180.78.53)
- **Platform**: Coolify v4 (self-hosted PaaS)
- **Build System**: Nixpacks 1.41.0
- **Container**: Docker
- **Reverse Proxy**: Traefik (automatic HTTPS + Let's Encrypt SSL)
- **Database**: PostgreSQL 14+ (Docker container)

### Key Dependencies
- **UI Components**: @headlessui/react, lucide-react, react-icons
- **File Handling**: formidable (multipart parsing), qrcode, vcards-js
- **Security**: bcrypt (password hashing), isomorphic-dompurify (XSS protection)
- **Logging**: winston 3.19.0
- **Rate Limiting**: rate-limiter-flexible 2.4.2

## Directory Structure

```
sanalkartvizitim/
├── app/                         # Next.js App Router
│   ├── admin/                  # Admin dashboard (protected by middleware)
│   ├── api/                    # API routes
│   │   ├── auth/               # NextAuth.js endpoints
│   │   ├── firmalar/           # Company CRUD
│   │   ├── upload/             # File upload
│   │   ├── health/             # Health check & init
│   │   └── ...                 # Other endpoints
│   ├── components/             # React components
│   │   └── ui/                 # Reusable UI components
│   ├── lib/                    # Core utilities
│   │   ├── validations/        # Zod schemas
│   │   ├── templates/          # Card templates (9 variants)
│   │   ├── services/           # Business logic services
│   │   ├── hooks/              # React hooks
│   │   └── utils/              # Utility functions
│   ├── [slug]/                 # Dynamic company card pages
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── schema.prisma               # Database schema (⚠️ root, not /prisma)
├── public/                     # Static assets
├── middleware.ts               # Route protection (admin auth)
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS config
├── tsconfig.json               # TypeScript config (strict mode)
└── nixpacks.toml               # Coolify build config
```

## Data Flow Architecture

### Standard Request Flow
```
User Request
    ↓
Next.js Middleware (auth check for /admin/*)
    ↓
Page/Component (Server Component by default)
    ↓
API Route Handler
    ↓
Zod Validation
    ↓
Service Layer (business logic)
    ↓
Data Layer (Prisma ORM or Direct DB)
    ↓
Cache Check (Vercel KV / in-memory)
    ↓
Database (PostgreSQL)
    ↓
Response (JSON or HTML)
```

### File Upload Flow
```
Client uploads file
    ↓
/api/upload (multipart form)
    ↓
Parse form data (formidable)
    ↓
Validate file (size, MIME type, dimensions)
    ↓
Environment check:
    ├─ Production → Upload to Cloudinary
    └─ Development → Save to /public/uploads
    ↓
Generate accessible URL
    ↓
Update database with URL
    ↓
Return success + URL
```

### Authentication Flow
```
POST /api/auth/signin
    ↓
NextAuth Credentials Provider
    ├─ Lookup user in admins table
    ├─ Compare password with bcrypt
    ├─ Generate JWT token (8-hour expiry)
    └─ Store in session
    ↓
Middleware (middleware.ts)
    ├─ Intercept /admin/* requests
    ├─ Extract JWT from NextAuth
    ├─ Verify token validity
    └─ Redirect if unauthorized → /login
```

## Component Architecture

### Page Structure
```
Root Layout
  ├─ AuthProvider (NextAuth)
  ├─ Navbar
  ├─ Dynamic Page Content
  │   ├─ Company Profile ([slug])
  │   ├─ Admin Dashboard (/admin)
  │   └─ Home Page (/)
  └─ Footer
```

### Component Patterns
- **Server Components by default** - Better performance and security
- **Client Components** (`'use client'`) - For interactivity
- **Dynamic imports** - Code splitting for better performance
- **Error boundaries** - Isolated error handling

## Design Patterns

See **[CRITICAL_PATTERNS.md](CRITICAL_PATTERNS.md)** for detailed implementation of:
1. Prisma Lazy-Loading (build-time resilience)
2. Graceful Degradation (database unavailability handling)
3. Two-Tier Caching (Redis + memory with fallback)
4. Service Registry (dependency injection)
5. Template Factory (9 card templates)

## Performance Characteristics

### Build Metrics
- Dependencies install: ~76 seconds (695 packages)
- Prisma generate: ~600ms
- Next.js build: ~119 seconds
- Docker image size: ~800MB
- Total deployment time: ~4 minutes

### Runtime Performance
- Container start time: <2 seconds
- First request: <500ms
- Subsequent requests: <100ms
- Memory usage: ~150MB (idle), ~300MB (peak)

### Bundle Optimization
- Target bundle size: ~150KB (optimized)
- SWC minification enabled
- Image optimization: WebP/AVIF formats
- Code splitting with dynamic imports
- Static asset caching (31536000s for static, 86400s for images)

## Security Architecture

### Application Security
- **Rate limiting**: 5 login attempts / 15 minutes
- **Input validation**: Zod schemas at API boundaries
- **File upload**: 5MB limit, MIME type validation, dimension checks
- **SQL injection**: Parameterized queries via Prisma
- **XSS**: React auto-escaping + DOMPurify for user content
- **CSRF**: NextAuth.js built-in CSRF protection

### Security Headers
Configured in next.config.js:
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy
- X-Powered-By removed

### Authentication
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with secure secrets (64+ character random string)
- Session-based admin protection via middleware

### Production Security
- HTTPS enforced via Traefik
- SSL certificates auto-renewed via Let's Encrypt
- Database container on internal network only
- Environment secrets encrypted in Coolify

## Deployment Architecture

### Production Environment
```
Internet
    ↓
Traefik (Reverse Proxy + SSL)
    ↓
Docker Network (coolify)
    ├─ Application Container (Next.js)
    ├─ Database Container (PostgreSQL)
    └─ Redis Container (Upstash KV)
```

### Build Process (Nixpacks)
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

### Environment Variables
**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - 64+ character secret
- `NEXTAUTH_URL` - Production domain
- `NODE_ENV` - "production"

**Optional:**
- `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` - Redis cache
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - File storage
- `SENTRY_DSN` - Error monitoring

## Scalability Considerations

### Current Scale
- Multi-tenant: Supports unlimited companies
- File storage: Cloudinary (unlimited with plan)
- Database: PostgreSQL (vertical scaling ready)
- Cache: Redis (horizontal scaling ready)

### Future Scaling Paths
- **Horizontal scaling**: Multiple Next.js instances behind load balancer
- **Database**: Read replicas for query scaling
- **Cache**: Redis cluster for distributed caching
- **CDN**: Cloudinary already provides global CDN
- **Search**: Elasticsearch for advanced search (if needed)

## Related Documentation

- **[CRITICAL_PATTERNS.md](CRITICAL_PATTERNS.md)** - Essential design patterns
- **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)** - Database schema reference
- **[SERVICES.md](SERVICES.md)** - Service layer documentation
- **[../api/ENDPOINTS.md](../api/ENDPOINTS.md)** - API reference
- **[../infrastructure/PRODUCTION.md](../infrastructure/PRODUCTION.md)** - Deployment guide

---

**Last Updated:** January 2026
**Live Site:** https://dijitalkartvizitmerkezi.com
