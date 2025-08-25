'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  // Dark mode state'ini localStorage'dan yükle
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('admin-dark-mode');
    if (savedDarkMode) {
      const isDark = JSON.parse(savedDarkMode);
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Eğer localStorage'da kayıt yoksa, sistem tercihini kontrol et
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    setIsLoaded(true);
  }, []);

  // Dark mode değiştiğinde localStorage'a kaydet ve body class'ını güncelle
  useEffect(() => {
    if (darkMode !== null) {
      localStorage.setItem('admin-dark-mode', JSON.stringify(darkMode));
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      await signOut({ callbackUrl: '/login' });
    }
  };

  const isActive = (path: string) => {
    if (path === '/admin' && pathname === '/admin') return true;
    if (path === '/admin/firmalar' && pathname === '/admin/firmalar/yeni') return false; // Yeni firma sayfasında firmalar menüsü aktif olmasın
    if (path !== '/admin' && pathname.startsWith(path)) return true;
    return false;
  };

  // Loading state - dark mode henüz yüklenmemişse boş ekran göster
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Modern Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50 w-56 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-colors">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Yönetim Paneli</h1>
          </div>

          {/* Navigation */}
          <nav className="mt-8 px-4 space-y-2">
            <Link
              href="/admin"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/admin')
                  ? 'text-white bg-blue-600 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
              </svg>
              Genel Bakış
            </Link>
            
            <Link
              href="/admin/firmalar"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/admin/firmalar')
                  ? 'text-white bg-blue-600 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Firmalar
            </Link>
            
            <Link
              href="/admin/firmalar/yeni"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/admin/firmalar/yeni')
                  ? 'text-white bg-blue-600 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Yeni Firma Ekle
            </Link>


            <Link
              href="/admin/temalar"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/admin/temalar')
                  ? 'text-white bg-blue-600 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
              Temalar
            </Link>


            <Link
              href="/admin/ayarlar"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/admin/ayarlar')
                  ? 'text-white bg-blue-600 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              Sıralama
            </Link>
          </nav>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">© 2025 Dijital Kartvizit</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pl-56">
          {/* Top Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dijital Kartvizit Yönetim Paneli</h1>
                </div>
                <div className="flex items-center space-x-4">
                  
                  {/* Quick Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleDarkMode}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title={darkMode ? 'Açık temaya geç' : 'Koyu temaya geç'}
                    >
                      {darkMode ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      )}
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Çıkış yap"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
