// Multer helper fonksiyonları - serverless uyumlu
export async function parseForm(req: any) {
  // Bu fonksiyon artık kullanılmıyor, FormData ile değiştirildi
  return {};
}

export async function processImages(files: any) {
  // Bu fonksiyon artık kullanılmıyor, Cloudinary ile değiştirildi
  return {};
}
