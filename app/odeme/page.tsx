"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTemplateById } from '@/app/lib/templates/templateRegistry';

interface FormData {
  firmaAdi: string;
  yetkiliAdi: string;
  yetkiliPozisyon: string;
  telefon: string;
  eposta: string;
  website: string;
  instagram: string;
  linkedin: string;
  facebook: string;
}

interface Package {
  id: string;
  name: string;
  price: number;
  cardCount: number;
  features: string[];
}

const packages: Package[] = [
  {
    id: 'starter',
    name: 'Başlangıç',
    price: 299,
    cardCount: 1,
    features: [
      '1 Dijital Kartvizit',
      'QR Kod Oluşturma',
      'Temel İletişim Bilgileri',
      'Sosyal Medya Bağlantıları',
      'Mobil Uyumlu Tasarım',
      'Rehbere Kaydetme (vCard)',
      '24/7 Destek'
    ]
  },
  {
    id: 'business',
    name: 'İş Paketi',
    price: 999,
    cardCount: 5,
    features: [
      '5 Dijital Kartvizit',
      'Tüm Başlangıç Özellikleri',
      'Banka Hesap Bilgileri',
      'Firma Logosu Yükleme',
      'Katalog PDF Ekleme',
      'Özelleştirilebilir Temalar',
      'İstatistik ve Analiz',
      'Öncelikli Destek'
    ]
  },
  {
    id: 'enterprise',
    name: 'Kurumsal',
    price: 1999,
    cardCount: 25,
    features: [
      '25 Dijital Kartvizit',
      'Tüm İş Paketi Özellikleri',
      'Özel Tasarım Desteği',
      'API Entegrasyonu',
      'Toplu Kartvizit Yönetimi',
      'Gelişmiş Analitik',
      'Özel Domain Desteği',
      'Özel Hesap Yöneticisi'
    ]
  }
];

export default function OdemePage() {
  const searchParams = useSearchParams();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState<FormData>({
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
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    email: '',
    phone: '',
    billingName: '',
    taxNumber: '',
    billingAddress: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // URL parametrelerinden verileri al
    const packageId = searchParams.get('package');
    const template = searchParams.get('template');
    
    if (packageId) {
      const pkg = packages.find(p => p.id === packageId);
      if (pkg) setSelectedPackage(pkg);
    }
    
    if (template) {
      setSelectedTemplate(parseInt(template));
    }

    // Form verilerini URL'den al (eğer varsa)
    const urlFormData = {
      firmaAdi: searchParams.get('firmaAdi') || '',
      yetkiliAdi: searchParams.get('yetkiliAdi') || '',
      yetkiliPozisyon: searchParams.get('yetkiliPozisyon') || '',
      telefon: searchParams.get('telefon') || '',
      eposta: searchParams.get('eposta') || '',
      website: searchParams.get('website') || '',
      instagram: searchParams.get('instagram') || '',
      linkedin: searchParams.get('linkedin') || '',
      facebook: searchParams.get('facebook') || ''
    };
    
    setFormData(urlFormData);
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Kart numarası formatı
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }

    // Son kullanma tarihi formatı
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }

    // CVV formatı
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) formattedValue = formattedValue.slice(0, 3);
    }

    setPaymentData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simüle edilmiş ödeme işlemi
    setTimeout(() => {
      setIsProcessing(false);
      alert('Ödeme başarıyla tamamlandı! Kartvizitiniz oluşturuluyor...');
      // Burada gerçek ödeme entegrasyonu yapılacak
    }, 3000);
  };

  const isFormValid = () => {
    return formData.firmaAdi && formData.yetkiliAdi && formData.yetkiliPozisyon &&
           (formData.telefon || formData.eposta) &&
           paymentData.cardNumber.replace(/\s/g, '').length === 16 &&
           paymentData.expiryDate.length === 5 &&
           paymentData.cvv.length === 3 &&
           paymentData.cardHolder &&
           paymentData.email &&
           paymentData.phone;
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Paket Seçilmedi</h1>
          <p className="text-gray-600 mb-6">Lütfen önce bir paket seçin.</p>
          <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ödeme Sayfası</h1>
          <p className="text-gray-600">Dijital kartvizitinizi oluşturmak için son adım!</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`flex-1 h-2 mx-4 rounded-full ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Bilgi Kontrolü</span>
            <span>Ödeme</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sol Taraf - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Bilgilerinizi Kontrol Edin</h2>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
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
                          required
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
                          required
                        />
                      </div>
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
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
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


                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">Seçilen Tasarım</h3>
                      <p className="text-blue-700">{getTemplateById(selectedTemplate)?.name || `Template ${selectedTemplate}`}</p>
                    </div>

                    <button
                      onClick={() => setCurrentStep(2)}
                      disabled={!formData.firmaAdi || !formData.yetkiliAdi || !formData.yetkiliPozisyon || (!formData.telefon && !formData.eposta)}
                      className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                        (formData.firmaAdi && formData.yetkiliAdi && formData.yetkiliPozisyon && (formData.telefon || formData.eposta))
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Ödeme Adımına Geç →
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ödeme Bilgileri</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kart Numarası *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Son Kullanma Tarihi *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kart Sahibi *
                      </label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={paymentData.cardHolder}
                        onChange={handlePaymentChange}
                        placeholder="AHMET YILMAZ"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={paymentData.email}
                          onChange={handlePaymentChange}
                          placeholder="ornek@email.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={paymentData.phone}
                          onChange={handlePaymentChange}
                          placeholder="+90 555 123 45 67"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Fatura Bilgileri */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Fatura Bilgileri</h3>
                      
                      <div className="grid grid-cols-2 gap-6 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ad Soyad / Firma Adı *
                          </label>
                          <input
                            type="text"
                            name="billingName"
                            value={paymentData.billingName || ''}
                            onChange={handlePaymentChange}
                            placeholder="Fatura adı"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vergi Numarası / TC Kimlik
                          </label>
                          <input
                            type="text"
                            name="taxNumber"
                            value={paymentData.taxNumber || ''}
                            onChange={handlePaymentChange}
                            placeholder="Vergi no veya TC kimlik"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fatura Adresi *
                        </label>
                        <textarea
                          name="billingAddress"
                          value={paymentData.billingAddress || ''}
                          onChange={handleTextareaChange}
                          placeholder="Fatura adresi"
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Müşteri Hizmetleri Uyarısı */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <i className="fas fa-info-circle text-blue-600 text-lg mt-0.5"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">Önemli Bilgi</h4>
                          <p className="text-blue-800 text-sm">
                            Ödeme işleminiz tamamlandıktan sonra, müşteri hizmetlerimiz sizleri arayarak 
                            kartvizitinizi beraber oluşturacaksınız. Bu süreçte tüm detayları birlikte 
                            belirleyeceğiz ve kartvizitinizi kişiselleştireceğiz.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 py-4 border border-gray-300 rounded-lg font-bold text-lg text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        ← Geri
                      </button>
                      <button
                        type="submit"
                        disabled={!isFormValid() || isProcessing}
                        className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all ${
                          isFormValid() && !isProcessing
                            ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isProcessing ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            İşleniyor...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <i className="fas fa-credit-card"></i>
                            ₺{selectedPackage.price} Öde
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Sağ Taraf - Özet */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sipariş Özeti</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{selectedPackage.name} Paketi</span>
                  <span className="font-bold text-gray-900">₺{selectedPackage.price}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Kartvizit Sayısı:</span>
                      <span className="text-gray-900">{selectedPackage.cardCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Template:</span>
                      <span className="text-gray-900">{getTemplateById(selectedTemplate)?.name || `Template ${selectedTemplate}`}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Paket Özellikleri:</h4>
                  <ul className="space-y-1">
                    {selectedPackage.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="fas fa-check text-green-500 text-xs"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Toplam:</span>
                    <span className="text-green-600">₺{selectedPackage.price}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800 text-sm">
                    <i className="fas fa-shield-alt"></i>
                    <span>30 gün para iade garantisi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
