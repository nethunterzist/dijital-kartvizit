import { logger } from './logger';

// HTML generator fonksiyonu - serverless uyumlu
export async function generateHtmlForFirma(firma: any): Promise<void> {
  // Bu fonksiyon artık sadece log amaçlı kullanılıyor
  // Gerçek HTML oluşturma işlemi template sisteminde yapılıyor
  logger.info('HTML generation requested for firma', { firmaSlug: firma.slug, firmaId: firma.id });
  
  // Serverless ortamda dosya yazma işlemi yapılmıyor
  // Template'ler runtime'da oluşturuluyor
  return Promise.resolve();
}
