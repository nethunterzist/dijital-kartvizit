import { NextRequest, NextResponse } from 'next/server';

// API route - dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import fs from 'fs';
import path from 'path';
import { logger } from '@/app/lib/logger';

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'icon-order.json');

// Varsayılan ikon sıralaması
const DEFAULT_ICON_ORDER = [
  { id: 'paylas', label: 'Paylaş', icon: 'fas fa-share-alt', type: 'system', color: '#9C27B0' },
  { id: 'qr', label: 'QR Kod', icon: 'fas fa-qrcode', type: 'system', color: '#FFD700' },
  { id: 'instagram', label: 'Instagram', icon: 'fab fa-instagram', type: 'social', color: '#E4405F' },
  { id: 'facebook', label: 'Facebook', icon: 'fab fa-facebook', type: 'social', color: '#1877F2' },
  { id: 'twitter', label: 'Twitter', icon: 'fab fa-twitter', type: 'social', color: '#1DA1F2' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'fab fa-linkedin', type: 'social', color: '#0A66C2' },
  { id: 'youtube', label: 'YouTube', icon: 'fab fa-youtube', type: 'social', color: '#FF0000' },
  { id: 'tiktok', label: 'TikTok', icon: 'fab fa-tiktok', type: 'social', color: '#000000' },
  { id: 'telefon', label: 'Telefon', icon: 'fas fa-phone', type: 'communication', color: '#4CAF50' },
  { id: 'eposta', label: 'E-posta', icon: 'fas fa-envelope', type: 'communication', color: '#FF5722' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'fab fa-whatsapp', type: 'communication', color: '#25D366' },
  { id: 'telegram', label: 'Telegram', icon: 'fab fa-telegram', type: 'communication', color: '#0088cc' },
  { id: 'website', label: 'Website', icon: 'fas fa-globe', type: 'communication', color: '#9C27B0' },
  { id: 'harita', label: 'Harita', icon: 'fas fa-map-marker-alt', type: 'communication', color: '#FF9800' },
  { id: 'katalog', label: 'Katalog', icon: 'fas fa-book', type: 'other', color: '#795548' },
  { id: 'banka', label: 'Banka Hesapları', icon: 'fas fa-university', type: 'system', color: '#FFD700' },
  { id: 'vergi', label: 'Vergi Bilgileri', icon: 'fas fa-file-invoice', type: 'system', color: '#2196F3' },
  { id: 'hakkimizda', label: 'Hakkımızda', icon: 'fas fa-info-circle', type: 'system', color: '#2196F3' }
];

// Data klasörünü oluştur
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// İkon sıralamasını oku
function readIconOrder() {
  try {
    ensureDataDir();
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      return parsed.iconOrder || DEFAULT_ICON_ORDER;
    }
    return DEFAULT_ICON_ORDER;
  } catch (error) {
    logger.error('İkon sıralaması okunurken hata', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
    return DEFAULT_ICON_ORDER;
  }
}

// İkon sıralamasını kaydet
function saveIconOrder(iconOrder: any[]) {
  try {
    ensureDataDir();
    const data = {
      iconOrder,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    logger.error('İkon sıralaması kaydedilirken hata', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
    return false;
  }
}

// GET - İkon sıralamasını al
export async function GET() {
  try {
    const iconOrder = readIconOrder();
    return NextResponse.json({ iconOrder });
  } catch (error) {
    logger.error('GET /api/settings/icon-order error', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
    return NextResponse.json(
      { error: 'İkon sıralaması alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST - İkon sıralamasını kaydet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { iconOrder } = body;

    if (!iconOrder || !Array.isArray(iconOrder)) {
      return NextResponse.json(
        { error: 'Geçersiz ikon sıralaması' },
        { status: 400 }
      );
    }

    // İkon sıralamasını doğrula
    const requiredFields = ['id', 'label', 'icon', 'type', 'color'];
    for (const item of iconOrder) {
      for (const field of requiredFields) {
        if (!item[field]) {
          return NextResponse.json(
            { error: `Eksik alan: ${field}` },
            { status: 400 }
          );
        }
      }
    }

    const success = saveIconOrder(iconOrder);
    if (!success) {
      return NextResponse.json(
        { error: 'İkon sıralaması kaydedilemedi' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'İkon sıralaması başarıyla kaydedildi',
      iconOrder 
    });
  } catch (error) {
    logger.error('POST /api/settings/icon-order error', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
    return NextResponse.json(
      { error: 'İkon sıralaması kaydedilirken hata oluştu' },
      { status: 500 }
    );
  }
}
