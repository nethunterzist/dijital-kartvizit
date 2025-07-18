'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { environment } from '@/app/environment';
import PhonePreview from '@/components/PhonePreview';
import { TEMPLATES } from '@/app/lib/templates/templateRegistry';

// newBankAccount fonksiyonu: Yeni bir boş banka hesabı objesi oluşturur
const newBankAccount = () => {
  return {
    bank_name: "",
    bank_label: "",
    bank_logo: "",
    account_holder: "",
    accounts: [
      {
        iban: "",
        currency: "TRY"
      }
    ]
  };
};

// Banka listesi sabit verisi
const BANKALAR = [
  { id: "ziraat", label: "Ziraat Bankası", logo: "/img/banks/ziraat.png" },
  { id: "vakifbank", label: "VakıfBank", logo: "/img/banks/vakifbank.png" },
  { id: "halkbank", label: "Halkbank", logo: "/img/banks/halkbank.png" },
  { id: "isbankasi", label: "İş Bankası", logo: "/img/banks/isbankasi.png" },
  { id: "garanti", label: "Garanti BBVA", logo: "/img/banks/garanti.png" },
  { id: "akbank", label: "Akbank", logo: "/img/banks/akbank.png" },
  { id: "yapikredi", label: "Yapı Kredi", logo: "/img/banks/yapikredi.png" },
  { id: "qnb", label: "QNB Finansbank", logo: "/img/banks/qnb.png" },
  { id: "teb", label: "TEB (Türk Ekonomi Bankası)", logo: "/img/banks/teb.png" },
  { id: "kuveytturk", label: "Kuveyt Türk", logo: "/img/banks/kuveytturk.png" },
  { id: "albaraka", label: "Albaraka Türk", logo: "/img/banks/albaraka.png" },
  { id: "turkiyefinans", label: "Türkiye Finans", logo: "/img/banks/turkiyefinans.png" },
  { id: "anadolubank", label: "AnadoluBank", logo: "/img/banks/anadolubank.png" },
  { id: "sekerbank", label: "Şekerbank", logo: "/img/banks/sekerbank.png" },
  { id: "icbc", label: "ICBC Turkey Bank", logo: "/img/banks/icbc.png" },
  { id: "odeabank", label: "Odeabank", logo: "/img/banks/odeabank.png" }
];

interface Firma {
  id: number;
  firma_adi: string;
  slug: string;
  telefon?: string;
  eposta?: string;
  whatsapp?: string;
  instagram?: string[];
  youtube?: string[];
  linkedin?: string[];
  twitter?: string[];
  facebook?: string[];
  website?: string[];
  harita?: string[];
  yetkiliAdi?: string;
  yetkiliPozisyon?: string;
  bank_accounts?: BankAccount[];
  katalog?: string;
  created_at: string;
  updated_at: string;
}

interface BankAccount {
  bank_name: string;
  bank_label: string;
  bank_logo: string | null;
  account_holder: string;
  accounts: {
    iban: string;
    currency: string;
  }[];
}

// Sosyal Medya hesapları için arayüz tanımı
interface SocialMediaAccount {
  platform: string;
  url: string;
  type?: 'communication' | 'social' | 'other';
  label?: string; // Özel başlık için yeni alan eklendi
}

// İletişim hesapları için arayüz tanımı
interface CommunicationAccount {
  type: string;
  value: string;
  label?: string; // Özel başlık için yeni alan eklendi
}

// Cloudinary'ye PDF yükleme fonksiyonu
async function uploadPdfToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'pdf_unsigned'); // Cloudinary panelinden preset adını gir

  const res = await fetch('https://api.cloudinary.com/v1_1/dmjdeij1f/auto/upload', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('PDF yükleme başarısız');
  const data = await res.json();
  return data.secure_url;
}

export default function YeniFirmaPage() {
  const router = useRouter();

  const [firmaAdi, setFirmaAdi] = useState('');
  const [slug, setSlug] = useState('');
  const [telefon, setTelefon] = useState('');
  const [eposta, setEposta] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState<string[]>(['']);
  const [youtube, setYoutube] = useState<string[]>(['']);
  const [linkedin, setLinkedin] = useState<string[]>(['']);
  const [twitter, setTwitter] = useState<string[]>(['']);
  const [facebook, setFacebook] = useState<string[]>(['']);
  const [website, setWebsite] = useState<string[]>(['']);
  const [harita, setHarita] = useState<string[]>(['']);
  const [tiktoks, setTiktoks] = useState<string[]>(['']);
  const [yetkiliAdi, setYetkiliAdi] = useState('');
  const [yetkiliPozisyon, setYetkiliPozisyon] = useState('');
  const [firmaHakkinda, setFirmaHakkinda] = useState('');
  const [firmaHakkindaBaslik, setFirmaHakkindaBaslik] = useState('Hakkımızda');
  const [firmaUnvan, setFirmaUnvan] = useState('');
  const [firmaVergiNo, setFirmaVergiNo] = useState('');
  const [vergiDairesi, setVergiDairesi] = useState('');
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([newBankAccount()]);
  const [profilFoto, setProfilFoto] = useState<File | null>(null);
  const [profilFotoPreview, setProfilFotoPreview] = useState('');
  const [firmaLogo, setFirmaLogo] = useState<File | null>(null);
  const [firmaLogoPreview, setFirmaLogoPreview] = useState('');
  const [katalogDosya, setKatalogDosya] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [templateId, setTemplateId] = useState(2);

  // Sosyal medya için state (telefonlar, epostalar ve whatsapplar da buraya taşındı)
  const [socialMediaAccounts, setSocialMediaAccounts] = useState<SocialMediaAccount[]>([{
    platform: '',
    url: '', 
    type: undefined
  }]);

  // İletişim hesapları için state
  const [communicationAccounts, setCommunicationAccounts] = useState<CommunicationAccount[]>([{
    type: '',
    value: ''
  }]);

  // Rastgele veri oluşturucu fonksiyonlar
  const generateRandomName = () => {
    const companyPrefixes = ['Mega', 'Ultra', 'Super', 'Pro', 'Global', 'Tech', 'Smart', 'Digital', 'Türk', 'Net', 'Efe', 'Ege', 'Mert', 'Anadolu'];
    const companySuffixes = ['Teknoloji', 'Yazılım', 'Bilişim', 'İnşaat', 'Ticaret', 'Gıda', 'Nakliyat', 'Tekstil', 'Sanayi', 'Turizm', 'Holding', 'Medya', 'Group'];
    return `${companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)]} ${companySuffixes[Math.floor(Math.random() * companySuffixes.length)]}`;
  };
  
  const generateRandomPhone = () => {
    return `05${Math.floor(Math.random() * 5) + 3}${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`;
  };
  
  const generateRandomEmail = (companyName: string) => {
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'example.com'];
    const simplifiedName = companyName.toLowerCase().replace(/\s+/g, '').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c');
    return `info@${simplifiedName}.com`;
  };
  
  const generateRandomPersonName = () => {
    const firstNames = ['Ali', 'Ayşe', 'Mehmet', 'Fatma', 'Ahmet', 'Zeynep', 'Mustafa', 'Emine', 'İbrahim', 'Hatice', 'Hüseyin', 'Melek', 'İsmail', 'Merve', 'Ömer', 'Elif', 'Murat', 'Sevgi'];
    const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Çetin', 'Koç', 'Arslan', 'Aslan', 'Taş', 'Aksoy', 'Kurt', 'Özdemir', 'Aydın', 'Öztürk'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };
  
  const generateRandomTitle = () => {
    const titles = ['Genel Müdür', 'CEO', 'Firma Sahibi', 'Yönetici', 'Müdür', 'Satış Müdürü', 'Pazarlama Müdürü', 'İnsan Kaynakları Müdürü', 'Finans Müdürü', 'Teknik Müdür'];
    return titles[Math.floor(Math.random() * titles.length)];
  };
  
  const generateRandomWebsite = (companyName: string) => {
    const simplifiedName = companyName.toLowerCase().replace(/\s+/g, '').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c');
    return `https://www.${simplifiedName}.com`;
  };
  
  const generateRandomSocialMedia = (companyName: string) => {
    const simplifiedName = companyName.toLowerCase().replace(/\s+/g, '').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c');
    return `${simplifiedName}`;
  };
  
  // Formu rastgele verilerle doldur
  const autoFillForm = () => {
    const randomCompanyName = generateRandomName();
    const randomSlug = randomCompanyName.toLowerCase().replace(/\s+/g, '-').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c');
    const randomPersonName = generateRandomPersonName();
    const randomTitle = generateRandomTitle();
    const randomPhone1 = generateRandomPhone();
    const randomPhone2 = generateRandomPhone();
    const randomEmail1 = generateRandomEmail(randomCompanyName);
    const randomEmail2 = `destek@${randomCompanyName.toLowerCase().replace(/\s+/g, '').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c')}.com`;
    const randomWebsite1 = generateRandomWebsite(randomCompanyName);
    const randomWebsite2 = `${generateRandomWebsite(randomCompanyName).replace('.com', '.net')}`;
    const randomInsta1 = generateRandomSocialMedia(randomCompanyName);
    const randomInsta2 = `${randomInsta1}_official`;
    const randomTwitter1 = generateRandomSocialMedia(randomCompanyName);
    const randomTwitter2 = `${randomTwitter1}_tr`;
    const randomFacebook1 = generateRandomSocialMedia(randomCompanyName);
    const randomFacebook2 = `${randomFacebook1}.official`;
    const randomYoutube1 = generateRandomSocialMedia(randomCompanyName);
    const randomYoutube2 = `${randomYoutube1}TV`;
    const randomLinkedin1 = generateRandomSocialMedia(randomCompanyName);
    const randomLinkedin2 = `${randomLinkedin1}-group`;
    const randomTiktok1 = generateRandomSocialMedia(randomCompanyName);
    const randomTiktok2 = `${randomTiktok1}.official`;
    const randomHarita1 = "https://maps.google.com/?q=Istanbul,Turkey";
    const randomHarita2 = "https://maps.google.com/?q=Ankara,Turkey";
    
    // Form alanlarını rastgele değerlerle doldur
    setFirmaAdi(randomCompanyName);
    setSlug(randomSlug);
    setYetkiliAdi(randomPersonName);
    setYetkiliPozisyon(randomTitle);
    
    // İletişim bilgileri - her türden 2'şer tane (telefon, e-posta, whatsapp, telegram, website, harita)
    setCommunicationAccounts([
      { type: 'telefon', value: randomPhone1 },
      { type: 'telefon', value: randomPhone2 },
      { type: 'eposta', value: randomEmail1 },
      { type: 'eposta', value: randomEmail2 },
      { type: 'whatsapp', value: randomPhone1 },
      { type: 'whatsapp', value: randomPhone2 },
      { type: 'telegram', value: `@${randomInsta1}` },
      { type: 'telegram', value: `@${randomInsta2}` },
      { type: 'website', value: randomWebsite1 },
      { type: 'website', value: randomWebsite2 },
      { type: 'harita', value: randomHarita1 },
      { type: 'harita', value: randomHarita2 }
    ]);
    
    // Sosyal medya - her türden 2'şer tane (sadece sosyal medya platformları)
    setSocialMediaAccounts([
      { platform: 'instagram', url: randomInsta1, type: 'social' },
      { platform: 'instagram', url: randomInsta2, type: 'social' },
      { platform: 'facebook', url: randomFacebook1, type: 'social' },
      { platform: 'facebook', url: randomFacebook2, type: 'social' },
      { platform: 'twitter', url: randomTwitter1, type: 'social' },
      { platform: 'twitter', url: randomTwitter2, type: 'social' },
      { platform: 'youtube', url: randomYoutube1, type: 'social' },
      { platform: 'youtube', url: randomYoutube2, type: 'social' },
      { platform: 'linkedin', url: randomLinkedin1, type: 'social' },
      { platform: 'linkedin', url: randomLinkedin2, type: 'social' },
      { platform: 'tiktok', url: randomTiktok1, type: 'social' },
      { platform: 'tiktok', url: randomTiktok2, type: 'social' }
    ]);
    
    // Diğer bilgiler
    setFirmaHakkinda(`${randomCompanyName} olarak müşterilerimize en kaliteli hizmeti sunmak için çalışıyoruz. ${new Date().getFullYear()} yılından bu yana sektörde lider konumdayız.`);
    setFirmaHakkindaBaslik('Hakkımızda');
    setFirmaUnvan(`${randomCompanyName} A.Ş.`);
    setFirmaVergiNo(`${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`);
    setVergiDairesi('Merkez Vergi Dairesi');
    
    // Bankalar listesinden rastgele banka seçimi
    const getRandomBank = () => {
      const randomIndex = Math.floor(Math.random() * BANKALAR.length);
      return BANKALAR[randomIndex];
    };
    
    // İlk rastgele banka
    const randomBank1 = getRandomBank();
    // İkinci rastgele banka (ilkinden farklı olacak şekilde)
    let randomBank2;
    do {
      randomBank2 = getRandomBank();
    } while (randomBank2.id === randomBank1.id);
    
    // Banka hesapları - 2 banka hesabı, her hesapta 3 para birimi
    setBankAccounts([
      {
        bank_name: randomBank1.id,
        bank_label: randomBank1.label,
        bank_logo: randomBank1.logo,
        account_holder: randomCompanyName,
        accounts: [
          { iban: `TR${Math.floor(Math.random() * 100000000000000000000000).toString().padStart(24, '0')}`, currency: 'TRY' },
          { iban: `TR${Math.floor(Math.random() * 100000000000000000000000).toString().padStart(24, '0')}`, currency: 'USD' },
          { iban: `TR${Math.floor(Math.random() * 100000000000000000000000).toString().padStart(24, '0')}`, currency: 'EUR' }
        ]
      },
      {
        bank_name: randomBank2.id,
        bank_label: randomBank2.label,
        bank_logo: randomBank2.logo,
        account_holder: randomCompanyName,
        accounts: [
          { iban: `TR${Math.floor(Math.random() * 100000000000000000000000).toString().padStart(24, '0')}`, currency: 'TRY' },
          { iban: `TR${Math.floor(Math.random() * 100000000000000000000000).toString().padStart(24, '0')}`, currency: 'USD' },
          { iban: `TR${Math.floor(Math.random() * 100000000000000000000000).toString().padStart(24, '0')}`, currency: 'EUR' }
        ]
      }
    ]);
  };

  const handleProfilFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfilFoto(file);
      
      // Önizleme URL'si oluştur
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFirmaLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFirmaLogo(file);
      
      // Önizleme URL'si oluştur
      const reader = new FileReader();
      reader.onloadend = () => {
        setFirmaLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKatalogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setKatalogDosya(file);
    }
  };

  // Banka hesabı güncelleme fonksiyonu
  const handleBankAccountChange = (index: number, field: keyof Omit<BankAccount, 'accounts'>, value: string) => {
    const updatedAccounts = [...bankAccounts];
    updatedAccounts[index] = {
      ...updatedAccounts[index],
      [field]: value
    };
    
    // Eğer banka seçiliyorsa, ilgili banka bilgilerini de güncelle
    if (field === 'bank_name' && value) {
      const selectedBank = BANKALAR.find(bank => bank.id === value);
      if (selectedBank) {
        updatedAccounts[index].bank_label = selectedBank.label;
        updatedAccounts[index].bank_logo = selectedBank.logo;
      }
    }
    
    setBankAccounts(updatedAccounts);
  };

  // Alt hesap (IBAN ve para birimi) güncelleme fonksiyonu
  const handleSubAccountChange = (accountIndex: number, subAccountIndex: number, field: 'iban' | 'currency', value: string) => {
    const updatedAccounts = [...bankAccounts];
    updatedAccounts[accountIndex].accounts[subAccountIndex] = {
      ...updatedAccounts[accountIndex].accounts[subAccountIndex],
      [field]: value
    };
    setBankAccounts(updatedAccounts);
  };
  
  // Alt hesap ekleme fonksiyonu
  const handleAddSubAccount = (accountIndex: number) => {
    const updatedAccounts = [...bankAccounts];
    updatedAccounts[accountIndex].accounts.push({
      iban: '',
      currency: 'TL'
    });
    setBankAccounts(updatedAccounts);
  };
  
  // Alt hesap silme fonksiyonu
  const handleRemoveSubAccount = (accountIndex: number, subAccountIndex: number) => {
    if (bankAccounts[accountIndex].accounts.length > 1) {
      const updatedAccounts = [...bankAccounts];
      updatedAccounts[accountIndex].accounts.splice(subAccountIndex, 1);
      setBankAccounts(updatedAccounts);
    }
  };
  
  // Yeni banka hesabı ekleme fonksiyonu
  const handleAddBankAccount = () => {
    setBankAccounts([...bankAccounts, newBankAccount()]);
  };
  
  // Banka hesabı silme fonksiyonu
  const handleRemoveBankAccount = (index: number) => {
    if (bankAccounts.length > 1) {
      const updatedAccounts = [...bankAccounts];
      updatedAccounts.splice(index, 1);
      setBankAccounts(updatedAccounts);
    }
  };

  const handleFirmaBilgileriChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFirmaHakkinda(value);
  };

  // Sosyal medya hesabı güncelleme fonksiyonu
  const handleSocialMediaChange = (index: number, field: keyof SocialMediaAccount, value: string) => {
    const updatedAccounts = [...socialMediaAccounts];
    updatedAccounts[index] = {
      ...updatedAccounts[index],
      [field]: value
    };
    
    // Platform değiştiğinde, otomatik olarak type değerini güncelle
    if (field === 'platform') {
      if (['telefon', 'eposta', 'whatsapp'].includes(value)) {
        updatedAccounts[index].type = 'communication';
      } else if (['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok'].includes(value)) {
        updatedAccounts[index].type = 'social';
      } else if (['website', 'harita'].includes(value)) {
        updatedAccounts[index].type = 'other';
      } else {
        updatedAccounts[index].type = undefined;
      }
    }
    
    setSocialMediaAccounts(updatedAccounts);
  };
  
  // Yeni sosyal medya hesabı ekleme fonksiyonu
  const handleAddSocialMedia = () => {
    setSocialMediaAccounts([
      ...socialMediaAccounts,
      {
        platform: '',
        url: '',
        type: undefined
      }
    ]);
  };
  
  // Sosyal medya hesabı silme fonksiyonu
  const handleRemoveSocialMedia = (index: number) => {
    if (socialMediaAccounts.length > 1) {
      const updatedAccounts = [...socialMediaAccounts];
      updatedAccounts.splice(index, 1);
      setSocialMediaAccounts(updatedAccounts);
    }
  };

  // İletişim hesabı güncelleme fonksiyonu
  const handleCommunicationChange = (index: number, field: 'type' | 'value' | 'label', value: string) => {
    const newAccounts = [...communicationAccounts];
    newAccounts[index] = {
      ...newAccounts[index],
      [field]: value
    };
    setCommunicationAccounts(newAccounts);
  };
  
  // Yeni iletişim hesabı ekleme fonksiyonu
  const handleAddCommunication = () => {
    setCommunicationAccounts([
      ...communicationAccounts,
      {
        type: '',
        value: ''
      }
    ]);
  };
  
  // İletişim hesabı silme fonksiyonu
  const handleRemoveCommunication = (index: number) => {
    if (communicationAccounts.length > 1) {
      const updatedAccounts = [...communicationAccounts];
      updatedAccounts.splice(index, 1);
      setCommunicationAccounts(updatedAccounts);
    }
  };

  // Çoklu giriş alanları için yardımcı fonksiyonlar
  const handleAddInput = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };
  
  const handleRemoveInput = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter(prev => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      if (!firmaAdi || !slug) {
        throw new Error('Firma adı ve URL zorunludur');
      }
      
      // Geçerli banka hesaplarını filtrele
      const validBankAccounts = bankAccounts.filter(
        (account) => account.bank_name && account.account_holder && account.accounts.some(a => a.iban)
      );
      
      // Geçerli iletişim hesaplarını filtrele
      const validCommunicationAccounts = communicationAccounts.filter(
        (account) => account.type && account.value
      );

      // Form verilerini oluştur
      formData.append("firmaAdi", firmaAdi);
      formData.append("slug", slug);
      formData.append("firma_hakkinda", firmaHakkinda);
      formData.append("firma_hakkinda_baslik", firmaHakkindaBaslik);
      formData.append("firma_unvan", firmaUnvan);
      formData.append("firma_vergi_no", firmaVergiNo);
      formData.append("vergi_dairesi", vergiDairesi);
      formData.append("templateId", templateId.toString());

      // İletişim verilerini FormData'ya doğru formatta ekle
      console.log('İletişim hesapları gönderiliyor:', validCommunicationAccounts);
      validCommunicationAccounts.forEach((account, index) => {
        if (account.type && account.value) {
          formData.append(`${account.type}[${index}]`, account.value);
          if (account.label && account.label.trim() !== '') {
            formData.append(`${account.type}_label[${index}]`, account.label);
          }
        }
      });
      
      // Sosyal medya hesaplarını ekleyelim
      console.log('Sosyal medya hesapları:', socialMediaAccounts);
      
      socialMediaAccounts.forEach((account, index) => {
        if (account.platform && account.url) {
          // Platform bilgisini ekleyelim
          formData.append(`${account.platform}[${index}]`, account.url);
          
          // Özel başlık varsa ekleyelim
          if (account.label && account.label.trim() !== '') {
            formData.append(`${account.platform}_label[${index}]`, account.label);
          }
        }
      });

      // Banka hesapları
      if (validBankAccounts.length > 0) {
        formData.append("bankaHesaplari", JSON.stringify(validBankAccounts));
      }
      
      if (profilFoto) {
        console.log('Profil fotoğrafı ekleniyor:', profilFoto.name, profilFoto.size, profilFoto.type);
        formData.append('profilePhoto', profilFoto);
      }
      
      if (firmaLogo) {
        console.log('Firma logosu ekleniyor:', firmaLogo.name, firmaLogo.size, firmaLogo.type);
        formData.append('logoFile', firmaLogo);
      }
      
      if (katalogDosya) {
        // Önce Cloudinary'ye yükle
        const katalogUrl = await uploadPdfToCloudinary(katalogDosya);
        formData.append('katalog', katalogUrl);
      }
      
      if (yetkiliAdi) {
        formData.append('yetkili_adi', yetkiliAdi);
        formData.append('yetkiliAdi', yetkiliAdi);
        console.log('Yetkili adı ekleniyor:', yetkiliAdi);
      }
      
      if (yetkiliPozisyon) {
        formData.append('yetkili_pozisyon', yetkiliPozisyon);
        formData.append('yetkiliPozisyon', yetkiliPozisyon);
        console.log('Yetkili pozisyonu ekleniyor:', yetkiliPozisyon);
      }
      
      // Form verilerinin içeriğini kontrol amaçlı konsola yazdır
      console.log('Form anahtarları:', Array.from(formData.keys()));
      formData.forEach((value, key) => {
        if (key.includes('yetkili') || key.includes('Yetkili')) {
          console.log(`Form verisi: ${key} = ${value}`);
        }
      });
      
      console.log('Form verileri:', Object.fromEntries(formData.entries()));
      
      // API isteği gönder
      console.log('API isteği gönderiliyor...');
      
      // Fetch işlemi
      try {
        const res = await fetch('/api/firmalar', {
          method: 'POST',
          body: formData
        });
        
        console.log('API yanıt durumu:', res.status, res.statusText);
        
        const text = await res.text();
        console.log('API yanıt içeriği:', text);
        
        let responseData;
        try {
          responseData = JSON.parse(text);
          console.log('İşlenmiş yanıt:', responseData);
        } catch (e) {
          console.error('JSON parse hatası:', e);
          throw new Error('API yanıtı JSON formatında değil: ' + text);
        }
        
        if (!res.ok) {
          throw new Error(responseData.message || `API hata kodu: ${res.status} - ${responseData.error || 'Bilinmeyen hata'}`);
        }
        
        // Başarılı yanıt
        console.log('Firma başarıyla eklendi:', responseData);
        setSuccess('Firma başarıyla eklendi');
        
        // Formu sıfırla
        setFirmaAdi('');
        setSlug('');
        setTelefon('');
        setEposta('');
        setWhatsapp('');
        setInstagram(['']);
        setYoutube(['']);
        setLinkedin(['']);
        setTwitter(['']);
        setFacebook(['']);
        setWebsite(['']);
        setHarita(['']);
        setTiktoks(['']);
        setYetkiliAdi('');
        setYetkiliPozisyon('');
        setFirmaHakkinda('');
        setFirmaHakkindaBaslik('Hakkımızda');
        setFirmaUnvan('');
        setFirmaVergiNo('');
        setVergiDairesi('');
        setBankAccounts([newBankAccount()]);
        setProfilFoto(null);
        setProfilFotoPreview('');
        setKatalogDosya(null);
        
        // Kısa bir bekleme sonrası firmalar sayfasına yönlendir
        setTimeout(() => {
          router.push('/admin/firmalar');
        }, 2000);
      } catch (fetchError: any) {
        console.error('Fetch hatası:', fetchError);
        throw new Error(`API isteği başarısız: ${fetchError.message}`);
      }
      
    } catch (err: any) {
      console.error('Firma eklenirken hata oluştu:', err);
      setError(err.message || 'Firma eklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/İ/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u')
      .replace(/â/g, 'a')
      .replace(/ê/g, 'e')
      .replace(/î/g, 'i')
      .replace(/ô/g, 'o')
      .replace(/û/g, 'u')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleFirmaAdiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirmaAdi(value);
    setSlug(slugify(value));
  };

  // İletişim hesapları işlevleri
  const addEmptyCommunicationAccount = () => {
    setCommunicationAccounts([...communicationAccounts, { type: "", value: "" }]);
  };

  const handleCommunicationAccountTypeChange = (index: number, newType: string) => {
    const updatedAccounts = [...communicationAccounts];
    updatedAccounts[index].type = newType;
    setCommunicationAccounts(updatedAccounts);
  };

  const handleCommunicationAccountValueChange = (index: number, newValue: string) => {
    const updatedAccounts = [...communicationAccounts];
    updatedAccounts[index].value = newValue;
    setCommunicationAccounts(updatedAccounts);
  };

  const removeCommunicationAccount = (index: number) => {
    const updatedAccounts = communicationAccounts.filter((_, i) => i !== index);
    setCommunicationAccounts(updatedAccounts);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Yönetim Paneli</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            Genel Bakış
          </Link>
          
          <Link
            href="/admin/firmalar"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Firmalar
          </Link>
          
          <Link
            href="/admin/firmalar/yeni"
            className="flex items-center px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Yeni Firma Ekle
          </Link>

          <Link
            href="/admin/temalar"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            Temalar
          </Link>

          <Link
            href="/admin/ayarlar"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Sıralama
          </Link>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">© 2025 Sanal Kartvizit</span>
            <Link 
              href="/login"
              className="text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Çıkış
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Yeni Firma Ekle</h1>
                <p className="text-sm text-gray-600 mt-1">Yeni bir firma kartviziti oluşturun</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  href="/admin/firmalar" 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Geri Dön
                </Link>
                <button
                  type="button"
                  onClick={autoFillForm}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Otomatik Doldur
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content with Preview */}
        <main className="p-8">
          <div className="flex gap-8">
            {/* Form Section */}
            <div className="flex-1 max-w-4xl">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (selectedTab === 4) {
                    handleSubmit(e);
                  }
                }} 
                className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 space-y-6"
              >
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg p-4">
                    {success}
                  </div>
                )}

                <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                  <Tab.List className="flex p-1 space-x-1 rounded-xl bg-gray-100">
                    <Tab
                      className={({ selected }) =>
                        `w-full py-3 text-sm font-medium rounded-lg leading-5 transition-all
                        ${selected 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-white hover:text-blue-600'}`
                      }
                    >
                      Firma Bilgileri
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full py-3 text-sm font-medium rounded-lg leading-5 transition-all
                        ${selected 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-white hover:text-blue-600'}`
                      }
                    >
                      Kurumsal
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full py-3 text-sm font-medium rounded-lg leading-5 transition-all
                        ${selected 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-white hover:text-blue-600'}`
                      }
                    >
                      Sosyal Medya
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full py-3 text-sm font-medium rounded-lg leading-5 transition-all
                        ${selected 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-white hover:text-blue-600'}`
                      }
                    >
                      İletişim
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full py-3 text-sm font-medium rounded-lg leading-5 transition-all
                        ${selected 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-white hover:text-blue-600'}`
                      }
                    >
                      Banka
                    </Tab>
                  </Tab.List>
                  
                  <Tab.Panels className="mt-6">
                    {/* Tab 1: Firma Bilgileri */}
                    <Tab.Panel className="space-y-6 rounded-xl p-4 bg-gray-50">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="firmaAdi" className="block text-sm font-medium text-gray-700 mb-2">
                            Firma Adı *
                          </label>
                          <input
                            type="text"
                            id="firmaAdi"
                            required
                            value={firmaAdi}
                            onChange={handleFirmaAdiChange}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                            placeholder="Örn: Teknoloji A.Ş."
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                            URL (Slug) *
                          </label>
                          <input
                            type="text"
                            id="slug"
                            required
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                            placeholder="teknoloji-as"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="yetkiliAdi" className="block text-sm font-medium text-gray-700 mb-2">
                            Yetkili Adı Soyadı
                          </label>
                          <input
                            type="text"
                            id="yetkiliAdi"
                            value={yetkiliAdi}
                            onChange={(e) => setYetkiliAdi(e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                            placeholder="Furkan Yiğit"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="yetkiliPozisyon" className="block text-sm font-medium text-gray-700 mb-2">
                            Pozisyon
                          </label>
                          <input
                            type="text"
                            id="yetkiliPozisyon"
                            value={yetkiliPozisyon}
                            onChange={(e) => setYetkiliPozisyon(e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                            placeholder="Genel Müdür"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="profilFoto" className="block text-sm font-medium text-gray-700 mb-2">
                            Profil Fotoğrafı
                          </label>
                          <div className="mt-1 flex items-center space-x-4">
                            {profilFotoPreview ? (
                              <div className="relative">
                                <img 
                                  src={profilFotoPreview} 
                                  alt="Profil önizleme" 
                                  className="h-20 w-20 object-cover rounded-full border-2 border-gray-300"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setProfilFoto(null);
                                    setProfilFotoPreview("");
                                  }}
                                  className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 focus:outline-none"
                                >
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                                <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                                </svg>
                              </div>
                            )}
                            <input
                              type="file"
                              id="profilFoto"
                              accept="image/*"
                              onChange={handleProfilFotoChange}
                              className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="firmaLogo" className="block text-sm font-medium text-gray-700 mb-2">
                            Firma Logosu
                          </label>
                          <div className="mt-1 flex items-center space-x-4">
                            {firmaLogoPreview ? (
                              <div className="relative">
                                <img 
                                  src={firmaLogoPreview} 
                                  alt="Logo önizleme" 
                                  className="h-20 w-20 object-contain border-2 border-gray-300 rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFirmaLogo(null);
                                    setFirmaLogoPreview("");
                                  }}
                                  className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 focus:outline-none"
                                >
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <div className="h-20 w-20 bg-gray-200 flex items-center justify-center border-2 border-gray-300 rounded-lg">
                                <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7V8h-2v4H8l4 4 4-4h-2z"/>
                                </svg>
                              </div>
                            )}
                            <input
                              type="file"
                              id="firmaLogo"
                              accept="image/*"
                              onChange={handleFirmaLogoChange}
                              className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="templateId" className="block text-sm font-medium text-gray-700 mb-2">
                          Kartvizit Tasarımı
                        </label>
                        <select
                          id="templateId"
                          value={templateId}
                          onChange={(e) => setTemplateId(Number(e.target.value))}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                        >
                          {TEMPLATES.map((template) => (
                            <option key={template.id} value={template.id}>
                              {template.name} - {template.description}
                            </option>
                          ))}
                        </select>
                        <p className="mt-2 text-sm text-gray-500">
                          Kartvizitinizin görünümünü belirleyen tasarım şablonunu seçin.
                        </p>
                      </div>
                    </Tab.Panel>

                    {/* Tab 2: Kurumsal Bilgiler */}
                    <Tab.Panel className="space-y-6 rounded-xl p-4 bg-gray-50">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                          <label htmlFor="firmaUnvan" className="block text-sm font-medium text-gray-700 mb-2">
                            Firma Ünvanı
                          </label>
                          <input
                            type="text"
                            id="firmaUnvan"
                            value={firmaUnvan}
                            onChange={(e) => setFirmaUnvan(e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                            placeholder="Teknoloji A.Ş."
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="firmaVergiNo" className="block text-sm font-medium text-gray-700 mb-2">
                            Vergi Numarası
                          </label>
                          <input
                            type="text"
                            id="firmaVergiNo"
                            value={firmaVergiNo}
                            onChange={(e) => setFirmaVergiNo(e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                            placeholder="1234567890"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="vergiDairesi" className="block text-sm font-medium text-gray-700 mb-2">
                            Vergi Dairesi
                          </label>
                          <input
                            type="text"
                            id="vergiDairesi"
                            value={vergiDairesi}
                            onChange={(e) => setVergiDairesi(e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                            placeholder="Merkez Vergi Dairesi"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="firma_hakkinda_baslik" className="block text-sm font-medium text-gray-700 mb-2">
                          "Hakkımızda" Başlığı
                        </label>
                        <input
                          type="text"
                          id="firma_hakkinda_baslik"
                          value={firmaHakkindaBaslik}
                          onChange={(e) => setFirmaHakkindaBaslik(e.target.value)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                          placeholder="Hakkımızda"
                          maxLength={50}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="firma_hakkinda" className="block text-sm font-medium text-gray-700 mb-2">
                          Hakkımızda
                        </label>
                        <textarea
                          id="firma_hakkinda"
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                          value={firmaHakkinda}
                          onChange={(e) => setFirmaHakkinda(e.target.value)}
                          rows={5}
                          placeholder="Firma hakkında bilgi giriniz..."
                        />
                      </div>

                      <div>
                        <label htmlFor="katalogDosya" className="block text-sm font-medium text-gray-700 mb-2">
                          Katalog PDF Dosyası
                        </label>
                        <input
                          type="file"
                          id="katalogDosya"
                          accept=".pdf"
                          onChange={handleKatalogChange}
                          className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          PDF formatında katalog dosyası yükleyebilirsiniz.
                        </p>
                      </div>
                    </Tab.Panel>
                    
                    {/* Tab 3: Sosyal Medya */}
                    <Tab.Panel className="space-y-6 rounded-xl p-4 bg-gray-50">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Sosyal Medya Hesapları</h3>
                      
                      {socialMediaAccounts.map((account, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-md font-medium text-gray-800">Hesap #{index + 1}</h4>
                            {socialMediaAccounts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSocialMedia(index)}
                                className="text-red-600 hover:text-red-800 p-1"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                              <select
                                value={account.platform}
                                onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                              >
                                <option value="">Platform Seçiniz</option>
                                <option value="instagram">Instagram</option>
                                <option value="facebook">Facebook</option>
                                <option value="twitter">Twitter</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="youtube">YouTube</option>
                                <option value="tiktok">TikTok</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">URL veya Kullanıcı Adı</label>
                              <input
                                type="text"
                                value={account.url}
                                onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                                placeholder={
                                  account.platform === 'instagram' ? '@kullaniciadi' : 
                                  account.platform === 'facebook' ? 'facebook.com/sayfaadi' :
                                  account.platform === 'twitter' ? '@kullaniciadi' :
                                  account.platform === 'linkedin' ? 'linkedin.com/in/profiladi' :
                                  account.platform === 'youtube' ? 'youtube.com/@kullaniciadi' :
                                  account.platform === 'tiktok' ? '@kullaniciadi' :
                                  'URL veya kullanıcı adı'
                                }
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Özel Başlık (Opsiyonel)</label>
                              <input
                                type="text"
                                value={account.label || ''}
                                onChange={(e) => handleSocialMediaChange(index, 'label', e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                                placeholder="Örn: Kişisel Instagram"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={handleAddSocialMedia}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Yeni Hesap Ekle
                        </button>
                      </div>
                    </Tab.Panel>
                    
                    {/* Tab 4: İletişim */}
                    <Tab.Panel className="space-y-6 rounded-xl p-4 bg-gray-50">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">İletişim Bilgileri</h3>
                      
                      {communicationAccounts.map((account, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-md font-medium text-gray-800">İletişim #{index + 1}</h4>
                            {communicationAccounts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveCommunication(index)}
                                className="text-red-600 hover:text-red-800 p-1"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">İletişim Türü</label>
                              <select
                                value={account.type}
                                onChange={(e) => handleCommunicationChange(index, 'type', e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                              >
                                <option value="">Tür Seçiniz</option>
                                <option value="telefon">Telefon</option>
                                <option value="eposta">E-posta</option>
                                <option value="whatsapp">WhatsApp</option>
                                <option value="telegram">Telegram</option>
                                <option value="harita">Harita</option>
                                <option value="website">Website</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Değer</label>
                              <input
                                type="text"
                                value={account.value}
                                onChange={(e) => handleCommunicationChange(index, 'value', e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                                placeholder={
                                  account.type === 'telefon' ? '0555 555 55 55' :
                                  account.type === 'eposta' ? 'ornek@email.com' :
                                  account.type === 'whatsapp' ? '0555 555 55 55' :
                                  account.type === 'telegram' ? '@kullaniciadi' :
                                  account.type === 'harita' ? 'Google Maps linki' :
                                  account.type === 'website' ? 'https://www.example.com' :
                                  'İletişim bilgisi'
                                }
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Özel Başlık (Opsiyonel)</label>
                              <input
                                type="text"
                                value={account.label || ''}
                                onChange={(e) => handleCommunicationChange(index, 'label', e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                                placeholder="Örn: İş Telefonu"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={handleAddCommunication}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Yeni İletişim Ekle
                        </button>
                      </div>
                    </Tab.Panel>
                    
                    {/* Tab 5: Banka Hesapları */}
                    <Tab.Panel className="space-y-6 rounded-xl p-4 bg-gray-50">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Banka Hesap Bilgileri</h3>
                      
                      {bankAccounts.map((account, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-md font-medium text-gray-800">Hesap #{index + 1}</h4>
                            {bankAccounts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveBankAccount(index)}
                                className="text-red-600 hover:text-red-800 p-1"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Banka</label>
                              <select
                                value={account.bank_name}
                                onChange={(e) => handleBankAccountChange(index, 'bank_name', e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                              >
                                <option value="">Banka Seçiniz</option>
                                {BANKALAR.map((banka) => (
                                  <option key={banka.id} value={banka.id}>
                                    {banka.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Hesap Sahibi</label>
                              <input
                                type="text"
                                value={account.account_holder}
                                onChange={(e) => handleBankAccountChange(index, 'account_holder', e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                                placeholder="Ahmet Yılmaz"
                              />
                            </div>
                            
                            {/* Alt hesaplar (IBAN ve para birimi) */}
                            {account.accounts.map((subAccount, subIndex) => (
                              <div key={`${index}-${subIndex}`} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                  <h5 className="text-sm font-medium text-gray-800">
                                    {subIndex === 0 ? "Ana IBAN" : `Ek IBAN #${subIndex}`}
                                  </h5>
                                  {account.accounts.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveSubAccount(index, subIndex)}
                                      className="text-red-600 hover:text-red-800 p-1"
                                    >
                                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                  <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
                                    <input
                                      type="text"
                                      value={subAccount.iban}
                                      onChange={(e) => handleSubAccountChange(index, subIndex, 'iban', e.target.value)}
                                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Para Birimi</label>
                                    <select
                                      value={subAccount.currency}
                                      onChange={(e) => handleSubAccountChange(index, subIndex, 'currency', e.target.value)}
                                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    >
                                      <option value="TL">TL</option>
                                      <option value="USD">USD ($)</option>
                                      <option value="EUR">EUR (€)</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {/* Alt hesap ekleme butonu */}
                            <div>
                              <button
                                type="button"
                                onClick={() => handleAddSubAccount(index)}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                              >
                                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Yeni IBAN Ekle
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={handleAddBankAccount}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Yeni Banka Hesabı Ekle
                        </button>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-between">
                    <div className="flex space-x-3">
                      <Link
                        href="/admin/firmalar"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        İptal
                      </Link>
                      
                      {selectedTab > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedTab(selectedTab - 1)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Geri
                        </button>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      {selectedTab === 4 ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (!firmaAdi) {
                              setError('Firma adı alanı zorunludur');
                              setSelectedTab(0);
                              return;
                            }
                            if (!slug) {
                              setError('URL (slug) alanı zorunludur');
                              setSelectedTab(0);
                              return;
                            }
                            handleSubmit(e as React.FormEvent);
                          }}
                          disabled={loading}
                          className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Kaydediliyor...
                            </>
                          ) : (
                            <>
                              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Kaydet
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (selectedTab === 0 && !firmaAdi) {
                              setError('Firma adı alanı zorunludur');
                              return;
                            }
                            if (selectedTab === 0 && !slug) {
                              setError('URL (slug) alanı zorunludur');
                              return;
                            }
                            setSelectedTab(selectedTab + 1);
                            setError(null);
                          }}
                          className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          İleri
                          <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Preview Section */}
            <div className="w-80 flex-shrink-0">
              <PhonePreview
                firmaAdi={firmaAdi}
                yetkiliAdi={yetkiliAdi}
                yetkiliPozisyon={yetkiliPozisyon}
                profilFotoPreview={profilFotoPreview}
                firmaLogoPreview={firmaLogoPreview}
                communicationAccounts={communicationAccounts}
                socialMediaAccounts={socialMediaAccounts}
                firmaHakkinda={firmaHakkinda}
                firmaHakkindaBaslik={firmaHakkindaBaslik}
                templateId={templateId}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
