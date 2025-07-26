import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseHealth } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';

export async function GET(req: NextRequest) {
  try {
    // Database health check
    const dbHealth = await getDatabaseHealth();
    
    // System information
    const systemInfo = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
      node: process.version,
      environment: process.env.NODE_ENV,
    };

    // Overall health status
    const isHealthy = dbHealth.status === 'healthy';
    
    const response = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: systemInfo.timestamp,
      services: {
        database: dbHealth,
        system: systemInfo,
      },
      version: '1.0.0',
    };

    return NextResponse.json(response, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    logger.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { 
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// OPTIONS için CORS
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}