# 🏗️ Sistem Mimarisi

## 📐 Genel Mimari Yapısı

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  Web Browser (Desktop/Mobile)  │  QR Code Scanners             │
│  - Responsive Design           │  - Mobile Cameras              │
│  - Touch/Mouse Support         │  - QR Reader Apps              │
└─────────────────────────────────────────────────────────────────┘
                                    │
                               ┌────▼────┐
                               │ NGINX   │
                               │ Reverse │
                               │ Proxy   │
                               └────┬────┘
                                    │
┌─────────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│              Next.js 14 Application Server                     │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   Frontend  │  │  API Routes │  │ Middleware  │           │
│  │             │  │             │  │             │           │
│  │ • React 18  │  │ • REST API  │  │ • Auth      │           │
│  │ • TypeScript│  │ • Validation│  │ • CORS      │           │
│  │ • Tailwind  │  │ • Error     │  │ • Rate      │           │
│  │ • Components│  │   Handling  │  │   Limiting  │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              SERVICE LAYER                              │   │
│  │                                                         │   │
│  │ • Service Registry (Lazy Loading)                      │   │
│  │ • Auth Service • File Upload Service                   │   │
│  │ • Firma Service • Form Data Parser                     │   │
│  │ • Post Processing • Cache Invalidation                 │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │ PostgreSQL  │  │File Storage │  │External APIs│           │
│  │ Database    │  │             │  │             │           │
│  │             │  │ • Uploads   │  │ • QR Gen    │           │
│  │ • Prisma    │  │ • Logos     │  │ • vCard     │           │
│  │ • Relations │  │ • Catalogs  │  │ • Templates │           │
│  │ • Indexes   │  │ • Profiles  │  │             │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow Mimarisi

### 1. **Kullanıcı Kartvizit Görüntüleme**
```
User Request → NGINX → Next.js → [slug]/page.tsx → 
Database Query (via Prisma) → Template Engine → 
HTML Generation → Response
```

### 2. **Admin Panel İşlemleri**
```
Admin Login → NextAuth → Admin Routes → 
Service Layer → Database Operations → 
Cache Invalidation → Response
```

### 3. **Dosya Upload İşlemi**
```
File Upload → Multer → File Validation → 
Local Storage → Database Record → 
Post Processing → Response
```

## 📊 Bileşen Detayları

### Frontend Architecture

#### **React Component Hierarchy**
```
App Layout
├── Navbar (Global Navigation)
├── AuthProvider (Authentication Context)
├── ErrorBoundary (Error Handling)
└── Page Components
    ├── [slug]/page.tsx (Business Card Display)
    ├── admin/* (Admin Panel)
    └── Static Pages (Home, About, etc.)
```

#### **Template System Architecture**
```
Template Registry
├── Template Info (Metadata)
├── Template Functions
│   ├── template1-gold.ts
│   ├── template2-waves.ts
│   └── template[n].ts
└── Template Base (Common Functions)
```

#### **State Management**
- **React Context**: Authentication, Global State
- **SWR/React Query**: Server State Management
- **Local State**: Component-level state
- **Form State**: Form handling and validation

### Backend Architecture

#### **API Route Structure**
```
/api
├── /auth (NextAuth endpoints)
├── /firmalar (Business CRUD operations)
│   ├── /[id] (Individual business operations)
│   ├── /by-slug/[slug] (Slug-based queries)
│   └── /slug/[slug] (Slug management)
├── /upload (File upload handling)
├── /sayfalar/[slug] (Page generation)
├── /qr-codes/[slug] (QR code generation)
├── Geographic Data APIs
│   ├── /iller (Cities)
│   ├── /ilceler (Districts)
│   ├── /kategoriler (Categories)
│   └── /sektorler (Sectors)
├── /settings (Configuration)
└── /monitoring (Health checks)
```

#### **Service Layer Pattern**
```typescript
ServiceRegistry (Singleton)
├── Lazy Loading Pattern
├── Service Caching
├── Error Management
└── Memory Optimization

Services:
├── AuthService (Authentication logic)
├── FirmaService (Business operations)
├── FileUploadService (File handling)
├── FormDataParser (Data processing)
├── PostProcessingService (After operations)
└── CacheInvalidationService (Cache management)
```

### Database Architecture

#### **Core Tables Structure**
```sql
firmalar (businesses)
├── Basic Info (id, firma_adi, slug, etc.)
├── Contact Info → IletisimBilgisi (1:N)
├── Social Media → SosyalMedyaHesabi (1:N)
├── Bank Accounts → BankaHesabi (1:N)
│   └── Account Details → BankaHesapDetay (1:N)
├── Geographic Relations
│   ├── → iller (N:1)
│   ├── → ilceler (N:1)
│   ├── → kategoriler (N:1)
│   └── → sektorler (N:1)
└── Template Settings
```

#### **Relationship Patterns**
- **One-to-Many**: Firma → Contact Info, Social Media, Bank Accounts
- **Many-to-One**: Firma → Geographic data (City, District, Category, Sector)
- **One-to-Many-to-Many**: Firma → BankaHesabi → BankaHesapDetay
- **Cascade Deletion**: ON DELETE CASCADE for related records

## 🔒 Güvenlik Mimarisi

### Authentication & Authorization
```
Request → Middleware → NextAuth → 
JWT Verification → Role Check → Route Access
```

### Input Validation
```
Client Input → Form Validation → 
API Validation (Zod) → Sanitization → 
Database Operation
```

### File Upload Security
```
File Upload → MIME Type Check → 
File Size Validation → Virus Scan → 
Safe Storage → Database Record
```

## ⚡ Performance Architecture

### Caching Strategy
```
┌─────────────────┐
│   Browser Cache │ ← Static Assets (Images, CSS, JS)
├─────────────────┤
│   CDN Cache     │ ← Public Files, Images
├─────────────────┤
│Application Cache│ ← Template HTML, Computed Data
├─────────────────┤
│Database Cache   │ ← Query Results, Connection Pool
└─────────────────┘
```

### Optimization Patterns
- **Lazy Loading**: Service Registry, Components
- **Code Splitting**: Dynamic imports for templates
- **Image Optimization**: Next.js Image component
- **Database Optimization**: Indexes, Query optimization

## 🔄 Data Flow Patterns

### Business Card Generation Flow
```
1. Database Query (Firma + Relations)
   ↓
2. Data Transformation (Service Layer)
   ↓
3. Template Selection (Based on template_id)
   ↓
4. HTML Generation (Handlebars)
   ↓
5. CSS Injection (Template-specific styles)
   ↓
6. Response (Complete HTML page)
```

### File Upload Flow
```
1. Client Upload Request
   ↓
2. Multer Middleware (File parsing)
   ↓
3. File Validation (Type, Size, Security)
   ↓
4. Unique Filename Generation
   ↓
5. Storage (Local filesystem)
   ↓
6. Database Record (File metadata)
   ↓
7. Post-processing (Thumbnails, optimization)
```

## 📦 Deployment Architecture

### Docker Container Structure
```
Docker Container
├── Node.js Runtime
├── Next.js Application
├── Static Files
└── Volume Mounts
    └── /app/public/uploads ← Persistent storage
```

### Production Environment
```
Internet → NGINX (SSL, Gzip) → 
Docker Container (App) → 
PostgreSQL (Database) → 
File System (Uploads)
```

## 🔧 Configuration Management

### Environment-based Configuration
- **Development**: Local PostgreSQL, Local file storage
- **Production**: Remote PostgreSQL, Volume-mounted storage
- **Docker**: Container-optimized settings

### Feature Flags
- Template system enable/disable
- Upload size limits
- Rate limiting configurations
- Cache TTL settings

## 📈 Scalability Considerations

### Horizontal Scaling
- Stateless application design
- External database
- Shared file storage solutions
- Load balancer ready

### Vertical Scaling
- Efficient memory usage
- Optimized database queries
- Lazy loading patterns
- Resource cleanup

---

> 📝 **Not**: Bu mimari, sürekli geliştirme ve optimizasyon için tasarlanmıştır. Değişiklikler için teknik ekiple koordinasyon sağlanmalıdır.