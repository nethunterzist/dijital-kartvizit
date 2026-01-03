'use client';

import { useState } from 'react';
import { usePackageInquiries } from '@/app/lib/hooks/usePackageInquiries';
import toast from 'react-hot-toast';
import { FaPhone, FaEnvelope, FaTrash, FaEye, FaSearch, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';

interface PackageInquiry {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string | null;
  package_key: string;
  package_name: string;
  package_price: number;
  package_features: string[];
  status: string;
  ip_address: string | null;
  user_agent: string | null;
  admin_notes: string | null;
  contacted_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function TaleplerPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState<PackageInquiry | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { inquiries, total, totalPages, isLoading, mutate } = usePackageInquiries({
    search,
    status,
    page,
    limit: 30,
  });

  const handleDelete = async (id: number) => {
    if (!confirm('Bu talebi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/package-inquiries?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Silme işlemi başarısız');

      toast.success('Talep silindi');
      mutate();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Bir hata oluştu');
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const updateData: any = { id, status: newStatus };

      if (newStatus === 'contacted' && !inquiries.find((i: PackageInquiry) => i.id === id)?.contacted_at) {
        updateData.contacted_at = new Date().toISOString();
      }

      if (newStatus === 'completed' && !inquiries.find((i: PackageInquiry) => i.id === id)?.completed_at) {
        updateData.completed_at = new Date().toISOString();
      }

      const response = await fetch('/api/admin/package-inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error('Güncelleme başarısız');

      toast.success('Durum güncellendi');
      mutate();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Bir hata oluştu');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      contacted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    };

    const labels = {
      pending: 'Bekliyor',
      contacted: 'İletişimde',
      completed: 'Tamamlandı',
      cancelled: 'İptal',
    };

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status as keyof typeof styles] || styles.pending}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(price);
  };

  const handleExportToExcel = async () => {
    try {
      toast.loading('Excel dosyası hazırlanıyor...');

      // Build query params for export
      const params = new URLSearchParams();
      params.append('export', 'true');
      if (status && status !== 'all') params.append('status', status);
      if (search) params.append('search', search);

      // Fetch all data
      const response = await fetch(`/api/admin/package-inquiries?${params.toString()}`);
      if (!response.ok) throw new Error('Veri alınamadı');

      const result = await response.json();
      const allInquiries: PackageInquiry[] = result.data;

      if (allInquiries.length === 0) {
        toast.dismiss();
        toast.error('Dışa aktarılacak veri bulunamadı');
        return;
      }

      // Prepare data for Excel
      const excelData = allInquiries.map((inquiry) => ({
        'ID': inquiry.id,
        'Tarih': formatDate(inquiry.created_at),
        'Ad': inquiry.name,
        'Soyad': inquiry.surname,
        'Telefon': inquiry.phone,
        'E-posta': inquiry.email || '-',
        'Paket': inquiry.package_name,
        'Fiyat': formatPrice(inquiry.package_price),
        'Durum': getStatusLabel(inquiry.status),
        'IP Adresi': inquiry.ip_address || '-',
        'İletişim Tarihi': inquiry.contacted_at ? formatDate(inquiry.contacted_at) : '-',
        'Tamamlanma Tarihi': inquiry.completed_at ? formatDate(inquiry.completed_at) : '-',
      }));

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // Set column widths
      const columnWidths = [
        { wch: 8 },  // ID
        { wch: 18 }, // Tarih
        { wch: 15 }, // Ad
        { wch: 15 }, // Soyad
        { wch: 15 }, // Telefon
        { wch: 25 }, // E-posta
        { wch: 20 }, // Paket
        { wch: 12 }, // Fiyat
        { wch: 12 }, // Durum
        { wch: 15 }, // IP Adresi
        { wch: 18 }, // İletişim Tarihi
        { wch: 18 }, // Tamamlanma Tarihi
      ];
      worksheet['!cols'] = columnWidths;

      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Paket Talepleri');

      // Generate filename with current date
      const now = new Date();
      const dateStr = now.toLocaleDateString('tr-TR').replace(/\./g, '-');
      const filename = `paket-talepleri-${dateStr}.xlsx`;

      // Download file
      XLSX.writeFile(workbook, filename);

      toast.dismiss();
      toast.success(`${allInquiries.length} talep Excel dosyasına aktarıldı`);
    } catch (error) {
      console.error('Export error:', error);
      toast.dismiss();
      toast.error('Excel dosyası oluşturulurken hata oluştu');
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Bekliyor',
      contacted: 'İletişimde',
      completed: 'Tamamlandı',
      cancelled: 'İptal',
    };
    return labels[status] || status;
  };

  if (isLoading && inquiries.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Paket Talepleri
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Gelen paket taleplerini yönetin ({total} talep)
          </p>
        </div>
        <button
          onClick={handleExportToExcel}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <FaFileExcel className="w-4 h-4" />
          Excel&apos;e Aktar
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Ad, soyad, telefon veya e-posta ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="pending">Bekliyor</option>
          <option value="contacted">İletişimde</option>
          <option value="completed">Tamamlandı</option>
          <option value="cancelled">İptal</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İletişim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Paket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Talep bulunamadı
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry: PackageInquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      #{inquiry.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(inquiry.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {inquiry.name} {inquiry.surname}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          <FaPhone className="w-3 h-3" />
                          {inquiry.phone}
                        </a>
                        {inquiry.email && (
                          <a
                            href={`mailto:${inquiry.email}`}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <FaEnvelope className="w-3 h-3" />
                            {inquiry.email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {inquiry.package_name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatPrice(inquiry.package_price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusUpdate(inquiry.id, e.target.value)}
                        className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                      >
                        <option value="pending">Bekliyor</option>
                        <option value="contacted">İletişimde</option>
                        <option value="completed">Tamamlandı</option>
                        <option value="cancelled">İptal</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedInquiry(inquiry);
                            setShowModal(true);
                          }}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                          title="Detayları Görüntüle"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                          title="Sil"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Sayfa {page} / {totalPages} (Toplam {total} talep)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white"
            >
              Önceki
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white"
            >
              Sonraki
            </button>
          </div>
        </div>
      )}

      {/* Modal - Details */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Talep Detayları #{selectedInquiry.id}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Müşteri
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedInquiry.name} {selectedInquiry.surname}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Telefon
                    </label>
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {selectedInquiry.phone}
                    </a>
                  </div>
                  {selectedInquiry.email && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        E-posta
                      </label>
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {selectedInquiry.email}
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Paket
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedInquiry.package_name} - {formatPrice(selectedInquiry.package_price)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Özellikler
                  </label>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    {selectedInquiry.package_features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Durum
                  </label>
                  {getStatusBadge(selectedInquiry.status)}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Talep Tarihi
                  </label>
                  <p className="text-gray-700 dark:text-gray-300">
                    {formatDate(selectedInquiry.created_at)}
                  </p>
                </div>

                {selectedInquiry.ip_address && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      IP Adresi
                    </label>
                    <p className="text-gray-700 dark:text-gray-300">
                      {selectedInquiry.ip_address}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
