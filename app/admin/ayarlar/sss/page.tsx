'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  active: boolean;
  display_order: number;
}

export default function FaqPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Faq | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    active: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch('/api/settings/faq');
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error('SSS yüklenemedi:', error);
      toast.error('SSS yüklenemedi');
    } finally {
      setFetching(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      question: '',
      answer: '',
      category: '',
      active: true,
      display_order: faqs.length,
    });
    setShowModal(true);
  };

  const handleEdit = (item: Faq) => {
    setEditingItem(item);
    setFormData({
      question: item.question,
      answer: item.answer,
      category: item.category || '',
      active: item.active,
      display_order: item.display_order,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem
        ? { id: editingItem.id, ...formData, category: formData.category || null }
        : { ...formData, category: formData.category || null };

      const response = await fetch('/api/settings/faq', {
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
      fetchFaqs();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/settings/faq?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Silme başarısız');
        return;
      }

      toast.success(data.message);
      fetchFaqs();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Bir hata oluştu');
    }
  };

  const handleToggleActive = async (item: Faq) => {
    try {
      const response = await fetch('/api/settings/faq', {
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
        fetchFaqs();
      }
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Durum değiştirilemedi');
    }
  };

  const getCategories = () => {
    const categories = faqs
      .map(f => f.category)
      .filter((c): c is string => c !== null)
      .filter((c, i, arr) => arr.indexOf(c) === i);
    return categories;
  };

  if (fetching) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  const categories = getCategories();

  return (
    <div className="p-6">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sıkça Sorulan Sorular
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Anasayfada görünecek sıkça sorulan soruları yönetin
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Yeni Soru Ekle
          </button>
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {faqs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">Henüz soru eklenmemiş</p>
              <button
                onClick={handleAdd}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                İlk Soruyu Ekle
              </button>
            </div>
          ) : (
            faqs.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <button
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="flex-1 text-left"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0">
                          {expandedId === item.id ? '🔽' : '▶️'}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {item.category && (
                              <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                                {item.category}
                              </span>
                            )}
                            {!item.active && (
                              <span className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                                Pasif
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {item.question}
                          </h3>
                        </div>
                      </div>
                    </button>
                    <div className="flex gap-2 flex-shrink-0">
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

                  {/* Answer - Expanded */}
                  {expandedId === item.id && (
                    <div className="mt-4 pl-8 pr-4">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 my-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {editingItem ? 'Soru Düzenle' : 'Yeni Soru Ekle'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kategori (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    list="categories"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="Genel, Fiyatlandırma, vb."
                  />
                  <datalist id="categories">
                    {categories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>

                {/* Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Soru *
                  </label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    maxLength={500}
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">{formData.question.length}/500 karakter</p>
                </div>

                {/* Answer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cevap *
                  </label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    maxLength={5000}
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">{formData.answer.length}/5000 karakter</p>
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
