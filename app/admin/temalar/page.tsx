'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/app/lib/icons';
import { TEMPLATES } from '@/app/lib/templates/templateRegistry';
import { getTemplateByType } from '@/app/lib/cardTemplate';
import { getIconOrderClient, getOrderedIconsClient, getDefaultIconOrderClient } from '@/app/lib/iconOrder.client';

// Örnek firma verisi template önizleme için - TAM DOLU VERİ (Yeni firma ekleme formundaki tüm alanları kapsıyor)
const SAMPLE_DATA = {
  // Tab 1: Firma Bilgileri
  firma_adi: "Örnek Teknoloji A.Ş.",
  slug: "ornek-teknoloji",
  yetkili_adi: "Ahmet Yılmaz",
  yetkili_pozisyon: "Genel Müdür",
  profil_foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  firma_logo: "", // Logo kaldırıldı - admin preview'da görünmeyecek
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
    
    // Template'in TAM HTML'ini al (head + style + body dahil)
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

    // Sıralama sistemini kullanarak ikonları oluştur - Error handling ekle
    try {
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

    // Template HTML'e base href ekle (görsel yolları için)
    templateHtml = templateHtml.replace(
      '<head>',
      '<head>\n  <base href="https://furkanyigit.com/">'
    );

    // Admin preview özel patch - sadece önizlemede cover düzeltmesi + logo şeffaflığı
    const adminPreviewPatch = `
  <style id="admin-preview-patch">
    html,body{height:100%;margin:0;background:transparent!important}
    /* Sadece önizleme için: arka plan taşmasın */
    .main-container{
      background-size: cover !important;
      background-color: transparent !important;
    }
    /* Logo container'ları şeffaf yap */
    .logo-container,
    .logo-image,
    .footer-logo,
    .company-logo,
    .brand-logo {
      background: transparent !important;
      background-color: transparent !important;
    }
    /* Company logo section'u tamamen gizle - siyah alanı kaldır */
    .company-logo-section {
      display: none !important;
    }
    /* Accounts list'i de gizle */
    .accounts-list {
      display: none !important;
    }
  </style>
`;
    // Red Flow (ID: 4) ve Golden Blocks (ID: 8) teması için ekstra beyaz font patch'i
    if (templateId === 4 || templateId === 8) {
      const redFlowPatch = `
  <style id="red-flow-font-patch">
    /* Red Flow ve Golden Blocks temaları için font renklerini beyaz yap */
    body .profile-name,
    body .profile-position,
    body .profile-title,
    body h1,
    body h2,
    body h3,
    body p,
    body .text-dark,
    body .text-medium,
    body .icon-label,
    body .main-content * {
      color: white !important;
    }
    /* Rehbere ekle butonu ve ikonu beyaz - kapsamlı selektörler */
    body .add-contact-btn,
    body .add-contact-btn *,
    body .add-contact-button,
    body .add-contact-button *,
    body .contact-btn,
    body .contact-btn *,
    body .rehber-btn,
    body .rehber-btn *,
    body .add-to-contacts,
    body .add-to-contacts *,
    body .vcard-btn,
    body .vcard-btn *,
    body button[onclick*="downloadVCard"],
    body button[onclick*="downloadVCard"] *,
    body a[href*="vcard"],
    body a[href*="vcard"] * {
      color: white !important;
      fill: white !important;
      stroke: white !important;
    }
  </style>
`;
      templateHtml = templateHtml.replace('</head>', `${redFlowPatch}</head>`);
    }

    templateHtml = templateHtml.replace('</head>', `${adminPreviewPatch}</head>`);

    setPreviewHtml(templateHtml);
    } catch (error) {
      console.error('Error loading icon order, using default order:', error);
      // Fallback to default icon order if API call fails
      const defaultIconOrder = getDefaultIconOrderClient();
      const orderedIcons = getOrderedIconsClient(SAMPLE_DATA, defaultIconOrder);
      
      // Continue with the same logic but with default icons
      let templateHtml = getTemplateByType(templateId);
      
      // Apply all the same template variable replacements and processing
      templateHtml = templateHtml
        .replace(/\{\{firma_adi\}\}/g, SAMPLE_DATA.firma_adi)
        .replace(/\{\{slug\}\}/g, SAMPLE_DATA.slug)
        .replace(/\{\{yetkili_adi\}\}/g, SAMPLE_DATA.yetkili_adi)
        .replace(/\{\{yetkili_pozisyon\}\}/g, SAMPLE_DATA.yetkili_pozisyon)
        .replace(/\{\{profil_foto\}\}/g, SAMPLE_DATA.profil_foto)
        .replace(/\{\{firma_logo\}\}/g, SAMPLE_DATA.firma_logo);

      // Apply conditional processing
      templateHtml = templateHtml.replace(
        /\{\{#if profil_foto\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g,
        '$1'
      );
      templateHtml = templateHtml.replace(
        /\{\{#if firma_logo\}\}([\s\S]*?)\{\{\/if\}\}/g,
        '$1'
      );
      templateHtml = templateHtml.replace(
        /\{\{#if yetkili_adi\}\}([\s\S]*?)\{\{\/if\}\}/g,
        '$1'
      );
      templateHtml = templateHtml.replace(
        /\{\{#if yetkili_pozisyon\}\}([\s\S]*?)\{\{\/if\}\}/g,
        '$1'
      );

      // Continue with same icon processing logic...
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

      // Generate icons HTML with fallback order
      let allIcons = '';
      orderedIcons.forEach((iconConfig: any) => {
        const mapping = iconMapping[iconConfig.id];
        if (mapping) {
          const onclickAttr = mapping.onclick ? ` onclick="${mapping.onclick}"` : '';
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

      // Apply icon placement logic
      if (templateId === 3) { 
        templateHtml = templateHtml.replace(/\{\{#if social_media\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        templateHtml = templateHtml.replace(/\{\{#if communication\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        templateHtml = templateHtml.replace(/\{\{#if katalog\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        templateHtml = templateHtml.replace(/\{\{#if iban\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        templateHtml = templateHtml.replace(/\{\{#if tax\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        templateHtml = templateHtml.replace(/\{\{#if about\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        templateHtml = templateHtml.replace('<div class="icons-grid">', `<div class="icons-grid minimal-list">${allIcons}`);
      } else {
        templateHtml = templateHtml.replace(/\{\{#if social_media\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        templateHtml = templateHtml.replace(/\{\{#if communication\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        templateHtml = templateHtml.replace('<div class="icons-grid">', `<div class="icons-grid">${allIcons}`);
      }

      // Continue with popup content and cleanup
      templateHtml = templateHtml
        .replace(/\{\{tax\.firma_unvan\}\}/g, SAMPLE_DATA.tax.firma_unvan)
        .replace(/\{\{tax\.firma_vergi_no\}\}/g, SAMPLE_DATA.tax.firma_vergi_no)
        .replace(/\{\{tax\.vergi_dairesi\}\}/g, SAMPLE_DATA.tax.vergi_dairesi)
        .replace(/\{\{about\.content\}\}/g, SAMPLE_DATA.about.content);

      templateHtml = templateHtml.replace(
        /\{\{#if iban\.value\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g,
        '$1'
      );

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

      templateHtml = templateHtml
        .replace(/\{\{#if[\s\S]*?\{\{\/if\}\}/g, '')
        .replace(/\{\{#each[\s\S]*?\{\{\/each\}\}/g, '')
        .replace(/\{\{#unless[\s\S]*?\{\{\/unless\}\}/g, '')
        .replace(/\{\{[^}]*\}\}/g, '');

      // Template HTML'e base href ekle + admin preview patch
      templateHtml = templateHtml.replace(
        '<head>',
        '<head>\n  <base href="https://furkanyigit.com/">'
      );

      // Admin preview özel patch - catch bloğu için de aynı + logo şeffaflığı
      const adminPreviewPatch = `
  <style id="admin-preview-patch">
    html,body{height:100%;margin:0;background:transparent!important}
    /* Sadece önizleme için: arka plan taşmasın */
    .main-container{
      background-size: cover !important;
      background-color: transparent !important;
    }
    /* Logo container'ları şeffaf yap */
    .logo-container,
    .logo-image,
    .footer-logo,
    .company-logo,
    .brand-logo {
      background: transparent !important;
      background-color: transparent !important;
    }
    /* Company logo section'u tamamen gizle - siyah alanı kaldır */
    .company-logo-section {
      display: none !important;
    }
    /* Accounts list'i de gizle */
    .accounts-list {
      display: none !important;
    }
  </style>
`;
      // Red Flow (ID: 4) ve Golden Blocks (ID: 8) teması için ekstra beyaz font patch'i - catch bloğu
      if (templateId === 4 || templateId === 8) {
        const redFlowPatch = `
  <style id="red-flow-font-patch">
    /* Red Flow ve Golden Blocks temaları için font renklerini beyaz yap */
    body .profile-name,
    body .profile-position,
    body .profile-title,
    body h1,
    body h2,
    body h3,
    body p,
    body .text-dark,
    body .text-medium,
    body .icon-label,
    body .main-content * {
      color: white !important;
    }
    /* Rehbere ekle butonu ve ikonu beyaz - kapsamlı selektörler */
    body .add-contact-btn,
    body .add-contact-btn *,
    body .add-contact-button,
    body .add-contact-button *,
    body .contact-btn,
    body .contact-btn *,
    body .rehber-btn,
    body .rehber-btn *,
    body .add-to-contacts,
    body .add-to-contacts *,
    body .vcard-btn,
    body .vcard-btn *,
    body button[onclick*="downloadVCard"],
    body button[onclick*="downloadVCard"] *,
    body a[href*="vcard"],
    body a[href*="vcard"] * {
      color: white !important;
      fill: white !important;
      stroke: white !important;
    }
  </style>
`;
        templateHtml = templateHtml.replace('</head>', `${redFlowPatch}</head>`);
      }

      templateHtml = templateHtml.replace('</head>', `${adminPreviewPatch}</head>`);

      setPreviewHtml(templateHtml);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <main className="p-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl mb-6">
          <div className="px-6 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kartvizit Temaları</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mevcut kartvizit tasarımlarını görüntüleyin ve önizleyin</p>
            </div>
          </div>
        </div>

          <div className="flex gap-8 min-h-screen">
            {/* Template List - Scrollable */}
            <div className="w-80 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mevcut Temalar</h2>
                <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 
                            scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700 
                            hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
                  {TEMPLATES.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{template.description}</p>
                        </div>
                        <Icon name="eye" className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      </div>
                      
                      {/* Template özellikleri */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {template.features.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
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

            {/* Preview Area - Sticky */}
            <div className="flex-1">
              <div className="sticky top-8">
                {selectedTemplate ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {TEMPLATES.find(t => t.id === selectedTemplate)?.name} Önizlemesi
                      </h2>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => {
                          const newWindow = window.open('', '_blank', 'width=400,height=700');
                          if (newWindow) {
                            newWindow.document.write(previewHtml);
                            newWindow.document.close();
                          }
                        }}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Tarayıcıda Göster
                      </button>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Template ID: {selectedTemplate}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Preview Frame */}
                  <div className="flex justify-center">
                    <div className="relative">
                      {/* Phone Frame */}
                      <div className="w-80 h-[600px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                        <div className="w-full h-full rounded-[2rem] overflow-hidden relative" style={{ background: 'transparent' }}>
                          {/* Preview Content - Tam template HTML ile */}
                          <iframe
                            className="w-full h-full border-0"
                            srcDoc={previewHtml}
                            title="Template Preview"
                            sandbox="allow-same-origin allow-scripts"
                            style={{ backgroundColor: 'transparent' }}
                            frameBorder="0"
                          />
                        </div>
                      </div>
                      
                      {/* Phone Details */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-black rounded-full"></div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-black rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Template Özellikleri:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Tasarım Stili:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">
                          {TEMPLATES.find(t => t.id === selectedTemplate)?.style}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Renk Şeması:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">
                          {TEMPLATES.find(t => t.id === selectedTemplate)?.colorScheme}
                        </span>
                      </div>
                    </div>
                  </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Icon name="eye" className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Template Seçin</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Önizlemek istediğiniz template'i sol taraftan seçin
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}
