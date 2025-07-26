import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
import { logger } from '@/app/lib/logger';

export interface AuthResult {
  isValid: boolean;
  session?: any;
  error?: string;
}

export class AuthService {
  /**
   * Validates user session for API requests
   * @param req NextRequest object
   * @returns AuthResult with validation status and session data
   */
  static async validateSession(req: NextRequest): Promise<AuthResult> {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session || !session.user) {
        logger.warn('Unauthorized API attempt', {
          ip: req.ip,
          userAgent: req.headers.get('user-agent'),
          url: req.url,
          method: req.method,
          timestamp: new Date().toISOString()
        });
        
        return {
          isValid: false,
          error: 'Bu işlem için giriş yapmanız gerekiyor'
        };
      }

      logger.info('Authenticated API request', {
        userId: session.user.id,
        username: session.user.name,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
      });

      return { 
        isValid: true, 
        session 
      };
    } catch (error) {
      logger.error('Authentication service error:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        url: req.url,
        method: req.method
      });
      
      return {
        isValid: false,
        error: 'Kimlik doğrulama hatası'
      };
    }
  }

  /**
   * Validates admin session for admin-only operations
   * @param req NextRequest object
   * @returns AuthResult with admin validation status
   */
  static async validateAdminSession(req: NextRequest): Promise<AuthResult> {
    const authResult = await this.validateSession(req);
    
    if (!authResult.isValid) {
      return authResult;
    }

    // Check if user has admin role (if role system is implemented)
    const session = authResult.session;
    if (session.user.role && session.user.role !== 'admin') {
      logger.warn('Non-admin user attempted admin operation', {
        userId: session.user.id,
        username: session.user.name,
        role: session.user.role,
        url: req.url,
        method: req.method
      });

      return {
        isValid: false,
        error: 'Bu işlem için admin yetkisi gerekiyor'
      };
    }

    return authResult;
  }

  /**
   * Logs authentication events for security monitoring
   * @param event Event type
   * @param req NextRequest object
   * @param additionalData Additional data to log
   */
  static logSecurityEvent(
    event: 'login_attempt' | 'logout' | 'unauthorized_access' | 'admin_action',
    req: NextRequest,
    additionalData?: Record<string, any>
  ): void {
    logger.info(`Security event: ${event}`, {
      event,
      ip: req.ip,
      userAgent: req.headers.get('user-agent'),
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString(),
      ...additionalData
    });
  }
}
