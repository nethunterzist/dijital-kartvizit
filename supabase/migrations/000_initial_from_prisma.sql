-- Migration generated from Prisma schema
-- Dijital Kartvizit Database Schema for Supabase
-- Generated at 2025-08-23T16:12:52.159Z

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create admins table
CREATE TABLE IF NOT EXISTS public.admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create sektorler (sectors) table
CREATE TABLE IF NOT EXISTS public.sektorler (
    id SERIAL PRIMARY KEY,
    ad VARCHAR(255) NOT NULL
);

-- Create kategoriler (categories) table
CREATE TABLE IF NOT EXISTS public.kategoriler (
    id SERIAL PRIMARY KEY,
    ad VARCHAR(255) NOT NULL
);

-- Create iller (provinces) table
CREATE TABLE IF NOT EXISTS public.iller (
    id SERIAL PRIMARY KEY,
    ad VARCHAR(255) NOT NULL
);

-- Create ilceler (districts) table
CREATE TABLE IF NOT EXISTS public.ilceler (
    id SERIAL PRIMARY KEY,
    ad VARCHAR(255) NOT NULL,
    il_id INTEGER NOT NULL REFERENCES public.iller(id)
);

-- Create main firmalar (companies) table
CREATE TABLE IF NOT EXISTS public.firmalar (
    id SERIAL PRIMARY KEY,
    firma_adi VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    profil_foto TEXT,
    vcard_dosya TEXT,
    yetkili_adi VARCHAR(255),
    yetkili_pozisyon VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    goruntulenme INTEGER DEFAULT 0,
    katalog TEXT,
    firma_hakkinda TEXT,
    firma_hakkinda_baslik VARCHAR(255) DEFAULT 'Hakkımızda',
    firma_unvan VARCHAR(255),
    firma_vergi_no VARCHAR(255),
    vergi_dairesi VARCHAR(255),
    sektor_id INTEGER REFERENCES public.sektorler(id),
    kategori_id INTEGER REFERENCES public.kategoriler(id),
    il_id INTEGER REFERENCES public.iller(id),
    ilce_id INTEGER REFERENCES public.ilceler(id),
    onay BOOLEAN DEFAULT FALSE,
    tip VARCHAR(255),
    firma_logo TEXT,
    template_id INTEGER DEFAULT 1
);

-- Create IletisimBilgisi (contact info) table
CREATE TABLE IF NOT EXISTS public.IletisimBilgisi (
    id SERIAL PRIMARY KEY,
    firma_id INTEGER NOT NULL REFERENCES public.firmalar(id) ON DELETE CASCADE,
    tip VARCHAR(255) NOT NULL,
    deger VARCHAR(255) NOT NULL,
    etiket VARCHAR(255),
    aktif BOOLEAN DEFAULT TRUE,
    sira INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create SosyalMedyaHesabi (social media accounts) table
CREATE TABLE IF NOT EXISTS public.SosyalMedyaHesabi (
    id SERIAL PRIMARY KEY,
    firma_id INTEGER NOT NULL REFERENCES public.firmalar(id) ON DELETE CASCADE,
    platform VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    etiket VARCHAR(255),
    aktif BOOLEAN DEFAULT TRUE,
    sira INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create BankaHesabi (bank accounts) table
CREATE TABLE IF NOT EXISTS public.BankaHesabi (
    id SERIAL PRIMARY KEY,
    firma_id INTEGER NOT NULL REFERENCES public.firmalar(id) ON DELETE CASCADE,
    banka_adi VARCHAR(255) NOT NULL,
    banka_kodu VARCHAR(255),
    banka_logo VARCHAR(255),
    hesap_sahibi VARCHAR(255) NOT NULL,
    aktif BOOLEAN DEFAULT TRUE,
    sira INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create BankaHesapDetay (bank account details) table
CREATE TABLE IF NOT EXISTS public.BankaHesapDetay (
    id SERIAL PRIMARY KEY,
    banka_hesabi_id INTEGER NOT NULL REFERENCES public.BankaHesabi(id) ON DELETE CASCADE,
    iban VARCHAR(255) NOT NULL,
    para_birimi VARCHAR(10) DEFAULT 'TRY',
    hesap_turu VARCHAR(255),
    aktif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Icon table for icon ordering
CREATE TABLE IF NOT EXISTS public.Icon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    priority INTEGER NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_firmalar_slug ON public.firmalar(slug);
CREATE INDEX IF NOT EXISTS idx_firmalar_onay ON public.firmalar(onay);
CREATE INDEX IF NOT EXISTS idx_iletisim_firma_id ON public.IletisimBilgisi(firma_id);
CREATE INDEX IF NOT EXISTS idx_iletisim_tip ON public.IletisimBilgisi(tip);
CREATE INDEX IF NOT EXISTS idx_sosyal_medya_firma_id ON public.SosyalMedyaHesabi(firma_id);
CREATE INDEX IF NOT EXISTS idx_sosyal_medya_platform ON public.SosyalMedyaHesabi(platform);
CREATE INDEX IF NOT EXISTS idx_banka_hesabi_firma_id ON public.BankaHesabi(firma_id);
CREATE INDEX IF NOT EXISTS idx_banka_detay_hesabi_id ON public.BankaHesapDetay(banka_hesabi_id);
CREATE INDEX IF NOT EXISTS idx_banka_detay_iban ON public.BankaHesapDetay(iban);
CREATE INDEX IF NOT EXISTS idx_ilceler_il_id ON public.ilceler(il_id);

-- Enable RLS on all tables
ALTER TABLE public.firmalar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.IletisimBilgisi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.SosyalMedyaHesabi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.BankaHesabi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.BankaHesapDetay ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (public read for business cards, admin full access)
CREATE POLICY "Public can view approved companies" ON public.firmalar
    FOR SELECT USING (onay = TRUE);

CREATE POLICY "Public can view company contact info" ON public.IletisimBilgisi
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.firmalar 
            WHERE firmalar.id = IletisimBilgisi.firma_id 
            AND firmalar.onay = TRUE
        )
    );

CREATE POLICY "Public can view company social media" ON public.SosyalMedyaHesabi
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.firmalar 
            WHERE firmalar.id = SosyalMedyaHesabi.firma_id 
            AND firmalar.onay = TRUE
        )
    );

CREATE POLICY "Public can view company bank accounts" ON public.BankaHesabi
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.firmalar 
            WHERE firmalar.id = BankaHesabi.firma_id 
            AND firmalar.onay = TRUE
        )
    );

-- Grant basic permissions
GRANT SELECT ON public.firmalar TO anon, authenticated;
GRANT SELECT ON public.IletisimBilgisi TO anon, authenticated;
GRANT SELECT ON public.SosyalMedyaHesabi TO anon, authenticated;
GRANT SELECT ON public.BankaHesabi TO anon, authenticated;
GRANT SELECT ON public.BankaHesapDetay TO anon, authenticated;
GRANT SELECT ON public.sektorler TO anon, authenticated;
GRANT SELECT ON public.kategoriler TO anon, authenticated;
GRANT SELECT ON public.iller TO anon, authenticated;
GRANT SELECT ON public.ilceler TO anon, authenticated;
GRANT SELECT ON public.Icon TO anon, authenticated;

-- Updated at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to firmalar table
CREATE TRIGGER firmalar_updated_at
    BEFORE UPDATE ON public.firmalar
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert some initial data if tables are empty
INSERT INTO public.sektorler (ad) VALUES 
    ('Teknoloji'), ('İnşaat'), ('Gıda'), ('Tekstil'), ('Otomotiv'), ('Sağlık'), ('Eğitim'), ('Finans')
ON CONFLICT DO NOTHING;

INSERT INTO public.kategoriler (ad) VALUES 
    ('Kurumsal'), ('Bireysel'), ('E-ticaret'), ('Hizmet'), ('Üretim')
ON CONFLICT DO NOTHING;
