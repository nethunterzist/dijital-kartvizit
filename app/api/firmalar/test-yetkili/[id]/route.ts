import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';

/**
 * Yetkili ve ünvan bilgilerinin kaydını test etmek için API
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const firmaId = parseInt(params.id);
    
    if (isNaN(firmaId)) {
      return NextResponse.json(
        { message: 'Geçersiz firma ID', success: false },
        { status: 400 }
      );
    }
    
    // Gelen veriyi al
    const data = await req.json();
    logger.info('Test verileri alındı', { firmaId, data });
    
    // Firma kontrolü
    const existingFirma = await prisma.firmalar.findUnique({
      where: { id: firmaId }
    });
    
    if (!existingFirma) {
      return NextResponse.json(
        { message: 'Firma bulunamadı', success: false },
        { status: 404 }
      );
    }
    
    // Yetkili ve ünvan bilgilerini güncelle
    const updatedFirma = await prisma.firmalar.update({
      where: { id: firmaId },
      data: {
        yetkili_adi: data.yetkili_adi || null,
        yetkili_pozisyon: data.yetkili_pozisyon || null,
        firma_unvan: data.firma_unvan || null,
        updated_at: new Date()
      },
    });
    
    logger.info('Güncelleme sonrası firma', {
      id: updatedFirma.id,
      firma_adi: updatedFirma.firma_adi,
      yetkili_adi: updatedFirma.yetkili_adi,
      yetkili_pozisyon: updatedFirma.yetkili_pozisyon,
      firma_unvan: updatedFirma.firma_unvan
    });
    
    return NextResponse.json({ 
      message: 'Yetkili bilgileri güncellendi', 
      success: true,
      data: {
        id: updatedFirma.id,
        firma_adi: updatedFirma.firma_adi,
        yetkili_adi: updatedFirma.yetkili_adi,
        yetkili_pozisyon: updatedFirma.yetkili_pozisyon,
        firma_unvan: updatedFirma.firma_unvan
      }
    });
  } catch (error) {
    logger.error('Test sırasında hata oluştu', { error: error instanceof Error ? error.message : String(error), firmaId, stack: error instanceof Error ? error.stack : undefined });
    return NextResponse.json(
      { message: 'Test sırasında bir hata oluştu', error: String(error), success: false },
      { status: 500 }
    );
  }
} 