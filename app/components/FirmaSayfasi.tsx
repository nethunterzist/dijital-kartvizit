import React, { useEffect } from 'react';
import { logger } from '@/app/lib/logger';

// Firma tipi tanımı
interface Firma {
  id: number;
  firma_adi: string;
  slug: string;
  [key: string]: any; // Diğer alanlar için genel tip
}

export default function FirmaSayfasi({ firma }: { firma: Firma }) {
  
  useEffect(() => {
    // Sayfa yüklendiğinde görüntülenme sayısını artır
    const incrementViewCount = async () => {
      try {
        await fetch(`/api/firmalar/${firma.id}`, {
          method: 'GET',
          headers: {
            'X-Increment-View': 'true'
          }
        });
        logger.info('Görüntülenme sayısı artırıldı', { firmaId: firma.id, firmaAdi: firma.firma_adi });
      } catch (error) {
        logger.error('Görüntülenme sayısı artırılırken hata', { error, firmaId: firma.id, firmaAdi: firma.firma_adi });
      }
    };
    
    incrementViewCount();
  }, [firma.id]);
} 