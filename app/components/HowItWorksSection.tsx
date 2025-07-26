"use client";
import React from "react";

const STEPS = [
  {
    number: "01",
    title: "Bilgilerini Gir",
    desc: "Temel bilgilerini ve iletişim detaylarını kolayca ekle.",
    icon: "fas fa-edit"
  },
  {
    number: "02",
    title: "Tasarımını Seç",
    desc: "50+ profesyonel tema arasından beğendiğini seç.",
    icon: "fas fa-palette"
  },
  {
    number: "03",
    title: "Anında Paylaş",
    desc: "QR kod ile kartvizitini hemen paylaşmaya başla.",
    icon: "fas fa-mobile-alt"
  },
  {
    number: "04",
    title: "Satın Al ve Kullan",
    desc: "Beğenirsen paketi seç, öde ve kullanmaya devam et.",
    icon: "fas fa-credit-card"
  }
];

export default function HowItWorksSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            Nasıl Çalışır?
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              4 Basit Adımda
            </span>{' '}
            Dijital Kartvizit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dakikalar içinde profesyonel dijital kartvizitinizi oluşturun ve hemen kullanmaya başlayın.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connection Line */}
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-purple-200 to-blue-200 z-0"></div>
              )}
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 z-10">
                {/* Step Number */}
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="text-4xl text-center mb-4 text-purple-600">
                  <i className={step.icon}></i>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Hemen Başlamaya Hazır mısın?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Yukarıdaki adımları takip ederek dakikalar içinde profesyonel dijital kartvizitinizi oluşturabilirsiniz.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('card-creator');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              <i className="fas fa-rocket mr-2"></i>
              Hemen Kartvizit Oluştur
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
