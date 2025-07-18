import { unstable_cache } from 'next/cache';
import { prisma } from './db';

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
      { id: 1, name: 'Classic', slug: 'template1-classic' },
      { id: 2, name: 'Modern', slug: 'template2-modern' },
      { id: 3, name: 'Minimal', slug: 'template3-minimal' },
      // ... other templates
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
  console.log('Invalidating cache for tags:', tags);
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
