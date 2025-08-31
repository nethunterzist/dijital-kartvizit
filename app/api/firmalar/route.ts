import { NextRequest, NextResponse } from 'next/server';
import { getAllFirmalar, createFirma, deleteFirma, getPool } from '@/app/lib/direct-db';
import { logger } from '@/app/lib/logger';
import { LocalFileUploadService } from '@/app/lib/services/LocalFileUploadService';

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
    logger.info('GET /api/firmalar called');
    
    const { searchParams } = new URL(req.url);
    
    // Parse parameters
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(1000, Math.max(1, parseInt(searchParams.get('limit') || '1000')));
    const search = searchParams.get('search')?.trim() || undefined;
    
    // Use direct database connection - NO PRISMA!
    const result = await getAllFirmalar(search, page, limit);

    const responseData = {
      data: result.data,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: result.totalPages,
        hasNextPage: page < result.totalPages,
        hasPrevPage: page > 1
      },
      meta: {
        count: result.data.length,
        search: search || null,
        cached: false,
        fetchTime: new Date().toISOString()
      }
    };

    logger.info('Firmalar fetched successfully', {
      page,
      limit,
      search,
      resultCount: result.data.length,
      totalCount: result.total
    });

    return NextResponse.json(responseData);

  } catch (error) {
    logger.error('Error fetching firmalar', { error });
    
    // DEBUG: Detaylı hata bilgisi production'da da göster
    const errorDetail = {
      message: error instanceof Error ? error.message : 'Bilinmeyen hata',
      stack: error instanceof Error ? error.stack : null,
      env: {
        DATABASE_URL: process.env.DATABASE_URL ? 'configured' : 'missing',
        NODE_ENV: process.env.NODE_ENV
      }
    };
    
    console.error('🔥 DETAILED ERROR:', errorDetail);
    
    return NextResponse.json({
      error: { 
        message: 'Firmalar getirilirken bir hata oluştu',
        debug: errorDetail  // Geçici debug bilgisi
      }
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    logger.info('POST /api/firmalar called');
    
    // Content-Type kontrolü
    const contentType = req.headers.get('content-type');
    
    let formData;
    let uploadedUrls: { [key: string]: string } = {};
    
    // FormData veya JSON kontrolü
    if (contentType?.includes('multipart/form-data')) {
      const originalFormData = await req.formData();
      
      // Önce dosya upload işlemini yap
      try {
        const uploadService = new LocalFileUploadService();
        const uploadResult = await uploadService.processUploads(originalFormData);
        
        if (uploadResult.success && uploadResult.urls) {
          // LocalFileUploadResult.urls'den string record'a çevir
          if (uploadResult.urls.profilePhotoUrl) {
            uploadedUrls.profilePhoto = uploadResult.urls.profilePhotoUrl;
          }
          if (uploadResult.urls.logoUrl) {
            uploadedUrls.logoFile = uploadResult.urls.logoUrl;
          }
          if (uploadResult.urls.catalogUrl) {
            uploadedUrls.katalog = uploadResult.urls.catalogUrl;
          }
        }
        
        logger.info('Files uploaded successfully', { urls: uploadedUrls });
      } catch (uploadError) {
        logger.error('File upload failed', { error: uploadError });
        return errorResponse('Dosya yükleme hatası', 'UPLOAD_ERROR', { error: uploadError }, 500);
      }
      
      // FormData'yı object'e çevir
      const data: any = {};
      for (const [key, value] of originalFormData.entries()) {
        data[key] = value;
      }
      
      formData = data;
      
    } else if (contentType?.includes('application/json')) {
      const jsonData = await req.json();
      formData = jsonData;
      
    } else {
      logger.warn('Unsupported Content-Type', { contentType });
      return errorResponse('Desteklenmeyen content type', 'INVALID_CONTENT_TYPE', { contentType }, 400);
    }

    // Gerekli alanları kontrol et - hem eski hem yeni field adlarını destekle
    const firmaAdi = formData.firmaAdi || formData.firma_adi;
    const slug = formData.slug;
    
    const missingFields = [];
    if (!firmaAdi) missingFields.push('firma_adi');
    if (!slug) missingFields.push('slug');
    
    if (missingFields.length > 0) {
      logger.warn('Missing required fields', { missingFields });
      return errorResponse('Gerekli alanlar eksik', 'MISSING_FIELDS', { missingFields }, 400);
    }
    
    // Direct DB - NO PRISMA
    const newFirma = await createFirma({
      firma_adi: firmaAdi,
      slug: slug,
      yetkili_adi: formData.yetkili_adi || formData.yetkiliAdi || null,
      yetkili_pozisyon: formData.yetkili_pozisyon || formData.yetkiliPozisyon || null,
      profil_foto: uploadedUrls.profilePhoto || formData.profil_foto || null,
      firma_logo: uploadedUrls.logoFile || formData.firma_logo || null,
      katalog: uploadedUrls.katalog || formData.katalog || null,
      template_id: parseInt(formData.templateId || formData.template_id) || 1,
      firma_hakkinda: formData.firma_hakkinda || null,
      firma_hakkinda_baslik: formData.firma_hakkinda_baslik || 'Hakkımızda',
      firma_unvan: formData.firma_unvan || null,
      firma_vergi_no: formData.firma_vergi_no || null,
      vergi_dairesi: formData.vergi_dairesi || null,
      gradient_color: formData.gradientColor || formData.gradient_color || '#D4AF37,#F7E98E,#B8860B'
    });

    logger.info('Firma created successfully', { id: newFirma.id, firma_adi: firmaAdi, slug });


    // Save communication data
    
    let saveStatus = {
      iletisim_kaydetme_durumu: 'not_attempted',
      iletisim_hata: null,
      sosyal_kaydetme_durumu: 'not_attempted',
      sosyal_hata: null,
      banka_kaydetme_durumu: 'not_attempted',
      banka_hata: null
    };
    
    try {
      saveStatus.iletisim_kaydetme_durumu = 'attempting';
      if (formData.communication_data) {
        // Processing communication data
        let communicationData;
        
        // String ise parse et
        if (typeof formData.communication_data === 'string') {
          communicationData = JSON.parse(formData.communication_data);
        } else {
          communicationData = formData.communication_data;
        }
        
        
        if (Array.isArray(communicationData) && communicationData.length > 0) {
          const client = await getPool().connect();
          try {
            for (let i = 0; i < communicationData.length; i++) {
              const item = communicationData[i];
              if (item.type && item.value) {
                const result = await client.query(
                  'INSERT INTO "IletisimBilgisi" (firma_id, tip, deger, etiket, sira) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                  [newFirma.id, item.type, item.value, item.label || '', i]
                );
              } else {
              }
            }
            saveStatus.iletisim_kaydetme_durumu = 'success';
          } catch (dbError) {
            saveStatus.iletisim_kaydetme_durumu = 'database_error';
            saveStatus.iletisim_hata = dbError.message;
            throw dbError;
          } finally {
            client.release();
          }
        } else {
          console.log('📞 İletişim verisi array değil veya boş:', {
            type: typeof communicationData,
            isArray: Array.isArray(communicationData),
            length: communicationData?.length,
            value: communicationData
          });
          saveStatus.iletisim_kaydetme_durumu = 'invalid_data_format';
          saveStatus.iletisim_hata = 'Array değil veya boş';
        }
      } else {
        saveStatus.iletisim_kaydetme_durumu = 'no_data';
        saveStatus.iletisim_hata = 'communication_data field missing or falsy';
      }
    } catch (parseError) {
      saveStatus.iletisim_kaydetme_durumu = 'parse_error';
      saveStatus.iletisim_hata = parseError.message;
    }

    // Sosyal medya hesaplarını kaydet
    try {
      saveStatus.sosyal_kaydetme_durumu = 'attempting';
      if (formData.sosyalMedyaHesaplari) {
        // Processing social media data
        let sosyalData;
        
        // String ise parse et
        if (typeof formData.sosyalMedyaHesaplari === 'string') {
          sosyalData = JSON.parse(formData.sosyalMedyaHesaplari);
        } else {
          sosyalData = formData.sosyalMedyaHesaplari;
        }
        
        
        if (Array.isArray(sosyalData) && sosyalData.length > 0) {
          const client = await getPool().connect();
          try {
            for (let i = 0; i < sosyalData.length; i++) {
              const item = sosyalData[i];
              if (item.platform && item.url) {
                const result = await client.query(
                  'INSERT INTO "SosyalMedyaHesabi" (firma_id, platform, url, etiket, sira) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                  [newFirma.id, item.platform, item.url, item.label || '', i]
                );
              } else {
              }
            }
            saveStatus.sosyal_kaydetme_durumu = 'success';
          } catch (dbError) {
            saveStatus.sosyal_kaydetme_durumu = 'database_error';
            saveStatus.sosyal_hata = dbError.message;
            throw dbError;
          } finally {
            client.release();
          }
        } else {
          console.log('📱 Sosyal medya verisi array değil veya boş:', {
            type: typeof sosyalData,
            isArray: Array.isArray(sosyalData),
            length: sosyalData?.length,
            value: sosyalData
          });
          saveStatus.sosyal_kaydetme_durumu = 'invalid_data_format';
          saveStatus.sosyal_hata = 'Array değil veya boş';
        }
      } else {
        saveStatus.sosyal_kaydetme_durumu = 'no_data';
        saveStatus.sosyal_hata = 'sosyalMedyaHesaplari field missing or falsy';
      }
    } catch (parseError) {
      saveStatus.sosyal_kaydetme_durumu = 'parse_error';
      saveStatus.sosyal_hata = parseError.message;
    }

    // Banka hesaplarını kaydet
    try {
      saveStatus.banka_kaydetme_durumu = 'attempting';
      if (formData.bankaHesaplari) {
        // Processing bank data
        let bankaData;
        
        // String ise parse et
        if (typeof formData.bankaHesaplari === 'string') {
          bankaData = JSON.parse(formData.bankaHesaplari);
        } else {
          bankaData = formData.bankaHesaplari;
        }
        
        
        if (Array.isArray(bankaData) && bankaData.length > 0) {
          const client = await getPool().connect();
          try {
            for (let i = 0; i < bankaData.length; i++) {
              const bankAccount = bankaData[i];
              
              if (bankAccount.bank_name && bankAccount.account_holder && bankAccount.accounts && Array.isArray(bankAccount.accounts)) {
                // Ana banka bilgisini kaydet
                
                // Önce BankaHesabi tablosuna ana kaydı ekle
                const bankResult = await client.query(
                  'INSERT INTO "BankaHesabi" (firma_id, banka_adi, banka_kodu, banka_logo, hesap_sahibi, sira) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                  [
                    newFirma.id, 
                    bankAccount.bank_label || bankAccount.bank_name,
                    bankAccount.bank_name,
                    bankAccount.bank_logo || null,
                    bankAccount.account_holder,
                    i  // Sıralama için
                  ]
                );
                
                const bankaHesabiId = bankResult.rows[0].id;
                
                // Şimdi her IBAN için BankaHesapDetay tablosuna kayıt ekle
                for (let j = 0; j < bankAccount.accounts.length; j++) {
                  const account = bankAccount.accounts[j];
                  
                  if (account.iban) {
                    const detayResult = await client.query(
                      'INSERT INTO "BankaHesapDetay" (banka_hesabi_id, iban, para_birimi) VALUES ($1, $2, $3) RETURNING *',
                      [
                        bankaHesabiId,
                        account.iban,
                        account.currency || 'TRY'
                      ]
                    );
                  } else {
                  }
                }
              } else {
              }
            }
            saveStatus.banka_kaydetme_durumu = 'success';
          } catch (dbError) {
            saveStatus.banka_kaydetme_durumu = 'database_error';
            saveStatus.banka_hata = dbError.message;
            throw dbError;
          } finally {
            client.release();
          }
        } else {
          console.log('🏦 Banka verisi array değil veya boş:', {
            type: typeof bankaData,
            isArray: Array.isArray(bankaData),
            length: bankaData?.length,
            value: bankaData
          });
          saveStatus.banka_kaydetme_durumu = 'invalid_data_format';
          saveStatus.banka_hata = 'Array değil veya boş';
        }
      } else {
        saveStatus.banka_kaydetme_durumu = 'no_data';
        saveStatus.banka_hata = 'bankaHesaplari field missing or falsy';
      }
    } catch (parseError) {
      saveStatus.banka_kaydetme_durumu = 'parse_error';
      saveStatus.banka_hata = parseError.message;
    }

    // Final verification - check if data was actually saved
    let actualIletisimCount = 0;
    let actualSosyalCount = 0;
    let actualBankaCount = 0;
    let actualBankaDetayCount = 0;
    
    try {
      const client = await getPool().connect();
      try {
        const iletisimCheck = await client.query(
          'SELECT COUNT(*) FROM "IletisimBilgisi" WHERE firma_id = $1',
          [newFirma.id]
        );
        actualIletisimCount = parseInt(iletisimCheck.rows[0].count);
        
        const sosyalCheck = await client.query(
          'SELECT COUNT(*) FROM "SosyalMedyaHesabi" WHERE firma_id = $1',
          [newFirma.id]
        );
        actualSosyalCount = parseInt(sosyalCheck.rows[0].count);
        
        // Banka hesaplarını ve detaylarını say
        const bankaCheck = await client.query(
          'SELECT COUNT(*) FROM "BankaHesabi" WHERE firma_id = $1',
          [newFirma.id]
        );
        const bankaDetayCheck = await client.query(
          'SELECT COUNT(*) FROM "BankaHesapDetay" bd JOIN "BankaHesabi" bh ON bd.banka_hesabi_id = bh.id WHERE bh.firma_id = $1',
          [newFirma.id]
        );
        actualBankaCount = parseInt(bankaCheck.rows[0].count);
        const actualBankaDetayCount = parseInt(bankaDetayCheck.rows[0].count);
      } finally {
        client.release();
      }
    } catch (checkError) {
    }

    return successResponse({
      ...newFirma,
      debug: {
        formData_keys: Object.keys(formData),
        communication_data_exists: !!formData.communication_data,
        sosyalMedyaHesaplari_exists: !!formData.sosyalMedyaHesaplari,
        bankaHesaplari_exists: !!formData.bankaHesaplari,
        communication_data_raw: formData.communication_data,
        sosyalMedyaHesaplari_raw: formData.sosyalMedyaHesaplari,
        bankaHesaplari_raw: formData.bankaHesaplari,
        actual_iletisim_count: actualIletisimCount,
        actual_sosyal_count: actualSosyalCount,
        actual_banka_count: actualBankaCount,
        actual_banka_detay_count: actualBankaDetayCount,
        save_status: saveStatus
      }
    }, 'Firma başarıyla oluşturuldu', 201);

  } catch (error) {
    
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

    
    // Direct DB - NO PRISMA
    const deletedFirma = await deleteFirma(parseInt(firmaId));


    return successResponse(
      { 
        id: parseInt(firmaId), 
        firma_adi: deletedFirma.firma_adi
      }, 
      'Firma başarıyla silindi'
    );

  } catch (error) {
    
    return errorResponse(
      'Firma silinirken bir hata oluştu',
      'DELETE_ERROR',
      error instanceof Error ? error.message : 'Bilinmeyen hata',
      500
    );
  }
}