# 🚀 SUNUCU MİGRASYONU KAPSAMLI KILAVUZU

## 📋 İÇİNDEKİLER
1. [Migrasyon Öncesi Hazırlık](#migrasyon-öncesi-hazırlık)
2. [Sunucu Kurulumu](#sunucu-kurulumu)
3. [Veritabanı Migrasyonu](#veritabanı-migrasyonu)
4. [Uygulama Deployu](#uygulama-deployu)
5. [İzleme ve Backup Stratejisi](#izleme-ve-backup-stratejisi)
6. [Yaşanan Sorunlar ve Çözümler](#yaşanan-sorunlar-ve-çözümler)
7. [Gelecekteki Projeler İçin Checklist](#gelecekteki-projeler-için-checklist)

---

## 🎯 MIGRASYON ÖNCESİ HAZIRLIK

### 1. Mevcut Durumu Analiz Et

```bash
# Vercel'deki projeyi analiz et
vercel env ls
vercel logs --limit 50

# Supabase'deki verileri analiz et
# Dashboard'dan tablo yapılarını kaydet
# Row sayılarını not al
```

### 2. Backup Stratejisi

#### Supabase Backup
```bash
# Supabase Dashboard → Settings → Database → Backups
# Manual backup oluştur
# Backup dosyasını indir (.backup uzantılı)
```

#### Vercel Environment Variables
```bash
# Tüm env değişkenlerini kaydet
vercel env pull .env.production
```

### 3. Sunucu Gereksinimlerini Hesapla

| Proje Tipi | Minimum Gereksinimler |
|------------|----------------------|
| Next.js SPA | 2GB RAM, 1 CPU, 40GB Storage |
| Next.js + DB | 4GB RAM, 2 CPU, 80GB Storage |
| Multi-Project | 8GB RAM, 4 CPU, 160GB Storage |

---

## 🖥️ SUNUCU KURULUMU

### 1. Sunucu Satın Alma (Hetzner Önerilen)

```bash
# Hetzner Cloud Console
# 1. CX31: 4GB RAM, 2 CPU, 80GB SSD (€9.18/ay)
# 2. Ubuntu 24.04 LTS seç
# 3. SSH Key ekle
# 4. Firewall: 22, 80, 443 portları aç
```

### 2. İlk Sunucu Kurulumu

```bash
# Sunucuya bağlan
ssh root@YOUR_SERVER_IP

# Sistem güncellemeleri
apt update && apt upgrade -y
apt install -y curl wget git unzip htop

# Güvenlik duvarı ayarla
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable

# Swapfile oluştur (RAM yetersizliği için)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
```

### 3. Node.js ve npm Kurulumu

```bash
# Node.js 20 kurulumu (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Versiyonları kontrol et
node --version  # v20.x.x
npm --version   # 10.x.x
```

### 4. PM2 Global Kurulumu

```bash
npm install -g pm2

# PM2 startup script
pm2 startup
# Çıkan komutu çalıştır

# PM2 save
pm2 save
```

### 5. PostgreSQL Kurulumu ve Yapılandırması

```bash
# PostgreSQL kurulumu
apt install -y postgresql postgresql-contrib

# Servis başlat
systemctl start postgresql
systemctl enable postgresql

# Kullanıcı ve veritabanı oluştur
sudo -u postgres psql

-- PostgreSQL içinde:
CREATE USER dijital WITH ENCRYPTED PASSWORD 'GÜÇLÜ_ŞİFRE_BURAYA';
CREATE DATABASE projeadi OWNER dijital;
GRANT ALL PRIVILEGES ON DATABASE projeadi TO dijital;
ALTER USER dijital CREATEDB;
\q
```

### 6. Nginx Kurulumu ve Yapılandırması

```bash
# Nginx kurulumu
apt install -y nginx

# Firewall'da nginx'e izin ver
ufw allow 'Nginx Full'

# Test et
systemctl start nginx
systemctl enable nginx
```

---

## 🗄️ VERİTABANI MİGRASYONU

### 1. Supabase Backup'ını Hazırla

```bash
# Backup dosyasını sunucuya yükle
scp path/to/backup.sql root@SERVER_IP:/tmp/

# Sunucuda backup'ı kontrol et
file /tmp/backup.sql
head -50 /tmp/backup.sql
```

### 2. Backup'ı Temizle (ÖNEMLİ!)

```bash
# Supabase özel komutlarını filtrele
sed '/^\\unrestrict/d; /^\\restrict/d; /^\\echo/d' /tmp/backup.sql > /tmp/clean_backup.sql

# Sadece public schema verilerini çıkar
grep -A 10000 'COPY public.' /tmp/clean_backup.sql | grep -B 10000 '^\\' > /tmp/public_data.sql
```

### 3. Veritabanını Hazırla

```bash
# Proje klasörüne git
cd /root/PROJECT_NAME

# Environment variables
export DATABASE_URL="postgresql://dijital:PASSWORD@localhost:5432/DATABASE_NAME?sslmode=disable"

# Prisma migration (tablolar oluşur)
npx prisma db push
npx prisma generate

# Tabloları kontrol et
sudo -u postgres psql -d DATABASE_NAME -c "\dt"
```

### 4. Veriyi Restore Et

```bash
# Veri restore et
sudo -u postgres psql -d DATABASE_NAME -f /tmp/public_data.sql

# Kontrol et
sudo -u postgres psql -d DATABASE_NAME -c "SELECT COUNT(*) FROM firmalar;"
sudo -u postgres psql -d DATABASE_NAME -c "SELECT COUNT(*) FROM admins;"
```

---

## 🚀 UYGULAMA DEPLOYU

### 1. Proje Transferi

```bash
# Local'dan sunucuya proje gönder
# Yöntem 1: Git ile
git clone https://github.com/USERNAME/PROJECT.git /root/PROJECT_NAME

# Yöntem 2: SCP ile
tar -czf project.tar.gz PROJECT_FOLDER/
scp project.tar.gz root@SERVER_IP:/root/
ssh root@SERVER_IP "cd /root && tar -xzf project.tar.gz"
```

### 2. Environment Variables

```bash
# .env dosyası oluştur
cat > /root/PROJECT_NAME/.env << EOF
NODE_ENV=production
DATABASE_URL="postgresql://dijital:PASSWORD@localhost:5432/DATABASE_NAME?sslmode=disable"
NEXTAUTH_URL="http://SERVER_IP"
NEXTAUTH_SECRET="UNIQUE_SECRET_KEY_HERE"
EOF
```

### 3. Bağımlılıkları Yükle ve Build

```bash
cd /root/PROJECT_NAME

# Dependencies
npm ci --production

# Build
npm run build

# Test
npm start
```

### 4. PM2 ile Deploy

```bash
# PM2 ecosystem dosyası oluştur
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'PROJECT_NAME',
    script: 'npm',
    args: 'start',
    cwd: '/root/PROJECT_NAME',
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# PM2 ile başlat
pm2 start ecosystem.config.js
pm2 save
pm2 status
```

### 5. Nginx Reverse Proxy

```bash
# Nginx config oluştur
cat > /etc/nginx/sites-available/PROJECT_NAME << EOF
server {
    listen 80;
    server_name SERVER_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Site'ı aktifleştir
ln -s /etc/nginx/sites-available/PROJECT_NAME /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## 📊 İZLEME VE BACKUP STRATEJİSİ

### 1. Otomatik PostgreSQL Backup

```bash
# Backup scripti oluştur
cat > /root/backup_db.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U dijital DATABASE_NAME > /root/backups/db_backup_${DATE}.sql
# 7 günden eski backupları sil
find /root/backups -name "db_backup_*.sql" -mtime +7 -delete
EOF

chmod +x /root/backup_db.sh
mkdir -p /root/backups

# Crontab'a ekle (her gün saat 02:00)
echo "0 2 * * * /root/backup_db.sh" | crontab -
```

### 2. PM2 Monitoring

```bash
# PM2 monitoring aktifleştir
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# Logları kontrol et
pm2 logs PROJECT_NAME --lines 50
pm2 monit
```

### 3. Sistem Monitoring

```bash
# Htop kurulumu
apt install htop

# Disk kullanımını kontrol et
df -h
du -sh /root/PROJECT_NAME

# Memory kullanımı
free -h
```

---

## ⚠️ YAŞANAN SORUNLAR VE ÇÖZÜMLERİ

### 1. Docker Port Çakışması
**Sorun**: Nginx port 80'i kullanamadı
**Çözüm**: 
```bash
docker ps  # Çalışan konteynerları gör
docker stop $(docker ps -q)  # Hepsini durdur
```

### 2. Permission Denied (PostgreSQL)
**Sorun**: postgres kullanıcısı backup dosyasını okuyamadı
**Çözüm**:
```bash
cp /root/backup.sql /tmp/
chmod 644 /tmp/backup.sql
```

### 3. Supabase Özel Komutları
**Sorun**: `\unrestrict` komutları PostgreSQL'de çalışmadı
**Çözüm**:
```bash
sed '/^\\unrestrict/d; /^\\restrict/d' backup.sql > clean_backup.sql
```

### 4. Foreign Key Violations
**Sorun**: Tablo sırası yanlış, foreign key hataları
**Çözüm**: Önce tablolar oluşturup sonra veri aktar
```bash
npx prisma db push  # Önce yapı
# Sonra veri restore
```

---

## ✅ GELECEKTEKİ PROJELER İÇİN CHECKLIST

### Migrasyon Öncesi (1 Hafta Önceden)
- [ ] Mevcut projeyi tam dokümante et
- [ ] Supabase backup oluştur ve test et
- [ ] Environment variables'ları kaydet
- [ ] Sunucu gereksinimlerini hesapla
- [ ] Domain/DNS planlaması yap

### Sunucu Kurulumu (1. Gün)
- [ ] Sunucu satın al (Hetzner/DigitalOcean)
- [ ] Ubuntu 24.04 LTS kur
- [ ] Güvenlik güncellemeleri yap
- [ ] Firewall yapılandır
- [ ] SSH key'leri ayarla
- [ ] Node.js + npm kur
- [ ] PM2 global kur
- [ ] PostgreSQL kur ve yapılandır
- [ ] Nginx kur

### Veritabanı Migrasyonu (2. Gün)
- [ ] Backup dosyasını sunucuya yükle
- [ ] Supabase komutlarını filtrele
- [ ] Public schema verilerini ayıkla
- [ ] Prisma migration çalıştır
- [ ] Veriyi restore et
- [ ] Veri bütünlüğünü kontrol et

### Uygulama Deployu (3. Gün)
- [ ] Proje kodlarını sunucuya aktar
- [ ] Environment variables ayarla
- [ ] Dependencies kur
- [ ] Build işlemini tamamla
- [ ] PM2 ecosystem config hazırla
- [ ] PM2 ile uygulamayı başlat
- [ ] Nginx reverse proxy ayarla
- [ ] Domain/subdomain bağla

### Test ve Optimizasyon (4-5. Gün)
- [ ] Tüm endpoint'leri test et
- [ ] Admin paneli erişimini kontrol et
- [ ] Database connection'ları test et
- [ ] Performance testleri yap
- [ ] SSL sertifikası kur (Let's Encrypt)
- [ ] SEO ayarlarını kontrol et

### İzleme ve Backup (Sürekli)
- [ ] Otomatik backup sistemini kur
- [ ] PM2 monitoring aktifleştir
- [ ] Log rotation ayarla
- [ ] Disk usage monitoring
- [ ] Memory usage tracking
- [ ] Uptime monitoring

---

## 🔧 ARAÇLAR VE KOMUTLAR

### Faydalı Bash Aliases
```bash
# ~/.bashrc'ye ekle
alias pmlog="pm2 logs --lines 50"
alias pmstat="pm2 status"
alias dblog="sudo -u postgres psql"
alias sysinfo="htop"
alias diskinfo="df -h"
```

### Hızlı Debugging Komutları
```bash
# PM2 durumu
pm2 status
pm2 logs PROJECT_NAME --lines 50

# Database bağlantı testi
sudo -u postgres psql -d DATABASE_NAME -c "SELECT NOW();"

# Nginx durumu
nginx -t
systemctl status nginx

# Disk kullanımı
df -h
du -sh /root/*
```

### Acil Durum Komutları
```bash
# PM2 restart
pm2 restart all

# Nginx restart  
systemctl restart nginx

# PostgreSQL restart
systemctl restart postgresql

# Tüm servisleri restart
pm2 restart all && systemctl restart nginx postgresql
```

---

## 📝 NOTLAR VE İPUÇLARI

1. **Her zaman backup al** - Migrasyon öncesi ve sonrası
2. **Test environment** - Mümkünse önce test sunucusunda dene
3. **Incremental approach** - Büyük projeleri parça parça taşı
4. **Documentation** - Her adımı dokümante et
5. **Monitoring** - Sürekli sistem sağlığını izle
6. **Security updates** - Düzenli güvenlik güncellemeleri
7. **SSL certificates** - Production'da mutlaka HTTPS kullan
8. **Domain management** - DNS değişikliklerini önceden planla

---

## 🆘 SORUN ÇÖZME REHBERİ

### Common Errors

| Hata | Olası Sebep | Çözüm |
|------|-------------|-------|
| `EADDRINUSE: address already in use` | Port çakışması | `lsof -i :PORT` ile kontrol et, çakışan servisi durdur |
| `permission denied` | Dosya izinleri | `chmod` ve `chown` ile izinleri düzelt |
| `Cannot connect to database` | DB connection string | Environment variables'ları kontrol et |
| `Module not found` | Dependencies eksik | `npm ci` tekrar çalıştır |
| `Nginx 502 Bad Gateway` | Backend çalışmıyor | PM2 durumunu kontrol et |

---

## 📞 DESTEK VE KAYNAKLAR

- **PM2 Documentation**: https://pm2.keymetrics.io/docs/
- **Nginx Documentation**: https://nginx.org/en/docs/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Hetzner Cloud**: https://docs.hetzner.com/cloud/

---

**🎉 Bu kılavuz sayesinde gelecekteki projelerinizi sorunsuz bir şekilde migrate edebilirsiniz!**

*Son güncelleme: 29 Ağustos 2025*