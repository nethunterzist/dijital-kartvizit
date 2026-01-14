"use client";
import React, { useState, useEffect } from "react";

interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  active: boolean;
}

interface SiteSettings {
  faq_video_url: string | null;
}

export default function VideoFaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch FAQs
    fetch('/api/settings/faq')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const activeFaqs = data.filter((f: Faq) => f.active);
          setFaqs(activeFaqs);
        }
      })
      .catch(() => {
        // Use empty array if FAQs fail to load
      });

    // Fetch video URL from site settings
    fetch('/api/settings/site')
      .then(res => res.json())
      .then((data: SiteSettings) => {
        setVideoUrl(data.faq_video_url);
      })
      .catch(() => {
        // Video URL will remain null if settings fail to load
      });
  }, []);
  return (
    <section id="diger-bilgiler" className="relative w-full min-h-[700px] flex flex-col items-center justify-center pt-48" style={{background: "linear-gradient(120deg, #f8fbfa 0%, #f8e8fa 100%)"}}>
      {/* Arka plan görseli (slider görseli) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img src="/img/video-poster.jpg" alt="Background" className="w-full h-full object-cover opacity-80" />
      </div>
      {/* Video kutusu */}
      {videoUrl && (
        <div className="relative z-10 flex justify-center w-full" style={{marginTop: '-120px'}}>
          <div className="bg-white/80 rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl border border-gray-200 backdrop-blur-md">
            <video
              controls
              poster="/img/video-poster.jpg"
              className="w-full h-[340px] object-cover"
            >
              <source src={videoUrl} type="video/mp4" />
              Tarayıcınız video etiketini desteklemiyor.
            </video>
          </div>
        </div>
      )}
      {/* FAQ alanı */}
      <div className="relative z-10 w-full max-w-3xl mx-auto mt-12 px-4 pb-20">
        <div className="flex flex-col items-center mb-8">
          <span className="uppercase text-xs tracking-widest text-gray-400 mb-2">SIKÇA SORULAN SORULAR</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
            Merak ettiğiniz bir konu mu var? <span className="text-[#5b6fff]">Cevabınızı</span> burada bulamazsanız, iletişim formumuzdan bize ulaşabilirsiniz.
          </h2>
        </div>
        {faqs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {faqs.map((item) => (
              <div key={item.id} className="bg-white/80 rounded-lg shadow p-4">
                <button
                  className="w-full flex justify-between items-center text-left font-medium text-gray-800 text-base focus:outline-none"
                  onClick={() => setOpen(open === item.id ? null : item.id)}
                  aria-expanded={open === item.id}
                  aria-controls={`faq-content-${item.id}`}
                >
                  <span>{item.question}</span>
                  <span className="ml-2 text-[#5b6fff]">{open === item.id ? "-" : "+"}</span>
                </button>
                <div
                  id={`faq-content-${item.id}`}
                  className={`overflow-hidden transition-all duration-400 ease-in-out mt-2 text-gray-600 text-sm ${open === item.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  style={{ transitionProperty: 'max-height, opacity' }}
                >
                  {open === item.id && <div className="whitespace-pre-wrap">{item.answer}</div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Henüz sıkça sorulan soru eklenmemiş.</p>
          </div>
        )}
      </div>
    </section>
  );
} 