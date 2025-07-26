import { logger } from '@/app/lib/logger';
import { FirmaCacheService, VercelKVCache, CacheMetrics } from '@/app/lib/cache';

export interface CacheInvalidationResult {
  success: boolean;
  invalidatedKeys: string[];
  failedKeys: string[];
  duration: number;
  strategy: string;
}

export interface CacheInvalidationOptions {
  strategy?: 'immediate' | 'async' | 'batch';
  includeRelated?: boolean;
  warmCache?: boolean;
  maxRetries?: number;
}

export class CacheInvalidationService {
  private static firmaCacheService = new FirmaCacheService();
  private static kvCache = VercelKVCache.getInstance();

  /**
   * Comprehensive cache invalidation for CREATE operations
   * @param firmaData Created firma data
   * @param options Invalidation options
   * @returns CacheInvalidationResult
   */
  static async invalidateOnCreate(
    firmaData: any,
    options: CacheInvalidationOptions = {}
  ): Promise<CacheInvalidationResult> {
    const startTime = performance.now();
    const invalidatedKeys: string[] = [];
    const failedKeys: string[] = [];

    logger.info('Starting cache invalidation for CREATE operation', {
      firmaId: firmaData.id,
      firmaAdi: firmaData.firma_adi,
      strategy: options.strategy || 'immediate'
    });

    try {
      // 1. Invalidate list caches (new firma affects all lists)
      await this.invalidateListCaches(invalidatedKeys, failedKeys);

      // 2. Invalidate count caches
      await this.invalidateCountCaches(invalidatedKeys, failedKeys);

      // 3. Invalidate search caches if firma has searchable content
      if (options.includeRelated) {
        await this.invalidateSearchCaches(firmaData, invalidatedKeys, failedKeys);
      }

      // 4. Invalidate statistics caches
      await this.invalidateStatsCaches(invalidatedKeys, failedKeys);

      // 5. Warm cache with new firma if requested
      if (options.warmCache) {
        await this.warmFirmaCache(firmaData.id, firmaData);
      }

      const duration = performance.now() - startTime;

      logger.info('Cache invalidation completed for CREATE', {
        firmaId: firmaData.id,
        duration: `${duration.toFixed(2)}ms`,
        invalidatedKeys: invalidatedKeys.length,
        failedKeys: failedKeys.length,
        strategy: options.strategy || 'immediate'
      });

      return {
        success: failedKeys.length === 0,
        invalidatedKeys,
        failedKeys,
        duration,
        strategy: options.strategy || 'immediate'
      };
    } catch (error) {
      logger.error('Cache invalidation failed for CREATE', {
        firmaId: firmaData.id,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      return {
        success: false,
        invalidatedKeys,
        failedKeys: ['*'],
        duration: performance.now() - startTime,
        strategy: options.strategy || 'immediate'
      };
    }
  }

  /**
   * Comprehensive cache invalidation for UPDATE operations
   * @param firmaId Updated firma ID
   * @param oldData Previous firma data
   * @param newData Updated firma data
   * @param options Invalidation options
   * @returns CacheInvalidationResult
   */
  static async invalidateOnUpdate(
    firmaId: number,
    oldData: any,
    newData: any,
    options: CacheInvalidationOptions = {}
  ): Promise<CacheInvalidationResult> {
    const startTime = performance.now();
    const invalidatedKeys: string[] = [];
    const failedKeys: string[] = [];

    logger.info('Starting cache invalidation for UPDATE operation', {
      firmaId,
      slugChanged: oldData.slug !== newData.slug,
      nameChanged: oldData.firma_adi !== newData.firma_adi,
      strategy: options.strategy || 'immediate'
    });

    try {
      // 1. Always invalidate specific firma cache
      await this.invalidateSpecificFirma(firmaId, invalidatedKeys, failedKeys);

      // 2. Invalidate list caches (updated firma affects lists)
      await this.invalidateListCaches(invalidatedKeys, failedKeys);

      // 3. If slug changed, invalidate slug-based caches
      if (oldData.slug !== newData.slug) {
        await this.invalidateSlugCaches(oldData.slug, newData.slug, invalidatedKeys, failedKeys);
      }

      // 4. If searchable content changed, invalidate search caches
      if (this.hasSearchableContentChanged(oldData, newData)) {
        await this.invalidateSearchCaches(newData, invalidatedKeys, failedKeys);
      }

      // 5. If approval status changed, invalidate filtered caches
      if (oldData.onay !== newData.onay) {
        await this.invalidateFilteredCaches(invalidatedKeys, failedKeys);
      }

      // 6. Warm cache with updated firma if requested
      if (options.warmCache) {
        await this.warmFirmaCache(firmaId, newData);
      }

      const duration = performance.now() - startTime;

      logger.info('Cache invalidation completed for UPDATE', {
        firmaId,
        duration: `${duration.toFixed(2)}ms`,
        invalidatedKeys: invalidatedKeys.length,
        failedKeys: failedKeys.length,
        strategy: options.strategy || 'immediate'
      });

      return {
        success: failedKeys.length === 0,
        invalidatedKeys,
        failedKeys,
        duration,
        strategy: options.strategy || 'immediate'
      };
    } catch (error) {
      logger.error('Cache invalidation failed for UPDATE', {
        firmaId,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      return {
        success: false,
        invalidatedKeys,
        failedKeys: ['*'],
        duration: performance.now() - startTime,
        strategy: options.strategy || 'immediate'
      };
    }
  }

  /**
   * Comprehensive cache invalidation for DELETE operations
   * @param firmaId Deleted firma ID
   * @param firmaData Deleted firma data
   * @param options Invalidation options
   * @returns CacheInvalidationResult
   */
  static async invalidateOnDelete(
    firmaId: number,
    firmaData: any,
    options: CacheInvalidationOptions = {}
  ): Promise<CacheInvalidationResult> {
    const startTime = performance.now();
    const invalidatedKeys: string[] = [];
    const failedKeys: string[] = [];

    logger.info('Starting cache invalidation for DELETE operation', {
      firmaId,
      firmaAdi: firmaData.firma_adi,
      slug: firmaData.slug,
      strategy: options.strategy || 'immediate'
    });

    try {
      // 1. Remove specific firma cache
      await this.invalidateSpecificFirma(firmaId, invalidatedKeys, failedKeys);

      // 2. Invalidate all list caches (deleted firma affects all lists)
      await this.invalidateListCaches(invalidatedKeys, failedKeys);

      // 3. Invalidate count caches
      await this.invalidateCountCaches(invalidatedKeys, failedKeys);

      // 4. Invalidate slug-based caches
      await this.invalidateSlugCaches(firmaData.slug, null, invalidatedKeys, failedKeys);

      // 5. Invalidate search caches
      await this.invalidateSearchCaches(firmaData, invalidatedKeys, failedKeys);

      // 6. Invalidate statistics caches
      await this.invalidateStatsCaches(invalidatedKeys, failedKeys);

      // 7. Invalidate filtered caches
      await this.invalidateFilteredCaches(invalidatedKeys, failedKeys);

      const duration = performance.now() - startTime;

      logger.info('Cache invalidation completed for DELETE', {
        firmaId,
        duration: `${duration.toFixed(2)}ms`,
        invalidatedKeys: invalidatedKeys.length,
        failedKeys: failedKeys.length,
        strategy: options.strategy || 'immediate'
      });

      return {
        success: failedKeys.length === 0,
        invalidatedKeys,
        failedKeys,
        duration,
        strategy: options.strategy || 'immediate'
      };
    } catch (error) {
      logger.error('Cache invalidation failed for DELETE', {
        firmaId,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      return {
        success: false,
        invalidatedKeys,
        failedKeys: ['*'],
        duration: performance.now() - startTime,
        strategy: options.strategy || 'immediate'
      };
    }
  }

  /**
   * Batch invalidation for multiple operations
   * @param operations Array of invalidation operations
   * @param options Batch options
   * @returns CacheInvalidationResult
   */
  static async batchInvalidate(
    operations: Array<{
      type: 'create' | 'update' | 'delete';
      firmaId: number;
      data: any;
      oldData?: any;
    }>,
    options: CacheInvalidationOptions = {}
  ): Promise<CacheInvalidationResult> {
    const startTime = performance.now();
    const invalidatedKeys: string[] = [];
    const failedKeys: string[] = [];

    logger.info('Starting batch cache invalidation', {
      operationCount: operations.length,
      strategy: options.strategy || 'batch'
    });

    try {
      // Collect all unique invalidation targets
      const invalidationTargets = new Set<string>();

      for (const operation of operations) {
        switch (operation.type) {
          case 'create':
            invalidationTargets.add('lists');
            invalidationTargets.add('counts');
            invalidationTargets.add('stats');
            break;
          case 'update':
            invalidationTargets.add(`firma:${operation.firmaId}`);
            invalidationTargets.add('lists');
            if (operation.oldData?.slug !== operation.data?.slug) {
              invalidationTargets.add('slugs');
            }
            break;
          case 'delete':
            invalidationTargets.add(`firma:${operation.firmaId}`);
            invalidationTargets.add('lists');
            invalidationTargets.add('counts');
            invalidationTargets.add('stats');
            invalidationTargets.add('slugs');
            break;
        }
      }

      // Execute batch invalidation
      for (const target of invalidationTargets) {
        try {
          await this.executeInvalidationTarget(target, invalidatedKeys);
        } catch (error) {
          failedKeys.push(target);
          logger.warn(`Failed to invalidate target: ${target}`, { error });
        }
      }

      const duration = performance.now() - startTime;

      logger.info('Batch cache invalidation completed', {
        operationCount: operations.length,
        duration: `${duration.toFixed(2)}ms`,
        invalidatedKeys: invalidatedKeys.length,
        failedKeys: failedKeys.length
      });

      return {
        success: failedKeys.length === 0,
        invalidatedKeys,
        failedKeys,
        duration,
        strategy: 'batch'
      };
    } catch (error) {
      logger.error('Batch cache invalidation failed', {
        operationCount: operations.length,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      return {
        success: false,
        invalidatedKeys,
        failedKeys: ['*'],
        duration: performance.now() - startTime,
        strategy: 'batch'
      };
    }
  }

  // Private helper methods

  private static async invalidateListCaches(
    invalidatedKeys: string[],
    failedKeys: string[]
  ): Promise<void> {
    try {
      await this.firmaCacheService.invalidateLists();
      invalidatedKeys.push('firmalar:list:*', 'firmalar:count:*');
    } catch (error) {
      failedKeys.push('lists');
      logger.warn('Failed to invalidate list caches', { error });
    }
  }

  private static async invalidateCountCaches(
    invalidatedKeys: string[],
    failedKeys: string[]
  ): Promise<void> {
    try {
      await this.kvCache.invalidatePattern('firmalar:count:*');
      invalidatedKeys.push('firmalar:count:*');
    } catch (error) {
      failedKeys.push('counts');
      logger.warn('Failed to invalidate count caches', { error });
    }
  }

  private static async invalidateSpecificFirma(
    firmaId: number,
    invalidatedKeys: string[],
    failedKeys: string[]
  ): Promise<void> {
    try {
      await this.firmaCacheService.invalidateFirma(firmaId);
      invalidatedKeys.push(`firmalar:item:${firmaId}`);
    } catch (error) {
      failedKeys.push(`firma:${firmaId}`);
      logger.warn(`Failed to invalidate firma cache: ${firmaId}`, { error });
    }
  }

  private static async invalidateSearchCaches(
    firmaData: any,
    invalidatedKeys: string[],
    failedKeys: string[]
  ): Promise<void> {
    try {
      // Invalidate search caches that might contain this firma
      const searchTerms = [
        firmaData.firma_adi,
        firmaData.yetkili_adi,
        firmaData.slug
      ].filter(Boolean);

      for (const term of searchTerms) {
        await this.kvCache.invalidatePattern(`search:*${encodeURIComponent(term)}*`);
      }
      
      invalidatedKeys.push('search:*');
    } catch (error) {
      failedKeys.push('search');
      logger.warn('Failed to invalidate search caches', { error });
    }
  }

  private static async invalidateSlugCaches(
    oldSlug: string,
    newSlug: string | null,
    invalidatedKeys: string[],
    failedKeys: string[]
  ): Promise<void> {
    try {
      await this.kvCache.invalidatePattern(`slug:${oldSlug}`);
      if (newSlug) {
        await this.kvCache.invalidatePattern(`slug:${newSlug}`);
      }
      invalidatedKeys.push(`slug:${oldSlug}`, ...(newSlug ? [`slug:${newSlug}`] : []));
    } catch (error) {
      failedKeys.push('slugs');
      logger.warn('Failed to invalidate slug caches', { error });
    }
  }

  private static async invalidateStatsCaches(
    invalidatedKeys: string[],
    failedKeys: string[]
  ): Promise<void> {
    try {
      await this.kvCache.invalidatePattern('stats:*');
      invalidatedKeys.push('stats:*');
    } catch (error) {
      failedKeys.push('stats');
      logger.warn('Failed to invalidate stats caches', { error });
    }
  }

  private static async invalidateFilteredCaches(
    invalidatedKeys: string[],
    failedKeys: string[]
  ): Promise<void> {
    try {
      await this.kvCache.invalidatePattern('filtered:*');
      invalidatedKeys.push('filtered:*');
    } catch (error) {
      failedKeys.push('filtered');
      logger.warn('Failed to invalidate filtered caches', { error });
    }
  }

  private static async warmFirmaCache(firmaId: number, firmaData: any): Promise<void> {
    try {
      await this.firmaCacheService.setFirma(firmaId, firmaData);
      logger.info('Cache warmed for firma', { firmaId });
    } catch (error) {
      logger.warn('Failed to warm firma cache', { firmaId, error });
    }
  }

  private static hasSearchableContentChanged(oldData: any, newData: any): boolean {
    return (
      oldData.firma_adi !== newData.firma_adi ||
      oldData.yetkili_adi !== newData.yetkili_adi ||
      oldData.slug !== newData.slug ||
      oldData.firma_hakkinda !== newData.firma_hakkinda
    );
  }

  private static async executeInvalidationTarget(
    target: string,
    invalidatedKeys: string[]
  ): Promise<void> {
    switch (target) {
      case 'lists':
        await this.kvCache.invalidatePattern('firmalar:list:*');
        invalidatedKeys.push('firmalar:list:*');
        break;
      case 'counts':
        await this.kvCache.invalidatePattern('firmalar:count:*');
        invalidatedKeys.push('firmalar:count:*');
        break;
      case 'stats':
        await this.kvCache.invalidatePattern('stats:*');
        invalidatedKeys.push('stats:*');
        break;
      case 'slugs':
        await this.kvCache.invalidatePattern('slug:*');
        invalidatedKeys.push('slug:*');
        break;
      default:
        if (target.startsWith('firma:')) {
          const firmaId = parseInt(target.split(':')[1]);
          await this.firmaCacheService.invalidateFirma(firmaId);
          invalidatedKeys.push(`firmalar:item:${firmaId}`);
        }
        break;
    }
  }

  /**
   * Async cache invalidation (fire and forget)
   * @param operation Invalidation operation
   * @param data Operation data
   */
  static async asyncInvalidate(
    operation: 'create' | 'update' | 'delete',
    data: any
  ): Promise<void> {
    // Fire and forget - don't await
    setImmediate(async () => {
      try {
        switch (operation) {
          case 'create':
            await this.invalidateOnCreate(data, { strategy: 'async' });
            break;
          case 'update':
            await this.invalidateOnUpdate(data.id, data.oldData, data.newData, { strategy: 'async' });
            break;
          case 'delete':
            await this.invalidateOnDelete(data.id, data, { strategy: 'async' });
            break;
        }
      } catch (error) {
        logger.error('Async cache invalidation failed', { operation, error });
      }
    });
  }

  /**
   * Get cache invalidation metrics
   * @returns Cache invalidation statistics
   */
  static getInvalidationMetrics(): {
    totalInvalidations: number;
    successRate: number;
    averageDuration: number;
    lastInvalidation: Date | null;
  } {
    // This would be implemented with actual metrics tracking
    return {
      totalInvalidations: 0,
      successRate: 100,
      averageDuration: 0,
      lastInvalidation: null
    };
  }

  /**
   * Health check for cache invalidation system
   * @returns Health status
   */
  static async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    checks: Record<string, boolean>;
    latency: number;
  }> {
    const startTime = performance.now();
    const checks: Record<string, boolean> = {};

    try {
      // Test KV cache connectivity
      checks.kvCache = await this.testKVCache();
      
      // Test firma cache service
      checks.firmaCacheService = await this.testFirmaCacheService();
      
      // Test invalidation patterns
      checks.invalidationPatterns = await this.testInvalidationPatterns();

      const latency = performance.now() - startTime;
      const healthyChecks = Object.values(checks).filter(Boolean).length;
      const totalChecks = Object.keys(checks).length;

      let status: 'healthy' | 'degraded' | 'unhealthy';
      if (healthyChecks === totalChecks) {
        status = 'healthy';
      } else if (healthyChecks >= totalChecks * 0.5) {
        status = 'degraded';
      } else {
        status = 'unhealthy';
      }

      return { status, checks, latency };
    } catch (error) {
      logger.error('Cache invalidation health check failed', { error });
      return {
        status: 'unhealthy',
        checks,
        latency: performance.now() - startTime
      };
    }
  }

  private static async testKVCache(): Promise<boolean> {
    try {
      const testKey = 'health-check-test';
      await this.kvCache.set(testKey, 'test', 1);
      const result = await this.kvCache.get(testKey);
      await this.kvCache.del(testKey);
      return result === 'test';
    } catch {
      return false;
    }
  }

  private static async testFirmaCacheService(): Promise<boolean> {
    try {
      // Test if firma cache service methods are accessible
      return typeof this.firmaCacheService.invalidateAll === 'function';
    } catch {
      return false;
    }
  }

  private static async testInvalidationPatterns(): Promise<boolean> {
    try {
      // Test pattern invalidation
      await this.kvCache.invalidatePattern('test:*');
      return true;
    } catch {
      return false;
    }
  }
}
