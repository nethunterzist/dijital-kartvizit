const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function fixAdminPassword() {
  try {
    // admin şifresini hash'le
    const hashedPassword = await bcrypt.hash('admin', 10);
    
    // Admin kullanıcısını güncelle
    const updatedAdmin = await prisma.admins.update({
      where: { username: 'admin' },
      data: { password: hashedPassword }
    });
    
    console.log('✅ Admin şifresi güncellendi!');
    console.log('Username: admin');
    console.log('Password: admin');
    console.log('Hash:', hashedPassword);
    
  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminPassword();
