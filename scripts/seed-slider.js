/**
 * Seed Script for Slider Images
 * Migrates existing 9 slider images from /public/img/hero/ to database
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSliderImages() {
  console.log('🌱 Starting slider images seed...');

  try {
    // Check if any slider images already exist
    const existingCount = await prisma.sliderImage.count();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing slider images. Skipping seed.`);
      console.log('   To re-seed, first delete existing images via admin panel or database.');
      return;
    }

    // Define the 9 existing slider images
    const sliderImages = [
      {
        image_url: '/img/hero/1.jpg',
        alt_text: 'Dijital kartvizit örnek ekran 1',
        active: true,
        display_order: 0,
      },
      {
        image_url: '/img/hero/2.jpg',
        alt_text: 'Dijital kartvizit örnek ekran 2',
        active: true,
        display_order: 1,
      },
      {
        image_url: '/img/hero/3.jpg',
        alt_text: 'Dijital kartvizit örnek ekran 3',
        active: true,
        display_order: 2,
      },
      {
        image_url: '/img/hero/4.jpg',
        alt_text: 'Dijital kartvizit örnek ekran 4',
        active: true,
        display_order: 3,
      },
      {
        image_url: '/img/hero/5.jpg',
        alt_text: 'Dijital kartvizit örnek ekran 5',
        active: true,
        display_order: 4,
      },
      {
        image_url: '/img/hero/6.jpg',
        alt_text: 'Dijital kartvizit örnek ekran 6',
        active: true,
        display_order: 5,
      },
      {
        image_url: '/img/hero/7.jpg',
        alt_text: 'Dijital kartvizit örnek ekran 7',
        active: true,
        display_order: 6,
      },
      {
        image_url: '/img/hero/8.jpg',
        alt_text: 'Dijital kartvizit örnek ekran 8',
        active: true,
        display_order: 7,
      },
      {
        image_url: '/img/hero/9.jpg',
        alt_text: 'Dijital kartvizit örnek ekran 9',
        active: true,
        display_order: 8,
      },
    ];

    // Insert all slider images
    console.log(`📸 Creating ${sliderImages.length} slider images...`);

    for (const image of sliderImages) {
      await prisma.sliderImage.create({
        data: image,
      });
      console.log(`   ✅ Created: ${image.image_url}`);
    }

    console.log('');
    console.log('✅ Slider images seed completed successfully!');
    console.log(`   Total images created: ${sliderImages.length}`);
    console.log('');
    console.log('💡 Next steps:');
    console.log('   1. Visit /admin/ayarlar/slider to manage slider images');
    console.log('   2. You can now upload new images via admin panel');
    console.log('   3. The homepage slider will automatically use these images');

  } catch (error) {
    console.error('❌ Error seeding slider images:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedSliderImages()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
