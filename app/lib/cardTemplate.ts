import { goldTemplate } from './templates/template1-gold';

export function getTemplateByType(templateId: number = 1): string {
  switch (templateId) {
    case 1:
      return goldTemplate;
    default:
      return goldTemplate; // Varsayılan olarak gold template
  }
}

// Geriye uyumluluk için eski cardTemplate export'u - artık gold template
export const cardTemplate = goldTemplate;
