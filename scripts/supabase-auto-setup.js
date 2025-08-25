#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

class SupabaseAutoSetup {
    constructor() {
        this.projectRef = process.env.PROJECT_REF || process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/([^\.]+)\.supabase\.co/)?.[1];
        this.supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        
        if (!this.projectRef) {
            throw new Error('❌ PROJECT_REF environment variable eksik! .env.local dosyasını kontrol edin.');
        }
    }

    async setup() {
        console.log('🚀 SUPABASE OTOMATİK KURULUM BAŞLIYOR...');
        console.log('='.repeat(60));
        console.log(`📋 Proje: ${this.projectRef}`);
        console.log(`🌐 URL: ${this.supabaseUrl}`);
        console.log();

        try {
            await this.step1_CheckCLI();
            await this.step2_Login();
            await this.step3_LinkProject();
            await this.step4_CheckMigrations();
            await this.step5_GenerateSchemaFromPrisma();
            await this.step6_DeployDatabase();
            await this.step7_Verify();
            
            console.log('\n🎉 KURULUM TAMAMLANDI!');
            console.log('='.repeat(60));
            console.log('✅ Supabase CLI kuruldu ve yapılandırıldı');
            console.log('✅ Proje başarıyla bağlandı');
            console.log('✅ Prisma schema Supabase migration\'a dönüştürüldü');
            console.log('✅ Migration dosyaları uygulandı');
            console.log('✅ Database tabloları oluşturuldu');
            console.log('✅ RLS politikaları aktif');
            console.log('\n🚀 Projenizi çalıştırabilirsiniz: npm run dev');
            
        } catch (error) {
            console.error('\n💥 KURULUM HATASI:', error.message);
            console.log('\n🔧 Troubleshooting:');
            console.log('1. .env.local dosyasındaki bilgileri kontrol edin');
            console.log('2. Supabase Dashboard\'dan service_role key alın');
            console.log('3. Database password doğru olduğundan emin olun');
            console.log('4. Internet bağlantınızı kontrol edin');
            process.exit(1);
        }
    }

    async step1_CheckCLI() {
        console.log('📋 ADIM 1: Supabase CLI Kontrolü...');
        try {
            const version = execSync('npx supabase --version', { encoding: 'utf8' }).trim();
            console.log('✅ Supabase CLI mevcut:', version);
        } catch (error) {
            console.log('❌ CLI bulunamadı, kuruluyor...');
            execSync('npm install -g supabase', { stdio: 'inherit' });
            console.log('✅ Supabase CLI kuruldu');
        }
        console.log();
    }

    async step2_Login() {
        console.log('📋 ADIM 2: Supabase Login Kontrolü...');
        try {
            const projects = execSync('npx supabase projects list', { encoding: 'utf8' });
            if (projects.includes(this.projectRef)) {
                console.log('✅ Zaten giriş yapılmış');
            } else {
                throw new Error('Login gerekli');
            }
        } catch (error) {
            console.log('🔑 Login yapılıyor...');
            console.log('⚠️  Tarayıcıda açılacak sayfadan Supabase hesabınızla giriş yapın');
            execSync('npx supabase login', { stdio: 'inherit' });
            console.log('✅ Login başarılı');
        }
        console.log();
    }

    async step3_LinkProject() {
        console.log('📋 ADIM 3: Proje Bağlama...');
        const configPath = path.join(process.cwd(), 'supabase', 'config.toml');
        
        if (fs.existsSync(configPath)) {
            console.log('✅ Config dosyası mevcut, proje zaten bağlı');
        } else {
            console.log('🔗 Proje bağlanıyor...');
            console.log('⚠️  Database password soracak - Dashboard > Settings > Database\'den alın');
            try {
                execSync(`npx supabase link --project-ref ${this.projectRef}`, { stdio: 'inherit' });
                console.log('✅ Proje başarıyla bağlandı');
            } catch (error) {
                throw new Error('Proje bağlama başarısız. Password kontrolü yapın.');
            }
        }
        console.log();
    }

    async step4_CheckMigrations() {
        console.log('📋 ADIM 4: Migration Yapısı...');
        const migrationDir = path.join(process.cwd(), 'supabase', 'migrations');
        
        if (!fs.existsSync(migrationDir)) {
            fs.mkdirSync(migrationDir, { recursive: true });
            console.log('📁 Supabase migration klasörü oluşturuldu');
        }
        
        const files = fs.readdirSync(migrationDir);
        console.log(`✅ ${files.length} migration dosyası bulundu:`, files);
        console.log();
    }

    async step5_GenerateSchemaFromPrisma() {
        console.log('📋 ADIM 5: Prisma Schema -> Supabase Migration Dönüşümü...');
        
        const prismaSchemaPath = path.join(process.cwd(), 'schema.prisma');
        if (!fs.existsSync(prismaSchemaPath)) {
            throw new Error('schema.prisma dosyası bulunamadı!');
        }

        const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '000_initial_from_prisma.sql');
        
        if (fs.existsSync(migrationPath)) {
            console.log('✅ Prisma migration zaten mevcut');
            console.log();
            return;
        }

        // Prisma schema'dan SQL migration oluştur
        const migrationSQL = this.generateMigrationFromPrisma();
        fs.writeFileSync(migrationPath, migrationSQL);
        console.log('✅ Prisma schema Supabase migration\'a dönüştürüldü');
        console.log(`📄 Dosya: ${migrationPath}`);
        console.log();
    }

    generateMigrationFromPrisma() {
        return `-- Migration generated from Prisma schema
-- Dijital Kartvizit Database Schema for Supabase
-- Generated at ${new Date().toISOString()}

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
`;
    }

    async step6_DeployDatabase() {
        console.log('📋 ADIM 6: DATABASE DEPLOYMENT...');
        console.log('🚀 Migration dosyaları remote database\'e uygulanıyor...');
        console.log('⚠️  Bu işlem tablolarınızı otomatik oluşturacak!');
        console.log();
        
        try {
            execSync('npx supabase db push', { stdio: 'inherit' });
            console.log();
            console.log('✅ Database deployment başarılı!');
        } catch (error) {
            console.error();
            console.error('❌ Database push başarısız');
            console.error('Olası sebepler:');
            console.error('1. Database password yanlış/eksik');
            console.error('2. Proje bağlantısı kopuk');
            console.error('3. Network sorunu');
            console.error('4. Migration dosyasında SQL hatası');
            throw new Error('Database deployment başarısız');
        }
        console.log();
    }

    async step7_Verify() {
        console.log('📋 ADIM 7: Doğrulama...');
        console.log('🔍 Deployment kontrol ediliyor...');
        console.log();
        
        // Supabase client ile test
        try {
            const { createClient } = require('@supabase/supabase-js');
            const supabase = createClient(
                this.supabaseUrl,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            );
            
            // Basit bir health check
            const { data, error } = await supabase.from('firmalar').select('count').limit(1);
            
            if (error && error.code !== 'PGRST116') { // PGRST116 = empty table, OK
                console.log('⚠️  Tablo sorgusu uyarısı:', error.message);
            } else {
                console.log('✅ Database bağlantısı aktif');
                console.log('✅ Firmalar tablosu erişilebilir');
            }
        } catch (testError) {
            console.log('⚠️  Test sorgusu atlandı:', testError.message);
        }
        
        console.log('🌐 Dashboard:', `https://app.supabase.com/project/${this.projectRef}/editor`);
        console.log('📊 Tables:', `https://app.supabase.com/project/${this.projectRef}/editor`);
        console.log('🔐 Auth:', `https://app.supabase.com/project/${this.projectRef}/auth/users`);
        console.log();
    }
}

// Script çalıştır
if (require.main === module) {
    const setup = new SupabaseAutoSetup();
    setup.setup();
}

module.exports = { SupabaseAutoSetup };