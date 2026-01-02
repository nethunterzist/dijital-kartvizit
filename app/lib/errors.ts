/**
 * Custom Error Classes for Dijital Kartvizit Application
 *
 * Provides structured error handling with:
 * - HTTP status codes
 * - Error codes for client-side handling
 * - Detailed error information
 * - Production-safe error messages
 */

/**
 * Base Application Error
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Convert error to JSON response format
   */
  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
      },
    };
  }

  /**
   * Get production-safe error message
   */
  getPublicMessage(): string {
    return this.isOperational ? this.message : 'Bir hata oluştu';
  }
}

/**
 * Validation Error (400 Bad Request)
 */
export class ValidationError extends AppError {
  public readonly errors: any;

  constructor(message: string = 'Validation failed', errors?: any) {
    super(message, 400, 'VALIDATION_ERROR', true);
    this.errors = errors;
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
        details: this.errors,
      },
    };
  }
}

/**
 * Authentication Error (401 Unauthorized)
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Kimlik doğrulama başarısız') {
    super(message, 401, 'AUTHENTICATION_ERROR', true);
  }
}

/**
 * Authorization Error (403 Forbidden)
 */
export class AuthorizationError extends AppError {
  constructor(message: string = 'Bu işlem için yetkiniz yok') {
    super(message, 403, 'AUTHORIZATION_ERROR', true);
  }
}

/**
 * Not Found Error (404 Not Found)
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Kayıt bulunamadı', resource?: string) {
    const finalMessage = resource ? `${resource} bulunamadı` : message;
    super(finalMessage, 404, 'NOT_FOUND', true);
  }
}

/**
 * Conflict Error (409 Conflict)
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Kayıt zaten mevcut', resource?: string) {
    const finalMessage = resource ? `${resource} zaten mevcut` : message;
    super(finalMessage, 409, 'CONFLICT', true);
  }
}

/**
 * Rate Limit Error (429 Too Many Requests)
 */
export class RateLimitError extends AppError {
  constructor(message: string = 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED', true);
  }
}

/**
 * Database Error (500 Internal Server Error)
 */
export class DatabaseError extends AppError {
  constructor(message: string = 'Veritabanı hatası', originalError?: Error) {
    super(message, 500, 'DATABASE_ERROR', true);

    // Store original error for logging
    if (originalError) {
      this.stack = originalError.stack;
    }
  }

  getPublicMessage(): string {
    return 'Veritabanı işlemi başarısız oldu';
  }
}

/**
 * File Upload Error (400 Bad Request)
 */
export class FileUploadError extends AppError {
  constructor(message: string = 'Dosya yükleme hatası', details?: any) {
    super(message, 400, 'FILE_UPLOAD_ERROR', true);
  }
}

/**
 * External Service Error (502 Bad Gateway)
 */
export class ExternalServiceError extends AppError {
  public readonly service: string;

  constructor(message: string = 'Harici servis hatası', service: string = 'unknown') {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR', true);
    this.service = service;
  }

  getPublicMessage(): string {
    return 'Harici servis ile iletişim kurulamadı';
  }
}

/**
 * Error Response Builder
 */
export class ErrorResponse {
  /**
   * Build error response for API
   */
  static build(error: Error | AppError, includeStack: boolean = false) {
    if (error instanceof AppError) {
      const response = error.toJSON();

      // Include stack trace in development
      if (includeStack && process.env.NODE_ENV === 'development') {
        return {
          error: {
            ...response.error,
            stack: error.stack,
          },
        };
      }

      return response;
    }

    // Handle unknown errors
    const isDevelopment = process.env.NODE_ENV === 'development';

    return {
      error: {
        message: isDevelopment ? error.message : 'Bir hata oluştu',
        code: 'INTERNAL_ERROR',
        statusCode: 500,
        ...(isDevelopment && includeStack && { stack: error.stack }),
      },
    };
  }

  /**
   * Get HTTP status code from error
   */
  static getStatusCode(error: Error | AppError): number {
    if (error instanceof AppError) {
      return error.statusCode;
    }
    return 500;
  }

  /**
   * Check if error is operational (safe to expose to client)
   */
  static isOperational(error: Error | AppError): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}

/**
 * Error Formatter Utilities
 */
export const ErrorFormatter = {
  /**
   * Format Zod validation errors
   */
  formatZodError(error: any) {
    if (!error.errors) return null;

    const formatted: Record<string, string[]> = {};

    error.errors.forEach((err: any) => {
      const field = err.path.join('.');
      if (!formatted[field]) {
        formatted[field] = [];
      }
      formatted[field].push(err.message);
    });

    return formatted;
  },

  /**
   * Format database constraint errors
   */
  formatDatabaseError(error: any) {
    // PostgreSQL error codes
    const errorCode = error.code;

    switch (errorCode) {
      case '23505': // Unique violation
        return new ConflictError('Bu kayıt zaten mevcut');

      case '23503': // Foreign key violation
        return new ValidationError('İlişkili kayıt bulunamadı');

      case '23502': // Not null violation
        return new ValidationError('Gerekli alanlar eksik');

      case '22P02': // Invalid text representation
        return new ValidationError('Geçersiz veri formatı');

      default:
        return new DatabaseError('Veritabanı işlemi başarısız oldu', error);
    }
  },
};

/**
 * Helper function to check if error is AppError
 */
export function isAppError(error: any): error is AppError {
  return error instanceof AppError;
}

/**
 * Helper function to create error response
 */
export function createErrorResponse(error: Error | AppError, includeStack = false) {
  return ErrorResponse.build(error, includeStack);
}

/**
 * Helper function to get status code from error
 */
export function getErrorStatusCode(error: Error | AppError): number {
  return ErrorResponse.getStatusCode(error);
}

/**
 * Helper function to create Next.js error response
 * Used by API routes to return proper error responses
 */
export function errorResponse(error: any) {
  const { NextResponse } = require('next/server');

  // Handle Zod validation errors
  if (error.name === 'ZodError') {
    const formatted = ErrorFormatter.formatZodError(error);
    return NextResponse.json({
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        statusCode: 400,
        details: formatted
      }
    }, { status: 400 });
  }

  // Handle AppError instances
  if (error instanceof AppError) {
    return NextResponse.json(error.toJSON(), { status: error.statusCode });
  }

  // Handle unknown errors
  const isDevelopment = process.env.NODE_ENV === 'development';
  return NextResponse.json({
    error: {
      message: isDevelopment ? error.message : 'Bir hata oluştu',
      code: 'INTERNAL_ERROR',
      statusCode: 500,
      ...(isDevelopment && { stack: error.stack })
    }
  }, { status: 500 });
}
