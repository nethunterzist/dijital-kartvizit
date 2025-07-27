import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    // Database bağlantısını test et
    await prisma.$connect();
    
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
      
      return NextResponse.json({
        status: 'healthy',
        message: 'Database connected and default admin created',
        adminCount: 1,
        timestamp: new Date().toISOString()
      });
    }
    
    return NextResponse.json({
      status: 'healthy',
      message: 'Database connected',
      adminCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database health check error:', error);
    return NextResponse.json({
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
