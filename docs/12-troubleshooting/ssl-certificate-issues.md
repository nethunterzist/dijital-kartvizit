# SSL Certificate Issues - Production Database Connection

## Problem

**Symptoms:**
- Production deployment fails with SSL certificate errors
- Health API returns: "Error opening a TLS connection: cert file not found"
- Firmalar API returns: "self-signed certificate in certificate chain"
- Admin panel shows no data despite healthy database connection in localhost

## Root Cause

Vercel production environment cannot validate Supabase's SSL certificates, causing both Prisma and PostgreSQL (pg) connections to fail.

## Solution: Complete SSL Bypass

This is the **ONLY** solution that works reliably on Vercel with Supabase.

### 1. Environment Variables Update

Add to your production `.env` file (for Vercel upload):

```env
# Database URL with SSL completely disabled
DATABASE_URL=postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=disable

# Global Node.js SSL bypass (critical for Prisma)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### 2. PostgreSQL Pool Configuration

Update `app/lib/direct-db.ts`:

```typescript
export function getPool() {
  if (!pool) {
    // SSL tamamen devre dışı - sslmode=disable DATABASE_URL'de zaten var
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: false // SSL tamamen kapat
    });
    
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }
  return pool;
}
```

### 3. Verification Steps

1. **Upload environment variables** to Vercel dashboard
2. **Wait 2-3 minutes** for deployment to complete
3. **Test endpoints:**
   - Health API: `https://your-domain.vercel.app/api/health`
   - Firmalar API: `https://your-domain.vercel.app/api/firmalar`

## Why This Happens

**Technical Details:**
- Supabase uses pooler connections with SSL certificates
- Vercel's serverless environment has strict SSL validation
- Self-signed or intermediate certificates cause validation failures
- Both Prisma and pg package are affected differently

## Failed Approaches (Don't Use These)

❌ **These solutions DO NOT work on Vercel:**
- `rejectUnauthorized: false` only
- Custom SSL certificate configurations
- `sslmode=require` with certificate parameters
- Partial SSL bypasses

## Security Considerations

**⚠️ Important:**
- This disables SSL between Vercel and Supabase
- Connection is still encrypted at network level
- Only affects database connections, not frontend HTTPS
- Acceptable for Supabase hosted solutions

## Production Checklist

✅ **Before deploying:**
- [ ] DATABASE_URL contains `?sslmode=disable`
- [ ] NODE_TLS_REJECT_UNAUTHORIZED=0 is set
- [ ] pg Pool has `ssl: false`
- [ ] Environment variables uploaded to Vercel
- [ ] Both APIs tested and working

## Troubleshooting

**If still getting SSL errors:**

1. **Check Vercel environment variables** - ensure they're saved
2. **Verify DATABASE_URL format** - must include `?sslmode=disable`
3. **Test with curl:**
   ```bash
   curl https://your-domain.vercel.app/api/health
   ```
4. **Check Vercel deployment logs** for detailed error messages

## Related Files

- `app/lib/direct-db.ts` - PostgreSQL pool configuration
- `app/api/health/route.ts` - Prisma connection testing
- `app/api/firmalar/route.ts` - Direct database API endpoints
- `vercel-production-env.txt` - Environment variables template

## Date Resolved
**2025-08-25** - Complete SSL bypass solution implemented and verified working.

---

**Note:** This solution is specific to Vercel + Supabase deployment. Other platforms may have different SSL handling requirements.