import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Test database connection with simple queries
    console.log('🔍 Testing database connection...');
    
    // Test 1: Simple count query
    const firmaCount = await prisma.firmalar.count();
    console.log('✅ Firmalar count:', firmaCount);
    
    // Test 2: Environment variables check
    const dbUrl = process.env.DATABASE_URL;
    const hasDbUrl = !!dbUrl;
    const dbUrlStartsWith = dbUrl ? dbUrl.substring(0, 20) + '...' : 'MISSING';
    
    // Test 3: Admin table access
    const adminCount = await prisma.admins.count();
    console.log('✅ Admins count:', adminCount);
    
    // Test 4: Prisma client status
    const prismaStatus = 'Connected and operational';
    
    return NextResponse.json({
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      tests: {
        databaseConnection: 'WORKING',
        firmaCount,
        adminCount,
        environmentVariables: {
          DATABASE_URL: hasDbUrl ? 'PRESENT' : 'MISSING',
          databaseUrlPrefix: dbUrlStartsWith,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'PRESENT' : 'MISSING',
          NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT_SET'
        },
        prismaClient: prismaStatus
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    
    return NextResponse.json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
        name: error instanceof Error ? error.name : 'UnknownError',
        // Only include stack in development
        ...(process.env.NODE_ENV === 'development' && {
          stack: error instanceof Error ? error.stack : undefined
        })
      },
      environmentVariables: {
        DATABASE_URL: process.env.DATABASE_URL ? 'PRESENT' : 'MISSING',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'PRESENT' : 'MISSING',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT_SET'
      }
    }, { status: 500 });
  }
}