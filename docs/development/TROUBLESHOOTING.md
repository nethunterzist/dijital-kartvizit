# Troubleshooting Guide

Common issues and solutions for the Dijital Kartvizit project.

---

## Build-Time Issues

### Issue: Prisma Client Not Initialized

**Error:**
```
@prisma/client did not initialize yet
```

**Cause:** Module-level `new PrismaClient()` instantiation

**Solution:**
```typescript
// ❌ Wrong
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ Correct
import { prisma } from '@/app/lib/db';
```

See [CRITICAL_PATTERNS.md](../architecture/CRITICAL_PATTERNS.md#pattern-1-prisma-lazy-loading)

---

### Issue: Database Relation Error During Build

**Error:**
```
relation "firmalar" does not exist
```

**Cause:** Database queries during build (sitemap, static pages)

**Solution:** Already handled with graceful degradation. If persists:

```bash
# Ensure database is accessible
psql $DATABASE_URL

# Regenerate Prisma Client
npx prisma generate

# Rebuild
npm run build
```

---

### Issue: TypeScript Errors Prevent Build

**Error:**
```
Type error: Property 'x' does not exist
```

**Solution:**
```bash
# Check all errors
npm run type-check

# Fix errors in code
# Then rebuild
npm run build
```

---

## Runtime Issues

### Issue: 502 Bad Gateway

**Symptoms:** Site shows 502 error

**Causes & Solutions:**

1. **Container crashed:**
   ```bash
   # Check logs
   docker logs [container-id] --tail 100

   # Restart container
   docker restart [container-id]
   ```

2. **Environment variables missing:**
   ```bash
   # Verify in Coolify dashboard
   # Check DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
   ```

3. **Database connection failed:**
   ```bash
   # Test database
   docker exec -it [db-container] psql -U postgres -c "SELECT 1;"
   ```

---

### Issue: Database Connection Error

**Error:**
```
Can't reach database server
```

**Solutions:**

1. **Check database is running:**
   ```bash
   docker ps | grep postgres
   ```

2. **Verify DATABASE_URL:**
   ```bash
   echo $DATABASE_URL
   # Should be: postgresql://user:pass@host:5432/database
   ```

3. **Test connection:**
   ```bash
   psql $DATABASE_URL -c "SELECT version();"
   ```

---

### Issue: File Upload Fails

**Error:**
```
File upload failed
```

**Solutions:**

**Development (Local Storage):**
```bash
# Ensure upload directory exists
mkdir -p public/uploads/{profiles,logos,catalogs,banks}

# Check permissions
chmod 755 public/uploads
```

**Production (Cloudinary):**
```bash
# Verify environment variables
echo $CLOUDINARY_CLOUD_NAME
echo $CLOUDINARY_API_KEY
echo $CLOUDINARY_API_SECRET

# Test credentials
curl -X POST "https://api.cloudinary.com/v1_1/$CLOUDINARY_CLOUD_NAME/image/upload" \
  -F "file=@test-image.jpg" \
  -F "upload_preset=unsigned"
```

**Common Cloudinary Issues:**

1. **401 Unauthorized Error:**
   - Check API credentials are correct
   - Verify `CLOUDINARY_API_SECRET` is set
   - Ensure Cloudinary account is active

2. **Access Denied (x-cld-error: deny or ACL failure):**
   - Login to Cloudinary Dashboard → Settings → Security
   - Disable "Strict transformations"
   - Set "Restricted media types" → RAW files to public
   - Or create an unsigned upload preset

3. **Files Lost After Container Restart:**
   - **Symptom**: PDFs show local paths `/uploads/firma_kataloglari/...` and return 404
   - **Cause**: Local storage is ephemeral in Docker containers
   - **Solution**: Ensure Cloudinary credentials are set in production
   - **Fix**: Admin must re-upload PDFs through admin panel

**⚠️ CRITICAL**: Never fallback to local storage when Cloudinary fails in production. The upload strategy enforces this (see `LocalFileUploadService.ts:266-281`). Local files are lost on container restart.

---

### Issue: Cache Errors

**Error:**
```
KV cache unavailable
```

**Solution:** Redis cache is optional. App continues without it.

To fix:
```bash
# Verify Redis credentials
echo $KV_URL
echo $KV_REST_API_URL
echo $KV_REST_API_TOKEN

# Test connection
curl -X GET "$KV_REST_API_URL/get/test-key" \
  -H "Authorization: Bearer $KV_REST_API_TOKEN"
```

---

## Development Issues

### Issue: npm run dev Fails

**Error:**
```
Error: Cannot find module
```

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json .next
npm install
npx prisma generate
npm run dev
```

---

### Issue: Port 3000 Already in Use

**Error:**
```
EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Option 1 - Kill process:**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

**Option 2 - Use different port:**
```bash
PORT=3001 npm run dev
```

---

### Issue: Prisma Schema Changes Not Reflecting

**Symptoms:** Database changes not visible in code

**Solution:**
```bash
# 1. Push schema changes
npx prisma db push

# 2. Regenerate client
npx prisma generate

# 3. Restart dev server
# Ctrl+C then npm run dev
```

---

### Issue: Hot Reload Not Working

**Symptoms:** Code changes not reflecting without restart

**Solutions:**

1. **Check file watcher limits (Linux):**
   ```bash
   # Increase limit
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

2. **Restart dev server:**
   ```bash
   # Ctrl+C
   npm run dev
   ```

---

## Production Issues

### Issue: Environment Variables Not Applied

**Symptoms:** Features not working in production

**Solution:**

1. **Check Coolify environment variables:**
   - Open Coolify dashboard
   - Application → Environment Variables
   - Verify all required variables set

2. **Redeploy:**
   - Changes to env vars require redeploy
   - Click "Redeploy" in Coolify

---

### Issue: Build Succeeds but Site Down

**Symptoms:** Build completes but 502 error

**Diagnostics:**

```bash
# 1. Check container status
docker ps | grep [app-name]

# 2. Check container logs
docker logs [container-id] --tail 50

# 3. Check container health
docker inspect [container-id] | grep -A 10 Health
```

**Common Causes:**
- Port mismatch (should be 3000)
- Missing environment variables
- Database connection failed
- Out of memory

---

### Issue: Admin Can't Login

**Symptoms:** Invalid credentials error

**Solutions:**

1. **Reset admin password:**
   ```bash
   # Connect to database
   docker exec -it [db-container] psql -U postgres

   # Check admin exists
   SELECT * FROM admins;

   # If no admin, create via health endpoint
   curl https://yourdomain.com/api/health
   ```

2. **Verify NEXTAUTH_SECRET:**
   ```bash
   # Must be same secret used to create session
   echo $NEXTAUTH_SECRET
   ```

---

## Database Issues

### Issue: Migration Failed

**Error:**
```
Migration [name] failed to apply
```

**Solution:**

1. **Check migration status:**
   ```bash
   npx prisma migrate status
   ```

2. **Resolve migration:**
   ```bash
   # Mark as applied (if already applied manually)
   npx prisma migrate resolve --applied [migration-name]

   # Or rollback
   npx prisma migrate resolve --rolled-back [migration-name]
   ```

3. **Reset if development:**
   ```bash
   npx prisma migrate reset
   ```

---

### Issue: Database Full

**Error:**
```
disk quota exceeded
```

**Solution:**

```bash
# Check database size
psql $DATABASE_URL -c "
  SELECT pg_database.datname,
         pg_size_pretty(pg_database_size(pg_database.datname))
  FROM pg_database
  ORDER BY pg_database_size(pg_database.datname) DESC;
"

# Clean up old data
# Archive or delete old records
```

---

## Performance Issues

### Issue: Slow Page Load

**Diagnostics:**

```bash
# 1. Check bundle size
ANALYZE=true npm run build

# 2. Run Lighthouse audit
npx lighthouse https://yourdomain.com --view

# 3. Check database queries
# Enable query logging in Prisma
```

**Solutions:**
- Implement caching (see [CRITICAL_PATTERNS.md](../architecture/CRITICAL_PATTERNS.md#pattern-3-two-tier-caching))
- Optimize images (WebP, proper sizing)
- Add indexes to frequently queried fields
- Use pagination for large datasets

---

### Issue: High Memory Usage

**Symptoms:** Container restarts, out of memory errors

**Solutions:**

1. **Check memory usage:**
   ```bash
   docker stats [container-id]
   ```

2. **Optimize:**
   - Clear cache periodically
   - Optimize Prisma queries (use `select` instead of full models)
   - Implement pagination
   - Increase container memory limit

---

## Security Issues

### Issue: Rate Limit Not Working

**Symptoms:** Spam requests getting through

**Solution:**

```typescript
// Verify rate limiter configured
// app/lib/rateLimit.ts should be imported in auth routes

// Check logs for rate limit errors
```

---

### Issue: CORS Errors

**Error:**
```
CORS policy: No 'Access-Control-Allow-Origin' header
```

**Solution:**

```typescript
// next.config.js
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
      ],
    },
  ];
}
```

---

## Getting Help

If issue persists:

1. **Check logs:**
   ```bash
   # Development
   # Check terminal output

   # Production
   docker logs [container-id] -f
   ```

2. **Review documentation:**
   - [Architecture](../architecture/OVERVIEW.md)
   - [Critical Patterns](../architecture/CRITICAL_PATTERNS.md)
   - [API Documentation](../api/ENDPOINTS.md)

3. **Search codebase:**
   ```bash
   grep -r "error message" .
   ```

---

**Last Updated:** January 2026
