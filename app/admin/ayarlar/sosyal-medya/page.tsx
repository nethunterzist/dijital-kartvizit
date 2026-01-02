'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface SocialMedia {
  id: number;
  platform: string;
  url: string;
  active: boolean;
  display_order: number;
}

const PLATFORMS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'X (Twitter)' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'tiktok', label: 'TikTok' },
];

export default function SocialMediaSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [socialMediaList, setSocialMediaList] = useState<SocialMedia[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialMedia | null>(null);

  const [formData, setFormData] = useState({
    platform: 'facebook',
    url: '',
    active: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchSocialMedia();
  }, []);

  const fetchSocialMedia = async () => {
    try {
      const response = await fetch('/api/settings/social');
      if (response.ok) {
        const data = await response.json();
        setSocialMediaList(data);
      }
    } catch (error) {
      console.error('Sosyal medya yüklenemedi:', error);
      toast.error('Sosyal medya yüklenemedi');
    } finally {
      setFetching(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      platform: 'facebook',
      url: '',
      active: true,
      display_order: socialMediaList.length,
    });
    setShowModal(true);
  };

  const handleEdit = (item: SocialMedia) => {
    setEditingItem(item);
    setFormData({
      platform: item.platform,
      url: item.url,
      active: item.active,
      display_order: item.display_order,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingItem
        ? '/api/settings/social'
        : '/api/settings/social';

      const method = editingItem ? 'PUT' : 'POST';

      const body = editingItem
        ? { id: editingItem.id, ...formData }
        : formData;

      const response = await fetch(url, {
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
      fetchSocialMedia();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu sosyal medya bağlantısını silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/settings/social?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Silme başarısız');
        return;
      }

      toast.success(data.message);
      fetchSocialMedia();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Bir hata oluştu');
    }
  };

  const handleToggleActive = async (item: SocialMedia) => {
    try {
      const response = await fetch('/api/settings/social', {
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
        fetchSocialMedia();
      }
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Durum değiştirilemedi');
    }
  };

  const getPlatformInfo = (platform: string) => {
    return PLATFORMS.find(p => p.value === platform) || { label: platform };
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
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sosyal Medya Ayarları
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Anasayfada görünecek sosyal medya hesaplarını yönetin
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Yeni Ekle
          </button>
        </div>

        {/* Social Media List */}
        <div className="space-y-3">
          {socialMediaList.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">Henüz sosyal medya hesabı eklenmemiş</p>
              <button
                onClick={handleAdd}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                İlk Hesabı Ekle
              </button>
            </div>
          ) : (
            socialMediaList.map((item) => {
              const platformInfo = getPlatformInfo(item.platform);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {platformInfo.label}
                        </h3>
                        {!item.active && (
                          <span className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            Pasif
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-md">
                        {item.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        item.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {item.active ? 'Aktif' : 'Pasif'}
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {editingItem ? 'Sosyal Medya Düzenle' : 'Yeni Sosyal Medya Ekle'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Platform Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Platform *
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                  >
                    {PLATFORMS.map((platform) => (
                      <option key={platform.value} value={platform.value}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* URL Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL *
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="https://..."
                    required
                  />
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
                    Aktif
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
                    disabled={loading}
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
