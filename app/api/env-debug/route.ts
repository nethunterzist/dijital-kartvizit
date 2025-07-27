import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      environment: process.env.NODE_ENV,
      hasDatabase: !!process.env.DATABASE_URL,
      databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
      vercelUrl: process.env.VERCEL_URL || 'NOT_SET',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}