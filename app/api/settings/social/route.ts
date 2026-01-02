import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';
import { socialMediaSchema, socialMediaUpdateSchema } from '@/app/lib/validations';
import { errorResponse } from '@/app/lib/errors';
import { cache } from '@/app/lib/cache';
import { authOptions } from '@/app/lib/auth';

const CACHE_KEY = 'settings:social';
const CACHE_TTL = 3600; // 1 hour

/**
 * GET /api/settings/social
 * Retrieve all social media settings
 *
 * Returns list of social media links with caching
 */
export async function GET(request: NextRequest) {
  try {
    logger.info('Social media settings fetch request');

    // Try to get from cache first
    const cached = await cache.get(CACHE_KEY);
    if (cached) {
      logger.info('Social media settings served from cache');
      return NextResponse.json(cached);
    }

    // Get from database
    const socialMediaList = await prisma.socialMediaSettings.findMany({
      orderBy: [
        { display_order: 'asc' },
        { id: 'asc' },
      ],
    });

    // Cache the result
    await cache.set(CACHE_KEY, socialMediaList, CACHE_TTL);

    logger.info('Social media settings fetched successfully', {
      count: socialMediaList.length,
    });

    return NextResponse.json(socialMediaList);

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * POST /api/settings/social
 * Create new social media link
 *
 * Security:
 * - Requires authentication
 * - Validates platform and URL
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      logger.warn('Unauthorized social media create attempt');
      return NextResponse.json(
        { error: 'Oturum gerekli' },
        { status: 401 }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json();
    const validated = socialMediaSchema.parse(body);

    logger.info('Social media create request', {
      platform: validated.platform,
      username: session.user.name,
    });

    // 3. Create new social media entry
    const socialMedia = await prisma.socialMediaSettings.create({
      data: validated,
    });

    // 4. Invalidate cache
    await cache.del(CACHE_KEY);

    logger.info('Social media created successfully', {
      id: socialMedia.id,
      platform: socialMedia.platform,
      created_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      data: socialMedia,
      message: 'Sosyal medya bağlantısı eklendi',
    }, { status: 201 });

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * PUT /api/settings/social
 * Update existing social media link
 *
 * Security:
 * - Requires authentication
 * - Validates ID and data
 */
export async function PUT(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      logger.warn('Unauthorized social media update attempt');
      return NextResponse.json(
        { error: 'Oturum gerekli' },
        { status: 401 }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json();
    const validated = socialMediaUpdateSchema.parse(body);

    logger.info('Social media update request', {
      id: validated.id,
      username: session.user.name,
    });

    // 3. Update social media entry
    const { id, ...updateData } = validated;
    const socialMedia = await prisma.socialMediaSettings.update({
      where: { id },
      data: updateData,
    });

    // 4. Invalidate cache
    await cache.del(CACHE_KEY);

    logger.info('Social media updated successfully', {
      id: socialMedia.id,
      platform: socialMedia.platform,
      updated_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      data: socialMedia,
      message: 'Sosyal medya bağlantısı güncellendi',
    });

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * DELETE /api/settings/social
 * Delete social media link
 *
 * Security:
 * - Requires authentication
 * - Validates ID
 */
export async function DELETE(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      logger.warn('Unauthorized social media delete attempt');
      return NextResponse.json(
        { error: 'Oturum gerekli' },
        { status: 401 }
      );
    }

    // 2. Get ID from query params
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');

    if (!id) {
      return NextResponse.json(
        { error: 'ID gerekli' },
        { status: 400 }
      );
    }

    logger.info('Social media delete request', {
      id,
      username: session.user.name,
    });

    // 3. Delete social media entry
    await prisma.socialMediaSettings.delete({
      where: { id },
    });

    // 4. Invalidate cache
    await cache.del(CACHE_KEY);

    logger.info('Social media deleted successfully', {
      id,
      deleted_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      message: 'Sosyal medya bağlantısı silindi',
    });

  } catch (error: any) {
    return errorResponse(error);
  }
}
