'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Firma {
  id: number;
  firma_adi: string;
  slug: string;
  telefon?: string;
  eposta?: string;
  yetkili_adi?: string;
  goruntulenme?: number;
  created_at: string;
  communication_data?: string;
}

export default function FirmalarPage() {
  const [firmalar, setFirmalar] = useState<Firma[]>([]);
  const [filteredFirmalar, setFilteredFirmalar] = useState<Firma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    async function fetchFirmalar() {
      try {
        setLoading(true);
        const response = await fetch('/api/firmalar');
        
        if (!response.ok) {
          throw new Error(`Firmalar getirilirken bir hata oluştu: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && Array.isArray(data.firmalar)) {
          setFirmalar(data.firmalar);
          setFilteredFirmalar(data.firmalar);
        } else {
          setError("API yanıtında firma verisi bulunamadı");
        }
      } catch (err: any) {
        console.error('Firma getirme hatası:', err);
        setError(`Firmalar yüklenirken bir hata oluştu: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFirmalar();
  }, []);
  
  // Arama işlevi
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFirmalar(firmalar);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = firmalar.filter(firma => 
        firma.firma_adi.toLowerCase().includes(lowercasedSearchTerm) || 
        firma.slug.toLowerCase().includes(lowercasedSearchTerm) ||
        (firma.yetkili_adi && firma.yetkili_adi.toLowerCase().includes(lowercasedSearchTerm))
      );
      setFilteredFirmalar(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, firmalar]);
  
  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(filteredFirmalar.length / itemsPerPage);
  const paginatedFirmalar = filteredFirmalar.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );
  
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
        alert(`Link kopyalandı: ${link}`);
      })
      .catch(err => {
        console.error('Link kopyalanırken hata oluştu:', err);
      });
  };
  
  const handleDelete = async (id: number, firmaAdi: string) => {
    if (!confirm(`"${firmaAdi}" firmasını silmek istediğinize emin misiniz?`)) {
      return;
    }
    
    try {
      const response = await fetch(`/api/firmalar/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Firma silinirken hata: ${response.status}`);
      }
      
      const updatedFirmalar = firmalar.filter(firma => firma.id !== id);
      setFirmalar(updatedFirmalar);
      setFilteredFirmalar(updatedFirmalar.filter(firma => 
        !searchTerm || 
        firma.firma_adi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        firma.slug.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      
    } catch (err) {
      console.error('Firma silinirken hata:', err);
      alert('Firma silinirken bir hata oluştu.');
    }
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
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            Genel Bakış
          </Link>
          
          <Link
            href="/admin/firmalar"
            className="flex items-center px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm"
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
                <h1 className="text-2xl font-bold text-gray-900">Firmalar</h1>
                <p className="text-sm text-gray-600 mt-1">Tüm firmaları görüntüleyin ve yönetin</p>
              </div>
              <Link 
                href="/admin/firmalar/yeni" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Yeni Firma Ekle
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          {/* Search and Stats */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Firma adı, slug veya yetkili ara..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Toplam: {firmalar.length}
                </span>
                {searchTerm && (
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Filtrelenen: {filteredFirmalar.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Firmalar yükleniyor...</span>
              </div>
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            </div>
          ) : filteredFirmalar.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? "Arama sonucu bulunamadı" : "Henüz firma bulunmuyor"}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm 
                    ? `"${searchTerm}" ile eşleşen firma bulunamadı.`
                    : "İlk firmanızı ekleyerek başlayın."
                  }
                </p>
                {!searchTerm && (
                  <Link 
                    href="/admin/firmalar/yeni" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Yeni Firma Ekle
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Companies Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Firma Adı
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Yetkili
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Telefon
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tarih
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Görüntülenme
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedFirmalar.map((firma) => (
                        <tr key={firma.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {firma.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-blue-600 font-semibold text-sm">{firma.firma_adi.charAt(0)}</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{firma.firma_adi}</div>
                                <div className="text-sm text-gray-500">/{firma.slug}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {firma.yetkili_adi || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getPhoneNumber(firma)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(firma.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              {firma.goruntulenme || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end items-center space-x-2">
                              <button
                                onClick={() => copyFirmaLink(firma.slug)}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                title="Linki kopyala"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                              
                              <Link 
                                href={`/${firma.slug}`} 
                                target="_blank"
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                title="Görüntüle"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </Link>
                              
                              <Link 
                                href={`/admin/firmalar/${firma.id}`}
                                className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                              >
                                Düzenle
                              </Link>
                              
                              <button
                                onClick={() => handleDelete(firma.id, firma.firma_adi)}
                                className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
                              >
                                Sil
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    <span>Toplam {filteredFirmalar.length} firmadan </span>
                    <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
                    <span> - </span>
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, filteredFirmalar.length)}
                    </span>
                    <span> arası gösteriliyor</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        currentPage === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Önceki
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        currentPage === totalPages 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Sonraki
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
