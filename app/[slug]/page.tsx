import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import handlebars from 'handlebars';
import { cardTemplate } from '../lib/cardTemplate';
import { getServerBaseUrl } from '../lib/utils/getBaseUrl';

// Handlebars helper fonksiyonunu kaydet
handlebars.registerHelper('ifEquals', function(this: any, arg1: any, arg2: any, options: any) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

// Banka hesapları için JSON parse helper'ı
handlebars.registerHelper('parseBankAccounts', function(jsonStr: string) {
    try { return JSON.parse(jsonStr); } catch { return []; }
});

// Icon mapping helper'ı - label'a göre Font Awesome class döndürür
handlebars.registerHelper('getIconClass', function(iconPath: string, label: string) {
    // Önce label'a göre mapping yap (ana kontrol)
    const labelLower = (label || '').toLowerCase();
    
    // Sosyal medya ikonları
    if (labelLower.includes('instagram')) return 'fab fa-instagram';
    if (labelLower.includes('facebook')) return 'fab fa-facebook';
    if (labelLower.includes('twitter')) return 'fab fa-twitter';
    if (labelLower.includes('linkedin')) return 'fab fa-linkedin';
    if (labelLower.includes('youtube')) return 'fab fa-youtube';
    if (labelLower.includes('tiktok')) return 'fab fa-tiktok';
    if (labelLower.includes('whatsapp')) return 'fab fa-whatsapp';
    if (labelLower.includes('telegram')) return 'fab fa-telegram';
    
    // İletişim ikonları
    if (labelLower.includes('telefon') || labelLower.includes('phone') || labelLower.includes('gsm')) return 'fas fa-phone';
    if (labelLower.includes('e-posta') || labelLower.includes('email') || labelLower.includes('mail') || labelLower.includes('eposta')) return 'fas fa-envelope';
    if (labelLower.includes('website') || labelLower.includes('web')) return 'fas fa-globe';
    if (labelLower.includes('harita') || labelLower.includes('map') || labelLower.includes('adres')) return 'fas fa-map-marker-alt';
    
    // Özel alanlar
    if (labelLower.includes('vergi') || labelLower.includes('tax')) return 'fas fa-file-invoice';
    if (labelLower.includes('hakkımızda') || labelLower.includes('hakkinda') || labelLower.includes('about')) return 'fas fa-info-circle';
    if (labelLower.includes('banka') || labelLower.includes('iban') || labelLower.includes('hesap')) return 'fas fa-university';
    if (labelLower.includes('katalog') || labelLower.includes('pdf')) return 'fas fa-book';
    
    // IconPath varsa ona göre mapping (fallback)
    if (iconPath) {
        const pathLower = iconPath.toLowerCase();
        if (pathLower.includes('instagram')) return 'fab fa-instagram';
        if (pathLower.includes('facebook')) return 'fab fa-facebook';
        if (pathLower.includes('twitter')) return 'fab fa-twitter';
        if (pathLower.includes('linkedin')) return 'fab fa-linkedin';
        if (pathLower.includes('youtube')) return 'fab fa-youtube';
        if (pathLower.includes('tiktok')) return 'fab fa-tiktok';
        if (pathLower.includes('wp') || pathLower.includes('whatsapp')) return 'fab fa-whatsapp';
        if (pathLower.includes('telegram')) return 'fab fa-telegram';
        if (pathLower.includes('tel') || pathLower.includes('phone')) return 'fas fa-phone';
        if (pathLower.includes('mail')) return 'fas fa-envelope';
        if (pathLower.includes('web')) return 'fas fa-globe';
        if (pathLower.includes('adres') || pathLower.includes('map')) return 'fas fa-map-marker-alt';
    }
    
    // Varsayılan icon (en son)
    return 'fas fa-circle';
});

// Dinamik metadatayı oluşturan fonksiyon
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = params;
    try {
        const baseUrl = getServerBaseUrl();
        const apiUrl = `${baseUrl}/api/sayfalar/${slug}`;
        const response = await fetch(apiUrl, { 
            cache: 'no-store', 
            headers: { 
                'Accept': 'application/json'
            } 
        });
        
        if (!response.ok) {
            return {
                title: 'Kartvizit Bulunamadı',
                description: 'İstediğiniz kartvizit sayfası bulunamadı.'
            };
        }

        const data = await response.json();
        
        return {
            title: `${data.firma_adi} - Dijital Kartvizit`,
            description: data.firma_hakkinda ? data.firma_hakkinda.substring(0, 160) : `${data.firma_adi} dijital kartvizit sayfası`,
            openGraph: {
                title: `${data.firma_adi} - Dijital Kartvizit`,
                description: data.firma_hakkinda ? data.firma_hakkinda.substring(0, 160) : `${data.firma_adi} dijital kartvizit sayfası`,
                images: data.profil_foto ? [data.profil_foto] : [],
            },
        };
    } catch (error) {
        console.error('Metadata oluşturulurken hata', { error, slug });
        return {
            title: 'Kartvizit Bulunamadı',
            description: 'İstediğiniz kartvizit sayfası bulunamadı.'
        };
    }
}

export default async function KartvizitPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    
    try {
        console.log('🔍 ===== KARTVIZIT SAYFASI BAŞLADI =====');
        console.log('📋 Slug:', slug);
        console.log('⏰ Timestamp:', new Date().toISOString());
        
        // Direct database access instead of internal API call
        console.log('💾 Direct database query başlıyor...');
        const { default: prisma } = await import('@/app/lib/db');
        
        const firma = await prisma.firmalar.findFirst({
            where: { 
                slug: { 
                    equals: slug, 
                    mode: 'insensitive' 
                } 
            },
            include: {
                iletisim_bilgileri: {
                    where: { aktif: true },
                    orderBy: { sira: 'asc' }
                },
                sosyal_medya_hesaplari: {
                    where: { aktif: true },
                    orderBy: { sira: 'asc' }
                },
                banka_hesaplari: {
                    where: { aktif: true },
                    orderBy: { sira: 'asc' },
                    include: {
                        hesaplar: {
                            where: { aktif: true }
                        }
                    }
                }
            }
        });
        
        if (!firma) {
            console.log('❌ Firma bulunamadı, notFound() çağrılıyor');
            return notFound();
        }

        console.log('✅ Firma bulundu:', firma.firma_adi);
        
        // Transform data for template (same logic as API)
        const data = {
            firma_adi: firma.firma_adi,
            yetkili_adi: firma.yetkili_adi,
            yetkili_pozisyon: firma.yetkili_pozisyon,
            slug: firma.slug,
            template_id: firma.template_id || 2,
            firma_logo: firma.firma_logo,
            profil_foto: firma.profil_foto,
            firma_hakkinda: firma.firma_hakkinda,
            firma_hakkinda_baslik: firma.firma_hakkinda_baslik || 'Hakkımızda',
        };
        console.log('✅ API JSON verisi alındı');
        console.log('📊 Data:', data);
        console.log('🎨 Template ID:', data.template_id);
        
        // Template ID'ye göre doğru template'i al
        console.log('🎨 Template işleme başlıyor...');
        console.log('🔍 Template ID:', data.template_id || 2);
        
        const { getTemplateByType } = await import('@/app/lib/cardTemplate');
        const selectedTemplate = getTemplateByType(data.template_id || 2);
        
        console.log('✅ Template alındı, uzunluk:', selectedTemplate.length);
        console.log('📄 Template preview:', selectedTemplate.substring(0, 200) + '...');
        
        // Handlebars ile template'i derle
        console.log('🔧 Handlebars template derleniyor...');
        const compiledTemplate = handlebars.compile(selectedTemplate);
        
        // Template'i veri ile doldur
        console.log('📝 Template veri ile dolduruluyor...');
        const templateData = {
            ...data,
            rehbereEkleButonu: data && `
                <div style="display: flex; flex-direction: column; align-items: center; margin-top: 8px;">
                    ${data.yetkili_pozisyon ? `<div style="font-size: 1.05em; color: #888; margin-bottom: 8px;">${data.yetkili_pozisyon}</div>` : ''}
                    <a href="/${data.slug}/${data.slug}.vcf" download="${data.firma_adi}.vcf" style="display: flex; align-items: center; gap: 6px; background: #f5f5f5; border-radius: 8px; padding: 6px 14px; font-size: 15px; color: #222; text-decoration: none; box-shadow: 0 1px 4px #0001; margin-top: 2px;">
                        <img src="/img/rehber.png" alt="Rehbere Ekle" style="width: 22px; height: 22px;" />
                        <span>Rehbere Ekle</span>
                    </a>
                </div>
            `
        };
        
        console.log('📊 Template data:', templateData);
        
        const html = compiledTemplate(templateData);
        
        console.log('✅ HTML oluşturuldu, uzunluk:', html.length);
        console.log('📄 HTML preview:', html.substring(0, 300) + '...');
        console.log('🏁 ===== KARTVIZIT SAYFASI TAMAMLANDI =====');
        
        // HTML'i döndür
        return (
            <div dangerouslySetInnerHTML={{ __html: html }} />
        );
    } catch (error) {
        console.error('Kartvizit sayfası oluşturulurken hata', { error, slug });
        return notFound();
    }
}
