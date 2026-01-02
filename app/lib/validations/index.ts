/**
 * Validation Utilities
 *
 * Helper functions for validating data with Zod schemas
 */

import { z, ZodSchema, ZodError } from 'zod';
import { ValidationError, ErrorFormatter } from '../errors';

/**
 * Validate data against a Zod schema
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validated and typed data
 * @throws ValidationError if validation fails
 */
export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = ErrorFormatter.formatZodError(error);
      throw new ValidationError('Doğrulama hatası', formattedErrors);
    }
    throw error;
  }
}

/**
 * Safely validate data and return result object
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Object with success flag, data (if success), and errors (if failed)
 */
export function validateSafe<T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: any } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = ErrorFormatter.formatZodError(error);
      return { success: false, errors: formattedErrors };
    }
    return {
      success: false,
      errors: { _error: ['Doğrulama hatası'] },
    };
  }
}

/**
 * Validate partial data (useful for updates)
 *
 * @param schema - Zod schema to validate against
 * @param data - Partial data to validate
 * @returns Validated and typed partial data
 * @throws ValidationError if validation fails
 */
export function validatePartial<T>(schema: ZodSchema<T>, data: unknown): Partial<T> {
  try {
    // Use partial() method if available on schema
    const partialSchema = (schema as any).partial ? (schema as any).partial() : schema;
    return partialSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = ErrorFormatter.formatZodError(error);
      throw new ValidationError('Doğrulama hatası', formattedErrors);
    }
    throw error;
  }
}

/**
 * Parse and validate JSON string
 *
 * @param schema - Zod schema to validate against
 * @param jsonString - JSON string to parse and validate
 * @returns Validated and typed data
 * @throws ValidationError if parsing or validation fails
 */
export function parseAndValidate<T>(schema: ZodSchema<T>, jsonString: string): T {
  try {
    const data = JSON.parse(jsonString);
    return validate(schema, data);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new ValidationError('Geçersiz JSON formatı');
    }
    throw error;
  }
}

/**
 * Validate FormData
 *
 * Converts FormData to object and validates against schema
 *
 * @param schema - Zod schema to validate against
 * @param formData - FormData to validate
 * @returns Validated and typed data
 * @throws ValidationError if validation fails
 */
export function validateFormData<T>(schema: ZodSchema<T>, formData: FormData): T {
  const data: Record<string, any> = {};

  // Convert FormData to object
  const entries = Array.from(formData.entries());
  for (const [key, value] of entries) {
    // Skip File objects
    if (value instanceof File) {
      continue;
    }

    // Handle array fields (field[0], field[1], etc.)
    const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);
    if (arrayMatch) {
      const fieldName = arrayMatch[1];
      const index = parseInt(arrayMatch[2]);

      if (!data[fieldName]) {
        data[fieldName] = [];
      }

      data[fieldName][index] = value;
      continue;
    }

    // Handle nested fields (field.subfield)
    if (key.includes('.')) {
      const parts = key.split('.');
      let current = data;

      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }

      current[parts[parts.length - 1]] = value;
      continue;
    }

    // Regular field
    data[key] = value;
  }

  return validate(schema, data);
}

/**
 * Validate query parameters
 *
 * @param schema - Zod schema to validate against
 * @param searchParams - URLSearchParams to validate
 * @returns Validated and typed data
 * @throws ValidationError if validation fails
 */
export function validateQueryParams<T>(
  schema: ZodSchema<T>,
  searchParams: URLSearchParams
): T {
  const data: Record<string, any> = {};

  const entries = Array.from(searchParams.entries());
  for (const [key, value] of entries) {
    data[key] = value;
  }

  return validate(schema, data);
}

/**
 * Sanitize string input
 *
 * Removes potentially dangerous characters and limits length
 */
export function sanitizeString(input: string, maxLength: number = 255): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent XSS
    .substring(0, maxLength);
}

/**
 * Validate and sanitize slug
 *
 * Ensures slug is URL-safe
 */
export function validateSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric with dash
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-|-$/g, ''); // Remove leading/trailing dashes
}

/**
 * Validate IBAN format
 *
 * @param iban - IBAN to validate
 * @returns True if valid Turkish IBAN
 */
export function validateIBAN(iban: string): boolean {
  // Remove spaces and convert to uppercase
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();

  // Check Turkish IBAN format (TR + 24 digits)
  const ibanRegex = /^TR\d{24}$/;

  return ibanRegex.test(cleanIban);
}

/**
 * Validate email format
 *
 * @param email - Email to validate
 * @returns True if valid email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Turkish phone number
 *
 * @param phone - Phone number to validate
 * @returns True if valid Turkish phone format
 */
export function validatePhone(phone: string): boolean {
  // Remove spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-()]/g, '');

  // Turkish phone formats:
  // 05XXXXXXXXX (11 digits starting with 0)
  // +905XXXXXXXXX (13 digits starting with +90)
  // 905XXXXXXXXX (12 digits starting with 90)
  const phoneRegex = /^(\+?90|0)?5\d{9}$/;

  return phoneRegex.test(cleanPhone);
}

/**
 * Export all schemas for convenience
 */
export * from './firma.schema';
export * from './auth.schema';

// Alias exports for backward compatibility
export {
  firmaSchema as createFirmaSchema,
  iletisimSchema as iletisimBilgisiSchema,
  sosyalMedyaSchema as sosyalMedyaHesabiSchema,
} from './firma.schema';

// File upload validation schemas
export const fileUploadSchema = z.object({
  size: z.number().max(5 * 1024 * 1024, 'Dosya boyutu 5MB\'dan küçük olmalı'),
  type: z.enum(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'], {
    errorMap: () => ({ message: 'Desteklenen formatlar: JPG, PNG, WEBP' }),
  }),
});

export const pdfUploadSchema = z.object({
  size: z.number().max(10 * 1024 * 1024, 'PDF boyutu 10MB\'dan küçük olmalı'),
  type: z.enum(['application/pdf'], {
    errorMap: () => ({ message: 'Sadece PDF dosyaları kabul edilir' }),
  }),
});

// HTML content validation
export const safeHtmlSchema = z.string().max(10000, 'İçerik çok uzun');

// Slug validation
export const slugSchema = z
  .string()
  .min(2, 'Slug en az 2 karakter olmalı')
  .max(100, 'Slug en fazla 100 karakter olabilir')
  .regex(/^[a-z0-9-]+$/, 'Slug sadece küçük harf, rakam ve tire içerebilir');
