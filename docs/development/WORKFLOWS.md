# Development Workflows

Common development workflows and best practices for the Dijital Kartvizit project.

---

## Adding a New Feature

### 1. Database Changes (if needed)

If feature requires database changes:

```bash
# 1. Edit schema.prisma
code schema.prisma

# 2. Push changes to database
npx prisma db push

# 3. Regenerate Prisma Client
npx prisma generate

# 4. Verify in Prisma Studio
npx prisma studio
```

### 2. Create Validation Schema

```typescript
// app/lib/validations/your-feature.schema.ts
import { z } from 'zod';

export const yourFeatureSchema = z.object({
  field: z.string().min(2).max(100),
  // ... more fields
});

// Export from index
// app/lib/validations/index.ts
export { yourFeatureSchema } from './your-feature.schema';
```

### 3. Create API Route

```typescript
// app/api/your-feature/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { yourFeatureSchema } from '@/app/lib/validations';
import { errorResponse } from '@/app/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = yourFeatureSchema.parse(body);

    const result = await prisma.yourModel.create({
      data: validated
    });

    // Invalidate cache if needed
    await cache.invalidate('your:cache:key');

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
```

### 4. Create UI Component

```typescript
// app/components/YourFeature.tsx
'use client'; // If client component needed

export function YourFeature() {
  // Component logic
  return <div>Your Feature</div>;
}
```

### 5. Type Check

```bash
npm run type-check
```

---

## Modifying Database Schema

### Development Flow

```bash
# 1. Edit schema.prisma
# Add/modify model fields

# 2. Push to database
npx prisma db push

# 3. Regenerate Client
npx prisma generate

# 4. Update code using the changed model

# 5. Test changes
npm run dev
```

### Production Flow

```bash
# 1. Edit schema.prisma

# 2. Create migration
npx prisma migrate dev --name descriptive_migration_name

# 3. Test migration
npx prisma migrate status

# 4. Deploy to production (via Coolify)
git push origin main
# Coolify runs: npx prisma migrate deploy
```

---

## Working with Cache

### Setting Cache

```typescript
import { cache } from '@/app/lib/cache';

// Set with TTL
await cache.set('key', value, 'medium'); // 30 minutes

// TTL options: 'short' (5min), 'medium' (30min), 'long' (1hr), 'veryLong' (24hr)
```

### Invalidating Cache

```typescript
// Single key
await cache.del('firma:123');

// Pattern-based
await cache.invalidate('firmalar:list:*');

// After mutations
async function updateFirma(id: number, data: any) {
  const firma = await prisma.firmalar.update({
    where: { id },
    data
  });

  // Invalidate caches
  await cache.del(`firma:${id}`);
  await cache.invalidate('firmalar:list:*');

  return firma;
}
```

---

## File Upload Workflow

### 1. Create Upload Form

```typescript
<form action="/api/upload" method="POST" encType="multipart/form-data">
  <input type="file" name="file" accept="image/*" />
  <input type="hidden" name="type" value="logo" />
  <button type="submit">Upload</button>
</form>
```

### 2. Handle Upload in API

```typescript
// Uses existing /api/upload endpoint
// Automatically handles Cloudinary (prod) or local (dev)
```

### 3. Save URL to Database

```typescript
await prisma.firmalar.update({
  where: { id },
  data: { firma_logo: uploadedUrl }
});
```

---

## Adding a New Template

### 1. Create Template Class

```typescript
// app/lib/templates/template10-name.ts
import { TemplateBase } from './template-base';

export class Template10Name extends TemplateBase {
  id = 10;
  name = 'Your Template Name';

  generateHTML(data: FirmaData): string {
    return `
      <div class="template-10">
        <!-- Your HTML template -->
      </div>
    `;
  }

  generateCSS(): string {
    return `
      .template-10 {
        /* Your CSS */
      }
    `;
  }
}
```

### 2. Register Template

```typescript
// app/lib/templates/templateRegistry.ts
import { Template10Name } from './template10-name';

templateRegistry.set(10, new Template10Name());
```

### 3. Update Schema

```typescript
// Update validation to allow template_id = 10
template_id: z.number().int().min(1).max(10)
```

---

## Testing Workflow

### Writing Tests

```typescript
// __tests__/api/firmalar.test.ts
import { POST } from '@/app/api/firmalar/route';

describe('POST /api/firmalar', () => {
  it('creates a new firma', async () => {
    const request = new Request('http://localhost/api/firmalar', {
      method: 'POST',
      body: JSON.stringify({
        firma_adi: 'Test Corp',
        slug: 'test-corp'
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(201);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

---

## Git Workflow

### Feature Development

```bash
# 1. Create branch
git checkout -b feature/new-feature

# 2. Make changes
git add .
git commit -m "feat: add new feature"

# 3. Push to remote
git push origin feature/new-feature

# 4. Create PR (if using GitHub)
# 5. After review, merge to main
```

### Commit Message Format

```
type(scope): subject

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Examples:
feat(api): add package inquiry endpoint
fix(upload): handle large file uploads
docs(readme): update setup instructions
```

---

## Deployment Workflow

### Local Testing Before Deploy

```bash
# 1. Type check
npm run type-check

# 2. Build
npm run build

# 3. Test production build
npm start

# 4. Verify at http://localhost:3000
```

### Deploy to Production

```bash
# 1. Commit changes
git add .
git commit -m "your message"

# 2. Push to main
git push origin main

# 3. Coolify auto-deploys
# Monitor at https://coolify-dashboard-url

# 4. Verify deployment
curl https://dijitalkartvizitmerkezi.com/api/health
```

---

## Debugging Workflow

### Server-Side Debugging

```typescript
// Add console.log in API route
console.log('Request data:', requestData);

// Check server terminal for output
```

### Database Debugging

```bash
# Open Prisma Studio
npx prisma studio

# Or use psql
psql $DATABASE_URL

# Check query logs
# Set in schema.prisma:
# log: ['query', 'error', 'warn']
```

### Client-Side Debugging

```typescript
// React DevTools
// Network tab in browser DevTools
// Console logs
```

---

## Performance Optimization Workflow

### 1. Identify Bottleneck

```bash
# Bundle analysis
ANALYZE=true npm run build

# Lighthouse audit
npx lighthouse http://localhost:3000 --view
```

### 2. Apply Optimizations

- Implement caching
- Optimize images (WebP, proper sizing)
- Code splitting with dynamic imports
- Reduce bundle size

### 3. Measure Impact

```bash
# Compare before/after build sizes
npm run build

# Check performance metrics
# Use Chrome DevTools Performance tab
```

---

## Related Documentation

- **[SETUP.md](SETUP.md)** - Initial setup
- **[COMMANDS.md](COMMANDS.md)** - Command reference
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues
- **[../architecture/CRITICAL_PATTERNS.md](../architecture/CRITICAL_PATTERNS.md)** - Important patterns

---

**Last Updated:** January 2026
