import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';

export async function GET(req: NextRequest) {
  try {
    const kategoriler = await prisma.kategoriler.findMany({
      orderBy: {
        ad: 'asc'
      }
    });
    return NextResponse.json({ kategoriler });
  } catch (error) {
    logger.error('Kategoriler getirilirken hata oluştu:', error);
    return NextResponse.json(
      { message: 'Kategoriler getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 