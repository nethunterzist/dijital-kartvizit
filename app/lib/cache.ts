import { unstable_cache } from 'next/cache';
import { kv } from '@vercel/kv';
import { prisma } from './db';
import { logger } from './logger';

// Cache tags for invalidation
export const CACHE_TAGS = {
  FIRMA: 'firma',
  FIRMALAR: 'firmalar',
  TEMPLATES: 'templates',
  SETTINGS: 'settings',
} as const;

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  SHORT: 300,    // 5 minutes
  MEDIUM: 1800,  // 30 minutes
  LONG: 3600,    // 1 hour
  VERY_LONG: 86400, // 24 hours
} as const;

// 🏗️ VERCEL KV CACHE SERVICE LAYER
export class VercelKVCache {
  private isKVAvailable = !!(process.env.KV_URL && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

  private static instance: VercelKVCache;
  
  static getInstance(): VercelKVCache {
    if (!this.instance) {
      this.instance = new VercelKVCache();
    }
    return this.instance;
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isKVAvailable) {
      logger.warn('Vercel KV is not available, skipping cache GET operation');
      return null;
    }

    try {
      const start = performance.now();
      const data = await kv.get<T>(key);
      const duration = performance.now() - start;
      
      logger.info(`Cache ${data ? 'HIT' : 'MISS'}`, {
        key,
        duration: `${duration.toFixed(2)}ms`,
        hit: !!data
      });
      
      return data;
    } catch (error) {
      logger.error('Cache get error:', { key, error: error.message, stack: error.stack });
      return null; // Graceful degradation
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    if (!this.isKVAvailable) {
      logger.warn('Vercel KV is not available, skipping cache SET operation');
      return false;
    }

    try {
      const start = performance.now();
      
      if (ttl) {
        await kv.setex(key, ttl, value);
      } else {
        await kv.set(key, value);
      }
      
      const duration = performance.now() - start;
      logger.info('Cache SET', {
        key,
        ttl,
        duration: `${duration.toFixed(2)}ms`
      });
      
      return true;
    } catch (error) {
      logger.error('Cache set error:', { key, error: error.message, stack: error.stack });
      return false; // Graceful degradation
    }
  }

  async del(pattern: string): Promise<number> {
    try {
      const keys = await kv.keys(pattern);
      if (keys.length === 0) return 0;
      
      const deleted = await kv.del(...keys);
      logger.info('Cache invalidation', {
        pattern,
        keysDeleted: deleted
      });
      
      return deleted;
    } catch (error) {
      logger.error('Cache delete error:', { pattern, error });
      return 0;
    }
  }

  async invalidatePattern(pattern: string): Promise<void> {
    await this.del(pattern);
  }
}

// 🎯 FIRMA CACHE SERVICE
interface CacheableFirmaList {
  firmalar: any[];
  pagination: any;
  meta: any;
  timestamp: number;
}

interface CacheableFirma {
  firma: any;
  timestamp: number;
}

export class FirmaCacheService {
  private cache = VercelKVCache.getInstance();
  
  // Cache keys generator
  private keys = {
    list: (page: number, limit: number, search?: string) => 
      `firmalar:list:p${page}:l${limit}${search ? `:s${encodeURIComponent(search)}` : ''}`,
    
    count: (search?: string) => 
      `firmalar:count${search ? `:s${encodeURIComponent(search)}` : ''}`,
    
    firma: (id: number) => `firmalar:item:${id}`,
    
    patterns: {
      all: 'firmalar:*',
      lists: 'firmalar:list:*',
      items: 'firmalar:item:*',
      counts: 'firmalar:count:*'
    }
  };

  // TTL constants
  private ttl = {
    list: 300,    // 5 minutes
    count: 600,   // 10 minutes  
    firma: 1800   // 30 minutes
  };

  async getFirmaList(
    page: number, 
    limit: number, 
    search?: string
  ): Promise<CacheableFirmaList | null> {
    const key = this.keys.list(page, limit, search);
    return await this.cache.get<CacheableFirmaList>(key);
  }

  async setFirmaList(
    page: number,
    limit: number, 
    data: CacheableFirmaList,
    search?: string
  ): Promise<void> {
    const key = this.keys.list(page, limit, search);
    await this.cache.set(key, {
      ...data,
      timestamp: Date.now()
    }, this.ttl.list);
  }

  async getFirmaCount(search?: string): Promise<number | null> {
    const key = this.keys.count(search);
    return await this.cache.get<number>(key);
  }

  async setFirmaCount(count: number, search?: string): Promise<void> {
    const key = this.keys.count(search);
    await this.cache.set(key, count, this.ttl.count);
  }

  async getFirma(id: number): Promise<CacheableFirma | null> {
    const key = this.keys.firma(id);
    return await this.cache.get<CacheableFirma>(key);
  }

  async setFirma(id: number, firma: any): Promise<void> {
    const key = this.keys.firma(id);
    await this.cache.set(key, {
      firma,
      timestamp: Date.now()
    }, this.ttl.firma);
  }

  // Invalidation methods
  async invalidateAll(): Promise<void> {
    await this.cache.invalidatePattern(this.keys.patterns.all);
  }

  async invalidateLists(): Promise<void> {
    await this.cache.invalidatePattern(this.keys.patterns.lists);
    await this.cache.invalidatePattern(this.keys.patterns.counts);
  }

  async invalidateFirma(id: number): Promise<void> {
    await this.cache.del(this.keys.firma(id));
    // Also invalidate lists since they contain this firma
    await this.invalidateLists();
  }

  // Smart invalidation for CUD operations
  async onFirmaCreated(): Promise<void> {
    // New firma affects lists and counts
    await this.invalidateLists();
  }

  async onFirmaUpdated(id: number): Promise<void> {
    // Updated firma affects specific item and lists
    await this.invalidateFirma(id);
  }

  async onFirmaDeleted(id: number): Promise<void> {
    // Deleted firma affects everything
    await this.invalidateFirma(id);
  }
}

// 📊 CACHE METRICS & MONITORING
export class CacheMetrics {
  private static metrics = {
    hits: 0,
    misses: 0,
    errors: 0,
    totalRequests: 0
  };

  static recordHit() {
    this.metrics.hits++;
    this.metrics.totalRequests++;
  }

  static recordMiss() {
    this.metrics.misses++;
    this.metrics.totalRequests++;
  }

  static recordError() {
    this.metrics.errors++;
  }

  static getMetrics() {
    const hitRate = this.metrics.totalRequests > 0 
      ? (this.metrics.hits / this.metrics.totalRequests) * 100 
      : 0;

    return {
      ...this.metrics,
      hitRate: parseFloat(hitRate.toFixed(2))
    };
  }

  static reset() {
    this.metrics = { hits: 0, misses: 0, errors: 0, totalRequests: 0 };
  }
}

// 🛡️ CIRCUIT BREAKER FOR CACHE RELIABILITY
class CacheCircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private readonly threshold = 5;
  private readonly timeout = 30000; // 30 seconds

  async execute<T>(operation: () => Promise<T>): Promise<T | null> {
    if (this.isOpen()) {
      logger.warn('Cache circuit breaker is OPEN, skipping cache operation');
      return null; // Circuit open, skip cache
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private isOpen(): boolean {
    return this.failures >= this.threshold && 
           (Date.now() - this.lastFailure) < this.timeout;
  }

  private onSuccess() {
    this.failures = 0;
  }

  private onFailure() {
    this.failures++;
    this.lastFailure = Date.now();
    logger.warn(`Cache circuit breaker failure count: ${this.failures}`);
  }
}

export const cacheCircuitBreaker = new CacheCircuitBreaker();

// Cached database queries
export const getFirmaBySlug = unstable_cache(
  async (slug: string) => {
    const firma = await prisma.firmalar.findUnique({
      where: { slug }
    });
    return firma;
  },
  ['firma-by-slug'],
  { 
    revalidate: CACHE_DURATIONS.MEDIUM,
    tags: [CACHE_TAGS.FIRMA]
  }
);

export const getFirmaById = unstable_cache(
  async (id: number) => {
    const firma = await prisma.firmalar.findUnique({
      where: { id }
    });
    return firma;
  },
  ['firma-by-id'],
  { 
    revalidate: CACHE_DURATIONS.MEDIUM,
    tags: [CACHE_TAGS.FIRMA]
  }
);

export const getAllFirmalarCached = unstable_cache(
  async () => {
    const firmalar = await prisma.firmalar.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });
    return firmalar;
  },
  ['all-firmalar'],
  { 
    revalidate: CACHE_DURATIONS.SHORT,
    tags: [CACHE_TAGS.FIRMALAR]
  }
);

export const getFirmalarByPage = unstable_cache(
  async (page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;
    
    const [firmalar, total] = await Promise.all([
      prisma.firmalar.findMany({
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc'
        }
      }),
      prisma.firmalar.count()
    ]);
    
    return {
      firmalar,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  },
  ['firmalar-by-page'],
  { 
    revalidate: CACHE_DURATIONS.SHORT,
    tags: [CACHE_TAGS.FIRMALAR]
  }
);

// Template caching
export const getTemplateList = unstable_cache(
  async () => {
    // This would typically come from a database or file system
    // For now, return a static list
    return [
      { id: 1, name: 'Gold', slug: 'template1-gold' },
    ];
  },
  ['template-list'],
  { 
    revalidate: CACHE_DURATIONS.VERY_LONG,
    tags: [CACHE_TAGS.TEMPLATES]
  }
);

// Settings caching
export const getIconOrder = unstable_cache(
  async () => {
    // This would come from your settings table
    return {
      order: ['telefon', 'whatsapp', 'eposta', 'website', 'instagram', 'linkedin']
    };
  },
  ['icon-order'],
  { 
    revalidate: CACHE_DURATIONS.LONG,
    tags: [CACHE_TAGS.SETTINGS]
  }
);

// Statistics caching
export const getFirmaStats = unstable_cache(
  async () => {
    const [totalFirmalar, totalViews] = await Promise.all([
      prisma.firmalar.count(),
      prisma.firmalar.aggregate({
        _sum: {
          goruntulenme: true
        }
      })
    ]);
    
    return {
      totalFirmalar,
      totalViews: totalViews._sum.goruntulenme || 0
    };
  },
  ['firma-stats'],
  { 
    revalidate: CACHE_DURATIONS.MEDIUM,
    tags: [CACHE_TAGS.FIRMALAR]
  }
);

// Search caching
export const searchFirmalar = unstable_cache(
  async (query: string) => {
    const firmalar = await prisma.firmalar.findMany({
      where: {
        OR: [
          {
            firma_adi: {
              contains: query
            }
          },
          {
            yetkili_adi: {
              contains: query
            }
          },
          {
            slug: {
              contains: query
            }
          }
        ]
      },
      take: 20 // Limit search results
    });
    
    return firmalar;
  },
  ['search-firmalar'],
  { 
    revalidate: CACHE_DURATIONS.SHORT,
    tags: [CACHE_TAGS.FIRMALAR]
  }
);

// Cache invalidation helpers
export async function invalidateCache(tags: string[]) {
  // In Next.js 14, you would use revalidateTag
  // This is a placeholder for the actual implementation
  logger.info('Invalidating cache for tags:', tags);
}

export async function invalidateFirmaCache(firmaId?: number) {
  await invalidateCache([CACHE_TAGS.FIRMA, CACHE_TAGS.FIRMALAR]);
}

export async function invalidateAllCache() {
  await invalidateCache(Object.values(CACHE_TAGS));
}

// Memory cache for frequently accessed data (use with caution)
class MemoryCache {
  private cache = new Map<string, { data: any; expiry: number }>();
  
  set(key: string, data: any, ttlSeconds: number = 300) {
    const expiry = Date.now() + (ttlSeconds * 1000);
    this.cache.set(key, { data, expiry });
  }
  
  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
  
  delete(key: string) {
    this.cache.delete(key);
  }
  
  clear() {
    this.cache.clear();
  }
  
  // Clean expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

export const memoryCache = new MemoryCache();

// Cleanup expired entries every 5 minutes
if (typeof window === 'undefined') { // Server-side only
  setInterval(() => {
    memoryCache.cleanup();
  }, 5 * 60 * 1000);
}

// Cache wrapper for any function
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyGenerator: (...args: Parameters<T>) => string,
  ttlSeconds: number = 300
): T {
  return (async (...args: Parameters<T>) => {
    const key = keyGenerator(...args);
    
    // Try memory cache first
    const cached = memoryCache.get(key);
    if (cached !== null) {
      return cached;
    }
    
    // Execute function and cache result
    const result = await fn(...args);
    memoryCache.set(key, result, ttlSeconds);
    
    return result;
  }) as T;
}

// Example usage of withCache
export const getCachedFirmaBySlug = withCache(
  async (slug: string) => {
    return await prisma.firmalar.findUnique({
      where: { slug }
    });
  },
  (slug: string) => `firma-slug-${slug}`,
  CACHE_DURATIONS.MEDIUM
);
