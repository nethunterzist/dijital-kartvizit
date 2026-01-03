# SMTP Mail Sistemi Kurulum Rehberi

**Oluşturulma Tarihi**: 3 Ocak 2026
**Durum**: ✅ Kod hazır, SMTP yapılandırması bekleniyor

---

## Özet

Paket talep formundan gelen başvurular için **tam otomatik e-posta bildirimi sistemi** eklenmiştir. Sistem %100 kodlanmış durumda, sadece SMTP sunucu bilgilerinizin `.env` dosyasına eklenmesi gerekiyor.

**Sistem Özellikleri**:
- ✅ Admin e-posta bildirimi (yeni paket talebi detayları)
- ✅ Müşteri onay e-postası (talebiniz alındı mesajı)
- ✅ Profesyonel HTML e-posta şablonları
- ✅ Türkçe içerik ve dil desteği
- ✅ IP adresi, zaman damgası ve tarayıcı bilgisi kaydı
- ✅ E-posta alanı isteğe bağlı (müşteri vermezse sadece telefon ile iletişim)

---

## 1. Gerekli SMTP Bilgileri

Mevcut mail sunucunuzdan aşağıdaki bilgileri alın:

```env
SMTP_HOST="mail.yourdomain.com"           # Mail sunucusu adresi
SMTP_PORT="587"                            # Port (587: TLS, 465: SSL, 25: güvenli değil)
SMTP_USER="noreply@yourdomain.com"         # Gönderici e-posta adresi
SMTP_PASS="your-smtp-password"             # E-posta şifresi
ADMIN_EMAIL="admin@yourdomain.com"         # Bildirimlerin geleceği admin e-postası
```

### Yaygın Mail Sunucuları için Ayarlar

**cPanel/Plesk (Kendi Mail Sunucunuz)**:
```env
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="587"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="mail-sifresi"
ADMIN_EMAIL="admin@yourdomain.com"
```

**Microsoft 365 / Outlook**:
```env
SMTP_HOST="smtp.office365.com"
SMTP_PORT="587"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="hesap-sifresi"
ADMIN_EMAIL="admin@yourdomain.com"
```

**Yandex Mail**:
```env
SMTP_HOST="smtp.yandex.com"
SMTP_PORT="587"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="hesap-sifresi"
ADMIN_EMAIL="admin@yourdomain.com"
```

**Not**: Gmail kullanılması önerilmez (güvenlik kısıtlamaları nedeniyle). Mevcut mail sunucunuzu kullanın.

---

## 2. Yerel Geliştirme Ortamında Kurulum

### Adım 1: `.env` Dosyasını Düzenleyin

Proje kök dizinindeki `.env` dosyasını açın ve SMTP bilgilerini ekleyin:

```bash
cd /Users/furkanyigit/Desktop/dijitalkartvizit/sanalkartvizitim
nano .env
```

SMTP ayarlarını ekleyin:

```env
# SMTP Email Configuration
SMTP_HOST="mail.dijitalkartvizitmerkezi.com"
SMTP_PORT="587"
SMTP_USER="noreply@dijitalkartvizitmerkezi.com"
SMTP_PASS="güvenli-şifre-buraya"
ADMIN_EMAIL="admin@dijitalkartvizitmerkezi.com"
```

### Adım 2: Geliştirme Sunucusunu Yeniden Başlatın

```bash
# Mevcut dev server'ı durdurun (Ctrl+C)
# Sonra yeniden başlatın:
npm run dev
```

### Adım 3: Test Edin

1. Tarayıcıda `http://localhost:3000` adresine gidin
2. Bir paket seçin ve "Paketi Seç" butonuna tıklayın
3. Formu doldurun:
   - Ad: Test
   - Soyad: Kullanıcı
   - Telefon: 05XX XXX XX XX
   - E-posta: test@example.com
4. "Gönder" butonuna tıklayın
5. İki e-posta kontrol edin:
   - Admin e-postası: Paket talep detayları
   - Müşteri e-postası: "Talebiniz Alındı" onay mesajı

---

## 3. Production (Coolify) Kurulumu

### Adım 1: Coolify'da Environment Variables Ayarlayın

1. **Coolify Dashboard**'a giriş yapın
2. **Applications** → Projenizi seçin → **Configuration** → **Environment Variables**
3. Aşağıdaki değişkenleri **Runtime** olarak ekleyin:

```env
SMTP_HOST=mail.dijitalkartvizitmerkezi.com
SMTP_PORT=587
SMTP_USER=noreply@dijitalkartvizitmerkezi.com
SMTP_PASS=güvenli-production-şifresi
ADMIN_EMAIL=admin@dijitalkartvizitmerkezi.com
```

**Önemli**:
- Her satır için "Add Variable" butonuna tıklayın
- "Runtime" tipini seçin (Build değil)
- Şifreyi görünür olmayan şekilde yapıştırın

### Adım 2: Deployment Tetikleyin

```bash
# Yeni bir deployment başlatın (environment variables aktif olsun)
git commit --allow-empty -m "Enable SMTP mail system"
git push origin main
```

Coolify otomatik olarak deployment başlatacaktır.

### Adım 3: Production'da Test Edin

1. `https://dijitalkartvizitmerkezi.com` adresine gidin
2. Bir paket seçin ve formu doldurun
3. E-postaların geldiğini kontrol edin:
   - Admin e-postası: `admin@dijitalkartvizitmerkezi.com`
   - Müşteri onay e-postası: Formda girilen e-posta adresine

---

## 4. E-posta Şablonları

### Admin Bildirimi E-postası

**Konu**: `Yeni Paket Talebi - [Paket Adı]`

**İçerik**:
- 📦 Paket Bilgileri (Paket adı, fiyat, özellikler)
- 👤 Müşteri Bilgileri (Ad soyad, telefon, e-posta)
- 🕐 Talep Detayları (Tarih/saat, IP adresi, tarayıcı)

### Müşteri Onay E-postası

**Konu**: `Talebiniz Alındı - [Paket Adı]`

**İçerik**:
- ✅ Onay mesajı
- Seçilen paket bilgisi
- "Ekibimiz en kısa sürede sizinle iletişime geçecektir" mesajı
- QR kod ve güncellenebilir özellikler hakkında bilgi

---

## 5. Güvenlik ve Best Practices

### SMTP Şifre Güvenliği

- ✅ `.env` dosyası `.gitignore`'da var (şifreler Git'e commit edilmez)
- ✅ Production'da environment variables kullanılır
- ⚠️ **ASLA** `.env` dosyasını Git'e commit etmeyin
- ⚠️ **ASLA** şifreleri kod içine yazmayın

### E-posta Rate Limiting

Sistem otomatik rate limiting içermez. Gerekirse şunları ekleyebilirsiniz:
- Admin panel üzerinden paket talep geçmişi tablosu
- IP bazlı rate limiting (app/lib/rateLimit.ts'yi kullanarak)
- Günlük maksimum talep sayısı limiti

### Spam Önleme

Öneriler:
- Honeypot field ekleyin (bot tespiti)
- Google reCAPTCHA v3 ekleyin
- Form submission rate limiting uygulayın

---

## 6. Sorun Giderme

### E-posta Gelmiyor

**1. SMTP Bağlantı Hatası**

Container loglarını kontrol edin:
```bash
# Coolify Dashboard → Deployment → Logs
# veya Docker CLI:
docker logs [container-id] | grep -i smtp
```

Olası hatalar:
- `ECONNREFUSED`: SMTP_HOST veya SMTP_PORT yanlış
- `Invalid login`: SMTP_USER veya SMTP_PASS hatalı
- `Connection timeout`: Port 587 firewall tarafından engellenmiş olabilir

**2. E-posta Spam Klasörüne Düşüyor**

Çözümler:
- Mail sunucunuzda SPF kaydı ayarlayın
- DKIM imzası ekleyin
- DMARC policy oluşturun

**3. Müşteri E-postası Gönderilmiyor**

- E-posta alanı form doldurulurken boş bırakılmışsa, müşteri e-postası gönderilmez (normal davranış)
- Sadece admin bildirimi gider
- Kontrol: Browser console'da `Customer confirmation email sent` logu var mı?

### Test Komutları

```bash
# SMTP bağlantısını test et (telnet)
telnet mail.dijitalkartvizitmerkezi.com 587

# Environment variables kontrolü (production)
docker exec [container-id] env | grep SMTP

# Log takibi (canlı)
docker logs -f [container-id]
```

---

## 7. İsteğe Bağlı Geliştirmeler

Gelecekte eklenebilir:

### Database Kayıt (Opsiyonel)

Paket taleplerini veritabanına kaydetmek için:

1. `schema.prisma`'ya tablo ekleyin:
```prisma
model PackageInquiry {
  id            Int      @id @default(autoincrement())
  name          String
  surname       String
  phone         String
  email         String?
  package_key   String
  package_name  String
  package_price Decimal  @db.Decimal(10, 2)
  ip            String?
  user_agent    String?
  created_at    DateTime @default(now())
}
```

2. Migration çalıştırın:
```bash
npx prisma db push
npx prisma generate
```

3. API endpoint'i güncelleyin (`app/api/package-inquiry/route.ts`):
```typescript
// Email göndermeden önce veritabanına kaydet
await prisma.packageInquiry.create({
  data: {
    name: validatedData.name,
    surname: validatedData.surname,
    phone: validatedData.phone,
    email: validatedData.email || null,
    package_key: validatedData.packageKey,
    package_name: validatedData.packageName,
    package_price: validatedData.packagePrice,
    ip: ip.split(',')[0].trim(),
    user_agent: userAgent,
  },
});
```

### Admin Panel Görüntüleme

Talepleri admin panelden görüntülemek için:
- `/admin/paket-talepleri` sayfası oluşturun
- Tablo ile tüm talepleri listeleyin
- Durum takibi ekleyin (Beklemede, Görüşüldü, Tamamlandı)

---

## 8. Dosya Değişiklikleri

Bu sistem için yapılan değişiklikler:

### Yeni/Değiştirilen Dosyalar

1. **`.env.example`** - SMTP ayarları template eklendi
2. **`app/lib/email.ts`** - Customer confirmation email fonksiyonu eklendi
3. **`app/lib/validations/package-inquiry.schema.ts`** - Email field eklendi
4. **`app/api/package-inquiry/route.ts`** - Çift e-posta gönderimi eklendi
5. **`app/components/PricingFormSlider.tsx`** - Email input field eklendi
6. **`SMTP_SETUP_GUIDE.md`** - Bu dokümantasyon oluşturuldu

### Değişiklik Özeti

- Email field isteğe bağlı (optional) - müşteri boş bırakabilir
- Admin e-postası her zaman gönderilir
- Customer confirmation email sadece e-posta girildiğinde gönderilir
- Form validasyonu email formatını kontrol eder
- Türkçe hata mesajları ve UI metinleri

---

## 9. Sonraki Adımlar

### Hemen Yapılması Gerekenler

1. ✅ SMTP bilgilerini alın (mail sunucu admininizden)
2. ✅ `.env` dosyasına ekleyin
3. ✅ Localhost'ta test edin
4. ✅ Coolify environment variables'a ekleyin
5. ✅ Production'a deploy edin
6. ✅ Canlı sitede test edin

### İsteğe Bağlı İyileştirmeler

- [ ] Database kaydı ekleyin (yukarıdaki örnekleri kullanın)
- [ ] Admin panelden talep görüntüleme sayfası
- [ ] Google reCAPTCHA v3 ekleyin
- [ ] Rate limiting uygulayın
- [ ] SPF/DKIM/DMARC mail sunucu ayarları

---

## Destek

Herhangi bir sorunla karşılaşırsanız:

1. **Container logları**: `docker logs [container-id]`
2. **SMTP test**: `telnet [SMTP_HOST] [SMTP_PORT]`
3. **Environment variables**: Coolify dashboard'da doğru ayarlandığını kontrol edin

---

**Sistem Durumu**: ✅ **READY FOR DEPLOYMENT**
**Kod Tamamlanma**: %100
**Kalan İş**: Sadece SMTP credentials eklenmesi gerekiyor
