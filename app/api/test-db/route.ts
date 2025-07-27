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
        status: 'success',
        message: 'Database connected and default admin created',
        adminCount: 1
      });
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connected',
      adminCount
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
