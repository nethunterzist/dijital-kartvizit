import { NextRequest, NextResponse } from 'next/server';

// API route - dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { getFirmaWithCommunication, getPool } from '@/app/lib/direct-db';
import { generateHtmlForFirma } from '@/app/lib/htmlGenerator';
import { generateVCard, VCardData } from '@/app/lib/vcardGenerator';
import * as fs from 'fs';
import * as path from 'path';
import { generateQRCode } from '@/app/lib/qrCodeGenerator';
import { logger } from '@/app/lib/logger';
import { prisma } from '@/app/lib/db';
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
  firmaUpdateSchema,
  validate,
  validatePartial,
} from '@/app/lib/validations';

// SocialMediaData interface tanımı eklendi
interface SocialMediaData {
  instagramlar: Array<{url: string, label?: string}>;
  youtubelar: Array<{url: string, label?: string}>;
  websiteler: Array<{url: string, label?: string}>;
  haritalar: Array<{url: string, label?: string}>;
  linkedinler: Array<{url: string, label?: string}>;
  twitterlar: Array<{url: string, label?: string}>;
  facebooklar: Array<{url: string, label?: string}>;
  tiktoklar: Array<{url: string, label?: string}>;
}

// DB sorgu sonucu için tip tanımlaması
interface DBFirma {
  id: number;
  firma_adi: string;
  slug: string;
  telefon?: string | null;
  eposta?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  website?: string | null;
  harita?: string | null;
  profil_foto?: string | null;
  firma_logo?: string | null;
  yetkili_adi?: string | null;
  yetkili_pozisyon?: string | null;
  vcard_dosya?: string | null;
  katalog?: string | null;
  created_at?: string;
  updated_at?: string;
  goruntulenme?: number;
  firma_hakkinda?: string | null;
  firma_hakkinda_baslik?: string | null;
  [key: string]: any;
}

/**
 * Belirli bir firmanın verilerini getir
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'Geçersiz firma ID' },
        { status: 400 }
      );
    }
    
    // Görüntüleme sayacını artır (isteğe bağlı)
    const headers = new Headers(req.headers);
    const incrementView = headers.get('X-Increment-View') === 'true';
    
    if (incrementView) {
      logger.info(`Görüntülenme sayacı artırılıyor - Firma ID: ${id}`);
      
      try {
        const client = await getPool().connect();
        try {
          await client.query(
            'UPDATE firmalar SET goruntulenme = goruntulenme + 1 WHERE id = $1',
            [id]
          );
          logger.info('Görüntülenme sayacı artırıldı');
        } finally {
          client.release();
        }
      } catch (error) {
        logger.error('Görüntülenme sayacı artırılırken hata:', error);
      }
    }
    
    // Firmayı ilişkili verilerle birlikte getir (Direct DB kullanarak)
    
    const client = await getPool().connect();
    let firma;
    
    try {
      // Firma temel bilgileri
      const firmaQuery = 'SELECT * FROM firmalar WHERE id = $1';
      const firmaResult = await client.query(firmaQuery, [id]);
      
      if (firmaResult.rows.length === 0) {
        return NextResponse.json(
          { message: 'Firma bulunamadı' },
          { status: 404 }
        );
      }
      
      const firmaBase = firmaResult.rows[0];
      
      // İletişim bilgileri
      const iletisimQuery = `
        SELECT * FROM "IletisimBilgisi" 
        WHERE firma_id = $1 AND aktif = true 
        ORDER BY sira ASC
      `;
      const iletisimResult = await client.query(iletisimQuery, [id]);
      
      // Sosyal medya hesapları
      const sosyalQuery = `
        SELECT * FROM "SosyalMedyaHesabi" 
        WHERE firma_id = $1 AND aktif = true 
        ORDER BY sira ASC
      `;
      const sosyalResult = await client.query(sosyalQuery, [id]);
      
      // Banka hesapları
      const bankaQuery = `
        SELECT bh.*, bhd.iban, bhd.para_birimi, bhd.hesap_turu
        FROM "BankaHesabi" bh
        LEFT JOIN "BankaHesapDetay" bhd ON bh.id = bhd.banka_hesabi_id AND bhd.aktif = true
        WHERE bh.firma_id = $1 AND bh.aktif = true
        ORDER BY bh.sira ASC
      `;
      const bankaResult = await client.query(bankaQuery, [id]);
      
      // Banka hesaplarını grupla
      const bankaHesaplari: any[] = [];
      const bankaMap = new Map();
      
      bankaResult.rows.forEach(row => {
        if (!bankaMap.has(row.id)) {
          bankaMap.set(row.id, {
            id: row.id,
            banka_adi: row.banka_adi,
            banka_logo: row.banka_logo,
            hesap_sahibi: row.hesap_sahibi,
            hesaplar: []
          });
        }
        
        if (row.iban) {
          bankaMap.get(row.id).hesaplar.push({
            iban: row.iban,
            para_birimi: row.para_birimi,
            hesap_turu: row.hesap_turu
          });
        }
      });
      
      bankaHesaplari.push(...bankaMap.values());
      
      // Firmayı birleştir
      firma = {
        ...firmaBase,
        iletisim_bilgileri: iletisimResult.rows,
        sosyal_medya_hesaplari: sosyalResult.rows,
        bankaHesaplari: bankaHesaplari
      };
      
      
    } finally {
      client.release();
    }
    
    if (!firma) {
      return NextResponse.json(
        { message: 'Firma bulunamadı' },
        { status: 404 }
      );
    }

    // Eski format ile uyumluluk için verileri dönüştür
    
    try {
      const transformedFirma = {
        ...firma,
        // İletişim verilerini eski formata çevir
        communication_data: JSON.stringify(
          firma.iletisim_bilgileri.reduce((acc: any, item: any) => {
            const key = item.tip + 'lar';
            if (!acc[key]) acc[key] = [];
            acc[key].push({
              value: item.deger,
              label: item.etiket
            });
            return acc;
          }, {})
        ),
      // Sosyal medya verilerini eski formata çevir
      social_media_data: JSON.stringify(
        firma.sosyal_medya_hesaplari.reduce((acc: any, item: any) => {
          const key = item.platform + 'lar';
          if (!acc[key]) acc[key] = [];
          acc[key].push({
            url: item.url,
            label: item.etiket
          });
          return acc;
        }, {})
      ),
      // Banka hesaplarını eski formata çevir
      bank_accounts: JSON.stringify(
        firma.bankaHesaplari.map((banka: any) => {
          // Banka adından ID'yi çıkar (ters mapping)
          const BANKA_ID_MAP: {[key: string]: string} = {
            'Ziraat Bankası': 'ziraat',
            'VakıfBank': 'vakifbank', 
            'Halkbank': 'halkbank',
            'İş Bankası': 'isbankasi',
            'Garanti BBVA': 'garanti',
            'Akbank': 'akbank',
            'Yapı Kredi': 'yapikredi',
            'QNB Finansbank': 'qnb',
            'TEB (Türk Ekonomi Bankası)': 'teb',
            'Kuveyt Türk': 'kuveytturk',
            'Albaraka Türk': 'albaraka',
            'Türkiye Finans': 'turkiyefinans',
            'AnadoluBank': 'anadolubank',
            'Şekerbank': 'sekerbank',
            'ICBC Turkey Bank': 'icbc',
            'Odeabank': 'odeabank'
          };
          
          const bankId = BANKA_ID_MAP[banka.banka_adi] || banka.banka_adi.toLowerCase().replace(/\s+/g, '');
          
          return {
            bank_name: bankId, // ID olarak gönder
            bank_label: banka.banka_adi, // Label olarak tam adı gönder
            bank_logo: banka.banka_logo,
            account_holder: banka.hesap_sahibi,
            accounts: banka.hesaplar.map((hesap: any) => ({
              iban: hesap.iban,
              currency: hesap.para_birimi
            }))
          };
        })
      )
      };
      
      return NextResponse.json({ data: transformedFirma });
      
    } catch (transformError) {
      throw transformError;
    }
  } catch (error) {
    logger.error('Firma getirilirken hata oluştu:', error);
    return NextResponse.json(
      { error: { message: 'Firma getirilirken bir hata oluştu' } },
      { status: 500 }
    );
  }
}

/**
 * Belirli bir firmayı güncelle
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  logger.info("PUT [id] request received, Firma ID:", params.id);
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
  }

  let data: Record<string, any> = {};
  let isFormData = false;
  let originalFormData: FormData | null = null;

  try {
    // Önce FormData olarak parse etmeyi dene
    try {
      const formData = await request.formData();
      isFormData = true;
      originalFormData = formData;
      
      // File olmayan değerleri data'ya aktar
      for (const [key, value] of formData.entries()) {
        if (!(value instanceof File)) {
          data[key] = value;
        }
      }
      logger.info("FormData başarıyla ayrıştırıldı:", Object.keys(data));
      
      // File upload işlemleri
      const uploadService = new LocalFileUploadService();
      const uploadResult = await uploadService.processUploads(formData);
      
      if (uploadResult.success && uploadResult.urls) {
        if (uploadResult.urls.profilePhotoUrl) {
          data.profil_foto = uploadResult.urls.profilePhotoUrl;
          logger.info("Profil fotoğrafı güncellendi:", uploadResult.urls.profilePhotoUrl);
        }
        if (uploadResult.urls.logoUrl) {
          data.firma_logo = uploadResult.urls.logoUrl;
          logger.info("Firma logosu güncellendi:", uploadResult.urls.logoUrl);
        }
        if (uploadResult.urls.catalogUrl) {
          data.katalog = uploadResult.urls.catalogUrl;
          logger.info("Katalog güncellendi:", uploadResult.urls.catalogUrl);
        }
      }
      
    } catch (formError) {
      // FormData ayrıştırılamazsa JSON olarak dene
      try {
        data = await request.json();
        logger.info("JSON body başarıyla ayrıştırıldı:", Object.keys(data));
      } catch (jsonError) {
        logger.error("PUT [id] istek gövdesi ayrıştırılamadı:", { formError, jsonError });
        return NextResponse.json({ 
          error: 'İstek gövdesi ayrıştırılamadı',
          details: {
            formError: formError instanceof Error ? formError.message : String(formError),
            jsonError: jsonError instanceof Error ? jsonError.message : String(jsonError)
          }
        }, { status: 400 });
      }
    }

    // Normalize field names (support both camelCase and snake_case)
    const normalizedData = {
      ...(data.firma_adi || data.firmaAdi ? { firma_adi: data.firma_adi || data.firmaAdi } : {}),
      ...(data.slug ? { slug: data.slug } : {}),
      ...(data.yetkili_adi || data.yetkiliAdi ? { yetkili_adi: data.yetkili_adi || data.yetkiliAdi } : {}),
      ...(data.yetkili_pozisyon || data.yetkiliPozisyon ? { yetkili_pozisyon: data.yetkili_pozisyon || data.yetkiliPozisyon } : {}),
      ...(data.firma_hakkinda ? { firma_hakkinda: data.firma_hakkinda } : {}),
      ...(data.firma_hakkinda_baslik ? { firma_hakkinda_baslik: data.firma_hakkinda_baslik } : {}),
      ...(data.firma_unvan ? { firma_unvan: data.firma_unvan } : {}),
      ...(data.firma_vergi_no ? { firma_vergi_no: data.firma_vergi_no } : {}),
      ...(data.vergi_dairesi ? { vergi_dairesi: data.vergi_dairesi } : {}),
      ...(data.template_id || data.templateId ? { template_id: parseInt(data.template_id || data.templateId) } : {}),
      ...(data.gradient_color || data.gradientColor ? { gradient_color: data.gradient_color || data.gradientColor } : {}),
      ...(data.profil_foto ? { profil_foto: data.profil_foto } : {}),
      ...(data.firma_logo ? { firma_logo: data.firma_logo } : {}),
      ...(data.katalog ? { katalog: data.katalog } : {}),
    };

    // Validate update data with Zod
    let validatedUpdateData;
    try {
      validatedUpdateData = validatePartial(firmaUpdateSchema, normalizedData);
      logger.info('Firma update data validated successfully');
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

    // Mevcut firmayı sorgula - Direct DB kullan
    const client = await getPool().connect();
    let existingFirma;
    let updatedFirma;

    try {
      const existingResult = await client.query('SELECT * FROM firmalar WHERE id = $1', [id]);
      if (existingResult.rows.length === 0) {
        throw new NotFoundError('Firma bulunamadı');
      }
      existingFirma = existingResult.rows[0];

      // Slug değişikliği kontrolü
      const oldSlug = existingFirma.slug;
      const newSlug = validatedUpdateData.slug || oldSlug;

      // Firmayı güncelle - Direct DB kullan - use validated data
      const updateResult = await client.query(`
        UPDATE firmalar SET
          firma_adi = $1,
          slug = $2,
          yetkili_adi = $3,
          yetkili_pozisyon = $4,
          firma_hakkinda = $5,
          firma_hakkinda_baslik = $6,
          firma_unvan = $7,
          firma_vergi_no = $8,
          vergi_dairesi = $9,
          template_id = $10,
          profil_foto = $11,
          firma_logo = $12,
          katalog = $13,
          gradient_color = $14,
          updated_at = NOW()
        WHERE id = $15
        RETURNING *
      `, [
        validatedUpdateData.firma_adi ?? existingFirma.firma_adi,
        newSlug,
        validatedUpdateData.yetkili_adi ?? existingFirma.yetkili_adi,
        validatedUpdateData.yetkili_pozisyon ?? existingFirma.yetkili_pozisyon,
        validatedUpdateData.firma_hakkinda ?? existingFirma.firma_hakkinda,
        validatedUpdateData.firma_hakkinda_baslik ?? existingFirma.firma_hakkinda_baslik,
        validatedUpdateData.firma_unvan ?? existingFirma.firma_unvan,
        validatedUpdateData.firma_vergi_no ?? existingFirma.firma_vergi_no,
        validatedUpdateData.vergi_dairesi ?? existingFirma.vergi_dairesi,
        validatedUpdateData.template_id ?? existingFirma.template_id,
        validatedUpdateData.profil_foto ?? existingFirma.profil_foto,
        validatedUpdateData.firma_logo ?? existingFirma.firma_logo,
        validatedUpdateData.katalog ?? existingFirma.katalog,
        validatedUpdateData.gradient_color ?? existingFirma.gradient_color,
        id
      ]);
      
      updatedFirma = updateResult.rows[0];
      
    } finally {
      client.release();
    }

    // Banka hesapları işlemi
    if (data.bankaHesaplari) {
      logger.info("Banka hesapları işleniyor:", data.bankaHesaplari);
      
      try {
        const bankAccounts = JSON.parse(data.bankaHesaplari);
        
        if (Array.isArray(bankAccounts)) {
          // Direct DB kullanarak banka hesapları işle
          const bankClient = await getPool().connect();
          
          try {
            await bankClient.query('BEGIN');
            
            // Mevcut banka hesaplarını sil
            await bankClient.query('DELETE FROM "BankaHesapDetay" WHERE banka_hesabi_id IN (SELECT id FROM "BankaHesabi" WHERE firma_id = $1)', [id]);
            await bankClient.query('DELETE FROM "BankaHesabi" WHERE firma_id = $1', [id]);
            
            // Yeni hesapları ekle
            for (let i = 0; i < bankAccounts.length; i++) {
              const account = bankAccounts[i];
              
              // Banka adını ID'den tam adına çevir
              const BANKA_MAP: {[key: string]: string} = {
                'ziraat': 'Ziraat Bankası',
                'vakifbank': 'VakıfBank',
                'halkbank': 'Halkbank',
                'isbankasi': 'İş Bankası',
                'garanti': 'Garanti BBVA',
                'akbank': 'Akbank',
                'yapikredi': 'Yapı Kredi',
                'qnb': 'QNB Finansbank',
                'teb': 'TEB (Türk Ekonomi Bankası)',
                'kuveytturk': 'Kuveyt Türk',
                'albaraka': 'Albaraka Türk',
                'turkiyefinans': 'Türkiye Finans',
                'anadolubank': 'AnadoluBank',
                'sekerbank': 'Şekerbank',
                'icbc': 'ICBC Turkey Bank',
                'odeabank': 'Odeabank'
              };
              
              const bankaAdi = BANKA_MAP[account.bank_name] || account.bank_label || account.bank_name;
              const bankaLogo = `/img/banks/${account.bank_name}.png`;
              
              // Ana banka hesabını oluştur
              const bankaResult = await bankClient.query(`
                INSERT INTO "BankaHesabi" (firma_id, banka_adi, banka_kodu, banka_logo, hesap_sahibi, sira, aktif, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
                RETURNING id
              `, [
                id,
                bankaAdi,
                account.bank_name,
                bankaLogo,
                account.account_holder,
                i + 1,
                true
              ]);
              
              const bankaHesabiId = bankaResult.rows[0].id;
              
              // Alt hesapları ekle
              if (account.accounts && Array.isArray(account.accounts)) {
                for (let j = 0; j < account.accounts.length; j++) {
                  const subAccount = account.accounts[j];
                  
                  if (subAccount.iban && subAccount.iban.trim()) {
                    await bankClient.query(`
                      INSERT INTO "BankaHesapDetay" (banka_hesabi_id, iban, para_birimi, hesap_turu, aktif, created_at)
                      VALUES ($1, $2, $3, $4, $5, NOW())
                    `, [
                      bankaHesabiId,
                      subAccount.iban,
                      subAccount.currency || 'TRY',
                      subAccount.hesap_turu || '',
                      true
                    ]);
                  }
                }
              }
            }
            
            await bankClient.query('COMMIT');
            
          } catch (bankError) {
            await bankClient.query('ROLLBACK');
            throw bankError;
          } finally {
            bankClient.release();
          }
          
          logger.info(`${bankAccounts.length} banka hesabı başarıyla güncellendi`);
        }
      } catch (bankError) {
        logger.error('Banka hesapları güncellenirken hata:', bankError);
      }
    }

    logger.info("Firma veritabanı güncellendi:", updatedFirma.id);

    // HTML yeniden oluşturmayı dene (isteğe bağlı)
    try {
      if (typeof generateHtmlForFirma === 'function') {
        await generateHtmlForFirma(updatedFirma);
        logger.info(`HTML yeniden oluşturuldu: ${updatedFirma.slug}`);
      }
    } catch (htmlError) {
      logger.error('HTML oluşturma hatası:', htmlError);
    }

    return NextResponse.json(updatedFirma);
  } catch (error) {
    logger.error('PUT /api/firmalar/[id] error', { error });

    // Handle not found errors
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse(error, process.env.NODE_ENV === 'development'),
        { status: 404 }
      );
    }

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
          message: 'Firma güncellenirken beklenmeyen bir hata oluştu',
          code: 'UPDATE_ERROR',
          ...(isDevelopment && error instanceof Error && { details: error.message }),
        },
      },
      { status: 500 }
    );
  }
}

/**
 * Belirli bir firmayı sil
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'Geçersiz firma ID' },
        { status: 400 }
      );
    }
    
    logger.info(`ID ${id} olan firmayı silme isteği alındı`);
    
    // Firma var mı kontrol et
    const firma = await prisma.firmalar.findUnique({
      where: { id }
    });
    
    if (!firma) {
      return NextResponse.json(
        { message: 'Silinecek firma bulunamadı' },
        { status: 404 }
      );
    }
    
    const firmaSlug = firma.slug;
    
    // Veritabanından sil
    await prisma.firmalar.delete({
      where: { id }
    });
    
    // HTML ve diğer dosyaları sil
    // Serverless ortamda dosya sistemi işlemleri kaldırıldı
    // Sadece veritabanı kaydı siliniyor
    
    return NextResponse.json({ 
      message: 'Firma başarıyla silindi', 
      id: id 
    });
    
  } catch (error) {
    logger.error('Firma silme hatası:', error);
    return NextResponse.json(
      { message: 'Firma silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Çoklu alanları işlemek için yardımcı fonksiyon
function processMultipleFormData(formData: FormData, fieldName: string): string | null {
  // [fieldName][0], [fieldName][1] formatındaki verileri topla
  const values: string[] = [];
  let index = 0;
  let key = `${fieldName}[${index}]`;
  
  // FormData'dan tüm ilgili alanları topla
  while (formData.has(key)) {
    const value = formData.get(key) as string;
    if (value && value.trim()) {
      values.push(value.trim());
    }
    index++;
    key = `${fieldName}[${index}]`;
  }
  
  // Değerler varsa virgülle birleştir, yoksa null döndür
  return values.length > 0 ? values.join(',') : null;
}

// processSocialMediaAccounts fonksiyonu (tip düzeltmesi yapıldı)
const processSocialMediaAccounts = (formData: FormData): SocialMediaData => {
    logger.info("=== processSocialMediaAccounts (PUT için güncellenmiş) ===");
    const formKeys = Array.from(formData.keys());
    // SocialMediaData tipinde başlatıldı
    let socialMediaData: SocialMediaData = {
        instagramlar: [], youtubelar: [], websiteler: [], haritalar: [],
        linkedinler: [], twitterlar: [], facebooklar: [], tiktoklar: []
    };

    const platformlar = ['instagram', 'youtube', 'linkedin', 'twitter', 'facebook', 'tiktok'];

    platformlar.forEach(platform => {
        formKeys.filter(key => key.startsWith(`${platform}[`)).forEach(key => {
            const value = formData.get(key)?.toString();
            const indexMatch = key.match(/\[(\d+)\]/);
            const index = indexMatch ? indexMatch[1] : null;
            const labelKey = index ? `${platform}_label[${index}]` : null;
            const label = labelKey ? formData.get(labelKey)?.toString() : undefined;

            if (value) {
                const hesapObj = { url: value.trim(), label: label ? label.trim() : undefined };
                // Tip kontrolü güçlendirildi
                const platformKey = (platform + 'lar') as keyof SocialMediaData;
                if (socialMediaData[platformKey]) {
                    (socialMediaData[platformKey] as Array<{url: string, label?: string}>).push(hesapObj);
                }
            }
        });
        // Tekrarları kaldır (her platform için)
        const uniqueUrls = new Map<string, {url: string, label?: string}>();
        const platformKey = (platform + 'lar') as keyof SocialMediaData;
        if (socialMediaData[platformKey]) {
           (socialMediaData[platformKey] as Array<{url: string, label?: string}>).forEach(item => {
              uniqueUrls.set(item.url.toLowerCase().trim(), item);
           });
           socialMediaData[platformKey] = Array.from(uniqueUrls.values());
        }
    });

    // Instagram ve YouTube URL normalleştirmesi (isteğe bağlı)
    // ... (POST'taki gibi eklenebilir)

    return socialMediaData;
};
