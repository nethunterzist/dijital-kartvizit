const fs = require('fs');
const path = require('path');

// Template'lerin tasarım özelliklerini analiz etmek için basit bir mapping
const templateStyles = {
  // Modern serisi (1-10)
  2: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', accent: '#667eea', style: 'modern' },
  3: { bg: '#ffffff', color: '#1f2937', accent: '#374151', style: 'minimal' },
  4: { bg: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)', color: '#ffffff', accent: '#FFD700', style: 'corporate' },
  5: { bg: '#f8f9fa', color: '#333', accent: '#007bff', style: 'colorful' },
  6: { bg: '#121212', color: '#FFFFFF', accent: '#FFD700', style: 'luxury' },
  7: { bg: '#F2F2F2', color: '#1A1A1A', accent: '#003366', style: 'corporate-slate' },
  8: { bg: '#ffffff', color: '#2d3748', accent: '#4299e1', style: 'clean' },
  9: { bg: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)', color: '#ffffff', accent: '#63b3ed', style: 'night' },
  10: { bg: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', accent: '#a78bfa', style: 'glass' },
  
  // Pastel/Creative serisi (11-20)
  11: { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#4a5568', accent: '#ed8936', style: 'pastel' },
  12: { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', color: '#2d3748', accent: '#e53e3e', style: 'retro' },
  13: { bg: '#f7fafc', color: '#2d3748', accent: '#4299e1', style: 'grid' },
  14: { bg: '#ffffff', color: '#1a202c', accent: '#718096', style: 'monotone' },
  15: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#ffffff', accent: '#9f7aea', style: 'vibe' },
  16: { bg: '#121212', color: '#FFFFFF', accent: '#FFD700', style: 'goldmark' },
  17: { bg: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)', color: '#ffffff', accent: '#38a169', style: 'green' },
  18: { bg: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', color: '#ffffff', accent: '#3182ce', style: 'ocean' },
  19: { bg: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)', color: '#ffffff', accent: '#f093fb', style: 'sunset' },
  20: { bg: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)', color: '#ffffff', accent: '#805ad5', style: 'purple' },
  
  // Professional serisi (21-30)
  21: { bg: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)', color: '#ffffff', accent: '#e53e3e', style: 'crimson' },
  23: { bg: 'linear-gradient(135deg, #a8e6cf 0%, #88d8a3 100%)', color: '#2d3748', accent: '#38a169', style: 'natural' },
  25: { bg: 'linear-gradient(135deg, #d4a574 0%, #8b4513 100%)', color: '#ffffff', accent: '#d69e2e', style: 'craft' },
  26: { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: '#ffffff', accent: '#3182ce', style: 'future' },
  27: { bg: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)', color: '#1a202c', accent: '#d69e2e', style: 'gold' },
  28: { bg: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', color: '#ffffff', accent: '#3182ce', style: 'finance' },
  29: { bg: 'linear-gradient(135deg, #c9b037 0%, #928639 100%)', color: '#1a202c', accent: '#d69e2e', style: 'artdeco' },
  30: { bg: 'linear-gradient(135deg, #a8e6cf 0%, #7fcdcd 100%)', color: '#2d3748', accent: '#38a169', style: 'garden' },
  
  // Special serisi (31-39)
  32: { bg: 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)', color: '#ffffff', accent: '#4299e1', style: 'academic' },
  33: { bg: 'linear-gradient(135deg, #fbb6ce 0%, #f093fb 100%)', color: '#2d3748', accent: '#ed64a6', style: 'watercolor' },
  34: { bg: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)', color: '#ffffff', accent: '#a0aec0', style: 'industrial' },
  35: { bg: '#1a202c', color: '#ffffff', accent: '#4299e1', style: 'dark' },
  36: { bg: '#f7fafc', color: '#2d3748', accent: '#4a5568', style: 'newspaper' },
  37: { bg: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)', color: '#ffffff', accent: '#f093fb', style: 'popart' },
  38: { bg: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)', color: '#2d3748', accent: '#4a5568', style: 'marble' },
  39: { bg: 'linear-gradient(135deg, #2c5282 0%, #2a4365 100%)', color: '#ffffff', accent: '#4299e1', style: 'ocean-deep' }
};

function generateQRTemplate(templateId, style) {
  const { bg, color, accent } = style;
  
  return `export const qrTemplate${templateId} = \`
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: ${bg};
            color: ${color};
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: ${bg};
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: ${color};
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: ${accent};
        }
        
        .qr-container {
            background: ${bg.includes('gradient') ? 'rgba(255, 255, 255, 0.1)' : '#ffffff'};
            border: 2px solid ${accent};
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: ${accent};
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: ${bg.includes('gradient') ? 'rgba(255, 255, 255, 0.1)' : '#ffffff'};
            padding: 8px;
            border: 1px solid ${accent};
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>\`;

`;
}

function generateSwitchCases() {
  const templateIds = Object.keys(templateStyles);
  return templateIds.map(id => `    case ${id}:\n      return qrTemplate${id};`).join('\n');
}

// Tüm QR template'lerini oluştur
let allTemplates = '';
let allExports = '';

Object.entries(templateStyles).forEach(([templateId, style]) => {
  allTemplates += generateQRTemplate(templateId, style);
  allExports += `export const qrTemplate${templateId};\n`;
});

const switchCases = generateSwitchCases();

console.log('🎨 Tüm QR Template\'leri oluşturuluyor...');
console.log(`📊 Toplam Template: ${Object.keys(templateStyles).length}`);
console.log('✅ Template\'ler hazır!');

// Dosyayı oluştur
const content = `// QR Kod Template'leri - Her template için ayrı QR kod tasarımı
// Auto-generated QR templates for all main templates

${allTemplates}

// QR Template seçici fonksiyonu
export function getQRTemplate(templateId: number): string {
  switch (templateId) {
${switchCases}
    default:
      return qrTemplate2; // Fallback
  }
}
`;

fs.writeFileSync('qr-templates-generated.ts', content);
console.log('📁 qr-templates-generated.ts dosyası oluşturuldu!');
