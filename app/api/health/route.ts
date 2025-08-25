import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    // Database bağlantısını test et
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    // Firma sayısını kontrol et
    const firmaCount = await prisma.firmalar.count();
    
    // Admin tablosunu kontrol et
    const adminCount = await prisma.admins.count();
    
    // Eğer admin yoksa, default admin oluştur
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await prisma.admins.create({
        data: {
          username: 'admin',
          password: hashedPassword
        }
      });
    }
    
    return NextResponse.json({
      status: 'healthy',
      message: 'Database connected',
      database: 'connected',
      firmaCount,
      adminCount: adminCount === 0 ? 1 : adminCount,
      environment: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL ? 'configured' : 'missing',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database health check error:', error);
    return NextResponse.json({
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Unknown error',
      database: 'disconnected',
      environment: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL ? 'configured' : 'missing',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
