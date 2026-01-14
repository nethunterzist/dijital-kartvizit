# Yandex Mail for Domain Kurulum Rehberi

**Domain**: dijitalkartvizitmerkezi.com
**Tarih**: 3 Ocak 2026
**Amaç**: Ücretsiz Yandex Mail ile SMTP email sistemi kurmak

---

## ⚡ Hızlı Başlangıç (15 Dakika)

### Adım 1: Yandex Connect Hesabı Aç

1. **Yandex Connect'e git**: https://connect.yandex.com
2. **"Başla" veya "Get Started" butonuna tıkla**
3. **Yandex hesabı oluştur**:
   - Email: Mevcut email adresinizi kullanın
   - Şifre: Güvenli bir şifre belirleyin
   - Telefon doğrulaması yapın

### Adım 2: Domain Ekle

1. **Dashboard'da "Add organization" seçeneğine tıkla**
2. **Domain adını gir**: `dijitalkartvizitmerkezi.com`
3. **Domain doğrulama yöntemi seç**:
   - **DNS TXT kaydı** (Önerilen)
   - veya HTML dosyası yükleme
   - veya Meta tag ekleme

#### DNS TXT Kaydı ile Doğrulama (En Kolay)

Yandex size şuna benzer bir TXT kaydı verecek:

```
Type: TXT
Name: @
Value: yandex-verification: 1234567890abcdef
```

**Bu kaydı domain DNS ayarlarınıza ekleyin:**

**Eğer Hetzner DNS kullanıyorsanız**:
1. https://dns.hetzner.com adresine gidin
2. dijitalkartvizitmerkezi.com zone'unu seçin
3. "Add Record" butonuna tıklayın
4. TXT kaydını ekleyin

**Eğer başka DNS sağlayıcı kullanıyorsanız**:
- Cloudflare → DNS → Add Record → TXT
- GoDaddy → DNS Management → Add TXT
- Namecheap → Advanced DNS → Add New Record → TXT

**Doğrulama**:
- DNS kaydını ekledikten sonra Yandex'te "Verify" butonuna tıklayın
- DNS yayılması 5-60 dakika sürebilir
- "Domain verified successfully" mesajını bekleyin

### Adım 3: MX Kayıtlarını Ekle

Domain doğrulandıktan sonra Yandex size MX kayıtları verecek:

```
Type: MX
Priority: 10
Value: mx.yandex.net

Type: MX
Priority: 20
Value: mx2.yandex.net (opsiyonel backup)
```

**Bu MX kayıtlarını DNS'e ekleyin**:

1. Mevcut MX kayıtlarını **SILIN** (eğer varsa)
2. Yandex MX kayıtlarını ekleyin
3. 5-60 dakika DNS yayılmasını bekleyin

**Kontrol**:
```bash
# Terminal'de kontrol edin
nslookup -type=mx dijitalkartvizitmerkezi.com

# Çıktı şöyle olmalı:
# dijitalkartvizitmerkezi.com mail exchanger = 10 mx.yandex.net
```

### Adım 4: SPF Kaydı Ekle (Önemli!)

SPF kaydı emaillerinizin spam'e düşmesini önler:

```
Type: TXT
Name: @
Value: v=spf1 include:_spf.yandex.net ~all
```

**DNS'e ekleyin** (diğer TXT kayıtlarıyla birlikte):
- Eğer zaten SPF kaydınız varsa, `include:_spf.yandex.net` ekleyin
- Yoksa yukarıdaki kaydı olduğu gibi ekleyin

### Adım 5: DKIM İmzası Aktif Et (Önerilen)

DKIM email güvenliğini artırır:

1. Yandex Connect'te **Email → DKIM imzası** bölümüne gidin
2. **"Enable DKIM"** butonuna tıklayın
3. Yandex size şuna benzer bir DKIM TXT kaydı verecek:

```
Type: TXT
Name: mail._domainkey
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4G...
```

4. Bu kaydı DNS'e ekleyin
5. Yandex'te "Verify DKIM" butonuna tıklayın

### Adım 6: Email Hesapları Oluştur

1. **Yandex Connect Dashboard → Email → Employees**
2. **"Add employee" butonuna tıkla**

**İlk Email: noreply**
```
First name: Noreply
Last name: System
Email: noreply@dijitalkartvizitmerkezi.com
Password: [güvenli-şifre-buraya]
```

**İkinci Email: admin**
```
First name: Admin
Last name: Panel
Email: admin@dijitalkartvizitmerkezi.com
Password: [güvenli-şifre-buraya]
```

**⚠️ Şifreleri not edin! SMTP'de kullanacaksınız.**

---

## 🔧 SMTP Ayarları

Email hesapları oluşturduktan sonra aşağıdaki SMTP ayarlarını kullanın:

```env
SMTP_HOST="smtp.yandex.com"
SMTP_PORT="587"
SMTP_USER="noreply@dijitalkartvizitmerkezi.com"
SMTP_PASS="[noreply-hesabı-şifresi]"
ADMIN_EMAIL="admin@dijitalkartvizitmerkezi.com"
```

**Önemli Notlar**:
- Port **587** (TLS) kullanın, 465 (SSL) de çalışır
- SMTP_USER tam email adresi olmalı
- SMTP_PASS yukarıda oluşturduğunuz şifredir

---

## ✅ Doğrulama Testleri

### Test 1: Email Gönderme Testi

Yandex Mail web interface'den test emaili gönderin:

1. https://mail.yandex.com adresine gidin
2. `noreply@dijitalkartvizitmerkezi.com` ile giriş yapın
3. Kendi emailinize test mesajı gönderin
4. Email geldi mi kontrol edin

### Test 2: SMTP Bağlantı Testi (Terminal)

```bash
# SMTP sunucuya bağlantı testi
telnet smtp.yandex.com 587

# Beklenen çıktı:
# 220 smtp.yandex.com ESMTP
# Ctrl+] ile çıkın
```

### Test 3: DNS Kayıtlarını Doğrula

```bash
# MX kayıtları
nslookup -type=mx dijitalkartvizitmerkezi.com

# TXT kayıtları (SPF)
nslookup -type=txt dijitalkartvizitmerkezi.com

# DKIM kaydı
nslookup -type=txt mail._domainkey.dijitalkartvizitmerkezi.com
```

---

## 🚨 Sorun Giderme

### "Domain verification failed"
- DNS TXT kaydı doğru eklendi mi kontrol edin
- DNS yayılması için 1 saat bekleyin
- `nslookup -type=txt dijitalkartvizitmerkezi.com` ile kontrol edin

### "MX records not found"
- MX kayıtları doğru eklendi mi kontrol edin
- Eski MX kayıtları silindi mi kontrol edin
- DNS yayılması için bekleyin

### "SMTP authentication failed"
- Email adresi tam mı? (`noreply@dijitalkartvizitmerkezi.com`)
- Şifre doğru mu?
- Yandex hesabınız aktif mi?

### Emailler spam'e düşüyor
- SPF kaydı eklenmiş mi?
- DKIM aktif mi?
- DMARC policy ekleyin (opsiyonel):
  ```
  Type: TXT
  Name: _dmarc
  Value: v=DMARC1; p=quarantine; rua=mailto:admin@dijitalkartvizitmerkezi.com
  ```

---

## 📋 Checklist

Kurulum tamamlandığında aşağıdakileri kontrol edin:

- [ ] Yandex Connect hesabı oluşturuldu
- [ ] dijitalkartvizitmerkezi.com domain eklendi ve doğrulandı
- [ ] DNS TXT doğrulama kaydı eklendi
- [ ] MX kayıtları eklendi (mx.yandex.net)
- [ ] SPF TXT kaydı eklendi
- [ ] DKIM aktif edildi ve DNS'e eklendi
- [ ] `noreply@dijitalkartvizitmerkezi.com` email hesabı oluşturuldu
- [ ] `admin@dijitalkartvizitmerkezi.com` email hesabı oluşturuldu
- [ ] SMTP şifreleri not edildi
- [ ] Yandex Mail web'den test emaili gönderildi

---

## 🎯 Sonraki Adım

Kurulum tamamlandıktan sonra:

1. **Localhost Test**: `.env` dosyasına SMTP ayarlarını ekleyin
2. **Production Deploy**: Coolify'da environment variables ekleyin
3. **Canlı Test**: Production'da paket talebi gönderin

**SMTP Credentials'larınız hazır olduğunda Claude'a söyleyin, devam edelim!**

---

## 🔗 Faydalı Linkler

- Yandex Connect: https://connect.yandex.com
- Yandex Mail: https://mail.yandex.com
- Yandex Connect Docs: https://yandex.com/support/connect/
- DNS Test Tool: https://mxtoolbox.com/SuperTool.aspx

---

**Kurulum sırasında sorun yaşarsanız Claude'a bildirin, yardımcı olalım!**
