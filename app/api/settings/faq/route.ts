import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';
import { faqSchema, faqUpdateSchema } from '@/app/lib/validations';
import { errorResponse } from '@/app/lib/errors';
import { cache } from '@/app/lib/cache';
import { authOptions } from '@/app/lib/auth';

const CACHE_KEY = 'settings:faq';
const CACHE_TTL = 3600; // 1 hour

/**
 * GET /api/settings/faq
 * Retrieve all FAQ entries
 */
export async function GET(request: NextRequest) {
  try {
    logger.info('FAQ fetch request');

    // Try cache first
    const cached = await cache.get(CACHE_KEY);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Get from database
    const faqs = await prisma.faq.findMany({
      orderBy: [
        { category: 'asc' },
        { display_order: 'asc' },
        { id: 'asc' },
      ],
    });

    // Cache the result
    await cache.set(CACHE_KEY, faqs, CACHE_TTL);

    logger.info('FAQs fetched successfully', {
      count: faqs.length,
    });

    return NextResponse.json(faqs);

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * POST /api/settings/faq
 * Create new FAQ entry
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 });
    }

    const body = await request.json();
    const validated = faqSchema.parse(body);

    const faq = await prisma.faq.create({
      data: validated,
    });

    await cache.del(CACHE_KEY);

    logger.info('FAQ created', {
      id: faq.id,
      created_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      data: faq,
      message: 'Soru eklendi',
    }, { status: 201 });

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * PUT /api/settings/faq
 * Update existing FAQ entry
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 });
    }

    const body = await request.json();
    const validated = faqUpdateSchema.parse(body);

    const { id, ...updateData } = validated;
    const faq = await prisma.faq.update({
      where: { id },
      data: updateData,
    });

    await cache.del(CACHE_KEY);

    logger.info('FAQ updated', {
      id: faq.id,
      updated_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      data: faq,
      message: 'Soru güncellendi',
    });

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * DELETE /api/settings/faq
 * Delete FAQ entry
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

    await prisma.faq.delete({
      where: { id },
    });

    await cache.del(CACHE_KEY);

    logger.info('FAQ deleted', {
      id,
      deleted_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      message: 'Soru silindi',
    });

  } catch (error: any) {
    return errorResponse(error);
  }
}
