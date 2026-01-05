/**
 * PDF URL Utility
 *
 * Cloudinary PDF URL'lerini proxy URL'ine dönüştürür.
 * Tarayıcıda inline görüntüleme için Next.js API proxy'sini kullanır.
 *
 * @param cloudinaryUrl - Cloudinary'den gelen PDF URL'i
 * @returns Proxy URL (tarayıcıda inline görüntüleme için)
 */
export function getPdfViewUrl(cloudinaryUrl: string | null | undefined): string {
  // Boş URL için empty string döndür
  if (!cloudinaryUrl) return '';

  // Eğer zaten proxy URL ise, olduğu gibi döndür
  if (cloudinaryUrl.startsWith('/api/pdf')) {
    return cloudinaryUrl;
  }

  // Cloudinary URL'ini proxy'e yönlendir
  // URL encoding ile güvenli hale getir
  return `/api/pdf?url=${encodeURIComponent(cloudinaryUrl)}`;
}
