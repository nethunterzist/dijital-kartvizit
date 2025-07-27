# 🔍 Supabase Bağlantı Sorunu - Kontrol Adımları

## 1. 🏥 **Supabase Proje Sağlığını Kontrol Et**

### Dashboard'da Kontrol Et:
- **Project Status**: Yeşil ✅ olmalı
- **Database Status**: "Healthy" olmalı
- **API Status**: "Operational" olmalı

### Kontrol Yerleri:
1. **Ana Dashboard** → Proje kartında durum göstergesi
2. **Settings** → **General** → Project status
3. **Database** → Connection pooler durumu

## 2. 🔐 **Database Erişim İzinlerini Kontrol Et**

### Settings > Database > Connection Info:
1. **"Enable database webhooks"** aktif mi?
2. **"Enable realtime"** aktif mi?
3. **Connection pooling** aktif mi?

### Network Ayarları:
- **IPv4 Add-on** gerekli mi? (Eğer IPv4 ağındaysanız)
- **Shared Pooler** kullanılıyor mu?

## 3. 📝 **Connection String'i Doğru Kopyala**

### Adım Adım:
1. **Settings** → **Database**
2. **Connection info** bölümünü bul
3. **Transaction pooler** sekmesini seç
4. **Copy** butonuna tıkla
5. Şifreyi `tnbowlMzQ760A3o9` ile değiştir

### Doğru Format:
```
postgresql://postgres.rlhqnrfhjumbkxghyocd:tnbowlMzQ760A3o9@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

## 4. 🌐 **Network Bağlantısını Test Et**

### Terminal'de Test:
```bash
# 1. Ping testi
ping db.rlhqnrfhjumbkxghyocd.supabase.co

# 2. Port testi (5432)
telnet db.rlhqnrfhjumbkxghyocd.supabase.co 5432

# 3. Port testi (6543 - pooler)
telnet db.rlhqnrfhjumbkxghyocd.supabase.co 6543

# 4. SSL bağlantı testi
openssl s_client -connect db.rlhqnrfhjumbkxghyocd.supabase.co:5432
```

## 5. 🔧 **Firewall ve VPN Kontrolü**

### Kontrol Et:
- **Firewall** PostgreSQL portlarını (5432, 6543) engelliyor mu?
- **VPN** kullanıyorsanız, kapatıp deneyin
- **Antivirus** database bağlantılarını engelliyor mu?
- **İnternet sağlayıcısı** bu portları engelliyor mu?

## 6. 🕐 **Proje Hazırlanma Süresi**

### Yeni Projeler İçin:
- **İlk 5-10 dakika**: Database henüz tam hazır olmayabilir
- **15-30 dakika**: Tam operasyonel olması gerekir
- **1 saat+**: Sorun var, support'a başvur

### Kontrol:
- Projeyi ne zaman oluşturdunuz?
- 30 dakika geçti mi?

## 7. 🔄 **Alternatif Connection String'ler**

### Denenecek Formatlar:

#### Format 1 - Direct Connection:
```env
DATABASE_URL="postgresql://postgres:tnbowlMzQ760A3o9@db.rlhqnrfhjumbkxghyocd.supabase.co:5432/postgres?sslmode=require"
```

#### Format 2 - Pooler:
```env
DATABASE_URL="postgresql://postgres.rlhqnrfhjumbkxghyocd:tnbowlMzQ760A3o9@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

#### Format 3 - Session Pooler:
```env
DATABASE_URL="postgresql://postgres:tnbowlMzQ760A3o9@db.rlhqnrfhjumbkxghyocd.supabase.co:6543/postgres?pgbouncer=true"
```

## 8. 🧪 **Basit Bağlantı Testi**

### psql ile Test (Eğer yüklüyse):
```bash
psql "postgresql://postgres:tnbowlMzQ760A3o9@db.rlhqnrfhjumbkxghyocd.supabase.co:5432/postgres?sslmode=require"
```

### Node.js ile Test:
```javascript
// test-connection.js
const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres:tnbowlMzQ760A3o9@db.rlhqnrfhjumbkxghyocd.supabase.co:5432/postgres?sslmode=require"
});

client.connect()
  .then(() => {
    console.log('✅ Bağlantı başarılı!');
    client.end();
  })
  .catch(err => {
    console.error('❌ Bağlantı hatası:', err.message);
  });
```

## 9. 📞 **Supabase Support**

### Eğer Hiçbiri Çalışmazsa:
1. **Discord**: https://discord.supabase.com
2. **GitHub Issues**: https://github.com/supabase/supabase/issues
3. **Support Email**: support@supabase.com

### Rapor Ederken Belirt:
- Project Reference ID: `rlhqnrfhjumbkxghyocd`
- Region: Europe (Frankfurt)
- Error: "Can't reach database server"
- Denenen connection string'ler

## 10. 🔄 **Alternatif Çözümler**

### Geçici Çözümler:
1. **Vercel Postgres** kullan
2. **PlanetScale** dene
3. **Railway** PostgreSQL
4. **Neon** database

### Production İçin:
- SQLite ile deploy et
- Sonra database migrate et
- Downtime olmadan geçiş yap

## ✅ **Kontrol Listesi**

- [ ] Proje durumu "Healthy"
- [ ] 30+ dakika geçti
- [ ] Connection string doğru kopyalandı
- [ ] Şifre doğru
- [ ] Network bağlantısı test edildi
- [ ] Firewall kontrol edildi
- [ ] Alternatif formatlar denendi
- [ ] psql/Node.js ile test edildi

**Eğer tüm adımlar tamamlandıysa ve hala bağlanamıyorsanız, Supabase support'a başvurun.**
