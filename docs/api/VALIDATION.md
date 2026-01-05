# Request Validation Schemas

Complete reference for all Zod validation schemas used in API request validation.

**Validation Library:** [Zod](https://zod.dev/) v3.25.76

---

## Overview

All API requests are validated using Zod schemas at API boundaries. This provides:
- **Runtime type safety** - Catches invalid data at runtime
- **Comprehensive validation** - Length, format, required fields, custom rules
- **Type inference** - TypeScript types automatically inferred
- **Clear error messages** - Detailed validation errors for clients

**Location:** `app/lib/validations/`

---

## Firma (Company) Schemas

### firmaSchema

Complete schema for creating a company.

**File:** `app/lib/validations/firma.schema.ts`

```typescript
import { z } from 'zod';

export const firmaSchema = z.object({
  firma_adi: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be at most 100 characters'),

  slug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .max(100, 'Slug must be at most 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),

  yetkili_adi: z.string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(100, 'Contact name must be at most 100 characters')
    .optional(),

  yetkili_pozisyon: z.string()
    .max(100, 'Position must be at most 100 characters')
    .optional(),

  firma_hakkinda: z.string()
    .max(5000, 'About text must be at most 5000 characters')
    .optional(),

  firma_hakkinda_baslik: z.string()
    .max(100, 'About title must be at most 100 characters')
    .default('Hakkımızda'),

  firma_unvan: z.string()
    .max(200, 'Legal name must be at most 200 characters')
    .optional(),

  firma_vergi_no: z.string()
    .max(50, 'Tax ID must be at most 50 characters')
    .optional(),

  vergi_dairesi: z.string()
    .max(100, 'Tax office must be at most 100 characters')
    .optional(),

  template_id: z.number()
    .int('Template ID must be an integer')
    .min(1, 'Template ID must be at least 1')
    .max(9, 'Template ID must be at most 9')
    .default(1),

  gradient_color: z.string()
    .regex(/^#[0-9A-Fa-f]{6}(,#[0-9A-Fa-f]{6})*$/,
      'Gradient must be comma-separated hex colors')
    .default('#D4AF37,#F7E98E,#B8860B'),

  sektor_id: z.number().int().positive().optional(),
  kategori_id: z.number().int().positive().optional(),
  il_id: z.number().int().positive().optional(),
  ilce_id: z.number().int().positive().optional(),

  onay: z.boolean().default(false),
  tip: z.string().max(50).optional(),
  profil_foto: z.string().url().optional(),
  firma_logo: z.string().url().optional(),
  katalog: z.string().url().optional(),
});
```

**Usage:**
```typescript
const validated = firmaSchema.parse(requestBody);
```

---

### updateFirmaSchema

Partial schema for updating companies (all fields optional).

```typescript
export const updateFirmaSchema = firmaSchema.partial();
```

**Usage:**
```typescript
const validated = updateFirmaSchema.parse(requestBody);
```

---

### iletisimBilgisiSchema

Schema for contact information.

```typescript
export const iletisimBilgisiSchema = z.object({
  tip: z.enum(['telefon', 'email', 'whatsapp', 'adres', 'fax', 'website'], {
    errorMap: () => ({ message: 'Invalid contact type' })
  }),

  deger: z.string()
    .min(1, 'Contact value is required')
    .max(500, 'Contact value must be at most 500 characters'),

  etiket: z.string()
    .max(100, 'Label must be at most 100 characters')
    .optional(),

  aktif: z.boolean().default(true),
  sira: z.number().int().min(0).default(0),
});
```

**Contact Types:**
- `telefon` - Phone number
- `email` - Email address
- `whatsapp` - WhatsApp number
- `adres` - Physical address
- `fax` - Fax number
- `website` - Website URL

---

### sosyalMedyaHesabiSchema

Schema for social media accounts.

```typescript
export const sosyalMedyaHesabiSchema = z.object({
  platform: z.enum([
    'instagram',
    'facebook',
    'twitter',
    'linkedin',
    'youtube',
    'tiktok'
  ], {
    errorMap: () => ({ message: 'Invalid social media platform' })
  }),

  url: z.string()
    .url('Must be a valid URL')
    .max(500, 'URL must be at most 500 characters'),

  etiket: z.string()
    .max(100, 'Label must be at most 100 characters')
    .optional(),

  aktif: z.boolean().default(true),
  sira: z.number().int().min(0).default(0),
});
```

---

### bankaHesabiSchema

Schema for bank accounts.

```typescript
export const bankaHesabiSchema = z.object({
  banka_adi: z.string()
    .min(2, 'Bank name must be at least 2 characters')
    .max(100, 'Bank name must be at most 100 characters'),

  banka_kodu: z.string()
    .max(20, 'Bank code must be at most 20 characters')
    .optional(),

  banka_logo: z.string().url().optional(),

  hesap_sahibi: z.string()
    .min(2, 'Account holder must be at least 2 characters')
    .max(200, 'Account holder must be at most 200 characters'),

  aktif: z.boolean().default(true),
  sira: z.number().int().min(0).default(0),

  // Nested IBANs
  hesaplar: z.array(z.object({
    iban: z.string()
      .regex(/^[A-Z]{2}\d{2}[\dA-Z]+$/, 'Invalid IBAN format')
      .max(34, 'IBAN must be at most 34 characters'),

    para_birimi: z.enum(['TRY', 'EUR', 'USD'], {
      errorMap: () => ({ message: 'Currency must be TRY, EUR, or USD' })
    }).default('TRY'),

    hesap_turu: z.string()
      .max(50, 'Account type must be at most 50 characters')
      .optional(),

    aktif: z.boolean().default(true),
  })).min(1, 'At least one IBAN is required'),
});
```

---

## Authentication Schemas

### loginSchema

Schema for admin login.

**File:** `app/lib/validations/auth.schema.ts`

```typescript
export const loginSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be at most 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),

  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters'),
});
```

---

### changePasswordSchema

Schema for password change.

```typescript
export const changePasswordSchema = z.object({
  oldPassword: z.string()
    .min(6, 'Password must be at least 6 characters'),

  newPassword: z.string()
    .min(8, 'New password must be at least 8 characters')
    .max(100, 'New password must be at most 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
}).refine((data) => data.oldPassword !== data.newPassword, {
  message: 'New password must be different from old password',
  path: ['newPassword'],
});
```

---

## Package Schemas

### packageSchema

Schema for creating/updating packages.

**File:** `app/lib/validations/package.schema.ts`

```typescript
export const packageSchema = z.object({
  package_key: z.string()
    .min(2, 'Package key must be at least 2 characters')
    .max(50, 'Package key must be at most 50 characters')
    .regex(/^[a-z0-9_-]+$/, 'Package key must be lowercase alphanumeric with hyphens/underscores'),

  name: z.string()
    .min(2, 'Package name must be at least 2 characters')
    .max(100, 'Package name must be at most 100 characters'),

  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be at most 500 characters'),

  price: z.number()
    .int('Price must be an integer')
    .min(0, 'Price cannot be negative'),

  card_count: z.number()
    .int('Card count must be an integer')
    .min(1, 'Card count must be at least 1')
    .max(1000, 'Card count must be at most 1000'),

  color: z.string()
    .regex(/^[a-z]+$/, 'Color must be lowercase letters only')
    .default('blue'),

  popular: z.boolean().default(false),
  active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),

  features: z.array(z.string().min(1).max(200))
    .min(1, 'At least one feature is required')
    .max(20, 'Maximum 20 features allowed'),
});
```

---

### packageInquirySchema

Schema for package inquiry submissions.

**File:** `app/lib/validations/package-inquiry.schema.ts`

```typescript
export const packageInquirySchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),

  surname: z.string()
    .min(2, 'Surname must be at least 2 characters')
    .max(100, 'Surname must be at most 100 characters'),

  phone: z.string()
    .regex(/^\+?[\d\s()-]{10,20}$/, 'Invalid phone number format')
    .max(20, 'Phone number must be at most 20 characters'),

  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email must be at most 100 characters')
    .optional(),

  package_key: z.string()
    .min(1, 'Package key is required'),
});
```

---

## Settings Schemas

### siteSettingsSchema

Schema for site settings.

**File:** `app/lib/validations/settings.schema.ts`

```typescript
export const siteSettingsSchema = z.object({
  site_name: z.string()
    .min(2, 'Site name must be at least 2 characters')
    .max(100, 'Site name must be at most 100 characters')
    .default('Dijital Kartvizit Merkezi'),

  contact_email: z.string()
    .email('Invalid email address')
    .max(100, 'Email must be at most 100 characters')
    .optional(),

  contact_phone: z.string()
    .max(20, 'Phone must be at most 20 characters')
    .optional(),

  contact_address: z.string()
    .max(500, 'Address must be at most 500 characters')
    .optional(),

  whatsapp_number: z.string()
    .max(20, 'WhatsApp number must be at most 20 characters')
    .optional(),

  whatsapp_message: z.string()
    .max(500, 'WhatsApp message must be at most 500 characters')
    .optional(),

  whatsapp_enabled: z.boolean().default(true),

  meta_title: z.string().max(100).optional(),
  meta_description: z.string().max(300).optional(),
  meta_keywords: z.string().max(500).optional(),
  google_analytics: z.string().max(50).optional(),
});
```

---

### faqSchema

Schema for FAQ items.

```typescript
export const faqSchema = z.object({
  question: z.string()
    .min(5, 'Question must be at least 5 characters')
    .max(500, 'Question must be at most 500 characters'),

  answer: z.string()
    .min(10, 'Answer must be at least 10 characters')
    .max(5000, 'Answer must be at most 5000 characters'),

  category: z.string()
    .max(50, 'Category must be at most 50 characters')
    .optional(),

  active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});
```

---

### testimonialSchema

Schema for testimonials.

```typescript
export const testimonialSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),

  title: z.string()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be at most 100 characters'),

  text: z.string()
    .min(10, 'Testimonial must be at least 10 characters')
    .max(1000, 'Testimonial must be at most 1000 characters'),

  rating: z.number()
    .int('Rating must be an integer')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .default(5),

  avatar_url: z.string().url().optional(),
  active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});
```

---

## File Upload Schemas

### fileUploadSchema

Schema for file upload validation.

```typescript
export const fileUploadSchema = z.object({
  type: z.enum(['profile', 'logo', 'catalog', 'bank_logo'], {
    errorMap: () => ({ message: 'Invalid upload type' })
  }),

  firma_id: z.number().int().positive().optional(),
});

export const fileValidationRules = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  allowedDocumentTypes: ['application/pdf'],
  maxImageDimensions: {
    width: 4000,
    height: 4000,
  },
};
```

---

## Custom Validators

### Email Validator

```typescript
const emailValidator = z.string().email().refine(
  (email) => {
    const [local, domain] = email.split('@');
    return local.length <= 64 && domain.length <= 255;
  },
  { message: 'Email parts exceed maximum length' }
);
```

---

### Turkish Phone Validator

```typescript
const turkishPhoneValidator = z.string().refine(
  (phone) => {
    const cleaned = phone.replace(/[\s()-]/g, '');
    return /^(\+90|0)?5\d{9}$/.test(cleaned);
  },
  { message: 'Invalid Turkish mobile number format' }
);
```

---

### URL Slug Validator

```typescript
const slugValidator = z.string()
  .min(2)
  .max(100)
  .regex(/^[a-z0-9-]+$/)
  .refine(
    (slug) => !slug.startsWith('-') && !slug.endsWith('-'),
    { message: 'Slug cannot start or end with hyphen' }
  );
```

---

## Using Schemas in API Routes

### Standard Usage

```typescript
import { firmaSchema } from '@/app/lib/validations/firma.schema';
import { errorResponse } from '@/app/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate - throws ZodError if invalid
    const validated = firmaSchema.parse(body);

    // Use validated data (type-safe)
    const firma = await prisma.firmalar.create({ data: validated });

    return NextResponse.json(firma, { status: 201 });
  } catch (error) {
    // errorResponse handles ZodError formatting
    return errorResponse(error);
  }
}
```

---

### Safe Parsing (No Throw)

```typescript
const result = firmaSchema.safeParse(body);

if (!result.success) {
  return NextResponse.json({
    error: {
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: result.error.errors
    }
  }, { status: 400 });
}

const validated = result.data;
```

---

### Partial Updates

```typescript
// Allow partial updates
const updateResult = updateFirmaSchema.parse(body);

// Only update provided fields
await prisma.firmalar.update({
  where: { id },
  data: updateResult
});
```

---

## Validation Error Format

When validation fails, Zod errors are formatted as:

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
        "code": "too_small",
        "path": ["firma_adi"]
      },
      {
        "field": "slug",
        "message": "Slug must contain only lowercase letters, numbers, and hyphens",
        "code": "invalid_string",
        "path": ["slug"]
      }
    ]
  }
}
```

---

## Type Inference

Zod schemas automatically generate TypeScript types:

```typescript
import { firmaSchema } from '@/app/lib/validations/firma.schema';
import { z } from 'zod';

// Infer TypeScript type from schema
type FirmaCreateData = z.infer<typeof firmaSchema>;

// Use in functions
async function createFirma(data: FirmaCreateData) {
  // data is fully typed
  return await prisma.firmalar.create({ data });
}
```

---

## Best Practices

### 1. Validate at Boundaries

Always validate at API route entry points:
```typescript
// ✅ Good - validate immediately
export async function POST(request: NextRequest) {
  const validated = schema.parse(await request.json());
  // Use validated data
}

// ❌ Bad - use unvalidated data
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Use body directly - type unsafe!
}
```

### 2. Reuse Schemas

Define schemas once, use everywhere:
```typescript
// Define once
export const firmaSchema = z.object({...});

// Use in multiple routes
import { firmaSchema } from '@/app/lib/validations';
```

### 3. Provide Clear Messages

Always include helpful error messages:
```typescript
z.string()
  .min(2, 'Name must be at least 2 characters') // ✅ Clear message
  .min(2) // ❌ Generic message
```

### 4. Use Refinements for Complex Validation

```typescript
z.object({
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword']
});
```

---

## Related Documentation

- **[ENDPOINTS.md](ENDPOINTS.md)** - API endpoints using these schemas
- **[ERROR_HANDLING.md](ERROR_HANDLING.md)** - Validation error handling
- **[../architecture/CRITICAL_PATTERNS.md](../architecture/CRITICAL_PATTERNS.md)** - Validation patterns

---

**Validation Library:** Zod 3.25.76
**Last Updated:** January 2026
**Schemas Location:** `app/lib/validations/`
