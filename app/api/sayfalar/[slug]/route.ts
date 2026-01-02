import { NextRequest, NextResponse } from 'next/server';

// API route - dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Handlebars from 'handlebars';
import prisma from '@/app/lib/db';
import { logger } from '@/app/lib/logger';

// HTML şablonunu kod içinde string olarak tut
const pageTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{firma_adi}} - Dijital Kartvizit</title>
</head>
<body>
  <h1>{{firma_adi}}</h1>
  <p>{{yetkili_adi}} - {{yetkili_pozisyon}}</p>
  {{#if website}}
    <ul>
      {{#each website}}
        <li><a href="{{this}}" target="_blank">{{this}}</a></li>
      {{/each}}
    </ul>
  {{/if}}
  {{#if firma_logo}}
    <img src="{{firma_logo}}" alt="Logo" style="max-width:150px;" />
  {{/if}}
  <!-- Sosyal medya ve iletişim alanları örnek -->
  {{#if social_media}}
    <h3>Sosyal Medya</h3>
    <ul>
      {{#each social_media}}
        <li><a href="{{this.url}}" target="_blank">{{this.platform}}{{#if this.label}} ({{this.label}}){{/if}}</a></li>
      {{/each}}
    </ul>
  {{/if}}
  {{#if communication}}
    <h3>İletişim</h3>
    <ul>
      {{#each communication}}
        <li>{{this.tip}}: {{this.deger}}</li>
      {{/each}}
    </ul>
  {{/if}}
</body>
</html>
`;

// Sosyal medya platformları için ikon ve label eşlemesi
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

// Ekstra ikon ve label eşlemesi
const EXTRA_META = {
  about: { icon: '/img/about.png', label: 'Hakkımızda' },
  tax: { icon: '/img/tax.png', label: 'Vergi Bilgileri' },
  katalog: { icon: '/img/pdf.png', label: 'Katalog' },
  iban: { icon: '/img/iban.png', label: 'IBAN Bilgileri' }
};

/**
 * Firma sayfasının HTML içeriğini getirir
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    logger.info(`[${slug}] HTML/JSON içeriği getirme isteği alındı`, { slug });
    
    // Firma verisini ilişkili verilerle birlikte çek (Hem eski hem yeni yapıyı destekle)
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
      try {
        await prisma.firmalar.count();
      } catch (dbError) {
        console.error('Database connection error:', dbError);
        logger.error('Database connection failed in sayfalar API', { error: dbError });
      }
      
      return NextResponse.json({ error: 'Firma bulunamadı' }, { status: 404 });
    }


    // Website bilgilerini iletişim bilgilerinden çek
    let websiteArray: string[] = [];
    const websiteItems = firma.iletisim_bilgileri.filter((item: any) => item.tip === 'website');
    websiteArray = websiteItems.map((item: any) => item.deger);

    // Sosyal medya verilerini yeni normalize edilmiş yapıdan çek
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

    // İletişim verilerini yeni normalize edilmiş yapıdan çek
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

    // Banka hesaplarını yeni normalize edilmiş yapıdan çek
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

    // Accept header'ına göre response tipi belirle
    const accept = request.headers.get('accept') || '';
    
    if (accept.includes('application/json') || accept.includes('*/')) {
      
      const responseData = {
        firma_adi: firma.firma_adi,
        yetkili_adi: firma.yetkili_adi,
        yetkili_pozisyon: firma.yetkili_pozisyon,
        slug: firma.slug,
        template_id: firma.template_id || 2,
        website: websiteArray.length > 0 ? websiteArray : [],
        firma_logo: firma.firma_logo,
        social_media: socialMediaArray.length > 0 ? socialMediaArray : [],
        communication: communicationArray.length > 0 ? communicationArray : [],
        firma_hakkinda: firma.firma_hakkinda,
        firma_hakkinda_baslik: firma.firma_hakkinda_baslik || 'Hakkımızda',
        katalog: firma.katalog ? { icon: EXTRA_META.katalog.icon, label: EXTRA_META.katalog.label, url: firma.katalog } : null,
        iban: bankaHesaplari.length > 0 ? { icon: EXTRA_META.iban.icon, label: EXTRA_META.iban.label, value: JSON.stringify(bankaHesaplari) } : null,
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
      
      
      // JSON response - boş veriler için fallback'ler ekle
      return NextResponse.json(responseData);
    } else {
      // HTML response
      const compiledTemplate = Handlebars.compile(pageTemplate);
      const html = compiledTemplate({
        firma_adi: firma.firma_adi,
        yetkili_adi: firma.yetkili_adi,
        yetkili_pozisyon: firma.yetkili_pozisyon,
        slug: firma.slug,
        website: websiteArray,
        firma_logo: firma.firma_logo,
        social_media: socialMediaArray,
        communication: communicationArray
      });
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate'
        }
      });
    }
  } catch (error) {
    logger.error('Sayfa içeriği oluşturulurken hata', { error: error instanceof Error ? error.message : String(error), slug: params.slug, stack: error instanceof Error ? error.stack : undefined });
    return NextResponse.json({ error: 'Sayfa içeriği oluşturulurken bir hata oluştu' }, { status: 500 });
  }
}
