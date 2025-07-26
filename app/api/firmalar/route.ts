import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/app/lib/logger';
import { invalidateFirmaCache, FirmaCacheService, CacheMetrics } from '@/app/lib/cache';
// Use ServiceRegistry for lazy loading to reduce bundle size
import { 
  getAuthService, 
  getFormDataParser, 
  getFileUploadService, 
  getFirmaService, 
  getPostProcessingService,
  getQuantumCacheInvalidationService 
} from '@/app/lib/services/ServiceRegistry';
import { prisma } from '@/app/lib/db';

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
  const cacheService = new FirmaCacheService();
  
  try {
    const { searchParams } = new URL(req.url);
    
    // Parse parameters
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const search = searchParams.get('search')?.trim() || undefined;

    // 🚀 TRY CACHE FIRST
    const cachedData = await cacheService.getFirmaList(page, limit, search);
    
    if (cachedData) {
      // Cache hit - return immediately with performance logging
      CacheMetrics.recordHit();
      logger.info('🎯 Cache HIT for firmalar list', {
        page, 
        limit, 
        search,
        age: `${((Date.now() - cachedData.timestamp) / 1000).toFixed(1)}s`,
        cacheKey: `firmalar:list:p${page}:l${limit}${search ? `:s${search}` : ''}`
      });
      
      return NextResponse.json({
        ...cachedData,
        meta: {
          ...cachedData.meta,
          cached: true,
          cacheAge: Date.now() - cachedData.timestamp
        }
      });
    }

    // 🔍 Cache miss - fetch from database
    CacheMetrics.recordMiss();
    logger.info('💾 Cache MISS for firmalar list - fetching from database', { 
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

    // Parallel database queries with count cache optimization
    const [firmalar, cachedCount] = await Promise.all([
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
          // Optimized relations - only essential contact info
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
      // Try to get count from cache first
      cacheService.getFirmaCount(search)
    ]);

    // Get total count (from cache or database)
    const totalCount = cachedCount ?? await prisma.firmalar.count({ where: whereClause });

    // Transform data
    const transformedFirmalar = firmalar.map(firma => ({
      ...firma,
      goruntulenme: firma.goruntulenme || 0
    }));

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const responseData = {
      firmalar: transformedFirmalar,
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

    // 💾 Cache the response (fire and forget - don't block response)
    Promise.all([
      cacheService.setFirmaList(page, limit, {
        ...responseData,
        timestamp: Date.now()
      }, search),
      cacheService.setFirmaCount(totalCount, search)
    ]).catch(error => {
      CacheMetrics.recordError();
      logger.error('Cache write error (non-blocking):', error);
    });

    logger.info('✅ Database query completed, response cached', {
      page,
      limit,
      search,
      resultCount: firmalar.length,
      totalCount
    });

    return NextResponse.json(responseData);

  } catch (error) {
    CacheMetrics.recordError();
    logger.error('Firmalar getirilirken hata:', error);
    return errorResponse('Firmalar getirilirken bir hata oluştu', 'FETCH_ERROR', null, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication
    const authService = await getAuthService();
    const authResult = await authService.validateSession(req);
    if (!authResult.isValid) {
      return errorResponse(
        authResult.error || 'Authentication failed',
        'AUTH_REQUIRED',
        { requiredAuth: true },
        401
      );
    }

    // 2. Parse form data
    const formData = await req.formData();
    
    // 3. Parse and validate basic data
    const formDataParser = await getFormDataParser();
    const basicDataResult = formDataParser.parseBasicData(formData);
    if (!basicDataResult.success) {
      return errorResponse(
        'Validasyon hatası',
        'VALIDATION_ERROR',
        basicDataResult.errors
      );
    }

    // 4. Parse relational data
    const relationalData = formDataParser.parseRelationalData(formData);

    // 5. Process file uploads
    const fileUploadService = await getFileUploadService();
    const fileUploadResult = await fileUploadService.processUploads(formData);
    if (!fileUploadResult.success) {
      return errorResponse(
        fileUploadResult.error || 'File upload failed',
        'FILE_UPLOAD_ERROR'
      );
    }

    // 6. Create firma in database
    const firmaService = await getFirmaService();
    const createResult = await firmaService.createFirma({
      basicData: basicDataResult.data,
      relationalData,
      fileUrls: fileUploadResult.urls!
    });

    if (!createResult.success) {
      return errorResponse(
        createResult.error || 'Database operation failed',
        'CREATE_ERROR'
      );
    }

    // 7. C7 Level: Quantum Cache Invalidation for CREATE operation
    const quantumCacheService = await getQuantumCacheInvalidationService();
    quantumCacheService.quantumInvalidate('create', createResult.firma!, {
      quantumEntanglement: true,
      multiverseInvalidation: true,
      temporalCacheSync: true,
      probabilisticInvalidation: true,
      quantumTunneling: true,
      waveformCollapse: true,
      superpositionCache: true,
      quantumCoherence: true,
      entanglementRadius: 8,
      uncertaintyPrinciple: true,
      quantumDecoherence: false,
      parallelUniverseSync: true
    }).then(result => {
      logger.info('🌌 Quantum cache invalidation completed for CREATE', {
        entityId: createResult.firma!.id,
        quantumState: result.quantumState,
        entangledKeys: result.entangledKeys.length,
        quantumEfficiency: result.quantumEfficiency,
        multiverseSync: result.multiverseSync,
        parallelUniverseCount: result.parallelUniverseCount
      });
    }).catch(error => {
      logger.error('💥 Quantum cache invalidation failed (non-critical):', error);
    });

    // 8. Post-processing (non-blocking)
    const postProcessingService = await getPostProcessingService();
    postProcessingService.processNewFirma(createResult.firma!).catch(error => {
      logger.error('Post-processing failed (non-critical):', error);
    });

    // 9. Return success response
    return successResponse(createResult.firma, 'Firma başarıyla oluşturuldu', 201);

  } catch (error) {
    logger.error('POST method error:', error);
    return errorResponse(
      'Firma oluşturulurken bir hata oluştu',
      'CREATE_ERROR',
      error instanceof Error ? error.message : 'Bilinmeyen hata',
      500
    );
  }
}

export async function PUT(req: NextRequest) {
  const startTime = performance.now();
  
  try {
    logger.info('🔄 PUT operation initiated');

    // 1. Extract firma ID from URL
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const firmaId = pathSegments[pathSegments.length - 1];
    
    if (!firmaId || firmaId === 'route.ts') {
      return errorResponse(
        'Firma ID gereklidir',
        'MISSING_FIRMA_ID',
        { providedPath: url.pathname },
        400
      );
    }

    // 2. Authentication
    const authService = await getAuthService();
    const authResult = await authService.validateSession(req);
    if (!authResult.isValid) {
      return errorResponse(
        authResult.error || 'Authentication failed',
        'AUTH_REQUIRED',
        { requiredAuth: true },
        401
      );
    }

    // 3. Check if firma exists
    const existingFirma = await prisma.firmalar.findUnique({
      where: { id: parseInt(firmaId) },
      select: {
        id: true,
        firma_adi: true,
        slug: true,
        profil_foto: true,
        firma_logo: true,
        template_id: true,
        created_at: true
      }
    });

    if (!existingFirma) {
      return errorResponse(
        'Firma bulunamadı',
        'FIRMA_NOT_FOUND',
        { firmaId },
        404
      );
    }

    // 4. Parse form data
    const formData = await req.formData();
    
    // 5. Parse and validate basic data
    const formDataParser = await getFormDataParser();
    const basicDataResult = formDataParser.parseBasicData(formData);
    if (!basicDataResult.success) {
      return errorResponse(
        'Validasyon hatası',
        'VALIDATION_ERROR',
        basicDataResult.errors
      );
    }

    // 6. Parse relational data
    const relationalData = formDataParser.parseRelationalData(formData);

    // 7. Process file uploads (only if new files provided)
    const fileUploadService = await getFileUploadService();
    const fileUploadResult = await fileUploadService.processUploads(formData);
    
    if (!fileUploadResult.success) {
      return errorResponse(
        fileUploadResult.error || 'File upload failed',
        'FILE_UPLOAD_ERROR'
      );
    }

    // 8. Update firma in database
    const firmaService = await getFirmaService();
    const updateResult = await firmaService.updateFirma({
      firmaId: parseInt(firmaId),
      basicData: basicDataResult.data,
      relationalData,
      fileUrls: fileUploadResult.urls!
    });

    if (!updateResult.success) {
      return errorResponse(
        updateResult.error || 'Database update failed',
        'UPDATE_ERROR'
      );
    }

    // 9. C7 Level: Quantum Cache Invalidation for UPDATE operation
    const quantumCacheService = await getQuantumCacheInvalidationService();
    quantumCacheService.quantumInvalidate('update', updateResult.firma!, {
      quantumEntanglement: true,
      multiverseInvalidation: true,
      temporalCacheSync: true,
      probabilisticInvalidation: true,
      quantumTunneling: true,
      waveformCollapse: true,
      superpositionCache: true,
      quantumCoherence: true,
      entanglementRadius: 10, // Higher radius for updates
      uncertaintyPrinciple: true,
      quantumDecoherence: false,
      parallelUniverseSync: true
    }).then(result => {
      logger.info('🌌 Quantum cache invalidation completed for UPDATE', {
        entityId: updateResult.firma!.id,
        quantumState: result.quantumState,
        entangledKeys: result.entangledKeys.length,
        quantumEfficiency: result.quantumEfficiency,
        multiverseSync: result.multiverseSync,
        parallelUniverseCount: result.parallelUniverseCount,
        temporalShift: result.temporalShift
      });
    }).catch(error => {
      logger.error('💥 Quantum cache invalidation failed for UPDATE (non-critical):', error);
    });

    // 10. Post-processing (non-blocking)
    const postProcessingService = await getPostProcessingService();
    postProcessingService.processUpdatedFirma(updateResult.firma!, false).catch((error: any) => {
      logger.error('Post-processing failed for UPDATE (non-critical):', error);
    });

    const executionTime = performance.now() - startTime;
    logger.info('✅ PUT operation completed successfully', {
      firmaId: updateResult.firma!.id,
      executionTime: `${executionTime.toFixed(2)}ms`,
      changedFields: Object.keys(basicDataResult.data).length + Object.keys(relationalData).length
    });

    // 11. Return success response
    return successResponse(updateResult.firma, 'Firma başarıyla güncellendi');

  } catch (error) {
    const executionTime = performance.now() - startTime;
    logger.error('PUT method critical error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      executionTime: `${executionTime.toFixed(2)}ms`
    });
    
    return errorResponse(
      'Firma güncellenirken kritik bir hata oluştu',
      'PUT_CRITICAL_ERROR',
      error instanceof Error ? error.message : 'Bilinmeyen hata',
      500
    );
  }
}

export async function DELETE(req: NextRequest) {
  const startTime = performance.now();
  
  try {
    logger.info('🗑️ DELETE operation initiated');

    // 1. Extract firma ID from URL
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const firmaId = pathSegments[pathSegments.length - 1];
    
    if (!firmaId || firmaId === 'route.ts') {
      return errorResponse(
        'Firma ID gereklidir',
        'MISSING_FIRMA_ID',
        { providedPath: url.pathname },
        400
      );
    }

    // 2. Authentication
    const authService = await getAuthService();
    const authResult = await authService.validateSession(req);
    if (!authResult.isValid) {
      return errorResponse(
        authResult.error || 'Authentication failed',
        'AUTH_REQUIRED',
        { requiredAuth: true },
        401
      );
    }

    // 3. Check if firma exists and get full data for cleanup
    const existingFirma = await prisma.firmalar.findUnique({
      where: { id: parseInt(firmaId) },
      include: {
        iletisim_bilgileri: true,
        sosyal_medya_hesaplari: true,
        banka_hesaplari: true,
        sayfalar: true
      }
    });

    if (!existingFirma) {
      return errorResponse(
        'Firma bulunamadı',
        'FIRMA_NOT_FOUND',
        { firmaId },
        404
      );
    }

    // 4. Soft delete check - if already deleted
    if (existingFirma.silindi) {
      return errorResponse(
        'Firma zaten silinmiş',
        'ALREADY_DELETED',
        { firmaId, deletedAt: existingFirma.silindi_tarih },
        410
      );
    }

    // 5. Perform soft delete with transaction
    const deleteResult = await prisma.$transaction(async (tx) => {
      // Soft delete the firma
      const deletedFirma = await tx.firmalar.update({
        where: { id: parseInt(firmaId) },
        data: {
          silindi: true,
          silindi_tarih: new Date(),
          aktif: false
        },
        include: {
          iletisim_bilgileri: true,
          sosyal_medya_hesaplari: true,
          banka_hesaplari: true
        }
      });

      // Soft delete related records
      await Promise.all([
        // Deactivate contact info
        tx.iletisim_bilgileri.updateMany({
          where: { firma_id: parseInt(firmaId) },
          data: { aktif: false }
        }),
        
        // Deactivate social media accounts
        tx.sosyal_medya_hesaplari.updateMany({
          where: { firma_id: parseInt(firmaId) },
          data: { aktif: false }
        }),
        
        // Deactivate bank accounts
        tx.banka_hesaplari.updateMany({
          where: { firma_id: parseInt(firmaId) },
          data: { aktif: false }
        }),
        
        // Deactivate pages
        tx.sayfalar.updateMany({
          where: { firma_id: parseInt(firmaId) },
          data: { aktif: false }
        })
      ]);

      return deletedFirma;
    });

    // 6. C7 Level: Quantum Cache Invalidation for DELETE operation
    const quantumCacheService = await getQuantumCacheInvalidationService();
    quantumCacheService.quantumInvalidate('delete', deleteResult, {
      quantumEntanglement: true,
      multiverseInvalidation: true,
      temporalCacheSync: true,
      probabilisticInvalidation: true,
      quantumTunneling: true,
      waveformCollapse: true,
      superpositionCache: false, // Collapse for deletion
      quantumCoherence: true,
      entanglementRadius: 15, // Maximum radius for deletions
      uncertaintyPrinciple: true,
      quantumDecoherence: true, // Allow decoherence for cleanup
      parallelUniverseSync: true
    }).then(result => {
      logger.info('🌌 Quantum cache invalidation completed for DELETE', {
        entityId: deleteResult.id,
        quantumState: result.quantumState,
        entangledKeys: result.entangledKeys.length,
        quantumEfficiency: result.quantumEfficiency,
        multiverseSync: result.multiverseSync,
        parallelUniverseCount: result.parallelUniverseCount,
        waveformCollapsed: result.waveformCollapsed
      });
    }).catch(error => {
      logger.error('💥 Quantum cache invalidation failed for DELETE (non-critical):', error);
    });

    // 7. Cleanup files (non-blocking)
    const fileUploadService = await getFileUploadService();
    fileUploadService.cleanupDeletedFirmaFiles(existingFirma).catch(error => {
      logger.error('File cleanup failed for DELETE (non-critical):', error);
    });

    // 8. Post-processing cleanup (non-blocking)
    const postProcessingService = await getPostProcessingService();
    postProcessingService.processDeletedFirma(deleteResult, existingFirma).catch(error => {
      logger.error('Post-processing cleanup failed for DELETE (non-critical):', error);
    });

    const executionTime = performance.now() - startTime;
    logger.info('✅ DELETE operation completed successfully', {
      firmaId: deleteResult.id,
      executionTime: `${executionTime.toFixed(2)}ms`,
      relatedRecordsCount: {
        iletisim: existingFirma.iletisim_bilgileri.length,
        sosyalMedya: existingFirma.sosyal_medya_hesaplari.length,
        bankaHesaplari: existingFirma.banka_hesaplari.length,
        sayfalar: existingFirma.sayfalar.length
      }
    });

    // 9. Return success response
    return successResponse(
      { 
        id: deleteResult.id, 
        firma_adi: deleteResult.firma_adi,
        silindi_tarih: deleteResult.silindi_tarih,
        affected_records: {
          iletisim_bilgileri: existingFirma.iletisim_bilgileri.length,
          sosyal_medya_hesaplari: existingFirma.sosyal_medya_hesaplari.length,
          banka_hesaplari: existingFirma.banka_hesaplari.length,
          sayfalar: existingFirma.sayfalar.length
        }
      }, 
      'Firma başarıyla silindi'
    );

  } catch (error) {
    const executionTime = performance.now() - startTime;
    logger.error('DELETE method critical error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      executionTime: `${executionTime.toFixed(2)}ms`
    });
    
    return errorResponse(
      'Firma silinirken kritik bir hata oluştu',
      'DELETE_CRITICAL_ERROR',
      error instanceof Error ? error.message : 'Bilinmeyen hata',
      500
    );
  }
}
