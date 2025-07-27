import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { logger } from '@/app/lib/logger';

/**
 * Slug'a göre firma bilgilerini getir
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    logger.info(`Slug '${params.slug}' için firma bilgisi getirme isteği alındı`, { slug: params.slug });
    
    // Firma bilgilerini sorgula
    const firma = await prisma.firmalar.findFirst({
      where: { slug: params.slug }
    });
    
    if (!firma) {
      return NextResponse.json(
        { message: 'Firma bulunamadı' },
        { status: 404 }
      );
    }
    
    // Firma bilgilerini döndür
    return NextResponse.json(firma);
  } catch (error) {
    logger.error('Firma bilgileri getirilirken hata', { error: error instanceof Error ? error.message : String(error), slug: params.slug, stack: error instanceof Error ? error.stack : undefined });
    return NextResponse.json(
      { message: 'Firma bilgileri getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}