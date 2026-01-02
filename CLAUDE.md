# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern Next.js 14 digital business card (dijital kartvizit) platform using App Router, TypeScript, PostgreSQL with Prisma ORM, and NextAuth.js for authentication. The application enables companies to create professional digital business cards with QR codes, social media links, contact information, and bank account details.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Database operations
npx prisma generate        # Generate Prisma Client
npx prisma db push        # Push schema changes to database
npm run db:push           # Alias for prisma db push

# Code quality
npm run lint              # Run ESLint
npm run type-check        # TypeScript type checking (no emit)

# Health check
npm run health:check      # Run health check script
```


## Architecture Overview

### Application Structure
- **Next.js 14 App Router**: Modern routing with server/client components
- **Database Layer**: PostgreSQL + Prisma ORM with connection pooling
- **Authentication**: NextAuth.js with JWT tokens, protected admin routes via middleware
- **Caching**: Optional Upstash Redis KV for performance (cache.ts)
- **File Storage**: Cloudinary (production) or local filesystem (development)
- **State Management**: React Query (TanStack Query) + SWR for server state
- **Validation**: Zod schemas in `app/lib/validations/`
- **Error Tracking**: Sentry integration with Winston logger

### Key Directories

**`/app`** - Next.js App Router application
- `/admin` - Admin dashboard (protected by middleware.ts)
- `/api` - API routes (firmalar, auth, upload, health, etc.)
- `/components` - React components (UI, forms, templates)
- `/lib` - Core utilities and business logic
  - `/services` - Service layer (AuthService, FirmaService, FileUploadService, CacheInvalidationService)
  - `/validations` - Zod validation schemas
  - `/templates` - Card templates and rendering
  - `/hooks` - React hooks
- `/[slug]` - Dynamic company card pages

**`/prisma`** - Database schema and migrations

### Database Schema (Prisma)

**Core Models**:
- `admins` - Admin users (username, hashed password)
- `firmalar` - Companies (main entity with slug, profile, logo, catalog, view count)
- `IletisimBilgisi` - Contact information (phone, email, WhatsApp, address, fax, website)
- `SosyalMedyaHesabi` - Social media accounts (Instagram, Facebook, Twitter, LinkedIn, etc.)
- `BankaHesabi` - Bank accounts with logo support
- `BankaHesapDetay` - IBAN details per bank (multi-currency support)

**Reference Models**: `sektorler`, `kategoriler`, `iller`, `ilceler`, `Icon`

**Key Relationships**:
- Each `firmalar` has multiple contact info, social media, and bank accounts (one-to-many with cascade delete)
- Location hierarchy: `iller` → `ilceler` → `firmalar`
- Icon priorities tracked separately

### Service Layer Architecture

**Service Registry Pattern** (`ServiceRegistry.ts`):
- Centralized service management and dependency injection
- Services: `FirmaService`, `FileUploadService`, `CacheInvalidationService`, `PostProcessingService`, `ImageOptimizationService`

**Key Services**:
1. **FirmaService** - Company CRUD operations, view tracking, HTML generation
2. **FileUploadService** - Handles Cloudinary/local uploads with validation
3. **CacheInvalidationService** - Redis cache invalidation strategies
4. **PostProcessingService** - vCard, QR code, catalog processing
5. **ImageOptimizationService** - Image compression and optimization
6. **AuthService** - Authentication and password hashing

### Cache Strategy

**Two-tier caching** (when Redis available):
- `app/lib/cache.ts` - Cache abstraction layer
- Strategies: time-based TTL, tag-based invalidation
- Fallback: operates without Redis (graceful degradation)
- Key patterns: `firma:${slug}`, `firmas:all`, etc.

### File Upload Flow

1. Request → `FormDataParser.ts` extracts files
2. `FileUploadService.ts` validates (size, MIME type, dimensions)
3. **Production**: Upload to Cloudinary → return URL
4. **Development**: Save to `/public/uploads` → return local path
5. `ImageOptimizationService.ts` optimizes images
6. Update database with file URL

### Authentication Flow

**Admin Protection**:
1. `middleware.ts` intercepts `/admin/*` routes
2. NextAuth JWT token validation
3. Redirect to `/api/auth/signin` if unauthorized
4. Admin credentials stored in `admins` table (bcrypt hashed)

**Default Admin** (created by `/api/health`):
- Username: `admin`
- Password: `admin123` (MUST be changed in production)

### Card Rendering System

**Template Engine**:
- `app/lib/templates/` - Card templates with gradient support
- Dynamic component loading via `DynamicComponents-optimized.tsx`
- `PhonePreview.tsx` - Real-time preview component
- HTML generation for static card pages

## Important Technical Details

### Type Safety
- **Strict TypeScript mode enabled** in tsconfig.json and next.config.js
- No build allowed with TypeScript or ESLint errors in production
- Path aliases: `@/*` maps to project root

### Performance Optimizations
- **Bundle splitting**: React, UI, API, utilities separated (next.config.js)
- **Image optimization**: WebP/AVIF formats, responsive sizes
- **Code splitting**: Dynamic imports for large components
- **SWC minification**: Enabled for faster builds
- **Console removal**: Production builds remove console.log (keeps error/warn)

### Security Headers
All configured in `next.config.js`:
- CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- CORS configured for API routes
- Rate limiting on login (5 attempts / 15 minutes)


### Environment Variables
Required for operation (see `.env.example`):
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Min 64 chars, crypto-generated
- `NEXTAUTH_URL` - Application URL
- Optional: `KV_*` (Redis), `CLOUDINARY_*` (file storage), `SENTRY_DSN` (monitoring)

## Development Workflow

### Adding a New Feature
1. **Database**: Update `schema.prisma` → run `npx prisma db push`
2. **Validation**: Add Zod schema in `app/lib/validations/`
3. **Service**: Create/update service in `app/lib/services/`
4. **API Route**: Add endpoint in `app/api/`
5. **UI Component**: Add to `app/components/` or `app/admin/`
6. **Type Check**: Run `npm run type-check`

### Working with the Database
- Schema changes: Edit `schema.prisma` → `npx prisma db push` (dev) or migrations (production)
- Generate client after schema changes: `npx prisma generate`
- Direct DB access uses `pg` client in `app/lib/direct-db.ts` (for specific optimizations)
- Prisma client in `app/lib/db.ts` with singleton pattern

### Cache Invalidation
When updating data that's cached:
```typescript
import { CacheInvalidationService } from '@/app/lib/services/CacheInvalidationService';

// Invalidate specific patterns
await CacheInvalidationService.invalidateFirma(slug);
await CacheInvalidationService.invalidateFirmasList();
```

### Error Handling
- Use `app/lib/errors.ts` for custom error classes
- API responses: Use `errorResponse(message, status)` from errors.ts
- Frontend: `ErrorBoundary.tsx` component wraps error-prone sections
- Logging: Winston logger in `app/lib/logger.ts` (structured JSON logs)

## Production Deployment (Hetzner + Coolify)

### Build Process
```bash
# Production build (Coolify handles this automatically)
npm run build
```

### Coolify Configuration
- **Build Command**: `npm install && npx prisma generate && npm run build`
- **Start Command**: Defined in `nixpacks.toml` → `next start`
- **Port**: 3000 (configured in Coolify)
- **Health Check**: `/api/health` endpoint

### Deployment Checklist
1. ✅ Set all required environment variables in Coolify dashboard:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"`
   - `NEXTAUTH_URL` - Your domain URL
   - Optional: `KV_*` (Upstash Redis), `CLOUDINARY_*`, `SENTRY_DSN`
2. ✅ Change default admin password (username: `admin`, password: `admin123`)
3. ✅ Database migrations run automatically via Prisma
4. ✅ Configure Redis for caching (recommended but optional)
5. ✅ Set up Cloudinary for file storage
6. ✅ Enable Sentry for error tracking (optional)
7. ✅ `NODE_ENV=production` set automatically by Coolify

### Important Files for Coolify
- **`nixpacks.toml`**: Defines start command (`next start`)
- **`nginx.conf`**: Nginx reverse proxy configuration (if using)
- **`.env.example`**: Template for environment variables
- **`next.config.js`**: Production optimizations (standalone mode DISABLED for Coolify)

### Health Monitoring
- **Health endpoint**: `GET /api/health` (checks DB, creates default admin)
- **Logging**: Structured logs via Winston to console/files
- **Coolify Dashboard**: Monitor deployments, logs, and metrics

## Common Patterns

### API Route Structure
```typescript
import { withRateLimit } from '@/app/lib/rateLimit';
import { firmalarSchema } from '@/app/lib/validations';

export async function POST(request: Request) {
  // 1. Rate limiting
  await withRateLimit(request);

  // 2. Validation
  const body = await request.json();
  const validated = firmalarSchema.parse(body);

  // 3. Business logic via service
  const result = await FirmaService.create(validated);

  // 4. Cache invalidation
  await CacheInvalidationService.invalidateFirmasList();

  // 5. Response
  return NextResponse.json(result);
}
```

### Component with Data Fetching
```typescript
'use client'; // For client components
import useSWR from 'swr';

export function MyComponent() {
  const { data, error, mutate } = useSWR('/api/endpoint', fetcher);
  // ... component logic
}
```

### Form with Validation
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { firmalarSchema } from '@/app/lib/validations';

const form = useForm({
  resolver: zodResolver(firmalarSchema),
});
```

## Additional Notes

- Production-ready configuration with optimized security headers
- TypeScript strict mode enabled for type safety
- Redis caching is optional but recommended for production
- File uploads use Cloudinary in production, local storage in development
