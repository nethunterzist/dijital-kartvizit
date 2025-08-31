# 🗄️ Veritabanı Şeması Dokümantasyonu

## 📊 Genel Bakış

**Database**: PostgreSQL  
**ORM**: Prisma  
**Migration System**: Prisma Migrate  
**Total Tables**: 10  

## 🏗️ Tablo İlişkileri Diyagramı

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│     admins      │    │    kategoriler   │    │     sektorler       │
│                 │    │                  │    │                     │
│ • id (PK)       │    │ • id (PK)        │    │ • id (PK)           │
│ • username      │    │ • ad             │    │ • ad                │
│ • password      │    └──────────────────┘    └─────────────────────┘
│ • created_at    │             │                        │
└─────────────────┘             │                        │
                                │                        │
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│     iller       │    │     ilceler      │    │                     │
│                 │    │                  │    │                     │
│ • id (PK)       │◄───┤ • id (PK)        │    │                     │
│ • ad            │    │ • ad             │    │                     │
└─────────────────┘    │ • il_id (FK)     │    │                     │
         │              └──────────────────┘    │                     │
         │                       │              │                     │
         │                       │              │                     │
         │              ┌────────▼──────────────▼─────────────────────┤
         │              │                firmalar                     │
         │              │                                             │
         └──────────────┤ • id (PK)              • template_id        │
                        │ • firma_adi            • gradient_color     │
                        │ • slug (UNIQUE)        • sektor_id (FK)     ├─────┐
                        │ • profil_foto          • kategori_id (FK)   │     │
                        │ • firma_logo           • il_id (FK)         │     │
                        │ • yetkili_adi          • ilce_id (FK)       │     │
                        │ • yetkili_pozisyon     • created_at         │     │
                        │ • katalog              • updated_at         │     │
                        └─────────────┬───────────────────────────────┘     │
                                      │                                     │
          ┌───────────────────────────┼─────────────────────────────────────┤
          │                           │                                     │
          │                           │                                     │
┌─────────▼──────────┐    ┌───────────▼──────────┐    ┌──────────▼─────────┐
│ IletisimBilgisi    │    │ SosyalMedyaHesabi    │    │   BankaHesabi      │
│                    │    │                      │    │                    │
│ • id (PK)          │    │ • id (PK)            │    │ • id (PK)          │
│ • firma_id (FK)    │    │ • firma_id (FK)      │    │ • firma_id (FK)    │
│ • tip              │    │ • platform           │    │ • banka_adi        │
│ • deger            │    │ • url                │    │ • banka_kodu       │
│ • etiket           │    │ • etiket             │    │ • banka_logo       │
│ • aktif            │    │ • aktif              │    │ • hesap_sahibi     │
│ • sira             │    │ • sira               │    │ • aktif            │
│ • created_at       │    │ • created_at         │    │ • sira             │
└────────────────────┘    └──────────────────────┘    │ • created_at       │
                                                       └──────────┬─────────┘
                                                                  │
                                                     ┌────────────▼─────────┐
                                                     │  BankaHesapDetay     │
                                                     │                      │
                                                     │ • id (PK)            │
                                                     │ • banka_hesabi_id(FK)│
                                                     │ • iban               │
                                                     │ • para_birimi        │
                                                     │ • hesap_turu         │
                                                     │ • aktif              │
                                                     │ • created_at         │
                                                     └──────────────────────┘

┌─────────────────┐
│     Icon        │
│                 │
│ • id (PK)       │
│ • name          │
│ • priority      │
└─────────────────┘
```

## 📋 Tablo Detayları

### 1. 🏢 `firmalar` (Ana Tablo)

**Açıklama**: Firma/işletme bilgilerinin ana tablosu.

| Alan | Tip | Null | Default | Açıklama |
|------|-----|------|---------|----------|
| `id` | `INT` | ❌ | `AUTOINCREMENT` | Primary key |
| `firma_adi` | `STRING` | ❌ | - | Firma adı |
| `slug` | `STRING` | ❌ | - | URL slug (UNIQUE) |
| `profil_foto` | `STRING?` | ✅ | `null` | Profil fotoğrafı URL'i |
| `vcard_dosya` | `STRING?` | ✅ | `null` | vCard dosya yolu |
| `yetkili_adi` | `STRING?` | ✅ | `null` | Yetkili kişi adı |
| `yetkili_pozisyon` | `STRING?` | ✅ | `null` | Yetkili pozisyonu |
| `katalog` | `STRING?` | ✅ | `null` | Katalog PDF URL'i |
| `firma_hakkinda` | `STRING?` | ✅ | `null` | Hakkında metni |
| `firma_hakkinda_baslik` | `STRING?` | ✅ | `"Hakkımızda"` | Hakkında başlığı |
| `firma_unvan` | `STRING?` | ✅ | `null` | Firma ünvanı |
| `firma_vergi_no` | `STRING?` | ✅ | `null` | Vergi numarası |
| `vergi_dairesi` | `STRING?` | ✅ | `null` | Vergi dairesi |
| `firma_logo` | `STRING?` | ✅ | `null` | Firma logosu URL'i |
| `template_id` | `INT` | ❌ | `1` | Template ID |
| `gradient_color` | `STRING?` | ✅ | `"#D4AF37,#F7E98E,#B8860B"` | Gradient renkleri |
| `sektor_id` | `INT?` | ✅ | `null` | Sektör ID (FK) |
| `kategori_id` | `INT?` | ✅ | `null` | Kategori ID (FK) |
| `il_id` | `INT?` | ✅ | `null` | İl ID (FK) |
| `ilce_id` | `INT?` | ✅ | `null` | İlçe ID (FK) |
| `onay` | `BOOLEAN` | ❌ | `false` | Onay durumu |
| `tip` | `STRING?` | ✅ | `null` | Firma tipi |
| `goruntulenme` | `INT` | ❌ | `0` | Görüntülenme sayısı |
| `created_at` | `DATETIME` | ❌ | `now()` | Oluşturma tarihi |
| `updated_at` | `DATETIME` | ❌ | `now()` | Güncelleme tarihi |

**İndeksler:**
- `PRIMARY KEY (id)`
- `UNIQUE INDEX (slug)`
- `INDEX (template_id)`
- `INDEX (sektor_id, kategori_id)`
- `INDEX (il_id, ilce_id)`

### 2. 📞 `IletisimBilgisi` (İletişim Bilgileri)

**Açıklama**: Firma iletişim bilgileri (telefon, email, adres vb.).

| Alan | Tip | Null | Default | Açıklama |
|------|-----|------|---------|----------|
| `id` | `INT` | ❌ | `AUTOINCREMENT` | Primary key |
| `firma_id` | `INT` | ❌ | - | Firma ID (FK) |
| `tip` | `STRING` | ❌ | - | İletişim tipi (telefon, email, adres) |
| `deger` | `STRING` | ❌ | - | İletişim değeri |
| `etiket` | `STRING?` | ✅ | `null` | Görünür etiket |
| `aktif` | `BOOLEAN` | ❌ | `true` | Aktif durumu |
| `sira` | `INT` | ❌ | `0` | Sıralama |
| `created_at` | `DATETIME` | ❌ | `now()` | Oluşturma tarihi |

**İlişkiler:**
- `firma_id` → `firmalar.id` (CASCADE DELETE)

**İndeksler:**
- `PRIMARY KEY (id)`
- `INDEX (firma_id)`
- `INDEX (tip)`

**Yaygın Tip Değerleri:**
- `telefon`: Telefon numaraları
- `email`: E-posta adresleri  
- `adres`: Fiziksel adresler
- `website`: Web sitesi URL'leri

### 3. 📱 `SosyalMedyaHesabi` (Sosyal Medya)

**Açıklama**: Firma sosyal medya hesapları.

| Alan | Tip | Null | Default | Açıklama |
|------|-----|------|---------|----------|
| `id` | `INT` | ❌ | `AUTOINCREMENT` | Primary key |
| `firma_id` | `INT` | ❌ | - | Firma ID (FK) |
| `platform` | `STRING` | ❌ | - | Platform adı |
| `url` | `STRING` | ❌ | - | Hesap URL'i |
| `etiket` | `STRING?` | ✅ | `null` | Görünür etiket |
| `aktif` | `BOOLEAN` | ❌ | `true` | Aktif durumu |
| `sira` | `INT` | ❌ | `0` | Sıralama |
| `created_at` | `DATETIME` | ❌ | `now()` | Oluşturma tarihi |

**İlişkiler:**
- `firma_id` → `firmalar.id` (CASCADE DELETE)

**İndeksler:**
- `PRIMARY KEY (id)`
- `INDEX (firma_id)`
- `INDEX (platform)`

**Desteklenen Platformlar:**
- `instagram`, `facebook`, `twitter`, `linkedin`, `youtube`, `tiktok`, `whatsapp`, `telegram`

### 4. 🏦 `BankaHesabi` (Banka Hesapları)

**Açıklama**: Firma banka hesapları ana tablosu.

| Alan | Tip | Null | Default | Açıklama |
|------|-----|------|---------|----------|
| `id` | `INT` | ❌ | `AUTOINCREMENT` | Primary key |
| `firma_id` | `INT` | ❌ | - | Firma ID (FK) |
| `banka_adi` | `STRING` | ❌ | - | Banka adı |
| `banka_kodu` | `STRING?` | ✅ | `null` | Banka kodu |
| `banka_logo` | `STRING?` | ✅ | `null` | Banka logosu URL'i |
| `hesap_sahibi` | `STRING` | ❌ | - | Hesap sahibi adı |
| `aktif` | `BOOLEAN` | ❌ | `true` | Aktif durumu |
| `sira` | `INT` | ❌ | `0` | Sıralama |
| `created_at` | `DATETIME` | ❌ | `now()` | Oluşturma tarihi |

**İlişkiler:**
- `firma_id` → `firmalar.id` (CASCADE DELETE)
- `BankaHesapDetay` → `banka_hesabi_id` (One-to-Many)

**İndeksler:**
- `PRIMARY KEY (id)`
- `INDEX (firma_id)`

### 5. 💳 `BankaHesapDetay` (Banka Hesap Detayları)

**Açıklama**: IBAN'lar ve hesap detayları.

| Alan | Tip | Null | Default | Açıklama |
|------|-----|------|---------|----------|
| `id` | `INT` | ❌ | `AUTOINCREMENT` | Primary key |
| `banka_hesabi_id` | `INT` | ❌ | - | BankaHesabi ID (FK) |
| `iban` | `STRING` | ❌ | - | IBAN numarası |
| `para_birimi` | `STRING` | ❌ | `"TRY"` | Para birimi |
| `hesap_turu` | `STRING?` | ✅ | `null` | Hesap türü |
| `aktif` | `BOOLEAN` | ❌ | `true` | Aktif durumu |
| `created_at` | `DATETIME` | ❌ | `now()` | Oluşturma tarihi |

**İlişkiler:**
- `banka_hesabi_id` → `BankaHesabi.id` (CASCADE DELETE)

**İndeksler:**
- `PRIMARY KEY (id)`
- `INDEX (banka_hesabi_id)`
- `INDEX (iban)`

### 6. 🗺️ Geographic Tables

#### `iller` (İller)
| Alan | Tip | Null | Default | Açıklama |
|------|-----|------|---------|----------|
| `id` | `INT` | ❌ | `AUTOINCREMENT` | Primary key |
| `ad` | `STRING` | ❌ | - | İl adı |

#### `ilceler` (İlçeler)
| Alan | Tip | Null | Default | Açıklama |
|------|-----|------|---------|----------|
| `id` | `INT` | ❌ | `AUTOINCREMENT` | Primary key |
| `ad` | `STRING` | ❌ | - | İlçe adı |
| `il_id` | `INT` | ❌ | - | İl ID (FK) |

**İlişkiler:**
- `il_id` → `iller.id`

#### `kategoriler` (Kategoriler)
| Alan | Tip | Null | Default | Açıklama |
|------|-----|------|---------|----------|
| `id` | `INT` | ❌ | `AUTOINCREMENT` | Primary key |
| `ad` | `STRING` | ❌ | - | Kategori adı |

#### `sektorler` (Sektörler)
| Alan | Tip | Null | Default | Açıklama |
|------|-----|------|---------|----------|
| `id` | `INT` | ❌ | `AUTOINCREMENT` | Primary key |
| `ad` | `STRING` | ❌ | - | Sektör adı |

### 7. 👨‍💼 `admins` (Yöneticiler)

**Açıklama**: Sistem yöneticileri.

| Alan | Tip | Null | Default | Açıklama |
|------|-----|------|---------|----------|
| `id` | `INT` | ❌ | `AUTOINCREMENT` | Primary key |
| `username` | `STRING` | ❌ | - | Kullanıcı adı (UNIQUE) |
| `password` | `STRING` | ❌ | - | Şifrelenmiş parola |
| `created_at` | `DATETIME` | ❌ | `now()` | Oluşturma tarihi |

**İndeksler:**
- `PRIMARY KEY (id)`
- `UNIQUE INDEX (username)`

### 8. 🎨 `Icon` (İkonlar)

**Açıklama**: İkon öncelik sıralaması.

| Alan | Tip | Null | Default | Açıklama |
|------|-----|------|---------|----------|
| `id` | `INT` | ❌ | `AUTOINCREMENT` | Primary key |
| `name` | `STRING` | ❌ | - | İkon adı |
| `priority` | `INT` | ❌ | - | Öncelik sırası |

## 🔄 Migration Geçmişi

### Migration Files
```
prisma/migrations/
├── 20250420141015_reset_schema/
│   └── migration.sql                    # Initial schema
├── 20250427000000_remove_unused_fields/
│   └── migration.sql                    # Cleanup unused fields
├── 20250505122054_add_firma_logo/
│   └── migration.sql                    # Add firma_logo field
└── migration_lock.toml                  # Lock file
```

### Son Değişiklikler
- ✅ **gradient_color** field'ı firmalar tablosuna eklendi
- ✅ **BankaHesapDetay** tablosu ile çoklu IBAN desteği
- ✅ Cascade delete ilişkileri eklendi
- ✅ Performance için index optimizasyonları

## 🔍 Query Patterns

### Firma ve Tüm İlişkili Veriler
```sql
SELECT 
  f.*,
  -- İletişim bilgileri
  json_agg(DISTINCT 
    CASE WHEN ib.id IS NOT NULL 
    THEN json_build_object(
      'id', ib.id,
      'tip', ib.tip,
      'deger', ib.deger,
      'etiket', ib.etiket,
      'sira', ib.sira
    ) END
  ) FILTER (WHERE ib.id IS NOT NULL) as iletisim_bilgileri,
  
  -- Sosyal medya hesapları
  json_agg(DISTINCT 
    CASE WHEN smh.id IS NOT NULL 
    THEN json_build_object(
      'id', smh.id,
      'platform', smh.platform,
      'url', smh.url,
      'etiket', smh.etiket,
      'sira', smh.sira
    ) END
  ) FILTER (WHERE smh.id IS NOT NULL) as sosyal_medya_hesaplari
  
FROM firmalar f
LEFT JOIN \"IletisimBilgisi\" ib ON f.id = ib.firma_id AND ib.aktif = true
LEFT JOIN \"SosyalMedyaHesabi\" smh ON f.id = smh.firma_id AND smh.aktif = true
WHERE f.slug = $1
GROUP BY f.id;
```

### Banka Hesapları ile Detayları
```sql
SELECT 
  bh.*,
  json_agg(
    json_build_object(
      'id', bhd.id,
      'iban', bhd.iban,
      'para_birimi', bhd.para_birimi,
      'hesap_turu', bhd.hesap_turu
    ) ORDER BY bhd.created_at
  ) as hesaplar
FROM \"BankaHesabi\" bh
LEFT JOIN \"BankaHesapDetay\" bhd ON bh.id = bhd.banka_hesabi_id AND bhd.aktif = true
WHERE bh.firma_id = $1 AND bh.aktif = true
GROUP BY bh.id
ORDER BY bh.sira;
```

## 🛡️ Data Integrity

### Constraints
- **UNIQUE**: firmalar.slug
- **FOREIGN KEYS**: Tüm ilişkisel alanlar
- **CASCADE DELETE**: Alt kayıtlar ana kayıt silindiğinde otomatik silinir
- **NOT NULL**: Zorunlu alanlar

### Data Validation
- IBAN formatı kontrolleri
- Email formatı validasyonu
- URL formatı kontrolleri
- Telefon numarası formatları

### Backup Strategy
- **Daily**: Otomatik PostgreSQL dump
- **Weekly**: Full database backup
- **Monthly**: Archive backups

## 📈 Performance Optimizations

### İndeksler
```sql
-- Firmalar için composite index'ler
CREATE INDEX idx_firmalar_geographic ON firmalar(il_id, ilce_id);
CREATE INDEX idx_firmalar_business ON firmalar(sektor_id, kategori_id);

-- İletişim bilgileri için
CREATE INDEX idx_iletisim_type ON "IletisimBilgisi"(tip, aktif);

-- Sosyal medya için
CREATE INDEX idx_sosyal_platform ON "SosyalMedyaHesabi"(platform, aktif);

-- Banka hesapları için
CREATE INDEX idx_banka_firma_aktif ON "BankaHesabi"(firma_id, aktif);
```

### Query Optimizations
- Lazy loading ilişkili veriler için
- Pagination büyük listeler için
- JSON aggregation complex queries için

## 🔧 Maintenance

### Regular Tasks
- **Weekly**: ANALYZE tables for query planning
- **Monthly**: VACUUM FULL for space reclamation  
- **Quarterly**: Index maintenance and optimization

### Monitoring
- Slow query logging
- Connection pool monitoring
- Table size monitoring

---

> 📝 **Not**: Bu şema aktif geliştirme altındadır. Migration'lar `prisma migrate` komutu ile yönetilir.