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

// Artık mock data'ya gerek yok - sadece background görselleri gösteriyoruz

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
  
  // Sadece background görselleri için basit HTML oluştur
  useEffect(() => {
    if (isOpen) {
      const generatePreviews = async () => {
        const htmls: { [key: number]: string } = {};
        
        for (const template of currentTemplates) {
          // Template'e göre background görsel ve minimal stil
          const backgroundImage = `/img/bg/${template.id}.png`;
          
          const simpleHTML = `
            <style>
              * { 
                margin: 0; 
                padding: 0; 
                box-sizing: border-box; 
              }
              html, body {
                width: 100%;
                height: 100%;
                overflow: hidden;
              }
              .bg-container {
                width: 100%;
                height: 100%;
                background: url('${backgroundImage}') no-repeat center center;
                background-size: cover;
                background-position: center center;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .template-overlay {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 10px;
                font-weight: 500;
                white-space: nowrap;
              }
            </style>
            <div class="bg-container">
              <div class="template-overlay">${template.name}</div>
            </div>
          `;

          htmls[template.id] = simpleHTML;
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