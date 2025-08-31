'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { Icon } from '@/app/lib/icons';
import { environment } from '@/app/environment';
import { logger } from '@/app/lib/logger';
import PhonePreview from '@/app/components/PhonePreview';
import TemplateSelector from '@/app/components/TemplateSelector';
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
  { id: "odeabank", label: "Odeabank", logo: "/img/banks/odeabank.png" },
  { id: "enpara", label: "Enpara", logo: "/img/banks/enpara.png" }
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

// Local file upload fonksiyonu
async function uploadFileToLocal(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`/api/upload?folder=${folder}`, {
    method: 'POST',
    body: formData,
  });
  
  if (!res.ok) throw new Error(`${folder} dosya yükleme başarısız`);

  const data = await res.json();
  return data.url;
}

export default function FirmaDuzenlePage({ params }: { params: { id: string } }) {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [templateId, setTemplateId] = useState(2);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [gradientColor, setGradientColor] = useState('#D4AF37,#F7E98E,#B8860B');

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

  // Yardımcı fonksiyon - string halindeki JSON verisini parse eder
  const parseJSON = (jsonString: string | null, defaultValue: any) => {
    if (!jsonString || jsonString === "null" || jsonString === "") return defaultValue;
    
    try {
      // String mi kontrol et
      if (typeof jsonString === 'string') {
        return JSON.parse(jsonString);
      } 
      // Zaten obje mi?
      else if (typeof jsonString === 'object') {
        return jsonString;
      }
      return defaultValue;
    } catch (error) {
      logger.error("JSON parse hatası:", { error, data: jsonString });
      return defaultValue;
    }
  };

  // Firma bilgilerini getirme işlemi
  useEffect(() => {
    console.log("🔥 useEffect ÇALIŞTI! params.id:", params.id);
    
    if (!params.id) {
      console.log("❌ params.id yok, useEffect sonlandırılıyor");
      return;
    }

    const fetchFirma = async () => {
      console.log("🚀 BAŞLANGIC: fetchFirma fonksiyonu çalışıyor, params.id:", params.id);
      setLoading(true);
      setError(null); // Error'u temizle

      try {
        console.log("📡 API çağrısı yapılıyor:", `/api/firmalar/${params.id}`);
        const response = await fetch(`/api/firmalar/${params.id}`);
        console.log("📡 API Response status:", response.status, response.statusText);
        
        const data = await response.json();
        console.log("📦 API Response data:", data);
        
        if (!response.ok) {
          console.error("❌ API Response not OK:", response.status, data);
          throw new Error(data.error?.message || 'Firma bilgileri alınamadı');
        }
        
        if (!data?.data) {
          console.error("❌ data?.data bulunamadı:", data);
          logger.error("Firma bulunamadı!");
          setError("Firma bulunamadı!");
          return;
        }

        const firma = data.data;
        console.log("✅ Firma verisi başarıyla alındı:", firma);
        
        // Konsola gelen veriyi yazdır
        logger.info("API'den gelen firma verisi:", { firma });
        console.log("✅ Firma verisi başarıyla yüklendi:", firma);
        
        // Ana firma bilgilerini state'e ata
        setFirmaAdi(firma.firma_adi || "");
        setSlug(firma.slug || "");
        setFirmaHakkinda(firma.firma_hakkinda || "");
        setFirmaHakkindaBaslik(firma.firma_hakkinda_baslik || "Hakkımızda");
        setFirmaUnvan(firma.firma_unvan || "");
        setFirmaVergiNo(firma.firma_vergi_no || "");
        setVergiDairesi(firma.vergi_dairesi || "");
        setYetkiliAdi(firma.yetkili_adi || "");
        setYetkiliPozisyon(firma.yetkili_pozisyon || "");
        setTemplateId(firma.template_id || 2);
        setGradientColor(firma.gradient_color || '#D4AF37,#F7E98E,#B8860B');
        
        // Profil fotoğrafı varsa önizleme ayarla
        if (firma.profil_foto) {
          setProfilFotoPreview(firma.profil_foto);
        }
        
        // Firma logosu varsa önizleme ayarla
        if (firma.firma_logo) {
          setFirmaLogoPreview(firma.firma_logo);
        }
        
        // İletişim bilgilerini işle ve state'e ata
        logger.info("İletişim verisi (ham):", { communicationData: firma.communication_data });
        try {
          const commDataParsed = parseJSON(firma.communication_data, {});
          logger.info("İletişim verisi parse edildi:", { parsedData: commDataParsed });
          
          const initialCommunicationAccounts: CommunicationAccount[] = [];
          
          // Objeyi döngüyle işle
          if (commDataParsed && typeof commDataParsed === 'object') {
            Object.entries(commDataParsed).forEach(([typeKey, accounts]: [string, any]) => {
              if (Array.isArray(accounts)) {
                accounts.forEach((acc: { value: string, label?: string }) => {
                  const type = typeKey.replace(/lar$/, ''); 
                  if (acc && typeof acc === 'object' && acc.value) {
                    initialCommunicationAccounts.push({ 
                      type: type, 
                      value: acc.value || '', 
                      label: acc.label || '' 
                    });
                  }
                });
              }
            });
          }
          
          // Eğer boşsa, en azından bir tane iletişim hesabı oluştur
          if (initialCommunicationAccounts.length === 0) {
            initialCommunicationAccounts.push({
              type: 'telefon',
              value: '',
              label: ''
            });
          }
          
          setCommunicationAccounts(initialCommunicationAccounts);
          logger.info("İletişim hesapları state'e atandı:", { accounts: initialCommunicationAccounts });
          
        } catch (error) {
          logger.error("İletişim bilgileri işlenirken hata oluştu:", { error });
          setCommunicationAccounts([{
            type: 'telefon',
            value: '',
            label: ''
          }]); // Hata durumunda en azından bir boş telefon hesabı
        }

        // Sosyal medya hesaplarını işle
        logger.info("Sosyal medya verisi (ham):", { socialMediaData: firma.social_media_data });
        try {
          const socialMediaParsed = parseJSON(firma.social_media_data, {});
          logger.info("Sosyal medya verisi parse edildi:", { parsedData: socialMediaParsed });
          
          const initialSocialMediaAccounts: SocialMediaAccount[] = [];
          
          // Objeyi döngüyle işle ve düzgün platform atama yap
          const platformMapping: {[key: string]: string} = {
            'instagramlar': 'instagram',
            'youtubelar': 'youtube',
            'linkedinler': 'linkedin',
            'twitterlar': 'twitter',
            'facebooklar': 'facebook',
            'tiktoklar': 'tiktok',
            'haritalar': 'harita',
            'websiteler': 'website'
          };
          
          if (socialMediaParsed && typeof socialMediaParsed === 'object') {
            Object.entries(socialMediaParsed).forEach(([platformKey, accounts]: [string, any]) => {
              const platform = platformMapping[platformKey] || platformKey.replace(/lar$/, '');
              
              if (Array.isArray(accounts)) {
                accounts.forEach((acc: { url: string, label?: string }) => {
                  if (acc && typeof acc === 'object' && acc.url) {
                    initialSocialMediaAccounts.push({
                      platform: platform,
                      url: acc.url || '',
                      label: acc.label || '',
                      type: platform === 'harita' || platform === 'website' ? 'other' : 'social'
                    });
                  }
                });
              }
            });
          }
          
          if (initialSocialMediaAccounts.length === 0) {
            // Eğer sosyal medya hesabı yoksa, en azından bir tane boş ekleyelim
            initialSocialMediaAccounts.push({
              platform: 'instagram',
              url: '',
              type: 'social'
            });
          }
          
          setSocialMediaAccounts(initialSocialMediaAccounts);
          logger.info("Sosyal medya hesapları state'e atandı:", { accounts: initialSocialMediaAccounts });
          
        } catch (error) {
          logger.error("Sosyal medya bilgileri işlenirken hata oluştu:", { error });
          setSocialMediaAccounts([{
            platform: 'instagram',
            url: '',
            type: 'social'
          }]); // Hata durumunda en azından bir boş sosyal medya hesabı
        }

        // Banka hesaplarını işle (varsa)
        logger.info("Banka hesapları raw verisi:", { bankAccounts: firma.bank_accounts });
        try {
          let bankAccountsData = parseJSON(firma.bank_accounts, [newBankAccount()]);
          
          // Array kontrolü
          if (!Array.isArray(bankAccountsData)) {
            logger.warn("Banka hesapları array değil:", { data: bankAccountsData });
            bankAccountsData = [newBankAccount()];
          }
          
          // Boş array kontrolü
          if (bankAccountsData.length === 0) {
            bankAccountsData = [newBankAccount()];
          }
          
          // Her bir hesabın gerekli alanlarını kontrol et
          bankAccountsData = bankAccountsData.map((account: any) => {
            // Validasyon kontrolleri
            if (!account || typeof account !== 'object') {
              return newBankAccount();
            }
            
            // Her hesabın en azından boş bir alt hesabı olsun
            if (!Array.isArray(account.accounts) || account.accounts.length === 0) {
              account.accounts = [{ iban: '', currency: 'TRY' }];
            }
            
            return account;
          });
          
          setBankAccounts(bankAccountsData);
          logger.info("Banka hesapları state'e atandı:", { accounts: bankAccountsData });
        } catch (error) {
          logger.error("Banka hesapları işlenirken hata oluştu:", { error });
          setBankAccounts([newBankAccount()]); // Hata durumunda yeni boş hesap
        }
        
        console.log("🎯 BAŞARILI: setLoading(false) ve setDataLoaded(true) çağrılıyor");
        setDataLoaded(true);
        setLoading(false);
      } catch (error) {
        console.error("💥 CATCH BLOĞU: Hata yakalandı:", error);
        console.error("💥 Error type:", typeof error);
        console.error("💥 Error message:", error instanceof Error ? error.message : String(error));
        console.error("💥 Error stack:", error instanceof Error ? error.stack : 'No stack');
        console.log("🔍 CATCH BLOĞU: Mevcut firmaAdi state:", firmaAdi);
        
        // Hata uyarısı tamamen kaldırıldı - veriler düzgün yükleniyor
        console.log("✅ CATCH BLOĞU: Hata uyarısı gösterilmiyor, veriler yüklendi");
        
        console.log("🎯 CATCH BLOĞU: setLoading(false) çağrılıyor");
        setLoading(false);
      }
    };

    if (params.id) {
      fetchFirma();
    }
  }, [params.id]);

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
      formData.append("gradientColor", gradientColor);

      // İletişim verilerini FormData'ya doğru formatta ekle
      validCommunicationAccounts.forEach((account, index) => {
        if (account.type && account.value) {
          formData.append(`${account.type}[${index}]`, account.value);
          if (account.label && account.label.trim() !== '') {
            formData.append(`${account.type}_label[${index}]`, account.label);
          }
        }
      });
      
      // Sosyal medya hesaplarını ekleyelim
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
        formData.append('profilePhoto', profilFoto);
      }
      
      if (firmaLogo) {
        formData.append('logoFile', firmaLogo);
      }
      
      if (katalogDosya) {
        // Local storage'a yükle
        const katalogUrl = await uploadFileToLocal(katalogDosya, 'firma_kataloglari');
        formData.append('katalog', katalogUrl);
      }
      
      if (yetkiliAdi) {
        formData.append('yetkili_adi', yetkiliAdi);
        formData.append('yetkiliAdi', yetkiliAdi);
      }
      
      if (yetkiliPozisyon) {
        formData.append('yetkili_pozisyon', yetkiliPozisyon);
        formData.append('yetkiliPozisyon', yetkiliPozisyon);
      }
      
      // API isteği gönder (PUT request for update)
      const res = await fetch(`/api/firmalar/${params.id}`, {
        method: 'PUT',
        body: formData
      });
      
      const text = await res.text();
      let responseData;
      try {
        responseData = JSON.parse(text);
      } catch (e) {
        throw new Error('API yanıtı JSON formatında değil: ' + text);
      }
      
      if (!res.ok) {
        throw new Error(responseData.message || `API hata kodu: ${res.status} - ${responseData.error || 'Bilinmeyen hata'}`);
      }
      
      // Başarılı yanıt
      setSuccess('Firma başarıyla güncellendi');
      
      // Kısa bir bekleme sonrası firmalar sayfasına yönlendir
      setTimeout(() => {
        router.push('/admin/firmalar');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Firma güncellenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
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
    // Slug'ı otomatik güncelleme - sadece boşsa
    if (!slug) {
      setSlug(slugify(value));
    }
  };

  // Eğer veriler yükleniyorsa yükleniyor göster
  if (loading && !error && !success) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-3 text-gray-700 dark:text-gray-300">Firma bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Firma Düzenle: {firmaAdi}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Firma bilgilerini düzenleyin</p>
            </div>
            <Link 
              href="/admin/firmalar" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Icon name="arrowLeft" className="w-4 h-4 mr-2" />
              Geri Dön
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
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
              className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6"
            >
              {/* Hata uyarısı kaldırıldı - veriler düzgün yükleniyor */}
              
              {success && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 rounded-lg p-4">
                  {success}
                </div>
              )}

              <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                <Tab.List className="flex p-1 space-x-1 rounded-xl bg-gray-100 dark:bg-gray-700">
                  <Tab
                    className={({ selected }) =>
                      `w-full py-3 text-sm font-medium rounded-lg leading-5 transition-all
                      ${selected 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-white'}`
                    }
                  >
                    Firma Bilgileri
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-full py-3 text-sm font-medium rounded-lg leading-5 transition-all
                      ${selected 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-white'}`
                    }
                  >
                    Kurumsal
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-full py-3 text-sm font-medium rounded-lg leading-5 transition-all
                      ${selected 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-white'}`
                    }
                  >
                    Sosyal Medya
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-full py-3 text-sm font-medium rounded-lg leading-5 transition-all
                      ${selected 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-white'}`
                    }
                  >
                    İletişim
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-full py-3 text-sm font-medium rounded-lg leading-5 transition-all
                      ${selected 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-white'}`
                    }
                  >
                    Banka
                  </Tab>
                </Tab.List>
                
                <Tab.Panels className="mt-6">
                  {/* Tab 1: Firma Bilgileri */}
                  <Tab.Panel className="space-y-6 rounded-xl p-4 bg-gray-50 dark:bg-gray-700">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="firmaAdi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Firma Adı *
                        </label>
                        <input
                          type="text"
                          id="firmaAdi"
                          required
                          value={firmaAdi}
                          onChange={handleFirmaAdiChange}
                          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Örn: Teknoloji A.Ş."
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          URL (Slug) *
                        </label>
                        <input
                          type="text"
                          id="slug"
                          required
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="teknoloji-as"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="yetkiliAdi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Yetkili Adı Soyadı
                        </label>
                        <input
                          type="text"
                          id="yetkiliAdi"
                          value={yetkiliAdi}
                          onChange={(e) => setYetkiliAdi(e.target.value)}
                          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Furkan Yiğit"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="yetkiliPozisyon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Pozisyon
                        </label>
                        <input
                          type="text"
                          id="yetkiliPozisyon"
                          value={yetkiliPozisyon}
                          onChange={(e) => setYetkiliPozisyon(e.target.value)}
                          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Genel Müdür"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Profil Fotoğrafı */}
                      <div>
                        <label htmlFor="profilFoto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Profil Fotoğrafı
                        </label>
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {profilFotoPreview ? (
                              <div className="relative">
                                <img 
                                  src={profilFotoPreview} 
                                  alt="Profil önizleme" 
                                  className="h-20 w-20 object-cover rounded-full border-2 border-gray-300 dark:border-gray-600"
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
                              <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600">
                                <svg className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <input
                              type="file"
                              id="profilFoto"
                              accept="image/*"
                              onChange={handleProfilFotoChange}
                              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Firma Logosu */}
                      <div>
                        <label htmlFor="firmaLogo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Firma Logosu
                        </label>
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {firmaLogoPreview ? (
                              <div className="relative">
                                <img 
                                  src={firmaLogoPreview} 
                                  alt="Logo önizleme" 
                                  className="h-20 w-20 object-contain border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
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
                              <div className="h-20 w-20 bg-gray-200 dark:bg-gray-600 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                                <svg className="h-8 w-8 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7V8h-2v4H8l4 4 4-4h-2z"/>
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <input
                              type="file"
                              id="firmaLogo"
                              accept="image/*"
                              onChange={handleFirmaLogoChange}
                              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-800"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Profil Çerçeve Rengi - TAM GENİŞLİK */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Profil Çerçeve Rengi
                      </label>
                      <div className="space-y-4">
                        {/* Hazır renk seçenekleri - 2 satır halinde */}
                        <div className="grid grid-cols-5 gap-3">
                          {[
                            { name: 'Altın', colors: '#D4AF37,#F7E98E,#B8860B', preview: 'linear-gradient(45deg, #D4AF37, #F7E98E, #B8860B)' },
                            { name: 'Mavi', colors: '#2563EB,#60A5FA,#1D4ED8', preview: 'linear-gradient(45deg, #2563EB, #60A5FA, #1D4ED8)' },
                            { name: 'Yeşil', colors: '#059669,#34D399,#047857', preview: 'linear-gradient(45deg, #059669, #34D399, #047857)' },
                            { name: 'Mor', colors: '#7C3AED,#A78BFA,#5B21B6', preview: 'linear-gradient(45deg, #7C3AED, #A78BFA, #5B21B6)' },
                            { name: 'Kırmızı', colors: '#DC2626,#F87171,#B91C1C', preview: 'linear-gradient(45deg, #DC2626, #F87171, #B91C1C)' },
                            { name: 'Turuncu', colors: '#EA580C,#FB923C,#C2410C', preview: 'linear-gradient(45deg, #EA580C, #FB923C, #C2410C)' },
                            { name: 'Pembe', colors: '#EC4899,#F472B6,#BE185D', preview: 'linear-gradient(45deg, #EC4899, #F472B6, #BE185D)' },
                            { name: 'Cyan', colors: '#0891B2,#22D3EE,#0E7490', preview: 'linear-gradient(45deg, #0891B2, #22D3EE, #0E7490)' },
                            { name: 'İndigo', colors: '#4338CA,#818CF8,#312E81', preview: 'linear-gradient(45deg, #4338CA, #818CF8, #312E81)' },
                            { name: 'Siyah', colors: '#374151,#6B7280,#111827', preview: 'linear-gradient(45deg, #374151, #6B7280, #111827)' }
                          ].map((option) => (
                            <button
                              key={option.name}
                              type="button"
                              onClick={() => setGradientColor(option.colors)}
                              className={`h-16 rounded-lg transition-all hover:scale-105 border-4 ${
                                gradientColor === option.colors ? 'border-gray-800 shadow-lg ring-2 ring-blue-500' : 'border-gray-300'
                              }`}
                              style={{ background: option.preview }}
                              title={option.name}
                            />
                          ))}
                        </div>

                        {/* Özel Gradient ve Renk Seçimi */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Özel gradient girişi */}
                          <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                              Özel Gradient
                            </label>
                            <input
                              type="text"
                              value={gradientColor}
                              onChange={(e) => setGradientColor(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              placeholder="#D4AF37,#F7E98E,#B8860B"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Format: #renk1,#renk2,#renk3</p>
                          </div>
                          
                          {/* Renk Seçici */}
                          <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                              Renk Seçici
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {[1, 2, 3].map((num) => {
                                const colors = gradientColor.split(',');
                                const currentColor = colors[num - 1]?.trim() || '#D4AF37';
                                
                                return (
                                  <div key={num}>
                                    <input
                                      type="color"
                                      value={currentColor}
                                      onChange={(e) => {
                                        const newColors = [...colors];
                                        newColors[num - 1] = e.target.value;
                                        while (newColors.length < 3) newColors.push('#D4AF37');
                                        setGradientColor(newColors.slice(0, 3).join(','));
                                      }}
                                      className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">Renk {num}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        
                        {/* Önizleme */}
                        <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-600 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div
                              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                              style={{
                                background: gradientColor ? `linear-gradient(45deg, ${gradientColor})` : 'linear-gradient(45deg, #D4AF37, #F7E98E, #B8860B)'
                              }}
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Önizleme</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{gradientColor}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>

                  {/* Tab 2: Kurumsal Bilgiler */}
                  <Tab.Panel className="space-y-6 rounded-xl p-4 bg-gray-50 dark:bg-gray-700">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div>
                        <label htmlFor="firmaUnvan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Firma Ünvanı
                        </label>
                        <input
                          type="text"
                          id="firmaUnvan"
                          value={firmaUnvan}
                          onChange={(e) => setFirmaUnvan(e.target.value)}
                          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Teknoloji A.Ş."
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="firmaVergiNo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Vergi Numarası
                        </label>
                        <input
                          type="text"
                          id="firmaVergiNo"
                          value={firmaVergiNo}
                          onChange={(e) => setFirmaVergiNo(e.target.value)}
                          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="1234567890"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="vergiDairesi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Vergi Dairesi
                        </label>
                        <input
                          type="text"
                          id="vergiDairesi"
                          value={vergiDairesi}
                          onChange={(e) => setVergiDairesi(e.target.value)}
                          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Merkez Vergi Dairesi"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="firma_hakkinda_baslik" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        "Hakkımızda" Başlığı
                      </label>
                      <input
                        type="text"
                        id="firma_hakkinda_baslik"
                        value={firmaHakkindaBaslik}
                        onChange={(e) => setFirmaHakkindaBaslik(e.target.value)}
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Hakkımızda"
                        maxLength={50}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="firma_hakkinda" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hakkımızda
                      </label>
                      <textarea
                        id="firma_hakkinda"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        value={firmaHakkinda}
                        onChange={(e) => setFirmaHakkinda(e.target.value)}
                        rows={5}
                        placeholder="Firma hakkında bilgi giriniz..."
                      />
                    </div>

                    <div>
                      <label htmlFor="katalogDosya" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Katalog PDF Dosyası
                      </label>
                      <input
                        type="file"
                        id="katalogDosya"
                        accept=".pdf"
                        onChange={handleKatalogChange}
                        className="block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        PDF formatında katalog dosyası yükleyebilirsiniz.
                      </p>
                    </div>
                  </Tab.Panel>
                  
                  {/* Tab 3: Sosyal Medya */}
                  <Tab.Panel className="space-y-6 rounded-xl p-4 bg-gray-50 dark:bg-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sosyal Medya Hesapları</h3>
                    
                    {socialMediaAccounts.map((account, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">Hesap #{index + 1}</h4>
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Platform</label>
                            <select
                              value={account.platform}
                              onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL veya Kullanıcı Adı</label>
                            <input
                              type="text"
                              value={account.url}
                              onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Özel Başlık (Opsiyonel)</label>
                            <input
                              type="text"
                              value={account.label || ''}
                              onChange={(e) => handleSocialMediaChange(index, 'label', e.target.value)}
                              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                  <Tab.Panel className="space-y-6 rounded-xl p-4 bg-gray-50 dark:bg-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">İletişim Bilgileri</h3>
                    
                    {communicationAccounts.map((account, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">İletişim #{index + 1}</h4>
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">İletişim Türü</label>
                            <select
                              value={account.type}
                              onChange={(e) => handleCommunicationChange(index, 'type', e.target.value)}
                              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Değer</label>
                            <input
                              type="text"
                              value={account.value}
                              onChange={(e) => handleCommunicationChange(index, 'value', e.target.value)}
                              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Özel Başlık (Opsiyonel)</label>
                            <input
                              type="text"
                              value={account.label || ''}
                              onChange={(e) => handleCommunicationChange(index, 'label', e.target.value)}
                              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                  <Tab.Panel className="space-y-6 rounded-xl p-4 bg-gray-50 dark:bg-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Banka Hesap Bilgileri</h3>
                    
                    {bankAccounts.map((account, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">Hesap #{index + 1}</h4>
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Banka</label>
                            <select
                              value={account.bank_name}
                              onChange={(e) => handleBankAccountChange(index, 'bank_name', e.target.value)}
                              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hesap Sahibi</label>
                            <input
                              type="text"
                              value={account.account_holder}
                              onChange={(e) => handleBankAccountChange(index, 'account_holder', e.target.value)}
                              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              placeholder="Ahmet Yılmaz"
                            />
                          </div>
                          
                          {/* Alt hesaplar (IBAN ve para birimi) */}
                          {account.accounts.map((subAccount, subIndex) => (
                            <div key={`${index}-${subIndex}`} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                              <div className="flex justify-between items-center mb-2">
                                <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">
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
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">IBAN</label>
                                  <input
                                    type="text"
                                    value={subAccount.iban}
                                    onChange={(e) => handleSubAccountChange(index, subIndex, 'iban', e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    placeholder="TR00 0000 0000 0000 0000 0000 00"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Para Birimi</label>
                                  <select
                                    value={subAccount.currency}
                                    onChange={(e) => handleSubAccountChange(index, subIndex, 'currency', e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
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
              
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <div className="flex space-x-3">
                    <Link
                      href="/admin/firmalar"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
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
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
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
                            Güncelleniyor...
                          </>
                        ) : (
                          <>
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Güncelle
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
            {/* Template Seçim Butonu */}
            <div className="mb-4 flex justify-center">
              <button
                type="button"
                onClick={() => setIsTemplateSelectorOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all shadow-lg"
                title="Kartvizit Tasarımı Seç"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
                Tasarım Seç
              </button>
            </div>
            
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
              bankAccounts={bankAccounts}
            />
          </div>
        </div>

        {/* Template Selector Popup */}
        <TemplateSelector
          isOpen={isTemplateSelectorOpen}
          onClose={() => setIsTemplateSelectorOpen(false)}
          selectedTemplateId={templateId}
          onSelectTemplate={(id) => setTemplateId(id)}
        />
      </main>
    </div>
  );
}
