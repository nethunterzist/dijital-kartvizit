'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  const tabs = [
    {
      name: 'Şifre Değiştir',
      href: '/admin/ayarlar/sifre',
    },
    {
      name: 'Genel Ayarlar',
      href: '/admin/ayarlar/genel',
    },
    {
      name: 'Slider Ayarları',
      href: '/admin/ayarlar/slider',
    },
    {
      name: 'Sosyal Medya',
      href: '/admin/ayarlar/sosyal-medya',
    },
    {
      name: 'SSS Video',
      href: '/admin/ayarlar/sss-video',
    },
    {
      name: 'Müşteri Yorumları',
      href: '/admin/ayarlar/yorumlar',
    },
    {
      name: 'SSS',
      href: '/admin/ayarlar/sss',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Ayarlar
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Site ayarlarını ve içerik yönetimini buradan yapabilirsiniz
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                {tabs.map((tab) => {
                  const isActive = pathname === tab.href || pathname?.startsWith(tab.href + '/');
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={`
                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                        transition-colors
                        ${
                          isActive
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                        }
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{tab.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Page Content */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
