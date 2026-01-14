import { NextRequest, NextResponse } from 'next/server';

// API route - dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { getAllFirmalar, createFirma, deleteFirma, getPool } from '@/app/lib/direct-db';
import { logger } from '@/app/lib/logger';
import { LocalFileUploadService } from '@/app/lib/services/LocalFileUploadService';
import {
  ValidationError,
  NotFoundError,
  DatabaseError,
  createErrorResponse,
  getErrorStatusCode,
  ErrorFormatter,
} from '@/app/lib/errors';
import {
  firmaSchema,
  iletisimArraySchema,
  sosyalMedyaArraySchema,
  bankaHesabiArraySchema,
  validate,
  validateSafe,
  parseAndValidate,
} from '@/app/lib/validations';

// API yanıt helper fonksiyonları
function successResponse(data: any, message?: string, status = 200) {
  return NextResponse.json({ data, message }, { status });
}

function errorResponse(message: string, code?: string, details?: any, status = 400) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return NextResponse.json(
    {
      error: {
        message,
        code,
        ...(details && isDevelopment && { details }),
      },
    },
    { status }
  );
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
    logger.error('Error fetching firmalar', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return NextResponse.json({
      error: { 
        message: 'Firmalar getirilirken bir hata oluştu'
      }
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      logger.warn('Unauthorized POST attempt to /api/firmalar');
      return errorResponse('Yetkisiz işlem. Lütfen giriş yapın.', 'UNAUTHORIZED', undefined, 401);
    }

    logger.info('POST /api/firmalar called', { user: session.user?.email });

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

        if (!uploadResult.success) {
          // Upload başarısız - hata mesajı ile dön
          const errorMessage = uploadResult.error || 'Dosya yükleme hatası';
          logger.error('File upload failed', {
            error: errorMessage,
            hasError: !!uploadResult.error
          });
          return errorResponse(errorMessage, 'UPLOAD_ERROR', { details: uploadResult.error }, 400);
        }

        if (uploadResult.urls) {
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

        logger.info('Files uploaded successfully', {
          urls: uploadedUrls,
          hasProfilePhoto: !!uploadedUrls.profilePhoto,
          hasLogo: !!uploadedUrls.logoFile,
          hasCatalog: !!uploadedUrls.katalog
        });
      } catch (uploadError) {
        logger.error('File upload exception caught', {
          error: uploadError,
          message: uploadError instanceof Error ? uploadError.message : 'Unknown error'
        });
        return errorResponse(
          uploadError instanceof Error ? uploadError.message : 'Dosya yükleme hatası',
          'UPLOAD_ERROR',
          { error: uploadError },
          500
        );
      }

      // FormData'yı object'e çevir
      const data: any = {};
      for (const [key, value] of originalFormData.entries()) {
        if (!(value instanceof File)) {
          data[key] = value;
        }
      }

      formData = data;
    } else if (contentType?.includes('application/json')) {
      const jsonData = await req.json();
      formData = jsonData;
    } else {
      logger.warn('Unsupported Content-Type', { contentType });
      return errorResponse(
        'Desteklenmeyen content type',
        'INVALID_CONTENT_TYPE',
        { contentType },
        400
      );
    }

    // Normalize field names (support both camelCase and snake_case)
    const normalizedData = {
      firma_adi: formData.firmaAdi || formData.firma_adi,
      slug: formData.slug,
      yetkili_adi: formData.yetkili_adi || formData.yetkiliAdi,
      yetkili_pozisyon: formData.yetkili_pozisyon || formData.yetkiliPozisyon,
      firma_hakkinda: formData.firma_hakkinda,
      firma_hakkinda_baslik: formData.firma_hakkinda_baslik || 'Hakkımızda',
      firma_unvan: formData.firma_unvan,
      firma_vergi_no: formData.firma_vergi_no,
      vergi_dairesi: formData.vergi_dairesi,
      template_id: formData.templateId || formData.template_id ? parseInt(formData.templateId || formData.template_id) : 1,
      gradient_color: formData.gradientColor || formData.gradient_color,
      profil_foto: uploadedUrls.profilePhoto || formData.profil_foto || null,
      firma_logo: uploadedUrls.logoFile || formData.firma_logo || null,
      katalog: uploadedUrls.katalog || formData.katalog || null,
    };

    // Validate firma data with Zod
    let validatedFirmaData;
    try {
      validatedFirmaData = validate(firmaSchema, normalizedData);
      logger.info('Firma data validated successfully');
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.warn('Firma validation failed', { errors: error.errors });
        return NextResponse.json(
          createErrorResponse(error, process.env.NODE_ENV === 'development'),
          { status: 400 }
        );
      }
      throw error;
    }
    
    // Direct DB - NO PRISMA - use validated data
    const newFirma = await createFirma(validatedFirmaData);

    logger.info('Firma created successfully', {
      id: newFirma.id,
      firma_adi: validatedFirmaData.firma_adi,
      slug: validatedFirmaData.slug,
    });


    // Save communication data
    
    let saveStatus = {
      iletisim_kaydetme_durumu: 'not_attempted',
      iletisim_hata: null as string | null,
      sosyal_kaydetme_durumu: 'not_attempted',
      sosyal_hata: null as string | null,
      banka_kaydetme_durumu: 'not_attempted',
      banka_hata: null as string | null
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
          // SECURITY: Whitelist allowed communication types
          const ALLOWED_TYPES = ['telefon', 'eposta', 'whatsapp', 'adres', 'fax', 'website'];

          const client = await getPool().connect();
          try {
            for (let i = 0; i < communicationData.length; i++) {
              const item = communicationData[i];

              // SECURITY: Validate input
              if (!item.type || !item.value) {
                continue; // Skip invalid items
              }

              // SECURITY: Validate type against whitelist
              if (!ALLOWED_TYPES.includes(item.type)) {
                continue; // Skip invalid types
              }

              // SECURITY: Validate and sanitize lengths
              const sanitizedValue = String(item.value).substring(0, 255);
              const sanitizedLabel = String(item.label || '').substring(0, 100);

              const result = await client.query(
                'INSERT INTO "IletisimBilgisi" (firma_id, tip, deger, etiket, sira) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [newFirma.id, item.type, sanitizedValue, sanitizedLabel, i]
              );
            }
            saveStatus.iletisim_kaydetme_durumu = 'success';
          } catch (dbError) {
            saveStatus.iletisim_kaydetme_durumu = 'database_error';
            saveStatus.iletisim_hata = dbError instanceof Error ? dbError.message : 'Unknown error';
            throw dbError;
          } finally {
            client.release();
          }
        } else {
          saveStatus.iletisim_kaydetme_durumu = 'invalid_data_format';
          saveStatus.iletisim_hata = 'Array değil veya boş';
        }
      } else {
        saveStatus.iletisim_kaydetme_durumu = 'no_data';
        saveStatus.iletisim_hata = 'communication_data field missing or falsy';
      }
    } catch (parseError) {
      saveStatus.iletisim_kaydetme_durumu = 'parse_error';
      saveStatus.iletisim_hata = parseError instanceof Error ? parseError.message : 'Unknown parse error';
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
          // SECURITY: Whitelist allowed platforms
          const ALLOWED_PLATFORMS = ['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok', 'whatsapp', 'telegram'];

          const client = await getPool().connect();
          try {
            for (let i = 0; i < sosyalData.length; i++) {
              const item = sosyalData[i];

              // SECURITY: Validate input
              if (!item.platform || !item.url) {
                continue;
              }

              // SECURITY: Validate platform against whitelist
              if (!ALLOWED_PLATFORMS.includes(item.platform)) {
                continue;
              }

              // SECURITY: Validate and sanitize lengths
              const sanitizedUrl = String(item.url).substring(0, 500);
              const sanitizedLabel = String(item.label || '').substring(0, 100);

              const result = await client.query(
                'INSERT INTO "SosyalMedyaHesabi" (firma_id, platform, url, etiket, sira) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [newFirma.id, item.platform, sanitizedUrl, sanitizedLabel, i]
              );
            }
            saveStatus.sosyal_kaydetme_durumu = 'success';
          } catch (dbError) {
            saveStatus.sosyal_kaydetme_durumu = 'database_error';
            saveStatus.sosyal_hata = dbError instanceof Error ? dbError.message : 'Unknown error';
            throw dbError;
          } finally {
            client.release();
          }
        } else {
          saveStatus.sosyal_kaydetme_durumu = 'invalid_data_format';
          saveStatus.sosyal_hata = 'Array değil veya boş';
        }
      } else {
        saveStatus.sosyal_kaydetme_durumu = 'no_data';
        saveStatus.sosyal_hata = 'sosyalMedyaHesaplari field missing or falsy';
      }
    } catch (parseError) {
      saveStatus.sosyal_kaydetme_durumu = 'parse_error';
      saveStatus.sosyal_hata = parseError instanceof Error ? parseError.message : 'Unknown parse error';
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
            saveStatus.banka_hata = dbError instanceof Error ? dbError.message : 'Unknown error';
            throw dbError;
          } finally {
            client.release();
          }
        } else {
          saveStatus.banka_kaydetme_durumu = 'invalid_data_format';
          saveStatus.banka_hata = 'Array değil veya boş';
        }
      } else {
        saveStatus.banka_kaydetme_durumu = 'no_data';
        saveStatus.banka_hata = 'bankaHesaplari field missing or falsy';
      }
    } catch (parseError) {
      saveStatus.banka_kaydetme_durumu = 'parse_error';
      saveStatus.banka_hata = parseError instanceof Error ? parseError.message : 'Unknown parse error';
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
    }, 'Firma başarıyla oluşturuldu', 201);

  } catch (error) {
    logger.error('POST /api/firmalar error', { error });

    // Handle database errors
    if (error && typeof error === 'object' && 'code' in error) {
      const dbError = ErrorFormatter.formatDatabaseError(error);
      return NextResponse.json(
        createErrorResponse(dbError, process.env.NODE_ENV === 'development'),
        { status: getErrorStatusCode(dbError) }
      );
    }

    // Handle validation errors
    if (error instanceof ValidationError) {
      return NextResponse.json(
        createErrorResponse(error, process.env.NODE_ENV === 'development'),
        { status: 400 }
      );
    }

    // Generic error
    const isDevelopment = process.env.NODE_ENV === 'development';
    return NextResponse.json(
      {
        error: {
          message: 'Firma oluşturulurken bir hata oluştu',
          code: 'CREATE_ERROR',
          ...(isDevelopment && error instanceof Error && { details: error.message }),
        },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      logger.warn('Unauthorized DELETE attempt to /api/firmalar');
      return errorResponse('Yetkisiz işlem. Lütfen giriş yapın.', 'UNAUTHORIZED', undefined, 401);
    }

    logger.info('DELETE /api/firmalar called', { user: session.user?.email });

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