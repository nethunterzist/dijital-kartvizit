import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Son eklenen firmayı getir
    const lastFirm = await prisma.firmalar.findFirst({
      orderBy: {
        created_at: 'desc'
      },
      select: {
        id: true,
        firma_adi: true,
        slug: true,
        katalog: true,
        profil_foto: true,
        firma_logo: true,
        created_at: true,
        updated_at: true
      }
    });

    if (!lastFirm) {
      return NextResponse.json({ error: 'Firma bulunamadı' }, { status: 404 });
    }

    return NextResponse.json({
      firma: lastFirm,
      katalog_info: {
        mevcut: !!lastFirm.katalog,
        url: lastFirm.katalog,
        url_type: lastFirm.katalog?.startsWith('/uploads/') ? 'LOCAL_STORAGE' :
                   lastFirm.katalog?.includes('cloudinary.com') ? 'CLOUDINARY' :
                   'OTHER',
        cloudinary_detail: lastFirm.katalog?.includes('cloudinary.com') ? {
          is_raw: lastFirm.katalog.includes('/raw/upload/'),
          is_image: lastFirm.katalog.includes('/image/upload/'),
          is_auto: lastFirm.katalog.includes('/upload/') && !lastFirm.katalog.includes('/raw/') && !lastFirm.katalog.includes('/image/')
        } : null
      },
      url: `https://dijitalkartvizitmerkezi.com/${lastFirm.slug}`
    });

  } catch (error) {
    logger.error('Debug API error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return NextResponse.json({
      error: 'API hatası',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
