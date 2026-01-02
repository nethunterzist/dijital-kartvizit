import cloudinary from '@/app/lib/cloudinary';
import { logger } from '@/app/lib/logger';
import { fileUploadSchema, pdfUploadSchema } from '@/app/lib/validations';
import { ImageOptimizationService } from './ImageOptimizationService';

export interface FileUploadResult {
  success: boolean;
  urls?: {
    profilePhotoUrl: string | null;
    logoUrl: string | null;
    catalogUrl: string | null;
  };
  optimizationMetadata?: {
    profilePhoto?: {
      originalSize: number;
      optimizedSize: number;
      compressionRatio: number;
      variants?: Record<string, string>;
    };
    logo?: {
      originalSize: number;
      optimizedSize: number;
      compressionRatio: number;
      variants?: Record<string, string>;
    };
  };
  error?: string;
}

export interface SingleFileUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class FileUploadService {
  /**
   * Processes all file uploads from FormData in parallel with image optimization
   * @param formData FormData object containing files
   * @returns FileUploadResult with URLs and optimization metadata
   */
  async processUploads(formData: FormData): Promise<FileUploadResult> {
    try {
      const startTime = performance.now();
      
      // Extract files from FormData
      const profilePhoto = formData.get('profilePhoto') as File;
      const logoFile = formData.get('logoFile') as File;
      const catalogFile = formData.get('katalog') as File;

      // Process uploads in parallel for better performance
      const uploadPromises = [
        FileUploadService.uploadOptimizedProfilePhoto(profilePhoto),
        FileUploadService.uploadOptimizedLogo(logoFile),
        FileUploadService.uploadCatalog(catalogFile)
      ];

      const results = await Promise.allSettled(uploadPromises);
      const [profileResult, logoResult, catalogResult] = results;

      // Check for any failures
      const failures = results
        .map((result, index) => ({ result, index }))
        .filter(({ result }) => result.status === 'rejected')
        .map(({ result, index }) => {
          const fileTypes = ['profile photo', 'logo', 'catalog'];
          return `${fileTypes[index]}: ${(result as PromiseRejectedResult).reason}`;
        });

      if (failures.length > 0) {
        logger.error('File upload failures detected', {
          failures,
          totalFiles: uploadPromises.length,
          failureCount: failures.length
        });
        
        return {
          success: false,
          error: `Dosya yükleme hatası: ${failures.join(', ')}`
        };
      }

      const duration = performance.now() - startTime;
      
      // Extract URLs and metadata from results
      const profileData = profileResult.status === 'fulfilled' ? profileResult.value : null;
      const logoData = logoResult.status === 'fulfilled' ? logoResult.value : null;
      const catalogData = catalogResult.status === 'fulfilled' ? catalogResult.value : null;

      const urls = {
        profilePhotoUrl: profileData && typeof profileData === 'object' ? profileData.url : null,
        logoUrl: logoData && typeof logoData === 'object' ? logoData.url : null,
        catalogUrl: typeof catalogData === 'string' ? catalogData : null
      };

      const optimizationMetadata: any = {};
      if (profileData && typeof profileData === 'object' && profileData.metadata) {
        optimizationMetadata.profilePhoto = profileData.metadata;
      }
      if (logoData && typeof logoData === 'object' && logoData.metadata) {
        optimizationMetadata.logo = logoData.metadata;
      }

      logger.info('File uploads completed successfully with optimization', {
        duration: `${duration.toFixed(2)}ms`,
        profilePhoto: !!urls.profilePhotoUrl,
        logo: !!urls.logoUrl,
        catalog: !!urls.catalogUrl,
        uploadCount: Object.values(urls).filter(Boolean).length,
        optimizationApplied: Object.keys(optimizationMetadata).length > 0
      });

      return {
        success: true,
        urls,
        optimizationMetadata: Object.keys(optimizationMetadata).length > 0 ? optimizationMetadata : undefined
      };
    } catch (error) {
      logger.error('File upload service error:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      return {
        success: false,
        error: 'Dosya yükleme servisi hatası'
      };
    }
  }

  /**
   * Uploads optimized profile photo with next-generation optimization
   * @param file Profile photo file
   * @returns Object with URL and optimization metadata or null if no file
   */
  private static async uploadOptimizedProfilePhoto(file: File): Promise<{ url: string; metadata: any } | null> {
    if (!file || file.size === 0) {
      logger.debug('No profile photo provided');
      return null;
    }
    
    try {
      // Use optimizeProfilePhoto for profile photos
      const optimizationResult = await ImageOptimizationService.optimizeProfilePhoto(file);
      if (!optimizationResult.success) {
        throw new Error(optimizationResult.error || 'Profile photo optimization failed');
      }

      logger.info('Optimized profile photo uploaded successfully', {
        originalName: file.name,
        originalSize: optimizationResult.metadata?.originalSize,
        optimizedSize: optimizationResult.metadata?.optimizedSize,
        compressionRatio: optimizationResult.metadata?.compressionRatio,
        url: optimizationResult.urls?.optimized
      });

      return {
        url: optimizationResult.urls!.optimized,
        metadata: {
          originalSize: optimizationResult.metadata!.originalSize,
          optimizedSize: optimizationResult.metadata!.optimizedSize,
          compressionRatio: optimizationResult.metadata!.compressionRatio,
          variants: optimizationResult.urls!.variants,
          optimizationType: 'standard'
        }
      };
    } catch (error) {
      logger.error('Next-gen profile photo upload failed', {
        fileName: file.name,
        fileSize: file.size,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new Error(`Profil fotoğrafı yükleme hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
  }

  /**
   * Uploads optimized logo file if provided
   * @param file Logo file
   * @returns Object with URL and optimization metadata or null if no file
   */
  private static async uploadOptimizedLogo(file: File): Promise<{ url: string; metadata: any } | null> {
    if (!file || file.size === 0) {
      logger.debug('No logo file provided');
      return null;
    }
    
    try {
      const optimizationResult = await ImageOptimizationService.optimizeLogo(file);
      
      if (!optimizationResult.success) {
        throw new Error(optimizationResult.error || 'Logo optimization failed');
      }

      logger.info('Optimized logo uploaded successfully', {
        originalName: file.name,
        originalSize: optimizationResult.metadata?.originalSize,
        optimizedSize: optimizationResult.metadata?.optimizedSize,
        compressionRatio: optimizationResult.metadata?.compressionRatio,
        url: optimizationResult.urls?.optimized
      });

      return {
        url: optimizationResult.urls!.optimized,
        metadata: {
          originalSize: optimizationResult.metadata!.originalSize,
          optimizedSize: optimizationResult.metadata!.optimizedSize,
          compressionRatio: optimizationResult.metadata!.compressionRatio,
          variants: optimizationResult.urls!.variants
        }
      };
    } catch (error) {
      logger.error('Optimized logo upload failed', {
        fileName: file.name,
        fileSize: file.size,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new Error(`Logo yükleme hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
  }

  /**
   * Uploads profile photo if provided (legacy method)
   * @param file Profile photo file
   * @returns URL string or null if no file
   */
  private static async uploadProfilePhoto(file: File): Promise<string | null> {
    if (!file || file.size === 0) {
      logger.debug('No profile photo provided');
      return null;
    }
    
    try {
      const result = await this.validateAndUploadFile(file, 'profil_fotograflari', false);
      logger.info('Profile photo uploaded successfully', {
        originalName: file.name,
        size: file.size,
        url: result
      });
      return result;
    } catch (error) {
      logger.error('Profile photo upload failed', {
        fileName: file.name,
        fileSize: file.size,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new Error(`Profil fotoğrafı yükleme hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
  }

  /**
   * Uploads logo file if provided (legacy method)
   * @param file Logo file
   * @returns URL string or null if no file
   */
  private static async uploadLogo(file: File): Promise<string | null> {
    if (!file || file.size === 0) {
      logger.debug('No logo file provided');
      return null;
    }
    
    try {
      const result = await this.validateAndUploadFile(file, 'firma_logolari', false);
      logger.info('Logo uploaded successfully', {
        originalName: file.name,
        size: file.size,
        url: result
      });
      return result;
    } catch (error) {
      logger.error('Logo upload failed', {
        fileName: file.name,
        fileSize: file.size,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new Error(`Logo yükleme hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
  }

  /**
   * Uploads catalog file if provided
   * @param file Catalog file (PDF)
   * @returns URL string or null if no file
   */
  private static async uploadCatalog(file: File): Promise<string | null> {
    if (!file || file.size === 0) {
      logger.debug('No catalog file provided');
      return null;
    }
    
    try {
      const result = await this.validateAndUploadFile(file, 'firma_kataloglari', true);
      logger.info('Catalog uploaded successfully', {
        originalName: file.name,
        size: file.size,
        url: result
      });
      return result;
    } catch (error) {
      logger.error('Catalog upload failed', {
        fileName: file.name,
        fileSize: file.size,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new Error(`Katalog yükleme hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
  }

  /**
   * Validates and uploads a single file to Cloudinary
   * @param file File to upload
   * @param folder Cloudinary folder
   * @param isPdf Whether the file is a PDF
   * @returns Secure URL of uploaded file
   */
  private static async validateAndUploadFile(file: File, folder: string, isPdf = false): Promise<string> {
    try {
      // File validation
      const schema = isPdf ? pdfUploadSchema : fileUploadSchema;
      const validation = schema.safeParse({
        size: file.size,
        type: file.type
      });

      if (!validation.success) {
        const errorMessages = validation.error.errors.map(e => e.message).join(', ');
        throw new Error(`Dosya validasyon hatası: ${errorMessages}`);
      }

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Upload to Cloudinary
      const uploadResult = await new Promise<any>((resolve, reject) => {
        const uploadOptions = {
          folder,
          resource_type: isPdf ? 'raw' as const : 'image' as const,
          allowed_formats: isPdf ? ['pdf'] : ['jpg', 'jpeg', 'png', 'webp'],
          max_bytes: isPdf ? 10 * 1024 * 1024 : 5 * 1024 * 1024, // 10MB PDF, 5MB image
          // Additional security options
          use_filename: true,
          unique_filename: true,
          overwrite: false
        };

        const stream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error: any, result: any) => {
            if (error) {
              logger.error('Cloudinary upload error:', {
                error: error.message,
                folder,
                fileName: file.name,
                fileSize: file.size,
                isPdf
              });
              return reject(error);
            }
            resolve(result);
          }
        );
        
        stream.end(buffer);
      });

      logger.info('File uploaded to Cloudinary successfully', {
        publicId: uploadResult.public_id,
        secureUrl: uploadResult.secure_url,
        format: uploadResult.format,
        bytes: uploadResult.bytes,
        folder
      });

      return uploadResult.secure_url;
    } catch (error) {
      logger.error('File upload validation/processing error:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        fileName: file.name,
        fileSize: file.size,
        folder,
        isPdf
      });
      throw error;
    }
  }

  /**
   * Uploads a single file (utility method)
   * @param file File to upload
   * @param folder Cloudinary folder
   * @param isPdf Whether the file is a PDF
   * @returns SingleFileUploadResult
   */
  static async uploadSingleFile(file: File, folder: string, isPdf = false): Promise<SingleFileUploadResult> {
    try {
      const url = await this.validateAndUploadFile(file, folder, isPdf);
      return {
        success: true,
        url
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Deletes a file from Cloudinary (cleanup utility)
   * @param publicId Cloudinary public ID
   * @param resourceType Resource type ('image' or 'raw')
   * @returns Success status
   */
  static async deleteFile(publicId: string, resourceType: 'image' | 'raw' = 'image'): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType
      });
      
      logger.info('File deleted from Cloudinary', {
        publicId,
        resourceType,
        result: result.result
      });
      
      return result.result === 'ok';
    } catch (error) {
      logger.error('File deletion error:', {
        publicId,
        resourceType,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  /**
   * Gets file information from Cloudinary
   * @param publicId Cloudinary public ID
   * @param resourceType Resource type
   * @returns File information or null
   */
  static async getFileInfo(publicId: string, resourceType: 'image' | 'raw' = 'image'): Promise<any | null> {
    try {
      const result = await cloudinary.api.resource(publicId, {
        resource_type: resourceType
      });
      
      return {
        publicId: result.public_id,
        format: result.format,
        bytes: result.bytes,
        width: result.width,
        height: result.height,
        createdAt: result.created_at,
        secureUrl: result.secure_url
      };
    } catch (error) {
      logger.error('Get file info error:', {
        publicId,
        resourceType,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return null;
    }
  }
}
