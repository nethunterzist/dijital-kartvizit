#!/usr/bin/env node

/**
 * Health Check Script
 *
 * Verifies that the application and all services are healthy.
 * Can be used for:
 * - Local development verification
 * - CI/CD pipeline checks
 * - Docker healthcheck
 * - Monitoring system integration
 *
 * Usage:
 *   node scripts/health-check.js
 *   node scripts/health-check.js --url=https://your-domain.com
 */

const http = require('http');
const https = require('https');

// Configuration
const args = process.argv.slice(2);
const urlArg = args.find(arg => arg.startsWith('--url='));
const baseUrl = urlArg ? urlArg.split('=')[1] : 'http://localhost:3000';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Helper function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const startTime = Date.now();

    const req = lib.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const duration = Date.now() - startTime;
        try {
          const json = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            data: json,
            duration,
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            data: data,
            duration,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Print colored message
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Print health status
function printHealthStatus(status, label) {
  const symbol = status === 'healthy' ? '✓' : status === 'degraded' ? '⚠' : '✗';
  const color = status === 'healthy' ? 'green' : status === 'degraded' ? 'yellow' : 'red';
  log(`  ${symbol} ${label}: ${status}`, color);
}

// Main health check function
async function runHealthCheck() {
  log('\n=== Digital Business Card Health Check ===\n', 'blue');
  log(`Checking: ${baseUrl}\n`, 'blue');

  let allHealthy = true;

  try {
    // 1. Check main health endpoint
    log('1. Checking main health endpoint...', 'blue');
    const healthUrl = `${baseUrl}/api/health`;

    try {
      const health = await makeRequest(healthUrl);

      if (health.statusCode === 200) {
        const data = health.data;

        log(`   Status Code: ${health.statusCode}`, 'green');
        log(`   Response Time: ${health.duration}ms`, health.duration > 1000 ? 'yellow' : 'green');

        if (data.status) {
          printHealthStatus(data.status, 'Overall Status');
        }

        if (data.services) {
          log('\n   Service Status:', 'blue');
          if (data.services.database) {
            printHealthStatus(data.services.database.status, 'Database');
            if (data.services.database.responseTime) {
              log(`     Response Time: ${data.services.database.responseTime}ms`,
                data.services.database.responseTime > 500 ? 'yellow' : 'green');
            }
          }

          if (data.services.cache) {
            printHealthStatus(data.services.cache.status, 'Cache');
            if (data.services.cache.responseTime) {
              log(`     Response Time: ${data.services.cache.responseTime}ms`,
                data.services.cache.responseTime > 200 ? 'yellow' : 'green');
            }
          }
        }

        if (data.metrics) {
          log('\n   System Metrics:', 'blue');
          if (data.metrics.memory) {
            const memPercent = data.metrics.memory.percentage;
            log(`     Memory Usage: ${data.metrics.memory.used}MB / ${data.metrics.memory.total}MB (${memPercent}%)`,
              memPercent > 80 ? 'red' : memPercent > 60 ? 'yellow' : 'green');
          }
          if (data.metrics.nodejs) {
            log(`     Node.js Version: ${data.metrics.nodejs.version}`, 'green');
            log(`     Uptime: ${Math.floor(data.metrics.nodejs.uptime / 60)} minutes`, 'green');
          }
        }

        if (data.status !== 'healthy') {
          allHealthy = false;
        }
      } else {
        log(`   Status Code: ${health.statusCode}`, 'red');
        log(`   Health check returned non-200 status`, 'red');
        allHealthy = false;
      }
    } catch (error) {
      log(`   Error: ${error.message}`, 'red');
      allHealthy = false;
    }

    // 2. Check if server is responding
    log('\n2. Checking API availability...', 'blue');
    try {
      const apiCheck = await makeRequest(`${baseUrl}/api/health`);
      if (apiCheck.statusCode === 200) {
        log('   ✓ API is accessible', 'green');
      } else {
        log(`   ✗ API returned status ${apiCheck.statusCode}`, 'red');
        allHealthy = false;
      }
    } catch (error) {
      log(`   ✗ API is not accessible: ${error.message}`, 'red');
      allHealthy = false;
    }

    // 3. Check metrics endpoint (if API key available)
    if (process.env.METRICS_API_KEY) {
      log('\n3. Checking metrics endpoint...', 'blue');
      try {
        const metricsUrl = `${baseUrl}/api/metrics`;
        const metricsRequest = await makeRequest(metricsUrl);

        if (metricsRequest.statusCode === 200) {
          log('   ✓ Metrics endpoint is accessible', 'green');
          const metrics = metricsRequest.data;

          if (metrics.application) {
            log('\n   Application Metrics:', 'blue');
            if (metrics.application.totalUsers !== undefined) {
              log(`     Total Users: ${metrics.application.totalUsers}`, 'green');
            }
            if (metrics.application.totalPages !== undefined) {
              log(`     Total Pages: ${metrics.application.totalPages}`, 'green');
            }
            if (metrics.application.activeSessionsLast24h !== undefined) {
              log(`     Active Sessions (24h): ${metrics.application.activeSessionsLast24h}`, 'green');
            }
          }
        } else {
          log(`   ⚠ Metrics endpoint returned status ${metricsRequest.statusCode}`, 'yellow');
        }
      } catch (error) {
        log(`   ⚠ Metrics endpoint check skipped: ${error.message}`, 'yellow');
      }
    } else {
      log('\n3. Metrics check skipped (METRICS_API_KEY not set)', 'yellow');
    }

    // Final summary
    log('\n=== Health Check Summary ===\n', 'blue');

    if (allHealthy) {
      log('✓ All systems operational', 'green');
      log('\nHealth check PASSED\n', 'green');
      process.exit(0);
    } else {
      log('✗ Some systems are unhealthy', 'red');
      log('\nHealth check FAILED\n', 'red');
      process.exit(1);
    }

  } catch (error) {
    log(`\nFatal error during health check: ${error.message}`, 'red');
    log('\nHealth check FAILED\n', 'red');
    process.exit(1);
  }
}

// Run health check
runHealthCheck().catch((error) => {
  log(`\nUnexpected error: ${error.message}`, 'red');
  process.exit(1);
});
