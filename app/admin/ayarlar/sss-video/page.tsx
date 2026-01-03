'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface SiteSettings {
  id: number;
  faq_video_url: string | null;
}

export default function FaqVideoSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings/site');
      if (response.ok) {
        const data = await response.json();
        setVideoUrl(data.faq_video_url || '');
      }
    } catch (error) {
      console.error('Ayarlar yüklenemedi:', error);
      toast.error('Ayarlar yüklenemedi');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/settings/site', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          faq_video_url: videoUrl || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = typeof data.error === 'string'
          ? data.error
          : data.message || 'Güncelleme başarısız';
        toast.error(errorMessage);
        console.error('Save error response:', data);
        return;
      }

      toast.success('Video URL başarıyla güncellendi');
      fetchSettings();
    } catch (error) {
      console.error('Update error:', error);
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
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            SSS Video Ayarları
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            SSS bölümünün üstünde görünecek video URL'sini ayarlayın
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Video URL (MP4)
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="https://example.com/video.mp4"
            />
            <p className="mt-1 text-xs text-gray-500">
              MP4 formatında video URL'si girin. Boş bırakırsanız video gösterilmez.
            </p>
          </div>

          {/* Preview */}
          {videoUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Önizleme
              </label>
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-full"
                  onError={() => toast.error('Video yüklenemedi. URL\'yi kontrol edin.')}
                >
                  Tarayıcınız video etiketini desteklemiyor.
                </video>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button
              type="button"
              onClick={() => setVideoUrl('')}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Temizle
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Bilgi
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Video URL'si MP4 formatında olmalıdır</li>
            <li>• Video, SSS bölümünün hemen üstünde gösterilir</li>
            <li>• Boş bırakırsanız video alanı gizlenir</li>
            <li>• Video otomatik olarak sessiz başlar ve döngü halinde oynar</li>
            <li>• Kullanıcılar kontrollerden sesi açabilir ve videoyu kontrol edebilir</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
