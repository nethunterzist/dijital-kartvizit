import { logger } from '@/app/lib/logger';
import { 
  createFirmaSchema, 
  iletisimBilgisiSchema,
  sosyalMedyaHesabiSchema,
  bankaHesabiSchema,
  safeHtmlSchema,
  slugSchema
} from '@/app/lib/validation';

export interface ParseResult<T> {
  success: boolean;
  data?: T;
  errors?: any[];
}

export interface RelationalData {
  iletisimBilgileri: any[];
  sosyalMedyaHesaplari: any[];
  bankaHesaplari: any[];
}

export class FormDataParser {
  /**
   * Parses and validates basic firma data from FormData
   * @param formData FormData object from request
   * @returns ParseResult with validated data or errors
   */
  parseBasicData(formData: FormData): ParseResult<any> {
    try {
      const rawData = {
        firma_adi: formData.get('firmaAdi')?.toString() || formData.get('firma_adi')?.toString() || '',
        slug: formData.get('slug')?.toString() || '',
        yetkili_adi: formData.get('yetkili_adi')?.toString() || formData.get('yetkiliAdi')?.toString() || '',
        yetkili_pozisyon: formData.get('yetkili_pozisyon')?.toString() || formData.get('yetkiliPozisyon')?.toString() || '',
        firma_unvan: formData.get('firma_unvan')?.toString() || '',
        firma_vergi_no: formData.get('firma_vergi_no')?.toString() || '',
        vergi_dairesi: formData.get('vergi_dairesi')?.toString() || '',
        firma_hakkinda: formData.get('firma_hakkinda')?.toString() || formData.get('hakkimizda')?.toString() || '',
        firma_hakkinda_baslik: formData.get('firma_hakkinda_baslik')?.toString() || 'Hakkımızda',
        templateId: parseInt(formData.get('templateId')?.toString() || '2')
      };

      // Slug sanitization
      if (rawData.slug) {
        rawData.slug = FormDataParser.sanitizeSlug(rawData.slug);
      }

      // Basic data validation
      const validation = createFirmaSchema.safeParse(rawData);
      if (!validation.success) {
        logger.warn('Form data validation failed', {
          errors: validation.error.errors,
          rawData: { ...rawData, firma_hakkinda: rawData.firma_hakkinda ? '[CONTENT]' : null }
        });
        
        return {
          success: false,
          errors: validation.error.errors
        };
      }

      const validatedData = validation.data;

      // HTML content sanitization
      if (validatedData.firma_hakkinda) {
        try {
          validatedData.firma_hakkinda = FormDataParser.sanitizeHtmlContent(validatedData.firma_hakkinda);
        } catch (error) {
          logger.error('HTML content sanitization failed', { error });
          return {
            success: false,
            errors: [{ message: 'İçerik güvenlik açısından uygun değil' }]
          };
        }
      }

      logger.info('Basic form data parsed successfully', {
        firma_adi: validatedData.firma_adi,
        slug: validatedData.slug,
        templateId: validatedData.templateId
      });

      return { 
        success: true, 
        data: validatedData 
      };
    } catch (error) {
      logger.error('Form data parsing error:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      return {
        success: false,
        errors: [{ message: 'Form verisi işlenirken hata oluştu' }]
      };
    }
  }

  /**
   * Parses relational data (contacts, social media, bank accounts) from FormData
   * @param formData FormData object from request
   * @returns RelationalData object with parsed arrays
   */
  parseRelationalData(formData: FormData): RelationalData {
    return {
      iletisimBilgileri: FormDataParser.parseIletisimBilgileri(formData),
      sosyalMedyaHesaplari: FormDataParser.parseSosyalMedyaHesaplari(formData),
      bankaHesaplari: FormDataParser.parseBankaHesaplari(formData)
    };
  }

  /**
   * Parses contact information from FormData
   * @param formData FormData object
   * @returns Array of validated contact information
   */
  private static parseIletisimBilgileri(formData: FormData): any[] {
    const result: any[] = [];
    const communicationDataStr = formData.get('communication_data')?.toString();
    
    if (!communicationDataStr) {
      logger.debug('No communication data found in form');
      return result;
    }

    try {
      const parsedComm = JSON.parse(communicationDataStr);
      if (!Array.isArray(parsedComm)) {
        logger.warn('Communication data is not an array', { type: typeof parsedComm });
        return result;
      }

      for (const [index, comm] of parsedComm.entries()) {
        const normalizedComm = {
          tip: comm.type || comm.tip,
          deger: comm.value || comm.deger,
          etiket: comm.label || comm.etiket || '',
          aktif: true,
          sira: index
        };
        
        const commValidation = iletisimBilgisiSchema.safeParse(normalizedComm);
        if (commValidation.success) {
          result.push(commValidation.data);
        } else {
          logger.warn('Invalid communication data item', {
            index,
            errors: commValidation.error.errors,
            data: normalizedComm
          });
        }
      }

      logger.info('Contact information parsed', { count: result.length });
    } catch (error) {
      logger.error('İletişim verisi parse hatası:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        rawData: communicationDataStr.substring(0, 100) + '...'
      });
    }

    return result;
  }

  /**
   * Parses social media accounts from FormData
   * @param formData FormData object
   * @returns Array of validated social media accounts
   */
  private static parseSosyalMedyaHesaplari(formData: FormData): any[] {
    const result: any[] = [];
    const socialMediaStr = formData.get('sosyalMedyaHesaplari')?.toString();
    
    if (!socialMediaStr) {
      logger.debug('No social media data found in form');
      return result;
    }

    try {
      const parsedSocial = JSON.parse(socialMediaStr);
      if (!Array.isArray(parsedSocial)) {
        logger.warn('Social media data is not an array', { type: typeof parsedSocial });
        return result;
      }

      for (const [index, social] of parsedSocial.entries()) {
        const normalizedSocial = {
          platform: social.platform,
          url: social.url,
          etiket: social.label || social.etiket || '',
          aktif: true,
          sira: index
        };
        
        const socialValidation = sosyalMedyaHesabiSchema.safeParse(normalizedSocial);
        if (socialValidation.success) {
          result.push(socialValidation.data);
        } else {
          logger.warn('Invalid social media data item', {
            index,
            errors: socialValidation.error.errors,
            data: normalizedSocial
          });
        }
      }

      logger.info('Social media accounts parsed', { count: result.length });
    } catch (error) {
      logger.error('Sosyal medya verisi parse hatası:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        rawData: socialMediaStr.substring(0, 100) + '...'
      });
    }

    return result;
  }

  /**
   * Parses bank accounts from FormData
   * @param formData FormData object
   * @returns Array of validated bank accounts
   */
  private static parseBankaHesaplari(formData: FormData): any[] {
    const result: any[] = [];
    const bankAccountsStr = formData.get('bankaHesaplari')?.toString();
    
    if (!bankAccountsStr) {
      logger.debug('No bank account data found in form');
      return result;
    }

    try {
      const parsedBanks = JSON.parse(bankAccountsStr);
      if (!Array.isArray(parsedBanks)) {
        logger.warn('Bank account data is not an array', { type: typeof parsedBanks });
        return result;
      }

      for (const [index, bank] of parsedBanks.entries()) {
        const normalizedBank = {
          banka_adi: bank.bank_name || bank.banka_adi,
          banka_kodu: bank.bank_code || bank.banka_kodu,
          banka_logo: bank.bank_logo || bank.banka_logo,
          hesap_sahibi: bank.account_holder || bank.hesap_sahibi,
          aktif: true,
          sira: index,
          hesaplar: bank.accounts?.map((acc: any) => ({
            iban: acc.iban,
            para_birimi: acc.currency === 'TL' ? 'TRY' : acc.currency || 'TRY',
            hesap_turu: acc.type || acc.hesap_turu,
            aktif: true
          })) || []
        };
        
        const bankValidation = bankaHesabiSchema.safeParse(normalizedBank);
        if (bankValidation.success) {
          result.push(bankValidation.data);
        } else {
          logger.warn('Invalid bank account data item', {
            index,
            errors: bankValidation.error.errors,
            data: { ...normalizedBank, hesaplar: `[${normalizedBank.hesaplar.length} accounts]` }
          });
        }
      }

      logger.info('Bank accounts parsed', { count: result.length });
    } catch (error) {
      logger.error('Banka hesabı verisi parse hatası:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        rawData: bankAccountsStr.substring(0, 100) + '...'
      });
    }

    return result;
  }

  /**
   * Sanitizes slug for URL safety
   * @param slug Raw slug string
   * @returns Sanitized slug
   */
  private static sanitizeSlug(slug: string): string {
    const validation = slugSchema.safeParse(slug);
    if (!validation.success) {
      throw new Error(`Geçersiz URL formatı: ${validation.error.errors.map(e => e.message).join(', ')}`);
    }
    return validation.data;
  }

  /**
   * Sanitizes HTML content for security
   * @param content Raw HTML content
   * @returns Sanitized HTML content
   */
  private static sanitizeHtmlContent(content: string): string {
    const validation = safeHtmlSchema.safeParse(content);
    if (!validation.success) {
      throw new Error('İçerik güvenlik açısından uygun değil');
    }
    return content.trim();
  }

  /**
   * Extracts file information from FormData
   * @param formData FormData object
   * @returns Object with file information
   */
  static extractFileInfo(formData: FormData): {
    profilePhoto?: File;
    logoFile?: File;
    catalogFile?: File;
  } {
    const result: any = {};

    const profilePhoto = formData.get('profilePhoto') as File;
    if (profilePhoto && profilePhoto.size > 0) {
      result.profilePhoto = profilePhoto;
    }

    const logoFile = formData.get('logoFile') as File;
    if (logoFile && logoFile.size > 0) {
      result.logoFile = logoFile;
    }

    const catalogFile = formData.get('katalog') as File;
    if (catalogFile && catalogFile.size > 0) {
      result.catalogFile = catalogFile;
    }

    logger.info('File information extracted', {
      profilePhoto: !!result.profilePhoto,
      logoFile: !!result.logoFile,
      catalogFile: !!result.catalogFile,
      profilePhotoSize: result.profilePhoto?.size || 0,
      logoFileSize: result.logoFile?.size || 0,
      catalogFileSize: result.catalogFile?.size || 0
    });

    return result;
  }
}
