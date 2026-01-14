import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { VercelKVCache } from '@/app/lib/cache';
import { ErrorResponse } from '@/app/lib/errors';
import { logger } from '@/app/lib/logger';

/**
 * GET /api/packages
 *
 * Aktif paketleri sıralı olarak döner
 * Public endpoint - herkes erişebilir
 */
export async function GET(request: NextRequest) {
  try {
    // Cache'den kontrol et
    const cache = VercelKVCache.getInstance();
    const cacheKey = 'packages:list';
    const cached = await cache.get(cacheKey);

    if (cached) {
      return NextResponse.json(cached);
    }

    // Database'den aktif paketleri getir
    const packages = await prisma.packages.findMany({
      where: {
        active: true
      },
      orderBy: {
        display_order: 'asc'
      },
      select: {
        id: true,
        package_key: true,
        name: true,
        description: true,
        price: true,
        card_count: true,
        color: true,
        popular: true,
        display_order: true,
        features: true
      }
    });

    // Cache'e kaydet (1 saat)
    await cache.set(cacheKey, packages, 3600);

    return NextResponse.json(packages);
  } catch (error) {
    logger.error('Error fetching packages', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    const statusCode = ErrorResponse.getStatusCode(error as Error);
    const errorBody = ErrorResponse.build(error as Error);
    return NextResponse.json(errorBody, { status: statusCode });
  }
}
