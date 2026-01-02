import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcrypt';
import { prisma } from '@/app/lib/db';
import { logger } from '@/app/lib/logger';
import { passwordChangeSchema } from '@/app/lib/validations';
import { errorResponse } from '@/app/lib/errors';
import { authOptions } from '@/app/lib/auth';

/**
 * POST /api/settings/password
 * Change admin password
 *
 * Security:
 * - Requires authentication
 * - Validates current password
 * - Enforces password strength requirements
 * - Tracks password change history
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      logger.warn('Unauthorized password change attempt');
      return NextResponse.json(
        { error: 'Oturum gerekli' },
        { status: 401 }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json();
    const validated = passwordChangeSchema.parse(body);

    logger.info('Password change request', {
      username: session.user.name
    });

    // 3. Get current admin from database
    const admin = await prisma.admins.findUnique({
      where: { username: session.user.name! },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (!admin) {
      logger.error('Admin not found for password change', {
        username: session.user.name,
      });
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // 4. Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      validated.currentPassword,
      admin.password
    );

    if (!isCurrentPasswordValid) {
      logger.warn('Invalid current password', {
        username: admin.username,
      });
      return NextResponse.json(
        { error: 'Mevcut şifre hatalı' },
        { status: 400 }
      );
    }

    // 5. Save old password to history
    await prisma.adminPasswordHistory.create({
      data: {
        admin_id: admin.id,
        old_password_hash: admin.password,
        changed_by: admin.username,
      },
    });

    // 6. Hash new password
    const hashedPassword = await bcrypt.hash(validated.newPassword, 10);

    // 7. Update password in database
    await prisma.admins.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
      },
    });

    logger.info('Password changed successfully', {
      admin_id: admin.id,
      username: admin.username,
    });

    return NextResponse.json({
      success: true,
      message: 'Şifre başarıyla değiştirildi',
    });

  } catch (error: any) {
    return errorResponse(error);
  }
}
