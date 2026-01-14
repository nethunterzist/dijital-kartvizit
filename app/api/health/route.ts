import { NextRequest, NextResponse } from 'next/server';

// API route - dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { prisma } from '@/app/lib/db';
import bcrypt from 'bcrypt';
import { logger } from '@/app/lib/logger';

/**
 * Enhanced Health Check Endpoint
 *
 * Provides comprehensive system health status including:
 * - Database connectivity
 * - Database query performance
 * - Basic data integrity checks
 * - Environment configuration validation
 *
 * Used by:
 * - Docker HEALTHCHECK
 * - Load balancers
 * - Monitoring systems
 * - CI/CD pipelines
 */

interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy' | 'degraded';
  message: string;
  timestamp: string;
  environment: string;
  checks: {
    database: {
      status: 'connected' | 'disconnected' | 'slow';
      latency?: number;
      error?: string;
    };
    configuration: {
      status: 'ok' | 'missing';
      details: {
        databaseUrl: boolean;
        nodeEnv: string;
      };
    };
    data: {
      firmaCount?: number;
      adminCount?: number;
    };
  };
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Test 1: Database Connection & Query Performance
    const dbStartTime = Date.now();
    const dbTestResult = await prisma.$queryRaw`SELECT 1 as test`;
    const dbLatency = Date.now() - dbStartTime;

    // Test 2: Basic Data Integrity
    const [firmaCount, adminCount] = await Promise.all([
      prisma.firmalar.count(),
      prisma.admins.count(),
    ]);

    // Test 3: Auto-create default admin if missing (PRODUCTION WARNING)
    if (adminCount === 0) {
      const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD;

      if (!defaultPassword) {
        logger.warn('No admin user exists and DEFAULT_ADMIN_PASSWORD not set. Set DEFAULT_ADMIN_PASSWORD env var to auto-create admin.');
      } else {
        try {
          const hashedPassword = await bcrypt.hash(defaultPassword, 10);

          await prisma.admins.create({
            data: {
              username: 'admin',
              password: hashedPassword
            }
          });

          logger.securityEvent('Default admin created', 'system', {
            message: 'Change password immediately after first login'
          });
        } catch (adminCreateError) {
          logger.warn('Failed to create default admin', {
            error: adminCreateError instanceof Error ? adminCreateError.message : 'Unknown error'
          });
          // Non-critical error, don't fail health check
        }
      }
    }

    // Determine health status based on database latency
    const dbStatus = dbLatency > 1000 ? 'slow' : 'connected';
    const overallStatus = dbLatency > 1000 ? 'degraded' : 'healthy';

    const response: HealthCheckResponse = {
      status: overallStatus,
      message: overallStatus === 'healthy'
        ? 'All systems operational'
        : 'System operational but database response is slow',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      checks: {
        database: {
          status: dbStatus,
          latency: dbLatency,
        },
        configuration: {
          status: 'ok',
          details: {
            databaseUrl: !!process.env.DATABASE_URL,
            nodeEnv: process.env.NODE_ENV || 'unknown',
          },
        },
        data: {
          firmaCount,
          adminCount: adminCount === 0 ? 1 : adminCount,
        },
      },
    };

    // Return appropriate HTTP status code
    const httpStatus = overallStatus === 'healthy' ? 200 :
                      overallStatus === 'degraded' ? 200 : 500;

    return NextResponse.json(response, { status: httpStatus });

  } catch (error) {
    logger.error('Health check failed', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    const errorResponse: HealthCheckResponse = {
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      checks: {
        database: {
          status: 'disconnected',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        configuration: {
          status: process.env.DATABASE_URL ? 'ok' : 'missing',
          details: {
            databaseUrl: !!process.env.DATABASE_URL,
            nodeEnv: process.env.NODE_ENV || 'unknown',
          },
        },
        data: {},
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * HEAD method for lightweight health checks
 * Returns only HTTP status code without body
 */
export async function HEAD() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return new NextResponse(null, { status: 200 });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
