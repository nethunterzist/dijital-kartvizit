import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Firmalar API çağrısı...');
    
    // Get all firmalar for admin panel
    const firmalar = await prisma.firmalar.findMany({
      select: {
        id: true,
        firma_adi: true,
        slug: true,
        yetkili_adi: true,
        yetkili_pozisyon: true,
        template_id: true,
        onay: true,
        goruntulenme: true,
        created_at: true,
        updated_at: true
      },
      orderBy: { created_at: 'desc' }
    });
    
    console.log('✅ Firmalar fetched:', firmalar.length);
    
    return NextResponse.json({
      data: firmalar,
      pagination: {
        page: 1,
        limit: 1000,
        total: firmalar.length,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
      },
      meta: {
        count: firmalar.length,
        search: null,
        cached: false,
        fetchTime: new Date().toISOString()
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('❌ Firmalar API hatası:', error);
    
    return NextResponse.json({
      error: { message: 'Firmalar getirilirken hata oluştu' }
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 POST firmalar çağrısı...');
    
    const data = await request.json();
    console.log('📋 POST data keys:', Object.keys(data));

    // Basit firma oluşturma
    const newFirma = await prisma.firmalar.create({
      data: {
        firma_adi: data.firma_adi || data.firmaAdi,
        slug: data.slug,
        yetkili_adi: data.yetkili_adi || data.yetkiliAdi || null,
        yetkili_pozisyon: data.yetkili_pozisyon || data.yetkiliPozisyon || null,
        template_id: data.template_id || data.templateId ? parseInt(data.template_id || data.templateId) : 1,
        onay: false,
        goruntulenme: 0
      }
    });

    console.log('✅ Firma oluşturuldu:', newFirma.id);

    return NextResponse.json({ 
      message: 'Firma başarıyla oluşturuldu', 
      data: newFirma 
    });
    
  } catch (error) {
    console.error('❌ Firma oluşturma hatası:', error);
    return NextResponse.json({
      error: { message: 'Firma oluşturulurken hata oluştu' }
    }, { status: 500 });
  }
}