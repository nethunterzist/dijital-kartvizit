-- Rollback Migration: Remove Performance Indexes
-- Created: 2025-12-30
-- Purpose: Revert add_performance_indexes migration if needed

-- Drop indexes for 'firmalar' table
DROP INDEX IF EXISTS "firmalar_created_at_idx";
DROP INDEX IF EXISTS "firmalar_goruntulenme_idx";
DROP INDEX IF EXISTS "firmalar_onay_idx";
DROP INDEX IF EXISTS "firmalar_sektor_id_kategori_id_idx";
DROP INDEX IF EXISTS "firmalar_firma_adi_idx";

-- Drop composite indexes for 'IletisimBilgisi' table
DROP INDEX IF EXISTS "IletisimBilgisi_firma_id_tip_idx";
DROP INDEX IF EXISTS "IletisimBilgisi_aktif_idx";

-- Drop composite indexes for 'SosyalMedyaHesabi' table
DROP INDEX IF EXISTS "SosyalMedyaHesabi_firma_id_platform_idx";
DROP INDEX IF EXISTS "SosyalMedyaHesabi_aktif_idx";

-- Usage:
-- psql $DATABASE_URL -f prisma/migrations/20251230114111_add_performance_indexes/rollback.sql
