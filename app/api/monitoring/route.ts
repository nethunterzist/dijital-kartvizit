import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseHealth } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';
import { incrementRequestCounter, incrementErrorCounter, getMetricsCache } from '@/app/lib/monitoring';

// System metrics interface
interface SystemMetrics {
  timestamp: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  cpu: {
    usage: number;
  };
  database: {
    status: string;
    responseTime: string;
  };
  requests: {
    total: number;
    errors: number;
    errorRate: number;
  };
  alerts: Array<{
    level: 'warning' | 'error' | 'critical';
    message: string;
    timestamp: string;
  }>;
}

// Get system metrics
async function getSystemMetrics(): Promise<SystemMetrics> {
  const timestamp = new Date().toISOString();
  
  // Memory metrics
  const memoryUsage = process.memoryUsage();
  const memoryUsed = Math.round(memoryUsage.heapUsed / 1024 / 1024);
  const memoryTotal = Math.round(memoryUsage.heapTotal / 1024 / 1024);
  const memoryPercentage = Math.round((memoryUsed / memoryTotal) * 100);

  // Database health
  const dbHealth = await getDatabaseHealth();

  // Request metrics
  const metricsCache = getMetricsCache();
  const errorRate = metricsCache.requests.total > 0
    ? Math.round((metricsCache.requests.errors / metricsCache.requests.total) * 100)
    : 0;

  // Generate alerts based on thresholds
  const alerts: SystemMetrics['alerts'] = [];

  // Memory alerts
  if (memoryPercentage > 90) {
    alerts.push({
      level: 'critical',
      message: `Memory usage critical: ${memoryPercentage}%`,
      timestamp
    });
  } else if (memoryPercentage > 80) {
    alerts.push({
      level: 'warning',
      message: `Memory usage high: ${memoryPercentage}%`,
      timestamp
    });
  }

  // Database alerts
  if (dbHealth.status === 'unhealthy') {
    alerts.push({
      level: 'critical',
      message: 'Database connection failed',
      timestamp
    });
  } else if (dbHealth.responseTime && parseInt(dbHealth.responseTime) > 1000) {
    alerts.push({
      level: 'warning',
      message: `Database slow response: ${dbHealth.responseTime}`,
      timestamp
    });
  }

  // Error rate alerts
  if (errorRate > 5) {
    alerts.push({
      level: 'error',
      message: `High error rate: ${errorRate}%`,
      timestamp
    });
  }

  // Uptime alerts
  const uptimeHours = process.uptime() / 3600;
  if (uptimeHours < 0.1) { // Less than 6 minutes (recent restart)
    alerts.push({
      level: 'warning',
      message: 'Application recently restarted',
      timestamp
    });
  }

  return {
    timestamp,
    uptime: Math.round(process.uptime()),
    memory: {
      used: memoryUsed,
      total: memoryTotal,
      percentage: memoryPercentage
    },
    cpu: {
      usage: Math.round(Math.random() * 100) // Placeholder - implement real CPU monitoring
    },
    database: {
      status: dbHealth.status,
      responseTime: dbHealth.responseTime || 'unknown'
    },
    requests: {
      total: metricsCache.requests.total,
      errors: metricsCache.requests.errors,
      errorRate
    },
    alerts
  };
}

// Check if system is healthy based on metrics
function isSystemHealthy(metrics: SystemMetrics): boolean {
  // Critical conditions that mark system as unhealthy
  const criticalAlerts = metrics.alerts.filter(alert => alert.level === 'critical');
  
  return criticalAlerts.length === 0 && 
         metrics.memory.percentage < 95 && 
         metrics.database.status === 'healthy' &&
         metrics.requests.errorRate < 10;
}

// Send alerts to external services
async function sendAlerts(alerts: SystemMetrics['alerts']) {
  if (alerts.length === 0) return;

  const criticalAlerts = alerts.filter(alert => alert.level === 'critical');
  const errorAlerts = alerts.filter(alert => alert.level === 'error');
  
  // Log all alerts
  alerts.forEach(alert => {
    logger.warn(`System Alert [${alert.level.toUpperCase()}]: ${alert.message}`);
  });

  // Send critical alerts to webhook if configured
  if (criticalAlerts.length > 0 && process.env.ALERT_WEBHOOK_URL) {
    try {
      await fetch(process.env.ALERT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          level: 'critical',
          alerts: criticalAlerts,
          environment: process.env.NODE_ENV,
          service: 'dijital-kartvizit'
        }),
      });
    } catch (error) {
      logger.error('Failed to send critical alert webhook', { error });
    }
  }

  // Send to Slack/Discord if configured
  if (process.env.SLACK_WEBHOOK_URL && (criticalAlerts.length > 0 || errorAlerts.length > 0)) {
    try {
      const alertText = alerts
        .filter(alert => alert.level === 'critical' || alert.level === 'error')
        .map(alert => `🚨 *${alert.level.toUpperCase()}*: ${alert.message}`)
        .join('\n');

      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `🔴 System Alert - Dijital Kartvizit\n\n${alertText}\n\n*Time*: ${new Date().toLocaleString()}`
        }),
      });
    } catch (error) {
      logger.error('Failed to send Slack alert', { error });
    }
  }
}

// GET endpoint for monitoring dashboard
export async function GET(req: NextRequest) {
  try {
    const metrics = await getSystemMetrics();
    const isHealthy = isSystemHealthy(metrics);

    // Send alerts if any
    if (metrics.alerts.length > 0) {
      await sendAlerts(metrics.alerts);
    }

    return NextResponse.json({
      status: isHealthy ? 'healthy' : 'degraded',
      metrics,
      summary: {
        healthy: isHealthy,
        alertCount: metrics.alerts.length,
        criticalAlertCount: metrics.alerts.filter(a => a.level === 'critical').length
      }
    }, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    logger.error('Monitoring endpoint error', { error });
    
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  }
}

// POST endpoint for external monitoring services to push metrics
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Validate request has required fields
    if (!data.type) {
      return NextResponse.json(
        { error: 'Missing required field: type' },
        { status: 400 }
      );
    }

    // Handle different metric types
    switch (data.type) {
      case 'request':
        incrementRequestCounter();
        break;
      case 'error':
        incrementErrorCounter();
        break;
      case 'custom':
        // Log custom metrics
        logger.info('Custom metric received', data);
        break;
      default:
        return NextResponse.json(
          { error: 'Unknown metric type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ 
      status: 'success',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Monitoring POST endpoint error', { error });
    
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// OPTIONS for CORS
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}