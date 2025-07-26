"use client";
import React from 'react';

export default function TrustIndicators() {
  const stats = [
    {
      number: "50,000+",
      label: "Oluşturulan Kartvizit",
      icon: "fas fa-mobile-alt",
      color: "blue"
    },
    {
      number: "10,000+",
      label: "Aktif Kullanıcı",
      icon: "fas fa-users",
      color: "green"
    },
    {
      number: "99.9%",
      label: "Uptime Garantisi",
      icon: "fas fa-bolt",
      color: "purple"
    },
    {
      number: "24/7",
      label: "Müşteri Desteği",
      icon: "fas fa-headset",
      color: "orange"
    }
  ];

  const trustedCompanies = [
    {
      name: "Tech Şirket A.Ş.",
      logo: "fas fa-building",
      industry: "Teknoloji"
    },
    {
      name: "Digital Medya",
      logo: "fas fa-tv",
      industry: "Medya"
    },
    {
      name: "Mega İnşaat",
      logo: "fas fa-hard-hat",
      industry: "İnşaat"
    },
    {
      name: "Smart Turizm",
      logo: "fas fa-plane",
      industry: "Turizm"
    },
    {
      name: "Ege Yazılım",
      logo: "fas fa-laptop-code",
      industry: "Yazılım"
    },
    {
      name: "Net Holding",
      logo: "fas fa-university",
      industry: "Holding"
    }
  ];

  const securityFeatures = [
    {
      icon: "fas fa-lock",
      title: "SSL Şifrelemesi",
      description: "Tüm verileriniz 256-bit SSL ile korunur"
    },
    {
      icon: "fas fa-shield-alt",
      title: "GDPR Uyumlu",
      description: "Avrupa veri koruma standartlarına uygun"
    },
    {
      icon: "fas fa-cloud",
      title: "Bulut Yedekleme",
      description: "Verileriniz otomatik olarak yedeklenir"
    },
    {
      icon: "fas fa-key",
      title: "İki Faktörlü Doğrulama",
      description: "Hesabınız için ekstra güvenlik katmanı"
    }
  ];

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Güvenilir Platform
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Binlerce Firma
            </span>{' '}
            Bize Güveniyor
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Türkiye'nin en güvenilir dijital kartvizit platformunda yerinizi alın. 
            Güvenlik, kalite ve müşteri memnuniyeti önceliğimiz.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                <i className={stat.icon}></i>
              </div>
              <div className={`text-4xl font-bold mb-2 ${
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'green' ? 'text-green-600' :
                stat.color === 'purple' ? 'text-purple-600' :
                'text-orange-600'
              }`}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trusted Companies */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Bize Güvenen Markalar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {trustedCompanies.map((company, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform text-blue-600">
                  <i className={company.logo}></i>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{company.name}</h4>
                <p className="text-xs text-gray-500">{company.industry}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Güvenlik ve Gizlilik Önceliğimiz
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verilerinizin güvenliği için en yüksek standartları kullanıyoruz. 
              Bilgileriniz tamamen güvende ve sadece sizin kontrolünüzde.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl text-gray-600">
                  <i className={feature.icon}></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">ISO 27001 Sertifikalı</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">GDPR Uyumlu</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">SOC 2 Type II</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Preview */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">
            Müşterilerimiz Ne Diyor?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-1 mb-4 justify-center">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Dijital kartvizit sayesinde müşterilerimle iletişim çok daha kolay. QR kod özelliği harika!"
              </p>
              <div className="font-bold text-gray-900">Ahmet Yılmaz</div>
              <div className="text-sm text-gray-500">Genel Müdür, Tech Şirket</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-1 mb-4 justify-center">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Çok profesyonel görünüyor ve kullanımı çok basit. Tüm ekibimiz kullanıyor artık."
              </p>
              <div className="font-bold text-gray-900">Ayşe Demir</div>
              <div className="text-sm text-gray-500">Pazarlama Müdürü, Digital Medya</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-1 mb-4 justify-center">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Müşteri desteği mükemmel. Sorularım hemen yanıtlandı ve kurulum çok hızlıydı."
              </p>
              <div className="font-bold text-gray-900">Mehmet Kaya</div>
              <div className="text-sm text-gray-500">CEO, Mega İnşaat</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
