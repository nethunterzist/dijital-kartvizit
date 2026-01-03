import { z } from 'zod';

// Turkish phone number validation regex
// Accepts formats: +90 5XX XXX XX XX, 05XX XXX XX XX, 5XXXXXXXXX
const turkishPhoneRegex = /^(\+90|0)?5\d{9}$/;

export const packageInquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .max(50, 'Ad en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/, 'Ad sadece harf içermelidir'),

  surname: z
    .string()
    .min(2, 'Soyad en az 2 karakter olmalıdır')
    .max(50, 'Soyad en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/, 'Soyad sadece harf içermelidir'),

  phone: z
    .string()
    .regex(turkishPhoneRegex, 'Geçerli bir Türkiye telefon numarası giriniz (örn: 05XX XXX XX XX)')
    .transform((val) => {
      // Normalize phone number: remove spaces, dashes, parentheses
      return val.replace(/[\s\-()]/g, '');
    }),

  email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .optional()
    .or(z.literal('')),

  packageKey: z.string().min(1, 'Paket seçimi zorunludur'),
  packageName: z.string().min(1, 'Paket adı zorunludur'),
  packagePrice: z.number().positive('Paket fiyatı pozitif olmalıdır'),
  packageFeatures: z.array(z.string()).min(1, 'Paket özellikleri zorunludur'),
});

export type PackageInquiry = z.infer<typeof packageInquirySchema>;

// Partial schema for frontend form (before package selection)
export const packageInquiryFormSchema = z.object({
  name: packageInquirySchema.shape.name,
  surname: packageInquirySchema.shape.surname,
  phone: packageInquirySchema.shape.phone,
  email: packageInquirySchema.shape.email,
});

export type PackageInquiryForm = z.infer<typeof packageInquiryFormSchema>;
