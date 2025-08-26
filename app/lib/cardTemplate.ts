import { goldTemplate } from './templates/template1-gold';
import { wavesTemplate } from './templates/template2-waves';
import { goldenEdgeTemplate } from './templates/template3-golden-edge';
import { redFlowTemplate } from './templates/template4-red-flow';
import { luxuryBlackTemplate } from './templates/template5-luxury-black';
import { lineMeshTemplate } from './templates/template6-line-mesh';
import { colorRingsTemplate } from './templates/template7-color-rings';
import { goldenBlocksTemplate } from './templates/template8-golden-blocks';
import { crystalStripesTemplate } from './templates/template9-crystal-stripes';

export function getTemplateByType(templateId: number = 1): string {
  switch (templateId) {
    case 1:
      return goldTemplate;
    case 2:
      return wavesTemplate;
    case 3:
      return goldenEdgeTemplate;
    case 4:
      return redFlowTemplate;
    case 5:
      return luxuryBlackTemplate;
    case 6:
      return lineMeshTemplate;
    case 7:
      return colorRingsTemplate;
    case 8:
      return goldenBlocksTemplate;
    case 9:
      return crystalStripesTemplate;
    default:
      return goldTemplate; // Varsayılan olarak gold template
  }
}

// Geriye uyumluluk için eski cardTemplate export'u - artık gold template
export const cardTemplate = goldTemplate;
