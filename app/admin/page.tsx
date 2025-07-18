'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Firma {
  id: number;
  firma_adi: string;
  slug: string;
  telefon?: string;
  eposta?: string;
  website?: string;
  yetkili_adi?: string;
  goruntulenme?: number;
  created_at: string;
  communication_data?: string;
}

export default function AdminDashboard() {
  const [firmaCount, setFirmaCount] = useState(0);
  const [sonEklenenFirmalar, setSonEklenenFirmalar] = useState<Firma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFirmalar() {
      try {
        setLoading(true);
        const response = await fetch('/api/firmalar');
        
        if (!response.ok) {
          throw new Error(`HTTP hata: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Genel bakış - alınan firma verileri:', data);
        
        if (data && data.firmalar) {
          setFirmaCount(data.firmalar.length);
          const siraliList = [...data.firmalar]
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 5);
          setSonEklenenFirmalar(siraliList);
        } else {
          throw new Error('Firma verileri alınamadı');
        }
      } catch (err) {
        console.error('Firmalar alınırken hata oluştu:', err);
        setError('Firmalar yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    fetchFirmalar();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const copyFirmaLink = (slug: string) => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/${slug}`;
    
    navigator.clipboard.writeText(link)
      .then(() => {
        // Modern toast notification yerine basit alert
        alert(`Link kopyalandı: ${link}`);
      })
      .catch(err => {
        console.error('Link kopyalanırken hata oluştu:', err);
      });
  };

  const getPhoneNumber = (firma: Firma) => {
    try {
      if (firma.communication_data) {
        const commData = JSON.parse(firma.communication_data);
        if (commData.telefonlar && commData.telefonlar.length > 0) {
          return commData.telefonlar[0].value;
        }
      }
      return firma.telefon || "-";
    } catch (e) {
      return firma.telefon || "-";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Yönetim Paneli</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            Genel Bakış
          </Link>
          
          <Link
            href="/admin/firmalar"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Firmalar
          </Link>
          
          <Link
            href="/admin/firmalar/yeni"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Yeni Firma Ekle
          </Link>

          <Link
            href="/admin/temalar"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            Temalar
          </Link>

          <Link
            href="/admin/ayarlar"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Sıralama
          </Link>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">© 2025 Sanal Kartvizit</span>
            <Link 
              href="/login"
              className="text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Çıkış
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sanal Kartvizit Yönetim Paneli</h1>
                <p className="text-sm text-gray-600 mt-1">Hoş geldiniz, Admin</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{new Date().toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Toplam Firma</p>
                  <p className="text-2xl font-bold text-gray-900">{firmaCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Toplam Görüntülenme</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sonEklenenFirmalar.reduce((total, firma) => total + (firma.goruntulenme || 0), 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Bu Ay</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sonEklenenFirmalar.filter(firma => {
                      const firmaDate = new Date(firma.created_at);
                      const now = new Date();
                      return firmaDate.getMonth() === now.getMonth() && firmaDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Bugün</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sonEklenenFirmalar.filter(firma => {
                      const firmaDate = new Date(firma.created_at);
                      const today = new Date();
                      return firmaDate.toDateString() === today.toDateString();
                    }).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Companies */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Son Eklenen Firmalar</h2>
                <Link 
                  href="/admin/firmalar" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Tümünü Görüntüle →
                </Link>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Yükleniyor...</span>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              ) : sonEklenenFirmalar.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-4">Henüz firma kaydı bulunmamaktadır.</p>
                  <Link 
                    href="/admin/firmalar/yeni" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Yeni Firma Ekle
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {sonEklenenFirmalar.map((firma) => (
                    <div key={firma.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">{firma.firma_adi.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{firma.firma_adi}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{firma.yetkili_adi || "Yetkili belirtilmemiş"}</span>
                            <span>•</span>
                            <span>{getPhoneNumber(firma)}</span>
                            <span>•</span>
                            <span>{formatDate(firma.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {firma.goruntulenme || 0} görüntülenme
                        </span>
                        
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => copyFirmaLink(firma.slug)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
                            title="Linki kopyala"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          
                          <Link 
                            href={`/${firma.slug}`} 
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
                            title="Görüntüle"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          
                          <Link 
                            href={`/admin/firmalar/${firma.id}`}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
                            title="Düzenle"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
