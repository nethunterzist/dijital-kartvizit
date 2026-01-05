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

    logger.info('Starting Cloudinary upload', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      bufferSize: buffer.length,
      folder
    });

    // PDF dosyaları için özel ayarlar
    const isPdf = file.type === 'application/pdf';
    const uploadOptions: any = {
      folder: folder,
      resource_type: isPdf ? 'raw' : 'auto',
      type: 'upload',  // Public upload - PDF'ler herkese açık olmalı
      access_mode: 'public',  // Explicitly set public access for all files
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

    logger.debug('Cloudinary upload options', {
      isPdf,
      resourceType: uploadOptions.resource_type,
      uploadType: uploadOptions.type,
      folder: uploadOptions.folder
    });

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            logger.error('Cloudinary upload_stream error', {
              error,
              fileName: file.name,
              fileSize: file.size,
              folder,
              isPdf
            });
            reject(error);
          } else {
            // Tüm dosyalar için secure_url kullan
            logger.info('Cloudinary upload successful', {
              fileName: file.name,
              isPdf,
              secureUrl: result?.secure_url,
              publicId: result?.public_id,
              bytes: result?.bytes,
              format: result?.format
            });
            resolve(result?.secure_url || '');
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    logger.error('Cloudinary upload error', {
      error,
      fileName: file.name,
      fileSize: file.size,
      folder,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });
    throw new Error('File upload failed');
  }
}

export default cloudinary;
