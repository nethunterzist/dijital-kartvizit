"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTemplateById } from '@/app/lib/templates/templateRegistry';

interface BillingData {
  billingName: string;
  taxNumber: string;
  billingAddress: string;
  email: string;
  phone: string;
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

function OdemePageContent() {
  const searchParams = useSearchParams();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(2);
  const [billingData, setBillingData] = useState<BillingData>({
    billingName: '',
    taxNumber: '',
    billingAddress: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

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
  }, [searchParams]);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBillingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `DK${timestamp}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Kartvizit bilgilerini URL'den al
      const cardData = {
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

      // API'ye sipariş gönder
      const response = await fetch('/api/siparisler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: selectedPackage!.id,
          packageName: selectedPackage!.name,
          templateId: selectedTemplate,
          price: selectedPackage!.price,
          billingData,
          cardData
        }),
      });

      const result = await response.json();

      if (result.success) {
        setOrderNumber(result.orderNumber);
        setShowThankYou(true);
      } else {
        alert('Sipariş oluşturulamadı: ' + result.error);
      }
    } catch (error) {
      console.error('Sipariş hatası:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = () => {
    return billingData.billingName.trim() && 
           billingData.billingAddress.trim() && 
           billingData.email.trim() && 
           billingData.phone.trim();
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

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-green-600 text-3xl"></i>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Siparişiniz Alındı!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Teşekkür ederiz! Siparişiniz başarıyla oluşturuldu.
            </p>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sipariş Detayları</h2>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-gray-600">Sipariş Numarası:</span>
                  <span className="font-bold text-gray-900 ml-2">{orderNumber}</span>
                </div>
                <div>
                  <span className="text-gray-600">Paket:</span>
                  <span className="font-bold text-gray-900 ml-2">{selectedPackage.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Tasarım:</span>
                  <span className="font-bold text-gray-900 ml-2">
                    {getTemplateById(selectedTemplate)?.name || `Template ${selectedTemplate}`}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Tutar:</span>
                  <span className="font-bold text-green-600 ml-2">₺{selectedPackage.price}</span>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">
                <i className="fas fa-university mr-2"></i>
                Ödeme Bilgileri
              </h3>
              <div className="text-left space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-blue-700 font-medium">Banka:</span>
                    <span className="text-blue-900 ml-2">Türkiye İş Bankası</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Hesap Sahibi:</span>
                    <span className="text-blue-900 ml-2">Dijital Kartvizit Ltd. Şti.</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">IBAN:</span>
                    <span className="text-blue-900 ml-2 font-mono">TR64 0006 4000 0011 2345 6789 01</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Açıklama:</span>
                    <span className="text-blue-900 ml-2">{orderNumber}</span>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                  <p className="text-yellow-800 text-sm">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    <strong>Önemli:</strong> Ödeme yaparken açıklama kısmına mutlaka sipariş numaranızı ({orderNumber}) yazınız.
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Service */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-green-900 mb-4">
                <i className="fas fa-headset mr-2"></i>
                Müşteri Hizmetleri
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+90 555 123 45 67</div>
                  <div className="text-green-700">Telefon Desteği</div>
                  <div className="text-sm text-green-600">Pazartesi - Cuma: 09:00 - 18:00</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">destek@dijitalkartvizit.com</div>
                  <div className="text-green-700">E-posta Desteği</div>
                  <div className="text-sm text-green-600">24 saat içinde yanıt</div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sonraki Adımlar</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <div className="font-medium text-gray-900">Ödeme Yapın</div>
                    <div className="text-gray-600 text-sm">Yukarıdaki IBAN'a sipariş numaranızı belirterek ödeme yapın</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <div className="font-medium text-gray-900">Müşteri Hizmetleri Araması</div>
                    <div className="text-gray-600 text-sm">Ödemeniz onaylandıktan sonra 24 saat içinde sizi arayacağız</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <div className="font-medium text-gray-900">Kartvizit Oluşturma</div>
                    <div className="text-gray-600 text-sm">Birlikte kartvizitinizi tasarlayacak ve tüm detayları belirleyeceğiz</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <div className="font-medium text-gray-900">Teslim</div>
                    <div className="text-gray-600 text-sm">Kartvizitiniz hazır olduğunda size teslim edilecek</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <a 
                href="/" 
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Ana Sayfaya Dön
              </a>
              <button 
                onClick={() => window.print()} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-print mr-2"></i>
                Yazdır
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sipariş Tamamla</h1>
          <p className="text-gray-600">Fatura bilgilerinizi girin ve siparişinizi tamamlayın</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sol Taraf - Fatura Formu */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fatura Bilgileri</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad / Firma Adı *
                    </label>
                    <input
                      type="text"
                      name="billingName"
                      value={billingData.billingName}
                      onChange={handleBillingChange}
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
                      value={billingData.taxNumber}
                      onChange={handleBillingChange}
                      placeholder="Vergi no veya TC kimlik"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={billingData.email}
                    onChange={handleBillingChange}
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
                    value={billingData.phone}
                    onChange={handleBillingChange}
                    placeholder="+90 555 123 45 67"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fatura Adresi *
                  </label>
                  <textarea
                    name="billingAddress"
                    value={billingData.billingAddress}
                    onChange={handleBillingChange}
                    placeholder="Fatura adresi"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                {/* Ödeme Bilgisi */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <i className="fas fa-info-circle text-blue-600 text-lg mt-0.5"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Ödeme Yöntemi</h4>
                      <p className="text-blue-800 text-sm">
                        Siparişinizi onayladıktan sonra, IBAN bilgilerimiz ve ödeme numaranız size gönderilecektir. 
                        Ödemenizi havale/EFT ile yapabilirsiniz. Ödemeniz onaylandıktan sonra müşteri hizmetlerimiz 
                        sizinle iletişime geçerek kartvizitinizi birlikte oluşturacaktır.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid() || isProcessing}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                    isFormValid() && !isProcessing
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sipariş Oluşturuluyor...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-check-circle"></i>
                      Siparişi Onayla
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sağ Taraf - Sipariş Özeti */}
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

// Loading component
function OdemePageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Sayfa yükleniyor...</p>
      </div>
    </div>
  );
}

// Main export with Suspense wrapper
export default function OdemePage() {
  return (
    <Suspense fallback={<OdemePageLoading />}>
      <OdemePageContent />
    </Suspense>
  );
}
