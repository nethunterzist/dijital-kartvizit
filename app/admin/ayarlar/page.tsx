'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/app/lib/icons';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { logger } from '@/app/lib/logger';

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
      logger.error('İkon sıralaması yüklenirken hata', { error: err });
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <main className="p-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl mb-6">
          <div className="px-6 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">İkon Sıralaması</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Kartvizitlerde görünecek ikonların sırasını belirleyin</p>
            </div>
          </div>
        </div>

          <div className="max-w-4xl mx-auto">
            {/* Alerts */}
            {error && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg p-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 rounded-lg p-4">
                {success}
              </div>
            )}


            {/* Drag & Drop List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">İkon Sıralaması</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
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
                              className={`flex items-center p-4 bg-white dark:bg-gray-800 border-2 rounded-lg transition-all ${
                                snapshot.isDragging
                                  ? 'border-blue-500 shadow-lg'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                              }`}
                            >
                              <div className="flex items-center flex-1">
                                <Icon name="menu" className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-4 cursor-grab" />
                                
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700">
                                    <i className={`${item.icon} text-lg`} style={{ color: item.color }}></i>
                                  </div>
                                  
                                  <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">ID: {item.id}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                                  {getTypeLabel(item.type)}
                                </span>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
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
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Önizleme</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="max-w-sm mx-auto">
                  {/* Sabit Bölüm */}
                  <div className="text-center mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">SABİT BÖLÜM</div>
                    <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
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
                      <div key={item.id} className="flex flex-col items-center p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                        <i className={`${item.icon} text-lg mb-1`} style={{ color: item.color }}></i>
                        <div className="text-xs text-center text-gray-600 dark:text-gray-400 leading-tight">{item.label}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">#{index + 1}</div>
                      </div>
                    ))}
                  </div>

                  {/* Firma Logosu */}
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">SABİT BÖLÜM</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">🏢 Firma Logosu</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}
