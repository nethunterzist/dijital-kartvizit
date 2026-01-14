"use client";
import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Icon } from '@/app/lib/icons';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  avatar_url: string | null;
  text: string;
  rating: number;
  active: boolean;
}

export default function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState<Testimonial[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', slidesToScroll: 1 });

  useEffect(() => {
    fetch('/api/settings/testimonials')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const activeFeedbacks = data.filter((t: Testimonial) => t.active);
          setFeedbacks(activeFeedbacks);
        }
      })
      .catch(() => {
        // Use empty array if testimonials fail to load
      });
  }, []);

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

  if (feedbacks.length === 0) {
    return null; // Aktif yorum yoksa hiçbir şey gösterme
  }

  return (
    <section className="w-full py-20 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-2 md:px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Mobil odaklı global şirketleri güçlendiriyoruz</h2>
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex -mx-2">
            {feedbacks.map((f) => (
              <div key={f.id} className={slideClass}>
                <div className="relative h-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col justify-between transition-all duration-300 hover:border-blue-400 hover:shadow-lg group cursor-pointer">
                  <p className="text-gray-700 text-base mb-8">{f.text}</p>
                  <div className="flex items-center gap-3 mt-auto relative">
                    {f.avatar_url ? (
                      <img src={f.avatar_url} alt={f.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl border border-gray-200">
                        👤
                      </div>
                    )}
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
