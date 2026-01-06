# Webhook Sorun Giderme Kılavuzu

**Son Güncelleme**: 6 Ocak 2026

Bu dokümant Coolify GitHub webhook'larıyla ilgili yaygın sorunları ve çözümlerini içerir.

---

## 📊 Hızlı Teşhis

### Kontrol Listesi

```bash
# 1. GitHub webhook durumu
[ ] GitHub → Settings → Webhooks → Recent Deliveries → 200 OK?

# 2. Coolify deployment durumu
[ ] Coolify dashboard → Deployments → Yeni build başladı mı?
[ ] Trigger tipi "Webhook" mi?

# 3. Coolify ayarları
[ ] Settings → Source → Auto Deploy: ENABLED?
[ ] Settings → Source → Deploy on push: ENABLED?

# 4. Sunucu erişimi
[ ] Coolify dashboard açılıyor mu? (http://157.180.78.53:8000)
[ ] ping 157.180.78.53 → yanıt alıyor musunuz?
```

---

## 🔴 Yaygın Sorunlar ve Çözümler

### ❌ Problem 1: 404 Not Found

**Belirtiler**:
```
GitHub → Webhooks → Recent Deliveries
Response: 404 Not Found
```

**Neden**: Webhook URL hatalı veya eksik

**Çözüm**:

**1. URL'yi Doğrula**:
```bash
# Coolify webhook URL formatı kontrol et
# Doğru format:
http://157.180.78.53:8000/api/v1/deploy/webhook/[UUID]

# UUID: abc-123-def-456 formatında olmalı
```

**2. URL'yi Test Et**:
```bash
# Terminal'de test et (UUID'yi kendi URL'inizle değiştirin)
curl -X POST "http://157.180.78.53:8000/api/v1/deploy/webhook/YOUR-UUID"

# Beklenen yanıt:
# 200 OK veya 401 Unauthorized (secret varsa)
# 404 alıyorsan URL yanlış
```

**3. GitHub'da Güncelle**:
```
1. GitHub → Settings → Webhooks → İlgili webhook → Edit
2. Payload URL'yi düzelt
3. Update webhook
4. Test et: git push origin main
```

---

### ❌ Problem 2: Request Timeout

**Belirtiler**:
```
GitHub → Webhooks → Recent Deliveries
Error: We couldn't deliver this payload: Timeout
```

**Neden**: Coolify sunucusu erişilemiyor

**Çözüm**:

**1. Sunucu Durumu Kontrol**:
```bash
# Ping testi
ping 157.180.78.53

# Beklenen:
# Reply from 157.180.78.53: time=10ms
#
# Timeout alıyorsan:
# → Sunucu kapalı veya ağ sorunu var
```

**2. Coolify Servis Kontrolü**:
```bash
# Coolify dashboard erişim testi
curl -I http://157.180.78.53:8000

# Beklenen:
# HTTP/1.1 200 OK veya 302 Found
#
# Connection refused alıyorsan:
# → Coolify servisi çalışmıyor
```

**3. SSH ile Detaylı Kontrol** (SSH erişimi gerekir):
```bash
# Sunucuya bağlan
ssh root@157.180.78.53

# Coolify container durumu
docker ps | grep coolify

# Beklenen:
# Container "Up" durumunda olmalı
#
# Container yoksa veya down ise:
docker restart coolify
```

**4. Port Kontrolü**:
```bash
# Port 8000 dinleniyor mu?
netstat -tuln | grep 8000

# Beklenen:
# tcp 0.0.0.0:8000 LISTEN
```

---

### ❌ Problem 3: 401 Unauthorized

**Belirtiler**:
```
GitHub → Webhooks → Recent Deliveries
Response: 401 Unauthorized
```

**Neden**: Webhook secret uyuşmuyor

**Çözüm**:

**Seçenek A: Secret'ı Kaldır** (Kolay):
```
1. GitHub → Settings → Webhooks → Edit webhook
2. Secret alanını boş bırak
3. Update webhook
4. Test et
```

**Seçenek B: Secret'ı Eşitle** (Güvenli):
```
1. Coolify'dan secret'ı al:
   http://157.180.78.53:8000 → Settings → Webhooks → Secret

2. GitHub'a aynı secret'ı gir:
   GitHub → Webhooks → Edit → Secret: [Coolify'daki secret]

3. Update webhook
4. Test et
```

**Secret Oluşturma** (Yeni secret gerekiyorsa):
```bash
# Güçlü secret oluştur
openssl rand -hex 32

# Çıktı: a1b2c3d4e5f6g7h8...
# Bu secret'ı hem Coolify'da hem GitHub'da kullan
```

---

### ❌ Problem 4: 200 OK Ama Deployment Yok

**Belirtiler**:
```
✅ GitHub webhook: 200 OK
❌ Coolify'da yeni deployment başlamıyor
```

**Neden**: Coolify'da "Auto Deploy" kapalı

**Çözüm**:

**1. Auto Deploy Ayarını Kontrol Et**:
```
Coolify Dashboard'da:

1. Application sayfasına git
2. Settings sekmesine tıkla
3. Sol menüden "Source" bölümüne git
4. Şu ayarları kontrol et:

   ✅ Branch: main (veya kullandığınız branch)
   ✅ Auto Deploy: ENABLED (Toggle ON olmalı)
   ✅ Deploy on push: ENABLED (Toggle ON olmalı)
```

**2. Ayarları Aktif Et**:
```
Eğer disabled ise:
1. "Auto Deploy" toggle'ını ON yap
2. "Deploy on push" toggle'ını ON yap
3. "Save" butonuna tıkla
```

**3. Test Et**:
```bash
git commit --allow-empty -m "test: auto deploy activation"
git push origin main

# Coolify'da deployment otomatik başlamalı
```

---

### ❌ Problem 5: Build Başlıyor Ama Fail Ediyor

**Belirtiler**:
```
✅ Webhook tetikleniyor
✅ Build başlıyor
❌ Build failed
```

**Çözüm**:

**1. Build Logs'unu İncele**:
```
Coolify Dashboard:
1. Deployments sekmesi
2. Failed build'e tıkla
3. Logs sekmesini aç
4. Hatayı oku
```

**2. Yaygın Build Hataları**:

**npm install hatası**:
```bash
# Lokal test
cd /Users/furkanyigit/Desktop/dijitalkartvizit/sanalkartvizitim
rm -rf node_modules package-lock.json
npm install

# Başarılıysa package.json'da sorun yok
```

**TypeScript error**:
```bash
# Type check
npm run type-check

# Hatalar varsa düzelt
# Sonra push et
```

**Build error**:
```bash
# Build testi
npm run build

# Hatalar varsa düzelt
# Sonra push et
```

**Environment variable eksik**:
```
Coolify → Settings → Environment Variables
→ Gerekli env var'ları ekle
→ Redeploy
```

---

### ❌ Problem 6: Webhook Tetiklenmiyor (Hiç Delivery Yok)

**Belirtiler**:
```
git push yaptın
GitHub → Webhooks → Recent Deliveries → Boş
```

**Neden**: Webhook event'leri yanlış yapılandırılmış

**Çözüm**:

**1. Event Ayarlarını Kontrol Et**:
```
GitHub → Settings → Webhooks → Edit webhook
→ "Which events..." bölümüne bak

Doğru ayar:
🔘 Just the push event

VEYA

🔘 Let me select individual events
   ✅ Pushes (İşaretli olmalı)
   ❌ Diğerleri (Gerekli değil)
```

**2. Active Durumunu Kontrol Et**:
```
Webhook Edit sayfasında:
✅ Active (Mutlaka işaretli olmalı)

Eğer disabled ise:
→ Enable et
→ Update webhook
```

**3. Branch'ı Kontrol Et**:
```bash
# Hangi branch'e push ediyorsun?
git branch

# Coolify hangi branch'i dinliyor?
Coolify → Settings → Source → Branch: main

# Eşleşmiyorsa düzelt
```

---

## 🔍 Detaylı Teşhis Araçları

### GitHub Webhook Payload İnceleme

```
GitHub → Settings → Webhooks → Webhook seç
→ Recent Deliveries → Delivery seç
→ Request/Response sekmelerini incele

Request tab:
- Payload: GitHub'un gönderdiği veri
- Headers: Authentication bilgileri

Response tab:
- Status code: 200, 404, 401, vb.
- Body: Coolify'ın yanıtı
```

### Coolify Logs İnceleme

```
Coolify Dashboard → Application
→ Logs sekmesi
→ Real-time logs

Aranacak kelimeler:
- "webhook"
- "deployment"
- "error"
- "failed"
```

### Network Testi

```bash
# 1. DNS çözümleme
nslookup 157.180.78.53

# 2. Ping testi
ping -c 4 157.180.78.53

# 3. Port erişimi
telnet 157.180.78.53 8000

# 4. HTTP erişimi
curl -v http://157.180.78.53:8000

# 5. Webhook endpoint testi
curl -X POST -v http://157.180.78.53:8000/api/v1/deploy/webhook/YOUR-UUID
```

---

## 🛠️ Gelişmiş Sorun Giderme

### Webhook Logs Analizi

**GitHub CLI ile Recent Deliveries**:
```bash
# GitHub CLI kur (eğer yoksa)
brew install gh

# GitHub'a login
gh auth login

# Webhook'ları listele
gh api repos/nethunterzist/dijital-kartvizit/hooks

# Hook ID'sini not et (örn: 12345)

# Son deliveries'leri gör
gh api repos/nethunterzist/dijital-kartvizit/hooks/12345/deliveries

# Spesifik delivery detayı
gh api repos/nethunterzist/dijital-kartvizit/hooks/12345/deliveries/DELIVERY-ID
```

### Coolify API Testi

```bash
# Webhook endpoint'i manuel tetikle
curl -X POST \
  http://157.180.78.53:8000/api/v1/deploy/webhook/YOUR-UUID \
  -H "Content-Type: application/json" \
  -d '{
    "ref": "refs/heads/main",
    "repository": {
      "name": "dijital-kartvizit"
    }
  }'

# Başarılı yanıt:
# {"success":true,"message":"Deployment started"}

# Hatalı yanıt örnekleri:
# 404: URL yanlış
# 401: Secret hatalı
# 500: Coolify internal error
```

---

## 📋 Sorun Giderme Checklist

### Başlamadan Önce

```
[ ] Coolify dashboard'a erişebiliyor musun?
[ ] GitHub repository'ye admin erişimin var mı?
[ ] SSH erişimin var mı? (opsiyonel ama yardımcı)
[ ] Webhook URL'sini kopyaladın mı?
```

### Adım Adım Teşhis

**1. GitHub Webhook Durumu**:
```
[ ] Settings → Webhooks → Webhook var mı?
[ ] Webhook active mi?
[ ] Recent Deliveries boş değil mi?
[ ] Son delivery'nin response code'u ne? (200, 404, 401, vb.)
```

**2. Coolify Ayarları**:
```
[ ] Settings → Source → Branch doğru mu?
[ ] Auto Deploy enabled mi?
[ ] Deploy on push enabled mi?
```

**3. Network Bağlantısı**:
```
[ ] ping 157.180.78.53 → yanıt veriyor mu?
[ ] curl http://157.180.78.53:8000 → çalışıyor mu?
[ ] Firewall port 8000'i engelliyor mu?
```

**4. Test**:
```
[ ] Test commit yaptın mı?
[ ] Coolify'da deployment başladı mı?
[ ] Build başarılı mı?
```

---

## 🆘 Son Çare: Sıfırdan Kurulum

Hiçbir şey çalışmıyorsa, webhook'u sıfırdan kur:

### 1. Eski Webhook'u Sil

```
GitHub → Settings → Webhooks → Webhook seç → Delete webhook
```

### 2. Coolify'da Webhook'u Yeniden Oluştur

```
Coolify → Settings → Webhooks → Regenerate webhook URL
```

### 3. Yeni Webhook Ekle

```
[Hızlı Kurulum Rehberi](QUICK_WEBHOOK_SETUP.md) adımlarını takip et
```

### 4. Test

```bash
git commit --allow-empty -m "test: fresh webhook setup"
git push origin main
```

---

## 📞 Destek ve Yardım

### Dokümantasyon

- [Detaylı Kurulum Rehberi](WEBHOOK_SETUP_GUIDE.md)
- [Hızlı Başlangıç](QUICK_WEBHOOK_SETUP.md)
- [Production Deployment](PRODUCTION.md)

### Dış Kaynaklar

- [Coolify Documentation](https://coolify.io/docs)
- [GitHub Webhooks Guide](https://docs.github.com/en/webhooks)
- [Webhook Debugging](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks)

---

**Son Güncelleme**: 6 Ocak 2026
**Versiyon**: 1.0
