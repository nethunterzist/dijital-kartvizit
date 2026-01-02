import { z } from 'zod';

/**
 * Password Change Schema
 * Validates admin password change request
 */
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Mevcut şifre gereklidir'),
  newPassword: z.string()
    .min(8, 'Yeni şifre en az 8 karakter olmalıdır')
    .regex(/[A-Z]/, 'Yeni şifre en az bir büyük harf içermelidir')
    .regex(/[a-z]/, 'Yeni şifre en az bir küçük harf içermelidir')
    .regex(/[0-9]/, 'Yeni şifre en az bir rakam içermelidir')
    .regex(/[^A-Za-z0-9]/, 'Yeni şifre en az bir özel karakter içermelidir'),
  confirmPassword: z.string().min(1, 'Şifre onayı gereklidir'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Yeni şifre ve onay eşleşmiyor',
  path: ['confirmPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: 'Yeni şifre eski şifreden farklı olmalıdır',
  path: ['newPassword'],
});

/**
 * Username Change Schema
 * Validates admin username change request
 */
export const usernameChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Mevcut şifre gereklidir'),
  newUsername: z.string()
    .min(3, 'Kullanıcı adı en az 3 karakter olmalıdır')
    .max(50, 'Kullanıcı adı en fazla 50 karakter olabilir')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Kullanıcı adı sadece harf, rakam, tire ve alt çizgi içerebilir'),
});

/**
 * Site Settings Schema
 * Validates general site configuration
 */
export const siteSettingsSchema = z.object({
  site_name: z.string().min(1, 'Site adı gereklidir').max(100),
  site_logo: z.string().url('Geçerli bir URL olmalıdır').optional().nullable(),
  favicon: z.string().url('Geçerli bir URL olmalıdır').optional().nullable(),
  meta_title: z.string().max(200).optional().nullable(),
  meta_description: z.string().max(500).optional().nullable(),
  meta_keywords: z.string().max(500).optional().nullable(),
  google_analytics: z.string().max(50).optional().nullable(),
  contact_email: z.string().email('Geçerli bir e-posta adresi giriniz').optional().nullable(),
  contact_phone: z.string().max(20).optional().nullable(),
  contact_address: z.string().max(500).optional().nullable(),
});

/**
 * Social Media Settings Schema
 * Validates social media platform configuration
 */
export const socialMediaSchema = z.object({
  platform: z.enum(['facebook', 'instagram', 'twitter', 'youtube', 'linkedin', 'tiktok'], {
    errorMap: () => ({ message: 'Geçerli bir platform seçiniz' }),
  }),
  url: z.string().url('Geçerli bir URL giriniz'),
  active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});

/**
 * Social Media Update Schema
 * For updating existing social media entries
 */
export const socialMediaUpdateSchema = socialMediaSchema.partial().extend({
  id: z.number().int().positive(),
});

/**
 * Testimonial Schema
 * Validates customer testimonial data
 */
export const testimonialSchema = z.object({
  name: z.string().min(1, 'İsim gereklidir').max(100),
  title: z.string().min(1, 'Ünvan gereklidir').max(150),
  avatar_url: z.string().url('Geçerli bir URL olmalıdır').optional().nullable(),
  text: z.string().min(10, 'Yorum metni en az 10 karakter olmalıdır').max(1000),
  rating: z.number().int().min(1).max(5).default(5),
  active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});

/**
 * Testimonial Update Schema
 * For updating existing testimonials
 */
export const testimonialUpdateSchema = testimonialSchema.partial().extend({
  id: z.number().int().positive(),
});

/**
 * FAQ Schema
 * Validates FAQ entry data
 */
export const faqSchema = z.object({
  question: z.string().min(5, 'Soru en az 5 karakter olmalıdır').max(500),
  answer: z.string().min(10, 'Cevap en az 10 karakter olmalıdır').max(5000),
  category: z.string().max(50).optional().nullable(),
  active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});

/**
 * FAQ Update Schema
 * For updating existing FAQ entries
 */
export const faqUpdateSchema = faqSchema.partial().extend({
  id: z.number().int().positive(),
});

/**
 * Display Order Update Schema
 * For reordering items
 */
export const displayOrderSchema = z.object({
  id: z.number().int().positive(),
  display_order: z.number().int().min(0),
});

/**
 * Bulk Display Order Update Schema
 * For updating multiple items' order at once
 */
export const bulkDisplayOrderSchema = z.array(displayOrderSchema);

/**
 * Slider Image Schema
 * Validates homepage slider image data
 */
export const sliderImageSchema = z.object({
  image_url: z.string().url('Geçerli bir URL olmalıdır').min(1, 'Resim URL gereklidir'),
  alt_text: z.string().max(200, 'Alt metin en fazla 200 karakter olabilir').optional().nullable(),
  active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});

/**
 * Slider Image Update Schema
 * For updating existing slider images
 */
export const sliderImageUpdateSchema = sliderImageSchema.partial().extend({
  id: z.number().int().positive(),
});

/**
 * Type exports
 */
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;
export type UsernameChangeInput = z.infer<typeof usernameChangeSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export type SocialMediaInput = z.infer<typeof socialMediaSchema>;
export type SocialMediaUpdateInput = z.infer<typeof socialMediaUpdateSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type TestimonialUpdateInput = z.infer<typeof testimonialUpdateSchema>;
export type FaqInput = z.infer<typeof faqSchema>;
export type FaqUpdateInput = z.infer<typeof faqUpdateSchema>;
export type DisplayOrderInput = z.infer<typeof displayOrderSchema>;
export type BulkDisplayOrderInput = z.infer<typeof bulkDisplayOrderSchema>;
export type SliderImageInput = z.infer<typeof sliderImageSchema>;
export type SliderImageUpdateInput = z.infer<typeof sliderImageUpdateSchema>;
