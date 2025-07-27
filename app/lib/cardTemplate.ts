import { modernTemplate } from './templates/template2-modern';
import { minimalTemplate } from './templates/template3-minimal';
import { corporateTemplate } from './templates/template4-corporate';
import { colorfulTemplate } from './templates/template5-colorful';
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
import { dogalEsintiTemplate } from './templates/template23-dogal-esinti';
import { zanaatkarDokunusuTemplate } from './templates/template25-zanaatkar-dokunusu';
import { gelecekVizyonuTemplate } from './templates/template26-gelecek-vizyonu';
import { altinVarakTemplate } from './templates/template27-altin-varak';
import { finansZirvesiTemplate } from './templates/template28-finans-zirvesi';
import { artDecoTemplate } from './templates/template29-art-deco';
import { sakinBahceTemplate } from './templates/template30-sakin-bahce';
import { akademikMaviTemplate } from './templates/template32-akademik-mavi';
import { suluboyaPaletiTemplate } from './templates/template33-suluboya-paleti';
import { endustriyelCelikTemplate } from './templates/template34-endustriyel-celik';
import { karanlikModTemplate } from './templates/template35-karanlik-mod';
import { gazeteKagidiTemplate } from './templates/template36-gazete-kagidi';
import { popArtPatlamasiTemplate } from './templates/template37-pop-art-patlamasi';
import { mermerZarafetiTemplate } from './templates/template38-mermer-zarafeti';
import { okyanusDerinligiTemplate } from './templates/template39-okyanus-derinligi';

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
    case 23:
      return dogalEsintiTemplate;
    case 25:
      return zanaatkarDokunusuTemplate;
    case 26:
      return gelecekVizyonuTemplate;
    case 27:
      return altinVarakTemplate;
    case 28:
      return finansZirvesiTemplate;
    case 29:
      return artDecoTemplate;
    case 30:
      return sakinBahceTemplate;
    case 32:
      return akademikMaviTemplate;
    case 33:
      return suluboyaPaletiTemplate;
    case 34:
      return endustriyelCelikTemplate;
    case 35:
      return karanlikModTemplate;
    case 36:
      return gazeteKagidiTemplate;
    case 37:
      return popArtPatlamasiTemplate;
    case 38:
      return mermerZarafetiTemplate;
    case 39:
      return okyanusDerinligiTemplate;
    default:
      return modernTemplate; // Varsayılan olarak modern template
  }
}

// Geriye uyumluluk için eski cardTemplate export'u - artık modern template
export const cardTemplate = modernTemplate;
