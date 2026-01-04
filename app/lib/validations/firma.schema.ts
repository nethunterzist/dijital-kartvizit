import { z } from 'zod';

/**
 * Firma oluşturma ve güncelleme validasyonu
 */
export const firmaSchema = z.object({
  firma_adi: z
    .string()
    .min(2, 'Firma adı en az 2 karakter olmalı')
    .max(100, 'Firma adı en fazla 100 karakter olabilir')
    .trim(),

  slug: z
    .string()
    .min(2, 'Slug en az 2 karakter olmalı')
    .max(100, 'Slug en fazla 100 karakter olabilir')
    .regex(/^[a-z0-9-]+$/, 'Slug sadece küçük harf, rakam ve tire içerebilir')
    .trim(),

  yetkili_adi: z
    .string()
    .max(100, 'Yetkili adı en fazla 100 karakter olabilir')
    .trim()
    .optional()
    .nullable(),

  yetkili_pozisyon: z
    .string()
    .max(100, 'Yetkili pozisyon en fazla 100 karakter olabilir')
    .trim()
    .optional()
    .nullable(),

  firma_hakkinda: z
    .string()
    .max(1000, 'Firma hakkında bilgisi en fazla 1000 karakter olabilir')
    .trim()
    .optional()
    .nullable(),

  firma_hakkinda_baslik: z
    .string()
    .max(100, 'Firma hakkında başlığı en fazla 100 karakter olabilir')
    .trim()
    .optional()
    .nullable(),

  firma_unvan: z
    .string()
    .max(200, 'Firma ünvanı en fazla 200 karakter olabilir')
    .trim()
    .optional()
    .nullable(),

  firma_vergi_no: z
    .string()
    .max(20, 'Vergi numarası en fazla 20 karakter olabilir')
    .trim()
    .optional()
    .nullable(),

  vergi_dairesi: z
    .string()
    .max(100, 'Vergi dairesi en fazla 100 karakter olabilir')
    .trim()
    .optional()
    .nullable(),

  sektor_id: z
    .number()
    .int('Sektör ID tam sayı olmalı')
    .positive('Sektör ID pozitif olmalı')
    .optional()
    .nullable(),

  kategori_id: z
    .number()
    .int('Kategori ID tam sayı olmalı')
    .positive('Kategori ID pozitif olmalı')
    .optional()
    .nullable(),

  il_id: z
    .number()
    .int('İl ID tam sayı olmalı')
    .positive('İl ID pozitif olmalı')
    .optional()
    .nullable(),

  ilce_id: z
    .number()
    .int('İlçe ID tam sayı olmalı')
    .positive('İlçe ID pozitif olmalı')
    .optional()
    .nullable(),

  template_id: z
    .number()
    .int('Template ID tam sayı olmalı')
    .positive('Template ID pozitif olmalı')
    .default(1),

  gradient_color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}(,#[0-9A-Fa-f]{6})*$/, 'Geçersiz gradient color formatı')
    .optional()
    .nullable()
    .default('#D4AF37,#F7E98E,#B8860B'),

  profil_foto: z
    .string()
    .regex(/^(https?:\/\/|\/)/, 'Geçersiz profil foto formatı (URL veya path bekleniyor)')
    .max(500, 'Profil foto yolu en fazla 500 karakter olabilir')
    .optional()
    .nullable(),

  firma_logo: z
    .string()
    .regex(/^(https?:\/\/|\/)/, 'Geçersiz firma logo formatı (URL veya path bekleniyor)')
    .max(500, 'Firma logo yolu en fazla 500 karakter olabilir')
    .optional()
    .nullable(),

  katalog: z
    .string()
    .regex(/^(https?:\/\/|\/)/, 'Geçersiz katalog formatı (URL veya path bekleniyor)')
    .max(500, 'Katalog yolu en fazla 500 karakter olabilir')
    .optional()
    .nullable(),
});

/**
 * Partial schema for updates (all fields optional)
 */
export const firmaUpdateSchema = firmaSchema.partial();

/**
 * İletişim bilgisi validasyonu
 */
export const iletisimSchema = z.object({
  tip: z.enum(['telefon', 'eposta', 'adres', 'whatsapp', 'fax', 'website'], {
    errorMap: () => ({ message: 'Geçersiz iletişim tipi' }),
  }),

  deger: z
    .string()
    .min(1, 'İletişim değeri boş olamaz')
    .max(255, 'İletişim değeri en fazla 255 karakter olabilir')
    .trim(),

  etiket: z
    .string()
    .max(100, 'Etiket en fazla 100 karakter olabilir')
    .trim()
    .optional()
    .nullable(),

  aktif: z.boolean().default(true),

  sira: z
    .number()
    .int('Sıra numarası tam sayı olmalı')
    .min(0, 'Sıra numarası negatif olamaz')
    .default(0),
});

/**
 * Array of communication data
 */
export const iletisimArraySchema = z.array(iletisimSchema);

/**
 * Sosyal medya hesabı validasyonu
 */
export const sosyalMedyaSchema = z.object({
  platform: z.enum(
    ['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok', 'whatsapp', 'telegram'],
    {
      errorMap: () => ({ message: 'Geçersiz platform' }),
    }
  ),

  url: z
    .string()
    .url('Geçerli bir URL giriniz')
    .max(500, 'URL en fazla 500 karakter olabilir')
    .trim(),

  etiket: z
    .string()
    .max(100, 'Etiket en fazla 100 karakter olabilir')
    .trim()
    .optional()
    .nullable(),

  aktif: z.boolean().default(true),

  sira: z
    .number()
    .int('Sıra numarası tam sayı olmalı')
    .min(0, 'Sıra numarası negatif olamaz')
    .default(0),
});

/**
 * Array of social media data
 */
export const sosyalMedyaArraySchema = z.array(sosyalMedyaSchema);

/**
 * IBAN validasyonu
 */
export const ibanSchema = z.object({
  iban: z
    .string()
    .regex(/^TR\d{24}$/, 'Geçerli bir TR IBAN giriniz (örn: TR330006100519786457841326)')
    .trim(),

  para_birimi: z
    .enum(['TRY', 'USD', 'EUR', 'GBP'], {
      errorMap: () => ({ message: 'Geçersiz para birimi' }),
    })
    .default('TRY'),

  hesap_turu: z
    .string()
    .max(50, 'Hesap türü en fazla 50 karakter olabilir')
    .trim()
    .optional()
    .nullable(),

  aktif: z.boolean().default(true),
});

/**
 * Banka hesabı validasyonu
 */
export const bankaHesabiSchema = z.object({
  banka_adi: z
    .string()
    .min(2, 'Banka adı en az 2 karakter olmalı')
    .max(100, 'Banka adı en fazla 100 karakter olabilir')
    .trim(),

  hesap_sahibi: z
    .string()
    .min(2, 'Hesap sahibi adı en az 2 karakter olmalı')
    .max(100, 'Hesap sahibi adı en fazla 100 karakter olabilir')
    .trim(),

  banka_kodu: z
    .string()
    .max(10, 'Banka kodu en fazla 10 karakter olabilir')
    .trim()
    .optional()
    .nullable(),

  banka_logo: z
    .string()
    .regex(/^(https?:\/\/|\/)/, 'Geçersiz banka logo formatı (URL veya path bekleniyor)')
    .max(500, 'Banka logo yolu en fazla 500 karakter olabilir')
    .optional()
    .nullable(),

  aktif: z.boolean().default(true),

  sira: z
    .number()
    .int('Sıra numarası tam sayı olmalı')
    .min(0, 'Sıra numarası negatif olamaz')
    .default(0),

  hesaplar: z.array(ibanSchema).min(1, 'En az bir IBAN eklenmelidir'),
});

/**
 * Array of bank accounts
 */
export const bankaHesabiArraySchema = z.array(bankaHesabiSchema);

/**
 * Type exports
 */
export type FirmaInput = z.infer<typeof firmaSchema>;
export type FirmaUpdateInput = z.infer<typeof firmaUpdateSchema>;
export type IletisimInput = z.infer<typeof iletisimSchema>;
export type SosyalMedyaInput = z.infer<typeof sosyalMedyaSchema>;
export type BankaHesabiInput = z.infer<typeof bankaHesabiSchema>;
export type IbanInput = z.infer<typeof ibanSchema>;
