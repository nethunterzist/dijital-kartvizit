'use client';

import React, { useState, useEffect } from 'react';
import { TEMPLATES } from '@/app/lib/templates/templateRegistry';
import { getTemplateByType } from '@/app/lib/cardTemplate';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplateId: number;
  onSelectTemplate: (templateId: number) => void;
}

// BASIT MOCK DATA - Sadece gerekli alanlar
const SAMPLE_DATA = {
  firma_adi: "Örnek Teknoloji A.Ş.",
  yetkili_adi: "Ahmet Yılmaz", 
  yetkili_pozisyon: "Genel Müdür",
  profil_foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  firma_logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
  firma_hakkinda: "Teknoloji sektöründe hizmet vermekteyiz.",
  firma_hakkinda_baslik: "Hakkımızda"
};

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  isOpen,
  onClose,
  selectedTemplateId,
  onSelectTemplate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [previewHtmls, setPreviewHtmls] = useState<{ [key: number]: string }>({});
  
  const templatesPerPage = 15;
  
  // Template'leri filtrele
  const filteredTemplates = TEMPLATES.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sayfalama
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);
  const startIndex = (currentPage - 1) * templatesPerPage;
  const currentTemplates = filteredTemplates.slice(startIndex, startIndex + templatesPerPage);
  
  // Template HTML'lerini oluştur
  useEffect(() => {
    if (isOpen) {
      const generatePreviews = async () => {
        const htmls: { [key: number]: string } = {};
        
        for (const template of currentTemplates) {
          let html = getTemplateByType(template.id);
          
          // Basit değişken değiştirme
          html = html
            .replace(/\{\{firma_adi\}\}/g, SAMPLE_DATA.firma_adi)
            .replace(/\{\{yetkili_adi\}\}/g, SAMPLE_DATA.yetkili_adi)
            .replace(/\{\{yetkili_pozisyon\}\}/g, SAMPLE_DATA.yetkili_pozisyon)
            .replace(/\{\{profil_foto\}\}/g, SAMPLE_DATA.profil_foto)
            .replace(/\{\{firma_logo\}\}/g, SAMPLE_DATA.firma_logo)
            .replace(/\{\{firma_hakkinda\}\}/g, SAMPLE_DATA.firma_hakkinda)
            .replace(/\{\{firma_hakkinda_baslik\}\}/g, SAMPLE_DATA.firma_hakkinda_baslik);

          // Conditional blokları basit işle
          html = html.replace(/\{\{#if.*?\}\}([\s\S]*?)\{\{.*?\/if\}\}/g, '$1');
          html = html.replace(/\{\{#each.*?\}\}([\s\S]*?)\{\{.*?\/each\}\}/g, '');
          html = html.replace(/\{\{#unless.*?\}\}([\s\S]*?)\{\{.*?\/unless\}\}/g, '');
          
          // Basit ikonlar ekle - Template'e göre format
          let simpleIcons = '';
          if (template.id === 1) {
            // Gold template için özel format
            simpleIcons = `
              <div class="icon-item">
                <a href="#" class="icon-link icon-telefon">
                  <i class="fas fa-phone"></i>
                </a>
                <span class="icon-label">Telefon</span>
              </div>
              <div class="icon-item">
                <a href="#" class="icon-link icon-whatsapp">
                  <i class="fab fa-whatsapp"></i>
                </a>
                <span class="icon-label">WhatsApp</span>
              </div>
              <div class="icon-item">
                <a href="#" class="icon-link icon-email">
                  <i class="fas fa-envelope"></i>
                </a>
                <span class="icon-label">E-posta</span>
              </div>
              <div class="icon-item">
                <a href="#" class="icon-link icon-instagram">
                  <i class="fab fa-instagram"></i>
                </a>
                <span class="icon-label">Instagram</span>
              </div>
              <div class="icon-item">
                <a href="#" class="icon-link icon-website">
                  <i class="fas fa-globe"></i>
                </a>
                <span class="icon-label">Website</span>
              </div>
              <div class="icon-item">
                <a href="#" class="icon-link icon-qr">
                  <i class="fas fa-qrcode"></i>
                </a>
                <span class="icon-label">QR Kod</span>
              </div>
            `;
          } else {
            // Diğer template'ler için standart format
            simpleIcons = `
              <div class="icon-card"><a href="#"><i class="fas fa-phone"></i><span class="icon-label">Telefon</span></a></div>
              <div class="icon-card"><a href="#"><i class="fab fa-whatsapp"></i><span class="icon-label">WhatsApp</span></a></div>
              <div class="icon-card"><a href="#"><i class="fas fa-envelope"></i><span class="icon-label">E-posta</span></a></div>
              <div class="icon-card"><a href="#"><i class="fab fa-instagram"></i><span class="icon-label">Instagram</span></a></div>
              <div class="icon-card"><a href="#"><i class="fas fa-globe"></i><span class="icon-label">Website</span></a></div>
              <div class="icon-card"><a href="#"><i class="fas fa-qrcode"></i><span class="icon-label">QR Kod</span></a></div>
            `;
          }

          // İkon yerleştir
          html = html.replace('<div class="icons-grid">', `<div class="icons-grid">${simpleIcons}`);
          if (!html.includes('icons-grid')) {
            html = html.replace(/<\/body>/i, `<div class="icons-grid">${simpleIcons}</div></body>`);
          }

          // Kalan değişkenleri temizle
          html = html.replace(/\{\{[^}]*\}\}/g, '');

          // BÜYÜK PREVIEW İÇİN CSS
          const previewCSS = `
            <style>
              * { box-sizing: border-box; }
              body { 
                margin: 0; 
                padding: 0; 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                transform: scale(0.25);
                transform-origin: top left;
                width: 400%;
                height: 400%;
                background: transparent;
                overflow: hidden;
              }
              .container { 
                max-width: 100%; 
                padding: 16px;
                min-height: 100vh;
                box-sizing: border-box;
              }
              .profile-section { 
                text-align: center; 
                margin-bottom: 24px; 
              }
              .profile-photo { 
                width: 120px; 
                height: 120px; 
                border-radius: 50%; 
                margin: 0 auto 16px; 
                object-fit: cover;
                display: block;
              }
              .company-name { 
                font-size: 24px; 
                font-weight: bold; 
                margin-bottom: 8px;
                color: inherit;
              }
              .person-name { 
                font-size: 20px; 
                font-weight: 600; 
                margin-bottom: 4px;
                color: inherit;
              }
              .position { 
                font-size: 16px; 
                opacity: 0.8;
                margin-bottom: 16px;
                color: inherit;
              }
              .contact-button {
                margin-bottom: 20px;
                padding: 12px 20px;
                border-radius: 8px;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                text-decoration: none;
                border: 1px solid rgba(255,255,255,0.3);
                color: inherit;
                background: rgba(255,255,255,0.1);
              }
              .icons-grid { 
                display: grid; 
                grid-template-columns: repeat(4, 1fr); 
                gap: 12px; 
                padding: 16px 0;
                max-width: 100%;
              }
              
              /* Gold template için özel stiller */
              .icon-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
              }
              
              .icon-link {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 55px;
                height: 55px;
                background: rgba(246, 246, 246, 0.28);
                border-radius: 12px;
                border: 3px solid #000000;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                text-decoration: none;
                transition: all 0.3s ease;
                box-sizing: border-box;
              }
              
              .icon-link i {
                font-size: 1.5rem;
                color: var(--text-dark, #2C2C2C);
              }
              
              .icon-item .icon-label {
                font-size: 0.75rem;
                font-weight: 500;
                color: var(--text-dark, #2C2C2C);
                text-align: center;
              }
              
              /* Gold template icon renkler */
              .icon-telefon i { color: #4CAF50 !important; }
              .icon-whatsapp i { color: #25D366 !important; }
              .icon-email i { color: #FF9800 !important; }
              .icon-instagram i { color: #E4405F !important; }
              .icon-website i { color: #607D8B !important; }
              .icon-qr i { color: #9C27B0 !important; }
              .icon-card { 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                text-align: center; 
                padding: 16px 8px; 
                border-radius: 8px; 
                min-height: 80px;
                justify-content: center;
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
              }
              .icon-card a {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
                text-decoration: none;
                color: inherit;
                width: 100%;
              }
              .icon-card i { 
                font-size: 24px; 
                color: inherit;
              }
              .icon-card .icon-label { 
                font-size: 12px; 
                font-weight: 500; 
                line-height: 1.2; 
                color: inherit;
              }
              .about-section {
                margin-top: 20px;
                padding: 16px;
                background: rgba(255,255,255,0.1);
                border-radius: 8px;
              }
              .about-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 8px;
                color: inherit;
              }
              .about-text {
                font-size: 14px;
                line-height: 1.4;
                color: inherit;
                opacity: 0.9;
              }
            </style>
          `;

          htmls[template.id] = previewCSS + html;
        }
        
        setPreviewHtmls(htmls);
      };
      
      generatePreviews();
    }
  }, [isOpen, currentPage, currentTemplates]);

  const handleTemplateSelect = (templateId: number) => {
    onSelectTemplate(templateId);
    onClose();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:max-h-[90vh]">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Kartvizit Tasarımı Seçin
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredTemplates.length} tema mevcut
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tema adına göre ara..."
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-50 px-6 py-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Templates Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
              {currentTemplates.map((template) => (
                <div
                  key={template.id}
                  className="relative cursor-pointer group"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  {/* Phone Frame */}
                  <div className="w-full aspect-[3/4] bg-black rounded-[1rem] p-1 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
                    <div className="w-full h-full bg-white rounded-[0.75rem] overflow-hidden relative">
                      {/* Preview Content */}
                      {previewHtmls[template.id] && (
                        <iframe
                          className="w-full h-full border-0 pointer-events-none"
                          srcDoc={`
                            <!DOCTYPE html>
                            <html>
                            <head>
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                            </head>
                            <body>
                              ${previewHtmls[template.id]}
                            </body>
                            </html>
                          `}
                          title={`${template.name} Preview`}
                        />
                      )}
                      
                    </div>
                    
                    {/* Selected Indicator */}
                    {selectedTemplateId === template.id && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Template Info */}
                  <div className="mt-2 text-center">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {template.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {template.colorScheme}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Sayfa {currentPage} / {totalPages} ({filteredTemplates.length} tema)
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Önceki
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sonraki
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;