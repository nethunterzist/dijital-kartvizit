"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  { label: 'Dijital Kartvizit', href: '#' },
  { label: 'Fiyatlar', href: '#pricing' },
  { label: 'Soru & Cevap', href: '#diger-bilgiler' },
  { label: 'Müşteri Yorumları', href: '#yorumlar' },
];

interface SiteSettings {
  site_name: string;
  site_logo: string | null;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'Dijital Kartvizit Merkezi',
    site_logo: '/img/logo/logo.png',
  });

  useEffect(() => {
    fetch('/api/settings/site')
      .then(res => res.json())
      .then(data => {
        if (data && data.site_name) {
          setSettings({
            site_name: data.site_name,
            site_logo: data.site_logo || '/img/logo/logo.png',
          });
        }
      })
      .catch(err => console.error('Ayarlar yüklenemedi:', err));
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm" aria-label="Ana navigasyon">
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Ana içeriğe geç
      </a>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Ana sayfaya dön">
          <span className="flex items-center gap-2 font-bold text-xl text-blue-900">
            <Image
              src={settings.site_logo || '/img/logo/logo.png'}
              alt={`${settings.site_name} logosu`}
              width={120}
              height={120}
              className="rounded-full"
            />
          </span>
        </Link>
        <div className="hidden md:flex gap-2 items-center" role="menubar">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-2 rounded transition font-medium text-gray-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              role="menuitem"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden flex items-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg aria-hidden="true" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-gray-100 shadow px-4 pb-3 flex flex-col gap-2 animate-fade-in"
          role="menu"
        >
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="py-2 px-2 rounded text-gray-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
