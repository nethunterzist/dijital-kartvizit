import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Debug firmalar API çağrısı');
    
    // Önce basit response
    return NextResponse.json({
      status: 'BASIC_SUCCESS',
      message: 'Debug API çalışıyor',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Debug API hatası:', error);
    
    return NextResponse.json({
      status: 'ERROR',
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }
    }, { status: 500 });
  }
}