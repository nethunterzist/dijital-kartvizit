import cloudinary from '@/app/lib/cloudinary';
import { logger } from '@/app/lib/logger';
import { fileUploadSchema } from '@/app/lib/validations';

export interface ImageOptimizationOptions {
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  resize?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'crop';
  };
  progressive?: boolean;
  generateVariants?: boolean;
}

export interface OptimizedImageResult {
  success: boolean;
  urls?: {
    original: string;
    optimized: string;
    variants?: {
      thumbnail: string;
      medium: string;
      large: string;
      webp?: string;
      avif?: string;
    };
  };
  metadata?: {
    originalSize: number;
    optimizedSize: number;
    compressionRatio: number;
    format: string;
    dimensions: { width: number; height: number };
  };
  error?: string;
}

export interface ImageVariant {
  name: string;
  width: number;
  height?: number;
  quality: number;
  format?: string;
}

export class ImageOptimizationService {
  // Predefined image variants for responsive design
  private static readonly IMAGE_VARIANTS: ImageVariant[] = [
    { name: 'thumbnail', width: 150, height: 150, quality: 80, format: 'webp' },
    { name: 'small', width: 300, quality: 85, format: 'webp' },
    { name: 'medium', width: 600, quality: 85, format: 'webp' },
    { name: 'large', width: 1200, quality: 90, format: 'webp' },
    { name: 'xlarge', width: 1920, quality: 90, format: 'webp' }
  ];

  /**
   * Optimizes and uploads an image with multiple variants
   * @param file Image file to optimize
   * @param folder Cloudinary folder
   * @param options Optimization options
   * @returns OptimizedImageResult with URLs and metadata
   */
  static async optimizeAndUpload(
    file: File,
    folder: string,
    options: ImageOptimizationOptions = {}
  ): Promise<OptimizedImageResult> {
    try {
      const startTime = performance.now();
      
      // Validate image file
      const validation = fileUploadSchema.safeParse({
        size: file.size,
        type: file.type
      });

      if (!validation.success) {
        const errorMessages = validation.error.errors.map(e => e.message).join(', ');
        return {
          success: false,
          error: `Image validation error: ${errorMessages}`
        };
      }

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Upload original image with optimization
      const originalUpload = await this.uploadOptimizedImage(
        buffer,
        folder,
        file.name,
        {
          quality: options.quality || 'auto',
          format: options.format || 'auto',
          progressive: options.progressive !== false,
          resize: options.resize
        }
      );

      let variants: any = {};
      
      // Generate responsive variants if requested
      if (options.generateVariants) {
        variants = await this.generateImageVariants(
          originalUpload.public_id,
          folder
        );
      }

      // Calculate metadata
      const metadata = {
        originalSize: file.size,
        optimizedSize: originalUpload.bytes,
        compressionRatio: ((file.size - originalUpload.bytes) / file.size * 100),
        format: originalUpload.format,
        dimensions: {
          width: originalUpload.width,
          height: originalUpload.height
        }
      };

      const duration = performance.now() - startTime;
      
      logger.info('Image optimization completed successfully', {
        fileName: file.name,
        originalSize: file.size,
        optimizedSize: originalUpload.bytes,
        compressionRatio: metadata.compressionRatio.toFixed(2) + '%',
        format: originalUpload.format,
        dimensions: metadata.dimensions,
        duration: `${duration.toFixed(2)}ms`,
        variantsGenerated: Object.keys(variants).length
      });

      return {
        success: true,
        urls: {
          original: originalUpload.secure_url,
          optimized: originalUpload.secure_url,
          variants: Object.keys(variants).length > 0 ? variants : undefined
        },
        metadata
      };
    } catch (error) {
      logger.error('Image optimization failed:', {
        fileName: file.name,
        fileSize: file.size,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Image optimization failed'
      };
    }
  }

  /**
   * Uploads an optimized image to Cloudinary
   * @param buffer Image buffer
   * @param folder Cloudinary folder
   * @param fileName Original file name
   * @param options Upload options
   * @returns Cloudinary upload result
   */
  private static async uploadOptimizedImage(
    buffer: Buffer,
    folder: string,
    fileName: string,
    options: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder,
        resource_type: 'image' as const,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
        max_bytes: 5 * 1024 * 1024, // 5MB limit
        use_filename: true,
        unique_filename: true,
        overwrite: false,
        
        // Optimization settings
        quality: options.quality,
        format: options.format,
        progressive: options.progressive,
        
        // Auto-optimization features
        fetch_format: 'auto',
        quality_analysis: true,
        
        // Resize if specified
        ...(options.resize && {
          width: options.resize.width,
          height: options.resize.height,
          crop: options.resize.crop || 'fit'
        }),
        
        // Advanced optimization
        flags: ['progressive', 'immutable_cache'],
        
        // Metadata preservation
        image_metadata: true
      };

      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error: any, result: any) => {
          if (error) {
            logger.error('Cloudinary optimized upload error:', {
              error: error.message,
              folder,
              fileName
            });
            return reject(error);
          }
          resolve(result);
        }
      );
      
      stream.end(buffer);
    });
  }

  /**
   * Generates multiple image variants for responsive design
   * @param publicId Original image public ID
   * @param folder Cloudinary folder
   * @returns Object with variant URLs
   */
  private static async generateImageVariants(
    publicId: string,
    folder: string
  ): Promise<Record<string, string>> {
    try {
      const variants: Record<string, string> = {};
      
      // Generate variants in parallel
      const variantPromises = this.IMAGE_VARIANTS.map(async (variant) => {
        try {
          const transformedUrl = cloudinary.url(publicId, {
            width: variant.width,
            height: variant.height,
            crop: 'fit',
            quality: variant.quality,
            format: variant.format || 'auto',
            fetch_format: 'auto',
            progressive: true,
            flags: ['progressive', 'immutable_cache']
          });
          
          return { name: variant.name, url: transformedUrl };
        } catch (error) {
          logger.warn(`Failed to generate ${variant.name} variant:`, error);
          return null;
        }
      });

      const results = await Promise.allSettled(variantPromises);
      
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          variants[result.value.name] = result.value.url;
        }
      });

      // Generate modern format variants (WebP, AVIF)
      const modernFormats = ['webp', 'avif'];
      for (const format of modernFormats) {
        try {
          variants[format] = cloudinary.url(publicId, {
            format,
            quality: 'auto',
            fetch_format: 'auto',
            progressive: true,
            flags: ['progressive', 'immutable_cache']
          });
        } catch (error) {
          logger.warn(`Failed to generate ${format} variant:`, error);
        }
      }

      logger.info('Image variants generated successfully', {
        publicId,
        variantCount: Object.keys(variants).length,
        variants: Object.keys(variants)
      });

      return variants;
    } catch (error) {
      logger.error('Image variant generation failed:', {
        publicId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return {};
    }
  }

  /**
   * Optimizes profile photo with specific settings
   * @param file Profile photo file
   * @returns OptimizedImageResult
   */
  static async optimizeProfilePhoto(file: File): Promise<OptimizedImageResult> {
    return this.optimizeAndUpload(file, 'profil_fotograflari', {
      quality: 85,
      format: 'auto',
      resize: {
        width: 800,
        height: 800,
        crop: 'fill'
      },
      progressive: true,
      generateVariants: true
    });
  }

  /**
   * Optimizes company logo with specific settings
   * @param file Logo file
   * @returns OptimizedImageResult
   */
  static async optimizeLogo(file: File): Promise<OptimizedImageResult> {
    return this.optimizeAndUpload(file, 'firma_logolari', {
      quality: 90,
      format: 'auto',
      resize: {
        width: 500,
        height: 500,
        crop: 'fit'
      },
      progressive: true,
      generateVariants: true
    });
  }

  /**
   * Generates a responsive image srcset string
   * @param variants Image variants object
   * @returns Srcset string for responsive images
   */
  static generateSrcSet(variants: Record<string, string>): string {
    const srcsetEntries: string[] = [];
    
    const sizeMap: Record<string, string> = {
      thumbnail: '150w',
      small: '300w',
      medium: '600w',
      large: '1200w',
      xlarge: '1920w'
    };

    Object.entries(variants).forEach(([name, url]) => {
      if (sizeMap[name]) {
        srcsetEntries.push(`${url} ${sizeMap[name]}`);
      }
    });

    return srcsetEntries.join(', ');
  }

  /**
   * Generates picture element HTML for modern format support
   * @param variants Image variants object
   * @param alt Alt text for the image
   * @param className CSS class for the image
   * @returns HTML string for picture element
   */
  static generatePictureElement(
    variants: Record<string, string>,
    alt: string,
    className?: string
  ): string {
    const sources: string[] = [];
    
    // Add AVIF source if available
    if (variants.avif) {
      sources.push(`<source srcset="${variants.avif}" type="image/avif">`);
    }
    
    // Add WebP source if available
    if (variants.webp) {
      sources.push(`<source srcset="${variants.webp}" type="image/webp">`);
    }
    
    // Fallback img element
    const srcset = this.generateSrcSet(variants);
    const imgElement = `<img src="${variants.medium || variants.original}" ${srcset ? `srcset="${srcset}"` : ''} alt="${alt}"${className ? ` class="${className}"` : ''} loading="lazy">`;
    
    return `<picture>${sources.join('')}${imgElement}</picture>`;
  }

  /**
   * Analyzes image and provides optimization recommendations
   * @param file Image file to analyze
   * @returns Optimization recommendations
   */
  static async analyzeImage(file: File): Promise<{
    recommendations: string[];
    estimatedSavings: number;
    optimalFormat: string;
  }> {
    const recommendations: string[] = [];
    let estimatedSavings = 0;
    let optimalFormat = 'webp';

    // File size analysis
    if (file.size > 2 * 1024 * 1024) { // > 2MB
      recommendations.push('Image is large (>2MB), consider compression');
      estimatedSavings += 30;
    }

    // Format analysis
    if (file.type === 'image/png' && file.size > 500 * 1024) {
      recommendations.push('PNG format detected, WebP could reduce size significantly');
      estimatedSavings += 40;
      optimalFormat = 'webp';
    } else if (file.type === 'image/jpeg') {
      recommendations.push('JPEG detected, WebP or AVIF could provide better compression');
      estimatedSavings += 25;
      optimalFormat = 'webp';
    }

    // Quality recommendations
    if (file.size > 1024 * 1024) { // > 1MB
      recommendations.push('Consider reducing quality to 85% for web use');
      estimatedSavings += 20;
    }

    return {
      recommendations,
      estimatedSavings: Math.min(estimatedSavings, 70), // Cap at 70%
      optimalFormat
    };
  }

  /**
   * Batch optimize multiple images
   * @param files Array of image files
   * @param folder Cloudinary folder
   * @param options Optimization options
   * @returns Array of optimization results
   */
  static async batchOptimize(
    files: File[],
    folder: string,
    options: ImageOptimizationOptions = {}
  ): Promise<OptimizedImageResult[]> {
    const startTime = performance.now();
    
    logger.info('Starting batch image optimization', {
      fileCount: files.length,
      folder
    });

    // Process images in parallel with concurrency limit
    const BATCH_SIZE = 3; // Process 3 images at a time
    const results: OptimizedImageResult[] = [];
    
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      const batch = files.slice(i, i + BATCH_SIZE);
      const batchPromises = batch.map(file => 
        this.optimizeAndUpload(file, folder, options)
      );
      
      const batchResults = await Promise.allSettled(batchPromises);
      
      batchResults.forEach((result) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          results.push({
            success: false,
            error: result.reason instanceof Error ? result.reason.message : 'Unknown error'
          });
        }
      });
    }

    const duration = performance.now() - startTime;
    const successCount = results.filter(r => r.success).length;
    
    logger.info('Batch image optimization completed', {
      totalFiles: files.length,
      successCount,
      failureCount: files.length - successCount,
      duration: `${duration.toFixed(2)}ms`,
      averageTimePerImage: `${(duration / files.length).toFixed(2)}ms`
    });

    return results;
  }
}
