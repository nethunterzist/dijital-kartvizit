import fs from 'fs';
import path from 'path';
import { logger } from './logger';

interface IconItem {
  id: string;
  label: string;
  icon: string;
  type: 'social' | 'communication' | 'system' | 'other';
  color: string;
}

// Varsayılan ikon sıralaması
const DEFAULT_ICON_ORDER: IconItem[] = [
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

interface FirmaData {
  social_media?: any[];
  communication?: any[];
  katalog?: any;
  iban?: any;
  tax?: any;
  about?: any;
}

// İkon sıralamasını dosyadan oku
export function getIconOrder(): IconItem[] {
  try {
    const settingsFile = path.join(process.cwd(), 'data', 'icon-order.json');
    if (fs.existsSync(settingsFile)) {
      const data = fs.readFileSync(settingsFile, 'utf8');
      const parsed = JSON.parse(data);
      return parsed.iconOrder || DEFAULT_ICON_ORDER;
    }
    return DEFAULT_ICON_ORDER;
  } catch (error) {
    logger.error('İkon sıralaması okunurken hata', { error });
    return DEFAULT_ICON_ORDER;
  }
}

// Firma verilerine göre ikonları sırala ve filtrele
export function getOrderedIcons(firmaData: FirmaData): IconItem[] {
  const iconOrder = getIconOrder();
  const orderedIcons: IconItem[] = [];

  // Her ikon için kontrol et ve varsa ekle
  for (const iconConfig of iconOrder) {
    let shouldInclude = false;

    switch (iconConfig.id) {
      case 'paylas':
        // Paylaş butonu her zaman dahil
        shouldInclude = true;
        break;
        
      case 'qr':
        // QR kod her zaman dahil
        shouldInclude = true;
        break;
      
      case 'instagram':
      case 'facebook':
      case 'twitter':
      case 'linkedin':
      case 'youtube':
      case 'tiktok':
        // Sosyal medya kontrolü
        shouldInclude = firmaData.social_media?.some(
          social => social.platform === iconConfig.id && social.url
        ) || false;
        break;
      
      case 'telefon':
      case 'eposta':
      case 'whatsapp':
      case 'telegram':
      case 'website':
      case 'harita':
        // İletişim kontrolü
        shouldInclude = firmaData.communication?.some(
          comm => comm.tip === iconConfig.id && comm.value
        ) || false;
        break;
      
      case 'katalog':
        shouldInclude = !!(firmaData.katalog?.url);
        break;
      
      case 'banka':
        shouldInclude = !!(firmaData.iban?.value);
        break;
      
      case 'vergi':
        shouldInclude = !!(firmaData.tax?.firma_unvan);
        break;
      
      case 'hakkimizda':
        shouldInclude = !!(firmaData.about?.content);
        break;
    }

    if (shouldInclude) {
      orderedIcons.push(iconConfig);
    }
  }

  return orderedIcons;
}

// İkon ID'sine göre bilgileri al
export function getIconInfo(iconId: string): IconItem | null {
  const iconOrder = getIconOrder();
  return iconOrder.find(icon => icon.id === iconId) || null;
}

// Varsayılan sıralamayı al
export function getDefaultIconOrder(): IconItem[] {
  return DEFAULT_ICON_ORDER;
}
