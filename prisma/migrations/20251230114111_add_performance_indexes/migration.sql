-- Performance Indexes for Optimized Queries
-- Created: 2025-12-30

-- Indexes for 'firmalar' table
-- These indexes improve query performance for filtering, sorting, and searching
CREATE INDEX IF NOT EXISTS "firmalar_created_at_idx" ON "firmalar"("created_at");
CREATE INDEX IF NOT EXISTS "firmalar_goruntulenme_idx" ON "firmalar"("goruntulenme");
CREATE INDEX IF NOT EXISTS "firmalar_onay_idx" ON "firmalar"("onay");
CREATE INDEX IF NOT EXISTS "firmalar_sektor_id_kategori_id_idx" ON "firmalar"("sektor_id", "kategori_id");
CREATE INDEX IF NOT EXISTS "firmalar_firma_adi_idx" ON "firmalar"("firma_adi");

-- Composite indexes for 'IletisimBilgisi' table
-- Optimizes joins and filters by firma_id + tip combination
CREATE INDEX IF NOT EXISTS "IletisimBilgisi_firma_id_tip_idx" ON "IletisimBilgisi"("firma_id", "tip");
CREATE INDEX IF NOT EXISTS "IletisimBilgisi_aktif_idx" ON "IletisimBilgisi"("aktif");

-- Composite indexes for 'SosyalMedyaHesabi' table
-- Optimizes joins and filters by firma_id + platform combination
CREATE INDEX IF NOT EXISTS "SosyalMedyaHesabi_firma_id_platform_idx" ON "SosyalMedyaHesabi"("firma_id", "platform");
CREATE INDEX IF NOT EXISTS "SosyalMedyaHesabi_aktif_idx" ON "SosyalMedyaHesabi"("aktif");
