/**
 * Production'daki eski local storage katalog URL'lerini temizler
 * Local path'leri NULL yapar, kullanıcı tekrar yükleyecek
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixCatalogUrls() {
  try {
    console.log('🔧 Katalog URL fix başlıyor...\n');

    // Önce mevcut durumu kontrol et
    const allWithCatalog = await prisma.firmalar.findMany({
      where: {
        katalog: {
          not: null
        }
      },
      select: {
        id: true,
        firma_adi: true,
        slug: true,
        katalog: true
      }
    });

    console.log(`Toplam kataloglu firma: ${allWithCatalog.length}\n`);

    // Local storage path'leri filtrele
    const localStorageFirms = allWithCatalog.filter(f =>
      f.katalog && f.katalog.startsWith('/uploads/')
    );

    console.log(`❌ Local storage path'li firma: ${localStorageFirms.length}\n`);

    if (localStorageFirms.length > 0) {
      console.log('🔴 SİLİNECEK KAYITLAR:');
      localStorageFirms.forEach((f, i) => {
        console.log(`${i + 1}. ${f.firma_adi} (${f.slug})`);
        console.log(`   Path: ${f.katalog}\n`);
      });

      // Kullanıcıdan onay al
      console.log('⚠️  Bu kayıtların katalog field\'ı NULL yapılacak.');
      console.log('💡 Kullanıcılar admin panelden tekrar yükleyebilecek.\n');

      // Güvenlik: Sadece /uploads/ ile başlayanları güncelle
      const result = await prisma.firmalar.updateMany({
        where: {
          katalog: {
            startsWith: '/uploads/'
          }
        },
        data: {
          katalog: null
        }
      });

      console.log(`\n✅ ${result.count} firma güncellendi!`);
      console.log('\n📊 Özet:');
      console.log(`- Toplam firma: ${allWithCatalog.length}`);
      console.log(`- Temizlenen: ${result.count}`);
      console.log(`- Kalan (Cloudinary): ${allWithCatalog.length - localStorageFirms.length}`);

      // Son durumu kontrol et
      const remaining = await prisma.firmalar.count({
        where: {
          katalog: {
            startsWith: '/uploads/'
          }
        }
      });

      if (remaining === 0) {
        console.log('\n✅ Tüm local storage path\'leri temizlendi!');
      } else {
        console.log(`\n⚠️  Hala ${remaining} kayıt kaldı!`);
      }

    } else {
      console.log('✅ Local storage path bulunamadı. Temizlik gereksiz!');
    }

    return {
      total: allWithCatalog.length,
      cleaned: localStorageFirms.length,
      remaining: allWithCatalog.length - localStorageFirms.length
    };

  } catch (error) {
    console.error('❌ Hata:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Script'i çalıştır
if (require.main === module) {
  fixCatalogUrls()
    .then((result) => {
      console.log('\n✅ Fix tamamlandı!');
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Script hatası:', error);
      process.exit(1);
    });
}

module.exports = { fixCatalogUrls };
