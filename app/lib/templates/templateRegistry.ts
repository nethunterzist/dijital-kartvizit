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
  },
  {
    id: 23,
    name: 'Doğal Esinti',
    description: 'Organik ve ekolojik - Sürdürülebilirlik odaklı tasarım',
    preview: '/img/template-previews/dogal-esinti.jpg',
    style: 'nature',
    colorScheme: 'Yeşil & Toprak Tonları',
    features: ['Organik', 'Ekolojik', 'Dokulu Arka Plan', 'Doğal']
  },
  {
    id: 25,
    name: 'Zanaatkar Dokunuşu',
    description: 'El yapımı hissi - Kişisel ve samimi tasarım',
    preview: '/img/template-previews/zanaatkar-dokunusu.jpg',
    style: 'artistic',
    colorScheme: 'Krem & Gül Kurusu',
    features: ['El Yazısı', 'Kişisel', 'Samimi', 'Organik Şekiller']
  },
  {
    id: 26,
    name: 'Gelecek Vizyonu',
    description: 'Fütüristik teknoloji - Yapay zeka ve bilim kurgu estetiği',
    preview: '/img/template-previews/gelecek-vizyonu.jpg',
    style: 'tech',
    colorScheme: 'Uzay Mavisi & Turkuaz',
    features: ['Fütüristik', 'Altıgen Motifler', 'Teknolojik', 'Geometrik']
  },
  {
    id: 27,
    name: 'Altın Varak',
    description: 'Lüks ve prestij - Zarif serif fontlar ve altın detaylar',
    preview: '/img/template-previews/altin-varak.jpg',
    style: 'luxury',
    colorScheme: 'Siyah & Antik Altın',
    features: ['Lüks', 'Serif Font', 'Altın Çizgiler', 'Prestijli']
  },
  {
    id: 28,
    name: 'Finans Zirvesi',
    description: 'Kurumsal güvenilirlik - Profesyonel pinstripe deseni',
    preview: '/img/template-previews/finans-zirvesi.jpg',
    style: 'corporate',
    colorScheme: 'Lacivert & Gümüş',
    features: ['Kurumsal', 'Pinstripe', 'Profesyonel', 'Güvenilir']
  },
  {
    id: 29,
    name: 'Art Deco Esintisi',
    description: 'Şık geometrik - Art Deco motifler ve altın detaylar',
    preview: '/img/template-previews/art-deco.jpg',
    style: 'vintage',
    colorScheme: 'Antrasit & Art Deco Altını',
    features: ['Art Deco', 'Geometrik', 'Simetrik', 'Şık']
  },
  {
    id: 30,
    name: 'Sakin Bahçe',
    description: 'Zen minimalizm - Asimetrik yerleşim ve negatif alan',
    preview: '/img/template-previews/sakin-bahce.jpg',
    style: 'minimal',
    colorScheme: 'Taş Grisi & Mavi-Gri',
    features: ['Zen', 'Asimetrik', 'Negatif Alan', 'Sakin']
  },
  {
    id: 32,
    name: 'Akademik Mavi',
    description: 'Eğitim ve resmi - Klasik serif font ve Oxford mavisi',
    preview: '/img/template-previews/akademik-mavi.jpg',
    style: 'classic',
    colorScheme: 'Oxford Mavisi & Beyaz',
    features: ['Akademik', 'Serif Font', 'Resmi', 'Eğitim']
  },
  {
    id: 33,
    name: 'Suluboya Paleti',
    description: 'Sanatsal yumuşaklık - Suluboya dokusu ve el yazısı',
    preview: '/img/template-previews/suluboya-paleti.jpg',
    style: 'artistic',
    colorScheme: 'Pastel Çok Renkli',
    features: ['Suluboya', 'Sanatsal', 'El Yazısı', 'Organik']
  },
  {
    id: 34,
    name: 'Endüstriyel Çelik',
    description: 'Maskülen güç - Fırçalanmış metal dokusu',
    preview: '/img/template-previews/endustriyel-celik.jpg',
    style: 'industrial',
    colorScheme: 'Metalik Gri & Turuncu',
    features: ['Endüstriyel', 'Metal Dokusu', 'Maskülen', 'Güçlü']
  },
  {
    id: 35,
    name: 'Karanlık Mod+',
    description: 'Modern kullanıcı odaklı - Material Design ilhamlı',
    preview: '/img/template-previews/karanlik-mod-plus.jpg',
    style: 'modern',
    colorScheme: 'Siyah & Lavanta Moru',
    features: ['Material Design', 'Karanlık Mod', 'Modern', 'Kullanıcı Odaklı']
  },
  {
    id: 36,
    name: 'Gazete Kağıdı',
    description: 'Vintage entelektüel - Gazete düzeni ve sütunlar',
    preview: '/img/template-previews/gazete-kagidi.jpg',
    style: 'vintage',
    colorScheme: 'Eskitilmiş Kağıt & Siyah',
    features: ['Vintage', 'Gazete Düzeni', 'Sütunlar', 'Entelektüel']
  },
  {
    id: 37,
    name: 'Pop Art Patlaması',
    description: 'Canlı enerji - Çizgi roman tarzı ve halftone desenler',
    preview: '/img/template-previews/pop-art.jpg',
    style: 'artistic',
    colorScheme: 'Parlak Sarı & Canlı Renkler',
    features: ['Pop Art', 'Çizgi Roman', 'Halftone', 'Enerjik']
  },
  {
    id: 38,
    name: 'Mermer Zarafeti',
    description: 'Klas sofistikasyon - Beyaz mermer dokusu ve bronz vurgular',
    preview: '/img/template-previews/mermer-zarafeti.jpg',
    style: 'luxury',
    colorScheme: 'Beyaz Mermer & Bronz',
    features: ['Mermer Dokusu', 'Sofistike', 'Klas', 'Zarif']
  },
  {
    id: 39,
    name: 'Okyanus Derinliği',
    description: 'Sakin akışkan - Su altı kabarcıkları ve dalga animasyonları',
    preview: '/img/template-previews/okyanus-derinligi.jpg',
    style: 'nature',
    colorScheme: 'Derin Okyanus & Köpük Beyazı',
    features: ['Okyanus', 'Kabarcık Animasyonu', 'Sakin', 'Akışkan']
  },
];

export const getTemplateById = (id: number): TemplateInfo | undefined => {
  return TEMPLATES.find(template => template.id === id);
};

export const getDefaultTemplate = (): TemplateInfo => {
  return TEMPLATES[0]; // Modern template
};
