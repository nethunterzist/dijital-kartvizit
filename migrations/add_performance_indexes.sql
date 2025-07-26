-- Performance Optimization Indexes for Digital Card Application
-- Created: Performance Analysis
-- Purpose: Optimize database queries for better response times

-- Compound index for search queries (firma list API) - Most critical
CREATE INDEX IF NOT EXISTS idx_firmalar_search ON firmalar(firma_adi COLLATE NOCASE, slug, yetkili_adi COLLATE NOCASE);

-- Index for pagination and ordering (critical for list queries)
CREATE INDEX IF NOT EXISTS idx_firmalar_created_at ON firmalar(created_at DESC);

-- Index for template-based queries
CREATE INDEX IF NOT EXISTS idx_firmalar_template_approval ON firmalar(template_id, onay);

-- Index for location-based queries
CREATE INDEX IF NOT EXISTS idx_firmalar_location ON firmalar(il_id, ilce_id);

-- Index for sector/category filtering
CREATE INDEX IF NOT EXISTS idx_firmalar_sector_category ON firmalar(sektor_id, kategori_id);

-- Index for approval status queries (admin panel)
CREATE INDEX IF NOT EXISTS idx_firmalar_approval ON firmalar(onay, created_at DESC);

-- Index for view count queries (trending/popular)
CREATE INDEX IF NOT EXISTS idx_firmalar_views ON firmalar(goruntulenme DESC, updated_at DESC);

-- Unique slug index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_firmalar_slug_unique ON firmalar(slug);

-- Optimize related tables
-- Active contact info index (frequently filtered)
CREATE INDEX IF NOT EXISTS idx_iletisim_active ON IletisimBilgisi(firma_id, aktif, sira) WHERE aktif = true;

-- Contact type filtering index
CREATE INDEX IF NOT EXISTS idx_iletisim_type_filter ON IletisimBilgisi(firma_id, tip, aktif) WHERE aktif = true;

-- Active social media index
CREATE INDEX IF NOT EXISTS idx_sosyal_medya_active ON SosyalMedyaHesabi(firma_id, aktif, sira) WHERE aktif = true;

-- Active bank accounts index
CREATE INDEX IF NOT EXISTS idx_banka_hesabi_active ON BankaHesabi(firma_id, aktif, sira) WHERE aktif = true;

-- Bank account details optimization
CREATE INDEX IF NOT EXISTS idx_banka_detay_active ON BankaHesapDetay(banka_hesabi_id, aktif) WHERE aktif = true;

-- Admin queries optimization
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);

-- Location hierarchy optimization
CREATE INDEX IF NOT EXISTS idx_ilceler_il_active ON ilceler(il_id, ad);

-- ANALYZE tables to update statistics
ANALYZE firmalar;
ANALYZE IletisimBilgisi;
ANALYZE SosyalMedyaHesabi;
ANALYZE BankaHesabi;
ANALYZE BankaHesapDetay;