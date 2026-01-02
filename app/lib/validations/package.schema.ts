import { z } from 'zod';

/**
 * Package Schema - Paket validasyonu
 *
 * Admin panelinden paket güncellemelerini validate eder
 */

export const packageSchema = z.object({
  name: z
    .string()
    .min(1, 'Paket adı gereklidir')
    .max(50, 'Paket adı en fazla 50 karakter olabilir')
    .trim(),

  description: z
    .string()
    .min(1, 'Paket açıklaması gereklidir')
    .max(200, 'Paket açıklaması en fazla 200 karakter olabilir')
    .trim(),

  price: z
    .number()
    .min(0, 'Fiyat 0 veya daha büyük olmalıdır')
    .max(999999, 'Fiyat çok yüksek')
    .int('Fiyat tam sayı olmalıdır'),

  card_count: z
    .number()
    .min(1, 'Kart sayısı en az 1 olmalıdır')
    .max(1000, 'Kart sayısı en fazla 1000 olabilir')
    .int('Kart sayısı tam sayı olmalıdır'),

  color: z
    .enum(['blue', 'purple', 'green', 'gold', 'red'], {
      errorMap: () => ({ message: 'Geçersiz renk seçimi' })
    }),

  popular: z
    .boolean({
      invalid_type_error: 'Popular değeri boolean olmalıdır'
    }),

  display_order: z
    .number()
    .min(1, 'Sıralama 1-3 arasında olmalıdır')
    .max(3, 'Sıralama 1-3 arasında olmalıdır')
    .int('Sıralama tam sayı olmalıdır'),

  features: z
    .array(
      z.string().min(1, 'Özellik boş olamaz').max(200, 'Özellik çok uzun')
    )
    .min(1, 'En az 1 özellik olmalıdır')
    .max(20, 'En fazla 20 özellik eklenebilir'),

  active: z
    .boolean()
    .optional()
    .default(true)
});

/**
 * Package Update Schema - Sadece güncellenebilir alanlar
 *
 * ID, package_key, created_at gibi alanlar güncellenmez
 */
export const packageUpdateSchema = packageSchema;

/**
 * TypeScript type inference
 */
export type PackageInput = z.infer<typeof packageSchema>;
export type PackageUpdate = z.infer<typeof packageUpdateSchema>;
