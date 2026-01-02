'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Package {
  id: number;
  package_key: string;
  name: string;
  description: string;
  price: number;
  card_count: number;
  color: string;
  popular: boolean;
  display_order: number;
  features: string[];
  active: boolean;
}

const colorOptions = [
  { value: 'blue', label: 'Mavi', class: 'bg-blue-600' },
  { value: 'purple', label: 'Mor', class: 'bg-purple-600' },
  { value: 'green', label: 'Yeşil', class: 'bg-green-600' },
  { value: 'gold', label: 'Altın', class: 'bg-yellow-600' },
  { value: 'red', label: 'Kırmızı', class: 'bg-red-600' },
];

export default function PackagesManagement() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState<Partial<Package>>({});
  const [newFeature, setNewFeature] = useState('');

  // Paketleri yükle
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      if (!res.ok) throw new Error('Paketler yüklenemedi');
      const data = await res.json();
      setPackages(data.sort((a: Package, b: Package) => a.display_order - b.display_order));
    } catch (error) {
      toast.error('Paketler yüklenirken hata oluştu');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({ ...pkg });
  };

  const handleCancel = () => {
    setEditingPackage(null);
    setFormData({});
    setNewFeature('');
  };

  const handleSave = async () => {
    if (!editingPackage) return;

    try {
      const res = await fetch(`/api/packages/${editingPackage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Güncelleme başarısız');
      }

      toast.success('Paket başarıyla güncellendi');
      setEditingPackage(null);
      setFormData({});
      fetchPackages();
    } catch (error: any) {
      toast.error(error.message || 'Güncelleme sırasında hata oluştu');
      console.error(error);
    }
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) {
      toast.error('Özellik boş olamaz');
      return;
    }

    setFormData({
      ...formData,
      features: [...(formData.features || []), newFeature.trim()],
    });
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleMoveFeature = (index: number, direction: 'up' | 'down') => {
    const newFeatures = [...(formData.features || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= newFeatures.length) return;

    [newFeatures[index], newFeatures[newIndex]] = [newFeatures[newIndex], newFeatures[index]];
    setFormData({ ...formData, features: newFeatures });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Paket Yönetimi</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Ana sayfada görünen fiyatlandırma paketlerini buradan yönetebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all"
          >
            {/* Package Header */}
            <div className={`p-6 ${
              pkg.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20' :
              pkg.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20' :
              pkg.color === 'green' ? 'bg-green-50 dark:bg-green-900/20' :
              pkg.color === 'gold' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
              'bg-red-50 dark:bg-red-900/20'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pkg.name}
                </h3>
                {pkg.popular && (
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                    En Popüler
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {pkg.price}₺
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  / {pkg.card_count} kart
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Sıralama: {pkg.display_order}
              </div>
            </div>

            {/* Package Features */}
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Özellikler ({pkg.features.length})
              </h4>
              <ul className="space-y-2 mb-4">
                {pkg.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              {pkg.features.length > 3 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  +{pkg.features.length - 3} özellik daha
                </p>
              )}

              <button
                onClick={() => handleEdit(pkg)}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Düzenle
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Paket Düzenle: {editingPackage.name}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Package Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Paket Adı
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Price & Card Count */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fiyat (₺)
                    </label>
                    <input
                      type="number"
                      value={formData.price || 0}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kart Sayısı
                    </label>
                    <input
                      type="number"
                      value={formData.card_count || 0}
                      onChange={(e) => setFormData({ ...formData, card_count: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Color & Display Order */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Renk Teması
                    </label>
                    <select
                      value={formData.color || 'blue'}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {colorOptions.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sıralama (1-3)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="3"
                      value={formData.display_order || 1}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Popular Badge */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={formData.popular || false}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="popular" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    "En Popüler" badge göster
                  </label>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Özellikler
                  </label>
                  <div className="space-y-2 mb-3">
                    {(formData.features || []).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...(formData.features || [])];
                            newFeatures[index] = e.target.value;
                            setFormData({ ...formData, features: newFeatures });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        />
                        <button
                          onClick={() => handleMoveFeature(index, 'up')}
                          disabled={index === 0}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-30"
                          title="Yukarı taşı"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleMoveFeature(index, 'down')}
                          disabled={index === (formData.features?.length || 0) - 1}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-30"
                          title="Aşağı taşı"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleRemoveFeature(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                          title="Sil"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Feature */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                      placeholder="Yeni özellik ekle..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      Ekle
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Kaydet
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
