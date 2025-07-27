# 🛠️ Production Troubleshooting Guide

## 🎯 Common Production Issues & Solutions

### 1. 🚨 NEXT_NOT_FOUND Errors on Dynamic Pages

**Symptoms:**
- Dynamic pages (`/[slug]`) return 404 in production
- Pages work perfectly in localhost
- Error message: `NEXT_NOT_FOUND` in Vercel logs

**Root Causes & Solutions:**

#### **A. Missing Environment Variables**
```bash
# Check with debug endpoint
GET /api/env-debug

# Expected response:
{
  "hasDatabase": true,
  "databaseUrl": "SET",
  "environment": "production"
}

# If hasDatabase: false, add to Vercel:
DATABASE_URL=postgres://postgres.rlhqnrfhjumbkxghyocd:3x8uwLJT9NDfKdL@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
```

#### **B. Internal API Call Failures**
```typescript
// ❌ PROBLEMATIC: Internal API calls in serverless
const response = await fetch(`${baseUrl}/api/sayfalar/${slug}`);

// ✅ SOLUTION: Direct database access
const { default: prisma } = await import('@/app/lib/db');
const firma = await prisma.firmalar.findFirst({
  where: { slug: { equals: slug, mode: 'insensitive' } }
});
```

#### **C. Case Sensitivity Issues**
```sql
-- ❌ Case-sensitive (fails for different cases)
WHERE slug = 'Example-Slug'

-- ✅ Case-insensitive (works for all cases)  
WHERE slug = { equals: slug, mode: 'insensitive' }
```

### 2. 🔌 Database Connection Issues

**Symptoms:**
- API endpoints return 500 errors
- "Database connection failed" in logs
- Prisma client errors

**Debug Steps:**
```bash
# Test database connectivity
GET /api/test-slug

# Check environment
GET /api/env-debug

# Verify Supabase status
# Check https://status.supabase.com/
```

**Solution Checklist:**
- ✅ `DATABASE_URL` set in Vercel
- ✅ Supabase project is active
- ✅ Database credentials are correct
- ✅ SSL mode is required for production

### 3. 🔐 Authentication Issues

**Symptoms:**
- Login/logout not working
- Session errors
- NextAuth configuration errors

**Environment Variables Required:**
```bash
NEXTAUTH_SECRET=Re4l7gbgNto8Mc2aNVyJBCYnRJu5tuf0vuvlKqMNE3lRWsvpSnDTDMCcJeLlwvQL
NEXTAUTH_URL=https://sanalkartvizitim.vercel.app
```

**Debug:**
```bash
# Check auth configuration
GET /api/auth/providers

# Test auth endpoints
GET /api/auth/session
```

### 4. ⚡ Performance Issues

**Symptoms:**
- Slow page load times
- Timeout errors
- High resource usage

**Solutions:**
- Use direct database access instead of internal API calls
- Implement proper caching strategies
- Optimize database queries
- Monitor with Vercel Analytics

### 5. 🌐 URL Generation Issues

**Symptoms:**
- Incorrect URLs in production
- API calls to wrong endpoints
- Base URL resolution failures

**Solution:**
```typescript
// Fixed getServerBaseUrl function
export function getServerBaseUrl(headers?: Headers): string {
  // Priority for Vercel production
  if (process.env.VERCEL_URL && process.env.NODE_ENV === 'production') {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  if (headers) {
    const host = headers.get('host');
    const protocol = headers.get('x-forwarded-proto') || 'http';
    if (host) return `${protocol}://${host}`;
  }
  
  return getBaseUrl();
}
```

## 🔧 Debug Tools

### Production Debug Endpoints:

1. **Environment Check:** `/api/env-debug`
   - Verifies environment variables
   - Shows configuration status

2. **Database Test:** `/api/test-slug`
   - Tests database connectivity
   - Shows sample data
   - Verifies slug queries

3. **Health Check:** `/api/health`
   - Overall system status
   - Component health checks

4. **System Info:** `/api/monitoring`
   - Performance metrics
   - Resource usage

## 🚀 Deployment Checklist

### Before Deployment:
- [ ] All environment variables set in Vercel
- [ ] Database connection tested locally
- [ ] Build passes without errors
- [ ] No TypeScript/ESLint errors

### After Deployment:
- [ ] Test `/api/env-debug` (should show all variables as SET)
- [ ] Test `/api/test-slug` (should connect to database)
- [ ] Test dynamic pages with known slugs
- [ ] Verify authentication works
- [ ] Check Vercel function logs for errors

### Vercel Environment Variables Setup:
```bash
# Required for all environments (Production, Preview, Development):
DATABASE_URL=postgres://postgres.rlhqnrfhjumbkxghyocd:3x8uwLJT9NDfKdL@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
SUPABASE_URL=https://rlhqnrfhjumbkxghyocd.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsaHFucmZoanVtYmt4Z2h5b2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NjQ0MTUsImV4cCI6MjA2OTE0MDQxNX0.H4zO6N35FEJh0Ua1pufu36qQRHqAvfVsjzCqUX-_F1k
NEXTAUTH_SECRET=Re4l7gbgNto8Mc2aNVyJBCYnRJu5tuf0vuvlKqMNE3lRWsvpSnDTDMCcJeLlwvQL
NEXTAUTH_URL=https://sanalkartvizitim.vercel.app
```

## 📞 Emergency Procedures

### Critical Production Issues:
1. **Check Vercel Function Logs** - Real-time error monitoring
2. **Verify Database Status** - Supabase dashboard health
3. **Test Debug Endpoints** - Systematic issue identification
4. **Rollback if Necessary** - Previous working deployment
5. **Monitor Performance** - Post-fix validation

### Communication Protocol:
- Document all issues and resolutions
- Update troubleshooting guides
- Share learnings with team
- Implement prevention measures

**Last Updated:** 27 Temmuz 2025  
**Maintainer:** SuperClaude Framework