'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, EyeIcon } from '@heroicons/react/24/outline';
import { TEMPLATES } from '@/app/lib/templates/templateRegistry';
import { getTemplateByType } from '@/app/lib/cardTemplate';
import { getIconOrderClient, getOrderedIconsClient } from '@/app/lib/iconOrder.client';

// Örnek firma verisi template önizleme için - TAM DOLU VERİ (Yeni firma ekleme formundaki tüm alanları kapsıyor)
const SAMPLE_DATA = {
  // Tab 1: Firma Bilgileri
  firma_adi: "Örnek Teknoloji A.Ş.",
  slug: "ornek-teknoloji",
  yetkili_adi: "Ahmet Yılmaz",
  yetkili_pozisyon: "Genel Müdür",
  profil_foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  firma_logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
  templateId: 2, // Modern template
  
  // Tab 2: Kurumsal Bilgiler
  firma_unvan: "Örnek Teknoloji Anonim Şirketi",
  firma_vergi_no: "1234567890",
  vergi_dairesi: "Merkez Vergi Dairesi",
  firma_hakkinda: "Örnek Teknoloji A.Ş. olarak 2020 yılından bu yana teknoloji sektöründe hizmet vermekteyiz. Müşterilerimize en kaliteli çözümleri sunmak için çalışıyoruz. Uzman ekibimizle birlikte sektörde öncü konumdayız ve sürekli gelişen teknolojiye ayak uydurarak müşteri memnuniyetini ön planda tutuyoruz.",
  firma_hakkinda_baslik: "Hakkımızda",
  katalog_dosya: "https://example.com/katalog.pdf",
  
  // Tab 3: Sosyal medya platformları - her birinden 1'er tane
  social_media: [
    { platform: "instagram", url: "@ornekteknoloji", icon: "fab fa-instagram", label: "Instagram" },
    { platform: "facebook", url: "facebook.com/ornekteknoloji", icon: "fab fa-facebook", label: "Facebook" },
    { platform: "twitter", url: "@ornekteknoloji", icon: "fab fa-twitter", label: "Twitter" },
    { platform: "linkedin", url: "linkedin.com/company/ornekteknoloji", icon: "fab fa-linkedin", label: "LinkedIn" },
    { platform: "youtube", url: "youtube.com/@ornekteknoloji", icon: "fab fa-youtube", label: "YouTube" },
    { platform: "tiktok", url: "@ornekteknoloji", icon: "fab fa-tiktok", label: "TikTok" }
  ],
  
  // Tab 4: İletişim kanalları - her türden 1'er tane
  communication: [
    { type: "telefon", url: "tel:+905551234567", icon: "fas fa-phone", label: "Telefon" },
    { type: "eposta", url: "mailto:info@ornekteknoloji.com", icon: "fas fa-envelope", label: "E-posta" },
    { type: "whatsapp", url: "https://wa.me/905551234567", icon: "fab fa-whatsapp", label: "WhatsApp" },
    { type: "telegram", url: "https://t.me/ornekteknoloji", icon: "fab fa-telegram", label: "Telegram" },
    { type: "website", url: "https://www.ornekteknoloji.com", icon: "fas fa-globe", label: "Website" },
    { type: "harita", url: "https://maps.google.com/?q=Istanbul,Turkey", icon: "fas fa-map-marker-alt", label: "Harita" }
  ],
  
  // QR Kod - Her zaman mevcut
  qr_code: {
    url: "https://ornekteknoloji.com/qr",
    label: "QR Kod"
  },
  
  // Katalog
  katalog: {
    url: "https://example.com/katalog.pdf",
    label: "Ürün Kataloğu"
  },
  
  // Tab 5: Banka hesapları - 3 farklı banka, her birinde 3 para birimi
  iban: {
    label: "Banka Hesapları",
    value: JSON.stringify([
      {
        bank_name: "ziraat",
        bank_label: "Ziraat Bankası",
        bank_logo: "/img/banks/ziraat.png",
        account_holder: "Örnek Teknoloji A.Ş.",
        accounts: [
          { iban: "TR33 0001 0000 0000 0000 0000 01", currency: "TRY" },
          { iban: "TR33 0001 0000 0000 0000 0000 02", currency: "USD" },
          { iban: "TR33 0001 0000 0000 0000 0000 03", currency: "EUR" }
        ]
      },
      {
        bank_name: "garanti",
        bank_label: "Garanti BBVA",
        bank_logo: "/img/banks/garanti.png",
        account_holder: "Örnek Teknoloji A.Ş.",
        accounts: [
          { iban: "TR44 0062 0000 0000 0000 0000 01", currency: "TRY" },
          { iban: "TR44 0062 0000 0000 0000 0000 02", currency: "USD" },
          { iban: "TR44 0062 0000 0000 0000 0000 03", currency: "EUR" }
        ]
      },
      {
        bank_name: "isbankasi",
        bank_label: "İş Bankası",
        bank_logo: "/img/banks/isbankasi.png",
        account_holder: "Örnek Teknoloji A.Ş.",
        accounts: [
          { iban: "TR55 0064 0000 0000 0000 0000 01", currency: "TRY" },
          { iban: "TR55 0064 0000 0000 0000 0000 02", currency: "USD" },
          { iban: "TR55 0064 0000 0000 0000 0000 03", currency: "EUR" }
        ]
      }
    ])
  },
  
  // Vergi bilgileri (kurumsal bilgilerden)
  tax: {
    label: "Vergi Bilgileri",
    firma_unvan: "Örnek Teknoloji Anonim Şirketi",
    firma_vergi_no: "1234567890",
    vergi_dairesi: "Merkez Vergi Dairesi"
  },
  
  // Hakkımızda bilgileri (kurumsal bilgilerden)
  about: {
    label: "Hakkımızda",
    content: "Örnek Teknoloji A.Ş. olarak 2020 yılından bu yana teknoloji sektöründe hizmet vermekteyiz. Müşterilerimize en kaliteli çözümleri sunmak için çalışıyoruz. Uzman ekibimizle birlikte sektörde öncü konumdayız ve sürekli gelişen teknolojiye ayak uydurarak müşteri memnuniyetini ön planda tutuyoruz."
  }
};

// Handlebars helper fonksiyonları
const parseBankAccounts = (jsonStr: string) => {
  try {
    return JSON.parse(jsonStr);
  } catch {
    return [];
  }
};

const ifEquals = (arg1: string, arg2: string, options: any) => {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
};

export default function TemalarPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string>('');

  const handleTemplateSelect = async (templateId: number) => {
    setSelectedTemplate(templateId);
    
    // Global JavaScript fonksiyonlarını tanımla
    if (typeof window !== 'undefined') {
      (window as any).showTaxPopup = (e: Event) => {
        e.preventDefault();
        const popup = document.getElementById('tax-popup');
        if (popup) popup.style.display = 'flex';
      };
      
      (window as any).closeTaxPopup = () => {
        const popup = document.getElementById('tax-popup');
        if (popup) popup.style.display = 'none';
      };
      
      (window as any).showAboutPopup = (e: Event) => {
        e.preventDefault();
        const popup = document.getElementById('about-popup');
        if (popup) popup.style.display = 'flex';
      };
      
      (window as any).closeAboutPopup = () => {
        const popup = document.getElementById('about-popup');
        if (popup) popup.style.display = 'none';
      };
      
      (window as any).showBankPopup = (e: Event) => {
        e.preventDefault();
        const popup = document.getElementById('bank-popup');
        if (popup) popup.style.display = 'flex';
      };
      
      (window as any).closeBankPopup = () => {
        const popup = document.getElementById('bank-popup');
        if (popup) popup.style.display = 'none';
      };
      
      (window as any).copyToClipboard = (text: string, event: Event) => {
        event.preventDefault();
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          const btn = event.currentTarget as HTMLButtonElement;
          const originalText = btn.textContent;
          btn.textContent = 'Kopyalandı!';
          setTimeout(() => { 
            btn.textContent = originalText;
          }, 1000);
        });
      };
    }
    
    // Template HTML'ini al
    let templateHtml = getTemplateByType(templateId);
    
    // Tüm template değişkenlerini değiştir
    templateHtml = templateHtml
      .replace(/\{\{firma_adi\}\}/g, SAMPLE_DATA.firma_adi)
      .replace(/\{\{slug\}\}/g, SAMPLE_DATA.slug)
      .replace(/\{\{yetkili_adi\}\}/g, SAMPLE_DATA.yetkili_adi)
      .replace(/\{\{yetkili_pozisyon\}\}/g, SAMPLE_DATA.yetkili_pozisyon)
      .replace(/\{\{profil_foto\}\}/g, SAMPLE_DATA.profil_foto)
      .replace(/\{\{firma_logo\}\}/g, SAMPLE_DATA.firma_logo);

    // Profil fotoğrafı conditional'ını işle
    templateHtml = templateHtml.replace(
      /\{\{#if profil_foto\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g,
      '$1'
    );

    // Firma logosu conditional'ını işle
    templateHtml = templateHtml.replace(
      /\{\{#if firma_logo\}\}([\s\S]*?)\{\{\/if\}\}/g,
      '$1'
    );

    // Yetkili adı conditional'ını işle
    templateHtml = templateHtml.replace(
      /\{\{#if yetkili_adi\}\}([\s\S]*?)\{\{\/if\}\}/g,
      '$1'
    );

    // Yetkili pozisyon conditional'ını işle
    templateHtml = templateHtml.replace(
      /\{\{#if yetkili_pozisyon\}\}([\s\S]*?)\{\{\/if\}\}/g,
      '$1'
    );

    // Sıralama sistemini kullanarak ikonları oluştur
    const iconOrder = await getIconOrderClient();
    const orderedIcons = getOrderedIconsClient(SAMPLE_DATA, iconOrder);
    
    // İkon mapping objesi
    const iconMapping: { [key: string]: { icon: string; url: string; onclick?: string } } = {
      qr: { icon: 'fas fa-qrcode', url: SAMPLE_DATA.qr_code.url },
      instagram: { icon: 'fab fa-instagram', url: SAMPLE_DATA.social_media.find(s => s.platform === 'instagram')?.url || '#' },
      facebook: { icon: 'fab fa-facebook', url: SAMPLE_DATA.social_media.find(s => s.platform === 'facebook')?.url || '#' },
      twitter: { icon: 'fab fa-twitter', url: SAMPLE_DATA.social_media.find(s => s.platform === 'twitter')?.url || '#' },
      linkedin: { icon: 'fab fa-linkedin', url: SAMPLE_DATA.social_media.find(s => s.platform === 'linkedin')?.url || '#' },
      youtube: { icon: 'fab fa-youtube', url: SAMPLE_DATA.social_media.find(s => s.platform === 'youtube')?.url || '#' },
      tiktok: { icon: 'fab fa-tiktok', url: SAMPLE_DATA.social_media.find(s => s.platform === 'tiktok')?.url || '#' },
      telefon: { icon: 'fas fa-phone', url: SAMPLE_DATA.communication.find(c => c.type === 'telefon')?.url || '#' },
      eposta: { icon: 'fas fa-envelope', url: SAMPLE_DATA.communication.find(c => c.type === 'eposta')?.url || '#' },
      whatsapp: { icon: 'fab fa-whatsapp', url: SAMPLE_DATA.communication.find(c => c.type === 'whatsapp')?.url || '#' },
      telegram: { icon: 'fab fa-telegram', url: SAMPLE_DATA.communication.find(c => c.type === 'telegram')?.url || '#' },
      website: { icon: 'fas fa-globe', url: SAMPLE_DATA.communication.find(c => c.type === 'website')?.url || '#' },
      harita: { icon: 'fas fa-map-marker-alt', url: SAMPLE_DATA.communication.find(c => c.type === 'harita')?.url || '#' },
      katalog: { icon: 'fas fa-book', url: SAMPLE_DATA.katalog.url },
      banka: { icon: 'fas fa-university', url: '#', onclick: 'showBankPopup(event)' },
      vergi: { icon: 'fas fa-file-invoice', url: '#', onclick: 'showTaxPopup(event)' },
      hakkimizda: { icon: 'fas fa-info-circle', url: '#', onclick: 'showAboutPopup(event)' }
    };

    // Sıralı ikonları HTML'e çevir
    let allIcons = '';
    orderedIcons.forEach((iconConfig: any) => {
      const mapping = iconMapping[iconConfig.id];
      if (mapping) {
        const onclickAttr = mapping.onclick ? ` onclick="${mapping.onclick}"` : '';
        // YouTube için özel styling (Luxury template'de)
        const isYoutube = iconConfig.id === 'youtube';
        const specialClass = (templateId === 6 && isYoutube) ? ' youtube-special' : '';
        
        allIcons += `
          <div class="icon-card${specialClass}">
            <a href="${mapping.url}" target="_blank"${onclickAttr}>
              <i class="${mapping.icon}"></i>
              <span class="icon-label">${iconConfig.label}</span>
            </a>
          </div>
        `;
      }
    });

    // Template'e göre ikon yerleştirme
    if (templateId === 3) { // Minimal template - liste formatı
      // Minimal template'de icons-grid kullanılıyor (liste formatında)
      templateHtml = templateHtml.replace(/\{\{#if social_media\}\}[\s\S]*?\{\{\/if\}\}/g, '');
      templateHtml = templateHtml.replace(/\{\{#if communication\}\}[\s\S]*?\{\{\/if\}\}/g, '');
      templateHtml = templateHtml.replace(/\{\{#if katalog\}\}[\s\S]*?\{\{\/if\}\}/g, '');
      templateHtml = templateHtml.replace(/\{\{#if iban\}\}[\s\S]*?\{\{\/if\}\}/g, '');
      templateHtml = templateHtml.replace(/\{\{#if tax\}\}[\s\S]*?\{\{\/if\}\}/g, '');
      templateHtml = templateHtml.replace(/\{\{#if about\}\}[\s\S]*?\{\{\/if\}\}/g, '');
      templateHtml = templateHtml.replace('<div class="icons-grid">', `<div class="icons-grid minimal-list">${allIcons}`);
    } else {
      // Diğer template'ler - grid formatı
      templateHtml = templateHtml.replace(/\{\{#if social_media\}\}[\s\S]*?\{\{\/if\}\}/g, '');
      templateHtml = templateHtml.replace(/\{\{#if communication\}\}[\s\S]*?\{\{\/if\}\}/g, '');
      templateHtml = templateHtml.replace('<div class="icons-grid">', `<div class="icons-grid">${allIcons}`);
    }

    // Popup içeriklerini işle
    templateHtml = templateHtml
      .replace(/\{\{tax\.firma_unvan\}\}/g, SAMPLE_DATA.tax.firma_unvan)
      .replace(/\{\{tax\.firma_vergi_no\}\}/g, SAMPLE_DATA.tax.firma_vergi_no)
      .replace(/\{\{tax\.vergi_dairesi\}\}/g, SAMPLE_DATA.tax.vergi_dairesi)
      .replace(/\{\{about\.content\}\}/g, SAMPLE_DATA.about.content);

    // Banka hesapları conditional'ını işle
    templateHtml = templateHtml.replace(
      /\{\{#if iban\.value\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g,
      '$1'
    );

    // Banka hesapları each loop'unu işle
    const bankAccountsHtml = SAMPLE_DATA.iban.value ? JSON.parse(SAMPLE_DATA.iban.value).map((bank: any) => `
      <div class="bank-card">
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          ${bank.bank_logo ? `<img src="${bank.bank_logo}" alt="${bank.bank_label}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px;">` : ''}
          <div>
            <div style="font-weight: 600; font-size: 1.1rem;">${bank.bank_label}</div>
            <div style="font-size: 0.9rem; opacity: 0.8;">${bank.account_holder}</div>
          </div>
        </div>
        ${bank.accounts.map((account: any) => `
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 50%; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem;">
              ${account.currency === 'TL' || account.currency === 'TRY' ? '₺' : account.currency === 'USD' ? '$' : account.currency === 'EUR' ? '€' : '₺'}
            </span>
            <input type="text" class="iban-text" value="${account.iban}" readonly style="flex:1; margin-right: 10px;">
            <button class="copy-btn" onclick="copyToClipboard('${account.iban}', event)">Kopyala</button>
          </div>
        `).join('')}
      </div>
    `).join('') : '<div style="text-align:center; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>';

    templateHtml = templateHtml.replace(
      /\{\{#each \(parseBankAccounts iban\.value\) as \|bank\|\}\}[\s\S]*?\{\{\/each\}\}/g,
      bankAccountsHtml
    );

    // Tüm conditional blokları ve kalan değişkenleri temizle
    templateHtml = templateHtml
      .replace(/\{\{#if[\s\S]*?\{\{\/if\}\}/g, '')
      .replace(/\{\{#each[\s\S]*?\{\{\/each\}\}/g, '')
      .replace(/\{\{#unless[\s\S]*?\{\{\/unless\}\}/g, '')
      .replace(/\{\{[^}]*\}\}/g, ''); // Kalan tüm değişkenleri temizle

    // Responsive CSS ekle - Mobil dostu, hover efektleri kaldırıldı
    const responsiveCSS = `
      <style>
        /* Mobil dostu responsive düzenlemeler */
        .container { 
          max-width: 100%; 
          overflow-x: hidden; 
          padding: 10px;
        }
        
        /* Grid template'ler için */
        .icons-grid { 
          display: grid !important; 
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)) !important; 
          gap: 10px !important; 
          max-width: 100% !important;
        }
        
        /* Minimal template için liste formatı */
        .icons-grid.minimal-list { 
          display: flex !important; 
          flex-direction: column !important; 
          gap: 1px !important; 
          background: #f3f4f6 !important;
          border-radius: 8px !important;
          overflow: hidden !important;
        }
        
        /* Grid formatındaki icon card'lar */
        .icon-card { 
          display: flex !important; 
          flex-direction: column !important; 
          align-items: center !important; 
          text-align: center !important; 
          padding: 12px 8px !important; 
          border-radius: 8px !important; 
          min-height: 70px !important;
          justify-content: center !important;
          cursor: pointer !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        
        /* Minimal template için liste item formatı */
        .minimal-list .icon-card {
          background: white !important;
          padding: 16px 20px !important;
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 16px !important;
          text-align: left !important;
          min-height: auto !important;
        }
        
        .minimal-list .icon-card a {
          display: flex !important;
          align-items: center !important;
          gap: 16px !important;
          width: 100% !important;
          color: inherit !important;
          text-decoration: none !important;
        }
        
        .minimal-list .icon-card i {
          width: 40px !important;
          height: 40px !important;
          border-radius: 8px !important;
          background: #f3f4f6 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 20px !important;
          color: #6b7280 !important;
          flex-shrink: 0 !important;
        }
        
        .minimal-list .icon-label {
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          color: #111827 !important;
          flex: 1 !important;
          text-align: left !important;
        }
        
        /* Grid formatındaki icon styling */
        .icon-card:not(.minimal-list .icon-card) i { 
          font-size: 24px !important; 
          margin-bottom: 6px !important; 
        }
        
        .icon-card:not(.minimal-list .icon-card) .icon-label { 
          font-size: 11px !important; 
          font-weight: 500 !important; 
          line-height: 1.3 !important; 
          word-wrap: break-word !important;
          max-width: 100% !important;
        }
        
        /* Touch-friendly active states (mobil için) */
        .icon-card:active {
          transform: scale(0.95) !important;
          opacity: 0.8 !important;
        }
        
        /* Template özel düzenlemeler */
        .profile-section { 
          text-align: center !important; 
          margin-bottom: 20px !important; 
        }
        .profile-photo { 
          width: 100px !important; 
          height: 100px !important; 
          border-radius: 50% !important; 
          margin: 0 auto 10px !important; 
        }
        .company-name { 
          font-size: 18px !important; 
          font-weight: bold !important; 
          margin-bottom: 5px !important; 
        }
        .person-name { 
          font-size: 16px !important; 
          font-weight: 600 !important; 
          margin-bottom: 3px !important; 
        }
        .position { 
          font-size: 14px !important; 
          opacity: 0.8 !important; 
        }
        
        /* Contact button mobil dostu */
        .contact-button {
          -webkit-tap-highlight-color: transparent !important;
        }
        .contact-button:active {
          transform: scale(0.95) !important;
        }
        
        /* Logo mobil dostu */
        .logo-image {
          -webkit-tap-highlight-color: transparent !important;
        }
        .logo-image:active {
          transform: scale(0.95) !important;
        }
        
        /* Popup butonları mobil dostu */
        .copy-btn, .custom-popup-close {
          -webkit-tap-highlight-color: transparent !important;
        }
        .copy-btn:active, .custom-popup-close:active {
          transform: scale(0.95) !important;
        }
        
        /* Modern template özel düzenlemeler */
        .modern-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          min-height: 100vh !important;
          padding: 20px !important;
        }
        
        /* Colorful template özel düzenlemeler */
        .colorful-container {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7) !important;
          background-size: 400% 400% !important;
          animation: gradientShift 15s ease infinite !important;
          min-height: 100vh !important;
          padding: 20px !important;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Corporate template özel düzenlemeler */
        .corporate-container {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
          color: white !important;
          min-height: 100vh !important;
          padding: 20px !important;
        }
        .corporate-container .icon-card {
          background: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
      </style>
    `;

    // CSS'i HTML'e ekle
    templateHtml = responsiveCSS + templateHtml;

    setPreviewHtml(templateHtml);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Yönetim Paneli</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            Genel Bakış
          </Link>
          
          <Link
            href="/admin/firmalar"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Firmalar
          </Link>
          
          <Link
            href="/admin/firmalar/yeni"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Yeni Firma Ekle
          </Link>

          <Link
            href="/admin/temalar"
            className="flex items-center px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            Temalar
          </Link>

          <Link
            href="/admin/ayarlar"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Sıralama
          </Link>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">© 2025 Sanal Kartvizit</span>
            <Link 
              href="/login"
              className="text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Çıkış
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kartvizit Temaları</h1>
                <p className="text-sm text-gray-600 mt-1">Mevcut kartvizit tasarımlarını görüntüleyin ve önizleyin</p>
              </div>
              <Link 
                href="/admin" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Geri Dön
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          <div className="flex gap-8">
            {/* Template List */}
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Mevcut Temalar</h2>
                <div className="space-y-3">
                  {TEMPLATES.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        </div>
                        <EyeIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      {/* Template özellikleri */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {template.features.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1">
              {selectedTemplate ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {TEMPLATES.find(t => t.id === selectedTemplate)?.name} Önizlemesi
                    </h2>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => {
                          const newWindow = window.open('', '_blank', 'width=400,height=700');
                          if (newWindow) {
                            newWindow.document.write(`
                              <!DOCTYPE html>
                              <html>
                              <head>
                                <title>${TEMPLATES.find(t => t.id === selectedTemplate)?.name} Template Önizleme</title>
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                                <style>
                                  body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
                                  .container { width: 100%; height: 100vh; overflow-y: auto; }
                                </style>
                              </head>
                              <body>
                                <div class="container">
                                  ${previewHtml}
                                </div>
                                <script>
                                  function showTaxPopup(e) {
                                    e.preventDefault();
                                    document.getElementById('tax-popup').style.display = 'flex';
                                  }
                                  function closeTaxPopup() {
                                    document.getElementById('tax-popup').style.display = 'none';
                                  }
                                  function showAboutPopup(e) {
                                    e.preventDefault();
                                    document.getElementById('about-popup').style.display = 'flex';
                                  }
                                  function closeAboutPopup() {
                                    document.getElementById('about-popup').style.display = 'none';
                                  }
                                  function showBankPopup(e) {
                                    e.preventDefault();
                                    document.getElementById('bank-popup').style.display = 'flex';
                                  }
                                  function closeBankPopup() {
                                    document.getElementById('bank-popup').style.display = 'none';
                                  }
                                  function copyToClipboard(text, event) {
                                    event.preventDefault();
                                    if (!text) return;
                                    navigator.clipboard.writeText(text).then(function() {
                                      const btn = event.currentTarget;
                                      const originalText = btn.textContent;
                                      btn.textContent = 'Kopyalandı!';
                                      setTimeout(() => { 
                                        btn.textContent = originalText;
                                      }, 1000);
                                    });
                                  }
                                </script>
                              </body>
                              </html>
                            `);
                            newWindow.document.close();
                          }
                        }}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Tarayıcıda Göster
                      </button>
                      <div className="text-sm text-gray-500">
                        Template ID: {selectedTemplate}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Preview Frame */}
                  <div className="flex justify-center">
                    <div className="relative">
                      {/* Phone Frame */}
                      <div className="w-80 h-[600px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                        <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                          {/* Preview Content */}
                          <div 
                            className="w-full h-full overflow-y-auto"
                            dangerouslySetInnerHTML={{ __html: previewHtml }}
                          />
                        </div>
                      </div>
                      
                      {/* Phone Details */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-black rounded-full"></div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-black rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Template Özellikleri:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Tasarım Stili:</span>
                        <span className="ml-2 text-gray-600">
                          {TEMPLATES.find(t => t.id === selectedTemplate)?.style}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Renk Şeması:</span>
                        <span className="ml-2 text-gray-600">
                          {TEMPLATES.find(t => t.id === selectedTemplate)?.colorScheme}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <EyeIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Template Seçin</h3>
                  <p className="text-gray-600">
                    Önizlemek istediğiniz template'i sol taraftan seçin
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
