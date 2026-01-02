// Monitoring utilities

// In-memory metrics storage (in production, use Redis or external service)
let metricsCache: {
  requests: { total: number; errors: number; lastReset: number };
} = {
  requests: { total: 0, errors: 0, lastReset: Date.now() }
};

// Increment request counter
export function incrementRequestCounter() {
  metricsCache.requests.total++;
}

// Increment error counter
export function incrementErrorCounter() {
  metricsCache.requests.errors++;
}

// Get metrics cache
export function getMetricsCache() {
  return metricsCache;
}

// Reset metrics cache
export function resetMetricsCache() {
  metricsCache = { requests: { total: 0, errors: 0, lastReset: Date.now() } };
}
