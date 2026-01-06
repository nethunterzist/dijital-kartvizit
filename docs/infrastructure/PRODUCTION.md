# Production Deployment Guide

Comprehensive guide for deploying the Dijital Kartvizit platform to production using Hetzner + Coolify + Docker.

---

## Overview

**Live Site**: https://dijitalkartvizitmerkezi.com

**Infrastructure Stack**:
- **Hosting**: Hetzner Cloud Server (157.180.78.53)
- **Platform**: Coolify v4.0.0-beta.460 (Self-hosted PaaS)
- **Build System**: Nixpacks v1.41.0
- **Container Runtime**: Docker
- **Database**: PostgreSQL 14+ (Docker container)
- **Reverse Proxy**: Traefik (automatic HTTPS)
- **SSL**: Let's Encrypt (automatic renewal)
- **Cache**: Upstash Redis KV
- **File Storage**: Cloudinary

---

## Prerequisites

### Server Requirements
```
OS: Ubuntu 22.04 LTS
RAM: 4GB minimum (8GB recommended)
Storage: 80GB SSD minimum
CPU: 2 cores minimum
```

### Required Accounts
- Hetzner Cloud account
- Domain registrar access (for DNS configuration)
- Upstash account (for Redis cache - optional)
- Cloudinary account (for file storage - optional)
- GitHub account (for repository access)

---

## Step 1: Hetzner Server Setup

### 1.1 Create Server

**Hetzner Cloud Console**:
1. Create new project
2. Add server with specifications:
   - Location: Choose closest to target audience
   - OS: Ubuntu 22.04 LTS
   - Type: CX21 or higher (2 vCPU, 4GB RAM)
   - Volume: 80GB SSD
   - SSH key: Add your public key

**Server Details**:
```
Server IP: 157.180.78.53 (example)
SSH Access: ssh root@157.180.78.53
Firewall: Allow ports 80, 443, 8000, 22
```

### 1.2 Initial Server Configuration

```bash
# Connect to server
ssh root@157.180.78.53

# Update system
apt update && apt upgrade -y

# Install basic utilities
apt install -y curl wget git

# Configure firewall
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 8000/tcp  # Coolify dashboard
ufw enable
```

---

## Step 2: Coolify Installation

### 2.1 Install Coolify

```bash
# Run Coolify installation script
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash

# Installation completes in ~5 minutes
# Coolify dashboard available at: http://157.180.78.53:8000
```

### 2.2 Initial Coolify Setup

**Access Coolify Dashboard**:
```
URL: http://157.180.78.53:8000
```

**Create Admin Account**:
- Email: admin@yourdomain.com
- Password: [secure password]
- Team: Root Team (default)

**Configure Server**:
- Coolify automatically configures localhost as the default server
- Verify server status: Dashboard → Servers → localhost

---

## Step 3: Application Configuration in Coolify

### 3.1 Create New Application

**Coolify Dashboard → New Resource → Application**

**Git Configuration**:
```
Source: GitHub
Repository URL: https://github.com/yourusername/sanalkartvizitim
Branch: main
Build Pack: Nixpacks (auto-detected)
```

**Destination**:
```
Server: localhost
Destination: localhost-coolify
```

### 3.2 Environment Variables Setup

**Required Environment Variables** (Add in Coolify → Application → Environment):

#### Database (Critical)
```env
DATABASE_URL="postgresql://postgres:[password]@[container-id]:5432/postgres"
```
*Note: Coolify auto-creates database container and provides this URL*

#### NextAuth (Critical)
```env
NEXTAUTH_SECRET="[64+ character random string]"
NEXTAUTH_URL="https://yourdomain.com"
```

**Generate NEXTAUTH_SECRET**:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

#### Node Environment
```env
NODE_ENV="production"
```

#### Optional Services

**Upstash Redis (Cache)**:
```env
KV_URL="rediss://default:[token]@[endpoint].upstash.io:6379"
KV_REST_API_URL="https://[endpoint].upstash.io"
KV_REST_API_TOKEN="[your-token]"
```

**Cloudinary (File Storage)**:
```env
CLOUDINARY_CLOUD_NAME="[your-cloud-name]"
CLOUDINARY_API_KEY="[your-api-key]"
CLOUDINARY_API_SECRET="[your-api-secret]"
```

### 3.3 Build Configuration

Coolify uses Nixpacks and auto-detects the build configuration from `package.json`:

**Auto-detected Build Plan**:
```yaml
phases:
  setup:
    nixPkgs: [nodejs_22, npm-9_x, openssl]
  install:
    cmds: ["npm ci"]
  build:
    cmds: ["npm run build"]  # Runs: prisma generate && next build
start:
  cmd: "next start"
```

**Build Script** (already in package.json):
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "start": "prisma generate && next start",
    "postinstall": "prisma generate"
  }
}
```

---

## Step 4: Domain and SSL Configuration

### 4.1 Configure Domain in Coolify

**Coolify → Application → Configuration → Domain**

**Change from default to custom domain**:
```
Old: http://[random-string].157.180.78.53.sslip.io
New: https://yourdomain.com
```

### 4.2 DNS Configuration

**Add DNS Records** (at your domain registrar):

**A Records**:
```dns
Type: A
Name: @
Content: 157.180.78.53
TTL: Auto (or 3600)

Type: A
Name: www
Content: 157.180.78.53
TTL: Auto (or 3600)
```

**Verify DNS Propagation**:
```bash
# Online tool
https://dnschecker.org

# Command line
nslookup yourdomain.com
dig yourdomain.com
```

**Expected Wait Time**: 5-30 minutes (typically 5-10 minutes)

### 4.3 SSL Certificate (Automatic)

Coolify + Traefik automatically provision Let's Encrypt SSL certificates:

**Automatic Process**:
1. DNS records propagated
2. First HTTPS request received
3. Traefik requests certificate from Let's Encrypt
4. Certificate installed and auto-renewed every 90 days

**Traefik Labels** (auto-added by Coolify):
```yaml
traefik.enable: true
traefik.http.middlewares.redirect-to-https.redirectscheme.scheme: https
traefik.http.routers.https-app.rule: Host(`yourdomain.com`)
traefik.http.routers.https-app.entrypoints: https
traefik.http.routers.https-app.tls.certresolver: letsencrypt
```

**Verify SSL**:
```bash
curl -I https://yourdomain.com

# Expected headers:
# HTTP/2 200
# strict-transport-security: max-age=31536000
```

---

## Step 5: Initial Deployment

### 5.1 Deploy Application

**Coolify → Application → Deploy**

**Deployment Process**:
```
[00:00] Clone repository (main branch)
[00:06] Generate Nixpacks build plan
[00:10] Start Docker build
[01:14] npm ci (695 packages)
[01:18] prisma generate (591ms)
[01:20] npm run build
[02:44] Collecting page data
[02:52] Database error gracefully handled
[02:55] Generating static pages (13/13)
[03:18] Build completed (119 seconds)
[03:51] Export Docker image
[03:54] Start container
[03:56] Remove old container
[03:56] Deployment SUCCESS!
```

**Total Deployment Time**: ~4 minutes

### 5.2 Verify Deployment

**Check Application**:
```bash
# Site health check
curl https://yourdomain.com/api/health

# Expected response:
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-01-02T12:00:00.000Z"
}
```

**Check Container**:
```bash
# View running containers
docker ps | grep [app-name]

# View container logs
docker logs [container-id] -f
```

---

## Critical Build-Time Patterns

### Pattern 1: Prisma Client Lazy Loading

**Problem**: Module-level `new PrismaClient()` causes build-time errors

**Solution**: Always use centralized lazy-loading pattern

```typescript
// ❌ WRONG - Module-level instantiation
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ CORRECT - Lazy-loading pattern
import { prisma } from '@/app/lib/db';
```

**Implementation** (app/lib/db.ts):
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getPrismaClient() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client;
  }

  return client;
}

// Proxy pattern for lazy initialization
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrismaClient();
    return client[prop as keyof PrismaClient];
  }
});
```

### Pattern 2: Graceful Database Degradation

**Problem**: Sitemap and static pages require database during build

**Solution**: Return empty data during build, populate at runtime

**Implementation** (app/lib/direct-db.ts):
```typescript
export async function getAllFirmalar(search?: string, page = 1, limit = 1000) {
  try {
    const client = await getPool().connect();
    try {
      // ... query logic
      return { data, total, page, limit, totalPages };
    } finally {
      client.release();
    }
  } catch (error) {
    // Graceful degradation for build-time database unavailability
    console.error('Database query error (possibly during build):', error);
    return {
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 0
    };
  }
}
```

**Result**:
- Build succeeds even without database connection
- Sitemap generated with empty data during build
- Populated dynamically at runtime

---

## Docker Container Configuration

### Container Details
```
Container Name: [app-id]-[timestamp]
Image: [app-id]:[commit-hash]
Network: coolify (internal)
Port: 3000 (internal)
Restart Policy: unless-stopped
```

### Environment Variables (Runtime)
```env
SOURCE_COMMIT=[commit-hash]
COOLIFY_URL=https://yourdomain.com
COOLIFY_FQDN=yourdomain.com
COOLIFY_BRANCH=main
DATABASE_URL=postgres://postgres:[password]@[db-container]:5432/postgres
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
```

### Docker Compose Structure

Coolify auto-generates docker-compose.yml:
```yaml
version: '3.8'
services:
  app:
    image: [app-id]:[commit-hash]
    container_name: [app-id]-[timestamp]
    restart: unless-stopped
    networks:
      - coolify
    environment:
      - DATABASE_URL
      - NEXTAUTH_SECRET
      - NEXTAUTH_URL
      - NODE_ENV=production
    labels:
      - traefik.enable=true
      - traefik.http.routers.https-app.rule=Host(`yourdomain.com`)
      - traefik.http.routers.https-app.entrypoints=https
      - traefik.http.routers.https-app.tls.certresolver=letsencrypt

networks:
  coolify:
    external: true
```

---

## Subsequent Deployments

### Standard Workflow

**1. Make Code Changes**:
```bash
git add .
git commit -m "feat: new feature added"
git push origin main
```

**2. Deploy via Coolify**:
- **Option A**: Automatic deployment (if webhook configured) ✅ **Recommended**
  - GitHub webhook automatically triggers deployment on `git push`
  - Zero manual intervention required
  - See: [Webhook Setup Guide](WEBHOOK_SETUP_GUIDE.md) for configuration
- **Option B**: Manual deployment via Coolify dashboard → Redeploy
  - Login to Coolify dashboard (http://157.180.78.53:8000)
  - Click "Redeploy" button
  - Only use when webhook is not configured

**3. Deployment Process**:
- Automatic build starts
- New Docker image created
- Old container stops
- New container starts (zero-downtime deployment)

**4. Verification**:
```bash
# Check site
curl -I https://yourdomain.com

# Check logs
# Via Coolify dashboard: Application → Deployment → Latest → Logs
```

### Rollback Procedure

**If deployment fails**:
```bash
# Via Coolify dashboard
Application → Deployment → Previous Successful Deployment → Redeploy

# Or via Docker (manual)
docker ps -a  # Find previous container
docker start [previous-container-id]
docker stop [failed-container-id]
```

---

## Production Checklist

### Pre-Deployment

- [ ] All environment variables configured in Coolify
- [ ] Database container created and running
- [ ] DNS records added and propagated
- [ ] SSL certificate auto-generated
- [ ] Local build successful (`npm run build`)
- [ ] GitHub webhook configured for automatic deployments (recommended)
  - See: [Webhook Setup Guide](WEBHOOK_SETUP_GUIDE.md)
- [ ] All tests passing (`npm test`)

### Post-Deployment

- [ ] Site accessible at production URL
- [ ] Health check endpoint responding (`/api/health`)
- [ ] Database connection verified
- [ ] Admin login working
- [ ] File uploads working (Cloudinary/local)
- [ ] Cache working (Redis/fallback)
- [ ] Container logs clean (no errors)

### Security Hardening

- [ ] Change default admin password (admin/admin123)
- [ ] Verify HTTPS enforced (HTTP → HTTPS redirect)
- [ ] Review security headers in browser DevTools
- [ ] Configure firewall rules (UFW)
- [ ] Set up database backups (Coolify)
- [ ] Configure container resource limits

---

## Performance Metrics

### Build Metrics
```
Dependencies install: ~76 seconds (695 packages)
Prisma generate: ~600ms
Next.js build: ~119 seconds
Docker image size: ~800MB
Total deployment time: ~4 minutes
```

### Runtime Performance
```
Container start time: <2 seconds
First request: <500ms
Subsequent requests: <100ms
Memory usage: ~150MB (idle), ~300MB (peak)
```

### Optimization Tips

**Reduce Build Time**:
- Use `.dockerignore` to exclude unnecessary files
- Enable build caching in Coolify settings
- Use smaller base images when possible

**Reduce Image Size**:
- Multi-stage Docker builds (if using custom Dockerfile)
- Remove dev dependencies in production
- Optimize static assets (images, fonts)

**Improve Runtime Performance**:
- Enable Redis caching (Upstash)
- Configure Cloudinary for image optimization
- Use Next.js Image component for automatic optimization
- Enable response compression in next.config.js

---

## Security Configuration

### Application Security

**Environment Secrets**:
- All secrets encrypted in Coolify
- Secrets injected at container runtime
- Never commit secrets to Git repository

**Network Security**:
- Database container on internal network only (not exposed externally)
- Application communicates with DB via internal Docker network
- Traefik handles external traffic with SSL termination

**Headers** (configured in next.config.js):
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains'
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
        }
      ]
    }
  ];
}
```

### Backup Strategy

**Database Backups**:
- Coolify automatic daily backups
- Retention: 7 days (configurable)
- Stored on server or external storage (S3, etc.)

**File Storage**:
- Production: Cloudinary (cloud backup included)
- Development: Local storage (manual backup required)

**Code Repository**:
- Git repository as source of truth
- All changes tracked and versioned
- Easy rollback to any previous state

---

## Troubleshooting Common Issues

### Issue: 502 Bad Gateway

**Symptoms**: Site shows Nginx 502 error

**Causes**:
- Container crashed or failed to start
- Environment variables missing or incorrect
- Database connection failed

**Solution**:
```bash
# 1. Check container status
docker ps | grep [app-name]

# 2. View container logs
docker logs [container-id] --tail 100

# 3. Restart container (Coolify dashboard)
Application → Restart

# 4. Verify environment variables
Coolify → Application → Environment → Check all required vars set

# 5. Check database connection
docker exec -it [db-container] psql -U postgres -c "SELECT 1;"
```

### Issue: DNS_PROBE_FINISHED_NXDOMAIN

**Symptoms**: Browser cannot resolve domain

**Causes**:
- DNS records not yet propagated
- DNS records incorrect
- Local DNS cache

**Solution**:
```bash
# 1. Wait 5-30 minutes for DNS propagation
# 2. Verify DNS records
nslookup yourdomain.com
dig yourdomain.com

# 3. Check DNS propagation globally
# Visit: https://dnschecker.org

# 4. Clear local DNS cache
# Windows: ipconfig /flushdns
# Mac: sudo dscacheutil -flushcache
# Linux: sudo systemd-resolve --flush-caches
```

### Issue: Database Connection Error

**Symptoms**: Application logs show "Can't reach database server"

**Causes**:
- DATABASE_URL incorrect
- Database container not running
- Network connectivity issue

**Solution**:
```bash
# 1. Verify DATABASE_URL in Coolify
Coolify → Application → Environment → DATABASE_URL

# 2. Check database container status
docker ps | grep postgres

# 3. Test database connection
docker exec -it [db-container] psql -U postgres -c "SELECT version();"

# 4. Restart database container if needed
docker restart [db-container]

# 5. Check application logs
docker logs [app-container] --tail 100
```

### Issue: Build Failed

**Symptoms**: Coolify deployment fails during build phase

**Causes**:
- TypeScript errors
- Dependency conflicts
- Environment variables missing during build
- Out of memory

**Solution**:
```bash
# 1. Check build logs in Coolify
Application → Deployment → Failed Deployment → Logs

# 2. Test build locally
npm run build

# 3. Fix TypeScript errors
npm run type-check

# 4. Clear cache and rebuild
Coolify → Application → Clear Cache → Redeploy

# 5. Increase build memory limit if needed
Coolify → Application → Resources → Increase memory limit
```

### Issue: SSL Certificate Not Generated

**Symptoms**: Browser shows "Not Secure" or certificate error

**Causes**:
- DNS not yet propagated
- Domain not configured correctly in Coolify
- Firewall blocking port 80/443

**Solution**:
```bash
# 1. Verify DNS propagation
dig yourdomain.com

# 2. Check domain in Coolify
Application → Configuration → Domain → Verify exact domain match

# 3. Verify firewall allows HTTP/HTTPS
ufw status | grep -E '80|443'

# 4. Force certificate regeneration
Coolify → Application → Redeploy

# 5. Check Traefik logs
docker logs traefik --tail 100
```

---

## Lessons Learned

### Build-time vs Runtime Separation

**Lesson**: Database may not be available during build

**Impact**: Build fails if code requires database during static generation

**Solution**: Graceful degradation pattern - return empty data during build, populate at runtime

### Module-level Initialization

**Lesson**: Next.js analyzes all code during build, including API routes

**Impact**: Module-level PrismaClient instantiation fails during build

**Solution**: Use lazy-loading pattern with Proxy to defer initialization

### Environment-specific Configuration

**Lesson**: Some env vars needed at build-time, others at runtime

**Impact**: Confusion about which variables go where in Coolify

**Solution**: Coolify separates "Build-time" and "Runtime" variables clearly

### DNS Propagation Timing

**Lesson**: DNS changes don't propagate instantly

**Impact**: Site inaccessible immediately after deployment

**Solution**: Wait 5-30 minutes, use DNS checker tools, be patient

### SSL Certificate Auto-generation

**Lesson**: Traefik + Let's Encrypt handle SSL automatically

**Impact**: No manual SSL certificate management needed

**Solution**: Trust the automation, verify after first HTTPS request

---

## Webhook Configuration for Automatic Deployments

**⚠️ IMPORTANT**: By default, Coolify requires manual deployment (clicking "Redeploy" button). Configure GitHub webhook for automatic deployments.

### Why Use Webhooks?

**Without Webhook** (Current Default):
```
1. git push origin main
2. Open Coolify dashboard (http://157.180.78.53:8000)
3. Click "Redeploy" button ← MANUAL STEP
4. Wait ~4-5 minutes for build
```

**With Webhook** (Recommended):
```
1. git push origin main
2. GitHub automatically triggers Coolify deployment ← AUTOMATIC
3. Wait ~4-5 minutes for build
```

**Benefits**:
- ✅ Zero manual intervention
- ✅ Faster deployment workflow
- ✅ Reduced human error
- ✅ Professional CI/CD pipeline

### Quick Setup (5 minutes)

**Step 1: Get Coolify Webhook URL**
```
Coolify Dashboard → Application → Settings → Webhooks
→ Copy webhook URL
Format: http://157.180.78.53:8000/api/v1/deploy/webhook/[UUID]
```

**Step 2: Add to GitHub**
```
GitHub Repository → Settings → Webhooks → Add webhook
→ Payload URL: [Paste Coolify webhook URL]
→ Content type: application/json
→ Events: Just the push event
→ Active: ✅
→ Save webhook
```

**Step 3: Test**
```bash
git commit --allow-empty -m "test: webhook test"
git push origin main

# Coolify should automatically start deployment! 🎉
```

### Detailed Guides

For comprehensive webhook setup and troubleshooting:

- **[Webhook Setup Guide](WEBHOOK_SETUP_GUIDE.md)** - Complete step-by-step instructions
- **[Quick Webhook Setup](QUICK_WEBHOOK_SETUP.md)** - 5-minute fast track
- **[Webhook Troubleshooting](WEBHOOK_TROUBLESHOOTING.md)** - Common issues and solutions

### Verification

**Check GitHub Webhook Status**:
```
GitHub → Settings → Webhooks → Recent Deliveries
→ Should see "200 OK" responses after each push
```

**Check Coolify Deployment**:
```
Coolify Dashboard → Deployments
→ Trigger should show "Webhook" (not "Manual")
```

---

## Additional Resources

- **[Coolify Documentation](https://coolify.io/docs)**
- **[Hetzner Cloud Docs](https://docs.hetzner.com/cloud/)**
- **[Nixpacks Documentation](https://nixpacks.com/docs)**
- **[Traefik Documentation](https://doc.traefik.io/traefik/)**
- **[Let's Encrypt](https://letsencrypt.org/docs/)**

### Internal Documentation

- **[Webhook Setup Guide](WEBHOOK_SETUP_GUIDE.md)** - Automatic deployment configuration
- **[Quick Webhook Setup](QUICK_WEBHOOK_SETUP.md)** - Fast track webhook setup
- **[Webhook Troubleshooting](WEBHOOK_TROUBLESHOOTING.md)** - Common webhook issues
- **[Monitoring Guide](MONITORING.md)** - Health checks and observability
- **[Production Snapshot](PRODUCTION_SNAPSHOT.md)** - Current live state (Jan 5, 2026)
- **[Server Deep Dive](SERVER_DEEP_DIVE.md)** - SSH technical analysis (Jan 5, 2026)

---

**Last Updated**: January 2026
**Deployment Date**: January 2, 2026
**Production Site**: https://dijitalkartvizitmerkezi.com
