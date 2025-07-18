import QRCode from 'qrcode';

export async function generateQRCode(url: string): Promise<string> {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw new Error('QR Code generation failed');
  }
}

export async function generateQRCodeBuffer(url: string): Promise<Buffer> {
  try {
    const buffer = await QRCode.toBuffer(url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return buffer;
  } catch (error) {
    console.error('QR Code buffer generation error:', error);
    throw new Error('QR Code buffer generation failed');
  }
}
