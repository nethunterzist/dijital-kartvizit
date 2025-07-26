import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';
import type { RelationalData } from './FormDataParser';

export interface FirmaCreateData {
  basicData: any;
  relationalData: RelationalData;
  fileUrls: {
    profilePhotoUrl: string | null;
    logoUrl: string | null;
    catalogUrl: string | null;
  };
}

export interface FirmaResult {
  success: boolean;
  firma?: any;
  error?: string;
}

export interface FirmaUpdateData extends FirmaCreateData {
  firmaId: number;
}

export class FirmaService {
  /**
   * Creates a new firma with all related data
   * @param data FirmaCreateData containing all firma information
   * @returns FirmaResult with created firma or error
   */
  static async createFirma(data: FirmaCreateData): Promise<FirmaResult> {
    try {
      const startTime = performance.now();
      
      // Check slug uniqueness
      const existingFirm = await prisma.firmalar.findUnique({
        where: { slug: data.basicData.slug }
      });

      if (existingFirm) {
        logger.warn('Slug already exists', {
          slug: data.basicData.slug,
          existingFirmaId: existingFirm.id
        });
        
        return {
          success: false,
          error: 'Bu URL zaten kullanılıyor'
        };
      }

      // Create firma with transaction for data consistency
      const newFirm = await prisma.$transaction(async (tx) => {
        const firma = await tx.firmalar.create({
          data: {
            // Basic firma data
            firma_adi: data.basicData.firma_adi,
            slug: data.basicData.slug,
            yetkili_adi: data.basicData.yetkili_adi || null,
            yetkili_pozisyon: data.basicData.yetkili_pozisyon || null,
            firma_unvan: data.basicData.firma_unvan || null,
            firma_vergi_no: data.basicData.firma_vergi_no || null,
            vergi_dairesi: data.basicData.vergi_dairesi || null,
            firma_hakkinda: data.basicData.firma_hakkinda || null,
            firma_hakkinda_baslik: data.basicData.firma_hakkinda_baslik || null,
            template_id: data.basicData.templateId,
            
            // File URLs
            profil_foto: data.fileUrls.profilePhotoUrl,
            firma_logo: data.fileUrls.logoUrl,
            katalog: data.fileUrls.catalogUrl,
            
            // İlişkili verileri oluştur
            iletisim_bilgileri: {
              create: data.relationalData.iletisimBilgileri
            },
            sosyal_medya_hesaplari: {
              create: data.relationalData.sosyalMedyaHesaplari
            },
            banka_hesaplari: {
              create: data.relationalData.bankaHesaplari.map(banka => ({
                banka_adi: banka.banka_adi,
                banka_kodu: banka.banka_kodu,
                banka_logo: banka.banka_logo,
                hesap_sahibi: banka.hesap_sahibi,
                aktif: banka.aktif,
                sira: banka.sira,
                hesaplar: {
                  create: banka.hesaplar
                }
              }))
            }
          },
          include: {
            iletisim_bilgileri: true,
            sosyal_medya_hesaplari: true,
            banka_hesaplari: {
              include: {
                hesaplar: true
              }
            }
          }
        });

        return firma;
      });

      const duration = performance.now() - startTime;
      
      logger.info('Firma created successfully', {
        firmaId: newFirm.id,
        firmaAdi: newFirm.firma_adi,
        slug: newFirm.slug,
        duration: `${duration.toFixed(2)}ms`,
        iletisimCount: newFirm.iletisim_bilgileri.length,
        sosyalMedyaCount: newFirm.sosyal_medya_hesaplari.length,
        bankaHesapCount: newFirm.banka_hesaplari.length
      });

      return { 
        success: true, 
        firma: newFirm 
      };
    } catch (error) {
      logger.error('Database operation error during firma creation:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        firmaAdi: data.basicData.firma_adi,
        slug: data.basicData.slug
      });
      
      return {
        success: false,
        error: 'Veritabanı işlemi hatası'
      };
    }
  }

  /**
   * Updates an existing firma with all related data
   * @param data FirmaUpdateData containing updated firma information
   * @returns FirmaResult with updated firma or error
   */
  static async updateFirma(data: FirmaUpdateData): Promise<FirmaResult> {
    try {
      const startTime = performance.now();
      
      // Check if firma exists
      const existingFirm = await prisma.firmalar.findUnique({
        where: { id: data.firmaId },
        include: {
          iletisim_bilgileri: true,
          sosyal_medya_hesaplari: true,
          banka_hesaplari: {
            include: {
              hesaplar: true
            }
          }
        }
      });

      if (!existingFirm) {
        logger.warn('Firma not found for update', { firmaId: data.firmaId });
        return {
          success: false,
          error: 'Firma bulunamadı'
        };
      }

      // Check slug uniqueness if changed
      if (data.basicData.slug !== existingFirm.slug) {
        const slugExists = await prisma.firmalar.findUnique({
          where: { slug: data.basicData.slug }
        });

        if (slugExists) {
          logger.warn('New slug already exists', {
            newSlug: data.basicData.slug,
            existingFirmaId: slugExists.id,
            updatingFirmaId: data.firmaId
          });
          
          return {
            success: false,
            error: 'Bu URL zaten kullanılıyor'
          };
        }
      }

      // Update firma with transaction
      const updatedFirm = await prisma.$transaction(async (tx) => {
        // Delete existing related data
        await tx.iletisimBilgisi.deleteMany({
          where: { firma_id: data.firmaId }
        });
        
        await tx.sosyalMedyaHesabi.deleteMany({
          where: { firma_id: data.firmaId }
        });
        
        // Delete bank account details first, then bank accounts
        const existingBankAccounts = await tx.bankaHesabi.findMany({
          where: { firma_id: data.firmaId }
        });
        
        for (const bankAccount of existingBankAccounts) {
          await tx.bankaHesapDetay.deleteMany({
            where: { banka_hesabi_id: bankAccount.id }
          });
        }
        
        await tx.bankaHesabi.deleteMany({
          where: { firma_id: data.firmaId }
        });

        // Update firma with new data
        const firma = await tx.firmalar.update({
          where: { id: data.firmaId },
          data: {
            // Basic firma data
            firma_adi: data.basicData.firma_adi,
            slug: data.basicData.slug,
            yetkili_adi: data.basicData.yetkili_adi || null,
            yetkili_pozisyon: data.basicData.yetkili_pozisyon || null,
            firma_unvan: data.basicData.firma_unvan || null,
            firma_vergi_no: data.basicData.firma_vergi_no || null,
            vergi_dairesi: data.basicData.vergi_dairesi || null,
            firma_hakkinda: data.basicData.firma_hakkinda || null,
            firma_hakkinda_baslik: data.basicData.firma_hakkinda_baslik || null,
            template_id: data.basicData.templateId,
            updated_at: new Date(),
            
            // File URLs (keep existing if no new files)
            profil_foto: data.fileUrls.profilePhotoUrl || existingFirm.profil_foto,
            firma_logo: data.fileUrls.logoUrl || existingFirm.firma_logo,
            katalog: data.fileUrls.catalogUrl || existingFirm.katalog,
            
            // Create new related data
            iletisim_bilgileri: {
              create: data.relationalData.iletisimBilgileri
            },
            sosyal_medya_hesaplari: {
              create: data.relationalData.sosyalMedyaHesaplari
            },
            banka_hesaplari: {
              create: data.relationalData.bankaHesaplari.map(banka => ({
                banka_adi: banka.banka_adi,
                banka_kodu: banka.banka_kodu,
                banka_logo: banka.banka_logo,
                hesap_sahibi: banka.hesap_sahibi,
                aktif: banka.aktif,
                sira: banka.sira,
                hesaplar: {
                  create: banka.hesaplar
                }
              }))
            }
          },
          include: {
            iletisim_bilgileri: true,
            sosyal_medya_hesaplari: true,
            banka_hesaplari: {
              include: {
                hesaplar: true
              }
            }
          }
        });

        return firma;
      });

      const duration = performance.now() - startTime;
      
      logger.info('Firma updated successfully', {
        firmaId: updatedFirm.id,
        firmaAdi: updatedFirm.firma_adi,
        slug: updatedFirm.slug,
        duration: `${duration.toFixed(2)}ms`,
        slugChanged: data.basicData.slug !== existingFirm.slug,
        iletisimCount: updatedFirm.iletisim_bilgileri.length,
        sosyalMedyaCount: updatedFirm.sosyal_medya_hesaplari.length,
        bankaHesapCount: updatedFirm.banka_hesaplari.length
      });

      return { 
        success: true, 
        firma: updatedFirm 
      };
    } catch (error) {
      logger.error('Database operation error during firma update:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        firmaId: data.firmaId,
        firmaAdi: data.basicData.firma_adi
      });
      
      return {
        success: false,
        error: 'Veritabanı güncelleme hatası'
      };
    }
  }

  /**
   * Deletes a firma and all related data
   * @param firmaId ID of firma to delete
   * @returns FirmaResult with success status
   */
  static async deleteFirma(firmaId: number): Promise<FirmaResult> {
    try {
      const startTime = performance.now();
      
      // Check if firma exists
      const existingFirm = await prisma.firmalar.findUnique({
        where: { id: firmaId }
      });

      if (!existingFirm) {
        logger.warn('Firma not found for deletion', { firmaId });
        return {
          success: false,
          error: 'Firma bulunamadı'
        };
      }

      // Delete firma (cascade delete will handle related data)
      await prisma.firmalar.delete({
        where: { id: firmaId }
      });

      const duration = performance.now() - startTime;
      
      logger.info('Firma deleted successfully', {
        firmaId,
        firmaAdi: existingFirm.firma_adi,
        slug: existingFirm.slug,
        duration: `${duration.toFixed(2)}ms`
      });

      return { 
        success: true 
      };
    } catch (error) {
      logger.error('Database operation error during firma deletion:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        firmaId
      });
      
      return {
        success: false,
        error: 'Veritabanı silme hatası'
      };
    }
  }

  /**
   * Gets a firma by ID with all related data
   * @param firmaId ID of firma to retrieve
   * @returns FirmaResult with firma data or error
   */
  static async getFirmaById(firmaId: number): Promise<FirmaResult> {
    try {
      const firma = await prisma.firmalar.findUnique({
        where: { id: firmaId },
        include: {
          iletisim_bilgileri: {
            where: { aktif: true },
            orderBy: { sira: 'asc' }
          },
          sosyal_medya_hesaplari: {
            where: { aktif: true },
            orderBy: { sira: 'asc' }
          },
          banka_hesaplari: {
            where: { aktif: true },
            include: {
              hesaplar: {
                where: { aktif: true }
              }
            },
            orderBy: { sira: 'asc' }
          }
        }
      });

      if (!firma) {
        return {
          success: false,
          error: 'Firma bulunamadı'
        };
      }

      return {
        success: true,
        firma
      };
    } catch (error) {
      logger.error('Database error getting firma by ID:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        firmaId
      });
      
      return {
        success: false,
        error: 'Firma getirme hatası'
      };
    }
  }

  /**
   * Gets a firma by slug with all related data
   * @param slug Slug of firma to retrieve
   * @returns FirmaResult with firma data or error
   */
  static async getFirmaBySlug(slug: string): Promise<FirmaResult> {
    try {
      const firma = await prisma.firmalar.findUnique({
        where: { slug },
        include: {
          iletisim_bilgileri: {
            where: { aktif: true },
            orderBy: { sira: 'asc' }
          },
          sosyal_medya_hesaplari: {
            where: { aktif: true },
            orderBy: { sira: 'asc' }
          },
          banka_hesaplari: {
            where: { aktif: true },
            include: {
              hesaplar: {
                where: { aktif: true }
              }
            },
            orderBy: { sira: 'asc' }
          }
        }
      });

      if (!firma) {
        return {
          success: false,
          error: 'Firma bulunamadı'
        };
      }

      // Increment view count
      await prisma.firmalar.update({
        where: { id: firma.id },
        data: {
          goruntulenme: {
            increment: 1
          }
        }
      });

      return {
        success: true,
        firma: {
          ...firma,
          goruntulenme: firma.goruntulenme + 1
        }
      };
    } catch (error) {
      logger.error('Database error getting firma by slug:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        slug
      });
      
      return {
        success: false,
        error: 'Firma getirme hatası'
      };
    }
  }

  /**
   * Checks if a slug is available
   * @param slug Slug to check
   * @param excludeFirmaId Optional firma ID to exclude from check (for updates)
   * @returns Boolean indicating availability
   */
  static async isSlugAvailable(slug: string, excludeFirmaId?: number): Promise<boolean> {
    try {
      const existingFirm = await prisma.firmalar.findUnique({
        where: { slug }
      });

      if (!existingFirm) {
        return true;
      }

      // If excluding a specific firma ID (for updates), check if it's the same firma
      if (excludeFirmaId && existingFirm.id === excludeFirmaId) {
        return true;
      }

      return false;
    } catch (error) {
      logger.error('Error checking slug availability:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        slug,
        excludeFirmaId
      });
      return false;
    }
  }

  /**
   * Gets firma statistics
   * @returns Object with various statistics
   */
  static async getFirmaStats(): Promise<{
    totalFirmalar: number;
    totalViews: number;
    recentFirmalar: number;
    activeFirmalar: number;
  }> {
    try {
      const [totalFirmalar, totalViewsResult, recentFirmalar, activeFirmalar] = await Promise.all([
        prisma.firmalar.count(),
        prisma.firmalar.aggregate({
          _sum: {
            goruntulenme: true
          }
        }),
        prisma.firmalar.count({
          where: {
            created_at: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            }
          }
        }),
        prisma.firmalar.count({
          where: {
            onay: true
          }
        })
      ]);

      return {
        totalFirmalar,
        totalViews: totalViewsResult._sum.goruntulenme || 0,
        recentFirmalar,
        activeFirmalar
      };
    } catch (error) {
      logger.error('Error getting firma statistics:', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      return {
        totalFirmalar: 0,
        totalViews: 0,
        recentFirmalar: 0,
        activeFirmalar: 0
      };
    }
  }
}
