export interface TemplateInfo {
  id: number;
  name: string;
  description: string;
  preview: string;
  style: 'classic' | 'modern' | 'minimal' | 'corporate' | 'colorful' | 'luxury';
  colorScheme: string;
  features: string[];
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: 2,
    name: 'Modern',
    description: 'Modern tasarım - Gradient arka plan ve dinamik kartlar',
    preview: '/img/template-previews/modern.jpg',
    style: 'modern',
    colorScheme: 'Mavi Gradient',
    features: ['Gradient Arka Plan', 'Dinamik Kartlar', 'Modern Animasyonlar', 'Responsive']
  },
  {
    id: 3,
    name: 'Minimal',
    description: 'Minimal tasarım - Sade beyaz arka plan',
    preview: '/img/template-previews/minimal.jpg',
    style: 'minimal',
    colorScheme: 'Beyaz & Gri',
    features: ['Sade Tasarım', 'Liste Formatı', 'Temiz Tipografi', 'Hızlı Yükleme']
  },
  {
    id: 4,
    name: 'Corporate',
    description: 'Kurumsal tasarım - Koyu arka plan ve premium görünüm',
    preview: '/img/template-previews/corporate.jpg',
    style: 'corporate',
    colorScheme: 'Koyu & Altın',
    features: ['Koyu Tema', 'Premium Görünüm', 'Kurumsal Stil', 'Profesyonel']
  },
  {
    id: 5,
    name: 'Colorful',
    description: 'Renkli tasarım - Canlı renkler ve dinamik görünüm',
    preview: '/img/template-previews/colorful.jpg',
    style: 'colorful',
    colorScheme: 'Çok Renkli',
    features: ['Canlı Renkler', 'Animasyonlar', 'Dinamik Geçişler', 'Eğlenceli']
  },
  {
    id: 6,
    name: 'Luxury',
    description: 'Lüks tasarım - Altın çizgiler ve büyük profil fotoğrafı',
    preview: '/img/template-previews/luxury.jpg',
    style: 'luxury',
    colorScheme: 'Beyaz & Altın',
    features: ['Altın Çizgiler', 'Büyük Profil', 'Kare İkonlar', 'Premium Görünüm']
  },
  {
    id: 7,
    name: 'Corporate Slate',
    description: 'Kurumsal gri tema - Profesyonel ve şık görünüm',
    preview: '/img/template-previews/corporate-slate.jpg',
    style: 'corporate',
    colorScheme: 'Gri & Mavi',
    features: ['Kurumsal Gri', 'Profesyonel', 'Şık Tasarım', 'İş Dünyası']
  },
  {
    id: 8,
    name: 'Clean Sheet',
    description: 'Temiz beyaz tasarım - Sade ve modern görünüm',
    preview: '/img/template-previews/clean-sheet.jpg',
    style: 'minimal',
    colorScheme: 'Beyaz & Mavi',
    features: ['Temiz Beyaz', 'Sade Tasarım', 'Modern', 'Minimalist']
  },
  {
    id: 9,
    name: 'Night Pulse',
    description: 'Koyu tema - Gece modu ve neon efektler',
    preview: '/img/template-previews/night-pulse.jpg',
    style: 'modern',
    colorScheme: 'Koyu & Neon',
    features: ['Gece Modu', 'Neon Efektler', 'Koyu Tema', 'Modern']
  },
  {
    id: 10,
    name: 'Glass Aura',
    description: 'Cam efekti - Şeffaf ve modern görünüm',
    preview: '/img/template-previews/glass-aura.jpg',
    style: 'modern',
    colorScheme: 'Şeffaf & Mavi',
    features: ['Cam Efekti', 'Şeffaflık', 'Modern', 'Blur Efektler']
  },
  {
    id: 11,
    name: 'Pastel Bloom',
    description: 'Pastel renkler - Yumuşak ve sevimli görünüm',
    preview: '/img/template-previews/pastel-bloom.jpg',
    style: 'colorful',
    colorScheme: 'Pastel Renkler',
    features: ['Pastel Renkler', 'Yumuşak', 'Sevimli', 'Renkli']
  },
  {
    id: 12,
    name: 'Retro Signal',
    description: 'Vintage tema - Nostaljik ve retro görünüm',
    preview: '/img/template-previews/retro-signal.jpg',
    style: 'classic',
    colorScheme: 'Vintage & Kahverengi',
    features: ['Vintage', 'Retro', 'Nostaljik', 'Klasik']
  },
  {
    id: 13,
    name: 'Gridfolio',
    description: 'Grid tasarım - Düzenli ve sistematik görünüm',
    preview: '/img/template-previews/gridfolio.jpg',
    style: 'minimal',
    colorScheme: 'Gri & Cyan',
    features: ['Grid Tasarım', 'Düzenli', 'Sistematik', 'Temiz']
  },
  {
    id: 14,
    name: 'MonoTone',
    description: 'Tek renk - Siyah beyaz minimalist görünüm',
    preview: '/img/template-previews/monotone.jpg',
    style: 'minimal',
    colorScheme: 'Siyah & Beyaz',
    features: ['Monokrom', 'Minimalist', 'Siyah Beyaz', 'Şık']
  },
  {
    id: 15,
    name: 'Vibe Stream',
    description: 'Neon akış - Canlı renkler ve animasyonlar',
    preview: '/img/template-previews/vibe-stream.jpg',
    style: 'modern',
    colorScheme: 'Neon & Gradient',
    features: ['Neon Renkler', 'Animasyonlar', 'Canlı', 'Dinamik']
  },
  {
    id: 16,
    name: 'Goldmark',
    description: 'Altın tema - Lüks ve premium görünüm',
    preview: '/img/template-previews/goldmark.jpg',
    style: 'luxury',
    colorScheme: 'Siyah & Altın',
    features: ['Altın Tema', 'Lüks', 'Premium', 'Şık']
  },
  {
    id: 17,
    name: 'Green Soul',
    description: 'Yeşil tema - Doğal ve huzurlu görünüm',
    preview: '/img/template-previews/green-soul.jpg',
    style: 'colorful',
    colorScheme: 'Yeşil Tonları',
    features: ['Yeşil Tema', 'Doğal', 'Huzurlu', 'Organik']
  },
  {
    id: 18,
    name: 'Ocean Breeze',
    description: 'Okyanus teması - Mavi tonlar ve ferah görünüm',
    preview: '/img/template-previews/ocean-breeze.jpg',
    style: 'modern',
    colorScheme: 'Mavi Tonları',
    features: ['Okyanus Teması', 'Mavi Tonlar', 'Ferah', 'Sakin']
  },
  {
    id: 19,
    name: 'Sunset Glow',
    description: 'Gün batımı - Sıcak renkler ve gradient',
    preview: '/img/template-previews/sunset-glow.jpg',
    style: 'colorful',
    colorScheme: 'Turuncu & Sarı',
    features: ['Gün Batımı', 'Sıcak Renkler', 'Gradient', 'Canlı']
  },
  {
    id: 20,
    name: 'Purple Rain',
    description: 'Mor tema - Mistik ve büyülü görünüm',
    preview: '/img/template-previews/purple-rain.jpg',
    style: 'modern',
    colorScheme: 'Mor Tonları',
    features: ['Mor Tema', 'Mistik', 'Büyülü', 'Gradient']
  },
  {
    id: 21,
    name: 'Crimson Edge',
    description: 'Kırmızı tema - Güçlü ve etkileyici görünüm',
    preview: '/img/template-previews/crimson-edge.jpg',
    style: 'modern',
    colorScheme: 'Siyah & Kırmızı',
    features: ['Kırmızı Tema', 'Güçlü', 'Etkileyici', 'Koyu']
  }
];

export const getTemplateById = (id: number): TemplateInfo | undefined => {
  return TEMPLATES.find(template => template.id === id);
};

export const getDefaultTemplate = (): TemplateInfo => {
  return TEMPLATES[0]; // Modern template
};
