import { NextRequest, NextResponse } from 'next/server';
import { LocalFileUploadService } from '@/app/lib/services/LocalFileUploadService';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    // URL parametrelerinden klasör ve dosya tipi bilgisi al
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'firma_logolari';
    const isPdf = file.type === 'application/pdf';

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    // Klasör isimlerini kontrol et
    const allowedFolders = ['firma_logolari', 'profil_fotograflari', 'firma_kataloglari'];
    if (!allowedFolders.includes(folder)) {
      return NextResponse.json({ error: 'Geçersiz klasör' }, { status: 400 });
    }

    // Tek dosya yükleme için local service kullan
    const result = await LocalFileUploadService.uploadSingleFile(
      file, 
      folder,
      isPdf
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ url: result.url });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 });
  }
}
