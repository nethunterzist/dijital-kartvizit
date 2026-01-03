"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

interface WhatsAppSettings {
  whatsapp_number?: string | null;
  whatsapp_message?: string | null;
  whatsapp_enabled?: boolean;
}

export default function WhatsAppWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<WhatsAppSettings>({
    whatsapp_enabled: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings/site')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSettings({
            whatsapp_number: data.whatsapp_number,
            whatsapp_message: data.whatsapp_message || 'Merhaba 👋 Size nasıl yardımcı olabilirim?',
            whatsapp_enabled: data.whatsapp_enabled !== false,
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('WhatsApp ayarları yüklenemedi:', err);
        setLoading(false);
      });
  }, []);

  const handleStartChat = () => {
    if (!settings.whatsapp_number) return;

    // Remove + and spaces from phone number for WhatsApp link
    const cleanNumber = settings.whatsapp_number.replace(/[\s+]/g, '');
    const message = encodeURIComponent(settings.whatsapp_message || 'Merhaba');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
  };

  // Only show on homepage (/)
  const isHomepage = pathname === '/';

  // Don't render if:
  // - Not on homepage
  // - Loading
  // - Disabled
  // - No phone number
  if (!isHomepage || loading || !settings.whatsapp_enabled || !settings.whatsapp_number) {
    return null;
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="WhatsApp ile iletişime geç"
      >
        <FaWhatsapp className="w-8 h-8" />
        {/* Pulse Animation - Slower */}
        <span className="absolute top-0 left-0 w-full h-full rounded-full bg-[#25D366] animate-ping-slow opacity-75"></span>
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[320px] max-w-[calc(100vw-3rem)] bg-white rounded-lg shadow-2xl overflow-hidden animate-slide-in-bottom">
          {/* Header */}
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2">
                <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">WhatsApp Destek</h3>
                <p className="text-xs opacity-90">Çevrimiçi</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Kapat"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-gray-50 min-h-[180px]">
            {/* Message Bubble */}
            <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {settings.whatsapp_message}
                  </p>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-white border-t border-gray-100">
            <button
              onClick={handleStartChat}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="w-5 h-5" />
              Sohbete Başla
            </button>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slide-in-bottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes ping-slow {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-slide-in-bottom {
          animation: slide-in-bottom 0.3s ease-out;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @media (max-width: 640px) {
          .fixed.bottom-24 {
            width: calc(100vw - 3rem);
          }
        }
      `}</style>
    </>
  );
}
