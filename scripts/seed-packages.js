/**
 * Seed Script - Initial Package Data
 *
 * Bu script ilk defa çalıştırıldığında database'e 3 sabit paketi ekler.
 * Komut: node scripts/seed-packages.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const initialPackages = [
  {
    package_key: 'starter',
    name: 'Başlangıç',
    description: 'Bireysel kullanım için ideal',
    price: 299,
    card_count: 1,
    color: 'blue',
    popular: false,
    display_order: 1,
    active: true,
    features: [
      '1 Dijital Kartvizit',
      'QR Kod Oluşturma',
      'Temel İletişim Bilgileri',
      'Sosyal Medya Bağlantıları',
      'Mobil Uyumlu Tasarım',
      'Rehbere Kaydetme (vCard)',
      '24/7 Destek'
    ]
  },
  {
    package_key: 'business',
    name: 'İş Paketi',
    description: 'Küçük işletmeler için',
    price: 999,
    card_count: 5,
    color: 'purple',
    popular: true,
    display_order: 2,
    active: true,
    features: [
      '5 Dijital Kartvizit',
      'Tüm Başlangıç Özellikleri',
      'Banka Hesap Bilgileri',
      'Firma Logosu Yükleme',
      'Katalog PDF Ekleme',
      'Özelleştirilebilir Temalar',
      'İstatistik ve Analiz',
      'Öncelikli Destek'
    ]
  },
  {
    package_key: 'enterprise',
    name: 'Kurumsal',
    description: 'Büyük şirketler için',
    price: 1999,
    card_count: 25,
    color: 'green',
    popular: false,
    display_order: 3,
    active: true,
    features: [
      '25 Dijital Kartvizit',
      'Tüm İş Paketi Özellikleri',
      'Özel Tasarım Desteği',
      'API Entegrasyonu',
      'Toplu Kartvizit Yönetimi',
      'Gelişmiş Analitik',
      'Özel Domain Desteği',
      'Özel Hesap Yöneticisi'
    ]
  }
];

async function seed() {
  console.log('🌱 Paket seed işlemi başlatılıyor...\n');

  try {
    // Önce mevcut paketleri kontrol et
    const existingPackages = await prisma.packages.findMany();

    if (existingPackages.length > 0) {
      console.log('⚠️  Database\'de zaten paketler mevcut!');
      console.log(`   Mevcut paket sayısı: ${existingPackages.length}\n`);

      console.log('Mevcut paketler:');
      existingPackages.forEach(pkg => {
        console.log(`   - ${pkg.name} (${pkg.package_key})`);
      });

      console.log('\n❓ Paketler zaten ekli olduğu için seed işlemi atlandı.');
      console.log('   Paketleri sıfırlamak için önce silin veya script\'i güncelleyin.\n');
      return;
    }

    // Paketleri database'e ekle
    console.log('📦 Paketler ekleniyor...\n');

    for (const pkg of initialPackages) {
      const created = await prisma.packages.create({
        data: pkg
      });

      console.log(`   ✓ ${created.name} paketi eklendi (${created.price}₺, ${created.card_count} kart)`);
    }

    console.log('\n✅ Seed işlemi başarıyla tamamlandı!');
    console.log(`   Toplam ${initialPackages.length} paket eklendi.\n`);

  } catch (error) {
    console.error('❌ Seed işlemi sırasında hata oluştu:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
