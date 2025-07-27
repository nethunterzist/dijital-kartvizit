import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing slug existence...');
    
    // Test specific slug
    const testSlug = 'ornek-teknoloji-as22222';
    
    const result = await prisma.firmalar.findFirst({
      where: { 
        slug: { 
          equals: testSlug, 
          mode: 'insensitive' 
        } 
      },
      select: { id: true, slug: true, firma_adi: true }
    });
    
    console.log('✅ Query executed, result:', result);
    
    // Also get a few working slugs
    const workingSlugs = await prisma.firmalar.findMany({
      select: { slug: true, firma_adi: true },
      take: 5,
      orderBy: { created_at: 'desc' }
    });
    
    return NextResponse.json({
      testSlug,
      found: !!result,
      result,
      workingSlugs,
      environment: process.env.NODE_ENV,
      databaseUrl: !!process.env.DATABASE_URL
    });
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}