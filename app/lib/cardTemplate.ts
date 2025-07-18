import { modernTemplate } from './templates/template2-modern';
import { minimalTemplate } from './templates/template3-minimal';
import { corporateTemplate } from './templates/template4-corporate';
import { colorfulTemplate } from './templates/template5-colorful';
import { luxuryTemplate } from './templates/template6-luxury';
import { corporateSlateTemplate } from './templates/template7-corporate-slate';
import { cleanSheetTemplate } from './templates/template8-clean-sheet';
import { nightPulseTemplate } from './templates/template9-night-pulse';
import { glassAuraTemplate } from './templates/template10-glass-aura';
import { pastelBloomTemplate } from './templates/template11-pastel-bloom';
import { retroSignalTemplate } from './templates/template12-retro-signal';
import { gridfolioTemplate } from './templates/template13-gridfolio';
import { monotoneTemplate } from './templates/template14-monotone';
import { vibeStreamTemplate } from './templates/template15-vibe-stream';
import { goldmarkTemplate } from './templates/template16-goldmark';
import { greenSoulTemplate } from './templates/template17-green-soul';
import { oceanBreezeTemplate } from './templates/template18-ocean-breeze';
import { sunsetGlowTemplate } from './templates/template19-sunset-glow';
import { purpleRainTemplate } from './templates/template20-purple-rain';
import { crimsonEdgeTemplate } from './templates/template21-crimson-edge';

export function getTemplateByType(templateId: number = 2): string {
  switch (templateId) {
    case 2:
      return modernTemplate;
    case 3:
      return minimalTemplate;
    case 4:
      return corporateTemplate;
    case 5:
      return colorfulTemplate;
    case 6:
      return luxuryTemplate;
    case 7:
      return corporateSlateTemplate;
    case 8:
      return cleanSheetTemplate;
    case 9:
      return nightPulseTemplate;
    case 10:
      return glassAuraTemplate;
    case 11:
      return pastelBloomTemplate;
    case 12:
      return retroSignalTemplate;
    case 13:
      return gridfolioTemplate;
    case 14:
      return monotoneTemplate;
    case 15:
      return vibeStreamTemplate;
    case 16:
      return goldmarkTemplate;
    case 17:
      return greenSoulTemplate;
    case 18:
      return oceanBreezeTemplate;
    case 19:
      return sunsetGlowTemplate;
    case 20:
      return purpleRainTemplate;
    case 21:
      return crimsonEdgeTemplate;
    default:
      return modernTemplate; // Varsayılan olarak modern template
  }
}

// Geriye uyumluluk için eski cardTemplate export'u - artık modern template
export const cardTemplate = modernTemplate;
