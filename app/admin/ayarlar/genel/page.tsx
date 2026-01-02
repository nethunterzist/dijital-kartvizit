'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { uploadToCloudinary } from '@/app/lib/cloudinary';

interface SiteSettings {
  id?: number;
  site_name: string;
  site_logo: string | null;
  favicon: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  google_analytics: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
}

export default function GeneralSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'Dijital Kartvizit Merkezi',
    site_logo: null,
    favicon: null,
    meta_title: null,
    meta_description: null,
    meta_keywords: null,
    google_analytics: null,
    contact_email: null,
    contact_phone: null,
    contact_address: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings/site');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Ayarlar yüklenemedi:', error);
      toast.error('Ayarlar yüklenemedi');
    } finally {
      setFetching(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Dosya boyutu 5MB\'dan küçük olmalıdır');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Sadece resim dosyaları yüklenebilir');
      return;
    }

    setUploadingLogo(true);
    try {
      const url = await uploadToCloudinary(file, 'settings');
      setSettings({ ...settings, site_logo: url });
      toast.success('Logo yüklendi');
    } catch (error) {
      console.error('Logo upload error:', error);
      toast.error('Logo yüklenemedi');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 1MB for favicon)
    if (file.size > 1024 * 1024) {
      toast.error('Favicon boyutu 1MB\'dan küçük olmalıdır');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Sadece resim dosyaları yüklenebilir');
      return;
    }

    setUploadingFavicon(true);
    try {
      const url = await uploadToCloudinary(file, 'settings');
      setSettings({ ...settings, favicon: url });
      toast.success('Favicon yüklendi');
    } catch (error) {
      console.error('Favicon upload error:', error);
      toast.error('Favicon yüklenemedi');
    } finally {
      setUploadingFavicon(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch('/api/settings/site', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          toast.error(data.error || 'Kayıt başarısız');
        }
        return;
      }

      toast.success(data.message || 'Ayarlar kaydedildi');
      setSettings(data.data);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
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
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Genel Ayarlar
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Site genel bilgilerini ve görsellerini düzenleyin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Site Identity Section */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Site Kimliği
            </h3>

            <div className="space-y-4">
              {/* Site Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Site Adı *
                </label>
                <input
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Site Logosu
                </label>
                <div className="flex items-start gap-4">
                  {settings.site_logo && (
                    <div className="flex-shrink-0">
                      <img
                        src={settings.site_logo}
                        alt="Logo"
                        className="w-32 h-32 object-contain border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploadingLogo}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP (Max: 5MB)</p>
                    {uploadingLogo && <p className="mt-1 text-xs text-blue-600">Yükleniyor...</p>}
                  </div>
                </div>
              </div>

              {/* Favicon Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Favicon
                </label>
                <div className="flex items-start gap-4">
                  {settings.favicon && (
                    <div className="flex-shrink-0">
                      <img
                        src={settings.favicon}
                        alt="Favicon"
                        className="w-16 h-16 object-contain border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFaviconUpload}
                      disabled={uploadingFavicon}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="mt-1 text-xs text-gray-500">PNG, ICO (Max: 1MB, Önerilen: 32x32px)</p>
                    {uploadingFavicon && <p className="mt-1 text-xs text-blue-600">Yükleniyor...</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              SEO Ayarları
            </h3>

            <div className="space-y-4">
              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Başlık
                </label>
                <input
                  type="text"
                  value={settings.meta_title || ''}
                  onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  maxLength={200}
                />
                <p className="mt-1 text-xs text-gray-500">Arama motorlarında görünecek başlık (Max: 200 karakter)</p>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Açıklama
                </label>
                <textarea
                  value={settings.meta_description || ''}
                  onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  maxLength={500}
                />
                <p className="mt-1 text-xs text-gray-500">Arama motorlarında görünecek açıklama (Max: 500 karakter)</p>
              </div>

              {/* Meta Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Anahtar Kelimeler
                </label>
                <input
                  type="text"
                  value={settings.meta_keywords || ''}
                  onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="dijital kartvizit, qr kod, kartvizit"
                />
                <p className="mt-1 text-xs text-gray-500">Virgülle ayırarak yazın</p>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Google Analytics
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                value={settings.google_analytics || ''}
                onChange={(e) => setSettings({ ...settings, google_analytics: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="G-XXXXXXXXXX"
              />
              <p className="mt-1 text-xs text-gray-500">Google Analytics 4 ölçüm kimliği</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              İletişim Bilgileri
            </h3>

            <div className="space-y-4">
              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  İletişim E-posta
                </label>
                <input
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="info@example.com"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  İletişim Telefon
                </label>
                <input
                  type="tel"
                  value={settings.contact_phone || ''}
                  onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="+90 555 123 45 67"
                />
              </div>

              {/* Contact Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  İletişim Adresi
                </label>
                <textarea
                  value={settings.contact_address || ''}
                  onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Adres bilgisi"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || uploadingLogo || uploadingFavicon}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
