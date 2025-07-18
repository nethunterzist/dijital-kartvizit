// HTML generator fonksiyonu - serverless uyumlu
export async function generateHtmlForFirma(firma: any): Promise<void> {
  // Bu fonksiyon artık sadece log amaçlı kullanılıyor
  // Gerçek HTML oluşturma işlemi template sisteminde yapılıyor
  console.log(`HTML generation requested for firma: ${firma.slug}`);
  
  // Serverless ortamda dosya yazma işlemi yapılmıyor
  // Template'ler runtime'da oluşturuluyor
  return Promise.resolve();
}
