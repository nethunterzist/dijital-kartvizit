# Production Environment Snapshot

**Son Güncelleme**: 5 Ocak 2026, 19:30 UTC
**Deployment Tarihi**: 2 Ocak 2026
**Coolify Versiyonu**: v4.0.0-beta.460
**Deployment Sayısı**: 58 başarılı deployment

---

## 📊 Genel Bakış

### Durum
- **Application Status**: ✅ Running (Healthy)
- **Database Status**: ✅ Running (Healthy)
- **Proxy Status**: ✅ Running
- **Son Deployment**: 5 Ocak 2026, 12:32 UTC
- **Commit**: `5166a53` - fix: Cloudinary ile kalıcı PDF storage

### Sunucu Bilgileri
- **IP**: 157.180.78.53
- **Hostname**: localhost
- **Timezone**: UTC
- **SSH Port**: 22
- **SSH User**: root
- **Internal Host**: host.docker.internal

---

## 🚀 Application Configuration

### Genel Ayarlar
```yaml
Name: nethunterzist/dijital-kartvizit:main-jog4k8owwww04k8kccsgggc4
Description: -
Build Pack: Nixpacks
Static Site: No
Port: 3000
Domain: https://dijitalkartvizitmerkezi.com
SSL: Otomatik (Traefik)
Direction: Allow www & non-www
```

### Git Source
```yaml
Repository: nethunterzist/dijital-kartvizit
Branch: main
Platform: GitHub
Current Commit: 5166a53c7bbdbe6f3f865a79d3833d1c7dec6ad6
```

### Build Configuration
```yaml
Install Command: (Nixpacks otomatik)
Build Command: (Nixpacks otomatik)
Start Command: (Nixpacks otomatik)
Base Directory: /
Publish Directory: /
Post-deployment: npx prisma db push
```

### Network Configuration
```yaml
Ports Exposes: 3000
Ports Mappings: -
Network Aliases: -
```

### Traefik Labels (Auto-generated)
```yaml
traefik.enable: true
traefik.http.middlewares.gzip.compress: true
traefik.http.middlewares.redirect-to-https.redirectscheme.scheme: https

# HTTP Router (Port 80)
traefik.http.routers.http-0-pksw4ss08408kgscs844kg0c.entryPoints: http
traefik.http.routers.http-0-pksw4ss08408kgscs844kg0c.middlewares: redirect-to-https
traefik.http.routers.http-0-pksw4ss08408kgscs844kg0c.rule: Host(`dijitalkartvizitmerkezi.com`) && PathPrefix(`/`)
traefik.http.routers.http-0-pksw4ss08408kgscs844kg0c.service: http-0-pksw4ss08408kgscs844kg0c

# HTTPS Router (Port 443)
traefik.http.routers.https-0-pksw4ss08408kgscs844kg0c.entryPoints: https
traefik.http.routers.https-0-pksw4ss08408kgscs844kg0c.middlewares: gzip
traefik.http.routers.https-0-pksw4ss08408kgscs844kg0c.rule: Host(`dijitalkartvizitmerkezi.com`) && PathPrefix(`/`)
traefik.http.routers.https-0-pksw4ss08408kgscs844kg0c.tls.certresolver: letsencrypt
traefik.http.routers.https-0-pksw4ss08408kgscs844kg0c.tls.domains[0].main: dijitalkartvizitmerkezi.com
```

---

## 🔐 Environment Variables (Production)

### Core Configuration
```bash
NODE_ENV=production
  ├─ Available at: Buildtime ✓, Runtime ✓
  └─ Note: Skips devDependencies (development mode recommended for build)

NIXPACKS_NODE_VERSION=22
  └─ Available at: Buildtime ✓
```

### Database
```bash
DATABASE_URL=postgres://postgres:[PASSWORD]@hsg8skcck0kcossg8ccs8kk4:5432/postgres
  ├─ Available at: Buildtime ✓, Runtime ✓
  ├─ Internal hostname: hsg8skcck0kcossg8ccs8kk4
  └─ Port: 5432
```

### Authentication
```bash
NEXTAUTH_URL=https://dijitalkartvizitmerkezi.com
  ├─ Available at: Buildtime ✓, Runtime ✓
  └─ Production domain

NEXTAUTH_SECRET=[64+ chars base64 encoded]
  ├─ Available at: Buildtime ✓, Runtime ✓
  └─ Güvenli şekilde saklanıyor
```

### Cloudinary (File Storage)
```bash
CLOUDINARY_CLOUD_NAME=dblmnsnrv
  └─ Available at: Runtime ✓

CLOUDINARY_API_KEY=948355921728894
  └─ Available at: Runtime ✓

CLOUDINARY_API_SECRET=[MASKED]
  └─ Available at: Runtime ✓
```

### SMTP (Email)
```bash
SMTP_HOST=smtp.yandex.com
  └─ Available at: Runtime ✓

SMTP_PORT=587
  └─ Available at: Runtime ✓

SMTP_USER=noreply@dijitalkartvizitmerkezi.com
  └─ Available at: Runtime ✓

SMTP_PASS=[MASKED]
  └─ Available at: Runtime ✓
```

### Admin
```bash
ADMIN_EMAIL=admin@dijitalkartvizitmerkezi.com
  └─ Available at: Runtime ✓
```

---

## 💾 Database Configuration

### PostgreSQL Details
```yaml
Name: postgresql-database-hsg8skcck0kcossg8ccs8kk4
Image: postgres:17-alpine
Status: Running (Healthy)
Username: postgres
Database: postgres
Internal Port: 5432
Public Access: Disabled
SSL: Disabled
```

### Connection URLs
```bash
# Internal (Container to Container)
postgres://postgres:[PASSWORD]@hsg8skcck0kcossg8ccs8kk4:5432/postgres

# Public (if enabled)
# Not configured - database is internal only
```

### Backup Configuration
```yaml
Scheduled Backups: None configured
Manual Backups: Available via Coolify UI
Import Backups: Supported
```

### Security
- Database container is on internal Docker network
- No public port mapping (secure)
- Only accessible by application container
- Password: 64-character secure random string

---

## 📈 Deployment History

### Son 10 Deployment (Tümü Başarılı)

**#1 - 5 Ocak 2026, 12:32 UTC** (En Son)
```yaml
Commit: 5166a53
Message: "fix: Cloudinary ile kalıcı PDF storage (resource_type: auto)"
Duration: 04m 15s
Status: Success ✅
Trigger: Manual
```

**#2 - 5 Ocak 2026, 12:13 UTC**
```yaml
Commit: 3277dec
Message: "fix: /api/upload route'unu da local storage kullanacak şekilde güncelle"
Duration: 05m 06s
Status: Success ✅
```

**#3 - 5 Ocak 2026, 10:02 UTC**
```yaml
Commit: f1fe2cd
Message: "Fix Cloudinary PDF access with authenticated upload strategy"
Duration: 04m 39s
Status: Success ✅
```

**#4 - 5 Ocak 2026, 09:05 UTC**
```yaml
Commit: fccc8c8
Message: "Add explicit access_mode public parameter for Cloudinary PDFs"
Duration: 04m 49s
Status: Success ✅
```

**#5 - 5 Ocak 2026, 08:57 UTC**
```yaml
Commit: 035b136
Message: "Fix PDF 401 error by removing authenticated flag"
Duration: 07m 55s
Status: Success ✅
```

**#6 - 4 Ocak 2026, 21:30 UTC**
```yaml
Commit: d8f4ea6
Message: "Fix PDF 401 error by removing fl_attachment transformation"
Duration: 04m 12s
Status: Success ✅
```

**#7 - 4 Ocak 2026, 19:56 UTC**
```yaml
Commit: 97e247e
Message: "Fix PDF download by transforming Cloudinary URLs - Root cause solution"
Duration: 04m 12s
Status: Success ✅
```

**#8 - 4 Ocak 2026, 19:19 UTC**
```yaml
Commit: 60a0c0d
Message: "Fix PDF download functionality - Permanent solution"
Duration: 04m 17s
Status: Success ✅
```

**#9 - 4 Ocak 2026, 19:02 UTC**
```yaml
Commit: 759d268
Message: "Fix PDF download extension issue"
Duration: 04m 35s
Status: Success ✅
```

**#10 - 4 Ocak 2026, 18:45 UTC**
```yaml
Commit: 496c9c9
Message: "Logo yükleme sorununu düzelt - tüm dosyaları server-side upload yap"
Duration: 04m 31s
Status: Success ✅
```

### Deployment İstatistikleri
- **Toplam Deployments**: 58 (6 sayfa)
- **Başarı Oranı**: %100
- **Ortalama Build Süresi**: ~4-5 dakika
- **En Hızlı Build**: 4m 12s
- **En Yavaş Build**: 7m 55s

---

## 🔧 Coolify Configuration

### Project Structure
```
📁 Dijital Kartvizit (Project)
  └─ 📁 production (Environment)
      ├─ 🚀 nethunterzist/dijital-kartvizit (Application)
      └─ 💾 postgresql-database (Database)
```

### Server Configuration
```yaml
Server Name: localhost
Description: This is the server where Coolify is running on. Don't delete this!
IP/Domain: host.docker.internal
User: root
Port: 22
Timezone: UTC
Proxy: Traefik (Running)
```

### Proxy (Traefik)
```yaml
Status: Running ✅
Auto SSL: Enabled (Let's Encrypt)
HTTP → HTTPS: Auto redirect
Compression: Gzip enabled
Certificate: dijitalkartvizitmerkezi.com (Valid)
```

---

## 🔒 Security Configuration

### SSL/TLS
- **Provider**: Let's Encrypt
- **Auto-renewal**: Enabled
- **Certificate**: Valid
- **HTTPS**: Enforced (HTTP auto-redirects)
- **TLS Version**: TLS 1.2+

### Network Security
- **Database**: Internal network only, no public access
- **Application**: Public access via HTTPS only
- **SSH**: Port 22 (standard), root user
- **Firewall**: Hetzner Cloud Firewall (managed separately)

### Application Security
- **Environment Secrets**: Encrypted in Coolify
- **Password Hashing**: bcrypt (NextAuth.js)
- **Session Management**: JWT with secure httpOnly cookies
- **CSRF Protection**: NextAuth.js built-in
- **Rate Limiting**: Application-level (5 attempts/15 min)

---

## 📊 Resource Usage & Monitoring

### Container Resources
```yaml
Application:
  Image: Generated by Nixpacks (Node.js 22 + Next.js 14)
  Restart Policy: unless-stopped
  Resource Limits: Not configured (uses system defaults)

Database:
  Image: postgres:17-alpine
  Restart Policy: unless-stopped
  Resource Limits: Not configured (uses system defaults)
```

### Monitoring
- **Coolify Dashboard**: Real-time status monitoring
- **Application Health**: `/api/health` endpoint
- **Database Health**: Built-in PostgreSQL health checks
- **Proxy Health**: Traefik dashboard (internal)
- **Logs**: Available via Coolify UI and Docker logs

---

## 🔄 Backup & Recovery

### Current Backup Strategy
```yaml
Database Backups: ❌ Not configured
Application Code: ✅ Git repository (GitHub)
Environment Variables: ✅ Stored in Coolify (encrypted)
File Uploads: ✅ Cloudinary (persistent cloud storage)
```

### Önerilen İyileştirmeler
1. **Database Backups**: Günlük otomatik PostgreSQL backups yapılandırılmalı
2. **S3 Storage**: Backuplar için S3-compatible storage eklenebilir
3. **Monitoring**: External monitoring service entegrasyonu (örn. Uptime Robot)
4. **Alerting**: Email/Slack notifications için Coolify notifications yapılandırılmalı

---

## 🔄 Preview Deployments

### Configuration
```yaml
Preview Enabled: Yes
NEXTAUTH_URL: http://pksw4ss08408kgscs844kg0c.157.180.78.53.sslip.io
Other Variables: Production ile aynı (DATABASE_URL hariç)
```

Preview deployments kullanılabilir ancak şu an aktif preview yok.

---

## 📝 Notlar ve Öneriler

### Güvenlik
1. ✅ HTTPS enforced
2. ✅ Environment secrets encrypted
3. ✅ Database internal only
4. ⚠️ SSH root access - key-based authentication önerilir
5. ⚠️ Coolify admin şifresini düzenli değiştirin

### Performance
1. ✅ Gzip compression enabled
2. ✅ Cloudinary CDN for file delivery
3. ⚠️ Resource limits tanımlanmamış - production için önerilir
4. ⚠️ Redis cache (Upstash) kullanılmıyor - performans için eklenebilir

### Backup & Monitoring
1. ❌ Otomatik database backup yok - MUTLAKA eklenm eli
2. ❌ External monitoring yok - eklenebilir
3. ❌ Alert notifications yapılandırılmamış
4. ✅ Git-based code backup mevcut

### Development Workflow
1. ✅ Manual deployments working perfectly
2. ✅ 58 successful deployments (%100 success rate)
3. ⚠️ Webhook-based auto-deploy yapılandırılabilir
4. ✅ Preview deployments available

---

## 🎯 Production Checklist

### Kritik ✅
- [x] Application running
- [x] Database running
- [x] HTTPS enforced
- [x] Domain configured
- [x] Environment variables set
- [x] Git source connected

### Önemli ⚠️
- [ ] Database automatic backups
- [ ] Resource limits configured
- [ ] External monitoring
- [ ] Alert notifications
- [ ] Redis cache (Upstash)
- [ ] SSH key-based auth

### Opsiyonel 💡
- [ ] Auto-deployment webhooks
- [ ] Staging environment
- [ ] Load balancing (if needed)
- [ ] CDN for static assets (already using Cloudinary)

---

## 📞 Emergency Contacts & Links

### Coolify Access
- **Dashboard**: http://157.180.78.53:8000/
- **Username**: admin@dijitalkartvizit.com
- **Note**: Şifre güvenli bir yerde saklanmalı

### GitHub Repository
- **URL**: https://github.com/nethunterzist/dijital-kartvizit
- **Branch**: main
- **Access**: Private repository

### Domain & SSL
- **Domain**: dijitalkartvizitmerkezi.com
- **Registrar**: (Domain yönetim paneli bilgileri)
- **SSL**: Let's Encrypt (Otomatik yenileme)

### Server Access
- **SSH**: `ssh root@157.180.78.53`
- **Hetzner Panel**: https://console.hetzner.cloud/
- **Server Location**: (Hetzner datacenter bilgisi)

---

**Dokümantasyon Oluşturulma Tarihi**: 5 Ocak 2026, 19:30 UTC
**Oluşturan**: Claude Code (Automated Production Snapshot)
**Kaynak**: Coolify Dashboard Direct Inspection
