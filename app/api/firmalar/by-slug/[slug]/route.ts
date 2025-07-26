import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { message: 'Firma slug\'ı gereklidir' },
        { status: 400 }
      );
    }
    
    // Firma var mı kontrol et
    const firma = await prisma.firmalar.findFirst({
      where: { slug }
    });
    
    // Firma bulunamadı ise hata döndür
    if (!firma) {
      return NextResponse.json(
        { message: 'Firma bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(firma);
  } catch (error) {
    logger.error('Firma getirilirken hata oluştu', { error: error instanceof Error ? error.message : String(error), slug: params.slug, stack: error instanceof Error ? error.stack : undefined });
    return NextResponse.json(
      { message: 'Firma getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 