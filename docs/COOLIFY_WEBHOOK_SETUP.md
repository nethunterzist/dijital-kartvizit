# Coolify Otomatik Deployment Webhook Kurulumu

## Sorun
GitHub'a push yapıldığında Coolify otomatik olarak deployment başlatmıyor.

## Çözüm: GitHub Webhook Kurulumu

### Adım 1: Coolify'dan Webhook URL'sini Al

1. Coolify dashboard'a giriş yap: `http://157.180.78.53:8000` veya domain üzerinden
2. Projeye git (dijitalkartvizitmerkezi.com)
3. **Settings** → **Webhooks** bölümüne git
4. **Webhook URL**'sini kopyala, formatı şöyle olacak:
   ```
   https://coolify-domain/api/v1/deploy/webhook/{uuid}
   ```
   veya
   ```
   http://157.180.78.53:8000/api/v1/deploy/webhook/{uuid}
   ```

### Adım 2: GitHub'da Webhook Ekle

#### Manuel Yöntem (GitHub Web Interface)

1. GitHub repository'ye git: https://github.com/nethunterzist/dijital-kartvizit
2. **Settings** → **Webhooks** → **Add webhook**
3. Aşağıdaki ayarları yap:
   - **Payload URL**: Coolify'dan aldığın webhook URL'sini yapıştır
   - **Content type**: `application/json`
   - **Secret**: (Coolify'da varsa belirtilen secret'ı gir)
   - **Which events**: `Just the push event`
   - **Active**: ✅ İşaretle
4. **Add webhook** butonuna tıkla

#### Komut Satırı Yöntemi (GitHub CLI)

Coolify webhook URL'sini aldıktan sonra:

```bash
# Webhook URL'sini değişkene kaydet
WEBHOOK_URL="http://157.180.78.53:8000/api/v1/deploy/webhook/{BURAYA_UUID_GELECEK}"

# GitHub'a webhook ekle
gh api repos/nethunterzist/dijital-kartvizit/hooks \
  --method POST \
  --field "name=web" \
  --field "active=true" \
  --field "events[]=push" \
  --field "config[url]=$WEBHOOK_URL" \
  --field "config[content_type]=json" \
  --field "config[insecure_ssl]=0"
```

### Adım 3: Test Et

1. Küçük bir değişiklik yap (örn: README'ye bir satır ekle)
2. Commit ve push yap:
   ```bash
   git add .
   git commit -m "Test: Webhook deployment test"
   git push origin main
   ```
3. Coolify dashboard'da deployment başladığını kontrol et
4. GitHub'da webhook'u kontrol et:
   - Settings → Webhooks → Son eklenen webhook
   - **Recent Deliveries** sekmesine bak
   - Başarılı delivery (200 yanıt) görmelisin

### Adım 4: Webhook Sorun Giderme

#### GitHub'da Webhook Durumunu Kontrol Et

```bash
# Tüm webhook'ları listele
gh api repos/nethunterzist/dijital-kartvizit/hooks

# Belirli bir webhook'un son delivery'lerini kontrol et
gh api repos/nethunterzist/dijital-kartvizit/hooks/{hook_id}/deliveries
```

#### Olası Sorunlar ve Çözümleri

**Sorun 1**: Webhook 404 hatası veriyor
- **Çözüm**: Coolify webhook URL'sini tekrar kontrol et, UUID doğru olmalı

**Sorun 2**: Webhook timeout oluyor
- **Çözüm**: Coolify sunucusu erişilebilir olmalı, firewall ayarlarını kontrol et

**Sorun 3**: Webhook 401/403 hatası
- **Çözüm**: Coolify webhook secret'ı varsa GitHub'da da aynısını kullan

**Sorun 4**: Webhook başarılı ama deployment başlamıyor
- **Çözüm**: Coolify'da branch ayarını kontrol et, `main` branch için webhook aktif olmalı

### Adım 5: Branch Ayarları

Coolify'da deployment ayarlarını kontrol et:
1. Coolify dashboard → Proje → **Settings**
2. **Source** bölümünde:
   - Branch: `main` (veya hangi branch'i kullanıyorsanız)
   - Auto Deploy: **Enabled** olmalı
   - Deploy on push: **Enabled** olmalı

## Mevcut Durum

✅ **Tamamlananlar**:
- Repository: `https://github.com/nethunterzist/dijital-kartvizit`
- Default branch: `main`
- Son push: 2026-01-03T20:22:56Z
- Commit: `7b39953` (Slider validation fix)

❌ **Eksikler**:
- GitHub webhook kurulmamış
- Coolify webhook URL'si bilinmiyor

## Sonraki Adımlar

1. Coolify dashboard'a giriş yap
2. Webhook URL'sini al
3. GitHub'a webhook ekle (yukarıdaki adımları takip et)
4. Test deployment yap

## Alternatif: Manuel Deployment

Webhook çalışana kadar manuel deployment için:
1. Coolify dashboard'a giriş yap
2. Proje sayfasına git
3. **Deploy** butonuna tıkla
4. Son commit'i göreceksin (`7b39953`)
5. Deploy işlemi başlayacak

## Notlar

- Webhook kurulduktan sonra her `git push origin main` komutu otomatik deployment tetikleyecek
- Coolify logs'unda deployment sürecini takip edebilirsin
- Build süresi yaklaşık 2-3 dakika
