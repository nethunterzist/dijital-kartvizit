"use client";
import React, { useState, useEffect } from 'react';

interface Siparis {
  id: number;
  siparis_no: string;
  paket_id: string;
  paket_adi: string;
  template_id: number;
  template_adi: string;
  tutar: number;
  fatura_adi: string;
  vergi_no: string | null;
  fatura_adresi: string;
  email: string;
  telefon: string;
  firma_adi: string | null;
  yetkili_adi: string | null;
  yetkili_pozisyon: string | null;
  iletisim_telefon: string | null;
  iletisim_eposta: string | null;
  website: string | null;
  instagram: string | null;
  linkedin: string | null;
  facebook: string | null;
  durum: string;
  odeme_durumu: string;
  admin_notu: string | null;
  musteri_notu: string | null;
  created_at: string;
  updated_at: string;
  odeme_tarihi: string | null;
  tamamlanma_tarihi: string | null;
}

const durumRenkleri = {
  'beklemede': 'bg-yellow-100 text-yellow-800',
  'odeme_onaylandi': 'bg-blue-100 text-blue-800',
  'kartvizit_olusturuluyor': 'bg-purple-100 text-purple-800',
  'tamamlandi': 'bg-green-100 text-green-800',
  'iptal': 'bg-red-100 text-red-800'
};

const durumMetinleri = {
  'beklemede': 'Beklemede',
  'odeme_onaylandi': 'Ödeme Onaylandı',
  'kartvizit_olusturuluyor': 'Kartvizit Oluşturuluyor',
  'tamamlandi': 'Tamamlandı',
  'iptal': 'İptal'
};

const odemeDurumRenkleri = {
  'beklemede': 'bg-yellow-100 text-yellow-800',
  'onaylandi': 'bg-green-100 text-green-800',
  'reddedildi': 'bg-red-100 text-red-800'
};

const odemeDurumMetinleri = {
  'beklemede': 'Beklemede',
  'onaylandi': 'Onaylandı',
  'reddedildi': 'Reddedildi'
};

export default function SiparislerPage() {
  const [siparisler, setSiparisler] = useState<Siparis[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSiparis, setSelectedSiparis] = useState<Siparis | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    durum: 'all',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchSiparisler();
  }, [filters, pagination.page]);

  const fetchSiparisler = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.durum !== 'all' && { durum: filters.durum }),
        ...(filters.search && { search: filters.search })
      });

      const response = await fetch(`/api/siparisler?${params}`);
      const result = await response.json();

      if (result.success) {
        setSiparisler(result.data);
        setPagination(prev => ({
          ...prev,
          total: result.pagination.total,
          pages: result.pagination.pages
        }));
      }
    } catch (error) {
      console.error('Sipariş listesi hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSiparisDurum = async (siparisId: number, yeniDurum: string, odemeDurumu?: string) => {
    try {
      const response = await fetch(`/api/siparisler/${siparisId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          durum: yeniDurum,
          ...(odemeDurumu && { odeme_durumu: odemeDurumu }),
          ...(odemeDurumu === 'onaylandi' && { odeme_tarihi: new Date().toISOString() }),
          ...(yeniDurum === 'tamamlandi' && { tamamlanma_tarihi: new Date().toISOString() })
        }),
      });

      const result = await response.json();
      if (result.success) {
        fetchSiparisler();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Durum güncelleme hatası:', error);
    }
  };

  const formatTarih = (tarih: string) => {
    return new Date(tarih).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTutar = (tutar: number) => {
    return `₺${(tutar / 100).toLocaleString('tr-TR')}`;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sipariş Yönetimi</h1>
        <p className="text-gray-600">Müşteri siparişlerini görüntüleyin ve yönetin</p>
      </div>

      {/* Filtreler */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durum Filtresi
            </label>
            <select
              value={filters.durum}
              onChange={(e) => setFilters(prev => ({ ...prev, durum: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="beklemede">Beklemede</option>
              <option value="odeme_onaylandi">Ödeme Onaylandı</option>
              <option value="kartvizit_olusturuluyor">Kartvizit Oluşturuluyor</option>
              <option value="tamamlandi">Tamamlandı</option>
              <option value="iptal">İptal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arama
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Sipariş no, müşteri adı, email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchSiparisler}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-search mr-2"></i>
              Filtrele
            </button>
          </div>
        </div>
      </div>

      {/* Sipariş Listesi */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sipariş No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ödeme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Yükleniyor...</span>
                    </div>
                  </td>
                </tr>
              ) : siparisler.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    Sipariş bulunamadı
                  </td>
                </tr>
              ) : (
                siparisler.map((siparis) => (
                  <tr key={siparis.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {siparis.siparis_no}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{siparis.fatura_adi}</div>
                      <div className="text-sm text-gray-500">{siparis.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{siparis.paket_adi}</div>
                      <div className="text-sm text-gray-500">{siparis.template_adi}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatTutar(siparis.tutar)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${durumRenkleri[siparis.durum as keyof typeof durumRenkleri]}`}>
                        {durumMetinleri[siparis.durum as keyof typeof durumMetinleri]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${odemeDurumRenkleri[siparis.odeme_durumu as keyof typeof odemeDurumRenkleri]}`}>
                        {odemeDurumMetinleri[siparis.odeme_durumu as keyof typeof odemeDurumMetinleri]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTarih(siparis.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedSiparis(siparis);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <i className="fas fa-eye mr-1"></i>
                        Detay
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Toplam {pagination.total} sipariş, sayfa {pagination.page} / {pagination.pages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={pagination.page === 1}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Önceki
                </button>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sonraki
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sipariş Detay Modal */}
      {showModal && selectedSiparis && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Sipariş Detayı - {selectedSiparis.siparis_no}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
              </div>

              <div className="px-6 py-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sipariş Bilgileri */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Sipariş Bilgileri</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Sipariş No:</span>
                        <div className="text-sm text-gray-900">{selectedSiparis.siparis_no}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Paket:</span>
                        <div className="text-sm text-gray-900">{selectedSiparis.paket_adi}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Template:</span>
                        <div className="text-sm text-gray-900">{selectedSiparis.template_adi}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Tutar:</span>
                        <div className="text-sm text-gray-900">{formatTutar(selectedSiparis.tutar)}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Sipariş Tarihi:</span>
                        <div className="text-sm text-gray-900">{formatTarih(selectedSiparis.created_at)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Fatura Bilgileri */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Fatura Bilgileri</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Ad/Firma:</span>
                        <div className="text-sm text-gray-900">{selectedSiparis.fatura_adi}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">E-posta:</span>
                        <div className="text-sm text-gray-900">{selectedSiparis.email}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Telefon:</span>
                        <div className="text-sm text-gray-900">{selectedSiparis.telefon}</div>
                      </div>
                      {selectedSiparis.vergi_no && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Vergi No:</span>
                          <div className="text-sm text-gray-900">{selectedSiparis.vergi_no}</div>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-500">Adres:</span>
                        <div className="text-sm text-gray-900">{selectedSiparis.fatura_adresi}</div>
                      </div>
                    </div>
                  </div>

                  {/* Kartvizit Bilgileri */}
                  {(selectedSiparis.firma_adi || selectedSiparis.yetkili_adi) && (
                    <div className="md:col-span-2">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Kartvizit Bilgileri</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedSiparis.firma_adi && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Firma Adı:</span>
                            <div className="text-sm text-gray-900">{selectedSiparis.firma_adi}</div>
                          </div>
                        )}
                        {selectedSiparis.yetkili_adi && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Yetkili:</span>
                            <div className="text-sm text-gray-900">{selectedSiparis.yetkili_adi}</div>
                          </div>
                        )}
                        {selectedSiparis.yetkili_pozisyon && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Pozisyon:</span>
                            <div className="text-sm text-gray-900">{selectedSiparis.yetkili_pozisyon}</div>
                          </div>
                        )}
                        {selectedSiparis.iletisim_telefon && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">İletişim Tel:</span>
                            <div className="text-sm text-gray-900">{selectedSiparis.iletisim_telefon}</div>
                          </div>
                        )}
                        {selectedSiparis.iletisim_eposta && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">İletişim Email:</span>
                            <div className="text-sm text-gray-900">{selectedSiparis.iletisim_eposta}</div>
                          </div>
                        )}
                        {selectedSiparis.website && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Website:</span>
                            <div className="text-sm text-gray-900">{selectedSiparis.website}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer - Durum Güncelleme */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${durumRenkleri[selectedSiparis.durum as keyof typeof durumRenkleri]}`}>
                      {durumMetinleri[selectedSiparis.durum as keyof typeof durumMetinleri]}
                    </span>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${odemeDurumRenkleri[selectedSiparis.odeme_durumu as keyof typeof odemeDurumRenkleri]}`}>
                      Ödeme: {odemeDurumMetinleri[selectedSiparis.odeme_durumu as keyof typeof odemeDurumMetinleri]}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {selectedSiparis.odeme_durumu === 'beklemede' && (
                      <>
                        <button
                          onClick={() => updateSiparisDurum(selectedSiparis.id, 'odeme_onaylandi', 'onaylandi')}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          Ödeme Onayla
                        </button>
                        <button
                          onClick={() => updateSiparisDurum(selectedSiparis.id, 'iptal', 'reddedildi')}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                          Reddet
                        </button>
                      </>
                    )}
                    {selectedSiparis.durum === 'odeme_onaylandi' && (
                      <button
                        onClick={() => updateSiparisDurum(selectedSiparis.id, 'kartvizit_olusturuluyor')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                      >
                        Kartvizit Oluşturmaya Başla
                      </button>
                    )}
                    {selectedSiparis.durum === 'kartvizit_olusturuluyor' && (
                      <button
                        onClick={() => updateSiparisDurum(selectedSiparis.id, 'tamamlandi')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Tamamlandı Olarak İşaretle
                      </button>
                    )}
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
