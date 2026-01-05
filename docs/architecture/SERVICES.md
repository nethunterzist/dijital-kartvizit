# Service Layer Documentation

This document describes the service layer architecture - business logic services that encapsulate complex operations and provide reusable abstractions.

## Service Architecture

The application uses a **Service-Oriented Architecture** with:
- **Service Registry** for dependency injection
- **Interface-based design** for abstraction
- **Environment-aware implementations** (development vs production)
- **Single Responsibility Principle** - one service, one purpose

---

## Service Registry

Central registry for managing service dependencies.

**Location:** `app/lib/services/ServiceRegistry.ts`

```typescript
class ServiceRegistry {
  private services: Map<string, any> = new Map();

  register<T>(key: new (...args: any[]) => T, instance: T): void {
    this.services.set(key.name, instance);
  }

  getService<T>(key: new (...args: any[]) => T): T {
    const service = this.services.get(key.name);
    if (!service) {
      throw new Error(`Service ${key.name} not registered`);
    }
    return service as T;
  }
}

export const serviceRegistry = new ServiceRegistry();
```

**Usage:**
```typescript
// Register (usually in initialization)
serviceRegistry.register(FileUploadService, new LocalFileUploadService());

// Retrieve
const uploadService = serviceRegistry.getService(FileUploadService);
```

---

## File Upload Services

### FileUploadService (Abstract Interface)

Base interface for file upload implementations.

**Location:** `app/lib/services/FileUploadService.ts`

```typescript
export interface UploadResult {
  url: string;
  publicId?: string;
  format?: string;
  size?: number;
}

export abstract class FileUploadService {
  abstract upload(
    file: File | Buffer,
    options?: UploadOptions
  ): Promise<UploadResult>;

  abstract delete(publicId: string): Promise<void>;
}
```

**Methods:**
- `upload()` - Upload file to storage
- `delete()` - Delete file from storage

---

### LocalFileUploadService

Development implementation - stores files locally.

**Location:** `app/lib/services/LocalFileUploadService.ts`

**Storage Location:** `/public/uploads/`

**Features:**
- Saves files to local filesystem
- Generates accessible URLs
- Creates upload directory if missing
- No cleanup (development only)

**Usage:**
```typescript
const service = new LocalFileUploadService();
const result = await service.upload(file, {
  folder: 'logos',
  transformation: { width: 500, height: 500 }
});
// Returns: { url: '/uploads/logos/filename.jpg' }
```

**Configuration:**
- Auto-registered in development
- No environment variables needed

---

### CloudinaryUploadService (Not Implemented Yet)

Production implementation for Cloudinary cloud storage.

**Expected Features:**
- Upload to Cloudinary CDN
- Automatic optimization
- Transform images (resize, crop, format)
- Secure signed URLs

**Environment Variables:**
```env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**Current Workaround:**
Cloudinary integration is handled directly in `app/lib/cloudinary.ts` until service implementation is complete.

---

## Image Optimization Service

Handles image processing and optimization.

**Location:** `app/lib/services/ImageOptimizationService.ts`

**Features:**
- Resize images to target dimensions
- Convert formats (JPEG, PNG, WebP)
- Compress images
- Maintain aspect ratio
- Generate thumbnails

**Methods:**
```typescript
class ImageOptimizationService {
  async optimize(image: Buffer, options: OptimizeOptions): Promise<Buffer>
  async resize(image: Buffer, width: number, height: number): Promise<Buffer>
  async thumbnail(image: Buffer, size: number): Promise<Buffer>
}
```

**Usage:**
```typescript
const service = serviceRegistry.getService(ImageOptimizationService);
const optimized = await service.optimize(imageBuffer, {
  width: 800,
  quality: 85,
  format: 'webp'
});
```

---

## Authentication Service

Handles authentication logic.

**Location:** `app/lib/services/AuthService.ts`

**Methods:**
```typescript
class AuthService {
  async login(username: string, password: string): Promise<AuthResult>
  async hashPassword(password: string): Promise<string>
  async verifyPassword(password: string, hash: string): Promise<boolean>
  async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void>
}
```

**Features:**
- Bcrypt password hashing (10 rounds)
- Password verification
- Rate limiting integration
- Password history tracking

**Security:**
- Passwords never stored in plain text
- Bcrypt automatically handles salting
- Timing-safe password comparison

**Usage:**
```typescript
const authService = serviceRegistry.getService(AuthService);

// Login
const result = await authService.login('admin', 'password123');

// Change password
await authService.changePassword(adminId, 'old', 'new');
```

---

## Firma Service

Business logic for company (firma) operations.

**Location:** `app/lib/services/FirmaService.ts`

**Methods:**
```typescript
class FirmaService {
  async create(data: FirmaCreateData): Promise<Firma>
  async update(id: number, data: FirmaUpdateData): Promise<Firma>
  async delete(id: number): Promise<void>
  async getBySlug(slug: string): Promise<Firma | null>
  async incrementViewCount(slug: string): Promise<void>
  async generateVCard(firma: Firma): Promise<string>
  async generateQRCode(firma: Firma): Promise<string>
}
```

**Features:**
- CRUD operations with validation
- Automatic cache invalidation
- vCard generation
- QR code generation
- View count tracking
- Related data management (contacts, social media, bank accounts)

**Cache Integration:**
```typescript
async getBySlug(slug: string): Promise<Firma | null> {
  // Try cache first
  const cached = await cache.get(`firma:slug:${slug}`);
  if (cached) return cached;

  // Query database
  const firma = await prisma.firmalar.findUnique({
    where: { slug },
    include: { /* all relations */ }
  });

  // Cache result
  await cache.set(`firma:slug:${slug}`, firma, 'medium');
  return firma;
}
```

**Usage:**
```typescript
const firmaService = serviceRegistry.getService(FirmaService);

// Get company by slug
const firma = await firmaService.getBySlug('example-corp');

// Increment view count
await firmaService.incrementViewCount('example-corp');

// Generate vCard
const vcardContent = await firmaService.generateVCard(firma);
```

---

## Form Data Parser Service

Parses multipart form data for file uploads.

**Location:** `app/lib/services/FormDataParser.ts`

**Features:**
- Parse multipart/form-data requests
- Extract files and fields
- Validate file sizes and types
- Handle multiple files
- Stream large files

**Methods:**
```typescript
class FormDataParser {
  async parse(request: NextRequest): Promise<ParseResult>
  validateFile(file: File, options: ValidationOptions): boolean
}
```

**Usage:**
```typescript
const parser = serviceRegistry.getService(FormDataParser);
const { fields, files } = await parser.parse(request);

// Validate file
if (!parser.validateFile(files.logo, {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png']
})) {
  throw new ValidationError('Invalid file');
}
```

**Validation Options:**
- `maxSize` - Maximum file size in bytes
- `allowedTypes` - Array of allowed MIME types
- `maxWidth` - Maximum image width
- `maxHeight` - Maximum image height

---

## Cache Invalidation Service

Manages cache invalidation strategies.

**Location:** `app/lib/services/CacheInvalidationService.ts`

**Methods:**
```typescript
class CacheInvalidationService {
  async invalidateFirma(id: number): Promise<void>
  async invalidateFirmaList(): Promise<void>
  async invalidateSettings(): Promise<void>
  async invalidateAll(): Promise<void>
}
```

**Invalidation Strategies:**

**After Firma CREATE:**
```typescript
await cacheService.invalidateFirmaList(); // Clear list cache
await cache.invalidate('firmalar:count'); // Update count
```

**After Firma UPDATE:**
```typescript
await cacheService.invalidateFirma(id); // Clear specific item
await cacheService.invalidateFirmaList(); // Clear list cache
```

**After Firma DELETE:**
```typescript
await cacheService.invalidateFirma(id);
await cache.invalidate('firmalar:*'); // Clear all firma caches
```

---

## Post-Processing Service

Handles post-creation processing tasks.

**Location:** `app/lib/services/PostProcessingService.ts`

**Methods:**
```typescript
class PostProcessingService {
  async processNewFirma(firma: Firma): Promise<void>
  async regenerateStaticAssets(firma: Firma): Promise<void>
  async updateSearchIndex(firma: Firma): Promise<void>
}
```

**Features:**
- Generate static HTML for company card
- Create/update vCard file
- Generate QR code
- Update search indexes
- Send notifications (if configured)

**Usage:**
```typescript
const postProcessing = serviceRegistry.getService(PostProcessingService);

// After creating a company
await postProcessing.processNewFirma(firma);
```

---

## Service Initialization

Services are registered during application startup.

**Location:** `app/lib/services/index.ts` (initialization)

```typescript
import { serviceRegistry } from './ServiceRegistry';
import { LocalFileUploadService } from './LocalFileUploadService';
import { ImageOptimizationService } from './ImageOptimizationService';
import { AuthService } from './AuthService';
import { FirmaService } from './FirmaService';
// ... other services

// Register services based on environment
function initializeServices() {
  // File upload (environment-aware)
  if (process.env.NODE_ENV === 'production' && hasCloudinaryCredentials()) {
    serviceRegistry.register(FileUploadService, new CloudinaryUploadService());
  } else {
    serviceRegistry.register(FileUploadService, new LocalFileUploadService());
  }

  // Image optimization
  serviceRegistry.register(ImageOptimizationService, new ImageOptimizationService());

  // Authentication
  serviceRegistry.register(AuthService, new AuthService());

  // Business logic
  serviceRegistry.register(FirmaService, new FirmaService());
  serviceRegistry.register(FormDataParser, new FormDataParser());
  serviceRegistry.register(CacheInvalidationService, new CacheInvalidationService());
  serviceRegistry.register(PostProcessingService, new PostProcessingService());
}

// Initialize on module load
initializeServices();
```

---

## Service Usage Patterns

### In API Routes

```typescript
import { serviceRegistry } from '@/app/lib/services/ServiceRegistry';
import { FirmaService } from '@/app/lib/services/FirmaService';

export async function GET(request: NextRequest) {
  const service = serviceRegistry.getService(FirmaService);
  const firma = await service.getBySlug(slug);
  return NextResponse.json(firma);
}
```

### In Server Components

```typescript
import { serviceRegistry } from '@/app/lib/services/ServiceRegistry';
import { FirmaService } from '@/app/lib/services/FirmaService';

export default async function FirmaPage({ params }: { params: { slug: string } }) {
  const service = serviceRegistry.getService(FirmaService);
  const firma = await service.getBySlug(params.slug);

  return <div>{firma.firma_adi}</div>;
}
```

### In Background Jobs

```typescript
// Scheduled task to regenerate static assets
async function regenerateAllAssets() {
  const firmaService = serviceRegistry.getService(FirmaService);
  const postProcessing = serviceRegistry.getService(PostProcessingService);

  const allFirmas = await firmaService.getAll();

  for (const firma of allFirmas) {
    await postProcessing.regenerateStaticAssets(firma);
  }
}
```

---

## Testing Services

### Mocking Services in Tests

```typescript
import { serviceRegistry } from '@/app/lib/services/ServiceRegistry';

// Mock upload service for tests
class MockFileUploadService extends FileUploadService {
  async upload(file: File): Promise<UploadResult> {
    return {
      url: '/mock/upload/path.jpg',
      publicId: 'mock-id'
    };
  }

  async delete(publicId: string): Promise<void> {
    // No-op in tests
  }
}

// Replace service in tests
beforeEach(() => {
  serviceRegistry.register(FileUploadService, new MockFileUploadService());
});
```

---

## Service Best Practices

### 1. Single Responsibility
Each service should have one clear purpose:
- ✅ `FirmaService` - Firma business logic
- ❌ `DataService` - Too generic

### 2. Interface-Based Design
Define interfaces for all services:
```typescript
export abstract class FirmaService {
  abstract getBySlug(slug: string): Promise<Firma | null>;
  // ... other methods
}
```

### 3. Dependency Injection
Use service registry instead of direct instantiation:
```typescript
// ✅ Good
const service = serviceRegistry.getService(FirmaService);

// ❌ Bad
const service = new FirmaService();
```

### 4. Error Handling
Services should throw custom errors:
```typescript
async getBySlug(slug: string): Promise<Firma> {
  const firma = await prisma.firmalar.findUnique({ where: { slug } });

  if (!firma) {
    throw new NotFoundError('Firma');
  }

  return firma;
}
```

### 5. Cache Integration
Services should handle caching transparently:
```typescript
async get(id: number): Promise<Firma> {
  const cached = await cache.get(`firma:${id}`);
  if (cached) return cached;

  const firma = await this.fetchFromDB(id);
  await cache.set(`firma:${id}`, firma, 'medium');

  return firma;
}
```

---

## Future Service Additions

### Planned Services
1. **EmailService** - Email sending and templates
2. **NotificationService** - Multi-channel notifications
3. **SearchService** - Full-text search with Elasticsearch
4. **AnalyticsService** - View tracking and analytics
5. **ExportService** - Data export (CSV, PDF, Excel)
6. **BackupService** - Automated backups
7. **QueueService** - Background job processing

---

## Related Documentation

- **[OVERVIEW.md](OVERVIEW.md)** - System architecture
- **[CRITICAL_PATTERNS.md](CRITICAL_PATTERNS.md)** - Service registry pattern
- **[../api/ENDPOINTS.md](../api/ENDPOINTS.md)** - API that uses services
- **[../development/WORKFLOWS.md](../development/WORKFLOWS.md)** - Using services in development

---

**Last Updated:** January 2026
**Service Count:** 8+ active services
**Pattern:** Service-Oriented Architecture with Dependency Injection
