# Coolify GitHub Webhook Kurulum Rehberi

**Son Güncelleme**: 6 Ocak 2026
**Süre**: ~5-10 dakika
**Zorluk**: Kolay

---

## 📌 Genel Bakış

Bu rehber, GitHub repository'nizden Coolify'a otomatik deployment'leri aktif etmek için GitHub webhook kurulumunu adım adım açıklar.

**Şu Anda**: Her deployment'te Coolify dashboard'a gidip manuel olarak "Redeploy" butonuna tıklıyorsunuz.

**Bu Rehber Sonunda**: `git push origin main` yaptığınızda, Coolify otomatik olarak yeni deployment başlatacak.

---

## 🎯 Neden Webhook Gerekli?

### Manuel Deployment (Şu Anki Durum)
```
1. Kod değişikliği yap
2. git push origin main
3. 🌐 Coolify dashboard'a git (http://157.180.78.53:8000)
4. 👆 "Redeploy" butonuna tıkla ← MANUEL İŞLEM
5. ⏳ Build başlar (~4-5 dakika)
6. ✅ Deployment tamamlanır
```

### Otomatik Deployment (Webhook ile)
```
1. Kod değişikliği yap
2. git push origin main
3. 🤖 GitHub webhook otomatik tetiklenir
4. ⚡ Coolify build'i otomatik başlatır
5. ⏳ Build başlar (~4-5 dakika)
6. ✅ Deployment tamamlanır
```

**Kazanç**: Her deployment'te 2-3 dakika tasarruf + manuel hata riski sıfır

---

## 📋 Ön Koşullar

### Gerekli Erişimler
- ✅ GitHub repository admin erişimi
- ✅ Coolify dashboard erişimi (http://157.180.78.53:8000)

### Kontrol Listesi
```bash
# 1. GitHub'a erişim kontrolü
[ ] Repository sahibi veya admin misiniz?
[ ] Settings sekmesini görebiliyor musunuz?

# 2. Coolify'a erişim kontrolü
[ ] Coolify dashboard açılıyor mu? (http://157.180.78.53:8000)
[ ] Application settings'i görebiliyor musunuz?
```

---

## 🚀 Adım Adım Kurulum

### Adım 1: Coolify Webhook URL'sini Alma

#### 1.1. Coolify Dashboard'a Giriş
```
1. Tarayıcıda aç: http://157.180.78.53:8000
2. Login bilgilerinle giriş yap
3. Proje listesinden "dijitalkartvizitmerkezi.com" projesine tıkla
```

#### 1.2. Webhook URL'sini Bul
```
Coolify Dashboard'da:

1. Proje sayfasında → Sağ üst köşe → "Settings" butonuna tıkla

2. Sol menüden → "Webhooks" bölümüne git

3. "Webhook URL" alanını bul
   Format örneği:
   https://coolify.domain.com/api/v1/deploy/webhook/abc123-def456-ghi789

   VEYA

   http://157.180.78.53:8000/api/v1/deploy/webhook/abc123-def456-ghi789

4. 📋 URL'yi kopyala (Ctrl+C veya sağ tık → Copy)
   ⚠️ Bu URL'yi güvenli bir yerde sakla, sonraki adımda lazım!
```

**💡 İpucu**: URL'de bir UUID (benzersiz tanımlayıcı) olacak. Bu, her proje için farklıdır.

**⚠️ ÖNEMLİ**: Bu URL'yi kimseyle paylaşmayın! Bu URL'ye sahip olan herkes deployment tetikleyebilir.

---

### Adım 2: GitHub Webhook Yapılandırması

#### 2.1. GitHub Repository Settings
```
1. GitHub'da repository'ye git:
   https://github.com/nethunterzist/dijital-kartvizit

2. Üst menüden → "Settings" sekmesine tıkla
   (⚠️ Eğer görmüyorsanız, admin erişiminiz yok demektir)

3. Sol menüden → "Webhooks" bölümüne git

4. Sağ üstten → "Add webhook" butonuna tıkla
```

#### 2.2. Webhook Detaylarını Gir

**Payload URL** (Zorunlu):
```
Adım 1'de kopyaladığın Coolify webhook URL'sini yapıştır

Örnek:
http://157.180.78.53:8000/api/v1/deploy/webhook/abc123-def456-ghi789
```

**Content type** (Zorunlu):
```
Dropdown'dan seç: application/json
```

**Secret** (Opsiyonel):
```
- Eğer Coolify'da webhook secret tanımladıysanız, buraya aynısını girin
- Tanımlamadıysanız, boş bırakabilirsiniz
- Önerilen: Güvenlik için secret kullanın
```

**SSL verification** (Önerilen):
```
✅ Enable SSL verification (HTTPS kullanıyorsanız)
❌ Disable (HTTP kullanıyorsanız - şu anki durumunuz)

⚠️ Şu anda HTTP kullandığınız için: "Disable SSL verification" seçin
```

**Which events would you like to trigger this webhook?**:
```
🔘 Just the push event (Önerilen - Sadece push'larda tetikle)

VEYA

🔘 Let me select individual events
   ✅ Pushes (Sadece bunu işaretle)
```

**Active**:
```
✅ Active (Mutlaka işaretli olmalı!)
```

#### 2.3. Webhook'u Kaydet
```
1. "Add webhook" butonuna tıkla
2. GitHub parolanızı girmeniz istenebilir (güvenlik için)
3. Webhook oluşturuldu! ✅
```

---

### Adım 3: Test ve Doğrulama

#### 3.1. Test Commit Yap
```bash
cd /Users/furkanyigit/Desktop/dijitalkartvizit/sanalkartvizitim

# Küçük bir değişiklik yap (README'ye test satırı ekle)
echo "\n<!-- Webhook test: $(date) -->" >> README.md

# Commit ve push
git add README.md
git commit -m "test: webhook deployment testi"
git push origin main
```

#### 3.2. Coolify'da Deployment Kontrolü
```
1. Hemen Coolify dashboard'a git (http://157.180.78.53:8000)

2. "Deployments" sekmesine bak

3. Beklenen sonuç:
   ✅ Yeni bir deployment otomatik başladı
   ✅ Trigger: "Webhook" (Manuel değil!)
   ✅ Build başarıyla çalışıyor

4. Build tamamlanana kadar bekle (~4-5 dakika)
```

#### 3.3. GitHub Webhook Delivery Kontrolü
```
1. GitHub → Repository → Settings → Webhooks

2. Az önce oluşturduğun webhook'a tıkla

3. "Recent Deliveries" sekmesine git

4. En son delivery'ye tıkla

5. Kontrol et:
   ✅ Response: 200 OK (Başarılı!)
   ✅ Body: {"message":"Deployment started"} (veya benzeri)

   Eğer farklı sonuç görüyorsan, "Sorun Giderme" bölümüne bak ⬇️
```

---

## ✅ Başarı Kriterleri

Webhook'unuz doğru çalışıyorsa:

```
☑️ GitHub'da webhook "Recent Deliveries" bölümünde 200 OK yanıtı
☑️ Coolify'da yeni deployment otomatik başladı
☑️ Deployment trigger'ı "Webhook" (Manual değil)
☑️ Build başarıyla tamamlandı
☑️ Site güncel haliyle canlı: https://dijitalkartvizitmerkezi.com
```

Test:
```bash
# Basit bir değişiklik yap ve push et
git commit --allow-empty -m "test: webhook automation test"
git push origin main

# Coolify'da otomatik deployment başlamalı! 🎉
```

---

## 🔧 Sorun Giderme

### ❌ Problem: GitHub Webhook 404 Not Found

**Belirtiler**:
```
GitHub → Webhooks → Recent Deliveries → Response: 404 Not Found
```

**Çözüm**:
1. Coolify webhook URL'sini tekrar kontrol et
2. URL'de yazım hatası var mı kontrol et
3. UUID kısmı tam kopyalandı mı?
4. URL'nin başında/sonunda boşluk var mı?

**Test**:
```bash
# URL'yi test et (Coolify webhook URL'ini kullan)
curl -X POST "http://157.180.78.53:8000/api/v1/deploy/webhook/YOUR-UUID-HERE"

# Beklenen yanıt: 200 OK veya 401 (secret yoksa)
# 404 alırsan, URL yanlış demektir
```

---

### ❌ Problem: Request Timeout / Connection Refused

**Belirtiler**:
```
GitHub → Webhooks → Recent Deliveries → Error: Request Timeout
VEYA
Connection refused
```

**Olası Nedenler**:
1. Coolify sunucusu kapalı/erişilemiyor
2. Firewall port'u engelliyor
3. Ağ bağlantı sorunu

**Çözüm**:

**1. Sunucu Durumu Kontrolü**:
```bash
# Coolify sunucusuna ping at
ping 157.180.78.53

# Beklenen: Reply from 157.180.78.53
# Timeout alırsan, sunucu erişilemiyor
```

**2. Coolify Dashboard Erişimi**:
```bash
# Dashboard'a erişebiliyor musun?
curl -I http://157.180.78.53:8000

# Beklenen: HTTP/1.1 200 OK (veya 302 redirect)
# Connection refused alırsan, Coolify çalışmıyor
```

**3. Firewall Kontrolü** (SSH erişimi gerekir):
```bash
# SSH ile sunucuya bağlan
ssh root@157.180.78.53

# Port 8000 açık mı kontrol et
netstat -tuln | grep 8000

# Docker container'lar çalışıyor mu?
docker ps | grep coolify
```

---

### ❌ Problem: 401 Unauthorized / 403 Forbidden

**Belirtiler**:
```
GitHub → Webhooks → Recent Deliveries → Response: 401 Unauthorized
```

**Neden**: Webhook secret uyuşmuyor

**Çözüm**:

**Seçenek A**: Secret'ı Sıfırla
```
1. GitHub → Webhooks → İlgili webhook → Edit
2. Secret alanını boş bırak
3. Update webhook
4. Test et
```

**Seçenek B**: Doğru Secret'ı Kullan
```
1. Coolify'da tanımlı secret'ı bul:
   Settings → Webhooks → Webhook Secret

2. GitHub webhook'a aynı secret'ı gir:
   GitHub → Webhooks → Edit → Secret: [Coolify'daki secret]

3. Update webhook
4. Test et
```

---

### ❌ Problem: 200 OK Ama Deployment Başlamıyor

**Belirtiler**:
```
✅ GitHub webhook: 200 OK
❌ Coolify'da yeni deployment yok
```

**Neden**: Coolify'da "Auto Deploy" kapalı

**Çözüm**:
```
1. Coolify dashboard → Application Settings

2. "Source" bölümüne git

3. Kontrol et:
   ✅ Branch: main (veya kullandığınız branch)
   ✅ Auto Deploy: ENABLED
   ✅ Deploy on push: ENABLED

4. Eğer disabled ise:
   - Toggle'ı ON konumuna getir
   - Save changes

5. Test commit at:
   git commit --allow-empty -m "test: auto deploy test"
   git push origin main
```

---

## 🔐 Güvenlik En İyi Uygulamaları

### 1. Webhook Secret Kullanın

**Neden**: Secret olmadan, webhook URL'sini bilen herkes deployment tetikleyebilir.

**Nasıl**:
```
1. Güçlü bir secret oluştur:
   openssl rand -hex 32
   # Örnek: a1b2c3d4e5f6...

2. Coolify'da kaydet:
   Settings → Webhooks → Webhook Secret → [secret]

3. GitHub'da aynı secret'ı kullan:
   Webhooks → Edit → Secret → [aynı secret]
```

### 2. HTTPS Kullanın (Önerilen)

**Şu Anki Durum**: HTTP (güvensiz)
**Önerilen**: HTTPS (güvenli)

### 3. Webhook URL'sini Gizli Tutun

**Yapılması Gerekenler**:
- ❌ URL'yi public repository'de paylaşmayın
- ❌ URL'yi plain text dokümanlarda saklamayın
- ✅ Environment variable veya secret management kullanın
- ✅ Sadece gerekli kişilerle paylaşın

---

## 📚 İlgili Dokümantasyon

- [Hızlı Kurulum Rehberi](QUICK_WEBHOOK_SETUP.md) - 5 dakikalık özet
- [Webhook Sorun Giderme](WEBHOOK_TROUBLESHOOTING.md) - Detaylı troubleshooting
- [Production Deployment](PRODUCTION.md) - Genel deployment rehberi

---

**Son Güncelleme**: 6 Ocak 2026
**Versiyon**: 1.0
