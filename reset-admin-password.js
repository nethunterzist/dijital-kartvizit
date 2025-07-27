const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    console.log('🔄 Admin şifresi sıfırlanıyor...');
    
    const newPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const updatedAdmin = await prisma.admins.update({
      where: { username: 'admin' },
      data: { password: hashedPassword }
    });

    console.log('✅ Admin şifresi güncellendi');
    console.log('📋 Yeni giriş bilgileri:');
    console.log('   Kullanıcı adı: admin');
    console.log('   Şifre: admin123');

  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();
