import { NextRequest, NextResponse } from 'next/server';
import Handlebars from 'handlebars';
import { getFirmaBySlug } from '@/app/lib/direct-db';
import QRCode from 'qrcode';
import { getTemplateById } from '@/app/lib/templates/templateRegistry';
import { logger } from '@/app/lib/logger';

// Template dosyalarını dinamik olarak import etmek için
async function getTemplateModule(templateId: number) {
  try {
    switch (templateId) {
      case 1:
        return await import('@/app/lib/templates/template1-gold');
      case 2:
        return await import('@/app/lib/templates/template2-waves');
      case 3:
        return await import('@/app/lib/templates/template3-golden-edge');
      case 4:
        return await import('@/app/lib/templates/template4-red-flow');
      case 5:
        return await import('@/app/lib/templates/template5-luxury-black');
      case 6:
        return await import('@/app/lib/templates/template6-line-mesh');
      case 7:
        return await import('@/app/lib/templates/template7-color-rings');
      case 8:
        return await import('@/app/lib/templates/template8-golden-blocks');
      case 9:
        return await import('@/app/lib/templates/template9-crystal-stripes');
      default:
        return await import('@/app/lib/templates/template1-gold'); // Default template
    }
  } catch (error) {
    logger.error(`Template ${templateId} yüklenemedi`, { templateId, error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
    return await import('@/app/lib/templates/template1-gold'); // Fallback
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  let firma: any = null;
  
  try {
    // Firma bilgilerini al - DIRECT DB
    firma = await getFirmaBySlug(slug);
    
    if (!firma) {
      return NextResponse.json({ error: 'Firma bulunamadı' }, { status: 404 });
    }

    // Firmanın template ID'sini al (varsayılan 1)
    const templateId = firma.template_id || 1;
    
    // Template modülünü yükle
    const templateModule = await getTemplateModule(templateId);
    
    // Template string'ini al - any kullanarak tip hatalarını önle
    const templateModuleAny = templateModule as any;
    let templateString = '';
    
    // Template export isimlerini template ID'ye göre belirle
    const getTemplateExportName = (templateId: number): string => {
      switch (templateId) {
        case 1: return 'goldTemplate';
        case 2: return 'wavesTemplate';
        case 3: return 'goldenEdgeTemplate';
        case 4: return 'redFlowTemplate';
        case 5: return 'luxuryBlackTemplate';
        case 6: return 'lineMeshTemplate';
        case 7: return 'colorRingsTemplate';
        case 8: return 'goldenBlocksTemplate';
        case 9: return 'crystalStripesTemplate';
        default: return 'goldTemplate';
      }
    };
    
    const exportName = getTemplateExportName(templateId);
    
    // Template export'unu kontrol et
    if (templateModuleAny[exportName]) {
      templateString = templateModuleAny[exportName];
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
    const qrData = `${request.nextUrl.origin}/qr/${slug}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, { 
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#0000'  // Şeffaf arka plan
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
    
    // Eğer websiteler yoksa firma_web_site alanını kontrol et
    if (websiteList.length === 0 && firma.firma_web_site) {
      websiteList = [{ url: firma.firma_web_site, value: firma.firma_web_site }];
    }
    
    // Eğer hala website yoksa default olarak firma adından .com oluştur (demo için)
    if (websiteList.length === 0) {
      const demoWebsite = `www.${firma.firma_adi?.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '') || 'example'}.com`;
      websiteList = [{ url: `https://${demoWebsite}`, value: demoWebsite }];
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
      * {
        font-family: 'Rubik', sans-serif !important;
      }
      
      .person-name {
        font-size: 2rem !important;
        font-weight: 700 !important;
        margin-bottom: 8px !important;
        text-align: center !important;
        opacity: 1 !important;
      }
      
      .person-position {
        font-size: 2rem !important;
        font-weight: 500 !important;
        margin-top: 20px !important;
        margin-bottom: 10px !important;
        text-align: center !important;
        opacity: 0.9 !important;
      }
      
      .qr-code-container {
        text-align: center !important;
        margin: 10px auto !important;
        padding: 20px !important;
        max-width: 320px !important;
      }
      
      .qr-code-image {
        max-width: 250px !important;
        width: 100% !important;
        height: auto !important;
        display: block !important;
        margin: 0 auto !important;
      }
      
      .qr-scanner-frame {
        position: relative !important;
        display: inline-block !important;
      }
      
      .qr-scanner-frame::before,
      .qr-scanner-frame::after {
        content: '' !important;
        position: absolute !important;
        width: 20px !important;
        height: 20px !important;
        border: 2px solid #000000 !important;
      }
      
      .qr-scanner-frame::before {
        top: -10px !important;
        left: -10px !important;
        border-right: none !important;
        border-bottom: none !important;
      }
      
      .qr-scanner-frame::after {
        top: -10px !important;
        right: -10px !important;
        border-left: none !important;
        border-bottom: none !important;
      }
      
      .qr-scanner-frame .qr-corner-bottom-left,
      .qr-scanner-frame .qr-corner-bottom-right {
        position: absolute !important;
        width: 20px !important;
        height: 20px !important;
        border: 2px solid #000000 !important;
        content: '' !important;
      }
      
      .qr-scanner-frame .qr-corner-bottom-left {
        bottom: -10px !important;
        left: -10px !important;
        border-right: none !important;
        border-top: none !important;
      }
      
      .qr-scanner-frame .qr-corner-bottom-right {
        bottom: -10px !important;
        right: -10px !important;
        border-left: none !important;
        border-top: none !important;
      }
      
      .company-logo-section {
        text-align: center !important;
        margin-top: 25px !important;
        padding-top: 20px !important;
        border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
      }
      
      .company-logo {
        max-width: 120px !important;
        max-height: 80px !important;
        height: auto !important;
        object-fit: contain !important;
        display: block !important;
        margin: 0 auto !important;
      }
      
      .website-url-section {
        text-align: center !important;
        margin-bottom: 15px !important;
      }
      
      .website-url {
        font-size: 0.9rem !important;
        font-weight: 500 !important;
        color: #000000 !important;
        text-decoration: none !important;
        padding: 8px 16px !important;
        display: inline-block !important;
        transition: all 0.3s ease !important;
        word-break: break-all !important;
      }
      
      .website-url:hover {
        transform: translateY(-1px) !important;
        text-decoration: none !important;
        color: #333333 !important;
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
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap">
        <style>
          ${templateStyles}
          ${qrSpecificStyles}
        </style>
    </head>
    <body>
        <div class="${containerClass}">
            ${containerClass !== contentClass ? `<div class="${contentClass}">` : ''}
                <!-- Firma Sahibi Ad Soyad -->
                ${firma.yetkili_adi ? `<h1 class="person-name">${firma.yetkili_adi}</h1>` : ''}
                
                <!-- QR Kod -->
                <div class="qr-code-container">
                    <div class="qr-scanner-frame">
                        <img src="${qrCodeDataUrl}" alt="QR Kod" class="qr-code-image">
                        <div class="qr-corner-bottom-left"></div>
                        <div class="qr-corner-bottom-right"></div>
                    </div>
                    
                    <!-- Firma Sahibi Ünvanı -->
                    ${firma.yetkili_pozisyon ? `<h2 class="person-position">${firma.yetkili_pozisyon}</h2>` : ''}
                    
                    <!-- Web Site URL -->
                    ${websiteList.length > 0 ? `
                    <div class="website-url-section">
                        <a href="${websiteList[0].url || websiteList[0].value}" target="_blank" class="website-url">
                            ${(websiteList[0].url || websiteList[0].value).replace(/^https?:\/\//, '')}
                        </a>
                    </div>
                    ` : ''}
                    
                    <!-- Firma Logosu -->
                    ${firma.firma_logo ? `
                    <div class="company-logo-section">
                        <img src="${firma.firma_logo}" alt="${firma.firma_adi} Logo" class="company-logo">
                    </div>
                    ` : ''}
                </div>
                
                <!-- Web Sitesi bölümü kaldırıldı, artık logo üstünde gösteriliyor -->
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
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap">
      <style>
        body { 
          font-family: 'Rubik', sans-serif; 
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
        .company-logo {
          max-width: 120px;
          max-height: 80px;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          background: white;
          padding: 8px;
          margin: 15px auto;
          display: block;
        }
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
          ${firma && firma.firma_logo ? `<img src="${firma.firma_logo}" alt="${firma.firma_adi} Logo" class="company-logo">` : ''}
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
