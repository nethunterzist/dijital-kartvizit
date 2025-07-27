import { generateHtmlForFirma } from '@/app/lib/htmlGenerator';
import { generateQRCode } from '@/app/lib/qrCodeGenerator';
import { invalidateFirmaCache } from '@/app/lib/cache';
import { logger } from '@/app/lib/logger';

export interface PostProcessingResult {
  success: boolean;
  completedTasks: string[];
  failedTasks: string[];
  errors?: string[];
}

export class PostProcessingService {
  /**
   * Processes all post-creation tasks for a new firma
   * @param firma Firma object with all related data
   * @returns PostProcessingResult with task completion status
   */
  async processNewFirma(firma: any): Promise<PostProcessingResult> {
    const startTime = performance.now();
    const completedTasks: string[] = [];
    const failedTasks: string[] = [];
    const errors: string[] = [];

    logger.info('Starting post-processing for new firma', {
      firmaId: firma.id,
      firmaAdi: firma.firma_adi,
      slug: firma.slug
    });

    // Define all post-processing tasks
    const tasks = [
      {
        name: 'HTML generation',
        execute: () => PostProcessingService.generateHtml(firma)
      },
      {
        name: 'QR code generation',
        execute: () => PostProcessingService.generateQrCode(firma)
      },
      {
        name: 'Cache invalidation',
        execute: () => PostProcessingService.invalidateCache()
      }
    ];

    // Execute all tasks in parallel for better performance
    const results = await Promise.allSettled(
      tasks.map(task => task.execute())
    );

    // Process results
    results.forEach((result, index) => {
      const taskName = tasks[index].name;
      
      if (result.status === 'fulfilled') {
        completedTasks.push(taskName);
        logger.info(`Post-processing task completed: ${taskName}`, {
          firmaId: firma.id,
          task: taskName
        });
      } else {
        failedTasks.push(taskName);
        const errorMessage = result.reason instanceof Error 
          ? result.reason.message 
          : 'Unknown error';
        errors.push(`${taskName}: ${errorMessage}`);
        
        logger.error(`Post-processing task failed: ${taskName}`, {
          firmaId: firma.id,
          task: taskName,
          error: errorMessage,
          stack: result.reason instanceof Error ? result.reason.stack : undefined
        });
      }
    });

    const duration = performance.now() - startTime;
    const success = failedTasks.length === 0;

    logger.info('Post-processing completed', {
      firmaId: firma.id,
      duration: `${duration.toFixed(2)}ms`,
      success,
      completedTasks: completedTasks.length,
      failedTasks: failedTasks.length,
      totalTasks: tasks.length
    });

    return {
      success,
      completedTasks,
      failedTasks,
      errors: errors.length > 0 ? errors : undefined
    };
  }

  /**
   * Processes all post-update tasks for an updated firma
   * @param firma Updated firma object
   * @param slugChanged Whether the slug was changed
   * @returns PostProcessingResult with task completion status
   */
  static async processUpdatedFirma(firma: any, slugChanged = false): Promise<PostProcessingResult> {
    const startTime = performance.now();
    const completedTasks: string[] = [];
    const failedTasks: string[] = [];
    const errors: string[] = [];

    logger.info('Starting post-processing for updated firma', {
      firmaId: firma.id,
      firmaAdi: firma.firma_adi,
      slug: firma.slug,
      slugChanged
    });

    // Define update-specific tasks
    const tasks = [
      {
        name: 'HTML regeneration',
        execute: () => this.generateHtml(firma)
      },
      {
        name: 'Cache invalidation',
        execute: () => this.invalidateCache()
      }
    ];

    // Add QR code regeneration only if slug changed
    if (slugChanged) {
      tasks.push({
        name: 'QR code regeneration',
        execute: () => this.generateQrCode(firma)
      });
    }

    // Execute all tasks in parallel
    const results = await Promise.allSettled(
      tasks.map(task => task.execute())
    );

    // Process results
    results.forEach((result, index) => {
      const taskName = tasks[index].name;
      
      if (result.status === 'fulfilled') {
        completedTasks.push(taskName);
        logger.info(`Post-processing task completed: ${taskName}`, {
          firmaId: firma.id,
          task: taskName
        });
      } else {
        failedTasks.push(taskName);
        const errorMessage = result.reason instanceof Error 
          ? result.reason.message 
          : 'Unknown error';
        errors.push(`${taskName}: ${errorMessage}`);
        
        logger.error(`Post-processing task failed: ${taskName}`, {
          firmaId: firma.id,
          task: taskName,
          error: errorMessage,
          stack: result.reason instanceof Error ? result.reason.stack : undefined
        });
      }
    });

    const duration = performance.now() - startTime;
    const success = failedTasks.length === 0;

    logger.info('Post-processing completed for update', {
      firmaId: firma.id,
      duration: `${duration.toFixed(2)}ms`,
      success,
      completedTasks: completedTasks.length,
      failedTasks: failedTasks.length,
      totalTasks: tasks.length,
      slugChanged
    });

    return {
      success,
      completedTasks,
      failedTasks,
      errors: errors.length > 0 ? errors : undefined
    };
  }

  /**
   * Processes post-deletion tasks
   * @param firmaId ID of deleted firma
   * @param slug Slug of deleted firma
   * @returns PostProcessingResult with task completion status
   */
  static async processDeletedFirma(firmaId: number, slug: string): Promise<PostProcessingResult> {
    const startTime = performance.now();
    const completedTasks: string[] = [];
    const failedTasks: string[] = [];
    const errors: string[] = [];

    logger.info('Starting post-processing for deleted firma', {
      firmaId,
      slug
    });

    // Define deletion-specific tasks
    const tasks = [
      {
        name: 'Cache invalidation',
        execute: () => this.invalidateCache()
      },
      {
        name: 'File cleanup',
        execute: () => this.cleanupFiles(firmaId, slug)
      }
    ];

    // Execute all tasks in parallel
    const results = await Promise.allSettled(
      tasks.map(task => task.execute())
    );

    // Process results
    results.forEach((result, index) => {
      const taskName = tasks[index].name;
      
      if (result.status === 'fulfilled') {
        completedTasks.push(taskName);
        logger.info(`Post-processing task completed: ${taskName}`, {
          firmaId,
          task: taskName
        });
      } else {
        failedTasks.push(taskName);
        const errorMessage = result.reason instanceof Error 
          ? result.reason.message 
          : 'Unknown error';
        errors.push(`${taskName}: ${errorMessage}`);
        
        logger.error(`Post-processing task failed: ${taskName}`, {
          firmaId,
          task: taskName,
          error: errorMessage,
          stack: result.reason instanceof Error ? result.reason.stack : undefined
        });
      }
    });

    const duration = performance.now() - startTime;
    const success = failedTasks.length === 0;

    logger.info('Post-processing completed for deletion', {
      firmaId,
      duration: `${duration.toFixed(2)}ms`,
      success,
      completedTasks: completedTasks.length,
      failedTasks: failedTasks.length,
      totalTasks: tasks.length
    });

    return {
      success,
      completedTasks,
      failedTasks,
      errors: errors.length > 0 ? errors : undefined
    };
  }

  /**
   * Generates HTML for a firma
   * @param firma Firma object
   * @returns Promise that resolves when HTML is generated
   */
  private static async generateHtml(firma: any): Promise<void> {
    try {
      const startTime = performance.now();
      await generateHtmlForFirma(firma);
      const duration = performance.now() - startTime;
      
      logger.info('HTML generated successfully', {
        firmaId: firma.id,
        slug: firma.slug,
        duration: `${duration.toFixed(2)}ms`
      });
    } catch (error) {
      logger.error('HTML generation failed:', {
        firmaId: firma.id,
        slug: firma.slug,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }

  /**
   * Generates QR code for a firma
   * @param firma Firma object
   * @returns Promise that resolves when QR code is generated
   */
  private static async generateQrCode(firma: any): Promise<void> {
    try {
      const startTime = performance.now();
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const firmaUrl = `${baseUrl}/${firma.slug}`;
      
      await generateQRCode(firmaUrl);
      const duration = performance.now() - startTime;
      
      logger.info('QR code generated successfully', {
        firmaId: firma.id,
        slug: firma.slug,
        url: firmaUrl,
        duration: `${duration.toFixed(2)}ms`
      });
    } catch (error) {
      logger.error('QR code generation failed:', {
        firmaId: firma.id,
        slug: firma.slug,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }

  /**
   * Invalidates cache
   * @returns Promise that resolves when cache is invalidated
   */
  private static async invalidateCache(): Promise<void> {
    try {
      const startTime = performance.now();
      await invalidateFirmaCache();
      const duration = performance.now() - startTime;
      
      logger.info('Cache invalidated successfully', {
        duration: `${duration.toFixed(2)}ms`
      });
    } catch (error) {
      logger.error('Cache invalidation failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }

  /**
   * Cleans up files associated with a deleted firma
   * @param firmaId ID of deleted firma
   * @param slug Slug of deleted firma
   * @returns Promise that resolves when cleanup is complete
   */
  private static async cleanupFiles(firmaId: number, slug: string): Promise<void> {
    try {
      const startTime = performance.now();
      
      // TODO: Implement file cleanup logic
      // This could include:
      // - Deleting generated HTML files
      // - Deleting QR code images
      // - Cleaning up any cached files
      // - Removing from CDN if applicable
      
      logger.info('File cleanup completed (placeholder)', {
        firmaId,
        slug
      });
      
      const duration = performance.now() - startTime;
      logger.info('File cleanup completed', {
        firmaId,
        slug,
        duration: `${duration.toFixed(2)}ms`
      });
    } catch (error) {
      logger.error('File cleanup failed:', {
        firmaId,
        slug,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }

  /**
   * Executes a single post-processing task with retry logic
   * @param taskName Name of the task
   * @param taskFunction Function to execute
   * @param maxRetries Maximum number of retries
   * @returns Promise that resolves when task completes or fails permanently
   */
  static async executeWithRetry(
    taskName: string,
    taskFunction: () => Promise<void>,
    maxRetries = 3
  ): Promise<void> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await taskFunction();
        
        if (attempt > 1) {
          logger.info(`Task succeeded on retry`, {
            task: taskName,
            attempt,
            maxRetries
          });
        }
        
        return; // Success
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        logger.warn(`Task failed, attempt ${attempt}/${maxRetries}`, {
          task: taskName,
          attempt,
          maxRetries,
          error: lastError.message
        });
        
        if (attempt < maxRetries) {
          // Wait before retry (exponential backoff)
          const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s...
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    // All retries failed
    logger.error(`Task failed permanently after ${maxRetries} attempts`, {
      task: taskName,
      maxRetries,
      error: lastError?.message
    });
    
    throw lastError;
  }

  /**
   * Gets the status of post-processing tasks
   * @returns Object with task status information
   */
  static getTaskStatus(): {
    availableTasks: string[];
    criticalTasks: string[];
    optionalTasks: string[];
  } {
    return {
      availableTasks: [
        'HTML generation',
        'QR code generation',
        'Cache invalidation',
        'File cleanup'
      ],
      criticalTasks: [
        'Cache invalidation'
      ],
      optionalTasks: [
        'HTML generation',
        'QR code generation',
        'File cleanup'
      ]
    };
  }
}
