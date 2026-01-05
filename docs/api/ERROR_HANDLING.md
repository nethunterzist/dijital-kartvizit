# Error Handling Guide

Complete guide to error handling patterns, custom error classes, and error response formats in the Dijital Kartvizit platform.

---

## Error Response Format

All API errors follow a consistent JSON structure:

```json
{
  "error": {
    "message": "Human-readable error description",
    "code": "ERROR_CODE",
    "statusCode": 400,
    "details": {}  // Optional: additional error context
  }
}
```

**Fields:**
- `message` - User-friendly error description
- `code` - Machine-readable error code for client handling
- `statusCode` - HTTP status code (also in response status)
- `details` - Optional additional context (e.g., validation errors)

---

## Custom Error Classes

**Location:** `app/lib/errors.ts`

### Base Error Class

```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
    public details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
```

---

### ValidationError (400)

Input validation failures.

```typescript
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}
```

**Example:**
```typescript
throw new ValidationError('Invalid firma data', {
  field: 'slug',
  constraint: 'unique'
});
```

**Response:**
```json
{
  "error": {
    "message": "Invalid firma data",
    "code": "VALIDATION_ERROR",
    "statusCode": 400,
    "details": {
      "field": "slug",
      "constraint": "unique"
    }
  }
}
```

---

### AuthenticationError (401)

User not authenticated.

```typescript
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}
```

**Use Cases:**
- Missing auth token
- Invalid credentials
- Expired session

**Example:**
```typescript
if (!session) {
  throw new AuthenticationError('Please log in to continue');
}
```

---

### AuthorizationError (403)

User lacks permission.

```typescript
export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}
```

**Use Cases:**
- User role insufficient
- Resource ownership check failed
- Feature not enabled for user

**Example:**
```typescript
if (firma.created_by !== userId) {
  throw new AuthorizationError('You can only edit your own companies');
}
```

---

### NotFoundError (404)

Resource not found.

```typescript
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}
```

**Example:**
```typescript
const firma = await prisma.firmalar.findUnique({ where: { slug } });
if (!firma) {
  throw new NotFoundError('Firma');
}
```

**Response:**
```json
{
  "error": {
    "message": "Firma not found",
    "code": "NOT_FOUND",
    "statusCode": 404
  }
}
```

---

### ConflictError (409)

Resource conflict (e.g., duplicate).

```typescript
export class ConflictError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 409, 'CONFLICT_ERROR', details);
  }
}
```

**Use Cases:**
- Duplicate slug
- Unique constraint violation
- Concurrent modification conflict

**Example:**
```typescript
const existing = await prisma.firmalar.findUnique({
  where: { slug }
});

if (existing) {
  throw new ConflictError('Firma with this slug already exists', {
    field: 'slug',
    value: slug
  });
}
```

---

### RateLimitError (429)

Too many requests.

```typescript
export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    super(
      'Too many requests, please try again later',
      429,
      'RATE_LIMIT_ERROR',
      { retryAfter }
    );
  }
}
```

**Example:**
```typescript
const rateLimitResult = await checkRateLimit(ip, 'login');

if (!rateLimitResult.allowed) {
  throw new RateLimitError(rateLimitResult.retryAfter);
}
```

**Response:**
```json
{
  "error": {
    "message": "Too many requests, please try again later",
    "code": "RATE_LIMIT_ERROR",
    "statusCode": 429,
    "details": {
      "retryAfter": 900
    }
  }
}
```

---

### DatabaseError (500)

Database operation failures.

```typescript
export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed', details?: any) {
    super(message, 500, 'DATABASE_ERROR', details);
  }
}
```

**Use Cases:**
- Connection failures
- Query timeouts
- Constraint violations

**Example:**
```typescript
try {
  await prisma.firmalar.create({ data });
} catch (error) {
  if (error.code === 'P2002') {
    throw new ConflictError('Duplicate entry');
  }
  throw new DatabaseError('Failed to create firma', {
    originalError: error.message
  });
}
```

---

### FileUploadError (400)

File upload failures.

```typescript
export class FileUploadError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'FILE_UPLOAD_ERROR', details);
  }
}
```

**Use Cases:**
- File too large
- Invalid file type
- Upload service failure

**Example:**
```typescript
if (file.size > 5 * 1024 * 1024) {
  throw new FileUploadError('File size exceeds 5MB limit', {
    maxSize: 5 * 1024 * 1024,
    actualSize: file.size
  });
}
```

---

### ExternalServiceError (502)

External service failures.

```typescript
export class ExternalServiceError extends AppError {
  constructor(service: string, message?: string) {
    super(
      message || `${service} service unavailable`,
      502,
      'EXTERNAL_SERVICE_ERROR',
      { service }
    );
  }
}
```

**Use Cases:**
- Cloudinary upload failure
- Email service down
- Payment gateway error

**Example:**
```typescript
try {
  await cloudinary.uploader.upload(file);
} catch (error) {
  throw new ExternalServiceError('Cloudinary', 'Image upload failed');
}
```

---

## Error Response Handler

Central error handler that formats all errors consistently.

**Location:** `app/lib/errors.ts`

```typescript
export function errorResponse(error: unknown): NextResponse {
  // 1. Handle Zod validation errors
  if (error instanceof z.ZodError) {
    return NextResponse.json({
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        statusCode: 400,
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }))
      }
    }, { status: 400 });
  }

  // 2. Handle custom AppError instances
  if (error instanceof AppError) {
    return NextResponse.json({
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        ...(error.details && { details: error.details })
      }
    }, { status: error.statusCode });
  }

  // 3. Handle Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any;

    // Unique constraint violation
    if (prismaError.code === 'P2002') {
      const field = prismaError.meta?.target?.[0] || 'field';
      return NextResponse.json({
        error: {
          message: `Duplicate ${field}`,
          code: 'CONFLICT_ERROR',
          statusCode: 409,
          details: { field }
        }
      }, { status: 409 });
    }

    // Foreign key constraint
    if (prismaError.code === 'P2003') {
      return NextResponse.json({
        error: {
          message: 'Related record not found',
          code: 'VALIDATION_ERROR',
          statusCode: 400
        }
      }, { status: 400 });
    }

    // Record not found
    if (prismaError.code === 'P2025') {
      return NextResponse.json({
        error: {
          message: 'Record not found',
          code: 'NOT_FOUND',
          statusCode: 404
        }
      }, { status: 404 });
    }
  }

  // 4. Unknown errors (safe in production)
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : error instanceof Error ? error.message : 'Unknown error';

  // Log error for debugging
  console.error('Unexpected error:', error);

  return NextResponse.json({
    error: {
      message,
      code: 'INTERNAL_ERROR',
      statusCode: 500
    }
  }, { status: 500 });
}
```

---

## Usage in API Routes

### Standard Pattern

```typescript
import { errorResponse } from '@/app/lib/errors';
import { NotFoundError, ValidationError } from '@/app/lib/errors';
import { firmaSchema } from '@/app/lib/validations';

export async function POST(request: NextRequest) {
  try {
    // 1. Parse request
    const body = await request.json();

    // 2. Validate (throws ZodError if invalid)
    const validated = firmaSchema.parse(body);

    // 3. Check business rules
    const existing = await prisma.firmalar.findUnique({
      where: { slug: validated.slug }
    });

    if (existing) {
      throw new ConflictError('Firma with this slug already exists');
    }

    // 4. Execute operation
    const firma = await prisma.firmalar.create({
      data: validated
    });

    // 5. Return success
    return NextResponse.json(firma, { status: 201 });

  } catch (error) {
    // Handle all errors consistently
    return errorResponse(error);
  }
}
```

---

### Async Error Handling

```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const firma = await prisma.firmalar.findUnique({
      where: { slug: params.slug }
    });

    if (!firma) {
      throw new NotFoundError('Firma');
    }

    return NextResponse.json(firma);
  } catch (error) {
    return errorResponse(error);
  }
}
```

---

## Validation Error Details

Zod validation errors include detailed field-level information:

```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "statusCode": 400,
    "details": [
      {
        "field": "firma_adi",
        "message": "Company name must be at least 2 characters",
        "code": "too_small"
      },
      {
        "field": "slug",
        "message": "Slug must contain only lowercase letters, numbers, and hyphens",
        "code": "invalid_string"
      },
      {
        "field": "template_id",
        "message": "Template ID must be at most 9",
        "code": "too_big"
      }
    ]
  }
}
```

---

## Client-Side Error Handling

### TypeScript Error Handler

```typescript
interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: any;
}

async function handleApiCall<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData.error as ApiError;
    }

    return await response.json();
  } catch (error) {
    if ('code' in error) {
      const apiError = error as ApiError;

      // Handle specific error codes
      switch (apiError.code) {
        case 'AUTHENTICATION_ERROR':
          // Redirect to login
          window.location.href = '/login';
          break;

        case 'VALIDATION_ERROR':
          // Show validation errors in form
          showFormErrors(apiError.details);
          break;

        case 'RATE_LIMIT_ERROR':
          // Show rate limit message
          const retryAfter = apiError.details?.retryAfter || 60;
          showRateLimitMessage(retryAfter);
          break;

        default:
          // Show generic error
          showErrorMessage(apiError.message);
      }

      throw apiError;
    }

    // Network or other errors
    throw new Error('Network error occurred');
  }
}
```

---

### React Error Boundary

```typescript
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log to error reporting service
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## Error Logging

### Production Error Logging

```typescript
function logError(error: Error | AppError, context?: any) {
  // Don't log in development
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
    return;
  }

  // Log to monitoring service (e.g., Sentry)
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.captureException(error, {
      extra: context
    });
  }

  // Server-side logging
  logger.error({
    message: error.message,
    stack: error.stack,
    ...(error instanceof AppError && {
      code: error.code,
      statusCode: error.statusCode,
      details: error.details
    }),
    ...context
  });
}
```

---

## Common Error Scenarios

### 1. Duplicate Resource

```typescript
// Check before create
const existing = await prisma.firmalar.findUnique({
  where: { slug }
});

if (existing) {
  throw new ConflictError('Firma with this slug already exists', {
    field: 'slug',
    value: slug
  });
}
```

---

### 2. Required Authentication

```typescript
const session = await getServerSession(authOptions);

if (!session) {
  throw new AuthenticationError('Authentication required');
}
```

---

### 3. Resource Ownership

```typescript
const firma = await prisma.firmalar.findUnique({
  where: { id }
});

if (!firma) {
  throw new NotFoundError('Firma');
}

if (firma.created_by !== session.user.id) {
  throw new AuthorizationError('You can only edit your own companies');
}
```

---

### 4. Rate Limiting

```typescript
const rateLimitResult = await rateLimiter.consume(ip);

if (rateLimitResult.remainingPoints === 0) {
  throw new RateLimitError(rateLimitResult.msBeforeNext / 1000);
}
```

---

### 5. External Service Failure

```typescript
try {
  const result = await cloudinary.uploader.upload(file);
  return result.secure_url;
} catch (error) {
  throw new ExternalServiceError('Cloudinary', 'Failed to upload image');
}
```

---

## Error Prevention Best Practices

### 1. Input Validation

Always validate at API boundaries:
```typescript
const validated = schema.parse(input); // Throws ZodError
```

### 2. Null Checks

Check for null/undefined before using:
```typescript
if (!firma) {
  throw new NotFoundError('Firma');
}
```

### 3. Try-Catch for External Calls

Wrap external service calls:
```typescript
try {
  await externalService.call();
} catch (error) {
  throw new ExternalServiceError('ServiceName');
}
```

### 4. Graceful Degradation

Provide fallbacks for non-critical failures:
```typescript
let cacheValue;
try {
  cacheValue = await cache.get(key);
} catch (error) {
  logger.warn('Cache unavailable, using database');
  cacheValue = null;
}
```

---

## Related Documentation

- **[ENDPOINTS.md](ENDPOINTS.md)** - API endpoints and their error responses
- **[VALIDATION.md](VALIDATION.md)** - Request validation that prevents errors
- **[../architecture/CRITICAL_PATTERNS.md](../architecture/CRITICAL_PATTERNS.md)** - Error handling patterns

---

**Last Updated:** January 2026
**Error Handler Location:** `app/lib/errors.ts`
**Error Classes:** 8 custom error types
