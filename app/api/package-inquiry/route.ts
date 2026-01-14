import { NextRequest, NextResponse } from 'next/server';
import { packageInquirySchema } from '@/app/lib/validations/package-inquiry.schema';
import { sendPackageInquiryEmail, sendCustomerConfirmationEmail } from '@/app/lib/email';
import { prisma } from '@/app/lib/db';
import { ZodError } from 'zod';
import { logger } from '@/app/lib/logger';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const validatedData = packageInquirySchema.parse(body);

    // Get IP address and user agent
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'Unknown';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Generate timestamp
    const timestamp = new Intl.DateTimeFormat('tr-TR', {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZone: 'Europe/Istanbul',
    }).format(new Date());

    // Prepare email data
    const emailData = {
      name: validatedData.name,
      surname: validatedData.surname,
      phone: validatedData.phone,
      email: validatedData.email,
      packageName: validatedData.packageName,
      packagePrice: validatedData.packagePrice,
      packageFeatures: validatedData.packageFeatures,
      timestamp,
      ip: ip.split(',')[0].trim(), // Get first IP in case of multiple
      userAgent,
    };

    // Send admin notification email
    await sendPackageInquiryEmail(emailData);

    // Send customer confirmation email (if email provided)
    if (validatedData.email) {
      await sendCustomerConfirmationEmail({
        name: validatedData.name,
        email: validatedData.email,
        packageName: validatedData.packageName,
      });
    }

    // Save to database
    try {
      await prisma.packageInquiry.create({
        data: {
          name: validatedData.name,
          surname: validatedData.surname,
          phone: validatedData.phone,
          email: validatedData.email || null,
          package_key: validatedData.packageKey,
          package_name: validatedData.packageName,
          package_price: validatedData.packagePrice,
          package_features: validatedData.packageFeatures,
          ip_address: ip.split(',')[0].trim(),
          user_agent: userAgent,
        },
      });
    } catch (dbError) {
      // Log database error but don't fail the request if email was successful
      logger.error('Database save error', {
        error: dbError instanceof Error ? dbError.message : 'Unknown error'
      });
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Talebiniz başarıyla alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.',
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Package inquiry error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Form bilgileri hatalı',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle email sending errors
    if (error instanceof Error && error.message.includes('Admin email not configured')) {
      logger.error('SMTP configuration error');
      return NextResponse.json(
        {
          success: false,
          message: 'Sistem hatası. Lütfen daha sonra tekrar deneyin.',
        },
        { status: 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      },
      { status: 500 }
    );
  }
}

// Method not allowed for other HTTP methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
