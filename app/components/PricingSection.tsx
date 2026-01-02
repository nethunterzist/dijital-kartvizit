"use client";
import React, { useState, useEffect } from 'react';

interface Package {
  id: number;
  package_key: string;
  name: string;
  description: string;
  price: number;
  card_count: number;
  color: string;
  popular: boolean;
  display_order: number;
  features: string[];
}

export default function PricingSection() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      if (!res.ok) throw new Error('Paketler yüklenemedi');
      const data = await res.json();
      setPackages(data);
    } catch (error) {
      console.error('Paketler yüklenirken hata:', error);
      // Hata durumunda boş array ile devam et
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (packageKey: string) => {
    // İletişim sayfasına yönlendir
    alert('Bu paket için lütfen bizimle iletişime geçin: info@dijitalkartvizit.com');
  };

  if (loading) {
    return (
      <section id="pricing" className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Şeffaf Fiyatlandırma
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Size Uygun{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              Paketi Seçin
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            İhtiyacınıza göre tasarlanmış paketlerle dijital kartvizit deneyiminizi başlatın.
            Tüm paketlerde 30 gün para iade garantisi!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                pkg.popular
                  ? 'border-purple-500 scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    <i className="fas fa-fire mr-2"></i>
                    En Popüler
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Package Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ₺{pkg.price}
                      </span>
                      <span className="text-gray-600">
                        tek seferlik
                      </span>
                    </div>
                  </div>

                  {/* Card Count */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    pkg.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                    pkg.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                    pkg.color === 'green' ? 'bg-green-100 text-green-800' :
                    pkg.color === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    <span className="w-2 h-2 bg-current rounded-full"></span>
                    {pkg.card_count} Kartvizit
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        pkg.color === 'blue' ? 'bg-blue-100' :
                        pkg.color === 'purple' ? 'bg-purple-100' :
                        pkg.color === 'green' ? 'bg-green-100' :
                        pkg.color === 'gold' ? 'bg-yellow-100' :
                        'bg-red-100'
                      }`}>
                        <svg className={`w-3 h-3 ${
                          pkg.color === 'blue' ? 'text-blue-600' :
                          pkg.color === 'purple' ? 'text-purple-600' :
                          pkg.color === 'green' ? 'text-green-600' :
                          pkg.color === 'gold' ? 'text-yellow-600' :
                          'text-red-600'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePurchase(pkg.package_key)}
                  aria-label={`${pkg.name} paketini seç - ₺${pkg.price} tek seferlik ödeme ile ${pkg.card_count} dijital kartvizit`}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white focus:ring-purple-500'
                      : pkg.color === 'blue'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white focus:ring-blue-500'
                      : pkg.color === 'purple'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white focus:ring-purple-500'
                      : pkg.color === 'green'
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white focus:ring-green-500'
                      : pkg.color === 'gold'
                      ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white focus:ring-yellow-500'
                      : 'bg-gradient-to-r from-red-600 to-red-700 text-white focus:ring-red-500'
                  }`}
                >
                  {pkg.popular ? (
                    <>
                      <i className="fas fa-rocket mr-2" aria-hidden="true"></i>
                      Hemen Başla
                    </>
                  ) : (
                    'Paketi Seç'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">30 Gün Garanti</h4>
              <p className="text-gray-600 text-sm">Memnun kalmazsan paranı iade ediyoruz</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Anında Aktivasyon</h4>
              <p className="text-gray-600 text-sm">Ödeme sonrası hemen kullanmaya başla</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">7/24 Destek</h4>
              <p className="text-gray-600 text-sm">Her zaman yanındayız, yardıma hazırız</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Ücretsiz Güncellemeler</h4>
              <p className="text-gray-600 text-sm">Yeni özellikler otomatik olarak gelir</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
