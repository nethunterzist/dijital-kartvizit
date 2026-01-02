import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { logger } from '@/app/lib/logger';
import { VercelKVCache } from '@/app/lib/cache';

/**
 * OPTIMIZED: Firma by slug with Redis cache
 *
 * Cache Strategy:
 * - 30 min TTL for firma data
 * - Automatic invalidation on PUT/DELETE
 * - Graceful degradation if cache unavailable
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const cache = VercelKVCache.getInstance();
  const cacheKey = `firma:by-slug:${params.slug}`;

  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { message: 'Firma slug\'ı gereklidir' },
        { status: 400 }
      );
    }

    // 🚀 Try cache first
    const cachedFirma = await cache.get(cacheKey);
    if (cachedFirma) {
      logger.info('Cache HIT', { slug, key: cacheKey });
      return NextResponse.json({
        ...cachedFirma,
        _meta: { cached: true, source: 'redis' }
      });
    }

    // 🔍 Cache miss - query database
    const firma = await prisma.firmalar.findFirst({
      where: { slug }
    });

    if (!firma) {
      return NextResponse.json(
        { message: 'Firma bulunamadı' },
        { status: 404 }
      );
    }

    // 💾 Cache for 30 minutes
    await cache.set(cacheKey, firma, 1800);

    logger.info('Firma fetched and cached', { slug, firmaId: firma.id });

    return NextResponse.json({
      ...firma,
      _meta: { cached: false, source: 'database' }
    });

  } catch (error) {
    logger.error('Firma getirilirken hata oluştu', {
      error: error instanceof Error ? error.message : String(error),
      slug: params.slug,
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { message: 'Firma getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
