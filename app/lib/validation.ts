import { z } from 'zod';

// Firma validation schema
export const firmaSchema = z.object({
  firma_adi: z.string()
    .min(2, 'Firma adı en az 2 karakter olmalıdır')
    .max(100, 'Firma adı en fazla 100 karakter olabilir')
    .trim(),
  
  slug: z.string()
    .min(2, 'Slug en az 2 karakter olmalıdır')
    .max(50, 'Slug en fazla 50 karakter olabilir')
    .regex(/^[a-z0-9-]+$/, 'Slug sadece küçük harf, rakam ve tire içerebilir')
    .trim(),
  
  yetkili_adi: z.string()
    .min(2, 'Yetkili adı en az 2 karakter olmalıdır')
    .max(100, 'Yetkili adı en fazla 100 karakter olabilir')
    .trim()
    .optional(),
  
  yetkili_pozisyon: z.string()
    .max(100, 'Pozisyon en fazla 100 karakter olabilir')
    .trim()
    .optional(),
  
  telefon: z.string()
    .regex(/^[0-9+\-\s()]+$/, 'Geçersiz telefon formatı')
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır')
    .max(20, 'Telefon numarası en fazla 20 karakter olabilir')
    .optional()
    .or(z.literal('')),
  
  eposta: z.string()
    .email('Geçersiz e-posta formatı')
    .max(255, 'E-posta en fazla 255 karakter olabilir')
    .optional()
    .or(z.literal('')),
  
  website: z.string()
    .url('Geçersiz website URL formatı')
    .max(255, 'Website URL en fazla 255 karakter olabilir')
    .optional()
    .or(z.literal('')),
  
  whatsapp: z.string()
    .regex(/^[0-9+\-\s()]+$/, 'Geçersiz WhatsApp formatı')
    .optional()
    .or(z.literal('')),
  
  instagram: z.string()
    .max(255, 'Instagram URL en fazla 255 karakter olabilir')
    .optional()
    .or(z.literal('')),
  
  linkedin: z.string()
    .max(255, 'LinkedIn URL en fazla 255 karakter olabilir')
    .optional()
    .or(z.literal('')),
  
  twitter: z.string()
    .max(255, 'Twitter URL en fazla 255 karakter olabilir')
    .optional()
    .or(z.literal('')),
  
  facebook: z.string()
    .max(255, 'Facebook URL en fazla 255 karakter olabilir')
    .optional()
    .or(z.literal('')),
  
  youtube: z.string()
    .max(255, 'YouTube URL en fazla 255 karakter olabilir')
    .optional()
    .or(z.literal('')),
  
  firma_hakkinda: z.string()
    .max(1000, 'Firma hakkında bilgisi en fazla 1000 karakter olabilir')
    .optional()
    .or(z.literal('')),
  
  firma_hakkinda_baslik: z.string()
    .max(100, 'Firma hakkında başlığı en fazla 100 karakter olabilir')
    .optional()
    .or(z.literal('')),
  
  adres: z.string()
    .max(500, 'Adres en fazla 500 karakter olabilir')
    .optional()
    .or(z.literal('')),
  
  harita: z.string()
    .url('Geçersiz harita URL formatı')
    .max(1000, 'Harita URL en fazla 1000 karakter olabilir')
    .optional()
    .or(z.literal('')),
});

// Partial schema for updates
export const firmaUpdateSchema = firmaSchema.partial();

// ID parameter validation
export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID sadece rakam olabilir').transform(Number),
});

// Slug parameter validation
export const slugParamSchema = z.object({
  slug: z.string().min(1, 'Slug boş olamaz'),
});

// File upload validation
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Dosya boyutu 5MB\'dan küçük olmalıdır')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type),
      'Sadece JPEG, PNG, WebP ve GIF formatları desteklenir'
    ),
});

// Social media data validation
export const socialMediaSchema = z.object({
  instagramlar: z.array(z.object({
    url: z.string().url('Geçersiz Instagram URL'),
    label: z.string().optional(),
  })).optional(),
  
  youtubelar: z.array(z.object({
    url: z.string().url('Geçersiz YouTube URL'),
    label: z.string().optional(),
  })).optional(),
  
  websiteler: z.array(z.object({
    url: z.string().url('Geçersiz Website URL'),
    label: z.string().optional(),
  })).optional(),
  
  haritalar: z.array(z.object({
    url: z.string().url('Geçersiz Harita URL'),
    label: z.string().optional(),
  })).optional(),
  
  linkedinler: z.array(z.object({
    url: z.string().url('Geçersiz LinkedIn URL'),
    label: z.string().optional(),
  })).optional(),
  
  twitterlar: z.array(z.object({
    url: z.string().url('Geçersiz Twitter URL'),
    label: z.string().optional(),
  })).optional(),
  
  facebooklar: z.array(z.object({
    url: z.string().url('Geçersiz Facebook URL'),
    label: z.string().optional(),
  })).optional(),
  
  tiktoklar: z.array(z.object({
    url: z.string().url('Geçersiz TikTok URL'),
    label: z.string().optional(),
  })).optional(),
});

// Communication data validation
export const communicationSchema = z.object({
  telefonlar: z.array(z.object({
    numara: z.string().regex(/^[0-9+\-\s()]+$/, 'Geçersiz telefon formatı'),
    label: z.string().optional(),
  })).optional(),
  
  epostalar: z.array(z.object({
    adres: z.string().email('Geçersiz e-posta formatı'),
    label: z.string().optional(),
  })).optional(),
  
  whatsapplar: z.array(z.object({
    numara: z.string().regex(/^[0-9+\-\s()]+$/, 'Geçersiz WhatsApp formatı'),
    label: z.string().optional(),
  })).optional(),
});

// Bank account validation
export const bankAccountSchema = z.object({
  banka_adi: z.string().min(1, 'Banka adı gereklidir'),
  hesap_sahibi: z.string().min(1, 'Hesap sahibi gereklidir'),
  iban: z.string()
    .regex(/^TR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}$/, 'Geçersiz IBAN formatı')
    .transform(val => val.replace(/\s/g, '')), // Boşlukları kaldır
  hesap_no: z.string().optional(),
});

// Helper function to validate data
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: string[];
} {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      return { success: false, errors };
    }
    return { success: false, errors: ['Bilinmeyen validation hatası'] };
  }
}

// Helper function to safely parse data
export function safeParseData<T>(schema: z.ZodSchema<T>, data: unknown): z.SafeParseReturnType<unknown, T> {
  return schema.safeParse(data);
}
