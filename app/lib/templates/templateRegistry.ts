export interface TemplateInfo {
  id: number;
  name: string;
  description: string;
  preview: string;
  style: 'classic' | 'modern' | 'minimal' | 'corporate' | 'colorful' | 'luxury' | 'artistic' | 'tech' | 'nature' | 'vintage' | 'industrial';
  colorScheme: string;
  features: string[];
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: 1,
    name: 'Gold',
    description: 'Premium altın tema - Lüks ve profesyonel görünüm',
    preview: '/img/template-previews/gold.jpg',
    style: 'luxury',
    colorScheme: 'Altın & Beyaz',
    features: ['Premium', 'Lüks', 'Profesyonel', 'Altın Vurgu']
  },
  {
    id: 2,
    name: 'Waves',
    description: 'Dalgalı tasarım - Modern ve akıcı görünüm',
    preview: '/img/template-previews/waves.jpg',
    style: 'modern',
    colorScheme: 'Mavi & Beyaz',
    features: ['Modern', 'Akıcı', 'Dinamik', 'Dalgalı']
  },
  {
    id: 3,
    name: 'Golden Edge',
    description: 'Altın kenar tasarımı - Şık ve zarafet',
    preview: '/img/template-previews/golden-edge.jpg',
    style: 'luxury',
    colorScheme: 'Altın & Kenar',
    features: ['Zarafet', 'Kenar', 'Altın', 'Şık']
  },
  {
    id: 4,
    name: 'Red Flow',
    description: 'Kırmızı akış - Güçlü ve etkileyici',
    preview: '/img/template-previews/red-flow.jpg',
    style: 'modern',
    colorScheme: 'Kırmızı & Akış',
    features: ['Güçlü', 'Etkileyici', 'Akış', 'Kırmızı']
  },
  {
    id: 5,
    name: 'Luxury Black',
    description: 'Lüks siyah - Premium ve sofistike',
    preview: '/img/template-previews/luxury-black.jpg',
    style: 'luxury',
    colorScheme: 'Siyah & Premium',
    features: ['Lüks', 'Siyah', 'Premium', 'Sofistike']
  },
  {
    id: 6,
    name: 'Line Mesh',
    description: 'Çizgi ağı - Geometrik ve modern',
    preview: '/img/template-previews/line-mesh.jpg',
    style: 'modern',
    colorScheme: 'Çizgi & Ağ',
    features: ['Geometrik', 'Modern', 'Çizgi', 'Ağ']
  },
  {
    id: 7,
    name: 'Color Rings',
    description: 'Renkli halkalar - Canlı ve yaratık',
    preview: '/img/template-previews/color-rings.jpg',
    style: 'colorful',
    colorScheme: 'Çok Renkli',
    features: ['Canlı', 'Yaratık', 'Halkalar', 'Renkli']
  },
  {
    id: 8,
    name: 'Golden Blocks',
    description: 'Altın bloklar - Yapısal ve güçlü',
    preview: '/img/template-previews/golden-blocks.jpg',
    style: 'luxury',
    colorScheme: 'Altın & Blok',
    features: ['Yapısal', 'Güçlü', 'Bloklar', 'Altın']
  },
  {
    id: 9,
    name: 'Crystal Stripes',
    description: 'Kristal şeritler - Şeffaf ve ince',
    preview: '/img/template-previews/crystal-stripes.jpg',
    style: 'minimal',
    colorScheme: 'Kristal & Şerit',
    features: ['Şeffaf', 'İnce', 'Kristal', 'Şerit']
  },
];

export const getTemplateById = (id: number): TemplateInfo | undefined => {
  return TEMPLATES.find(template => template.id === id);
};

export const getDefaultTemplate = (): TemplateInfo => {
  return TEMPLATES[0]; // Gold template
};
