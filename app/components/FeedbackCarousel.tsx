"use client";
import React, { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Icon } from '@/app/lib/icons';

const feedbacks = [
  {
    text: "Dijital kartvizit sayesinde müşterilerimle tanışma sürecim çok daha profesyonel hale geldi. QR kod ile hemen iletişim bilgilerimi paylaşabiliyorum, artık kağıt kartvizit taşımıyorum bile!",
    name: "Ahmet Yılmaz",
    title: "Satış Müdürü, TechSoft A.Ş.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    text: "Networking etkinliklerinde dijital kartvizitim sayesinde çok daha fazla kişiyle bağlantı kurabiliyorum. Sosyal medya hesaplarım ve portfolyom tek bir linkte toplanmış, müthiş bir çözüm!",
    name: "Elif Kaya",
    title: "Grafik Tasarımcı, Kreatif Ajans",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    text: "Emlak sektöründe çalışıyorum ve dijital kartvizit müşteri ilişkilerimde devrim yarattı. WhatsApp, telefon, e-posta, hatta harita konumum bile bir QR kod ile paylaşılıyor. Çok pratik!",
    name: "Mehmet Özkan",
    title: "Emlak Danışmanı, Özkan Gayrimenkul",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    text: "Avukatlık büromuzda tüm ekip dijital kartvizit kullanıyor. Müvekkillere profesyonel bir imaj sunuyoruz ve iletişim bilgilerimizi güncel tutmak çok kolay. Kesinlikle tavsiye ederim!",
    name: "Ayşe Demir",
    title: "Avukat, Demir Hukuk Bürosu",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
];

export default function FeedbackCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', slidesToScroll: 1 });

  // Otomatik kaydırma
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  // 3'lü grid görünümü için slideWidth %33
  const slideClass =
    'embla__slide flex-shrink-0 w-full md:w-1/3 px-2';

  return (
    <section className="w-full py-20 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-2 md:px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Mobil odaklı global şirketleri güçlendiriyoruz</h2>
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex -mx-2">
            {feedbacks.map((f, idx) => (
              <div key={idx} className={slideClass}>
                <div className="relative h-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col justify-between transition-all duration-300 hover:border-blue-400 hover:shadow-lg group cursor-pointer">
                  <p className="text-gray-700 text-base mb-8">{f.text}</p>
                  <div className="flex items-center gap-3 mt-auto relative">
                    <img src={f.avatar} alt={f.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-lg">{f.name}</span>
                      <span className="text-base text-gray-500">{f.title}</span>
                    </div>
                    <span className="flex-1" />
                    {/* Sağda büyük tırnak işareti (consolidated icons) */}
                    <Icon name="quote" className="w-14 h-14 ml-4 -mr-2 text-gray-200 opacity-80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
