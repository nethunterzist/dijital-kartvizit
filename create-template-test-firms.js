const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Template listesi (templateRegistry.ts'den alındı)
const TEMPLATES = [
  { id: 2, name: 'Modern' },
  { id: 3, name: 'Minimal' },
  { id: 4, name: 'Corporate' },
  { id: 5, name: 'Colorful' },
  { id: 7, name: 'Corporate Slate' },
  { id: 8, name: 'Clean Sheet' },
  { id: 9, name: 'Night Pulse' },
  { id: 10, name: 'Glass Aura' },
  { id: 11, name: 'Pastel Bloom' },
  { id: 12, name: 'Retro Signal' },
  { id: 13, name: 'Gridfolio' },
  { id: 14, name: 'MonoTone' },
  { id: 15, name: 'Vibe Stream' },
  { id: 16, name: 'Goldmark' },
  { id: 17, name: 'Green Soul' },
  { id: 18, name: 'Ocean Breeze' },
  { id: 19, name: 'Sunset Glow' },
  { id: 20, name: 'Purple Rain' },
  { id: 21, name: 'Crimson Edge' },
  { id: 23, name: 'Doğal Esinti' },
  { id: 25, name: 'Zanaatkar Dokunuşu' },
  { id: 26, name: 'Gelecek Vizyonu' },
  { id: 27, name: 'Altın Varak' },
  { id: 28, name: 'Finans Zirvesi' },
  { id: 29, name: 'Art Deco Esintisi' },
  { id: 30, name: 'Sakin Bahçe' },
  { id: 32, name: 'Akademik Mavi' },
  { id: 33, name: 'Suluboya Paleti' },
  { id: 34, name: 'Endüstriyel Çelik' },
  { id: 35, name: 'Karanlık Mod+' },
  { id: 36, name: 'Gazete Kağıdı' },
  { id: 37, name: 'Pop Art Patlaması' },
  { id: 38, name: 'Mermer Zarafeti' },
  { id: 39, name: 'Okyanus Derinliği' }
];

// Mock firma isimleri
const FIRMA_NAMES = [
  'Teknoloji Çözümleri Ltd.',
  'Yaratıcı Tasarım Stüdyosu',
  'Kurumsal Danışmanlık A.Ş.',
  'Renkli Medya Ajansı',
  'Lüks Hizmetler A.Ş.',
  'Profesyonel Hizmetler Ltd.',
  'Temiz Teknoloji A.Ş.',
  'Gece Işığı Prodüksiyon',
  'Cam Sanatları Atölyesi',
  'Pastel Renkler Stüdyosu',
  'Nostaljik Tasarım Evi',
  'Grid Sistem Çözümleri',
  'Minimalist Yaklaşım Ltd.',
  'Dinamik Enerji A.Ş.',
  'Altın Standart Hizmetler',
  'Yeşil Yaşam Danışmanlığı',
  'Okyanus Mavi Teknoloji',
  'Gün Batımı Medya',
  'Mor Rüya Prodüksiyon',
  'Kırmızı Çizgi Ajansı',
  'Retro Dalga Stüdyosu',
  'Doğal Yaşam Merkezi',
  'Beton Sanatları A.Ş.',
  'El Sanatları Atölyesi',
  'Gelecek Teknolojileri',
  'Altın Varak Tasarım',
  'Finans Uzmanları Ltd.',
  'Art Deco Koleksiyonu',
  'Zen Bahçe Tasarımı',
  'Kod Geliştirme Merkezi',
  'Akademik Araştırmalar',
  'Sanat Atölyesi Stüdyosu',
  'Endüstriyel Çözümler A.Ş.',
  'Modern UI/UX Ajansı',
  'Vintage Koleksiyon Evi',
  'Pop Art Galeri',
  'Mermer İşleri Ltd.',
  'Deniz Ürünleri A.Ş.',
  'Ahşap Sanatları Atölyesi',
  'Gökkuşağı Medya Grubu'
];

// Mock kişi isimleri
const PERSON_NAMES = [
  'Ahmet Yılmaz', 'Mehmet Kaya', 'Ayşe Demir', 'Fatma Çelik', 'Mustafa Şahin',
  'Emine Yıldız', 'Ali Özkan', 'Hatice Arslan', 'İbrahim Doğan', 'Zeynep Kılıç',
  'Hüseyin Aslan', 'Zeliha Polat', 'Ömer Koç', 'Elif Erdoğan', 'Murat Güneş',
  'Sevgi Aydın', 'Kemal Özdemir', 'Gülsüm Yavuz', 'Recep Demirtaş', 'Hacer Öztürk',
  'Selim Kara', 'Aysel Tunç', 'Orhan Bulut', 'Nermin Akın', 'Yaşar Güler',
  'Songül Erdem', 'Kadir Yurt', 'Filiz Çakır', 'Erkan Şen', 'Dilek Acar',
  'Serkan Bayram', 'Pınar Koçak', 'Tolga Ateş', 'Sibel Kocaman', 'Burak Çiftçi',
  'Esra Yıldırım', 'Cem Özer', 'Tülay Karaca', 'Deniz Aktaş', 'Canan Yılmaz'
];

// Mock pozisyonlar
const POSITIONS = [
  'Genel Müdür', 'Satış Müdürü', 'Pazarlama Uzmanı', 'Proje Yöneticisi', 'Tasarım Direktörü',
  'İnsan Kaynakları Uzmanı', 'Finans Müdürü', 'Operasyon Müdürü', 'Teknoloji Lideri', 'Kreatif Direktör',
  'İş Geliştirme Uzmanı', 'Müşteri Temsilcisi', 'Kalite Kontrol Uzmanı', 'Ar-Ge Müdürü', 'Strateji Uzmanı',
  'Dijital Pazarlama Uzmanı', 'Sosyal Medya Uzmanı', 'Grafik Tasarımcı', 'Web Tasarımcısı', 'Yazılım Geliştirici',
  'Veri Analisti', 'Proje Koordinatörü', 'Satış Temsilcisi', 'Müşteri Hizmetleri', 'Eğitim Koordinatörü',
  'Halkla İlişkiler Uzmanı', 'Etkinlik Yöneticisi', 'İçerik Editörü', 'SEO Uzmanı', 'E-ticaret Uzmanı',
  'Mobil Uygulama Geliştirici', 'UI/UX Tasarımcı', 'Sistem Yöneticisi', 'Güvenlik Uzmanı', 'Danışman',
  'Eğitmen', 'Koordinatör', 'Uzman', 'Müdür Yardımcısı'
];

// Mock telefon numaraları
const generatePhone = () => {
  const prefixes = ['532', '533', '534', '535', '536', '537', '538', '539', '541', '542', '543', '544', '545', '546', '547', '548', '549'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 9000000) + 1000000;
  return `+90 ${prefix} ${number.toString().substring(0,3)} ${number.toString().substring(3,5)} ${number.toString().substring(5,7)}`;
};

// Mock email adresleri
const generateEmail = (firmaAdi, kisiAdi) => {
  const domain = firmaAdi.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 10);
  const name = kisiAdi.toLowerCase()
    .split(' ')[0]
    .replace(/[^a-z]/g, '');
  return `${name}@${domain}.com`;
};

// Mock adresler
const ADDRESSES = [
  'Maslak Mahallesi, Büyükdere Caddesi No:123, Sarıyer/İstanbul',
  'Levent Mahallesi, Nispetiye Caddesi No:45, Beşiktaş/İstanbul',
  'Bağdat Caddesi No:234, Kadıköy/İstanbul',
  'Nişantaşı Mahallesi, Teşvikiye Caddesi No:67, Şişli/İstanbul',
  'Etiler Mahallesi, Nispetiye Caddesi No:89, Beşiktaş/İstanbul',
  'Ataşehir Bulvarı No:156, Ataşehir/İstanbul',
  'Kozyatağı Mahallesi, Değirmen Sokak No:78, Kadıköy/İstanbul',
  'Gayrettepe Mahallesi, Büyükdere Caddesi No:90, Şişli/İstanbul',
  'Zorlu Center, Levazım Mahallesi, Beşiktaş/İstanbul',
  'Vadistanbul AVM, Ayazağa Mahallesi, Sarıyer/İstanbul'
];

// Mock sosyal medya hesapları
const generateSocialMedia = (firmaAdi) => {
  const handle = firmaAdi.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 15);
  
  return [
    {
      platform: 'instagram',
      url: `https://instagram.com/${handle}`,
      aktif: true
    },
    {
      platform: 'facebook', 
      url: `https://facebook.com/${handle}`,
      aktif: true
    },
    {
      platform: 'linkedin',
      url: `https://linkedin.com/company/${handle}`,
      aktif: true
    },
    {
      platform: 'twitter',
      url: `https://twitter.com/${handle}`,
      aktif: Math.random() > 0.3
    },
    {
      platform: 'youtube',
      url: `https://youtube.com/@${handle}`,
      aktif: Math.random() > 0.5
    }
  ];
};

// Mock vergi bilgileri
const generateTaxInfo = (firmaAdi) => {
  const vergiNo = Math.floor(Math.random() * 9000000000) + 1000000000;
  const vergiDaireleri = [
    'Beşiktaş Vergi Dairesi', 'Kadıköy Vergi Dairesi', 'Şişli Vergi Dairesi',
    'Sarıyer Vergi Dairesi', 'Ataşehir Vergi Dairesi', 'Levent Vergi Dairesi',
    'Maslak Vergi Dairesi', 'Etiler Vergi Dairesi', 'Nişantaşı Vergi Dairesi'
  ];
  
  return {
    firma_unvan: firmaAdi,
    firma_vergi_no: vergiNo.toString(),
    vergi_dairesi: vergiDaireleri[Math.floor(Math.random() * vergiDaireleri.length)]
  };
};

// Mock hakkımızda metni
const generateAbout = (firmaAdi, templateName) => {
  const aboutTexts = [
    `${firmaAdi}, ${templateName} template'i kullanarak modern ve profesyonel hizmetler sunmaktadır. Müşteri memnuniyeti odaklı yaklaşımımızla sektörde öncü konumdayız.`,
    `2010 yılından beri faaliyet gösteren ${firmaAdi}, kaliteli hizmet anlayışı ile müşterilerine değer katmaya devam etmektedir. Deneyimli ekibimizle her projede mükemmellik hedefliyoruz.`,
    `${firmaAdi} olarak, yenilikçi çözümler ve yaratıcı yaklaşımlarla sektörde fark yaratıyoruz. ${templateName} tasarımımız da bu vizyonumuzu yansıtmaktadır.`,
    `Müşteri odaklı hizmet anlayışımızla ${firmaAdi}, her projede en iyi sonuçları elde etmeyi hedefler. Profesyonel ekibimiz ve kaliteli hizmetimizle yanınızdayız.`
  ];
  
  return aboutTexts[Math.floor(Math.random() * aboutTexts.length)];
};

// Mock IBAN bilgileri
const generateIban = () => {
  const banks = [
    { name: 'Türkiye İş Bankası', code: '0064' },
    { name: 'Garanti BBVA', code: '0062' },
    { name: 'Yapı Kredi Bankası', code: '0067' },
    { name: 'Akbank', code: '0046' },
    { name: 'Ziraat Bankası', code: '0001' }
  ];
  
  const bank = banks[Math.floor(Math.random() * banks.length)];
  const accountNumber = Math.floor(Math.random() * 900000000) + 100000000;
  const iban = `TR${Math.floor(Math.random() * 90) + 10}${bank.code}0${accountNumber}`;
  
  return {
    bank_name: bank.name,
    iban: iban,
    currency: 'TRY'
  };
};

// Slug oluşturma fonksiyonu
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

async function createTestFirms() {
  console.log('🚀 Template test firmaları oluşturuluyor...');
  
  try {
    // Önce mevcut test firmalarını temizle
    console.log('🧹 Mevcut test firmaları temizleniyor...');
    await prisma.iletisimBilgisi.deleteMany({
      where: {
        firma: {
          firma_adi: {
            contains: 'Test'
          }
        }
      }
    });
    
    await prisma.firmalar.deleteMany({
      where: {
        firma_adi: {
          contains: 'Test'
        }
      }
    });

    let createdCount = 0;

    // Her template için firma oluştur
    for (let i = 0; i < TEMPLATES.length; i++) {
      const template = TEMPLATES[i];
      const firmaAdi = `${template.name} Firma`;
      const yetkiliAdi = PERSON_NAMES[i];
      const pozisyon = POSITIONS[i];
      const telefon = generatePhone();
      const email = generateEmail(firmaAdi, yetkiliAdi);
      const adres = ADDRESSES[i % ADDRESSES.length];
      const slug = createSlug(firmaAdi) + '-' + Date.now();
      
      console.log(`📝 ${i + 1}/${TEMPLATES.length} - ${firmaAdi} (Template ${template.id}) oluşturuluyor...`);

      // Firma oluştur
      const firma = await prisma.firmalar.create({
        data: {
          firma_adi: firmaAdi,
          slug: slug,
          yetkili_adi: yetkiliAdi,
          yetkili_pozisyon: pozisyon,
          template_id: template.id,
          onay: true,
          created_at: new Date(),
          updated_at: new Date(),
          goruntulenme: Math.floor(Math.random() * 1000)
        }
      });

      // İletişim bilgileri oluştur
      const iletisimBilgileri = [
        {
          firma_id: firma.id,
          tip: 'telefon',
          deger: telefon,
          etiket: 'Telefon',
          aktif: true,
          sira: 1
        },
        {
          firma_id: firma.id,
          tip: 'email',
          deger: email,
          etiket: 'E-posta',
          aktif: true,
          sira: 2
        },
        {
          firma_id: firma.id,
          tip: 'whatsapp',
          deger: telefon.replace(/\s/g, ''),
          etiket: 'WhatsApp',
          aktif: true,
          sira: 3
        },
        {
          firma_id: firma.id,
          tip: 'adres',
          deger: adres,
          etiket: 'Adres',
          aktif: true,
          sira: 4
        },
        {
          firma_id: firma.id,
          tip: 'website',
          deger: `https://www.${createSlug(firmaAdi)}.com`,
          etiket: 'Website',
          aktif: true,
          sira: 5
        }
      ];

      // Sosyal medya hesapları ekle
      const socialMedia = generateSocialMedia(firmaAdi);
      let siraCounter = 6;
      
      socialMedia.forEach(social => {
        if (social.aktif) {
          iletisimBilgileri.push({
            firma_id: firma.id,
            tip: social.platform,
            deger: social.url,
            etiket: social.platform.charAt(0).toUpperCase() + social.platform.slice(1),
            aktif: true,
            sira: siraCounter++
          });
        }
      });

      // Vergi bilgileri ekle
      const taxInfo = generateTaxInfo(firmaAdi);
      iletisimBilgileri.push({
        firma_id: firma.id,
        tip: 'vergi',
        deger: JSON.stringify(taxInfo),
        etiket: 'Vergi Bilgileri',
        aktif: true,
        sira: siraCounter++
      });

      // Hakkımızda bilgisi ekle
      const aboutText = generateAbout(firmaAdi, template.name);
      iletisimBilgileri.push({
        firma_id: firma.id,
        tip: 'hakkimizda',
        deger: aboutText,
        etiket: 'Hakkımızda',
        aktif: true,
        sira: siraCounter++
      });

      // IBAN bilgisi ekle
      const ibanInfo = generateIban();
      iletisimBilgileri.push({
        firma_id: firma.id,
        tip: 'iban',
        deger: JSON.stringify([ibanInfo]),
        etiket: 'Banka Hesabı',
        aktif: true,
        sira: siraCounter++
      });

      // Tüm iletişim bilgilerini kaydet
      await prisma.iletisimBilgisi.createMany({
        data: iletisimBilgileri
      });

      createdCount++;
      console.log(`✅ ${firmaAdi} başarıyla oluşturuldu! (${firma.id})`);
    }

    console.log(`\n🎉 Toplam ${createdCount} test firması başarıyla oluşturuldu!`);
    console.log(`\n📋 Oluşturulan firmalar:`);
    
    const firmalar = await prisma.firmalar.findMany({
      where: {
        firma_adi: {
          contains: 'Test'
        }
      },
      orderBy: {
        template_id: 'asc'
      },
      select: {
        id: true,
        firma_adi: true,
        slug: true,
        template_id: true,
        yetkili_adi: true
      }
    });

    firmalar.forEach((firma, index) => {
      console.log(`${index + 1}. ${firma.firma_adi} - Template ${firma.template_id} - http://localhost:3000/${firma.slug}`);
    });

    console.log(`\n🌐 Admin paneli: http://localhost:3001/admin/firmalar`);

  } catch (error) {
    console.error('❌ Hata oluştu:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Script'i çalıştır
createTestFirms();
