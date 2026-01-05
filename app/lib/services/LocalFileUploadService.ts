import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { logger } from '@/app/lib/logger';
import { fileUploadSchema, pdfUploadSchema } from '@/app/lib/validations';
import { uploadToCloudinary } from '@/app/lib/cloudinary';

export interface LocalFileUploadResult {
  success: boolean;
  urls?: {
    profilePhotoUrl: string | null;
    logoUrl: string | null;
    catalogUrl: string | null;
  };
  error?: string;
}

export interface SingleLocalFileUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class LocalFileUploadService {
  private static uploadDir = join(process.cwd(), 'public', 'uploads');
  
  /**
   * Uploads klasörlerini oluşturur
   */
  private static async ensureUploadDirs() {
    const dirs = [
      join(this.uploadDir, 'profil_fotograflari'),
      join(this.uploadDir, 'firma_logolari'),
      join(this.uploadDir, 'firma_kataloglari')
    ];

    for (const dir of dirs) {
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
        logger.info('Upload directory created', { path: dir });
      }
    }
  }

  /**
   * Benzersiz dosya adı oluşturur
   */
  private static generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop();
    const nameWithoutExt = originalName.replace(`.${extension}`, '').replace(/[^a-zA-Z0-9]/g, '_');
    
    return `${nameWithoutExt}_${timestamp}_${random}.${extension}`;
  }

  /**
   * Tüm dosyaları paralel olarak yükler
   */
  async processUploads(formData: FormData): Promise<LocalFileUploadResult> {
    try {
      const startTime = performance.now();
      
      // Upload dizinlerini oluştur
      await LocalFileUploadService.ensureUploadDirs();
      
      // FormData'dan dosyaları al
      const profilePhoto = formData.get('profilePhoto') as File;
      const logoFile = formData.get('logoFile') as File;
      const catalogFile = formData.get('katalog') as File;

      // Paralel yükleme
      const uploadPromises = [
        LocalFileUploadService.uploadProfilePhoto(profilePhoto),
        LocalFileUploadService.uploadLogo(logoFile),
        LocalFileUploadService.uploadCatalog(catalogFile)
      ];

      const results = await Promise.allSettled(uploadPromises);
      const [profileResult, logoResult, catalogResult] = results;

      // Hataları kontrol et
      const failures = results
        .map((result, index) => ({ result, index }))
        .filter(({ result }) => result.status === 'rejected')
        .map(({ result, index }) => {
          const fileTypes = ['profil fotoğrafı', 'logo', 'katalog'];
          const error = (result as PromiseRejectedResult).reason;
          const errorMessage = error instanceof Error ? error.message : String(error);
          return `${fileTypes[index]}: ${errorMessage}`;
        });

      if (failures.length > 0) {
        logger.error('Dosya yükleme hataları', {
          failures,
          failureCount: failures.length,
          totalFiles: results.length
        });
        return {
          success: false,
          error: `Dosya yükleme hatası: ${failures.join(', ')}`
        };
      }

      const duration = performance.now() - startTime;

      // URL'leri oluştur
      const urls = {
        profilePhotoUrl: profileResult.status === 'fulfilled' ? profileResult.value : null,
        logoUrl: logoResult.status === 'fulfilled' ? logoResult.value : null,
        catalogUrl: catalogResult.status === 'fulfilled' ? catalogResult.value : null
      };

      logger.info('Local dosya yükleme tamamlandı', {
        duration: `${duration.toFixed(2)}ms`,
        profilePhoto: !!urls.profilePhotoUrl,
        logo: !!urls.logoUrl,
        catalog: !!urls.catalogUrl,
        uploadCount: Object.values(urls).filter(Boolean).length
      });

      return {
        success: true,
        urls
      };
    } catch (error) {
      logger.error('Local dosya yükleme servisi hatası:', {
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      });
      
      return {
        success: false,
        error: 'Dosya yükleme servisi hatası'
      };
    }
  }

  /**
   * Profil fotoğrafı yükler
   */
  private static async uploadProfilePhoto(file: File): Promise<string | null> {
    // Profil fotoğrafı optional - boş dosya için null döndür
    if (!file || file.size === 0) {
      logger.debug('Profil fotoğrafı bulunamadı veya boş');
      return null;
    }

    try {
      const result = await this.validateAndUploadFile(
        file,
        'profil_fotograflari',
        false
      );

      logger.info('Profil fotoğrafı başarıyla yüklendi', {
        originalName: file.name,
        size: file.size,
        url: result
      });

      return result;
    } catch (error) {
      logger.error('Profil fotoğrafı yükleme hatası', {
        fileName: file.name,
        fileSize: file.size,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      });
      throw new Error(`Profil fotoğrafı yükleme hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
  }

  /**
   * Logo dosyası yükler
   */
  private static async uploadLogo(file: File): Promise<string | null> {
    // Logo optional - boş dosya için null döndür
    if (!file || file.size === 0) {
      logger.debug('Logo dosyası bulunamadı veya boş');
      return null;
    }

    try {
      const result = await this.validateAndUploadFile(
        file,
        'firma_logolari',
        false
      );

      logger.info('Logo başarıyla yüklendi', {
        originalName: file.name,
        size: file.size,
        url: result
      });

      return result;
    } catch (error) {
      logger.error('Logo yükleme hatası', {
        fileName: file.name,
        fileSize: file.size,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      });
      throw new Error(`Logo yükleme hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
  }

  /**
   * Katalog PDF'i yükler
   */
  private static async uploadCatalog(file: File): Promise<string | null> {
    if (!file || file.size === 0) {
      const errorMessage = 'Katalog dosyası boş veya bulunamadı';
      logger.error('Katalog yükleme hatası', {
        error: errorMessage,
        hasFile: !!file,
        fileSize: file?.size || 0
      });
      throw new Error(errorMessage);
    }

    try {
      const result = await this.validateAndUploadFile(
        file,
        'firma_kataloglari',
        true
      );

      logger.info('Katalog başarıyla yüklendi', {
        originalName: file.name,
        size: file.size,
        url: result
      });

      return result;
    } catch (error) {
      logger.error('Katalog yükleme hatası', {
        fileName: file.name,
        fileSize: file.size,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      });
      throw new Error(`Katalog yükleme hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
  }

  /**
   * Dosya validasyonu yapıp production'da Cloudinary'ye, development'ta local'e yükler
   */
  private static async validateAndUploadFile(
    file: File,
    folder: string,
    isPdf = false
  ): Promise<string> {
    try {
      // Validasyon
      const schema = isPdf ? pdfUploadSchema : fileUploadSchema;
      const validation = schema.safeParse({
        size: file.size,
        type: file.type
      });

      if (!validation.success) {
        const errorMessages = validation.error.errors.map(e => e.message).join(', ');
        throw new Error(`Dosya validasyon hatası: ${errorMessages}`);
      }

      // Production'da Cloudinary, development'ta local storage kullan
      if (process.env.NODE_ENV === 'production' && process.env.CLOUDINARY_CLOUD_NAME) {
        // Production: Cloudinary'ye yükle
        try {
          const cloudinaryUrl = await uploadToCloudinary(file, folder);

          logger.info('Dosya Cloudinary\'ye başarıyla yüklendi', {
            originalName: file.name,
            cloudinaryUrl,
            fileSize: file.size,
            folder
          });

          return cloudinaryUrl;
        } catch (cloudinaryError) {
          logger.error('Cloudinary upload failed', {
            error: cloudinaryError instanceof Error ? cloudinaryError.message : 'Bilinmeyen hata',
            fileName: file.name,
            folder
          });
          throw new Error(`Cloudinary yükleme hatası: ${cloudinaryError instanceof Error ? cloudinaryError.message : 'Bilinmeyen hata'}`);
        }
      } else {
        // Development: Local storage'a yükle
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Benzersiz dosya adı oluştur
        const uniqueFileName = this.generateUniqueFileName(file.name);

        // Dosya yolunu oluştur
        const filePath = join(this.uploadDir, folder, uniqueFileName);

        // Dosyayı kaydet
        await writeFile(filePath, buffer);

        // Public URL'i döndür
        const publicUrl = `/uploads/${folder}/${uniqueFileName}`;

        logger.info('Dosya local storage\'a başarıyla kaydedildi', {
          originalName: file.name,
          uniqueFileName,
          filePath,
          publicUrl,
          fileSize: buffer.length
        });

        return publicUrl;
      }
    } catch (error) {
      logger.error('Dosya yükleme/validasyon hatası:', {
        error: error instanceof Error ? error.message : 'Bilinmeyen hata',
        fileName: file.name,
        fileSize: file.size,
        folder,
        isPdf
      });
      throw error;
    }
  }

  /**
   * Tek dosya yükleme (utility method)
   */
  static async uploadSingleFile(
    file: File, 
    folder: string, 
    isPdf = false
  ): Promise<SingleLocalFileUploadResult> {
    try {
      await this.ensureUploadDirs();
      const url = await this.validateAndUploadFile(file, folder, isPdf);
      return {
        success: true,
        url
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }
}