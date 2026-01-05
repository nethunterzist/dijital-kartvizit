import { v2 as cloudinary } from 'cloudinary';
import { logger } from './logger';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: File, folder: string = 'uploads'): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // PDF dosyaları için özel ayarlar
    const isPdf = file.type === 'application/pdf';
    const uploadOptions: any = {
      folder: folder,
      resource_type: isPdf ? 'raw' : 'auto',
      type: isPdf ? 'authenticated' : 'upload',  // PDF'ler için authenticated kullan
      // PDF'ler için orijinal dosya adını koru
      ...(isPdf && {
        use_filename: true,
        unique_filename: true,  // Cache sorunlarını önlemek için unique filename
        format: 'pdf'
      })
    };

    // PDF'ler için q_auto kullanma (Cloudinary hatası önleme)
    if (!isPdf) {
      uploadOptions.quality = 'auto';
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            // PDF için signed URL oluştur
            if (isPdf && result?.public_id) {
              const signedUrl = cloudinary.url(result.public_id, {
                resource_type: 'raw',
                type: 'authenticated',
                sign_url: true,
                secure: true
              });
              resolve(signedUrl);
            } else {
              resolve(result?.secure_url || '');
            }
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    logger.error('Cloudinary upload error', { error, fileName: file.name, fileSize: file.size, folder });
    throw new Error('File upload failed');
  }
}

export default cloudinary;
