// Browser-safe logger with server-side Winston support
// Client-side (browser): Simple console logger
// Server-side (Node.js): Winston logger with full features

const isBrowser = typeof window !== 'undefined';
const isDevelopment = process.env.NODE_ENV === 'development';

// Simple browser-safe logger for client-side
const createSimpleLogger = () => {
  const log = (level: string, message: string, meta?: any) => {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}${metaStr}`;

    // Use appropriate console method
    if (level === 'error') console.error(logMessage);
    else if (level === 'warn') console.warn(logMessage);
    else if (level === 'debug' && isDevelopment) console.debug(logMessage);
    else console.log(logMessage);
  };

  return {
    error: (message: string, meta?: any) => log('error', message, meta),
    warn: (message: string, meta?: any) => log('warn', message, meta),
    info: (message: string, meta?: any) => log('info', message, meta),
    http: (message: string, meta?: any) => log('http', message, meta),
    debug: (message: string, meta?: any) => {
      if (isDevelopment) log('debug', message, meta);
    },
  };
};

// Winston logger for server-side only (lazy-loaded)
let winstonLogger: any = null;
const getWinstonLogger = () => {
  if (winstonLogger) return winstonLogger;

  // Only import Winston on server-side
  if (!isBrowser) {
    try {
      const winston = require('winston');
      const logLevel = process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info');

      winstonLogger = winston.createLogger({
        level: logLevel,
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.errors({ stack: true }),
          winston.format.json()
        ),
        defaultMeta: { service: 'dijital-kartvizit' },
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.printf(({ timestamp, level, message, ...meta }: any) => {
                const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
                return `[${timestamp}] ${level}: ${message}${metaStr}`;
              })
            ),
          }),
        ],
      });
      return winstonLogger;
    } catch (error) {
      console.warn('Winston logger initialization failed, using simple logger:', error);
      return createSimpleLogger();
    }
  }

  return createSimpleLogger();
};

// Use simple logger for browser, Winston for server
const Logger = isBrowser ? createSimpleLogger() : getWinstonLogger();

// Custom logging functions
export const logger = {
  error: (message: string, meta?: any) => {
    Logger.error(message, meta);
  },
  
  warn: (message: string, meta?: any) => {
    Logger.warn(message, meta);
  },
  
  info: (message: string, meta?: any) => {
    Logger.info(message, meta);
  },
  
  http: (message: string, meta?: any) => {
    Logger.http(message, meta);
  },
  
  debug: (message: string, meta?: any) => {
    Logger.debug(message, meta);
  },
  
  // API specific logging
  apiRequest: (method: string, url: string, ip: string, userAgent?: string) => {
    Logger.http(`${method} ${url}`, {
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
    });
  },
  
  apiResponse: (method: string, url: string, statusCode: number, responseTime: number) => {
    Logger.http(`${method} ${url} - ${statusCode} - ${responseTime}ms`);
  },
  
  apiError: (method: string, url: string, error: Error, ip: string) => {
    Logger.error(`${method} ${url} - ${error.message}`, {
      error: error.stack,
      ip,
      timestamp: new Date().toISOString(),
    });
  },
  
  // Database logging
  dbQuery: (query: string, duration?: number) => {
    Logger.debug(`DB Query: ${query}${duration ? ` (${duration}ms)` : ''}`);
  },
  
  dbError: (query: string, error: Error) => {
    Logger.error(`DB Error: ${query}`, {
      error: error.message,
      stack: error.stack,
    });
  },
  
  // Security logging
  securityEvent: (event: string, ip: string, details?: any) => {
    Logger.warn(`Security Event: ${event}`, {
      ip,
      details,
      timestamp: new Date().toISOString(),
    });
  },
  
  // Authentication logging
  authSuccess: (userId: string, ip: string) => {
    Logger.info(`Auth Success: User ${userId}`, { ip });
  },
  
  authFailure: (email: string, ip: string, reason: string) => {
    Logger.warn(`Auth Failure: ${email} - ${reason}`, { ip });
  },
  
  // File operations
  fileUpload: (filename: string, size: number, userId?: string) => {
    Logger.info(`File Upload: ${filename} (${size} bytes)`, { userId });
  },
  
  fileError: (filename: string, error: Error, userId?: string) => {
    Logger.error(`File Error: ${filename} - ${error.message}`, { userId });
  },
};

// Middleware for request logging
export function createRequestLogger() {
  return (req: any, res: any, next: any) => {
    const start = Date.now();
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    logger.apiRequest(req.method, req.originalUrl, ip, userAgent);
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.apiResponse(req.method, req.originalUrl, res.statusCode, duration);
    });
    
    next();
  };
}

// Error logging helper
export function logError(error: Error, context?: string, metadata?: any) {
  const message = context ? `${context}: ${error.message}` : error.message;
  logger.error(message, {
    stack: error.stack,
    ...metadata,
  });
}

// Performance logging
export function logPerformance(operation: string, duration: number, metadata?: any) {
  if (duration > 1000) { // Log slow operations (>1s)
    logger.warn(`Slow Operation: ${operation} took ${duration}ms`, metadata);
  } else {
    logger.debug(`Performance: ${operation} took ${duration}ms`, metadata);
  }
}

// Rate limit logging
export function logRateLimit(ip: string, endpoint: string, limit: number) {
  logger.securityEvent('Rate Limit Exceeded', ip, {
    endpoint,
    limit,
  });
}

export default logger;
