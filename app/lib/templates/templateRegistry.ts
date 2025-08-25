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
];

export const getTemplateById = (id: number): TemplateInfo | undefined => {
  return TEMPLATES.find(template => template.id === id);
};

export const getDefaultTemplate = (): TemplateInfo => {
  return TEMPLATES[0]; // Retro Signal template
};
