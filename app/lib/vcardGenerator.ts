export interface VCardData {
  firma_adi?: string;
  yetkili_adi?: string;
  yetkili_pozisyon?: string;
  telefon?: string;
  eposta?: string;
  website?: string;
  adres?: string;
}

export function generateVCard(firma: any): string {
  // vCard 3.0 formatında kişi kartı oluştur
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${firma.firma_adi || ''}`,
    `ORG:${firma.firma_adi || ''}`,
    firma.yetkili_adi ? `N:${firma.yetkili_adi};;;` : '',
    firma.yetkili_pozisyon ? `TITLE:${firma.yetkili_pozisyon}` : '',
    firma.telefon ? `TEL:${firma.telefon}` : '',
    firma.eposta ? `EMAIL:${firma.eposta}` : '',
    firma.website ? `URL:${firma.website}` : '',
    firma.adres ? `ADR:;;${firma.adres};;;;` : '',
    'END:VCARD'
  ].filter(line => line !== '').join('\r\n');

  return vcard;
}
