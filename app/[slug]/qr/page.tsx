import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import QRCode from 'qrcode';
import Handlebars from 'handlebars';
import { getQRTemplate } from '../../lib/templates/qr-templates';

// URL'deki encode edilmiş karakterleri decode eden yardımcı fonksiyon
function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const decodedSlug = decodeSlug(params.slug);
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/sayfalar/${decodedSlug}`;
    const response = await fetch(apiUrl, { 
      cache: 'no-store', 
      headers: { 'Accept': 'application/json' } 
    });
    if (!response.ok) {
      return {
        title: 'QR Kod Bulunamadı',
        description: 'İstenen QR kod sayfası bulunamadı.'
      };
    }
    const data = await response.json();
    return {
      title: `${data.firma_adi} - QR Kod`,
      description: `${data.firma_adi} firma kartvizitinin QR kodu.`
    };
  } catch {
    return {
      title: 'QR Kod Bulunamadı',
      description: 'İstenen QR kod sayfası bulunamadı.'
    };
  }
}

export default async function QRPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeSlug(params.slug);
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/sayfalar/${decodedSlug}`;
    const response = await fetch(apiUrl, { 
      cache: 'no-store', 
      headers: { 'Accept': 'application/json' } 
    });
    if (!response.ok) {
      return notFound();
    }
    const firma = await response.json();

    // QR kodunu oluştur
    const qrData = `${baseUrl}/${decodedSlug}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, { width: 300 });

    // Web sitesi (varsa) dizi veya string olarak hazırla
    let website = '';
    if (firma.website) {
      if (Array.isArray(firma.website)) {
        if (firma.website.length > 0) {
          website = firma.website[0];
        }
      } else if (typeof firma.website === 'string' && firma.website.startsWith('[')) {
        try {
          const arr = JSON.parse(firma.website);
          if (Array.isArray(arr) && arr.length > 0) {
            website = arr[0];
          }
        } catch {
          website = firma.website;
        }
      } else if (typeof firma.website === 'string') {
        website = firma.website;
      }
    }
    // Eğer website hala boşsa, communication dizisinde website olan ilk değeri al
    if (!website && Array.isArray(firma.communication)) {
      const commWeb = firma.communication.find((c: any) => 
        (c.tip === 'website' || c.label?.toLowerCase().includes('website')) && c.value
      );
      if (commWeb) {
        website = commWeb.value;
      }
    }

    // Template ID'ye göre QR template'ini al
    const templateId = firma.template_id || 2;
    const qrTemplate = getQRTemplate(templateId);

    // Template verilerini hazırla
    const templateData = {
      firma_adi: firma.firma_adi,
      yetkili_adi: firma.yetkili_adi,
      qr_code_url: qrCodeDataUrl,
      website: website,
      website_display: website ? website.replace(/^https?:\/\//, '') : '',
      firma_logo: firma.firma_logo
    };

    // Handlebars template'ini derle ve render et
    const template = Handlebars.compile(qrTemplate);
    const html = template(templateData);

    // HTML'i dangerouslySetInnerHTML ile render et
    return (
      <div dangerouslySetInnerHTML={{ __html: html }} />
    );
  } catch (error) {
    return notFound();
  }
}
