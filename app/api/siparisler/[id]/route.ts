import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const siparisId = parseInt(params.id);
    const body = await request.json();
    
    const {
      durum,
      odeme_durumu,
      admin_notu,
      odeme_tarihi,
      tamamlanma_tarihi
    } = body;

    // Güncelleme verilerini hazırla
    const updateData: any = {};
    
    if (durum) updateData.durum = durum;
    if (odeme_durumu) updateData.odeme_durumu = odeme_durumu;
    if (admin_notu !== undefined) updateData.admin_notu = admin_notu;
    if (odeme_tarihi) updateData.odeme_tarihi = new Date(odeme_tarihi);
    if (tamamlanma_tarihi) updateData.tamamlanma_tarihi = new Date(tamamlanma_tarihi);

    // Siparişi güncelle
    const updatedSiparis = await prisma.siparisler.update({
      where: { id: siparisId },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: updatedSiparis
    });

  } catch (error) {
    console.error('Sipariş güncelleme hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Sipariş güncellenemedi' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const siparisId = parseInt(params.id);

    const siparis = await prisma.siparisler.findUnique({
      where: { id: siparisId }
    });

    if (!siparis) {
      return NextResponse.json(
        { success: false, error: 'Sipariş bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: siparis
    });

  } catch (error) {
    console.error('Sipariş getirme hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Sipariş getirilemedi' },
      { status: 500 }
    );
  }
}
