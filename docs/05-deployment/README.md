# 🚀 Deployment ve DevOps

Bu bölümde Vercel ve Supabase kullanarak production deployment süreçleri, monitoring ve environment konfigürasyonları yer almaktadır.

## 📋 İçerik Listesi

### 📁 Alt Klasörler
- [`vercel/`](./vercel/) - Vercel deployment konfigürasyonu
- [`supabase/`](./supabase/) - Supabase setup ve yönetim
- [`environment/`](./environment/) - Environment variables yönetimi
- [`monitoring/`](./monitoring/) - İzleme ve logging sistemleri

### 📄 Ana Dokümantasyon
- `deployment-guide.md` - Production deployment kılavuzu
- `ci-cd-pipeline.md` - Sürekli entegrasyon ve dağıtım
- `rollback-procedures.md` - Geri alma prosedürleri
- `domain-ssl.md` - Domain ve SSL konfigürasyonu

### 🔗 İlgili Bölümler
- [Database](../04-database/) - Veritabanı konfigürasyonu
- [Security](../08-security/) - Güvenlik best practices
- [Performance → Monitoring](../10-performance/monitoring/) - Performans izleme

## 🎯 Production Environment

### Vercel Deployment
```bash
# Vercel CLI kurulumu
npm i -g vercel

# İlk deployment
vercel

# Production'a deploy
vercel --prod
```

### Supabase Configuration
```env
# Supabase Environment Variables
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
```

### Environment Variables Checklist
- ✅ `DATABASE_URL` - Supabase database connection
- ✅ `NEXTAUTH_SECRET` - Authentication secret (min 64 chars)
- ✅ `NEXTAUTH_URL` - Production domain URL
- ✅ `SUPABASE_URL` - Supabase project URL
- ✅ `SUPABASE_ANON_KEY` - Supabase anonymous key
- ✅ `NODE_ENV=production` - Environment flag
- ⚠️ `CLOUDINARY_*` - Image upload (optional)

## 🔄 Deployment Workflow

1. **Development** → Feature branch
2. **Testing** → Automated tests
3. **Staging** → Preview deployment
4. **Production** → Main branch deployment
5. **Monitoring** → Health checks

### Deployment Commands
```json
{
  "build": "prisma generate && next build",
  "start": "next start",
  "postinstall": "prisma generate"
}
```

## 📊 Monitoring & Health Checks

### Health Check Endpoint
```javascript
// /api/health/route.ts
GET /api/health
Response: {
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-08-25T10:00:00Z"
}
```

### Monitoring Metrics
- Response time
- Database connection
- Error rates  
- Memory usage
- Request volume

---
*Son güncelleme: 2025-08-25*