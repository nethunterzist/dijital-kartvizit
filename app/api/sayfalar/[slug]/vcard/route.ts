import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { generateVCard } from '@/app/lib/vcardGenerator';
import { logger } from '@/app/lib/logger';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const firma = await prisma.firmalar.findFirst({ where: { slug } });
    if (!firma) {
      return NextResponse.json({ error: 'Firma bulunamadı' }, { status: 404 });
    }
    const vcardContent = await generateVCard({
      firma_adi: firma.firma_adi,
      telefon: firma.telefon ?? undefined,
      eposta: firma.eposta ?? undefined,
      website: firma.website ?? undefined,
      instagram: firma.instagram ?? undefined,
      youtube: firma.youtube ?? undefined,
      linkedin: firma.linkedin ?? undefined,
      twitter: firma.twitter ?? undefined,
      facebook: firma.facebook ?? undefined,
      tiktok: firma.tiktok ?? undefined,
      slug: firma.slug,
      communication_data: firma.communication_data ?? undefined,
      social_media_data: firma.social_media_data ?? undefined,
      yetkili_adi: firma.yetkili_adi ?? undefined
    });
    return new NextResponse(vcardContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/vcard; charset=utf-8',
        'Content-Disposition': `attachment; filename="${firma.slug}.vcf"`
      }
    });
  } catch (error) {
    logger.error('vCard oluşturulurken hata', { error: error instanceof Error ? error.message : String(error), slug: params.slug, stack: error instanceof Error ? error.stack : undefined });
    return NextResponse.json({ error: 'vCard oluşturulurken bir hata oluştu' }, { status: 500 });
  }
} 