import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/app/lib/db';
import { VercelKVCache } from '@/app/lib/cache';
import { packageUpdateSchema } from '@/app/lib/validations';
import { ErrorResponse, AuthenticationError, NotFoundError } from '@/app/lib/errors';

/**
 * GET /api/packages/[id]
 *
 * Belirli bir paketin detaylarını döner
 * Public endpoint
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packageId = parseInt(params.id);

    if (isNaN(packageId)) {
      return NextResponse.json(
        { error: 'Geçersiz paket ID' },
        { status: 400 }
      );
    }

    const pkg = await prisma.packages.findUnique({
      where: { id: packageId }
    });

    if (!pkg) {
      throw new NotFoundError('Paket bulunamadı');
    }

    return NextResponse.json(pkg);
  } catch (error) {
    const statusCode = ErrorResponse.getStatusCode(error as Error);
    const errorBody = ErrorResponse.build(error as Error);
    return NextResponse.json(errorBody, { status: statusCode });
  }
}

/**
 * PUT /api/packages/[id]
 *
 * Paket bilgilerini günceller
 * Admin-only endpoint
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Admin kontrolü
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      throw new AuthenticationError('Bu işlem için giriş yapmanız gerekiyor');
    }

    const packageId = parseInt(params.id);

    if (isNaN(packageId)) {
      return NextResponse.json(
        { error: 'Geçersiz paket ID' },
        { status: 400 }
      );
    }

    // Mevcut paketi kontrol et
    const existingPackage = await prisma.packages.findUnique({
      where: { id: packageId }
    });

    if (!existingPackage) {
      throw new NotFoundError('Paket bulunamadı');
    }

    // Request body'yi parse et
    const body = await request.json();

    // Validate
    const validated = packageUpdateSchema.parse(body);

    // Paketi güncelle
    const updatedPackage = await prisma.packages.update({
      where: { id: packageId },
      data: {
        name: validated.name,
        description: validated.description,
        price: validated.price,
        card_count: validated.card_count,
        color: validated.color,
        popular: validated.popular,
        display_order: validated.display_order,
        features: validated.features,
        active: validated.active ?? true,
        updated_at: new Date()
      }
    });

    // Cache'i temizle
    const cache = VercelKVCache.getInstance();
    await cache.del('packages:list');

    return NextResponse.json({
      success: true,
      message: 'Paket başarıyla güncellendi',
      package: updatedPackage
    });
  } catch (error) {
    const statusCode = ErrorResponse.getStatusCode(error as Error);
    const errorBody = ErrorResponse.build(error as Error);
    return NextResponse.json(errorBody, { status: statusCode });
  }
}
