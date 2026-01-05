/**
 * Database'deki katalog URL'lerini kontrol eder
 * Eski local storage (/uploads/) ve yeni Cloudinary URL'lerini tespit eder
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCatalogUrls() {
  try {
    console.log('📊 Katalog URL\'leri kontrol ediliyor...\n');

    // Tüm katalog URL'lerini getir
    const firmsWithCatalog = await prisma.firmalar.findMany({
      where: {
        katalog: {
          not: null
        }
      },
      select: {
        id: true,
        firma_adi: true,
        slug: true,
        katalog: true,
        created_at: true,
        updated_at: true
      },
      orderBy: {
        updated_at: 'desc'
      }
    });

    console.log(`Toplam kataloglu firma: ${firmsWithCatalog.length}\n`);

    // URL tiplerini kategorize et
    const urlTypes = {
      localUploads: [],
      cloudinary: [],
      cloudinaryRaw: [],
      cloudinaryImage: [],
      other: []
    };

    firmsWithCatalog.forEach(firma => {
      const url = firma.katalog;

      if (url.startsWith('/uploads/')) {
        urlTypes.localUploads.push(firma);
      } else if (url.includes('res.cloudinary.com')) {
        urlTypes.cloudinary.push(firma);

        if (url.includes('/raw/upload/')) {
          urlTypes.cloudinaryRaw.push(firma);
        } else if (url.includes('/image/upload/')) {
          urlTypes.cloudinaryImage.push(firma);
        }
      } else {
        urlTypes.other.push(firma);
      }
    });

    // Sonuçları göster
    console.log('📂 URL TİPLERİ:');
    console.log('================\n');

    console.log(`🔸 Local Storage (/uploads/): ${urlTypes.localUploads.length}`);
    if (urlTypes.localUploads.length > 0) {
      console.log('   ⚠️  PROBLEM: Bu dosyalar production\'da mevcut değil!\n');
      urlTypes.localUploads.slice(0, 5).forEach(f => {
        console.log(`   - ${f.firma_adi} (${f.slug})`);
        console.log(`     URL: ${f.katalog}`);
        console.log(`     Updated: ${f.updated_at.toISOString()}\n`);
      });
      if (urlTypes.localUploads.length > 5) {
        console.log(`   ... ve ${urlTypes.localUploads.length - 5} firma daha\n`);
      }
    }

    console.log(`\n☁️  Cloudinary (Toplam): ${urlTypes.cloudinary.length}`);
    console.log(`   ├─ /raw/upload/ (Public): ${urlTypes.cloudinaryRaw.length}`);
    console.log(`   └─ /image/upload/: ${urlTypes.cloudinaryImage.length}`);

    if (urlTypes.cloudinaryRaw.length > 0) {
      console.log('\n   ✅ /raw/upload/ örnekleri:');
      urlTypes.cloudinaryRaw.slice(0, 3).forEach(f => {
        console.log(`   - ${f.firma_adi}`);
        console.log(`     ${f.katalog}\n`);
      });
    }

    if (urlTypes.other.length > 0) {
      console.log(`\n❓ Diğer: ${urlTypes.other.length}`);
      urlTypes.other.forEach(f => {
        console.log(`   - ${f.firma_adi}: ${f.katalog}`);
      });
    }

    console.log('\n================');
    console.log('📊 ÖZET:');
    console.log('================');
    console.log(`Toplam:          ${firmsWithCatalog.length}`);
    console.log(`Local Storage:   ${urlTypes.localUploads.length} ⚠️  (Silinmeli)`);
    console.log(`Cloudinary:      ${urlTypes.cloudinary.length} ✅`);
    console.log(`  ├─ Raw:        ${urlTypes.cloudinaryRaw.length}`);
    console.log(`  └─ Image:      ${urlTypes.cloudinaryImage.length}`);
    console.log(`Diğer:           ${urlTypes.other.length}`);

    // Migration önerisi
    if (urlTypes.localUploads.length > 0) {
      console.log('\n⚠️  UYARI: Local storage URL\'leri bulundu!');
      console.log('Bu dosyalar production\'da mevcut değil (Docker volume mount yok).');
      console.log('\n💡 ÖNERİ:');
      console.log('1. Bu kayıtları NULL yapın (migration script)');
      console.log('2. Kullanıcılardan tekrar yüklemelerini isteyin');
      console.log('\nMigration için: node scripts/migrate-catalog-urls.js');
    }

    return urlTypes;

  } catch (error) {
    console.error('❌ Hata:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Script'i çalıştır
if (require.main === module) {
  checkCatalogUrls()
    .then(() => {
      console.log('\n✅ Kontrol tamamlandı!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Script hatası:', error);
      process.exit(1);
    });
}

module.exports = { checkCatalogUrls };
