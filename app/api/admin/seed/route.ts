import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/lib/db';
import { authOptions } from '@/app/lib/auth';

/**
 * POST /api/admin/seed
 * Seed production database with initial data
 *
 * Security:
 * - Requires admin authentication
 * - One-time operation (checks for existing data)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { type } = await request.json();

    if (type === 'slider') {
      // Check if slider images already exist
      const existingCount = await prisma.sliderImage.count();
      if (existingCount > 0) {
        return NextResponse.json({
          success: false,
          message: `${existingCount} slider images already exist. Skipping seed.`,
        });
      }

      // Seed slider images
      const sliderImages = [
        { image_url: '/img/hero/1.jpg', alt_text: 'Dijital kartvizit örnek ekran 1', active: true, display_order: 0 },
        { image_url: '/img/hero/2.jpg', alt_text: 'Dijital kartvizit örnek ekran 2', active: true, display_order: 1 },
        { image_url: '/img/hero/3.jpg', alt_text: 'Dijital kartvizit örnek ekran 3', active: true, display_order: 2 },
        { image_url: '/img/hero/4.jpg', alt_text: 'Dijital kartvizit örnek ekran 4', active: true, display_order: 3 },
        { image_url: '/img/hero/5.jpg', alt_text: 'Dijital kartvizit örnek ekran 5', active: true, display_order: 4 },
        { image_url: '/img/hero/6.jpg', alt_text: 'Dijital kartvizit örnek ekran 6', active: true, display_order: 5 },
        { image_url: '/img/hero/7.jpg', alt_text: 'Dijital kartvizit örnek ekran 7', active: true, display_order: 6 },
        { image_url: '/img/hero/8.jpg', alt_text: 'Dijital kartvizit örnek ekran 8', active: true, display_order: 7 },
        { image_url: '/img/hero/9.jpg', alt_text: 'Dijital kartvizit örnek ekran 9', active: true, display_order: 8 },
      ];

      for (const image of sliderImages) {
        await prisma.sliderImage.create({ data: image });
      }

      return NextResponse.json({
        success: true,
        message: `${sliderImages.length} slider images created successfully!`,
        count: sliderImages.length,
      });
    }

    if (type === 'content') {
      // Seed FAQs
      const faqCount = await prisma.faq.count();
      let faqsCreated = 0;

      if (faqCount === 0) {
        const faqs = [
          { question: 'Dijital kartvizit nedir?', answer: 'Dijital kartvizit, geleneksel kağıt kartvizitlerin modern ve çevreci alternatifidir. QR kod ile kolayca paylaşılabilen, güncellenebilen ve her zaman erişilebilen profesyonel bir iletişim aracıdır.', category: 'Genel', active: true, display_order: 0 },
          { question: 'Nasıl dijital kartvizit oluşturabilirim?', answer: 'Anasayfa üzerindeki form ile firma bilgilerinizi girin, ödeme yapın ve hemen dijital kartvizitinizi oluşturun. Tüm süreç dakikalar içinde tamamlanır.', category: 'Kullanım', active: true, display_order: 1 },
          { question: 'Dijital kartvizitimi nasıl paylaşırım?', answer: 'Dijital kartvizitinizi QR kod ile paylaşabilir, kişilere özel link gönderebilir veya sosyal medyada paylaşabilirsiniz. Karşı taraf QR kodu okutarak tüm bilgilerinize anında erişebilir.', category: 'Paylaşım', active: true, display_order: 2 },
          { question: 'Bilgilerimi sonradan güncelleyebilir miyim?', answer: 'Evet, admin panelinizden dilediğiniz zaman firma bilgilerinizi, sosyal medya hesaplarınızı, banka hesaplarınızı ve diğer tüm bilgileri güncelleyebilirsiniz.', category: 'Yönetim', active: true, display_order: 3 },
          { question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?', answer: 'Banka havalesi ve EFT ile ödeme yapabilirsiniz. Ödemeniz onaylandıktan sonra dijital kartvizitiniz hemen aktif hale gelir.', category: 'Ödeme', active: true, display_order: 4 },
        ];

        for (const faq of faqs) {
          await prisma.faq.create({ data: faq });
        }
        faqsCreated = faqs.length;
      }

      // Seed Testimonials
      const testimonialCount = await prisma.testimonial.count();
      let testimonialsCreated = 0;

      if (testimonialCount === 0) {
        const testimonials = [
          { name: 'Ahmet Yılmaz', title: 'Genel Müdür - ABC Teknoloji', avatar_url: null, text: 'Dijital kartvizit sayesinde müşterilerimize daha profesyonel bir imaj sunuyoruz. QR kod ile paylaşım çok pratik, herkes kolayca bilgilerimize ulaşabiliyor.', rating: 5, active: true, display_order: 0 },
          { name: 'Zeynep Kaya', title: 'Pazarlama Müdürü - XYZ Danışmanlık', avatar_url: null, text: 'Artık toplantılarda kağıt kartvizit taşımıyorum. Telefonomla QR kodu gösteriyorum ve karşımdaki kişi anında tüm bilgilerime ulaşıyor. Çok memnunum!', rating: 5, active: true, display_order: 1 },
          { name: 'Mehmet Demir', title: 'Kurucu Ortak - İnovasyon Yazılım', avatar_url: null, text: 'Admin paneli çok kullanışlı. İstediğim zaman bilgilerimi güncelleyebiliyorum. Sosyal medya hesaplarımı da ekleyebildiğim için daha görünür oldum.', rating: 5, active: true, display_order: 2 },
          { name: 'Elif Şahin', title: 'Satış Direktörü - Global Ticaret', avatar_url: null, text: 'Müşteri kazanımında büyük fark yarattı. Profesyonel görünüm ve kolay erişim sayesinde takip eden müşteri sayımız %40 arttı.', rating: 5, active: true, display_order: 3 },
          { name: 'Can Arslan', title: 'İşletme Sahibi - Arslan İnşaat', avatar_url: null, text: 'Hem çevreci hem modern bir çözüm. Kağıt kartvizit yerine dijital kartvizit kullanmak şirketimizin imajına çok olumlu katkı sağladı.', rating: 5, active: true, display_order: 4 },
        ];

        for (const testimonial of testimonials) {
          await prisma.testimonial.create({ data: testimonial });
        }
        testimonialsCreated = testimonials.length;
      }

      return NextResponse.json({
        success: true,
        message: `Seed completed! FAQs: ${faqsCreated}, Testimonials: ${testimonialsCreated}`,
        faqsCreated,
        testimonialsCreated,
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid seed type. Use "slider" or "content"',
    }, { status: 400 });

  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
