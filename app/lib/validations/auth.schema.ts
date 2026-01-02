import { z } from 'zod';

/**
 * Login validasyonu
 */
export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Kullanıcı adı en az 3 karakter olmalı')
    .max(50, 'Kullanıcı adı en fazla 50 karakter olabilir')
    .trim(),

  password: z
    .string()
    .min(6, 'Şifre en az 6 karakter olmalı')
    .max(100, 'Şifre en fazla 100 karakter olabilir'),
});

/**
 * Register validasyonu
 */
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Kullanıcı adı en az 3 karakter olmalı')
    .max(50, 'Kullanıcı adı en fazla 50 karakter olabilir')
    .regex(/^[a-zA-Z0-9_]+$/, 'Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir')
    .trim(),

  email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .max(100, 'E-posta adresi en fazla 100 karakter olabilir')
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalı')
    .max(100, 'Şifre en fazla 100 karakter olabilir')
    .regex(/[A-Z]/, 'Şifre en az bir büyük harf içermeli')
    .regex(/[a-z]/, 'Şifre en az bir küçük harf içermeli')
    .regex(/[0-9]/, 'Şifre en az bir rakam içermeli')
    .regex(/[^A-Za-z0-9]/, 'Şifre en az bir özel karakter içermeli'),

  confirmPassword: z
    .string()
    .min(8, 'Şifre onayı en az 8 karakter olmalı')
    .max(100, 'Şifre onayı en fazla 100 karakter olabilir'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
});

/**
 * Password reset request validasyonu
 */
export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .max(100, 'E-posta adresi en fazla 100 karakter olabilir')
    .trim()
    .toLowerCase(),
});

/**
 * Password reset validasyonu
 */
export const passwordResetSchema = z.object({
  token: z
    .string()
    .min(10, 'Geçersiz sıfırlama token')
    .max(500, 'Geçersiz sıfırlama token'),

  password: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalı')
    .max(100, 'Şifre en fazla 100 karakter olabilir')
    .regex(/[A-Z]/, 'Şifre en az bir büyük harf içermeli')
    .regex(/[a-z]/, 'Şifre en az bir küçük harf içermeli')
    .regex(/[0-9]/, 'Şifre en az bir rakam içermeli')
    .regex(/[^A-Za-z0-9]/, 'Şifre en az bir özel karakter içermeli'),

  confirmPassword: z
    .string()
    .min(8, 'Şifre onayı en az 8 karakter olmalı')
    .max(100, 'Şifre onayı en fazla 100 karakter olabilir'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
});

/**
 * Type exports
 */
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
