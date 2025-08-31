# 🚀 Deployment Kılavuzu - Hetzner + Coolify

Bu dokümantasyon, **Dijital Kartvizit** projesinin Hetzner sunucusu üzerinde Coolify ile deployment sürecini açıklamaktadır.

## 📋 Mevcut Altyapı

### 🖥️ Sunucu Bilgileri
- **Sağlayıcı**: Hetzner Cloud
- **IP Adresi**: 46.62.171.65
- **Platform**: Coolify (Self-hosted PaaS)
- **İşletim Sistemi**: Ubuntu Server
- **Container**: Docker

### 🏗️ Teknoloji Stack
- **Database**: PostgreSQL (Docker container)
- **Cache**: Upstash Redis KV
- **Application**: Next.js 14 (Docker container)
- **Reverse Proxy**: Nginx (Coolify tarafından yönetiliyor)

## 🔧 Kurulum Süreci

### 1. Sunucu Hazırlığı
```bash
# Sunucu güncellemeleri
sudo apt update && sudo apt upgrade -y

# Docker kurulumu
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Coolify kurulumu
curl -fsSL https://coolify.io/install.sh | bash
```

### 2. Database Kurulumu
```bash
# PostgreSQL Docker container
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=dijitalkartvizit \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15
```

### 3. Proje Deployment
Coolify dashboard üzerinden:
1. **New Project** oluştur
2. **Git repository** bağla
3. **Environment variables** ayarla
4. **Build** ve **Deploy** işlemini başlat

## ⚙️ Environment Variables

### Production Ortamı
```env
# Database
DATABASE_URL=postgresql://postgres:password@46.62.171.65:5432/dijitalkartvizit?sslmode=disable

# Authentication
NEXTAUTH_SECRET=your-super-secret-key-min-64-chars
NEXTAUTH_URL=https://your-domain.com

# Cache
KV_URL=rediss://default:token@endpoint.upstash.io:6379
KV_REST_API_URL=https://endpoint.upstash.io
KV_REST_API_TOKEN=your-token

# Application
NODE_ENV=production
```

## 🐳 Docker Configuration

### Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate && npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose (Opsiyonel)
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/dijitalkartvizit
    depends_on:
      - postgres
  
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: your_password
      POSTGRES_DB: dijitalkartvizit
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 📊 İzleme ve Bakım

### 1. Sağlık Kontrolü
```bash
# Uygulama durumu
curl -f http://46.62.171.65:3000/api/health

# Database bağlantısı
docker exec postgres pg_isready -U postgres
```

### 2. Log İzleme
```bash
# Coolify logs
coolify logs app

# Container logs
docker logs container_name
```

### 3. Backup Stratejisi
```bash
# Database backup
docker exec postgres pg_dump -U postgres dijitalkartvizit > backup.sql

# Otomatik backup (crontab)
0 2 * * * docker exec postgres pg_dump -U postgres dijitalkartvizit > /backups/backup_$(date +\%Y\%m\%d).sql
```

## 🔒 Güvenlik

### 1. Firewall Ayarları
```bash
# Sadece gerekli portları aç
ufw allow 80
ufw allow 443
ufw allow 22
ufw enable
```

### 2. SSL Sertifikası
Coolify otomatik Let's Encrypt entegrasyonu sağlar.

### 3. Database Güvenliği
- Strong password kullanımı
- Connection limit ayarları
- Regular security updates

## 📈 Performance Optimizasyonu

### 1. Cache Stratejisi
- Upstash Redis ile session ve data cache
- Static asset caching
- API response caching

### 2. Database Optimizasyonu
- Connection pooling
- Query optimization
- Index optimization

## 🚨 Troubleshooting

### Yaygın Sorunlar

| Problem | Çözüm |
|---------|-------|
| Container başlamıyor | `docker logs container_name` ile log kontrol |
| Database bağlantı hatası | Connection string ve credentials kontrol |
| Build hatası | Dependencies ve Node.js version kontrol |
| SSL sertifika sorunu | Coolify dashboard'dan SSL yenileme |

### Acil Durum Komutları
```bash
# Tüm servisleri restart
docker restart postgres app_container

# Coolify restart
sudo systemctl restart coolify

# Disk temizleme
docker system prune -a
```

## 📝 Notlar

1. **Backup**: Her deployment öncesi mutlaka backup alın
2. **Testing**: Staging ortamında test edin
3. **Monitoring**: Uptime monitoring kurun
4. **Documentation**: Değişiklikleri dokümante edin
5. **Security**: Regular security updates

---

**Son Güncelleme**: 30 Ağustos 2025
**Maintainer**: Proje Ekibi