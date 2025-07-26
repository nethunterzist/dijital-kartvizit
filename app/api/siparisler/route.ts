import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { getTemplateById } from '@/app/lib/templates/templateRegistry';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      packageId,
      packageName,
      templateId,
      price,
      billingData,
      cardData
    } = body;

    // Sipariş numarası oluştur
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const orderNumber = `DK${timestamp}${random}`;

    // Template adını al
    const template = getTemplateById(templateId);
    const templateName = template?.name || `Template ${templateId}`;

    // Siparişi veritabanına kaydet
    const siparis = await prisma.siparisler.create({
      data: {
        siparis_no: orderNumber,
        paket_id: packageId,
        paket_adi: packageName,
        template_id: templateId,
        template_adi: templateName,
        tutar: price * 100, // Kuruş cinsinden
        
        // Fatura bilgileri
        fatura_adi: billingData.billingName,
        vergi_no: billingData.taxNumber || null,
        fatura_adresi: billingData.billingAddress,
        email: billingData.email,
        telefon: billingData.phone,
        
        // Kartvizit bilgileri
        firma_adi: cardData?.firmaAdi || null,
        yetkili_adi: cardData?.yetkiliAdi || null,
        yetkili_pozisyon: cardData?.yetkiliPozisyon || null,
        iletisim_telefon: cardData?.telefon || null,
        iletisim_eposta: cardData?.eposta || null,
        website: cardData?.website || null,
        instagram: cardData?.instagram || null,
        linkedin: cardData?.linkedin || null,
        facebook: cardData?.facebook || null,
        
        // Varsayılan durumlar
        durum: 'beklemede',
        odeme_durumu: 'beklemede'
      }
    });

    return NextResponse.json({
      success: true,
      orderNumber: siparis.siparis_no,
      orderId: siparis.id
    });

  } catch (error) {
    console.error('Sipariş oluşturma hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Sipariş oluşturulamadı' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const durum = searchParams.get('durum');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Filtreleme koşulları
    const where: any = {};
    
    if (durum && durum !== 'all') {
      where.durum = durum;
    }
    
    if (search) {
      where.OR = [
        { siparis_no: { contains: search, mode: 'insensitive' } },
        { fatura_adi: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { firma_adi: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Siparişleri getir
    const [siparisler, total] = await Promise.all([
      prisma.siparisler.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit
      }),
      prisma.siparisler.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: siparisler,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Sipariş listesi hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Siparişler getirilemedi' },
      { status: 500 }
    );
  }
}
