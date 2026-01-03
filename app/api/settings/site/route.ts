import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';
import { siteSettingsSchema } from '@/app/lib/validations';
import { errorResponse } from '@/app/lib/errors';
import { cache } from '@/app/lib/cache';
import { authOptions } from '@/app/lib/auth';

const CACHE_KEY = 'settings:site';
const CACHE_TTL = 3600; // 1 hour

/**
 * GET /api/settings/site
 * Retrieve site settings
 *
 * Returns current site configuration with caching
 */
export async function GET(request: NextRequest) {
  try {
    logger.info('Site settings fetch request');

    // Try to get from cache first
    const cached = await cache.get(CACHE_KEY);
    if (cached) {
      logger.info('Site settings served from cache');
      return NextResponse.json(cached);
    }

    // Get from database
    let settings = await prisma.siteSettings.findFirst({
      orderBy: { id: 'asc' },
    });

    // If no settings exist, create default
    if (!settings) {
      logger.info('Creating default site settings');
      settings = await prisma.siteSettings.create({
        data: {
          site_name: 'Dijital Kartvizit Merkezi',
        },
      });
    }

    // Cache the result
    await cache.set(CACHE_KEY, settings, CACHE_TTL);

    logger.info('Site settings fetched successfully');
    return NextResponse.json(settings);

  } catch (error: any) {
    return errorResponse(error);
  }
}

/**
 * PUT /api/settings/site
 * Update site settings
 *
 * Security:
 * - Requires authentication
 * - Validates all input fields
 * - Invalidates cache after update
 */
export async function PUT(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      logger.warn('Unauthorized site settings update attempt');
      return NextResponse.json(
        { error: 'Oturum gerekli' },
        { status: 401 }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json();
    const validated = siteSettingsSchema.partial().parse(body);

    logger.info('Site settings update request', {
      username: session.user.name,
    });

    // 3. Get existing settings or create new
    let settings = await prisma.siteSettings.findFirst({
      orderBy: { id: 'asc' },
    });

    if (!settings) {
      // Create new settings
      settings = await prisma.siteSettings.create({
        data: validated,
      });
      logger.info('Site settings created', {
        id: settings.id,
      });
    } else {
      // Update existing settings
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: validated,
      });
      logger.info('Site settings updated', {
        id: settings.id,
      });
    }

    // 4. Invalidate cache
    await cache.del(CACHE_KEY);

    logger.info('Site settings saved successfully', {
      settings_id: settings.id,
      updated_by: session.user.name,
    });

    return NextResponse.json({
      success: true,
      data: settings,
      message: 'Site ayarları başarıyla güncellendi',
    });

  } catch (error: any) {
    return errorResponse(error);
  }
}
