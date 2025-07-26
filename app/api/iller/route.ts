import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';

export async function GET(req: NextRequest) {
  try {
    const iller = await prisma.iller.findMany({
      orderBy: {
        ad: 'asc'
      }
    });
    return NextResponse.json({ iller });
  } catch (error) {
    logger.error('İller getirilirken hata oluştu:', error);
    return NextResponse.json(
      { message: 'İller getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 