# 🗄️ Supabase Database Kurulum Rehberi

Bu rehber, **Dijital Kartvizit** projesinin Supabase PostgreSQL database'inin kurulumu, konfigürasyonu ve yönetimi için kapsamlı adımları içerir.

## 📋 İçindekiler

1. [Supabase Nedir?](#-supabase-nedir)
2. [Supabase Hesap Kurulumu](#-supabase-hesap-kurulumu) 
3. [Proje Oluşturma](#-proje-oluşturma)
4. [Database Schema Import](#-database-schema-import)
5. [API Keys Konfigürasyonu](#-api-keys-konfigürasyonu)
6. [Row Level Security (RLS)](#-row-level-security-rls)
7. [Local Development ile Supabase CLI](#-local-development-ile-supabase-cli)
8. [Database Yönetimi](#-database-yönetimi)
9. [Troubleshooting](#-troubleshooting)

---

## 🚀 Supabase Nedir?

**Supabase**, açık kaynaklı Firebase alternatifidir ve PostgreSQL veritabanı üzerine inşa edilmiş Backend-as-a-Service (BaaS) platformudur.

### Temel Özellikler:
- 🗄️ **PostgreSQL Database** - Tam özellikli SQL database
- 🔐 **Authentication** - Built-in auth sistemi
- 📡 **Real-time subscriptions** - WebSocket desteği
- 🌐 **REST API** - Auto-generated API endpoints
- 🛡️ **Row Level Security** - Granüler güvenlik kontrolü
- 📊 **Dashboard** - Web tabanlı database yönetimi

### Neden Supabase?
- ✅ **SQL Support**: Karmaşık ilişkisel veri modeli
- ✅ **Scalability**: Auto-scaling infrastructure
- ✅ **Security**: Enterprise-level güvenlik
- ✅ **Developer Experience**: Kolay setup ve yönetim
- ✅ **Open Source**: Vendor lock-in yok

---

## 👤 Supabase Hesap Kurulumu

### 1. Hesap Oluşturma

1. **[supabase.com](https://supabase.com)** adresine gidin
2. **"Start your project"** butonuna tıklayın  
3. **GitHub** hesabınızla giriş yapın (önerilen)

**Alternatif Giriş Yöntemleri:**
- GitHub (önerilen - kolay proje entegrasyonu)
- Google
- Email + Password

### 2. Organization Setup

```
Organization Name: dijital-kartvizit-org
Plan: Free Tier (başlangıç için yeterli)

Free Tier Limitleri:
- 2 proje
- 500 MB database
- 5 GB bandwidth/month  
- 50,000 monthly active users
```

---

## 🏗️ Proje Oluşturma

### 1. New Project

Supabase dashboard'da **"New project"** butonuna tıklayın.

### 2. Project Settings

```yaml
Project Name: dijital-kartvizit
Database Password: [güçlü şifre oluşturun - kaydedecin]
Region: Europe (Frankfurt) # Türkiye'ye en yakın
Plan: Free
```

**⚠️ Önemli Notlar:**
- **Database Password'unu mutlaka kaydedin** - tekrar gösterilmez
- **Region'ı doğru seçin** - değiştirilemez
- **Project Name** URL'de kullanılır - değiştirilemez

### 3. Proje Oluşturma Süreci

```
⏱️ Beklenen Süre: 2-3 dakika

İşlem Adımları:
1. ⚡ Setting up project...
2. 🗄️ Initializing database...
3. 🔐 Setting up auth...
4. 📡 Starting API server...
5. ✅ Project ready!
```

---

## 📊 Database Schema Import

### 1. Current Schema Analysis

Projede mevcut `schema.prisma` dosyasından database modellerimizi analiz edelim:

**Ana Tablolar:**
```sql
-- Firmalar (Ana tablo)
firmalar: Ana firma bilgileri
├── IletisimBilgisi: Telefon, email, adres bilgileri
├── SosyalMedyaHesabi: Sosyal medya linkleri  
├── BankaHesabi: Banka bilgileri
│   └── BankaHesapDetay: IBAN detayları
└── İlişkili tablolar: iller, ilceler, sektorler, kategoriler

-- Yönetim tabloları  
admins: Admin kullanıcıları
Icon: Icon priority ayarları
```

### 2. Supabase'de Schema Oluşturma

#### Yöntem 1: SQL Editor (Önerilen)

1. Supabase dashboard → **SQL Editor**
2. **"New query"** oluşturun
3. Aşağıdaki SQL'i execute edin:

```sql
-- =============================================================================
-- DIJITAL KARTVIZIT DATABASE SCHEMA
-- Supabase PostgreSQL için optimize edilmiş schema
-- =============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- ADMIN USERS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin (password: admin123456 - değiştirin!)
INSERT INTO admins (username, password) VALUES 
('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- -----------------------------------------------------------------------------
-- LOCATION TABLES (Coğrafi bilgiler)
-- -----------------------------------------------------------------------------
CREATE TABLE iller (
  id SERIAL PRIMARY KEY,
  ad VARCHAR(255) NOT NULL
);

CREATE TABLE ilceler (
  id SERIAL PRIMARY KEY,
  ad VARCHAR(255) NOT NULL,
  il_id INTEGER REFERENCES iller(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İl-İlçe indexi
CREATE INDEX idx_ilceler_il_id ON ilceler(il_id);

-- -----------------------------------------------------------------------------
-- BUSINESS CATEGORY TABLES  
-- -----------------------------------------------------------------------------
CREATE TABLE sektorler (
  id SERIAL PRIMARY KEY,
  ad VARCHAR(255) NOT NULL
);

CREATE TABLE kategoriler (
  id SERIAL PRIMARY KEY, 
  ad VARCHAR(255) NOT NULL
);

-- -----------------------------------------------------------------------------
-- MAIN COMPANIES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE firmalar (
  id SERIAL PRIMARY KEY,
  firma_adi VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  profil_foto TEXT,
  vcard_dosya TEXT,
  yetkili_adi VARCHAR(255),
  yetkili_pozisyon VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  goruntulenme INTEGER DEFAULT 0,
  katalog TEXT,
  firma_hakkinda TEXT,
  firma_hakkinda_baslik VARCHAR(255) DEFAULT 'Hakkımızda',
  firma_unvan VARCHAR(255),
  firma_vergi_no VARCHAR(50),
  vergi_dairesi VARCHAR(255),
  sektor_id INTEGER REFERENCES sektorler(id),
  kategori_id INTEGER REFERENCES kategoriler(id),
  il_id INTEGER REFERENCES iller(id),
  ilce_id INTEGER REFERENCES ilceler(id),
  onay BOOLEAN DEFAULT FALSE,
  tip VARCHAR(100),
  firma_logo TEXT,
  template_id INTEGER DEFAULT 1
);

-- Firmalar için indexler
CREATE INDEX idx_firmalar_slug ON firmalar(slug);
CREATE INDEX idx_firmalar_onay ON firmalar(onay);
CREATE INDEX idx_firmalar_sektor ON firmalar(sektor_id);
CREATE INDEX idx_firmalar_il ON firmalar(il_id);

-- -----------------------------------------------------------------------------
-- CONTACT INFORMATION
-- -----------------------------------------------------------------------------
CREATE TABLE IletisimBilgisi (
  id SERIAL PRIMARY KEY,
  firma_id INTEGER REFERENCES firmalar(id) ON DELETE CASCADE,
  tip VARCHAR(100) NOT NULL, -- telefon, email, adres, website
  deger TEXT NOT NULL,
  etiket VARCHAR(255),
  aktif BOOLEAN DEFAULT TRUE,
  sira INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İletişim bilgileri indexleri
CREATE INDEX idx_iletisim_firma_id ON IletisimBilgisi(firma_id);
CREATE INDEX idx_iletisim_tip ON IletisimBilgisi(tip);

-- -----------------------------------------------------------------------------
-- SOCIAL MEDIA ACCOUNTS
-- -----------------------------------------------------------------------------
CREATE TABLE SosyalMedyaHesabi (
  id SERIAL PRIMARY KEY,
  firma_id INTEGER REFERENCES firmalar(id) ON DELETE CASCADE,
  platform VARCHAR(100) NOT NULL, -- instagram, facebook, linkedin, etc.
  url TEXT NOT NULL,
  etiket VARCHAR(255),
  aktif BOOLEAN DEFAULT TRUE,
  sira INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sosyal medya indexleri
CREATE INDEX idx_sosyal_medya_firma_id ON SosyalMedyaHesabi(firma_id);
CREATE INDEX idx_sosyal_medya_platform ON SosyalMedyaHesabi(platform);

-- -----------------------------------------------------------------------------
-- BANK ACCOUNTS
-- -----------------------------------------------------------------------------
CREATE TABLE BankaHesabi (
  id SERIAL PRIMARY KEY,
  firma_id INTEGER REFERENCES firmalar(id) ON DELETE CASCADE,
  banka_adi VARCHAR(255) NOT NULL,
  banka_kodu VARCHAR(10),
  banka_logo TEXT,
  hesap_sahibi VARCHAR(255) NOT NULL,
  aktif BOOLEAN DEFAULT TRUE,
  sira INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Banka hesap detayları
CREATE TABLE BankaHesapDetay (
  id SERIAL PRIMARY KEY,
  banka_hesabi_id INTEGER REFERENCES BankaHesabi(id) ON DELETE CASCADE,
  iban VARCHAR(34) NOT NULL, -- International Bank Account Number
  para_birimi VARCHAR(3) DEFAULT 'TRY',
  hesap_turu VARCHAR(100),
  aktif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Banka hesabı indexleri
CREATE INDEX idx_banka_hesabi_firma_id ON BankaHesabi(firma_id);
CREATE INDEX idx_banka_hesap_detay_iban ON BankaHesapDetay(iban);

-- -----------------------------------------------------------------------------
-- ICON MANAGEMENT
-- -----------------------------------------------------------------------------
CREATE TABLE Icon (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  priority INTEGER DEFAULT 0
);

-- -----------------------------------------------------------------------------
-- SAMPLE DATA (Test verisi)
-- -----------------------------------------------------------------------------

-- Örnek sektörler
INSERT INTO sektorler (ad) VALUES 
('Teknoloji'), ('Sağlık'), ('Eğitim'), ('Finans'), ('Emlak'),
('Otomotiv'), ('Gıda'), ('Tekstil'), ('İnşaat'), ('Turizm');

-- Örnek kategoriler  
INSERT INTO kategoriler (ad) VALUES
('Küçük İşletme'), ('Orta Ölçekli'), ('Büyük Şirket'), ('Start-up'), ('Freelancer');

-- Örnek iller (ana şehirler)
INSERT INTO iller (ad) VALUES
('İstanbul'), ('Ankara'), ('İzmir'), ('Bursa'), ('Antalya'),
('Adana'), ('Konya'), ('Şanlıurfa'), ('Gaziantep'), ('Kayseri');

-- İstanbul ilçeleri örneği
INSERT INTO ilceler (ad, il_id) VALUES
('Kadıköy', 1), ('Beşiktaş', 1), ('Şişli', 1), ('Beyoğlu', 1),
('Üsküdar', 1), ('Fatih', 1), ('Bakırköy', 1), ('Ataşehir', 1);

-- Örnek icon priorities
INSERT INTO Icon (name, priority) VALUES
('phone', 1), ('email', 2), ('website', 3), ('instagram', 4),
('facebook', 5), ('linkedin', 6), ('twitter', 7), ('whatsapp', 8);

-- -----------------------------------------------------------------------------
-- UPDATED_AT TRIGGER FUNCTION
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to firmalar table
CREATE TRIGGER update_firmalar_updated_at 
    BEFORE UPDATE ON firmalar 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- SCHEMA CREATED SUCCESSFULLY! 
-- =============================================================================
```

4. **"RUN"** butonuna tıklayarak execute edin

#### Yöntem 2: Prisma Migration (Alternatif)

```bash
# Local development ile Prisma kullanarak
# .env.local dosyasında DATABASE_URL ayarlandıktan sonra:

npx prisma db push
npx prisma generate
```

### 3. Schema Doğrulaması  

SQL Editor'da aşağıdaki sorguyu çalıştırarak tabloları kontrol edin:

```sql
-- Tüm tabloları listele
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Tablo satır sayıları
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  null_frac
FROM pg_stats 
WHERE schemaname = 'public';
```

**Beklenen Tablolar:**
```
✅ admins
✅ firmalar  
✅ IletisimBilgisi
✅ SosyalMedyaHesabi
✅ BankaHesabi
✅ BankaHesapDetay
✅ Icon
✅ sektorler
✅ kategoriler
✅ iller
✅ ilceler
```

---

## 🔑 API Keys Konfigürasyonu

### 1. API Keys Erişimi

Supabase dashboard → **Settings** → **API**

### 2. Keys Bilgileri

```yaml
Project URL: https://[PROJECT_REF].supabase.co
Project Ref: abcdefghijklmnop (örnek)

API Keys:
  anon (public):     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  service_role:      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Database URL: postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
```

### 3. .env.local Güncelleme

Environment setup rehberinde oluşturduğunuz `.env.local` dosyasını güncelleyin:

```bash
# Supabase'den kopyaladığınız değerlerle değiştirin:

# Database connection
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres?sslmode=require"

# Supabase API
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ACTUAL_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ACTUAL_SERVICE_KEY"
```

### 4. Keys Security

**Anon Key (Public):**
- ✅ Client-side kod'da kullanılabilir
- ✅ RLS policies ile korunur
- ✅ Frontend API çağrıları için

**Service Role Key (Private):**
- ❌ Asla client-side kod'a koymayın
- ✅ Sadece server-side (API routes)
- ✅ Admin işlemleri için
- ✅ RLS bypass yetkisi var

---

## 🛡️ Row Level Security (RLS)

### 1. RLS Nedir?

Row Level Security, PostgreSQL'in tablo seviyesinde satır bazlı erişim kontrolü sağlayan özelliğidir.

### 2. RLS Policies Oluşturma

#### Firmalar Tablosu RLS:

```sql
-- RLS'yi aktif et
ALTER TABLE firmalar ENABLE ROW LEVEL SECURITY;

-- Public read policy (onaylı firmalar herkes görebilir)
CREATE POLICY "Public read access for approved companies" 
ON firmalar FOR SELECT 
USING (onay = true);

-- Admin full access policy  
CREATE POLICY "Admin full access" 
ON firmalar FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE username = current_setting('app.current_user', true)
  )
);

-- Firma sahibi kendi kaydını düzenleyebilir
CREATE POLICY "Company owner can update own record"
ON firmalar FOR UPDATE
USING (
  slug = current_setting('app.company_slug', true)
);
```

#### İletişim Bilgileri RLS:

```sql
-- İletişim bilgileri RLS
ALTER TABLE IletisimBilgisi ENABLE ROW LEVEL SECURITY;

-- Public read (firma onaylıysa)
CREATE POLICY "Public read contact info for approved companies"
ON IletisimBilgisi FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM firmalar 
    WHERE firmalar.id = IletisimBilgisi.firma_id 
    AND firmalar.onay = true
  )
);

-- Admin full access
CREATE POLICY "Admin full access to contact info"
ON IletisimBilgisi FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM admins
    WHERE username = current_setting('app.current_user', true)
  )
);
```

#### Sosyal Medya RLS:

```sql
-- Sosyal medya hesapları RLS
ALTER TABLE SosyalMedyaHesabi ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Public read social media for approved companies"
ON SosyalMedyaHesabi FOR SELECT
USING (
  aktif = true AND EXISTS (
    SELECT 1 FROM firmalar
    WHERE firmalar.id = SosyalMedyaHesabi.firma_id
    AND firmalar.onay = true
  )
);

-- Admin policy
CREATE POLICY "Admin full access to social media"
ON SosyalMedyaHesabi FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM admins
    WHERE username = current_setting('app.current_user', true)
  )
);
```

### 3. RLS Test

```sql
-- Policy test (admin context)
SET app.current_user = 'admin';
SELECT * FROM firmalar; -- Tüm kayıtlar gösterilir

-- Policy test (public context)
RESET app.current_user;
SELECT * FROM firmalar; -- Sadece onay=true kayıtlar
```

---

## 🔧 Local Development ile Supabase CLI

### 1. Supabase CLI Kurulumu

```bash
# macOS (Homebrew)
brew install supabase/tap/supabase

# Windows (Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux/Windows (Direct Download)
# https://github.com/supabase/cli/releases adresinden indirin

# npm ile (cross-platform)
npm install -g supabase
```

### 2. CLI Doğrulama

```bash
# Versiyon kontrolü
supabase --version
# Beklenen: supabase version 1.x.x

# CLI komut listesi  
supabase help
```

### 3. Local Development Setup

```bash
# Proje dizininde Supabase init
supabase init

# Local Docker setup (requires Docker)
supabase start

# Database migrations
supabase db push

# Supabase Studio (local)
# http://localhost:54323
```

### 4. Remote ile Sync

```bash
# Supabase hesabınıza login
supabase login

# Remote project ile link
supabase link --project-ref YOUR_PROJECT_REF

# Schema'yı remote'dan çek
supabase db pull

# Local'dan remote'a push
supabase db push
```

---

## 🎛️ Database Yönetimi

### 1. Supabase Dashboard

**Table Editor:**
- Tablo görüntüleme ve düzenleme
- Satır ekleme/silme/güncelleme
- Filter ve search

**SQL Editor:**
- Custom SQL sorguları
- Migration script'leri
- Performance analizi

**Authentication:**
- Kullanıcı yönetimi
- Auth policies
- Email templates

### 2. Backup Stratejileri

#### Otomatik Backups:
```
Free Tier: 7 günlük backup retention
Pro Plan: 30 günlük backup retention  
```

#### Manuel Backup:
```bash
# pg_dump ile manuel backup
pg_dump "postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres" > backup.sql

# Restore
psql "postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres" < backup.sql
```

### 3. Performance Monitoring

**Database Logs:**
- Slow queries
- Connection monitoring
- Error tracking

**Usage Analytics:**
- Request volume
- Response times
- Bandwidth usage

### 4. Useful SQL Queries

```sql
-- En çok görüntülenen firmalar
SELECT firma_adi, slug, goruntulenme 
FROM firmalar 
WHERE onay = true 
ORDER BY goruntulenme DESC 
LIMIT 10;

-- Sektör dağılımı
SELECT s.ad as sektor, COUNT(f.id) as firma_sayisi
FROM sektorler s
LEFT JOIN firmalar f ON s.id = f.sektor_id
GROUP BY s.ad
ORDER BY firma_sayisi DESC;

-- İletişim bilgileri özeti
SELECT 
  f.firma_adi,
  STRING_AGG(
    CASE 
      WHEN i.tip = 'telefon' THEN i.deger 
    END, ', '
  ) as telefonlar,
  STRING_AGG(
    CASE 
      WHEN i.tip = 'email' THEN i.deger 
    END, ', '
  ) as emails
FROM firmalar f
LEFT JOIN IletisimBilgisi i ON f.id = i.firma_id
WHERE f.onay = true
GROUP BY f.id, f.firma_adi
LIMIT 5;

-- Database size monitoring
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 🔧 Troubleshooting

### Yaygın Sorunlar

#### 1. Connection String Hatası
```bash
# Hata: "database "postgres" does not exist"
# Kontrol: DATABASE_URL format
# Doğru format:
postgresql://postgres:PASSWORD@db.PROJECT-REF.supabase.co:5432/postgres?sslmode=require
```

#### 2. Authentication Hatası  
```bash
# Hata: "Invalid API key"
# Çözüm: .env.local'da keys kontrol edin
grep "SUPABASE" .env.local

# Keys yenileme: Settings → API → Regenerate
```

#### 3. RLS Policy Hatası
```sql
-- Hata: "insufficient privilege: SELECT is denied" 
-- Çözüm: RLS policy kontrol
SELECT * FROM pg_policies WHERE tablename = 'firmalar';

-- Policy debug
SET app.current_user = 'test';
```

#### 4. Migration Hatası
```bash
# Hata: "Migration failed"
# Çözüm: Schema conflicts kontrol
supabase db diff

# Reset database (dikkatli!)
supabase db reset
```

#### 5. Performance Sorunları
```sql
-- Slow query analysis
EXPLAIN ANALYZE SELECT * FROM firmalar WHERE onay = true;

-- Index analysis
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

### Debug Komutları

```bash
# Database connection test
psql "postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres" -c "SELECT version();"

# Table list
psql "DATABASE_URL" -c "\dt"

# Prisma connection test  
npx prisma db execute --stdin <<< "SELECT 1"

# Environment validation
node -e "console.log('DB URL:', process.env.DATABASE_URL?.substring(0, 50))"
```

---

## 📚 Sonraki Adımlar

Supabase setup tamamlandıktan sonra:

1. **[Deployment Setup](./deployment-setup.md)** - Production deployment için Vercel konfigürasyonu
2. **[API Documentation](../03-api/)** - Database ile API endpoint'leri test etme
3. **[Development Guide](../02-development/)** - Geliştirme süreçleri

---

## ✅ Kontrol Listesi

Supabase setup'ı tamamladıktan sonra aşağıdakileri kontrol edin:

**Supabase Configuration:**
- [ ] Supabase hesabı oluşturuldu
- [ ] Proje başarıyla oluşturuldu  
- [ ] Database password kaydedildi
- [ ] Schema import edildi (11 tablo)
- [ ] Sample data yüklendi

**API Keys:**
- [ ] PROJECT_REF bilgisi alındı
- [ ] ANON_KEY .env.local'a eklendi
- [ ] SERVICE_ROLE_KEY .env.local'a eklendi
- [ ] DATABASE_URL doğru format'ta

**Security:**
- [ ] RLS policies oluşturuldu
- [ ] Public access policies test edildi
- [ ] Admin access policies test edildi

**Testing:**
- [ ] Database bağlantı testi başarılı
- [ ] Sample queries çalışıyor
- [ ] Prisma connection aktif
- [ ] Development server Supabase ile çalışıyor

---

**🎉 Supabase Database Kurulumu Tamamlandı!**

Database'iniz artık production-ready ve güvenli. Bir sonraki adım olarak [deployment-setup.md](./deployment-setup.md) rehberini takip ederek Vercel deployment'ınızı konfigüre edin.

---
*Son güncelleme: 2025-08-25 | Versiyon: 1.0.0*