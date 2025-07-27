import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET(req: NextRequest) {
  try {
    console.log('🔍 Firmalar API çağrısı alındı');
    
    const { searchParams } = new URL(req.url);
    
    // Parse parameters
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(1000, Math.max(1, parseInt(searchParams.get('limit') || '1000')));
    const search = searchParams.get('search')?.trim() || undefined;

    console.log('💾 Fetching firmalar from database', { page, limit, search });
    
    const skip = (page - 1) * limit;
    const whereClause = search ? {
      OR: [
        { firma_adi: { contains: search, mode: 'insensitive' as const } },
        { slug: { contains: search, mode: 'insensitive' as const } },
        { yetkili_adi: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    // Parallel database queries
    const [firmalar, totalCount] = await Promise.all([
      prisma.firmalar.findMany({
        where: whereClause,
        skip,
        take: limit,
        select: {
          id: true,
          firma_adi: true,
          slug: true,
          profil_foto: true,
          firma_logo: true,
          yetkili_adi: true,
          yetkili_pozisyon: true,
          created_at: true,
          updated_at: true,
          goruntulenme: true,
          template_id: true,
          onay: true,
        },
        orderBy: { created_at: 'desc' }
      }),
      prisma.firmalar.count({ where: whereClause })
    ]);

    // Transform data
    const transformedFirmalar = firmalar.map(firma => ({
      ...firma,
      goruntulenme: firma.goruntulenme || 0,
    }));

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const responseData = {
      data: transformedFirmalar,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage
      },
      meta: {
        count: firmalar.length,
        search: search || null,
        cached: false,
        fetchTime: new Date().toISOString()
      }
    };

    console.log('✅ Database query completed', {
      page,
      limit,
      search,
      resultCount: firmalar.length,
      totalCount
    });

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('❌ Firmalar getirilirken hata:', error);
    return NextResponse.json({
      error: { message: 'Firmalar getirilirken bir hata oluştu' }
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('🔍 POST firmalar çağrısı alındı');
    
    const data = await req.json();
    console.log('📋 Alınan data:', Object.keys(data));

    // Basit firma oluşturma
    const newFirma = await prisma.firmalar.create({
      data: {
        firma_adi: data.firma_adi || data.firmaAdi,
        slug: data.slug,
        yetkili_adi: data.yetkili_adi || data.yetkiliAdi,
        yetkili_pozisyon: data.yetkili_pozisyon || data.yetkiliPozisyon,
        template_id: data.template_id || data.templateId ? parseInt(data.template_id || data.templateId) : 1,
        onay: false,
        goruntulenme: 0
      }
    });

    console.log('✅ Firma başarıyla oluşturuldu:', newFirma.id);

    return NextResponse.json({ 
      message: 'Firma başarıyla oluşturuldu', 
      data: newFirma 
    });
    
  } catch (error) {
    console.error('❌ Firma oluşturulurken hata:', error);
    return NextResponse.json({
      error: { message: 'Firma oluşturulurken bir hata oluştu' }
    }, { status: 500 });
  }
}