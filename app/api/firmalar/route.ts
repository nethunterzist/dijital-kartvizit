import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/app/lib/logger';
import prisma from '@/app/lib/db';

// API yanıt helper fonksiyonları
function successResponse(data: any, message?: string, status = 200) {
  return NextResponse.json({ data, message }, { status });
}

function errorResponse(message: string, code?: string, details?: any, status = 400) {
  return NextResponse.json({ 
    error: { message, code, details } 
  }, { status });
}

export async function GET(req: NextRequest) {
  try {
    // GEÇICI TEST - Önce basit bir response döndürelim
    console.log('🔍 API /firmalar GET çağrısı alındı');
    
    const { searchParams } = new URL(req.url);
    
    // Parse parameters
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(1000, Math.max(1, parseInt(searchParams.get('limit') || '1000')));
    const search = searchParams.get('search')?.trim() || undefined;

    logger.info('💾 Fetching firmalar from database', { 
      page, 
      limit, 
      search 
    });
    
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
          // Essential contact info
          iletisim_bilgileri: {
            where: { 
              aktif: true,
              tip: { in: ['telefon', 'eposta', 'website'] }
            },
            select: { tip: true, deger: true, etiket: true },
            orderBy: { sira: 'asc' }
          }
        },
        orderBy: { created_at: 'desc' }
      }),
      prisma.firmalar.count({ where: whereClause })
    ]);

    // Transform data
    const transformedFirmalar = firmalar.map(firma => ({
      ...firma,
      goruntulenme: firma.goruntulenme || 0,
      // Add telefon and eposta for backward compatibility
      telefon: firma.iletisim_bilgileri.find(i => i.tip === 'telefon')?.deger || null,
      eposta: firma.iletisim_bilgileri.find(i => i.tip === 'eposta')?.deger || null,
      // Add communication_data for compatibility with existing frontend code
      communication_data: JSON.stringify({
        telefonlar: firma.iletisim_bilgileri
          .filter(i => i.tip === 'telefon')
          .map(i => ({ value: i.deger, etiket: i.etiket })),
        epostalar: firma.iletisim_bilgileri
          .filter(i => i.tip === 'eposta')
          .map(i => ({ value: i.deger, etiket: i.etiket }))
      })
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

    logger.info('✅ Database query completed', {
      page,
      limit,
      search,
      resultCount: firmalar.length,
      totalCount
    });

    return NextResponse.json(responseData);

  } catch (error) {
    logger.error('Firmalar getirilirken hata:', error);
    return errorResponse('Firmalar getirilirken bir hata oluştu', 'FETCH_ERROR', null, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('🔍 API /firmalar POST çağrısı alındı');
    
    // Content-Type kontrolü
    const contentType = req.headers.get('content-type');
    console.log('📋 Content-Type:', contentType);
    
    let formData;
    
    // FormData veya JSON kontrolü
    if (contentType?.includes('multipart/form-data')) {
      console.log('📁 FormData olarak işleniyor...');
      formData = await req.formData();
      
      // FormData'yı object'e çevir
      const data: any = {};
      for (const [key, value] of formData.entries()) {
        console.log(`📝 FormData field: ${key} = ${value}`);
        data[key] = value;
      }
      
      console.log('✅ FormData parsed:', data);
      formData = data; // Bu satır eksikti!
      
    } else if (contentType?.includes('application/json')) {
      console.log('📄 JSON olarak işleniyor...');
      const jsonData = await req.json();
      console.log('✅ JSON parsed:', jsonData);
      formData = jsonData;
      
    } else {
      console.log('❌ Desteklenmeyen Content-Type:', contentType);
      return errorResponse('Desteklenmeyen content type', 'INVALID_CONTENT_TYPE', { contentType }, 400);
    }

    console.log('🔍 Final formData object:', formData);
    console.log('🔍 formData.firmaAdi:', formData.firmaAdi);
    console.log('🔍 formData.firma_adi:', formData.firma_adi);
    console.log('🔍 formData.slug:', formData.slug);

    // Gerekli alanları kontrol et - hem eski hem yeni field adlarını destekle
    const firmaAdi = formData.firmaAdi || formData.firma_adi;
    const slug = formData.slug;
    
    console.log('🔍 Extracted firmaAdi:', firmaAdi);
    console.log('🔍 Extracted slug:', slug);
    
    const missingFields = [];
    if (!firmaAdi) missingFields.push('firma_adi');
    if (!slug) missingFields.push('slug');
    
    if (missingFields.length > 0) {
      console.log('❌ Eksik alanlar:', missingFields);
      return errorResponse('Gerekli alanlar eksik', 'MISSING_FIELDS', { missingFields }, 400);
    }

    console.log('🔄 Database\'e firma ekleniyor...');
    
    // Firma oluştur - doğru field adlarını kullan
    const newFirma = await prisma.firmalar.create({
      data: {
        firma_adi: firmaAdi,
        slug: slug,
        yetkili_adi: formData.yetkili_adi || formData.yetkiliAdi || null,
        yetkili_pozisyon: formData.yetkili_pozisyon || formData.yetkiliPozisyon || null,
        profil_foto: formData.profil_foto || null,
        firma_logo: formData.firma_logo || null,
        template_id: parseInt(formData.templateId || formData.template_id) || 1,
        firma_hakkinda: formData.firma_hakkinda || null,
        firma_hakkinda_baslik: formData.firma_hakkinda_baslik || 'Hakkımızda',
        firma_unvan: formData.firma_unvan || null,
        firma_vergi_no: formData.firma_vergi_no || null,
        vergi_dairesi: formData.vergi_dairesi || null,
        onay: false,
        goruntulenme: 0
      }
    });

    console.log('✅ Firma başarıyla oluşturuldu:', newFirma);

    // İletişim bilgilerini normalize edilmiş tabloya ekle
    if (formData.communication_data) {
      try {
        const communicationData = JSON.parse(formData.communication_data);
        console.log('📞 İletişim verileri işleniyor:', communicationData);
        
        for (let i = 0; i < communicationData.length; i++) {
          const comm = communicationData[i];
          if (comm.type && comm.value) {
            await prisma.iletisimBilgisi.create({
              data: {
                firma_id: newFirma.id,
                tip: comm.type,
                deger: comm.value,
                etiket: comm.label || null,
                aktif: true,
                sira: i + 1
              }
            });
          }
        }
        console.log('✅ İletişim bilgileri eklendi');
      } catch (error) {
        console.error('❌ İletişim bilgileri eklenirken hata:', error);
      }
    }

    // Sosyal medya hesaplarını normalize edilmiş tabloya ekle
    if (formData.sosyalMedyaHesaplari) {
      try {
        const socialMediaData = JSON.parse(formData.sosyalMedyaHesaplari);
        console.log('📱 Sosyal medya verileri işleniyor:', socialMediaData);
        
        for (let i = 0; i < socialMediaData.length; i++) {
          const social = socialMediaData[i];
          if (social.platform && social.url) {
            await prisma.sosyalMedyaHesabi.create({
              data: {
                firma_id: newFirma.id,
                platform: social.platform,
                url: social.url,
                etiket: social.label || null,
                aktif: true,
                sira: i + 1
              }
            });
          }
        }
        console.log('✅ Sosyal medya hesapları eklendi');
      } catch (error) {
        console.error('❌ Sosyal medya hesapları eklenirken hata:', error);
      }
    }

    // Banka hesaplarını normalize edilmiş tabloya ekle
    if (formData.bankaHesaplari) {
      try {
        const bankData = JSON.parse(formData.bankaHesaplari);
        console.log('🏦 Banka hesapları işleniyor:', bankData);
        
        for (let i = 0; i < bankData.length; i++) {
          const bank = bankData[i];
          if (bank.bank_name && bank.account_holder && bank.accounts && bank.accounts.length > 0) {
            // Önce banka hesabını oluştur
            const bankaHesabi = await prisma.bankaHesabi.create({
              data: {
                firma_id: newFirma.id,
                banka_adi: bank.bank_label || bank.bank_name,
                banka_logo: bank.bank_logo || null,
                hesap_sahibi: bank.account_holder,
                aktif: true,
                sira: i + 1
              }
            });

            // Sonra hesap detaylarını ekle
            for (let j = 0; j < bank.accounts.length; j++) {
              const account = bank.accounts[j];
              if (account.iban) {
                await prisma.bankaHesapDetay.create({
                  data: {
                    banka_hesabi_id: bankaHesabi.id,
                    iban: account.iban,
                    para_birimi: account.currency || 'TRY',
                    aktif: true
                  }
                });
              }
            }
          }
        }
        console.log('✅ Banka hesapları eklendi');
      } catch (error) {
        console.error('❌ Banka hesapları eklenirken hata:', error);
      }
    }

    logger.info('✅ Firma created successfully', {
      firmaId: newFirma.id,
      firmaAdi: newFirma.firma_adi
    });

    return successResponse(newFirma, 'Firma başarıyla oluşturuldu', 201);

  } catch (error) {
    console.error('❌ POST method error:', error);
    logger.error('POST method error:', error);
    
    return errorResponse(
      'Firma oluşturulurken bir hata oluştu',
      'CREATE_ERROR',
      error instanceof Error ? error.message : 'Bilinmeyen hata',
      500
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const firmaId = searchParams.get('id');
    
    if (!firmaId) {
      return errorResponse('Firma ID gereklidir', 'MISSING_FIRMA_ID', null, 400);
    }

    // Check if firma exists
    const existingFirma = await prisma.firmalar.findUnique({
      where: { id: parseInt(firmaId) }
    });

    if (!existingFirma) {
      return errorResponse('Firma bulunamadı', 'FIRMA_NOT_FOUND', { firmaId }, 404);
    }

    // Delete firma (cascade delete will handle related data)
    await prisma.firmalar.delete({
      where: { id: parseInt(firmaId) }
    });

    logger.info('✅ Firma deleted successfully', {
      firmaId: parseInt(firmaId),
      firmaAdi: existingFirma.firma_adi
    });

    return successResponse(
      { 
        id: parseInt(firmaId), 
        firma_adi: existingFirma.firma_adi
      }, 
      'Firma başarıyla silindi'
    );

  } catch (error) {
    logger.error('DELETE method error:', error);
    return errorResponse(
      'Firma silinirken bir hata oluştu',
      'DELETE_ERROR',
      error instanceof Error ? error.message : 'Bilinmeyen hata',
      500
    );
  }
}
