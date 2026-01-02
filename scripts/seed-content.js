/**
 * Seed Script for FAQ and Testimonials
 * Adds 5 FAQ entries and 5 customer testimonials to database
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedContent() {
  console.log('🌱 Starting content seed...');

  try {
    // ==============================
    // SEED FAQ ENTRIES
    // ==============================
    console.log('\n📋 Creating FAQ entries...');

    const faqs = [
      {
        question: 'Dijital kartvizit nedir?',
        answer: 'Dijital kartvizit, geleneksel kağıt kartvizitlerin modern ve çevreci alternatifidir. QR kod ile kolayca paylaşılabilen, güncellenebilen ve her zaman erişilebilen profesyonel bir iletişim aracıdır.',
        category: 'Genel',
        active: true,
        display_order: 0,
      },
      {
        question: 'Nasıl dijital kartvizit oluşturabilirim?',
        answer: 'Anasayfa üzerindeki form ile firma bilgilerinizi girin, ödeme yapın ve hemen dijital kartvizitinizi oluşturun. Tüm süreç dakikalar içinde tamamlanır.',
        category: 'Kullanım',
        active: true,
        display_order: 1,
      },
      {
        question: 'Dijital kartvizitimi nasıl paylaşırım?',
        answer: 'Dijital kartvizitinizi QR kod ile paylaşabilir, kişilere özel link gönderebilir veya sosyal medyada paylaşabilirsiniz. Karşı taraf QR kodu okutarak tüm bilgilerinize anında erişebilir.',
        category: 'Paylaşım',
        active: true,
        display_order: 2,
      },
      {
        question: 'Bilgilerimi sonradan güncelleyebilir miyim?',
        answer: 'Evet, admin panelinizden dilediğiniz zaman firma bilgilerinizi, sosyal medya hesaplarınızı, banka hesaplarınızı ve diğer tüm bilgileri güncelleyebilirsiniz.',
        category: 'Yönetim',
        active: true,
        display_order: 3,
      },
      {
        question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
        answer: 'Banka havalesi ve EFT ile ödeme yapabilirsiniz. Ödemeniz onaylandıktan sonra dijital kartvizitiniz hemen aktif hale gelir.',
        category: 'Ödeme',
        active: true,
        display_order: 4,
      },
    ];

    for (const faq of faqs) {
      const created = await prisma.faq.create({
        data: faq,
      });
      console.log(`   ✅ FAQ created: "${created.question.substring(0, 50)}..."`);
    }

    // ==============================
    // SEED TESTIMONIALS
    // ==============================
    console.log('\n💬 Creating testimonials...');

    const testimonials = [
      {
        name: 'Ahmet Yılmaz',
        title: 'Genel Müdür - ABC Teknoloji',
        avatar_url: null,
        text: 'Dijital kartvizit sayesinde müşterilerimize daha profesyonel bir imaj sunuyoruz. QR kod ile paylaşım çok pratik, herkes kolayca bilgilerimize ulaşabiliyor.',
        rating: 5,
        active: true,
        display_order: 0,
      },
      {
        name: 'Zeynep Kaya',
        title: 'Pazarlama Müdürü - XYZ Danışmanlık',
        avatar_url: null,
        text: 'Artık toplantılarda kağıt kartvizit taşımıyorum. Telefonomla QR kodu gösteriyorum ve karşımdaki kişi anında tüm bilgilerime ulaşıyor. Çok memnunum!',
        rating: 5,
        active: true,
        display_order: 1,
      },
      {
        name: 'Mehmet Demir',
        title: 'Kurucu Ortak - İnovasyon Yazılım',
        avatar_url: null,
        text: 'Admin paneli çok kullanışlı. İstediğim zaman bilgilerimi güncelleyebiliyorum. Sosyal medya hesaplarımı da ekleyebildiğim için daha görünür oldum.',
        rating: 5,
        active: true,
        display_order: 2,
      },
      {
        name: 'Elif Şahin',
        title: 'Satış Direktörü - Global Ticaret',
        avatar_url: null,
        text: 'Müşteri kazanımında büyük fark yarattı. Profesyonel görünüm ve kolay erişim sayesinde takip eden müşteri sayımız %40 arttı.',
        rating: 5,
        active: true,
        display_order: 3,
      },
      {
        name: 'Can Arslan',
        title: 'İşletme Sahibi - Arslan İnşaat',
        avatar_url: null,
        text: 'Hem çevreci hem modern bir çözüm. Kağıt kartvizit yerine dijital kartvizit kullanmak şirketimizin imajına çok olumlu katkı sağladı.',
        rating: 5,
        active: true,
        display_order: 4,
      },
    ];

    for (const testimonial of testimonials) {
      const created = await prisma.testimonial.create({
        data: testimonial,
      });
      console.log(`   ✅ Testimonial created: "${created.name}" - ${created.title}`);
    }

    console.log('\n✅ Content seed completed successfully!');
    console.log(`   Total FAQs created: ${faqs.length}`);
    console.log(`   Total testimonials created: ${testimonials.length}`);
    console.log('');
    console.log('💡 Next steps:');
    console.log('   1. Visit /admin/ayarlar/sss to manage FAQ entries');
    console.log('   2. Visit /admin/ayarlar/yorumlar to manage testimonials');
    console.log('   3. FAQ and testimonials will appear on homepage automatically');

  } catch (error) {
    console.error('❌ Error seeding content:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedContent()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
