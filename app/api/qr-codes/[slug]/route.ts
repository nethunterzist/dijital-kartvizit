import { NextRequest, NextResponse } from 'next/server';
import Handlebars from 'handlebars';
import prisma from '@/app/lib/db';
import QRCode from 'qrcode';
import { getTemplateById } from '@/app/lib/templates/templateRegistry';
import { logger } from '@/app/lib/logger';

// Template dosyalarını dinamik olarak import etmek için
async function getTemplateModule(templateId: number) {
  try {
    switch (templateId) {
      case 2:
        return await import('@/app/lib/templates/template2-modern');
      case 3:
        return await import('@/app/lib/templates/template3-minimal');
      case 4:
        return await import('@/app/lib/templates/template4-corporate');
      case 5:
        return await import('@/app/lib/templates/template5-colorful');
      case 6:
        return await import('@/app/lib/templates/template6-luxury');
      case 7:
        return await import('@/app/lib/templates/template7-corporate-slate');
      case 8:
        return await import('@/app/lib/templates/template8-clean-sheet');
      case 9:
        return await import('@/app/lib/templates/template9-night-pulse');
      case 10:
        return await import('@/app/lib/templates/template10-glass-aura');
      case 11:
        return await import('@/app/lib/templates/template11-pastel-bloom');
      case 12:
        return await import('@/app/lib/templates/template12-retro-signal');
      case 13:
        return await import('@/app/lib/templates/template13-gridfolio');
      case 14:
        return await import('@/app/lib/templates/template14-monotone');
      case 15:
        return await import('@/app/lib/templates/template15-vibe-stream');
      case 16:
        return await import('@/app/lib/templates/template16-goldmark');
      case 17:
        return await import('@/app/lib/templates/template17-green-soul');
      case 18:
        return await import('@/app/lib/templates/template18-ocean-breeze');
      case 19:
        return await import('@/app/lib/templates/template19-sunset-glow');
      case 20:
        return await import('@/app/lib/templates/template20-purple-rain');
      case 21:
        return await import('@/app/lib/templates/template21-crimson-edge');
      default:
        return await import('@/app/lib/templates/template2-modern'); // Default template
    }
  } catch (error) {
    logger.error(`Template ${templateId} yüklenemedi`, { templateId, error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
    return await import('@/app/lib/templates/template2-modern'); // Fallback
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  let firma: any = null;
  
  try {
    // Firma bilgilerini al
    firma = await prisma.firmalar.findFirst({
      where: { slug }
    });
    
    if (!firma) {
      return NextResponse.json({ error: 'Firma bulunamadı' }, { status: 404 });
    }

    // Firmanın template ID'sini al (varsayılan 2)
    const templateId = firma.template_id || 2;
    
    // Template modülünü yükle
    const templateModule = await getTemplateModule(templateId);
    
    // Template string'ini al - any kullanarak tip hatalarını önle
    const templateModuleAny = templateModule as any;
    let templateString = '';
    
    // Template export'larını kontrol et
    if (templateModuleAny.modernTemplate) {
      templateString = templateModuleAny.modernTemplate;
    } else if (templateModuleAny.minimalTemplate) {
      templateString = templateModuleAny.minimalTemplate;
    } else if (templateModuleAny.corporateTemplate) {
      templateString = templateModuleAny.corporateTemplate;
    } else if (templateModuleAny.colorfulTemplate) {
      templateString = templateModuleAny.colorfulTemplate;
    } else if (templateModuleAny.luxuryTemplate) {
      templateString = templateModuleAny.luxuryTemplate;
    } else {
      // Fallback - template modülünün ilk export'unu al
      const firstExport = Object.values(templateModule)[0];
      if (typeof firstExport === 'string') {
        templateString = firstExport;
      } else {
        throw new Error(`Template ${templateId} için template string bulunamadı`);
      }
    }

    // QR kodunu anlık olarak oluştur
    const qrData = `${request.nextUrl.origin}/${slug}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, { 
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Website bilgilerini al
    let websiteList = [];
    if (firma.communication_data) {
      try {
        const commData = JSON.parse(firma.communication_data);
        if (commData.websiteler && commData.websiteler.length > 0) {
          websiteList = commData.websiteler;
        }
      } catch (e) {
        logger.error('Communication data parse hatası', { error: e instanceof Error ? e.message : String(e), slug, stack: e instanceof Error ? e.stack : undefined });
      }
    }

    // Template stillerini ayrıştır ve QR sayfası oluştur
    const extractStylesFromTemplate = (templateHtml: string): string => {
      const styleMatch = templateHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      return styleMatch ? styleMatch[1] : '';
    };

    const detectContainerStructure = (templateHtml: string): { containerClass: string; contentClass: string } => {
      // Luxury template için özel kontrol
      if (templateHtml.includes('class="card"') && !templateHtml.includes('main-container')) {
        return { containerClass: 'card', contentClass: 'card' };
      }
      // Diğer tüm template'ler için varsayılan yapı
      return { containerClass: 'main-container', contentClass: 'card-content' };
    };

    // Template stillerini ve yapısını al
    const templateStyles = extractStylesFromTemplate(templateString);
    const { containerClass, contentClass } = detectContainerStructure(templateString);

    // QR kod sayfası için özel stiller
    const qrSpecificStyles = `
      .company-name {
        font-size: 2rem !important;
        font-weight: 700 !important;
        margin-bottom: 10px !important;
        text-align: center !important;
      }
      
      .person-name {
        font-size: 1.3rem !important;
        font-weight: 500 !important;
        margin-bottom: 40px !important;
        text-align: center !important;
        opacity: 0.9 !important;
      }
      
      .qr-code-container {
        text-align: center !important;
        margin: 30px auto !important;
        padding: 30px !important;
        background: rgba(255, 255, 255, 0.1) !important;
        border-radius: 20px !important;
        backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        max-width: 320px !important;
      }
      
      .qr-code-image {
        max-width: 250px !important;
        width: 100% !important;
        height: auto !important;
        border-radius: 15px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
        background: white !important;
        padding: 10px !important;
        display: block !important;
        margin: 0 auto !important;
      }
      
      .website-section {
        margin-top: 30px !important;
        text-align: center !important;
      }
      
      .website-link {
        display: inline-block !important;
        background: rgba(255, 255, 255, 0.2) !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        border-radius: 25px !important;
        padding: 12px 24px !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: 1rem !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
        backdrop-filter: blur(10px) !important;
        margin: 5px !important;
      }
      
      .website-link:hover {
        background: rgba(255, 255, 255, 0.3) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
        text-decoration: none !important;
      }
      
      /* Luxury template için özel ayarlar */
      ${containerClass === 'card' ? `
        .card {
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
          text-align: center !important;
        }
      ` : ''}
    `;

    // Dinamik QR sayfası HTML'i oluştur
    const qrPageHTML = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${firma.firma_adi} - QR Kod</title>
        <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <style>
          ${templateStyles}
          ${qrSpecificStyles}
        </style>
    </head>
    <body>
        <div class="${containerClass}">
            ${containerClass !== contentClass ? `<div class="${contentClass}">` : ''}
                <!-- Firma Adı -->
                <h1 class="company-name">${firma.firma_adi}</h1>
                
                <!-- Firma Sahibi Ad Soyad -->
                ${firma.yetkili_adi ? `<h2 class="person-name">${firma.yetkili_adi}</h2>` : ''}
                
                <!-- QR Kod -->
                <div class="qr-code-container">
                    <img src="${qrCodeDataUrl}" alt="QR Kod" class="qr-code-image">
                </div>
                
                <!-- Web Sitesi -->
                ${websiteList.length > 0 ? `
                <div class="website-section">
                    ${websiteList.map((site: any) => `
                        <a href="${site.url || site.value}" target="_blank" class="website-link">
                            ${site.url || site.value}
                        </a>
                    `).join('')}
                </div>
                ` : ''}
            ${containerClass !== contentClass ? `</div>` : ''}
        </div>
    </body>
    </html>`;

    const html = qrPageHTML;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate'
      }
    });
  } catch (error) {
    logger.error('QR sayfası oluşturma hatası', { error: error instanceof Error ? error.message : String(error), slug, stack: error instanceof Error ? error.stack : undefined });
    
    // Hata durumunda basit QR sayfası döndür
    const fallbackHtml = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>QR Kod - ${firma ? firma.firma_adi : 'Firma'}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          text-align: center; 
          padding: 20px; 
          background: #f5f5f5; 
        }
        .container { 
          max-width: 400px; 
          margin: 0 auto; 
          background: white; 
          padding: 30px; 
          border-radius: 10px; 
          box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
        }
        h1 { color: #333; margin-bottom: 20px; }
        .qr-code { margin: 20px 0; }
        .error { color: #666; font-size: 14px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${firma ? firma.firma_adi : 'Firma'}</h1>
        ${firma && firma.yetkili_adi ? `<p><strong>${firma.yetkili_adi}</strong></p>` : ''}
        ${firma && firma.yetkili_pozisyon ? `<p>${firma.yetkili_pozisyon}</p>` : ''}
        <div class="qr-code">
          <p>QR kod yüklenirken bir hata oluştu.</p>
        </div>
        <p class="error">Template yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
      </div>
    </body>
    </html>`;
    
    return new NextResponse(fallbackHtml, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache'
      }
    });
  }
}
