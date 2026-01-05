# Database Schema Reference

Complete reference for the PostgreSQL database schema managed by Prisma ORM.

⚠️ **IMPORTANT**: The Prisma schema file is located at `schema.prisma` in the project root (NOT in a `/prisma` directory).

---

## Schema Overview

The database consists of **17 tables** organized into these functional groups:

1. **Core Business** - Companies and their information
2. **Admin & Auth** - Administrator accounts
3. **Reference Data** - Sectors, categories, locations
4. **Site Configuration** - Settings, FAQ, testimonials, packages
5. **Customer Interaction** - Package inquiries

---

## Core Business Tables

### `firmalar` (Companies)

The central table storing digital business card information.

**Fields:**
```prisma
model firmalar {
  id                     Int      @id @default(autoincrement())
  firma_adi              String   # Company name
  slug                   String   @unique # URL-friendly identifier
  profil_foto            String?  # Profile photo URL
  vcard_dosya            String?  # vCard file URL
  yetkili_adi            String?  # Contact person name
  yetkili_pozisyon       String?  # Contact person position
  created_at             DateTime @default(now())
  updated_at             DateTime @default(now())
  goruntulenme           Int      @default(0) # View count
  katalog                String?  # PDF catalog URL
  firma_hakkinda         String?  # About company (HTML)
  firma_hakkinda_baslik  String?  @default("Hakkımızda") # About section title
  firma_unvan            String?  # Company legal name
  firma_vergi_no         String?  # Tax ID
  vergi_dairesi          String?  # Tax office
  sektor_id              Int?     # FK to sektorler
  kategori_id            Int?     # FK to kategoriler
  il_id                  Int?     # FK to iller (city)
  ilce_id                Int?     # FK to ilceler (district)
  onay                   Boolean  @default(false) # Approval status
  tip                    String?  # Company type
  firma_logo             String?  # Company logo URL
  template_id            Int      @default(1) # Card template (1-9)
  gradient_color         String?  @default("#D4AF37,#F7E98E,#B8860B") # CSV colors
}
```

**Relationships:**
- Has many: `IletisimBilgisi`, `SosyalMedyaHesabi`, `BankaHesabi`
- Belongs to: `sektorler`, `kategoriler`, `iller`, `ilceler`

**Indexes:**
- `slug` (unique) - Fast URL lookup
- `created_at` - Recent companies query
- `goruntulenme` - Most viewed companies
- `onay` - Filter approved companies
- `sektor_id, kategori_id` - Composite for filtering
- `firma_adi` - Company name search
- `il_id`, `ilce_id` - Location filtering

**Business Rules:**
- `slug` must be unique and URL-safe (`/^[a-z0-9-]+$/`)
- `template_id` must be 1-9 (9 available templates)
- `gradient_color` is CSV format: `"#color1,#color2,#color3"`
- `onay` controls public visibility

---

### `IletisimBilgisi` (Contact Information)

Stores multiple contact methods for each company.

**Fields:**
```prisma
model IletisimBilgisi {
  id         Int      @id @default(autoincrement())
  firma_id   Int      # FK to firmalar
  tip        String   # Contact type: "telefon", "email", "whatsapp", "adres", "fax", "website"
  deger      String   # Contact value (phone number, email, etc.)
  etiket     String?  # Custom label (e.g., "Head Office", "Support")
  aktif      Boolean  @default(true)
  sira       Int      @default(0) # Display order
  created_at DateTime @default(now())
}
```

**Supported Contact Types:**
- `telefon` - Phone number
- `email` - Email address
- `whatsapp` - WhatsApp number
- `adres` - Physical address
- `fax` - Fax number
- `website` - Website URL

**Cascade Delete**: Deletes when parent company is deleted

**Indexes:**
- `firma_id` - List all contacts for a company
- `tip` - Filter by contact type
- `firma_id, tip` - Composite for specific type lookup
- `aktif` - Active contacts only
- `sira` - Order by display priority

---

### `SosyalMedyaHesabi` (Social Media Accounts)

Social media links for companies.

**Fields:**
```prisma
model SosyalMedyaHesabi {
  id         Int      @id @default(autoincrement())
  firma_id   Int      # FK to firmalar
  platform   String   # "instagram", "facebook", "twitter", "linkedin", "youtube", "tiktok"
  url        String   # Full URL to profile
  etiket     String?  # Custom label
  aktif      Boolean  @default(true)
  sira       Int      @default(0) # Display order
  created_at DateTime @default(now())
}
```

**Supported Platforms:**
- Instagram, Facebook, Twitter, LinkedIn, YouTube, TikTok

**Cascade Delete**: Deletes when parent company is deleted

**Indexes:**
- `firma_id` - List all social accounts
- `platform` - Filter by platform
- `firma_id, platform` - Composite lookup
- `aktif` - Active accounts only
- `sira` - Display order

---

### `BankaHesabi` (Bank Accounts)

Bank account information with multi-currency IBAN support.

**Fields:**
```prisma
model BankaHesabi {
  id           Int      @id @default(autoincrement())
  firma_id     Int      # FK to firmalar
  banka_adi    String   # Bank name (e.g., "Ziraat Bankası")
  banka_kodu   String?  # Bank code
  banka_logo   String?  # Bank logo URL
  hesap_sahibi String   # Account holder name
  aktif        Boolean  @default(true)
  sira         Int      @default(0) # Display order
  created_at   DateTime @default(now())
}
```

**Relationships:**
- Has many: `BankaHesapDetay` (IBANs)

**Cascade Delete**: Deletes when parent company is deleted

**Indexes:**
- `firma_id` - List all bank accounts
- `sira` - Display order

---

### `BankaHesapDetay` (Bank Account Details/IBANs)

Multiple IBANs per bank account (multi-currency support).

**Fields:**
```prisma
model BankaHesapDetay {
  id              Int      @id @default(autoincrement())
  banka_hesabi_id Int      # FK to BankaHesabi
  iban            String   # IBAN number
  para_birimi     String   @default("TRY") # Currency: TRY, EUR, USD
  hesap_turu      String?  # Account type
  aktif           Boolean  @default(true)
  created_at      DateTime @default(now())
}
```

**Supported Currencies:**
- TRY (Turkish Lira)
- EUR (Euro)
- USD (US Dollar)

**Cascade Delete**: Deletes when parent bank account is deleted

**Indexes:**
- `banka_hesabi_id` - List IBANs for bank account
- `iban` - IBAN lookup

---

## Admin & Authentication

### `admins`

Administrator user accounts.

**Fields:**
```prisma
model admins {
  id         Int      @id @default(autoincrement())
  username   String   @unique
  password   String   # Bcrypt hashed (10 rounds)
  created_at DateTime @default(now())
}
```

**Security:**
- Passwords hashed with bcrypt (10 rounds)
- Default admin created by `/api/health` endpoint:
  - Username: `admin`
  - Password: `admin123` ⚠️ **Change in production!**

---

### `AdminPasswordHistory`

Tracks admin password changes.

**Fields:**
```prisma
model AdminPasswordHistory {
  id                Int      @id @default(autoincrement())
  admin_id          Int      # FK to admins (not enforced)
  old_password_hash String   # Previous password hash
  changed_at        DateTime @default(now())
  changed_by        String?  # Who made the change
}
```

**Indexes:**
- `admin_id` - Password history for admin
- `changed_at` - Recent changes

---

## Reference Data Tables

### `sektorler` (Sectors)

Business sectors for categorization.

**Fields:**
```prisma
model sektorler {
  id Int    @id @default(autoincrement())
  ad String # Sector name
}
```

**Example Sectors:**
- Technology, Manufacturing, Services, Retail, etc.

---

### `kategoriler` (Categories)

Business categories within sectors.

**Fields:**
```prisma
model kategoriler {
  id Int    @id @default(autoincrement())
  ad String # Category name
}
```

---

### `iller` (Cities)

Turkish cities.

**Fields:**
```prisma
model iller {
  id Int    @id @default(autoincrement())
  ad String # City name
}
```

**Relationships:**
- Has many: `ilceler`, `firmalar`

---

### `ilceler` (Districts)

Districts within cities.

**Fields:**
```prisma
model ilceler {
  id    Int    @id @default(autoincrement())
  ad    String # District name
  il_id Int    # FK to iller
}
```

**Indexes:**
- `il_id` - Districts for a city

**Location Hierarchy**: `iller` (city) → `ilceler` (district) → `firmalar` (company)

---

## Site Configuration Tables

### `SiteSettings`

Global site configuration.

**Fields:**
```prisma
model SiteSettings {
  id                Int      @id @default(autoincrement())
  site_name         String   @default("Dijital Kartvizit Merkezi")
  site_logo         String?
  favicon           String?
  meta_title        String?
  meta_description  String?
  meta_keywords     String?
  google_analytics  String?
  contact_email     String?
  contact_phone     String?
  contact_address   String?
  faq_video_url     String?
  whatsapp_number   String?
  whatsapp_message  String?
  whatsapp_enabled  Boolean  @default(true)
  updated_at        DateTime @default(now()) @updatedAt
  created_at        DateTime @default(now())
}
```

**Usage:** Single row configuration (use ID = 1)

---

### `packages`

Pricing packages for business cards.

**Fields:**
```prisma
model packages {
  id             Int      @id @default(autoincrement())
  package_key    String   @unique # Unique identifier (e.g., "basic", "premium")
  name           String   # Display name
  description    String   # Package description
  price          Int      # Price in smallest currency unit
  card_count     Int      # Number of cards included
  color          String   @default("blue") # UI theme color
  popular        Boolean  @default(false) # "Most Popular" badge
  display_order  Int      @default(0) # Display order
  features       Json     # Array of feature strings
  active         Boolean  @default(true)
  created_at     DateTime @default(now())
  updated_at     DateTime @default(now()) @updatedAt
}
```

**Indexes:**
- `package_key` (unique) - Lookup by key
- `display_order` - Sort packages
- `active` - Filter active packages

**JSON Features Example:**
```json
["5 Digital Cards", "QR Code", "Social Media Links", "Contact Form", "Analytics"]
```

---

### `PackageInquiry`

Customer package purchase inquiries.

**Fields:**
```prisma
model PackageInquiry {
  id               Int       @id @default(autoincrement())
  name             String
  surname          String
  phone            String
  email            String?
  package_key      String    # Which package
  package_name     String    # Package name at time of inquiry
  package_price    Int       # Price at time of inquiry
  package_features Json      # Features at time of inquiry
  status           String    @default("pending") # "pending", "contacted", "completed", "cancelled"
  ip_address       String?   # Customer IP
  user_agent       String?   # Customer browser
  admin_notes      String?   # Internal notes
  contacted_at     DateTime?
  completed_at     DateTime?
  created_at       DateTime  @default(now())
  updated_at       DateTime  @default(now()) @updatedAt
}
```

**Indexes:**
- `status` - Filter by status
- `created_at` - Recent inquiries
- `phone`, `email` - Customer lookup
- `package_key` - Inquiries per package

**Status Flow:** `pending` → `contacted` → `completed` or `cancelled`

---

### `Faq`

Frequently asked questions.

**Fields:**
```prisma
model Faq {
  id            Int      @id @default(autoincrement())
  question      String   @db.Text
  answer        String   @db.Text
  category      String?
  active        Boolean  @default(true)
  display_order Int      @default(0)
  created_at    DateTime @default(now())
}
```

**Indexes:**
- `active` - Active FAQs only
- `display_order` - Sort FAQs
- `category` - Group by category

---

### `Testimonial`

Customer testimonials.

**Fields:**
```prisma
model Testimonial {
  id            Int      @id @default(autoincrement())
  name          String   # Customer name
  title         String   # Customer title/company
  avatar_url    String?  # Avatar image
  text          String   @db.Text
  rating        Int?     @default(5) # 1-5 stars
  active        Boolean  @default(true)
  display_order Int      @default(0)
  created_at    DateTime @default(now())
}
```

**Indexes:**
- `active` - Active testimonials
- `display_order` - Sort order

---

### `SliderImage`

Homepage slider images.

**Fields:**
```prisma
model SliderImage {
  id            Int      @id @default(autoincrement())
  image_url     String
  display_order Int      @default(0)
  active        Boolean  @default(true)
  alt_text      String?
  created_at    DateTime @default(now())
}
```

**Indexes:**
- `active` - Active images
- `display_order` - Sort order

---

### `SocialMediaSettings`

Site-wide social media links.

**Fields:**
```prisma
model SocialMediaSettings {
  id            Int      @id @default(autoincrement())
  platform      String   # Social platform name
  url           String   # Profile URL
  active        Boolean  @default(true)
  display_order Int      @default(0)
  created_at    DateTime @default(now())
}
```

**Indexes:**
- `active` - Active links
- `display_order` - Sort order

---

### `Icon`

Icon display priority configuration.

**Fields:**
```prisma
model Icon {
  id       Int    @id @default(autoincrement())
  name     String # Icon name (e.g., "telefon", "email")
  priority Int    # Display priority (lower = higher priority)
}
```

**Usage:** Controls order of contact icons on business cards

---

## Database Relationships

### Entity Relationship Diagram

```
firmalar (Companies)
    ├── IletisimBilgisi (1:N, CASCADE DELETE)
    ├── SosyalMedyaHesabi (1:N, CASCADE DELETE)
    └── BankaHesabi (1:N, CASCADE DELETE)
            └── BankaHesapDetay (1:N, CASCADE DELETE)

firmalar
    ├── sektorler (N:1)
    ├── kategoriler (N:1)
    ├── iller (N:1)
    └── ilceler (N:1)

iller (Cities)
    └── ilceler (1:N)

admins
    └── AdminPasswordHistory (1:N, not enforced)
```

### Cascade Delete Rules

**When a company (`firmalar`) is deleted:**
- ✅ All `IletisimBilgisi` records deleted
- ✅ All `SosyalMedyaHesabi` records deleted
- ✅ All `BankaHesabi` records deleted
  - ✅ All related `BankaHesapDetay` records deleted

**When a bank account (`BankaHesabi`) is deleted:**
- ✅ All `BankaHesapDetay` records deleted

---

## Database Operations Best Practices

### Creating a Company

```typescript
const firma = await prisma.firmalar.create({
  data: {
    firma_adi: "Example Corp",
    slug: "example-corp",
    // ... other required fields
    iletisim_bilgileri: {
      create: [
        { tip: "telefon", deger: "+90 212 123 4567" },
        { tip: "email", deger: "info@example.com" }
      ]
    },
    sosyal_medya_hesaplari: {
      create: [
        { platform: "instagram", url: "https://instagram.com/example" }
      ]
    }
  },
  include: {
    iletisim_bilgileri: true,
    sosyal_medya_hesaplari: true,
    banka_hesaplari: {
      include: { hesaplar: true }
    }
  }
});
```

### Updating with Relations

```typescript
// Update company and add new contact
await prisma.firmalar.update({
  where: { slug: "example-corp" },
  data: {
    firma_adi: "Updated Name",
    iletisim_bilgileri: {
      create: { tip: "whatsapp", deger: "+90 555 123 4567" }
    }
  }
});
```

### Efficient Queries

```typescript
// Get company with all relations (optimized)
const firma = await prisma.firmalar.findUnique({
  where: { slug },
  include: {
    iletisim_bilgileri: {
      where: { aktif: true },
      orderBy: { sira: 'asc' }
    },
    sosyal_medya_hesaplari: {
      where: { aktif: true },
      orderBy: { sira: 'asc' }
    },
    banka_hesaplari: {
      where: { aktif: true },
      orderBy: { sira: 'asc' },
      include: {
        hesaplar: {
          where: { aktif: true }
        }
      }
    },
    sektor: true,
    kategori: true,
    il: true,
    ilce: true
  }
});
```

---

## Schema Management

### Location
⚠️ **IMPORTANT**: Prisma schema is at `schema.prisma` in project root (NOT in `/prisma` directory)

### Common Commands

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Push schema changes to database (development)
npx prisma db push

# Create migration (production)
npx prisma migrate dev --name migration_name

# Deploy migrations (production)
npx prisma migrate deploy

# Format schema file
npx prisma format

# Validate schema
npx prisma validate

# Open Prisma Studio (GUI)
npx prisma studio
```

### Migration Best Practices

1. **Development**: Use `prisma db push` for quick iterations
2. **Production**: Always use migrations (`prisma migrate`)
3. **Never** manually modify database in production
4. **Always** test migrations in staging first
5. **Backup** database before applying migrations

---

## Performance Considerations

### Index Usage
All frequently queried fields are indexed:
- Unique fields (`slug`, `username`, `package_key`)
- Foreign keys (all `*_id` fields)
- Filter fields (`aktif`, `onay`, `status`)
- Sort fields (`sira`, `display_order`, `created_at`)
- Composite indexes for common query patterns

### Query Optimization
- Use `include` sparingly - only fetch needed relations
- Filter inactive records (`aktif: true`) to reduce result set
- Use pagination for large datasets
- Leverage indexes in WHERE clauses
- Order by indexed fields (`sira`, `display_order`)

### Caching Strategy
See **[CRITICAL_PATTERNS.md](CRITICAL_PATTERNS.md)** for caching patterns to reduce database load.

---

## Related Documentation

- **[OVERVIEW.md](OVERVIEW.md)** - System architecture
- **[CRITICAL_PATTERNS.md](CRITICAL_PATTERNS.md)** - Database patterns (Prisma lazy-loading)
- **[../development/WORKFLOWS.md](../development/WORKFLOWS.md)** - Database change workflow

---

**Schema Version:** Prisma 6.7.0
**Database:** PostgreSQL 14+
**Last Updated:** January 2026
