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
      // PDF'ler için orijinal dosya adını koru - download sırasında .pdf uzantısı olsun
      ...(isPdf && {
        use_filename: true,
        unique_filename: true,  // Cache sorunlarını önlemek için unique filename
        format: 'pdf',
        flags: 'attachment'  // PDF'lerin indirilebilir olması için
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
            resolve(result?.secure_url || '');
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
