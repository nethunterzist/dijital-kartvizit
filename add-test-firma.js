const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addTestFirma() {
  try {
    console.log('🔄 Test firması ekleniyor...');
    
    const testFirma = await prisma.firmalar.create({
      data: {
        firma_adi: "Test Teknoloji A.Ş.",
        slug: "test-teknoloji",
        yetkili_adi: "Ahmet Yılmaz",
        yetkili_pozisyon: "Genel Müdür",
        template_id: 1,
        onay: true,
        goruntulenme: 15
      }
    });

    console.log('✅ Test firması eklendi:', testFirma);

    // İletişim bilgileri ekle
    await prisma.iletisimBilgisi.createMany({
      data: [
        {
          firma_id: testFirma.id,
          tip: 'telefon',
          deger: '0212 555 0123',
          etiket: 'İş Telefonu',
          aktif: true,
          sira: 1
        },
        {
          firma_id: testFirma.id,
          tip: 'eposta',
          deger: 'info@test-teknoloji.com',
          etiket: 'İş E-postası',
          aktif: true,
          sira: 2
        },
        {
          firma_id: testFirma.id,
          tip: 'website',
          deger: 'https://www.test-teknoloji.com',
          etiket: 'Website',
          aktif: true,
          sira: 3
        }
      ]
    });

    console.log('✅ İletişim bilgileri eklendi');

    // İkinci test firması
    const testFirma2 = await prisma.firmalar.create({
      data: {
        firma_adi: "Dijital Çözümler Ltd.",
        slug: "dijital-cozumler",
        yetkili_adi: "Fatma Demir",
        yetkili_pozisyon: "Proje Müdürü",
        template_id: 1,
        onay: true,
        goruntulenme: 8
      }
    });

    console.log('✅ İkinci test firması eklendi:', testFirma2);

    // İkinci firma için iletişim bilgileri
    await prisma.iletisimBilgisi.createMany({
      data: [
        {
          firma_id: testFirma2.id,
          tip: 'telefon',
          deger: '0216 444 5678',
          etiket: 'İş Telefonu',
          aktif: true,
          sira: 1
        },
        {
          firma_id: testFirma2.id,
          tip: 'eposta',
          deger: 'iletisim@dijital-cozumler.com',
          etiket: 'İş E-postası',
          aktif: true,
          sira: 2
        }
      ]
    });

    console.log('✅ Tüm test verileri başarıyla eklendi!');

  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestFirma();
