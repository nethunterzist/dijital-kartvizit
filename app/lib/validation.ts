import { z } from 'zod';

// Firma oluşturma/güncelleme için validasyon şeması
export const createFirmaSchema = z.object({
  firma_adi: z.string()
    .min(2, "Firma adı en az 2 karakter olmalı")
    .max(100, "Firma adı en fazla 100 karakter olabilir")
    .trim(),
  
  slug: z.string()
    .min(2, "URL en az 2 karakter olmalı")
    .max(50, "URL en fazla 50 karakter olabilir")
    .regex(/^[a-z0-9-]+$/, "URL sadece küçük harf, rakam ve tire içerebilir")
    .trim(),
  
  yetkili_adi: z.string()
    .max(100, "Yetkili adı en fazla 100 karakter olabilir")
    .trim()
    .optional(),
  
  yetkili_pozisyon: z.string()
    .max(100, "Pozisyon en fazla 100 karakter olabilir")
    .trim()
    .optional(),
  
  firma_unvan: z.string()
    .max(200, "Firma ünvanı en fazla 200 karakter olabilir")
    .trim()
    .optional(),
  
  firma_vergi_no: z.string()
    .regex(/^[0-9]{10}$/, "Vergi numarası 10 haneli olmalı")
    .optional()
    .or(z.literal("")),
  
  vergi_dairesi: z.string()
    .max(100, "Vergi dairesi en fazla 100 karakter olabilir")
    .trim()
    .optional(),
  
  firma_hakkinda: z.string()
    .max(2000, "Hakkımızda metni en fazla 2000 karakter olabilir")
    .trim()
    .optional(),
  
  firma_hakkinda_baslik: z.string()
    .max(50, "Hakkımızda başlığı en fazla 50 karakter olabilir")
    .trim()
    .optional(),
  
  templateId: z.number()
    .int("Template ID tam sayı olmalı")
    .min(1, "Template ID en az 1 olmalı")
    .max(50, "Geçersiz template ID"),
});

// İletişim bilgileri validasyonu (Yeni normalize edilmiş yapı)
export const iletisimBilgisiSchema = z.object({
  tip: z.enum(['telefon', 'eposta', 'whatsapp', 'telegram', 'website', 'harita'], {
    errorMap: () => ({ message: "Geçersiz iletişim türü" })
  }),
  deger: z.string()
    .min(1, "İletişim bilgisi boş olamaz")
    .max(200, "İletişim bilgisi en fazla 200 karakter olabilir")
    .trim(),
  etiket: z.string()
    .max(50, "Etiket en fazla 50 karakter olabilir")
    .trim()
    .optional(),
  aktif: z.boolean().default(true),
  sira: z.number().int().min(0).default(0)
});

// Sosyal medya validasyonu (Yeni normalize edilmiş yapı)
export const sosyalMedyaHesabiSchema = z.object({
  platform: z.enum(['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok'], {
    errorMap: () => ({ message: "Geçersiz sosyal medya platformu" })
  }),
  url: z.string()
    .min(1, "URL boş olamaz")
    .max(200, "URL en fazla 200 karakter olabilir")
    .url("Geçersiz URL formatı")
    .trim(),
  etiket: z.string()
    .max(50, "Etiket en fazla 50 karakter olabilir")
    .trim()
    .optional(),
  aktif: z.boolean().default(true),
  sira: z.number().int().min(0).default(0)
});

// Banka hesabı validasyonu (Yeni normalize edilmiş yapı)
export const bankaHesabiSchema = z.object({
  banka_adi: z.string()
    .min(1, "Banka adı boş olamaz")
    .max(50, "Banka adı en fazla 50 karakter olabilir"),
  
  banka_kodu: z.string()
    .max(10, "Banka kodu en fazla 10 karakter olabilir")
    .optional(),
  
  banka_logo: z.string()
    .url("Geçersiz logo URL'si")
    .optional(),
  
  hesap_sahibi: z.string()
    .min(1, "Hesap sahibi adı boş olamaz")
    .max(100, "Hesap sahibi adı en fazla 100 karakter olabilir"),
  
  aktif: z.boolean().default(true),
  sira: z.number().int().min(0).default(0),
  
  hesaplar: z.array(z.object({
    iban: z.string()
      .regex(/^TR[0-9]{2}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{2}$/, "Geçersiz IBAN formatı")
      .transform(val => val.replace(/\s/g, '')), // Boşlukları kaldır
    para_birimi: z.enum(['TRY', 'USD', 'EUR'], {
      errorMap: () => ({ message: "Geçersiz para birimi" })
    }).default('TRY'),
    hesap_turu: z.string()
      .max(50, "Hesap türü en fazla 50 karakter olabilir")
      .optional(),
    aktif: z.boolean().default(true)
  })).min(1, "En az bir hesap bilgisi gerekli")
});

// Geriye uyumluluk için eski şemalar (deprecated)
export const communicationSchema = iletisimBilgisiSchema.omit({ aktif: true, sira: true }).extend({
  type: z.enum(['telefon', 'eposta', 'whatsapp', 'telegram', 'website', 'harita']),
  value: z.string().min(1).max(200).trim(),
  label: z.string().max(50).trim().optional()
});

export const socialMediaSchema = sosyalMedyaHesabiSchema.omit({ aktif: true, sira: true }).extend({
  platform: z.enum(['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok']),
  url: z.string().min(1).max(200).trim(),
  label: z.string().max(50).trim().optional()
});

export const bankAccountSchema = z.object({
  bank_name: z.string().min(1).max(50),
  bank_label: z.string().min(1).max(100),
  bank_logo: z.string().url().optional().or(z.literal("")),
  account_holder: z.string().min(1).max(100),
  accounts: z.array(z.object({
    iban: z.string().regex(/^TR[0-9]{2}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{2}$/).transform(val => val.replace(/\s/g, '')),
    currency: z.enum(['TL', 'TRY', 'USD', 'EUR'])
  })).min(1)
});

// E-posta validasyonu
export const emailSchema = z.string()
  .email("Geçersiz e-posta adresi")
  .max(100, "E-posta adresi en fazla 100 karakter olabilir");

// Telefon validasyonu (Türkiye formatı)
export const phoneSchema = z.string()
  .regex(/^(\+90|0)?[5][0-9]{9}$/, "Geçersiz telefon numarası formatı (örn: 0555 123 45 67)");

// URL validasyonu
export const urlSchema = z.string()
  .url("Geçersiz URL formatı")
  .max(200, "URL en fazla 200 karakter olabilir");

// Dosya yükleme validasyonu
export const fileUploadSchema = z.object({
  size: z.number()
    .max(5 * 1024 * 1024, "Dosya boyutu en fazla 5MB olabilir"), // 5MB limit
  
  type: z.string()
    .refine(
      (type) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(type),
      "Sadece JPEG, PNG ve WebP formatları desteklenir"
    )
});

// PDF dosya validasyonu
export const pdfUploadSchema = z.object({
  size: z.number()
    .max(10 * 1024 * 1024, "PDF dosyası en fazla 10MB olabilir"), // 10MB limit
  
  type: z.string()
    .refine(
      (type) => type === 'application/pdf',
      "Sadece PDF formatı desteklenir"
    )
});

// Güvenli HTML içerik validasyonu (XSS koruması)
export const safeHtmlSchema = z.string()
  .refine(
    (content) => {
      // Tehlikeli HTML etiketlerini kontrol et
      const dangerousTags = /<script|<iframe|<object|<embed|<form|javascript:|data:/i;
      return !dangerousTags.test(content);
    },
    "İçerik güvenlik açısından uygun değil"
  );

// Slug validasyonu ve temizleme
export const slugSchema = z.string()
  .transform((val) => {
    return val
      .toLowerCase()
      .trim()
      .replace(/[çğıöşü]/g, (match) => {
        const map: { [key: string]: string } = {
          'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u'
        };
        return map[match] || match;
      })
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  })
  .refine((val) => val.length >= 2, "URL en az 2 karakter olmalı")
  .refine((val) => val.length <= 50, "URL en fazla 50 karakter olabilir");

// API yanıt formatları
export const apiSuccessSchema = z.object({
  data: z.any(),
  message: z.string().optional()
});

export const apiErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.string().optional(),
    details: z.any().optional()
  })
});

// Type exports
export type CreateFirmaInput = z.infer<typeof createFirmaSchema>;
export type CommunicationInput = z.infer<typeof communicationSchema>;
export type SocialMediaInput = z.infer<typeof socialMediaSchema>;
export type BankAccountInput = z.infer<typeof bankAccountSchema>;
export type FileUploadInput = z.infer<typeof fileUploadSchema>;
export type PdfUploadInput = z.infer<typeof pdfUploadSchema>;
