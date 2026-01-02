import { NextRequest, NextResponse } from 'next/server';

// API route - dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import prisma from '@/app/lib/db';
import { generateVCard } from '@/app/lib/vcardGenerator';
import { logger } from '@/app/lib/logger';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    // Use direct database access like the main page
    const { getFirmaWithCommunication } = await import('@/app/lib/direct-db');
    const firma = await getFirmaWithCommunication(slug);
    
    if (!firma) {
      return NextResponse.json({ error: 'Firma bulunamadı' }, { status: 404 });
    }

    // Extract first values from communication data for vCard
    let telefon = '';
    let eposta = '';
    let website = '';
    
    // Find first phone number
    const telefonItem = firma.iletisim_bilgileri.find((item: any) => item.tip === 'telefon');
    if (telefonItem) telefon = telefonItem.deger;

    // Find first email
    const emailItem = firma.iletisim_bilgileri.find((item: any) => item.tip === 'eposta');
    if (emailItem) eposta = emailItem.deger;

    // Find first website
    const websiteItem = firma.iletisim_bilgileri.find((item: any) => item.tip === 'website');
    if (websiteItem) website = websiteItem.deger;

    const vcardContent = await generateVCard({
      firma_adi: firma.firma_adi,
      yetkili_adi: firma.yetkili_adi ?? undefined,
      yetkili_pozisyon: firma.yetkili_pozisyon ?? undefined,
      telefon: telefon || undefined,
      eposta: eposta || undefined,
      website: website || undefined,
      slug: firma.slug
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