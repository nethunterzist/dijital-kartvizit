import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

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
    console.log('Database connection established');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

export default prisma;
