import { NextRequest, NextResponse } from 'next/server';

// API route - dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';

export async function GET(req: NextRequest) {
  try {
    const sektorler = await prisma.sektorler.findMany({
      orderBy: {
        ad: 'asc'
      }
    });
    return NextResponse.json({ sektorler });
  } catch (error) {
    logger.error('Sektörler getirilirken hata oluştu:', error);
    return NextResponse.json(
      { message: 'Sektörler getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 