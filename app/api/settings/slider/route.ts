import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';
import { sliderImageSchema, sliderImageUpdateSchema } from '@/app/lib/validations';
import { errorResponse } from '@/app/lib/errors';
import { cache } from '@/app/lib/cache';
import { authOptions } from '@/app/lib/auth';

const CACHE_KEY = 'settings:slider';
const CACHE_TTL = 3600; // 1 hour

/**
 * GET /api/settings/slider
 * Retrieve all slider images
 */
export async function GET(request: NextRequest) {
  try {
    logger.info('Slider images fetch request');

    // Try cache first
    const cached = await cache.get(CACHE_KEY);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Get from database
    const sliderImages = await prisma.sliderImage.findMany({
      orderBy: [
        { display_order: 'asc' },
        { id: 'asc' },
      ],
    });

    // Cache the result
    await cache.set(CACHE_KEY, sliderImages, CACHE_TTL);

    logger.info('Slider images fetched successfully', {
      count: sliderImages.length,
    });

    return NextResponse.json(sliderImages);

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * POST /api/settings/slider
 * Create new slider image
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 });
    }

    const body = await request.json();
    const validated = sliderImageSchema.parse(body);

    const sliderImage = await prisma.sliderImage.create({
      data: validated,
    });

    await cache.del(CACHE_KEY);

    logger.info('Slider image created', {
      id: sliderImage.id,
      created_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      data: sliderImage,
      message: 'Slider resmi eklendi',
    }, { status: 201 });

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * PUT /api/settings/slider
 * Update existing slider image
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 });
    }

    const body = await request.json();
    const validated = sliderImageUpdateSchema.parse(body);

    const { id, ...updateData } = validated;
    const sliderImage = await prisma.sliderImage.update({
      where: { id },
      data: updateData,
    });

    await cache.del(CACHE_KEY);

    logger.info('Slider image updated', {
      id: sliderImage.id,
      updated_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      data: sliderImage,
      message: 'Slider resmi güncellendi',
    });

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * DELETE /api/settings/slider
 * Delete slider image
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');

    if (!id) {
      return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
    }

    await prisma.sliderImage.delete({
      where: { id },
    });

    await cache.del(CACHE_KEY);

    logger.info('Slider image deleted', {
      id,
      deleted_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      message: 'Slider resmi silindi',
    });

  } catch (error: any) {
    return errorResponse(error);
  }
}
