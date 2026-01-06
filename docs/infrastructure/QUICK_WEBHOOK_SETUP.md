# Hızlı Webhook Kurulum Rehberi

**Süre**: 5 dakika
**Zorluk**: Kolay

---

## 🚀 Hızlı Başlangıç

Manuel deployment'lerden kurtulun, otomatik deployment'e geçin!

---

## ⚡ 3 Adımda Kurulum

### 1️⃣ Coolify Webhook URL'sini Al (2 dakika)

```
http://157.180.78.53:8000 → Login
→ Proje seç (dijitalkartvizitmerkezi.com)
→ Settings → Webhooks
→ URL'yi kopyala 📋
```

**URL Formatı**:
```
http://157.180.78.53:8000/api/v1/deploy/webhook/[UUID]
```

---

### 2️⃣ GitHub'a Webhook Ekle (2 dakika)

```
https://github.com/nethunterzist/dijital-kartvizit
→ Settings → Webhooks → Add webhook
```

**Ayarlar**:
```
Payload URL: [Adım 1'deki URL'yi yapıştır]
Content type: application/json
Secret: [Boş bırak]
SSL verification: Disable
Events: Just the push event
Active: ✅
```

**Kaydet**: Add webhook

---

### 3️⃣ Test Et (1 dakika)

```bash
cd /Users/furkanyigit/Desktop/dijitalkartvizit/sanalkartvizitim

# Test commit
git commit --allow-empty -m "test: webhook test"
git push origin main

# Coolify dashboard'da deployment başlamalı! 🎉
```

---

## ✅ Başarı Kontrolü

**GitHub'da**:
```
Settings → Webhooks → Recent Deliveries
→ Response: 200 OK ✅
```

**Coolify'da**:
```
Deployments sekmesi
→ Yeni build otomatik başladı ✅
→ Trigger: "Webhook" (Manual değil) ✅
```

---

## ❌ Sorun mu Var?

### 404 Not Found
```
→ Coolify webhook URL'sini tekrar kontrol et
→ UUID kısmı tam kopyalandı mı?
```

### Timeout
```
→ Coolify çalışıyor mu kontrol et:
  curl -I http://157.180.78.53:8000
```

### 200 OK ama deployment yok
```
→ Coolify Settings → Source
→ "Auto Deploy" ve "Deploy on push" ENABLED olmalı
```

**Detaylı Sorun Giderme**: [WEBHOOK_TROUBLESHOOTING.md](WEBHOOK_TROUBLESHOOTING.md)

---

## 🎯 Sonuç

**Önce**:
```
git push → Coolify'a git → Redeploy'a tıkla → Bekle
```

**Sonra**:
```
git push → Otomatik deployment başlar → Bekle
```

**Kazanç**: Her deployment'te 2-3 dakika tasarruf! 🚀

---

## 📚 Daha Fazla Bilgi

- [Detaylı Kurulum Rehberi](WEBHOOK_SETUP_GUIDE.md)
- [Sorun Giderme Kılavuzu](WEBHOOK_TROUBLESHOOTING.md)
- [Production Deployment](PRODUCTION.md)

---

**Son Güncelleme**: 6 Ocak 2026
