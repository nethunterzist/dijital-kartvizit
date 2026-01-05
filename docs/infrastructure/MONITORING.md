# Monitoring & Observability Guide

Comprehensive guide for monitoring, logging, and observing the Dijital Kartvizit platform in production.

---

## Overview

**Monitoring Stack**:
- **Application Logs**: Docker container logs via Coolify
- **Health Checks**: Custom `/api/health` endpoint
- **Error Tracking**: Console logging with Winston logger
- **Performance**: Built-in Next.js metrics
- **Infrastructure**: Docker container stats
- **Optional**: Sentry integration for error tracking

---

## Health Check Endpoint

### `/api/health` Endpoint

**Purpose**: Verify application and database health

**Implementation** (`app/api/health/route.ts`):
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}
```

### Health Check Usage

**Manual Check**:
```bash
# Production
curl https://dijitalkartvizitmerkezi.com/api/health

# Expected healthy response (200 OK):
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-01-02T12:00:00.000Z"
}

# Expected unhealthy response (503 Service Unavailable):
{
  "status": "error",
  "database": "disconnected",
  "error": "Database connection failed",
  "timestamp": "2026-01-02T12:00:00.000Z"
}
```

**Automated Monitoring**:
```bash
# Set up cron job for periodic checks
# Add to crontab (crontab -e)
*/5 * * * * curl -s https://dijitalkartvizitmerkezi.com/api/health | grep -q '"status":"ok"' || echo "Health check failed" | mail -s "Site Down Alert" admin@example.com
```

### Additional Admin Initialization

The `/api/health` endpoint also creates default admin user if none exists:

```typescript
// Auto-create admin if missing
const adminCount = await prisma.admins.count();
if (adminCount === 0) {
  await prisma.admins.create({
    data: {
      username: 'admin',
      password: await bcrypt.hash('admin123', 10)
    }
  });
}
```

**⚠️ Security Note**: Change default password immediately after first deployment!

---

## Container Monitoring

### Viewing Logs

**Via Coolify Dashboard**:
```
1. Login to Coolify → http://157.180.78.53:8000
2. Navigate to: Application → Deployment → Latest → Logs
3. View real-time logs or download log file
```

**Via Docker CLI** (SSH to server):
```bash
# View real-time logs (last 100 lines, follow)
docker logs [container-id] -f --tail 100

# View logs with timestamps
docker logs [container-id] -t

# View logs for specific time range
docker logs [container-id] --since "2026-01-02T10:00:00" --until "2026-01-02T12:00:00"

# Save logs to file
docker logs [container-id] > app-logs.txt
```

**Find Container ID**:
```bash
# List running containers
docker ps

# Filter by application name
docker ps | grep sanalkartvizitim

# Get container ID only
docker ps -q --filter "name=sanalkartvizitim"
```

### Container Stats

**Real-time Container Stats**:
```bash
# View resource usage
docker stats [container-id]

# Output:
# CONTAINER ID   CPU %   MEM USAGE / LIMIT   MEM %   NET I/O       BLOCK I/O
# abc123def456   0.50%   300MB / 4GB         7.5%    1.2MB / 800KB 10MB / 5MB

# View stats for all containers
docker stats

# Stats in JSON format
docker stats --no-stream --format "{{json .}}" [container-id]
```

**Container Inspection**:
```bash
# Detailed container information
docker inspect [container-id]

# Get specific field (e.g., status)
docker inspect [container-id] --format='{{.State.Status}}'

# Get environment variables
docker inspect [container-id] --format='{{range .Config.Env}}{{println .}}{{end}}'

# Get container IP address
docker inspect [container-id] --format='{{.NetworkSettings.IPAddress}}'
```

---

## Database Monitoring

### Database Access

**Connect to PostgreSQL Container**:
```bash
# Access database container
docker exec -it [db-container-id] psql -U postgres

# Or with DATABASE_URL
docker exec -it [db-container-id] psql $DATABASE_URL
```

**Database Queries**:
```sql
-- List all tables
\dt

-- Describe table structure
\d firmalar

-- Count records
SELECT COUNT(*) FROM firmalar;

-- Check recent companies
SELECT firma_adi, created_at
FROM firmalar
ORDER BY created_at DESC
LIMIT 10;

-- Database size
SELECT pg_size_pretty(pg_database_size('postgres'));

-- Table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Active connections
SELECT * FROM pg_stat_activity;

-- Database version
SELECT version();
```

### Database Health Checks

**Connection Test**:
```bash
# Test database connection
docker exec -it [db-container] psql -U postgres -c "SELECT 1;"

# Expected output:
# ?column?
# ----------
#         1
# (1 row)
```

**Performance Monitoring**:
```sql
-- Slow queries
SELECT
  query,
  calls,
  total_time,
  mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Cache hit ratio (should be >90%)
SELECT
  sum(heap_blks_read) as heap_read,
  sum(heap_blks_hit)  as heap_hit,
  sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) as ratio
FROM pg_statio_user_tables;

-- Index usage
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

---

## Application Logging

### Winston Logger Configuration

**Logger Setup** (`app/lib/logger.ts`):
```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'dijital-kartvizit' },
  transports: [
    // Console output
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),

    // File outputs (production)
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

export default logger;
```

### Log Levels

**Standard Log Levels** (in order of severity):
```
error   - Critical errors requiring immediate attention
warn    - Warning messages for potential issues
info    - General information about application flow
http    - HTTP request logging
verbose - Verbose information for debugging
debug   - Detailed debugging information
silly   - Very detailed debugging (development only)
```

**Usage Examples**:
```typescript
import logger from '@/app/lib/logger';

// Error logging
logger.error('Database connection failed', { error: err.message });

// Warning
logger.warn('Cache unavailable, using fallback', { service: 'redis' });

// Info
logger.info('User created successfully', { userId: user.id });

// Debug (development only)
logger.debug('Processing request', { body: requestBody });
```

### Log File Management

**Log Rotation** (recommended):
```bash
# Install logrotate (if not already installed)
apt install logrotate

# Create logrotate config: /etc/logrotate.d/dijital-kartvizit
/app/logs/*.log {
  daily
  rotate 14
  compress
  delaycompress
  missingok
  notifempty
  create 0644 root root
}

# Test logrotate config
logrotate -d /etc/logrotate.d/dijital-kartvizit

# Force rotation
logrotate -f /etc/logrotate.d/dijital-kartvizit
```

---

## Performance Monitoring

### Next.js Built-in Metrics

**Enable Web Vitals Reporting** (`app/layout.tsx`):
```typescript
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**Custom Performance Tracking**:
```typescript
// app/lib/performance.ts
export function reportWebVitals(metric: any) {
  // Log to console
  console.log(metric);

  // Send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to custom analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric)
    });
  }
}
```

### Performance Benchmarks

**Target Metrics**:
```
First Contentful Paint (FCP): <1.8s
Largest Contentful Paint (LCP): <2.5s
First Input Delay (FID): <100ms
Cumulative Layout Shift (CLS): <0.1
Time to Interactive (TTI): <3.8s
Total Blocking Time (TBT): <300ms
```

**Monitoring Tools**:
- Google Lighthouse (Chrome DevTools)
- WebPageTest (https://www.webpagetest.org)
- GTmetrix (https://gtmetrix.com)
- Pingdom (https://tools.pingdom.com)

**Run Lighthouse**:
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://dijitalkartvizitmerkezi.com --view

# Run with specific categories
lighthouse https://dijitalkartvizitmerkezi.com --only-categories=performance,accessibility,seo --view

# Output to JSON
lighthouse https://dijitalkartvizitmerkezi.com --output json --output-path ./report.json
```

---

## Error Tracking

### Console Error Monitoring

**Error Logging** (`app/lib/errors.ts`):
```typescript
export function errorResponse(error: unknown): NextResponse {
  // Log error for monitoring
  if (error instanceof Error) {
    console.error('API Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }

  // Return error response...
}
```

### Sentry Integration (Optional)

**Install Sentry**:
```bash
npm install @sentry/nextjs
```

**Configure Sentry** (`sentry.client.config.js`):
```javascript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.request) {
      delete event.request.cookies;
    }
    return event;
  }
});
```

**Environment Variable**:
```env
SENTRY_DSN="https://[key]@[org].ingest.sentry.io/[project]"
```

---

## Alerting and Notifications

### Uptime Monitoring Services

**Recommended Services**:
- **UptimeRobot** (https://uptimerobot.com) - Free tier available
- **Pingdom** (https://www.pingdom.com)
- **StatusCake** (https://www.statuscake.com)
- **Better Uptime** (https://betteruptime.com)

**Setup Example** (UptimeRobot):
```
1. Create monitor
   - Type: HTTP(s)
   - URL: https://dijitalkartvizitmerkezi.com/api/health
   - Interval: 5 minutes

2. Alert contacts
   - Email: admin@example.com
   - SMS: +90 XXX XXX XXXX (optional)

3. Expected response
   - Status code: 200
   - Keyword: "ok" (check response contains this)
```

### Custom Alerting Script

**Simple Health Check Script** (`scripts/health-monitor.sh`):
```bash
#!/bin/bash

SITE_URL="https://dijitalkartvizitmerkezi.com/api/health"
ALERT_EMAIL="admin@example.com"

# Check health endpoint
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $SITE_URL)

if [ $RESPONSE -ne 200 ]; then
  echo "ALERT: Site health check failed. HTTP status: $RESPONSE" | \
    mail -s "Dijital Kartvizit - Site Down Alert" $ALERT_EMAIL

  # Log to file
  echo "[$(date)] Site down - HTTP $RESPONSE" >> /var/log/health-check.log
fi
```

**Add to Crontab**:
```bash
# Run every 5 minutes
*/5 * * * * /path/to/health-monitor.sh
```

---

## Monitoring Dashboard

### Coolify Built-in Monitoring

**Access Metrics**:
```
Coolify → Application → Metrics
```

**Available Metrics**:
- CPU usage (%)
- Memory usage (MB)
- Network I/O (MB)
- Disk I/O (MB)
- Request count
- Response times

### Custom Monitoring Dashboard

**Simple Bash Dashboard** (`scripts/monitor.sh`):
```bash
#!/bin/bash

CONTAINER_ID=$(docker ps -q --filter "name=sanalkartvizitim")

echo "=== Dijital Kartvizit Monitoring ==="
echo "Timestamp: $(date)"
echo ""

# Container status
echo "Container Status:"
docker ps --filter "id=$CONTAINER_ID" --format "table {{.Status}}\t{{.Names}}"
echo ""

# Resource usage
echo "Resource Usage:"
docker stats --no-stream --format "table {{.CPUPerc}}\t{{.MemUsage}}" $CONTAINER_ID
echo ""

# Health check
echo "Health Check:"
curl -s https://dijitalkartvizitmerkezi.com/api/health | jq '.'
echo ""

# Recent logs (last 10 errors)
echo "Recent Errors:"
docker logs $CONTAINER_ID --tail 100 | grep -i error | tail -10
```

**Run Dashboard**:
```bash
chmod +x scripts/monitor.sh
./scripts/monitor.sh
```

---

## Backup and Disaster Recovery

### Database Backups

**Coolify Automatic Backups**:
```
Coolify → Databases → Select Database → Backups

Settings:
- Frequency: Daily
- Retention: 7 days
- Storage: Server local storage or S3
```

**Manual Database Backup**:
```bash
# Create backup
docker exec [db-container] pg_dump -U postgres postgres > backup-$(date +%Y%m%d).sql

# Restore backup
docker exec -i [db-container] psql -U postgres postgres < backup-20260102.sql

# Backup with compression
docker exec [db-container] pg_dump -U postgres postgres | gzip > backup-$(date +%Y%m%d).sql.gz

# Restore compressed backup
gunzip -c backup-20260102.sql.gz | docker exec -i [db-container] psql -U postgres postgres
```

**Automated Backup Script** (`scripts/backup-db.sh`):
```bash
#!/bin/bash

BACKUP_DIR="/backups/database"
DB_CONTAINER="[db-container-id]"
RETENTION_DAYS=30

# Create backup directory
mkdir -p $BACKUP_DIR

# Create backup with timestamp
BACKUP_FILE="$BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).sql.gz"
docker exec $DB_CONTAINER pg_dump -U postgres postgres | gzip > $BACKUP_FILE

# Remove old backups
find $BACKUP_DIR -name "backup-*.sql.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup created: $BACKUP_FILE"
```

**Add to Crontab** (daily at 2 AM):
```bash
0 2 * * * /path/to/backup-db.sh >> /var/log/backup.log 2>&1
```

### Application State Backup

**Files to Backup**:
```bash
# Environment configuration
/coolify/env-files/

# Application logs
/var/lib/docker/containers/[container-id]/logs/

# Uploaded files (if using local storage)
/app/public/uploads/
```

**Backup Script** (`scripts/backup-all.sh`):
```bash
#!/bin/bash

BACKUP_ROOT="/backups"
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="$BACKUP_ROOT/full-backup-$DATE"

mkdir -p $BACKUP_DIR

# Database
docker exec [db-container] pg_dump -U postgres postgres | gzip > $BACKUP_DIR/database.sql.gz

# Logs
docker logs [app-container] > $BACKUP_DIR/app-logs.txt

# Uploaded files (if applicable)
tar -czf $BACKUP_DIR/uploads.tar.gz /app/public/uploads/

# Environment files
cp -r /coolify/env-files/ $BACKUP_DIR/env-files/

# Create archive
tar -czf $BACKUP_ROOT/backup-$DATE.tar.gz $BACKUP_DIR/
rm -rf $BACKUP_DIR

echo "Full backup created: backup-$DATE.tar.gz"
```

---

## Maintenance Windows

### Planned Maintenance Procedure

**Before Maintenance**:
```bash
# 1. Notify users (optional - status page)
# 2. Create backup
./scripts/backup-all.sh

# 3. Note current container ID
CURRENT_CONTAINER=$(docker ps -q --filter "name=sanalkartvizitim")
echo $CURRENT_CONTAINER > /tmp/last-container-id
```

**During Maintenance**:
```bash
# Perform updates, migrations, etc.
# Coolify handles zero-downtime deployments automatically
```

**After Maintenance**:
```bash
# 1. Verify health
curl https://dijitalkartvizitmerkezi.com/api/health

# 2. Check logs for errors
docker logs [new-container-id] --tail 100

# 3. Monitor for 15 minutes
watch -n 30 'curl -s https://dijitalkartvizitmerkezi.com/api/health | jq .'
```

**Rollback if Issues**:
```bash
# Get previous container ID
PREVIOUS_CONTAINER=$(cat /tmp/last-container-id)

# Stop current container
docker stop $(docker ps -q --filter "name=sanalkartvizitim")

# Start previous container
docker start $PREVIOUS_CONTAINER
```

---

## Monitoring Checklist

### Daily Checks
- [ ] Health endpoint responding (200 OK)
- [ ] Container running without restarts
- [ ] No error spikes in logs
- [ ] Memory usage within normal range

### Weekly Checks
- [ ] Database size trending
- [ ] Log file rotation working
- [ ] Backup completion verified
- [ ] Performance metrics stable

### Monthly Checks
- [ ] SSL certificate renewal (automatic via Let's Encrypt)
- [ ] Security updates available
- [ ] Disk space trending
- [ ] Review and archive old logs

---

## Additional Resources

- **[Docker Logging](https://docs.docker.com/config/containers/logging/)**
- **[PostgreSQL Monitoring](https://www.postgresql.org/docs/current/monitoring.html)**
- **[Next.js Analytics](https://nextjs.org/analytics)**
- **[Winston Logger](https://github.com/winstonjs/winston)**
- **[Sentry Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)**

---

**Last Updated**: January 2026
**Health Endpoint**: https://dijitalkartvizitmerkezi.com/api/health
