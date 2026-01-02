import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';

/**
 * POST /api/view/[slug]
 * Increment view count for a company card
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    logger.info('View count increment request', { slug });

    // Check if firma exists
    const firma = await prisma.firmalar.findUnique({
      where: { slug },
      select: { id: true, firma_adi: true, goruntulenme: true }
    });

    if (!firma) {
      logger.warn('Firma not found for view count', { slug });
      return NextResponse.json(
        { error: 'Firma bulunamadı' },
        { status: 404 }
      );
    }

    // Increment view count
    const updated = await prisma.firmalar.update({
      where: { slug },
      data: {
        goruntulenme: {
          increment: 1
        }
      },
      select: {
        id: true,
        firma_adi: true,
        goruntulenme: true
      }
    });

    logger.info('View count incremented successfully', {
      slug,
      firma_adi: updated.firma_adi,
      previous_count: firma.goruntulenme,
      new_count: updated.goruntulenme
    });

    return NextResponse.json({
      success: true,
      goruntulenme: updated.goruntulenme
    });

  } catch (error: any) {
    logger.error('View count increment failed', {
      error: error.message,
      slug
    });

    return NextResponse.json(
      { error: 'Görüntülenme sayacı güncellenemedi' },
      { status: 500 }
    );
  }
}
