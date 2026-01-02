'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { uploadToCloudinary } from '@/app/lib/cloudinary';

interface SliderImage {
  id: number;
  image_url: string;
  alt_text: string | null;
  active: boolean;
  display_order: number;
}

export default function SliderPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<SliderImage | null>(null);

  const [formData, setFormData] = useState({
    image_url: '',
    alt_text: '',
    active: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchSliderImages();
  }, []);

  const fetchSliderImages = async () => {
    try {
      const response = await fetch('/api/settings/slider');
      if (response.ok) {
        const data = await response.json();
        setSliderImages(data);
      }
    } catch (error) {
      console.error('Slider resimleri yüklenemedi:', error);
      toast.error('Slider resimleri yüklenemedi');
    } finally {
      setFetching(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      image_url: '',
      alt_text: '',
      active: true,
      display_order: sliderImages.length,
    });
    setShowModal(true);
  };

  const handleEdit = (item: SliderImage) => {
    setEditingItem(item);
    setFormData({
      image_url: item.image_url,
      alt_text: item.alt_text || '',
      active: item.active,
      display_order: item.display_order,
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Dosya boyutu 5MB\'dan küçük olmalıdır');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Sadece resim dosyaları yüklenebilir');
      return;
    }

    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file, 'slider');
      setFormData({ ...formData, image_url: url });
      toast.success('Resim yüklendi');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Resim yüklenemedi');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image_url) {
      toast.error('Lütfen bir resim yükleyin');
      return;
    }

    setLoading(true);

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem
        ? { id: editingItem.id, ...formData, alt_text: formData.alt_text || null }
        : { ...formData, alt_text: formData.alt_text || null };

      const response = await fetch('/api/settings/slider', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'İşlem başarısız');
        return;
      }

      toast.success(data.message);
      setShowModal(false);
      fetchSliderImages();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu resmi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/settings/slider?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Silme başarısız');
        return;
      }

      toast.success(data.message);
      fetchSliderImages();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Bir hata oluştu');
    }
  };

  const handleToggleActive = async (item: SliderImage) => {
    try {
      const response = await fetch('/api/settings/slider', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item.id,
          active: !item.active,
        }),
      });

      if (response.ok) {
        fetchSliderImages();
      }
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Durum değiştirilemedi');
    }
  };

  if (fetching) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Anasayfa Slider
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Anasayfada telefon içinde kayan resimleri yönetin
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Yeni Resim Ekle
          </button>
        </div>

        {/* Slider Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sliderImages.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">Henüz resim eklenmemiş</p>
              <button
                onClick={handleAdd}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                İlk Resmi Ekle
              </button>
            </div>
          ) : (
            sliderImages.map((item) => (
              <div
                key={item.id}
                className="relative group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[9/16] relative">
                  <img
                    src={item.image_url}
                    alt={item.alt_text || 'Slider resmi'}
                    className="w-full h-full object-cover"
                  />
                  {!item.active && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="px-3 py-1 bg-gray-900 text-white text-sm rounded">
                        Pasif
                      </span>
                    </div>
                  )}
                </div>

                {/* Overlay Actions */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                        item.active
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-gray-500 hover:bg-gray-600 text-white'
                      }`}
                    >
                      {item.active ? 'Aktif' : 'Pasif'}
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>

                {/* Order Badge */}
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  #{item.display_order + 1}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-xl w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {editingItem ? 'Resim Düzenle' : 'Yeni Resim Ekle'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Slider Resmi *
                  </label>
                  {formData.image_url ? (
                    <div className="relative">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image_url: '' })}
                        className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                      >
                        Kaldır
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG, WebP (Max: 5MB)</p>
                      {uploadingImage && <p className="mt-1 text-xs text-blue-600">Yükleniyor...</p>}
                    </div>
                  )}
                </div>

                {/* Alt Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Alternatif Metin (SEO için)
                  </label>
                  <input
                    type="text"
                    value={formData.alt_text}
                    onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="Örn: Dijital kartvizit örnek ekran görüntüsü"
                    maxLength={200}
                  />
                  <p className="mt-1 text-xs text-gray-500">{formData.alt_text.length}/200 karakter</p>
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sıra
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <p className="mt-1 text-xs text-gray-500">Küçük sayı önce gösterilir</p>
                </div>

                {/* Active Toggle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="active" className="text-sm text-gray-700 dark:text-gray-300">
                    Aktif (Anasayfada göster)
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={loading || uploadingImage || !formData.image_url}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
