import { logger } from './logger';

// Error tracking configuration
interface ErrorTrackingConfig {
  environment: string;
  userId?: string;
  sessionId?: string;
  version: string;
}

// Global error tracking class
class ErrorTracker {
  private config: ErrorTrackingConfig;
  private errorQueue: Array<any> = [];
  private isOnline: boolean = true;

  constructor(config: ErrorTrackingConfig) {
    this.config = config;
    this.setupGlobalHandlers();
    this.setupOnlineListener();
  }

  // Setup global error handlers
  private setupGlobalHandlers() {
    // Handle unhandled promise rejections
    if (typeof window !== 'undefined') {
      window.addEventListener('unhandledrejection', (event) => {
        this.captureError(event.reason, {
          type: 'unhandledrejection',
          url: window.location.href,
          userAgent: navigator.userAgent,
        });
      });

      // Handle JavaScript errors
      window.addEventListener('error', (event) => {
        this.captureError(event.error || new Error(event.message), {
          type: 'javascript',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          url: window.location.href,
        });
      });
    }

    // Handle Node.js unhandled rejections (server-side)
    if (typeof process !== 'undefined') {
      process.on('unhandledRejection', (reason, promise) => {
        this.captureError(reason instanceof Error ? reason : new Error(String(reason)), {
          type: 'unhandledRejection',
          promise: promise.toString(),
        });
      });

      process.on('uncaughtException', (error) => {
        this.captureError(error, {
          type: 'uncaughtException',
        });
      });
    }
  }

  // Setup online/offline listener
  private setupOnlineListener() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.flushErrorQueue();
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
      });
    }
  }

  // Capture error with context
  public captureError(error: Error | string, context: Record<string, any> = {}) {
    const errorData = {
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      environment: this.config.environment,
      userId: this.config.userId,
      sessionId: this.config.sessionId,
      version: this.config.version,
      context,
      fingerprint: this.generateFingerprint(error, context),
    };

    // Log to Winston logger
    logger.error('Error tracked', errorData);

    // Queue for external service if offline
    if (!this.isOnline) {
      this.errorQueue.push(errorData);
      this.saveToLocalStorage();
    } else {
      this.sendToExternalService(errorData);
    }
  }

  // Capture performance issues
  public capturePerformance(operation: string, duration: number, context: Record<string, any> = {}) {
    if (duration > 3000) { // Log operations taking more than 3 seconds
      const performanceData = {
        timestamp: new Date().toISOString(),
        type: 'performance',
        operation,
        duration,
        environment: this.config.environment,
        context,
      };

      logger.warn('Performance issue tracked', performanceData);
      this.sendToExternalService(performanceData);
    }
  }

  // Capture security events
  public captureSecurity(event: string, context: Record<string, any> = {}) {
    const securityData = {
      timestamp: new Date().toISOString(),
      type: 'security',
      event,
      environment: this.config.environment,
      userId: this.config.userId,
      context,
    };

    logger.securityEvent(event, context.ip || 'unknown', context);
    this.sendToExternalService(securityData);
  }

  // Generate error fingerprint for deduplication
  private generateFingerprint(error: Error | string, context: Record<string, any>): string {
    const message = error instanceof Error ? error.message : error;
    const type = context.type || 'unknown';
    return Buffer.from(`${type}:${message}`).toString('base64').substring(0, 16);
  }

  // Send to external error tracking service
  private async sendToExternalService(data: any) {
    try {
      // In a real implementation, you would send to services like:
      // - Sentry
      // - LogRocket
      // - Bugsnag
      // - Custom error tracking endpoint

      // For now, we'll just log and optionally send to a webhook
      if (process.env.ERROR_WEBHOOK_URL) {
        await fetch(process.env.ERROR_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
    } catch (error) {
      // Fail silently to avoid recursive errors - use basic console to prevent recursion
      console.error('Failed to send error to external service:', error);
    }
  }

  // Flush error queue when back online
  private async flushErrorQueue() {
    if (this.errorQueue.length === 0) return;

    const errors = [...this.errorQueue];
    this.errorQueue = [];

    for (const error of errors) {
      await this.sendToExternalService(error);
    }

    this.clearLocalStorage();
  }

  // Save errors to localStorage when offline
  private saveToLocalStorage() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('errorQueue', JSON.stringify(this.errorQueue));
      } catch (error) {
        // localStorage might be full or disabled
      }
    }
  }

  // Load errors from localStorage
  private loadFromLocalStorage() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('errorQueue');
        if (stored) {
          this.errorQueue = JSON.parse(stored);
        }
      } catch (error) {
        // Invalid JSON or localStorage disabled
      }
    }
  }

  // Clear localStorage
  private clearLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('errorQueue');
    }
  }

  // Update user context
  public setUser(userId: string) {
    this.config.userId = userId;
  }

  // Update session context
  public setSession(sessionId: string) {
    this.config.sessionId = sessionId;
  }

  // Manual error reporting with additional context
  public reportError(error: Error, context: Record<string, any> = {}) {
    this.captureError(error, {
      ...context,
      manual: true,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    });
  }

  // Report API errors with request context
  public reportAPIError(error: Error, request: {
    method: string;
    url: string;
    status?: number;
    responseTime?: number;
  }) {
    this.captureError(error, {
      type: 'api',
      ...request,
    });
  }

  // Report authentication errors
  public reportAuthError(error: Error, context: { email?: string; ip?: string }) {
    this.captureError(error, {
      type: 'authentication',
      ...context,
    });
  }
}

// Create singleton instance
let errorTracker: ErrorTracker | null = null;

export function initializeErrorTracking(config?: Partial<ErrorTrackingConfig>) {
  const defaultConfig: ErrorTrackingConfig = {
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    ...config,
  };

  errorTracker = new ErrorTracker(defaultConfig);
  return errorTracker;
}

export function getErrorTracker(): ErrorTracker {
  if (!errorTracker) {
    throw new Error('Error tracking not initialized. Call initializeErrorTracking() first.');
  }
  return errorTracker;
}

// Convenience functions
export function captureError(error: Error | string, context?: Record<string, any>) {
  getErrorTracker().captureError(error, context);
}

export function capturePerformance(operation: string, duration: number, context?: Record<string, any>) {
  getErrorTracker().capturePerformance(operation, duration, context);
}

export function captureSecurity(event: string, context?: Record<string, any>) {
  getErrorTracker().captureSecurity(event, context);
}

export function reportAPIError(error: Error, request: {
  method: string;
  url: string;
  status?: number;
  responseTime?: number;
}) {
  getErrorTracker().reportAPIError(error, request);
}

export function reportAuthError(error: Error, context: { email?: string; ip?: string }) {
  getErrorTracker().reportAuthError(error, context);
}

// React hook for error tracking
import { useEffect } from 'react';

export function useErrorTracking(userId?: string, sessionId?: string) {
  useEffect(() => {
    if (!errorTracker) {
      initializeErrorTracking();
    }

    if (userId) {
      getErrorTracker().setUser(userId);
    }

    if (sessionId) {
      getErrorTracker().setSession(sessionId);
    }
  }, [userId, sessionId]);

  return {
    captureError,
    capturePerformance,
    captureSecurity,
    reportAPIError,
    reportAuthError,
  };
}

export default ErrorTracker;