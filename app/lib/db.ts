import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Production-ready Prisma configuration
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty',
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Eksik fonksiyonları ekle
export async function getAllFirmalar() {
  return await prisma.firmalar.findMany({
    orderBy: {
      created_at: 'desc'
    }
  });
}

export async function ensureDatabaseIsReady() {
  try {
    await prisma.$connect();
    
    // Connection test query
    await prisma.$queryRaw`SELECT 1`;
    
    logger.info('✅ Database connection established and verified');
    return true;
  } catch (error) {
    logger.error('❌ Database connection failed', { error });
    return false;
  }
}

// Graceful shutdown handler
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    logger.info('✅ Database disconnected gracefully');
  } catch (error) {
    logger.error('❌ Database disconnect error', { error });
  }
}

// Health check for monitoring
export async function getDatabaseHealth() {
  try {
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const responseTime = Date.now() - start;
    
    return {
      status: 'healthy',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
  }
}

export default prisma;
