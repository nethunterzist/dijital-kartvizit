'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { logger } from '@/app/lib/logger';

interface DemoModalProps {
  onClose: () => void;
}

/**
 * OPTIMIZED: Extracted client component for demo modal
 *
 * Benefits:
 * - Isolated client-side logic
 * - Better code splitting
 * - Easier to test and maintain
 */
export default function DemoModal({ onClose }: DemoModalProps) {
  const [form, setForm] = useState({
    adSoyad: '',
    telefon: '',
    webSite: '',
    firmaAdi: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logger.info('Demo talebi gönderildi', { form });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      aria-describedby="demo-modal-description"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Modalı kapat"
          className="absolute top-3 right-3 text-gray-500 hover:text-blue-600 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          &times;
        </button>

        <h3 id="demo-modal-title" className="text-xl font-bold mb-2 text-center">
          Hemen Bilgilerinizi Doldurun, Demonuzu İletelim!
        </h3>
        <p id="demo-modal-description" className="text-gray-600 text-center mb-6">
          Sadece birkaç bilgiyle ücretsiz demo talebinizi hemen oluşturun.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="adSoyad" className="block text-sm font-medium text-gray-700 mb-1">
              Ad Soyad <span className="text-red-600" aria-label="gerekli">*</span>
            </label>
            <input
              id="adSoyad"
              name="adSoyad"
              type="text"
              value={form.adSoyad}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="Adınızı ve soyadınızı girin"
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">
              Telefon <span className="text-red-600" aria-label="gerekli">*</span>
            </label>
            <input
              id="telefon"
              name="telefon"
              type="tel"
              value={form.telefon}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="Telefon numaranızı girin"
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="webSite" className="block text-sm font-medium text-gray-700 mb-1">
              Web Site <span className="text-red-600" aria-label="gerekli">*</span>
            </label>
            <input
              id="webSite"
              name="webSite"
              type="url"
              value={form.webSite}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="https://ornek.com"
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="firmaAdi" className="block text-sm font-medium text-gray-700 mb-1">
              Firma Adı <span className="text-red-600" aria-label="gerekli">*</span>
            </label>
            <input
              id="firmaAdi"
              name="firmaAdi"
              type="text"
              value={form.firmaAdi}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="Firma adınızı girin"
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 px-6 py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Demo Talebini Gönder
          </button>
        </form>
      </div>
    </div>
  );
}
