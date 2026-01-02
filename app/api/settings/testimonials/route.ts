import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';
import { testimonialSchema, testimonialUpdateSchema } from '@/app/lib/validations';
import { errorResponse } from '@/app/lib/errors';
import { cache } from '@/app/lib/cache';
import { authOptions } from '@/app/lib/auth';

const CACHE_KEY = 'settings:testimonials';
const CACHE_TTL = 3600; // 1 hour

/**
 * GET /api/settings/testimonials
 * Retrieve all testimonials
 */
export async function GET(request: NextRequest) {
  try {
    logger.info('Testimonials fetch request');

    // Try cache first
    const cached = await cache.get(CACHE_KEY);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Get from database
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [
        { display_order: 'asc' },
        { id: 'asc' },
      ],
    });

    // Cache the result
    await cache.set(CACHE_KEY, testimonials, CACHE_TTL);

    logger.info('Testimonials fetched successfully', {
      count: testimonials.length,
    });

    return NextResponse.json(testimonials);

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * POST /api/settings/testimonials
 * Create new testimonial
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 });
    }

    const body = await request.json();
    const validated = testimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.create({
      data: validated,
    });

    await cache.del(CACHE_KEY);

    logger.info('Testimonial created', {
      id: testimonial.id,
      created_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      data: testimonial,
      message: 'Müşteri yorumu eklendi',
    }, { status: 201 });

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * PUT /api/settings/testimonials
 * Update existing testimonial
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 });
    }

    const body = await request.json();
    const validated = testimonialUpdateSchema.parse(body);

    const { id, ...updateData } = validated;
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: updateData,
    });

    await cache.del(CACHE_KEY);

    logger.info('Testimonial updated', {
      id: testimonial.id,
      updated_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      data: testimonial,
      message: 'Müşteri yorumu güncellendi',
    });

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * DELETE /api/settings/testimonials
 * Delete testimonial
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

    await prisma.testimonial.delete({
      where: { id },
    });

    await cache.del(CACHE_KEY);

    logger.info('Testimonial deleted', {
      id,
      deleted_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      message: 'Müşteri yorumu silindi',
    });

  } catch (error: any) {
    return errorResponse(error);
  }
}
