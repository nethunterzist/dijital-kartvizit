'use client';

import { useState } from 'react';
import { getTemplateByType } from '@/app/lib/cardTemplate';

// Mock data for previews
const MOCK_DATA = {
  firma_adi: "Teknoloji Çözümleri A.Ş.",
  yetkili_adi: "Mehmet Yılmaz",
  yetkili_pozisyon: "Genel Müdür",
  profil_foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  firma_logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
  firma_hakkinda_baslik: "Hakkımızda",
  firma_hakkinda: "15 yıllık tecrübemizle teknoloji alanında yenilikçi çözümler sunuyoruz. Müşteri memnuniyeti ve kaliteli hizmet anlayışımızla sektörde öncü konumdayız.",
  
  // Contact info
  telefon: "+90 532 123 4567",
  email: "info@teknolojiçözümleri.com",
  whatsapp: "+90 532 123 4567",
  adres: "Levent, İstanbul",
  website: "www.teknolojicozumleri.com",
  
  // Social media
  instagram: "@teknolojicozumleri",
  facebook: "teknolojicozumleri",
  twitter: "@teknocozum",
  linkedin: "teknoloji-cozumleri-as",
  youtube: "TeknolojiCozumleri",
  
  // Additional data
  qr_code: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com",
  
  // Icons array for template
  icons: [
    { type: 'qr', icon: 'fas fa-qrcode', label: 'QR Kod', value: '#' },
    { type: 'phone', icon: 'fas fa-phone', label: 'Telefon', value: 'tel:+905321234567' },
    { type: 'email', icon: 'fas fa-envelope', label: 'E-posta', value: 'mailto:info@teknolojiçözümleri.com' },
    { type: 'whatsapp', icon: 'fab fa-whatsapp', label: 'WhatsApp', value: 'https://wa.me/905321234567' },
    { type: 'location', icon: 'fas fa-map-marker-alt', label: 'Konum', value: '#' },
    { type: 'website', icon: 'fas fa-globe', label: 'Website', value: 'https://www.teknolojicozumleri.com' },
    { type: 'instagram', icon: 'fab fa-instagram', label: 'Instagram', value: 'https://instagram.com/teknolojicozumleri' },
    { type: 'facebook', icon: 'fab fa-facebook', label: 'Facebook', value: 'https://facebook.com/teknolojicozumleri' },
    { type: 'linkedin', icon: 'fab fa-linkedin', label: 'LinkedIn', value: 'https://linkedin.com/company/teknoloji-cozumleri-as' },
    { type: 'twitter', icon: 'fab fa-twitter', label: 'Twitter', value: 'https://twitter.com/teknocozum' },
    { type: 'youtube', icon: 'fab fa-youtube', label: 'YouTube', value: 'https://youtube.com/TeknolojiCozumleri' },
    { type: 'bank', icon: 'fas fa-university', label: 'Banka', value: '#' },
  ]
};

const TEMPLATES = [
  { id: 1, name: 'Gold - Premium Altın Tema' },
  { id: 2, name: 'Soft Waves - Yumuşak Dalgalar' },
  { id: 3, name: 'Golden Edge - Altın Kenar' },
  { id: 4, name: 'Red Flow - Kırmızı Akış' },
  { id: 5, name: 'Luxury Black - Lüks Siyah' },
  { id: 6, name: 'Line Mesh - Çizgi Ağ' },
  { id: 7, name: 'Color Rings - Renkli Halkalar' },
  { id: 8, name: 'Golden Blocks - Altın Bloklar' },
  { id: 9, name: 'Crystal Stripes - Kristal Çizgiler' },
  { id: 10, name: 'Future Grid - Gelecek Izgara' },
];

export default function PreviewTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const generateTemplateHTML = (templateId: number) => {
    let html = getTemplateByType(templateId);
    
    // Replace all template variables with mock data
    html = html
      .replace(/\{\{firma_adi\}\}/g, MOCK_DATA.firma_adi)
      .replace(/\{\{yetkili_adi\}\}/g, MOCK_DATA.yetkili_adi)
      .replace(/\{\{yetkili_pozisyon\}\}/g, MOCK_DATA.yetkili_pozisyon)
      .replace(/\{\{profil_foto\}\}/g, MOCK_DATA.profil_foto)
      .replace(/\{\{firma_logo\}\}/g, MOCK_DATA.firma_logo)
      .replace(/\{\{firma_hakkinda_baslik\}\}/g, MOCK_DATA.firma_hakkinda_baslik)
      .replace(/\{\{firma_hakkinda\}\}/g, MOCK_DATA.firma_hakkinda)
      .replace(/\{\{telefon\}\}/g, MOCK_DATA.telefon)
      .replace(/\{\{email\}\}/g, MOCK_DATA.email)
      .replace(/\{\{whatsapp\}\}/g, MOCK_DATA.whatsapp)
      .replace(/\{\{adres\}\}/g, MOCK_DATA.adres)
      .replace(/\{\{website\}\}/g, MOCK_DATA.website)
      .replace(/\{\{instagram\}\}/g, MOCK_DATA.instagram)
      .replace(/\{\{facebook\}\}/g, MOCK_DATA.facebook)
      .replace(/\{\{twitter\}\}/g, MOCK_DATA.twitter)
      .replace(/\{\{linkedin\}\}/g, MOCK_DATA.linkedin)
      .replace(/\{\{youtube\}\}/g, MOCK_DATA.youtube)
      .replace(/\{\{qr_code\}\}/g, MOCK_DATA.qr_code);

    // Process conditionals - show all sections
    html = html.replace(/\{\{#if.*?\}\}([\s\S]*?)\{\{\/if\}\}/g, '$1');
    html = html.replace(/\{\{#unless.*?\}\}([\s\S]*?)\{\{\/unless\}\}/g, '');
    
    // Process each loops for icons
    const iconHTML = MOCK_DATA.icons.map(icon => `
      <div class="icon-card">
        <a href="${icon.value}" target="_blank">
          <i class="${icon.icon}"></i>
          <span class="icon-label">${icon.label}</span>
        </a>
      </div>
    `).join('');
    
    // Replace icon each loop
    html = html.replace(/\{\{#each icons\}\}[\s\S]*?\{\{\/each\}\}/g, iconHTML);
    
    // If no icons grid exists, add it before closing body
    if (!html.includes('icons-grid')) {
      html = html.replace(/<\/body>/i, `
        <div class="icons-grid">
          ${iconHTML}
        </div>
      </body>`);
    }
    
    // Clean up any remaining template variables
    html = html.replace(/\{\{[^}]*\}\}/g, '');
    
    return html;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Kartvizit Tema Önizlemeleri</h1>
          <p className="text-gray-600 mt-1">Tüm temalar mock veri ve ikonlarla görüntüleniyor</p>
        </div>
      </div>

      {/* Template Selector */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Tema Seçin:</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-3 text-sm rounded-lg border-2 transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Önizleme: {TEMPLATES.find(t => t.id === selectedTemplate)?.name}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const html = generateTemplateHTML(selectedTemplate);
                  const blob = new Blob([`
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>${TEMPLATES.find(t => t.id === selectedTemplate)?.name}</title>
                      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                    </head>
                    <body>
                      ${html}
                    </body>
                    </html>
                  `], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  window.open(url, '_blank');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Yeni Sekmede Aç
              </button>
            </div>
          </div>

          {/* Phone Frame Preview */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-[375px] h-[812px] bg-black rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <iframe
                    key={selectedTemplate}
                    className="w-full h-full border-0"
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                      <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                      </head>
                      <body style="margin: 0; padding: 0;">
                        ${generateTemplateHTML(selectedTemplate)}
                      </body>
                      </html>
                    `}
                    title="Template Preview"
                  />
                </div>
              </div>
              
              {/* Phone Details */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-full"></div>
            </div>
          </div>

          {/* Template Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Mock Veri Bilgileri:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div><span className="font-medium">Firma:</span> {MOCK_DATA.firma_adi}</div>
              <div><span className="font-medium">Yetkili:</span> {MOCK_DATA.yetkili_adi}</div>
              <div><span className="font-medium">Pozisyon:</span> {MOCK_DATA.yetkili_pozisyon}</div>
              <div><span className="font-medium">Telefon:</span> {MOCK_DATA.telefon}</div>
              <div><span className="font-medium">Email:</span> {MOCK_DATA.email}</div>
              <div><span className="font-medium">Website:</span> {MOCK_DATA.website}</div>
            </div>
            <div className="mt-3">
              <span className="font-medium text-sm">Aktif İkonlar:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {MOCK_DATA.icons.map((icon, idx) => (
                  <span key={idx} className="text-xs bg-white px-2 py-1 rounded border">
                    <i className={`${icon.icon} mr-1`}></i>
                    {icon.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}