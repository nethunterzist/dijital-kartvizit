'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface IconItem {
  id: string;
  label: string;
  icon: string;
  type: 'social' | 'communication' | 'system' | 'other';
  color: string;
}

// İkon türleri ve varsayılan sıralama
const DEFAULT_ICON_ORDER: IconItem[] = [
  { id: 'qr', label: 'QR Kod', icon: 'fas fa-qrcode', type: 'system', color: '#FFD700' },
  { id: 'instagram', label: 'Instagram', icon: 'fab fa-instagram', type: 'social', color: '#E4405F' },
  { id: 'facebook', label: 'Facebook', icon: 'fab fa-facebook', type: 'social', color: '#1877F2' },
  { id: 'twitter', label: 'Twitter', icon: 'fab fa-twitter', type: 'social', color: '#1DA1F2' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'fab fa-linkedin', type: 'social', color: '#0A66C2' },
  { id: 'youtube', label: 'YouTube', icon: 'fab fa-youtube', type: 'social', color: '#FF0000' },
  { id: 'tiktok', label: 'TikTok', icon: 'fab fa-tiktok', type: 'social', color: '#000000' },
  { id: 'telefon', label: 'Telefon', icon: 'fas fa-phone', type: 'communication', color: '#4CAF50' },
  { id: 'eposta', label: 'E-posta', icon: 'fas fa-envelope', type: 'communication', color: '#FF5722' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'fab fa-whatsapp', type: 'communication', color: '#25D366' },
  { id: 'telegram', label: 'Telegram', icon: 'fab fa-telegram', type: 'communication', color: '#0088cc' },
  { id: 'website', label: 'Website', icon: 'fas fa-globe', type: 'communication', color: '#9C27B0' },
  { id: 'harita', label: 'Harita', icon: 'fas fa-map-marker-alt', type: 'communication', color: '#FF9800' },
  { id: 'katalog', label: 'Katalog', icon: 'fas fa-book', type: 'other', color: '#795548' },
  { id: 'banka', label: 'Banka Hesapları', icon: 'fas fa-university', type: 'system', color: '#FFD700' },
  { id: 'vergi', label: 'Vergi Bilgileri', icon: 'fas fa-file-invoice', type: 'system', color: '#2196F3' },
  { id: 'hakkimizda', label: 'Hakkımızda', icon: 'fas fa-info-circle', type: 'system', color: '#2196F3' }
];

export default function AyarlarPage() {
  const [iconOrder, setIconOrder] = useState<IconItem[]>(DEFAULT_ICON_ORDER);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sayfa yüklendiğinde mevcut sıralamayı al
  useEffect(() => {
    loadIconOrder();
  }, []);

  const loadIconOrder = async () => {
    try {
      const response = await fetch('/api/settings/icon-order');
      if (response.ok) {
        const data = await response.json();
        if (data.iconOrder && data.iconOrder.length > 0) {
          setIconOrder(data.iconOrder);
        }
      }
    } catch (err) {
      console.error('İkon sıralaması yüklenirken hata:', err);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(iconOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setIconOrder(items);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/settings/icon-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ iconOrder }),
      });

      if (!response.ok) {
        throw new Error('Ayarlar kaydedilirken hata oluştu');
      }

      setSuccess('İkon sıralaması başarıyla kaydedildi!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIconOrder(DEFAULT_ICON_ORDER);
    setSuccess(null);
    setError(null);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'social': return 'Sosyal Medya';
      case 'communication': return 'İletişim';
      case 'system': return 'Sistem';
      case 'other': return 'Diğer';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'social': return 'bg-pink-100 text-pink-800';
      case 'communication': return 'bg-blue-100 text-blue-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      case 'other': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
            className="flex items-center px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm"
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
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">İkon Sıralaması</h1>
                <p className="text-sm text-gray-600 mt-1">Kartvizitlerde görünecek ikonların sırasını belirleyin</p>
              </div>
              <Link 
                href="/admin" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Geri Dön
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Alerts */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-600 rounded-lg p-4">
                {success}
              </div>
            )}

            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-blue-900 mb-2">İkon Sıralaması Nasıl Çalışır?</h3>
                  <div className="text-blue-800 space-y-2">
                    <p>• <strong>Sabit Bölümler:</strong> Profil fotoğrafı, firma adı, yetkili adı, pozisyon ve "Rehbere Ekle" butonu her zaman en üstte kalır.</p>
                    <p>• <strong>Sıralanabilir İkonlar:</strong> Aşağıdaki listede ikonları sürükleyerek sıralayabilirsiniz.</p>
                    <p>• <strong>Otomatik Filtreleme:</strong> Firma eklerken sadece doldurulmuş alanlar görünür, boş alanlar atlanır.</p>
                    <p>• <strong>Firma Logosu:</strong> Her zaman en altta sabit kalır.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Drag & Drop List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">İkon Sıralaması</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Varsayılana Sıfırla
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Kaydet
                      </>
                    )}
                  </button>
                </div>
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="icons">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {iconOrder.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center p-4 bg-white border-2 rounded-lg transition-all ${
                                snapshot.isDragging
                                  ? 'border-blue-500 shadow-lg'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center flex-1">
                                <Bars3Icon className="w-5 h-5 text-gray-400 mr-4 cursor-grab" />
                                
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100">
                                    <i className={`${item.icon} text-lg`} style={{ color: item.color }}></i>
                                  </div>
                                  
                                  <div>
                                    <div className="font-medium text-gray-900">{item.label}</div>
                                    <div className="text-sm text-gray-500">ID: {item.id}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                                  {getTypeLabel(item.type)}
                                </span>
                                <div className="text-sm font-medium text-gray-500">
                                  #{index + 1}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            {/* Preview Section */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Önizleme</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="max-w-sm mx-auto">
                  {/* Sabit Bölüm */}
                  <div className="text-center mb-6 p-4 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-sm font-medium text-gray-600 mb-2">SABİT BÖLÜM</div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div>📷 Profil Fotoğrafı</div>
                      <div>🏢 Firma Adı</div>
                      <div>👤 Yetkili Adı</div>
                      <div>💼 Pozisyon</div>
                      <div>📱 Rehbere Ekle</div>
                    </div>
                  </div>

                  {/* İkonlar */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {iconOrder.map((item, index) => (
                      <div key={item.id} className="flex flex-col items-center p-2 bg-white rounded-lg border">
                        <i className={`${item.icon} text-lg mb-1`} style={{ color: item.color }}></i>
                        <div className="text-xs text-center text-gray-600 leading-tight">{item.label}</div>
                        <div className="text-xs text-gray-400">#{index + 1}</div>
                      </div>
                    ))}
                  </div>

                  {/* Firma Logosu */}
                  <div className="text-center p-4 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-sm font-medium text-gray-600 mb-2">SABİT BÖLÜM</div>
                    <div className="text-xs text-gray-500">🏢 Firma Logosu</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
