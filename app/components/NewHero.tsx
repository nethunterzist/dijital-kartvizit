"use client";
import React, { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

export default function NewHero() {
  const [showModal, setShowModal] = useState(false);

  const scrollToCardCreator = () => {
    const element = document.getElementById('card-creator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl w-full text-center pt-32 pb-16 z-10 px-4">
        {/* Main Headline */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
            Dijital Kartvizitinizi
          </h1>
          <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            <Typewriter
              words={['3 Adımda Oluşturun', 'Anında Paylaşın', 'Hemen Satın Alın']}
              loop={0}
              cursor
              cursorStyle='|'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>
        </div>

        {/* Sub Headline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          Profesyonel dijital kartvizitinizi saniyeler içinde tasarlayın, QR kod ile anında paylaşın ve ağınızı genişletin. 
          <span className="font-semibold text-blue-600"> Beğenirseniz, hemen satın alın!</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            onClick={scrollToCardCreator}
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-rocket"></i>
              Hemen Kartvizit Oluştur
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <button 
            onClick={scrollToPricing}
            className="px-8 py-4 rounded-xl bg-white border-2 border-blue-600 text-blue-600 font-bold text-lg shadow-lg hover:bg-blue-50 transition-all duration-300"
          >
            <i className="fas fa-tags mr-2"></i>
            Paketleri İncele
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 mb-16">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">10,000+ Aktif Kullanıcı</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">50,000+ Kartvizit Oluşturuldu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">%99.9 Uptime</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative max-w-4xl mx-auto">
          {/* 3D Phone Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20 scale-110"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Phone 1 */}
                <div className="transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-48 h-96 bg-black rounded-[2.5rem] p-2 shadow-2xl mx-auto">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-[2rem] flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                          <i className="fas fa-user text-2xl text-gray-600"></i>
                        </div>
                        <h3 className="font-bold text-lg mb-1">Ahmet Yılmaz</h3>
                        <p className="text-sm opacity-90">Genel Müdür</p>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-qrcode text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-phone text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-envelope text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fab fa-instagram text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fab fa-linkedin text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-globe text-white text-xs"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone 2 - Center */}
                <div className="transform scale-110 hover:scale-125 transition-transform duration-500">
                  <div className="w-48 h-96 bg-black rounded-[2.5rem] p-2 shadow-2xl mx-auto">
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-[2rem] flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                          <i className="fas fa-building text-2xl text-gray-600"></i>
                        </div>
                        <h3 className="font-bold text-lg mb-1">Tech Şirket</h3>
                        <p className="text-sm opacity-90">Yazılım Geliştirme</p>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-qrcode text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-university text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-globe text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fab fa-facebook text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fab fa-youtube text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-book text-white text-xs"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone 3 */}
                <div className="transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-48 h-96 bg-black rounded-[2.5rem] p-2 shadow-2xl mx-auto">
                    <div className="w-full h-full bg-gradient-to-br from-pink-500 to-red-600 rounded-[2rem] flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                          <i className="fas fa-briefcase text-2xl text-gray-600"></i>
                        </div>
                        <h3 className="font-bold text-lg mb-1">Ayşe Demir</h3>
                        <p className="text-sm opacity-90">Pazarlama Uzmanı</p>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-qrcode text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fab fa-whatsapp text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fab fa-twitter text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-map-marker-alt text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fab fa-tiktok text-white text-xs"></i>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-info-circle text-white text-xs"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Apple Mouse Style */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            {/* Mouse Body */}
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
              {/* Scroll Wheel */}
              <div className="w-1 h-3 bg-gray-400 rounded-full mx-auto mt-2 animate-bounce" 
                   style={{
                     animationDuration: '2s',
                     animationIterationCount: 'infinite'
                   }}>
              </div>
            </div>
            {/* Scroll Down Arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 animate-bounce" 
                 style={{
                   animationDuration: '2s',
                   animationIterationCount: 'infinite',
                   animationDelay: '0.5s'
                 }}>
              <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 13l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
