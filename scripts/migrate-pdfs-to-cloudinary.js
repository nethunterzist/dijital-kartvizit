/**
 * PDF Migration Script - Local to Cloudinary
 *
 * Bu script veritabanındaki local path'leri Cloudinary URL'lerine dönüştürür.
 * Ancak, local dosyalar artık container'da olmadığı için sadece DB'yi temizleyeceğiz.
 *
 * Kullanıcıdan yeni PDF yüklemesini isteyeceğiz.
 */

const { Pool } = require('pg');

// Database bağlantısı
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Beg9QYPbf5niZSJycPw4cMCLRKsJdLr81AWsJXIT4iKb9EbqL7QtM0Gy3aNCF07g@hsg8skcck0kcossg8ccs8kk4:5432/postgres'
});

async function migrateLocalPdfsToCloudinary() {
  try {
    console.log('🔍 Veritabanında local path\'li PDF\'leri arıyorum...');

    // Local path içeren katalogları bul
    const result = await pool.query(`
      SELECT id, firma_adi, katalog
      FROM firmalar
      WHERE katalog LIKE '/uploads/%'
      ORDER BY id
    `);

    if (result.rows.length === 0) {
      console.log('✅ Tüm PDF\'ler zaten Cloudinary\'de!');
      return;
    }

    console.log(`\n⚠️  ${result.rows.length} firma için local path bulundu:\n`);

    result.rows.forEach((firma, index) => {
      console.log(`${index + 1}. ID: ${firma.id} - ${firma.firma_adi}`);
      console.log(`   Eski path: ${firma.katalog}\n`);
    });

    console.log('\n❌ Bu dosyalar Docker container\'da artık yok!');
    console.log('📋 Çözüm: Bu firmalar için katalog alanını NULL yapacağım.');
    console.log('   Admin panelden yeni PDF yüklemeleri gerekecek.\n');

    // Katalog alanlarını temizle
    for (const firma of result.rows) {
      await pool.query(
        'UPDATE firmalar SET katalog = NULL WHERE id = $1',
        [firma.id]
      );
      console.log(`✅ ID ${firma.id} (${firma.firma_adi}) - katalog alanı temizlendi`);
    }

    console.log(`\n✅ ${result.rows.length} firma için katalog alanı temizlendi!`);
    console.log('📝 Lütfen bu firmalar için admin panelden yeni PDF yükleyin.\n');

  } catch (error) {
    console.error('❌ Hata:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Script'i çalıştır
migrateLocalPdfsToCloudinary()
  .then(() => {
    console.log('✅ Migration tamamlandı!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration başarısız:', error);
    process.exit(1);
  });
