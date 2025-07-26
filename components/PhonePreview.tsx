'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { EyeIcon } from '@heroicons/react/24/outline';
import { getTemplateByType } from '@/app/lib/cardTemplate';
import { TEMPLATES } from '@/app/lib/templates/templateRegistry';

interface PhonePreviewProps {
  firmaAdi: string;
  yetkiliAdi: string;
  yetkiliPozisyon: string;
  profilFotoPreview: string;
  firmaLogoPreview: string;
  communicationAccounts: Array<{
    type: string;
    value: string;
    label?: string;
  }>;
  socialMediaAccounts: Array<{
    platform: string;
    url: string;
    label?: string;
  }>;
  firmaHakkinda: string;
  firmaHakkindaBaslik: string;
  templateId?: number;
  bankAccounts?: Array<{
    bank_name: string;
    bank_label: string;
    accounts: Array<{
      iban: string;
      currency: string;
    }>;
  }>;
}

const PhonePreview: React.FC<PhonePreviewProps> = ({
  firmaAdi,
  yetkiliAdi,
  yetkiliPozisyon,
  profilFotoPreview,
  firmaLogoPreview,
  communicationAccounts,
  socialMediaAccounts,
  firmaHakkinda,
  firmaHakkindaBaslik,
  templateId = 2,
  bankAccounts = []
}) => {
  // Gerçek template HTML'ini oluştur
  const templateHtml = useMemo(() => {
    // Template HTML'ini al
    let html = getTemplateByType(templateId);
    
    // Örnek veri ile değiştir
    const sampleData = {
      firma_adi: firmaAdi || "Örnek Firma",
      yetkili_adi: yetkiliAdi || "Yetkili Adı",
      yetkili_pozisyon: yetkiliPozisyon || "Pozisyon",
      profil_foto: profilFotoPreview || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      firma_logo: firmaLogoPreview || "",
      firma_hakkinda: firmaHakkinda || "Firma hakkında bilgi...",
      firma_hakkinda_baslik: firmaHakkindaBaslik || "Hakkımızda"
    };

    // Template değişkenlerini değiştir
    html = html
      .replace(/\{\{firma_adi\}\}/g, sampleData.firma_adi)
      .replace(/\{\{yetkili_adi\}\}/g, sampleData.yetkili_adi)
      .replace(/\{\{yetkili_pozisyon\}\}/g, sampleData.yetkili_pozisyon)
      .replace(/\{\{profil_foto\}\}/g, sampleData.profil_foto)
      .replace(/\{\{firma_logo\}\}/g, sampleData.firma_logo)
      .replace(/\{\{firma_hakkinda\}\}/g, sampleData.firma_hakkinda)
      .replace(/\{\{firma_hakkinda_baslik\}\}/g, sampleData.firma_hakkinda_baslik);

    // Conditional blokları işle
    html = html.replace(
      /\{\{#if profil_foto\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g,
      sampleData.profil_foto ? '$1' : '$2'
    );

    html = html.replace(
      /\{\{#if firma_logo\}\}([\s\S]*?)\{\{\/if\}\}/g,
      sampleData.firma_logo ? '$1' : ''
    );

    html = html.replace(
      /\{\{#if yetkili_adi\}\}([\s\S]*?)\{\{\/if\}\}/g,
      sampleData.yetkili_adi ? '$1' : ''
    );

    html = html.replace(
      /\{\{#if yetkili_pozisyon\}\}([\s\S]*?)\{\{\/if\}\}/g,
      sampleData.yetkili_pozisyon ? '$1' : ''
    );

    // İkonları oluştur
    const allIcons = [];
    
    // QR kod ekle
    allIcons.push({
      icon: 'fas fa-qrcode',
      label: 'QR Kod',
      url: '#'
    });

    // İletişim hesaplarını ekle
    communicationAccounts.forEach(acc => {
      const iconMap: { [key: string]: string } = {
        'telefon': 'fas fa-phone',
        'eposta': 'fas fa-envelope',
        'whatsapp': 'fab fa-whatsapp',
        'telegram': 'fab fa-telegram',
        'website': 'fas fa-globe',
        'harita': 'fas fa-map-marker-alt'
      };
      
      allIcons.push({
        icon: iconMap[acc.type] || 'fas fa-link',
        label: acc.label || acc.type,
        url: '#'
      });
    });

    // Sosyal medya hesaplarını ekle
    socialMediaAccounts.forEach(acc => {
      const iconMap: { [key: string]: string } = {
        'instagram': 'fab fa-instagram',
        'facebook': 'fab fa-facebook',
        'twitter': 'fab fa-twitter',
        'linkedin': 'fab fa-linkedin',
        'youtube': 'fab fa-youtube',
        'tiktok': 'fab fa-tiktok'
      };
      
      allIcons.push({
        icon: iconMap[acc.platform] || 'fab fa-link',
        label: acc.label || acc.platform,
        url: '#'
      });
    });

    // Banka hesapları varsa ekle
    if (bankAccounts && bankAccounts.length > 0) {
      allIcons.push({
        icon: 'fas fa-university',
        label: 'Banka Hesapları',
        url: '#'
      });
    }

    // Hakkımızda ekle
    if (firmaHakkinda) {
      allIcons.push({
        icon: 'fas fa-info-circle',
        label: firmaHakkindaBaslik || 'Hakkımızda',
        url: '#'
      });
    }

    // İkonları HTML'e çevir
    let iconsHtml = '';
    allIcons.forEach(icon => {
      iconsHtml += `
        <div class="icon-card">
          <a href="${icon.url}">
            <i class="${icon.icon}"></i>
            <span class="icon-label">${icon.label}</span>
          </a>
        </div>
      `;
    });

    // Template'e göre ikon yerleştirme
    if (templateId === 3 || templateId === 8 || templateId === 14) {
      // Minimal template'ler - liste formatı
      html = html.replace('<div class="icons-grid">', `<div class="icons-grid minimal-list">${iconsHtml}`);
    } else {
      // Diğer template'ler - grid formatı
      html = html.replace('<div class="icons-grid">', `<div class="icons-grid">${iconsHtml}`);
    }

    // Kalan conditional blokları ve değişkenleri temizle
    html = html
      .replace(/\{\{#if[\s\S]*?\{\{\/if\}\}/g, '')
      .replace(/\{\{#each[\s\S]*?\{\{\/each\}\}/g, '')
      .replace(/\{\{#unless[\s\S]*?\{\{\/unless\}\}/g, '')
      .replace(/\{\{[^}]*\}\}/g, '');

    // Mobil dostu CSS ekle
    const mobileCSS = `
      <style>
        body { 
          margin: 0; 
          padding: 0; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow-x: hidden;
        }
        .container { 
          max-width: 100%; 
          padding: 10px;
          box-sizing: border-box;
        }
        .icons-grid { 
          display: grid !important; 
          grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)) !important; 
          gap: 8px !important; 
          max-width: 100% !important;
        }
        .icons-grid.minimal-list { 
          display: flex !important; 
          flex-direction: column !important; 
          gap: 1px !important; 
          background: #f3f4f6 !important;
          border-radius: 8px !important;
          overflow: hidden !important;
        }
        .icon-card { 
          display: flex !important; 
          flex-direction: column !important; 
          align-items: center !important; 
          text-align: center !important; 
          padding: 8px 4px !important; 
          border-radius: 6px !important; 
          min-height: 60px !important;
          justify-content: center !important;
        }
        .minimal-list .icon-card {
          background: white !important;
          padding: 12px 16px !important;
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 12px !important;
          text-align: left !important;
          min-height: auto !important;
        }
        .minimal-list .icon-card a {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          width: 100% !important;
          color: inherit !important;
          text-decoration: none !important;
        }
        .minimal-list .icon-card i {
          width: 32px !important;
          height: 32px !important;
          border-radius: 6px !important;
          background: #f3f4f6 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 16px !important;
          color: #6b7280 !important;
          flex-shrink: 0 !important;
        }
        .icon-card:not(.minimal-list .icon-card) i { 
          font-size: 20px !important; 
          margin-bottom: 4px !important; 
        }
        .icon-card .icon-label { 
          font-size: 10px !important; 
          font-weight: 500 !important; 
          line-height: 1.2 !important; 
          word-wrap: break-word !important;
          max-width: 100% !important;
        }
        .minimal-list .icon-label {
          font-size: 14px !important;
          text-align: left !important;
        }
        .profile-section { 
          text-align: center !important; 
          margin-bottom: 16px !important; 
        }
        .profile-photo { 
          width: 80px !important; 
          height: 80px !important; 
          border-radius: 50% !important; 
          margin: 0 auto 8px !important; 
        }
        .company-name { 
          font-size: 16px !important; 
          font-weight: bold !important; 
          margin-bottom: 4px !important; 
        }
        .person-name { 
          font-size: 14px !important; 
          font-weight: 600 !important; 
          margin-bottom: 2px !important; 
        }
        .position { 
          font-size: 12px !important; 
          opacity: 0.8 !important; 
        }
        
        /* Rehbere Ekle Butonu Template'e Göre */
        .contact-button {
          margin-bottom: 16px !important;
          padding: 8px 12px !important;
          border-radius: 8px !important;
          font-size: 12px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          text-decoration: none !important;
          border: 1px solid rgba(255,255,255,0.3) !important;
        }
        
        /* Banka İkonu - Sadece IBAN bilgisi varsa göster */
        .bank-icon {
          ${bankAccounts && bankAccounts.length > 0 && bankAccounts.some(bank => bank.accounts.some(acc => acc.iban)) ? '' : 'display: none !important;'}
        }
      </style>
    `;

    return mobileCSS + html;
  }, [templateId, firmaAdi, yetkiliAdi, yetkiliPozisyon, profilFotoPreview, firmaLogoPreview, communicationAccounts, socialMediaAccounts, firmaHakkinda, firmaHakkindaBaslik, bankAccounts]);

  // Template bilgisini al
  const templateInfo = TEMPLATES.find(t => t.id === templateId);

  // Preview butonu fonksiyonu - Temalar sayfasındaki gibi
  const handlePreviewClick = () => {
    const newWindow = window.open('', '_blank', 'width=400,height=700,scrollbars=yes');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
          <title>${firmaAdi || 'Kartvizit Önizleme'}</title>
        </head>
        <body>
          ${templateHtml}
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative">
        
        {/* Phone Frame - Temalar sayfasındaki gibi */}
        <div className="w-80 h-[600px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
            {/* Preview Content - Isolated with iframe */}
            <iframe
              className="w-full h-full border-0"
              srcDoc={`
                <!DOCTYPE html>
                <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                  <style>
                    body { 
                      margin: 0; 
                      padding: 0; 
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                      overflow-x: hidden;
                    }
                    * {
                      box-sizing: border-box;
                    }
                  </style>
                </head>
                <body>
                  ${templateHtml}
                </body>
                </html>
              `}
              title="Template Preview"
            />
          </div>
        </div>
        
        {/* Phone Details - Temalar sayfasındaki gibi */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-black rounded-full"></div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-black rounded-full"></div>
        
      </div>
    </div>
  );
};

export default PhonePreview;
