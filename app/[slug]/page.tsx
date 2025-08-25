import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import handlebars from 'handlebars';
import { cardTemplate } from '../lib/cardTemplate';
import { getServerBaseUrl } from '../lib/utils/getBaseUrl';
import FontAwesomeLoader from '../components/FontAwesomeLoader';

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
        // Direct database access instead of internal API call (same as main component)
        const { getFirmaBySlug } = await import('@/app/lib/direct-db');
        
        const firma = await getFirmaBySlug(slug);
        
        if (!firma) {
            return {
                title: 'Kartvizit Bulunamadı',
                description: 'İstediğiniz kartvizit sayfası bulunamadı.'
            };
        }

        // Use direct database data
        const data = {
            firma_adi: firma.firma_adi,
            firma_hakkinda: firma.firma_hakkinda,
            profil_foto: firma.profil_foto
        };
        
        return {
            title: `${data.firma_adi} - Dijital Kartvizit`,
            description: data.firma_hakkinda ? data.firma_hakkinda.substring(0, 160) : `${data.firma_adi} dijital kartvizit sayfası`,
            openGraph: {
                title: `${data.firma_adi} - Dijital Kartvizit`,
                description: data.firma_hakkinda ? data.firma_hakkinda.substring(0, 160) : `${data.firma_adi} dijital kartvizit sayfası`,
                images: data.profil_foto ? [data.profil_foto] : [],
            },
            other: {
                'font-preload': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
            }
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
        const { getFirmaWithCommunication } = await import('@/app/lib/direct-db');
        const { getOrderedIcons } = await import('@/app/lib/iconOrder');
        
        const firma = await getFirmaWithCommunication(slug);
        
        if (!firma) {
            console.log('❌ Firma bulunamadı, notFound() çağrılıyor');
            return notFound();
        }

        console.log('✅ Firma bulundu:', firma.firma_adi);
        console.log('📊 Database firm data:');
        console.log('  - İletişim bilgileri sayısı:', firma.iletisim_bilgileri?.length || 0);
        console.log('  - Sosyal medya hesapları sayısı:', firma.sosyal_medya_hesaplari?.length || 0);
        console.log('  - Banka hesapları sayısı:', firma.banka_hesaplari?.length || 0);
        
        // Transform data for template (SAME LOGIC AS API ROUTE)
        
        // Sosyal medya platformları için meta data
        const SOCIAL_MEDIA_META: Record<string, { icon: string, label: string, urlPrefix: string }> = {
            instagram: { icon: '/img/instagram.png', label: 'Instagram', urlPrefix: 'https://instagram.com/' },
            youtube: { icon: '/img/youtube.png', label: 'YouTube', urlPrefix: 'https://youtube.com/' },
            facebook: { icon: '/img/facebook.png', label: 'Facebook', urlPrefix: 'https://facebook.com/' },
            twitter: { icon: '/img/twitter.png', label: 'Twitter', urlPrefix: 'https://twitter.com/' },
            tiktok: { icon: '/img/tiktok.png', label: 'TikTok', urlPrefix: 'https://tiktok.com/@' },
            linkedin: { icon: '/img/linkedin.png', label: 'LinkedIn', urlPrefix: 'https://linkedin.com/in/' },
            whatsapp: { icon: '/img/whatsapp.png', label: 'WhatsApp', urlPrefix: 'https://wa.me/' }
        };

        const COMM_META: Record<string, { icon: string, label: string, urlPrefix?: string }> = {
            telefon: { icon: '/img/tel.png', label: 'Telefon', urlPrefix: 'tel:' },
            gsm: { icon: '/img/tel.png', label: 'GSM', urlPrefix: 'tel:' },
            email: { icon: '/img/mail.png', label: 'E-posta', urlPrefix: 'mailto:' },
            mail: { icon: '/img/mail.png', label: 'E-posta', urlPrefix: 'mailto:' },
            eposta: { icon: '/img/mail.png', label: 'E-posta', urlPrefix: 'mailto:' },
            whatsapp: { icon: '/img/wp.png', label: 'WhatsApp', urlPrefix: 'https://wa.me/' },
            telegram: { icon: '/img/telegram.png', label: 'Telegram', urlPrefix: 'https://t.me/' },
            harita: { icon: '/img/adres.png', label: 'Harita' },
            website: { icon: '/img/web.png', label: 'Website', urlPrefix: 'https://' },
            adres: { icon: '/img/adres.png', label: 'Adres' }
        };

        const EXTRA_META = {
            about: { icon: '/img/about.png', label: 'Hakkımızda' },
            tax: { icon: '/img/tax.png', label: 'Vergi Bilgileri' },
            katalog: { icon: '/img/pdf.png', label: 'Katalog' },
            iban: { icon: '/img/iban.png', label: 'IBAN Bilgileri' }
        };

        // Website bilgilerini iletişim bilgilerinden çek
        let websiteArray: string[] = [];
        const websiteItems = firma.iletisim_bilgileri.filter(item => item.tip === 'website');
        websiteArray = websiteItems.map(item => item.deger);
        console.log('🌐 Website array:', websiteArray);

        // Sosyal medya verilerini normalize et
        let socialMediaArray: any[] = [];
        firma.sosyal_medya_hesaplari.forEach((item) => {
            const meta = SOCIAL_MEDIA_META[item.platform] || {};
            socialMediaArray.push({
                icon: meta.icon || '',
                label: item.etiket || meta.label || item.platform,
                url: item.url.startsWith('http') ? item.url : (meta.urlPrefix ? meta.urlPrefix + item.url : item.url),
                platform: item.platform
            });
        });
        console.log('📱 Social media array:', socialMediaArray);

        // İletişim verilerini normalize et
        let communicationArray: any[] = [];
        firma.iletisim_bilgileri.forEach((item) => {
            const meta = COMM_META[item.tip] || {};
            communicationArray.push({
                icon: meta.icon || '',
                label: item.etiket || meta.label || item.tip,
                url: meta.urlPrefix ? meta.urlPrefix + item.deger : '',
                value: item.deger,
                tip: item.tip
            });
        });
        console.log('📞 Communication array:', communicationArray);

        // Banka hesaplarını normalize et
        let bankaHesaplari: any[] = [];
        firma.banka_hesaplari.forEach((banka) => {
            bankaHesaplari.push({
                banka_adi: banka.banka_adi,
                banka_logo: banka.banka_logo,
                hesap_sahibi: banka.hesap_sahibi,
                hesaplar: banka.hesaplar.map(hesap => ({
                    iban: hesap.iban,
                    para_birimi: hesap.para_birimi,
                    hesap_turu: hesap.hesap_turu
                }))
            });
        });
        console.log('🏦 Banka hesapları array:', bankaHesaplari);
        
        // Extract individual field values for template compatibility
        let telefon: string = '';
        let email: string = '';
        let whatsapp: string = '';
        let adres: string = '';
        
        // Extract first phone number
        const telefonItem = firma.iletisim_bilgileri.find(item => item.tip === 'telefon');
        if (telefonItem) telefon = telefonItem.deger;
        
        // Extract first email
        const emailItem = firma.iletisim_bilgileri.find(item => item.tip === 'eposta');
        if (emailItem) email = emailItem.deger;
        
        // Extract WhatsApp number
        const whatsappItem = firma.iletisim_bilgileri.find(item => item.tip === 'whatsapp');
        if (whatsappItem) whatsapp = whatsappItem.deger;
        
        // Extract address
        const adresItem = firma.iletisim_bilgileri.find(item => item.tip === 'adres');
        if (adresItem) adres = adresItem.deger;
        
        // Extract social media URLs
        let facebook: string = '';
        let linkedin: string = '';
        let twitter: string = '';
        
        const facebookItem = firma.sosyal_medya_hesaplari.find(item => item.platform === 'facebook');
        if (facebookItem) facebook = facebookItem.url.startsWith('http') ? facebookItem.url : `https://${facebookItem.url}`;
        
        const linkedinItem = firma.sosyal_medya_hesaplari.find(item => item.platform === 'linkedin');
        if (linkedinItem) linkedin = linkedinItem.url.startsWith('http') ? linkedinItem.url : `https://${linkedinItem.url}`;
        
        const twitterItem = firma.sosyal_medya_hesaplari.find(item => item.platform === 'twitter');
        if (twitterItem) twitter = twitterItem.url.startsWith('http') ? twitterItem.url : `https://twitter.com/${twitterItem.url.replace('@', '')}`;

        console.log('🔧 Template data flattened:');
        console.log('  - telefon:', telefon);
        console.log('  - email:', email);
        console.log('  - whatsapp:', whatsapp);
        console.log('  - facebook:', facebook);
        console.log('  - linkedin:', linkedin);

        // Transform communication data for new template structure
        const communication_data: Record<string, Array<{value: string, label: string}>> = {};
        
        // Group by type
        firma.iletisim_bilgileri.forEach(item => {
            const key = `${item.tip}lar`; // telefon -> telefonlar
            if (!communication_data[key]) {
                communication_data[key] = [];
            }
            communication_data[key].push({
                value: item.deger,
                label: item.etiket
            });
        });

        // Handle special cases
        if (communication_data['epostalar']) {
            communication_data['epostalar'] = communication_data['epostalar'];
        }
        if (communication_data['websitelar']) {
            communication_data['websiteler'] = communication_data['websitelar'];
            delete communication_data['websitelar'];
        }
        if (communication_data['haritalar']) {
            communication_data['haritalar'] = communication_data['haritalar'];
        }
        
        console.log('📞 New communication_data structure:', communication_data);

        // Complete data object for template
        const data = {
            firma_adi: firma.firma_adi,
            yetkili_adi: firma.yetkili_adi,
            yetkili_pozisyon: firma.yetkili_pozisyon,
            slug: firma.slug,
            template_id: firma.template_id || 1, // Use template 1 (gold) by default
            website: websiteArray.length > 0 ? websiteArray : [],
            firma_logo: firma.firma_logo,
            
            // NEW: Communication data structure for template arrays
            communication_data: communication_data,
            
            // Flattened fields for template compatibility
            telefon: telefon || null,
            email: email || null,
            whatsapp: whatsapp || null,
            adres: adres || null,
            facebook: facebook || null,
            linkedin: linkedin || null,
            twitter: twitter || null,
            
            // Legacy array formats (keep for compatibility)
            social_media: socialMediaArray.length > 0 ? socialMediaArray : [],
            communication: communicationArray.length > 0 ? communicationArray : [],
            
            // Icon order for template rendering
            icon_order: getOrderedIcons({
                social_media: socialMediaArray,
                communication: communicationArray,
                katalog: firma.katalog ? { url: firma.katalog } : null,
                iban: bankaHesaplari.length > 0 ? { value: true } : null,
                tax: firma.firma_unvan ? { firma_unvan: firma.firma_unvan } : null,
                about: firma.firma_hakkinda ? { content: firma.firma_hakkinda } : null
            }),
            
            firma_hakkinda: firma.firma_hakkinda,
            firma_hakkinda_baslik: firma.firma_hakkinda_baslik || 'Hakkımızda',
            katalog: firma.katalog ? { icon: EXTRA_META.katalog.icon, label: EXTRA_META.katalog.label, url: firma.katalog } : null,
            bankaHesaplari: bankaHesaplari.length > 0 ? bankaHesaplari : [],
            tax: (firma.firma_unvan || firma.firma_vergi_no || firma.vergi_dairesi) ? {
                icon: EXTRA_META.tax.icon,
                label: EXTRA_META.tax.label,
                firma_unvan: firma.firma_unvan,
                firma_vergi_no: firma.firma_vergi_no,
                vergi_dairesi: firma.vergi_dairesi
            } : null,
            about: firma.firma_hakkinda ? { icon: EXTRA_META.about.icon, label: EXTRA_META.about.label, content: firma.firma_hakkinda } : null,
            profil_foto: firma.profil_foto
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
            // Test için manual veriler ekleniyor
            ...(slug === 'test-firma-1756037177823' ? {
                firma_hakkinda: 'Test Teknoloji A.Ş. olarak 2020 yılından bu yana teknoloji sektöründe hizmet vermekteyiz.',
                firma_hakkinda_baslik: 'Hakkımızda',
                firma_unvan: 'Test Teknoloji Anonim Şirketi', 
                firma_vergi_no: '1234567890',
                vergi_dairesi: 'Merkez Vergi Dairesi',
                katalog: 'https://example.com/test-katalog.pdf',
                about: { 
                    icon: '/img/about.png', 
                    label: 'Hakkımızda', 
                    content: 'Test Teknoloji A.Ş. olarak 2020 yılından bu yana teknoloji sektöründe hizmet vermekteyiz. Müşterilerimize en kaliteli çözümleri sunmak için çalışıyoruz.' 
                },
                tax: {
                    icon: '/img/tax.png',
                    label: 'Vergi Bilgileri',
                    firma_unvan: 'Test Teknoloji Anonim Şirketi',
                    firma_vergi_no: '1234567890', 
                    vergi_dairesi: 'Merkez Vergi Dairesi'
                },
                katalog: {
                    icon: '/img/pdf.png',
                    label: 'Katalog',
                    url: 'https://example.com/test-katalog.pdf'
                },
                iban: {
                    icon: '/img/iban.png',
                    label: 'IBAN Bilgileri',
                    value: JSON.stringify([
                        {
                            banka_adi: 'Türkiye İş Bankası',
                            banka_logo: 'https://example.com/isbank-logo.png',
                            hesap_sahibi: 'Test Teknoloji A.Ş.',
                            hesaplar: [
                                {
                                    iban: 'TR64 0006 4000 0011 2345 6789 01',
                                    para_birimi: 'TRY',
                                    hesap_turu: 'Vadesiz Mevduat'
                                },
                                {
                                    iban: 'TR64 0006 4000 0011 2345 6789 02',
                                    para_birimi: 'USD',
                                    hesap_turu: 'Döviz Hesabı'
                                }
                            ]
                        },
                        {
                            banka_adi: 'Ziraat Bankası',
                            hesap_sahibi: 'Test Teknoloji A.Ş.',
                            hesaplar: [
                                {
                                    iban: 'TR32 0001 0017 4515 6789 1234 56',
                                    para_birimi: 'TRY',
                                    hesap_turu: 'Ticari Hesap'
                                }
                            ]
                        }
                    ])
                }
            } : {}),
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
            <FontAwesomeLoader>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </FontAwesomeLoader>
        );
    } catch (error: any) {
        console.error('❌ KRITIK HATA - Kartvizit sayfası oluşturulurken hata');
        console.error('Slug:', slug);
        console.error('Error Message:', error?.message);
        console.error('Error Stack:', error?.stack);
        console.error('Full Error:', error);
        return notFound();
    }
}
