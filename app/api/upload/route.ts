import { NextRequest, NextResponse } from 'next/server';

// API route - dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { LocalFileUploadService } from '@/app/lib/services/LocalFileUploadService';
import { uploadToCloudinary } from '@/app/lib/cloudinary';

// SECURITY: File upload configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf'];
const MALICIOUS_EXTENSIONS = ['.exe', '.sh', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar', '.php', '.asp', '.aspx', '.jsp'];

// Sanitize filename: remove path traversal, special chars, limit length
function sanitizeFilename(filename: string): string {
  // Remove path separators and null bytes
  let sanitized = filename.replace(/[\/\\.\0]/g, '_');
  // Allow only alphanumeric, dash, underscore, and single dot for extension
  sanitized = sanitized.replace(/[^a-zA-Z0-9_-]+/g, '_');
  // Limit length to 100 characters
  sanitized = sanitized.substring(0, 100);
  return sanitized;
}

// Validate file content matches declared MIME type (basic check)
function validateFileContent(file: File): boolean {
  // This is a basic check - in production, use magic number validation
  const extension = file.name.toLowerCase().split('.').pop() || '';

  const validExtensions: Record<string, string[]> = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/webp': ['webp'],
    'application/pdf': ['pdf']
  };

  const allowedExtensions = validExtensions[file.type];
  return allowedExtensions ? allowedExtensions.includes(extension) : false;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    // URL parametrelerinden klasör ve dosya tipi bilgisi al
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'firma_logolari';

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    // SECURITY: Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({
        error: 'Dosya boyutu çok büyük',
        details: `Maksimum dosya boyutu: ${MAX_FILE_SIZE / 1024 / 1024}MB`
      }, { status: 413 });
    }

    // SECURITY: Validate MIME type
    const isPdf = file.type === 'application/pdf';
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isAllowedType = isPdf || isImage;

    if (!isAllowedType) {
      return NextResponse.json({
        error: 'Geçersiz dosya tipi',
        details: 'Sadece JPEG, PNG, WebP ve PDF dosyaları kabul edilir'
      }, { status: 400 });
    }

    // SECURITY: Validate file content matches MIME type
    if (!validateFileContent(file)) {
      return NextResponse.json({
        error: 'Dosya içeriği dosya türüyle eşleşmiyor',
        details: 'Dosya uzantısı ve içeriği uyumsuz'
      }, { status: 400 });
    }

    // SECURITY: Check for malicious file extensions
    const filename = file.name.toLowerCase();
    const hasMaliciousExtension = MALICIOUS_EXTENSIONS.some(ext => filename.endsWith(ext));
    if (hasMaliciousExtension) {
      return NextResponse.json({
        error: 'Güvenlik: Tehlikeli dosya uzantısı tespit edildi'
      }, { status: 400 });
    }

    // SECURITY: Sanitize filename
    const originalName = file.name;
    const sanitizedName = sanitizeFilename(originalName);

    // Klasör isimlerini kontrol et
    const allowedFolders = ['firma_logolari', 'profil_fotograflari', 'firma_kataloglari'];
    if (!allowedFolders.includes(folder)) {
      return NextResponse.json({ error: 'Geçersiz klasör' }, { status: 400 });
    }

    // Production'da Cloudinary, development'ta local storage kullan
    let fileUrl: string;

    if (process.env.NODE_ENV === 'production' && process.env.CLOUDINARY_CLOUD_NAME) {
      // Production: Cloudinary'ye yükle
      try {
        fileUrl = await uploadToCloudinary(file, folder);
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        return NextResponse.json({
          error: 'Cloudinary yüklemesi başarısız',
          details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
      }
    } else {
      // Development: Local file system'e yükle
      const result = await LocalFileUploadService.uploadSingleFile(
        file,
        folder,
        isPdf
      );

      if (!result.success || !result.url) {
        return NextResponse.json({ error: result.error || 'Dosya yükleme başarısız' }, { status: 500 });
      }

      fileUrl = result.url;
    }

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    // SECURITY: Environment-aware error handling
    if (process.env.NODE_ENV === 'production') {
      // Production: Generic error only
      console.error('Upload error occurred');
      return NextResponse.json({
        error: 'Dosya yüklenirken bir hata oluştu'
      }, { status: 500 });
    } else {
      // Development: Detailed error for debugging
      console.error('Upload API error:', error);
      return NextResponse.json({
        error: 'Yükleme başarısız',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
  }
}
