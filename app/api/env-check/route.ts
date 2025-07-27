import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const envVars = {
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
      SUPABASE_URL: process.env.SUPABASE_URL ? 'SET' : 'MISSING',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'SET' : 'MISSING',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'SET' : 'MISSING',
      NODE_ENV: process.env.NODE_ENV || 'UNKNOWN'
    };

    return NextResponse.json({
      status: 'SUCCESS',
      environment: envVars,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}