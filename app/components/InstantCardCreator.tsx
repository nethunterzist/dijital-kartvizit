"use client";
import React, { useState } from 'react';
import PhonePreview from '../../components/PhonePreview';
import TemplateSelector from '../../components/TemplateSelector';
import { getTemplateById } from '@/app/lib/templates/templateRegistry';

export default function InstantCardCreator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [formData, setFormData] = useState({
    firmaAdi: '',
    yetkiliAdi: '',
    yetkiliPozisyon: '',
    telefon: '',
    eposta: '',
    website: '',
    instagram: '',
    linkedin: '',
    facebook: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
  };

  const scrollToPricing = () => {
    // Form verilerini URL parametresi olarak ödeme sayfasına gönder
    const params = new URLSearchParams({
      package: 'business', // Varsayılan olarak İş Paketi
      template: selectedTemplate.toString(),
      firmaAdi: formData.firmaAdi,
      yetkiliAdi: formData.yetkiliAdi,
      yetkiliPozisyon: formData.yetkiliPozisyon,
      telefon: formData.telefon,
      eposta: formData.eposta,
      website: formData.website,
      instagram: formData.instagram,
      linkedin: formData.linkedin,
      facebook: formData.facebook
    });
    
    window.location.href = `/odeme?${params.toString()}`;
  };

  // Form validation
  const isStep1Valid = formData.firmaAdi.trim() && formData.yetkiliAdi.trim() && formData.yetkiliPozisyon.trim();
  const isStep2Valid = formData.telefon.trim() || formData.eposta.trim() || formData.website.trim();

  // PhonePreview için veri hazırlama
  const communicationAccounts = [
    ...(formData.telefon ? [{ type: 'telefon', value: formData.telefon }] : []),
    ...(formData.eposta ? [{ type: 'eposta', value: formData.eposta }] : []),
    ...(formData.website ? [{ type: 'website', value: formData.website }] : [])
  ];

  const socialMediaAccounts = [
    ...(formData.instagram ? [{ platform: 'instagram', url: formData.instagram }] : []),
    ...(formData.linkedin ? [{ platform: 'linkedin', url: formData.linkedin }] : []),
    ...(formData.facebook ? [{ platform: 'facebook', url: formData.facebook }] : [])
  ];

  return (
    <section id="card-creator" className="w-full bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Canlı Demo
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              3 Adımda
            </span>{' '}
            Kendi Kartvizitini Oluştur
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bilgilerini gir, tasarımını seç ve kartvizitinin canlı önizlemesini gör. Beğenirsen hemen satın al!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`flex-1 h-2 mx-2 rounded-full ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <div className={`flex-1 h-2 mx-2 rounded-full ${
              currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
              currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Temel Bilgiler</span>
            <span>İletişim</span>
            <span>Sosyal Medya</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Adım 1: Temel Bilgiler</h3>
                  <p className="text-gray-600">Kartvizitinde görünecek temel bilgileri gir</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Firma Adı *
                  </label>
                  <input
                    type="text"
                    name="firmaAdi"
                    value={formData.firmaAdi}
                    onChange={handleInputChange}
                    placeholder="Örn: Tech Şirket A.Ş."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    name="yetkiliAdi"
                    value={formData.yetkiliAdi}
                    onChange={handleInputChange}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pozisyon/Unvan *
                  </label>
                  <input
                    type="text"
                    name="yetkiliPozisyon"
                    value={formData.yetkiliPozisyon}
                    onChange={handleInputChange}
                    placeholder="Örn: Genel Müdür"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  onClick={handleNextStep}
                  disabled={!isStep1Valid}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                    isStep1Valid
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Sonraki Adım →
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Adım 2: İletişim Bilgileri</h3>
                  <p className="text-gray-600">İletişim bilgilerini ekle</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleInputChange}
                    placeholder="Örn: +90 555 123 45 67"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="eposta"
                    value={formData.eposta}
                    onChange={handleInputChange}
                    placeholder="Örn: ahmet@techsirket.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="Örn: www.techsirket.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 py-4 border border-gray-300 rounded-lg font-bold text-lg text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    ← Geri
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!isStep2Valid}
                    className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all ${
                      isStep2Valid
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Sonraki Adım →
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Adım 3: Sosyal Medya & Tasarım</h3>
                  <p className="text-gray-600">Sosyal medya hesaplarını ekle ve tasarımını seç</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="Örn: @techsirket"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="Örn: linkedin.com/company/techsirket"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    placeholder="Örn: facebook.com/techsirket"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tasarım Seç
                  </label>
                  <button
                    onClick={() => setShowTemplateSelector(true)}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-all text-gray-600 hover:text-blue-600"
                  >
                    <i className="fas fa-palette mr-2"></i>
                    Tasarım Değiştir (Şu an: {getTemplateById(selectedTemplate)?.name || `Template ${selectedTemplate}`})
                  </button>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 py-4 border border-gray-300 rounded-lg font-bold text-lg text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    ← Geri
                  </button>
                  <button
                    onClick={scrollToPricing}
                    className="flex-1 py-4 rounded-lg font-bold text-lg bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  >
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Satın Al
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="sticky top-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Canlı Önizleme</h3>
                <p className="text-gray-600">Kartvizitiniz böyle görünecek</p>
              </div>

              <PhonePreview
                firmaAdi={formData.firmaAdi || "Firma Adınız"}
                yetkiliAdi={formData.yetkiliAdi || "Adınız Soyadınız"}
                yetkiliPozisyon={formData.yetkiliPozisyon || "Pozisyonunuz"}
                profilFotoPreview="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                firmaLogoPreview=""
                communicationAccounts={communicationAccounts}
                socialMediaAccounts={socialMediaAccounts}
                firmaHakkinda="Firma hakkında bilgi buraya gelecek..."
                firmaHakkindaBaslik="Hakkımızda"
                templateId={selectedTemplate}
                bankAccounts={[]}
              />
            </div>
          </div>
        </div>

        {/* Template Selector Modal */}
        <TemplateSelector
          isOpen={showTemplateSelector}
          onClose={() => setShowTemplateSelector(false)}
          selectedTemplateId={selectedTemplate}
          onSelectTemplate={handleTemplateSelect}
        />
      </div>
    </section>
  );
}
