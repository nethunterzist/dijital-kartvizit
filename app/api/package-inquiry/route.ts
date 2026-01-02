import { NextRequest, NextResponse } from 'next/server';
import { packageInquirySchema } from '@/app/lib/validations/package-inquiry.schema';
import { sendPackageInquiryEmail } from '@/app/lib/email';
import { ZodError } from 'zod';

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
      packageName: validatedData.packageName,
      packagePrice: validatedData.packagePrice,
      packageFeatures: validatedData.packageFeatures,
      timestamp,
      ip: ip.split(',')[0].trim(), // Get first IP in case of multiple
      userAgent,
    };

    // Send email
    await sendPackageInquiryEmail(emailData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Talebiniz başarıyla alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Package inquiry error:', error);

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
      console.error('SMTP configuration error');
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
