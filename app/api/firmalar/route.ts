import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing firma API connection...');
    
    // Test 1: Simple count query
    const firmaCount = await prisma.firmalar.count();
    console.log('✅ Firmalar count:', firmaCount);
    
    // Test 2: Get first 3 firmalar
    const firmalar = await prisma.firmalar.findMany({
      take: 3,
      select: {
        id: true,
        firma_adi: true,
        slug: true,
        created_at: true
      },
      orderBy: { created_at: 'desc' }
    });
    
    console.log('✅ Firmalar sample:', firmalar);
    
    return NextResponse.json({
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      tests: {
        prismaConnection: 'WORKING',
        firmaCount,
        sampleFirmalar: firmalar,
        environment: process.env.NODE_ENV || 'unknown'
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('❌ Firma API test failed:', error);
    
    return NextResponse.json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
        name: error instanceof Error ? error.name : 'UnknownError',
        // Only include stack in development
        ...(process.env.NODE_ENV === 'development' && {
          stack: error instanceof Error ? error.stack : undefined
        })
      }
    }, { status: 500 });
  }
}