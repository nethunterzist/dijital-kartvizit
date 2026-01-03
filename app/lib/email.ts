import nodemailer from 'nodemailer';

// Nodemailer transporter configuration
export const createTransporter = () => {
  // Debug: Log environment variables
  console.log('🔍 SMTP Environment Variables Check:', {
    SMTP_HOST: process.env.SMTP_HOST || '❌ UNDEFINED',
    SMTP_PORT: process.env.SMTP_PORT || '❌ UNDEFINED',
    SMTP_USER: process.env.SMTP_USER || '❌ UNDEFINED',
    SMTP_PASS: process.env.SMTP_PASS ? '✅ SET (hidden)' : '❌ UNDEFINED',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || '❌ UNDEFINED',
  });

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

interface PackageInquiryData {
  name: string;
  surname: string;
  phone: string;
  email?: string;
  packageName: string;
  packagePrice: number;
  packageFeatures: string[];
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

// Generate HTML email template for package inquiry
export const generatePackageInquiryEmail = (data: PackageInquiryData): string => {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yeni Paket Talebi</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">📦 Yeni Paket Talebi</h1>
            </td>
          </tr>

          <!-- Package Info -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #2563eb; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                Paket Bilgileri
              </h2>
              <table width="100%" cellpadding="8" cellspacing="0">
                <tr>
                  <td style="color: #6b7280; font-weight: bold; width: 150px;">Paket Adı:</td>
                  <td style="color: #111827; font-weight: bold; font-size: 16px;">${data.packageName}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-weight: bold;">Fiyat:</td>
                  <td style="color: #2563eb; font-weight: bold; font-size: 18px;">${data.packagePrice} TL</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-weight: bold; vertical-align: top; padding-top: 12px;">Özellikler:</td>
                  <td style="color: #111827; padding-top: 12px;">
                    <ul style="margin: 0; padding-left: 20px;">
                      ${data.packageFeatures.map(feature => `<li style="margin-bottom: 5px;">${feature}</li>`).join('')}
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Info -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="color: #2563eb; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                👤 Müşteri Bilgileri
              </h2>
              <table width="100%" cellpadding="8" cellspacing="0">
                <tr>
                  <td style="color: #6b7280; font-weight: bold; width: 150px;">Ad Soyad:</td>
                  <td style="color: #111827; font-size: 16px;">${data.name} ${data.surname}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-weight: bold;">Telefon:</td>
                  <td style="color: #111827;">
                    <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                ${data.email ? `
                <tr>
                  <td style="color: #6b7280; font-weight: bold;">E-posta:</td>
                  <td style="color: #111827;">
                    <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Timestamp & Technical Info -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="color: #2563eb; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                🕐 Talep Detayları
              </h2>
              <table width="100%" cellpadding="8" cellspacing="0">
                <tr>
                  <td style="color: #6b7280; font-weight: bold; width: 150px;">Tarih & Saat:</td>
                  <td style="color: #111827;">${data.timestamp}</td>
                </tr>
                ${data.ip ? `
                <tr>
                  <td style="color: #6b7280; font-weight: bold;">IP Adresi:</td>
                  <td style="color: #111827; font-family: monospace;">${data.ip}</td>
                </tr>
                ` : ''}
                ${data.userAgent ? `
                <tr>
                  <td style="color: #6b7280; font-weight: bold; vertical-align: top;">Tarayıcı:</td>
                  <td style="color: #6b7280; font-size: 12px; word-break: break-word;">${data.userAgent}</td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Bu e-posta otomatik olarak <strong>Dijital Kartvizit Merkezi</strong> web sitesinden gönderilmiştir.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
                © ${new Date().getFullYear()} Dijital Kartvizit Merkezi. Tüm hakları saklıdır.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

// Generate customer confirmation email template
export const generateCustomerConfirmationEmail = (data: { name: string; packageName: string }): string => {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Talebiniz Alındı</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0 0 10px 0; font-size: 28px;">✅ Talebiniz Alındı!</h1>
              <p style="color: #ffffff; margin: 0; font-size: 16px; opacity: 0.9;">Dijital Kartvizit Merkezi</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 22px;">
                Sayın ${data.name},
              </h2>

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                <strong>${data.packageName}</strong> paketi için talebiniz başarıyla alınmıştır.
              </p>

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                Talebiniz ile ilgili detaylı bilgi ve ödeme talimatları için
                size ulaşacağız.
              </p>

              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="color: #065f46; margin: 0; font-size: 15px; line-height: 1.6;">
                  <strong>💡 Bilgi:</strong> Dijital kartvizitiniz oluşturulduktan sonra QR kod ile
                  kolayca paylaşabilir, istediğiniz zaman bilgilerinizi güncelleyebilirsiniz.
                </p>
              </div>

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                Herhangi bir sorunuz olması durumunda bizimle iletişime geçmekten çekinmeyin.
              </p>

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                Teşekkür ederiz,<br>
                <strong style="color: #2563eb;">Dijital Kartvizit Merkezi Ekibi</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                Bu e-posta otomatik olarak gönderilmiştir.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Dijital Kartvizit Merkezi. Tüm hakları saklıdır.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

// Send package inquiry email
export const sendPackageInquiryEmail = async (data: PackageInquiryData) => {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  if (!adminEmail) {
    throw new Error('Admin email not configured');
  }

  const mailOptions = {
    from: `"Dijital Kartvizit Merkezi" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `Yeni Paket Talebi - ${data.packageName}`,
    html: generatePackageInquiryEmail(data),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Admin email sending error:', error);
    throw error;
  }
};

// Send customer confirmation email
export const sendCustomerConfirmationEmail = async (data: { name: string; email: string; packageName: string }) => {
  const transporter = createTransporter();

  if (!data.email) {
    console.log('No customer email provided, skipping confirmation email');
    return { success: true, skipped: true };
  }

  const mailOptions = {
    from: `"Dijital Kartvizit Merkezi" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Talebiniz Alındı - ${data.packageName}`,
    html: generateCustomerConfirmationEmail({ name: data.name, packageName: data.packageName }),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Customer confirmation email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Customer confirmation email error:', error);
    // Don't throw - customer email is optional, admin email is critical
    return { success: false, error };
  }
};
