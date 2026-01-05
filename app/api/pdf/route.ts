import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/app/lib/logger';

// API route - dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * PDF Proxy API Route
 *
 * Cloudinary'den PDF'leri çeker ve Content-Disposition header'ını "inline" yaparak
 * browser'da görüntülemeyi sağlar.
 *
 * Cloudinary'nin raw resource type'ı her zaman "attachment" header'ı gönderir,
 * bu da dosyanın download edilmesine sebep olur. Bu proxy ile header'ı override ediyoruz.
 */
export async function GET(request: NextRequest) {
  const cloudinaryUrl = request.nextUrl.searchParams.get('url');

  if (!cloudinaryUrl) {
    logger.warn('PDF proxy: Missing URL parameter');
    return NextResponse.json(
      { error: 'Missing URL parameter' },
      { status: 400 }
    );
  }

  // SECURITY: Sadece Cloudinary URL'lerini kabul et
  if (!cloudinaryUrl.includes('res.cloudinary.com')) {
    logger.warn('PDF proxy: Invalid URL (not Cloudinary)', { url: cloudinaryUrl });
    return NextResponse.json(
      { error: 'Invalid URL - only Cloudinary URLs are allowed' },
      { status: 400 }
    );
  }

  try {
    logger.info('PDF proxy: Fetching from Cloudinary', {
      url: cloudinaryUrl,
      userAgent: request.headers.get('user-agent') || 'unknown'
    });

    // Cloudinary'den PDF'i fetch et (streaming)
    const response = await fetch(cloudinaryUrl, {
      // Cache for better performance
      next: { revalidate: 3600 } // 1 hour cache
    });

    if (!response.ok) {
      const errorMessage = `Cloudinary responded with ${response.status}`;
      logger.error('PDF proxy: Cloudinary fetch failed', {
        url: cloudinaryUrl,
        status: response.status,
        statusText: response.statusText
      });
      throw new Error(errorMessage);
    }

    // Response body'yi stream olarak al (memory efficient)
    const blob = await response.blob();

    logger.info('PDF proxy: Successfully fetched PDF', {
      url: cloudinaryUrl,
      size: blob.size,
      type: blob.type
    });

    // Yeni response oluştur - header'ları override et
    return new Response(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline', // ← KEY: Browser'da aç, download etme
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Accept-Ranges': 'bytes',
      },
    });
  } catch (error) {
    logger.error('PDF proxy: Fetch failed', {
      url: cloudinaryUrl,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      {
        error: 'PDF fetch failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
