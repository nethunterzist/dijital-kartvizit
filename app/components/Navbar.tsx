"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  { label: 'Dijital Kartvizit', href: '#top' },
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
  const [siteName, setSiteName] = useState('Dijital Kartvizit Merkezi');
  const [siteLogo, setSiteLogo] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/settings/site')
      .then(res => res.json())
      .then((data: SiteSettings) => {
        if (data) {
          if (data.site_name) setSiteName(data.site_name);
          if (data.site_logo) setSiteLogo(data.site_logo);
        }
      })
      .catch(err => console.error('Site ayarları yüklenemedi:', err));
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

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
        <Link
          href="/"
          aria-label="Ana sayfaya dön"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {siteLogo && (
            <span className="flex items-center gap-2">
              <Image
                src={siteLogo}
                alt={`${siteName} logosu`}
                width={120}
                height={120}
                className="rounded-full"
              />
            </span>
          )}
        </Link>
        <div className="hidden md:flex gap-2 items-center" role="menubar">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
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
              onClick={(e) => {
                handleSmoothScroll(e, item.href);
                setOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
